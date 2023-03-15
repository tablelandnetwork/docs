---
title: Upgrading from the legacy SDK
sidebar_label: Legacy SDK
description: There are breaking changes from the JavaScript SDK v3 to v4—make sure you know the differences.
keywords:
  - legacy
---

## Setup

Within your existing project, install the latest version of the SDK.

```bash npm2yarn
npm install --save @tableland/sdk
```

This will fetch the latest release of the 4.x version of the SDK. We’ll be maintaining the 3.x versions for a little while to help folks make the transition.

If you’re in a Typescript project, you’ll likely see all sorts of type issues. This is extremely useful as it will point you right to the things you need to change. If you aren’t, or want to find things manually, just remember that all the `create`, `read`, and `write` method calls are now part of the core `Statement` API which you can access via a `Database` instance. And the individual calls have been merged into a "single" API (you can just call `stmt.all()`, `stmt.run()`, etc).

## Reading

If you only ever need to _read_ from the Tableland network, then you’re in luck… things just got a whole lot easier. We anticipate there will be quite a few common applications where you just need to read some data from a table or tables and display or use that data in your app in some way. For this, you can swap out something like this:

```js
import { connect } from "@tableland/sdk";

const tableName = "healthbot_80001_1"; // Our pre-defined health check table

const conn = await connect({ network: "testnet", chain: "polygon-mumbai" });
// The above will generally cause a MetaMask popup to sign a SIWE token, can also do it manually
await conn.siwe();

const { data } = await conn.read(`SELECT * FROM ${tableName};`);
console.log(data.rows);
```

Which requires signing, for this (without any signing required):

```js
import { Database } from "@tableland/sdk";

const tableName = "healthbot_80001_1"; // Our pre-defined health check table

const db = Database.readOnly("maticmum"); // Polygon Mumbai testnet

const { results } = db.prepare(`SELECT * FROM ${tableName};`).all();
console.log(results);
```

You’ll also notice we now use the same naming conventions for networks as `[ethersjs](https://github.com/ethers-io/ethers.js/)`. There are some other features of `ethersjs` that Tableland has adopted to make developer lives easier. We’ve outlined a few in this doc, and there are more as you dive deeper into the docs.

:::tip
There is a safer way to inject table names into SQL queries like the above using `[@databasees/sql](https://www.atdatabases.org)` see our tests for an example.

:::

## Writing

While the above is slightly simpler for the average use case, the increased simplicity becomes a lot more obvious when you are doing mutating queries, creating new tables, and just generally interacting with the Tableland smart contracts. For instance, the old way to create, mutate, and then query a table looked something like this:

```js
import { connect } from "@tableland/sdk";

// Connect to the Tableland testnet
// Default to grabbing a MetaMask connection in a browser
const conn = await connect();
// For client-side apps, call `siwe` to prompt a browser wallet sign-in flow
await conn.siwe();

// Create a new table with a supplied SQL schema and optional `prefix`
const { name } = await tableland.create(
  `id integer primary key, name text`, // Table schema definition
  {
    prefix: `my_sdk_table`, // Optional `prefix` used to define a human-readable string
  }
);

// The table's `name` is in the format `{prefix}_{chainId}_{tableId}`
console.log(name); // e.g., my_sdk_table_80001_311
// Without the supplied `prefix`, `name` would be be `_80001_311`

// Insert a row into the table
const writeRes = await tableland.write(
  `INSERT INTO ${name} (id, name) VALUES (0, 'Bobby Tables');`
);

// Perform a read query, requesting all rows from the table
const readRes = await tableland.read(`SELECT * FROM ${name};`);
```

With the new SDK, the above is simplified significantly, and only requires the following set of commands. Additionally, it is safer and simpler to use with parameter binding, and you can control more easily which statements you wait for (and more). Additionally, it feels a lot more like you are "just writing SQL" statements:

```js
import { Database } from "@tableland/sdk";

// Default to grabbing a MetaMask connection in a browser
const db = new Database();

const { meta: create } = await db
  .prepare("CREATE TABLE my_sdk_table (id integer primary key, name text);")
  .run();

// The table's `name` is in the format `{prefix}_{chainId}_{tableId}`
console.log(create.txn.name); // e.g., my_sdk_table_80001_311

// Insert a row into the table
const { meta: insert } = await db
  .prepare(`INSERT INTO ${name} (id, name) VALUES (?, ?);`)
  .bind(0, "Bobby Tables")
  .run();

// Wait for transaction finality
await insert.txn.wait();

// Perform a read query, requesting all rows from the table
const { results } = await db.prepare(`SELECT * FROM ${name};`).all();
```

:::tip
In the old way, the statements were being relayed by the Validator(s) so only a single signature was needed. In the new version, the Validators are no longer relaying transactions, so it might require two signed transactions. For multiple writes, it is also possible to use the `db.batch([…])` method to batch these calls into a single signed transaction (which also uses less gas).

:::

## More control

For folks that were using the old SDK to do more fine-grained access to Tableland, such as getting, setting, and locking controller contracts, or listing a user’s tables, etc you might find that these operations don’t fit within the Database abstraction provided above. This is where the two additional core APIs come into play.

For direct access to API calls on the Validator(s), you can leverage the Validator class:

```jsx
import { Validator } from "@tableland/sdk";

// Pull info from an existing Database instance
const obj = await new Validator(db.config); // Readonly is fine

const isHealthy = await obj.health();
console.log(isHealthy); // true

const { name, schema } = await obj.getTableById({
  chainId: 80001,
  tableId: "1",
});
console.log(name); // healthbot_31337_1
console.log(schema);
/*
{
	columns: [
		{
			name: "counter",
			type: "integer",
		},
	],
}
*/
```

Similarly, for more direct access to the Tableland Tables smart contract methods, you can leverage the Registry class:

```jsx
import { Registry } from "@tableland/sdk";
import { getContractReceipt } from "@tableland/sdk/helpers";

// Pull info from an existing Database instance
const reg = await new Registry(db.config); // Must have a signer

const tx = await reg.createTable({
  chainId: 31337,
  statement: "create table test_ownership_31337 (id int, name text)",
});
// Helper function to extract table name event information
const receipt = await getContractReceipt(tx);

// List my tables
const results = await reg.listTables(/* default to connected wallet address */);

// Transfer the above table to my friend!
const tx = await reg.safeTransferFrom({
  to: friendAddress,
  tableName: receipt, // Also accepts name as string
});
// Tableland adopts this "wait" style pattern from ethers!
await tx.wait();
```

## Integrations

With the new SDK, we have made third party library integrations our top priority. For example, if you are writing Tableland interactions inside a React app that uses something like `[wagmi](https://wagmi.sh)`, the above examples might _start off_ something like the following (inside your components/hooks):

```js
import { useSigner } from "wagmi";
import { Database } from "@tableland/sdk";

function App() {
  const { data: signer } = useSigner()

	const db = Database.fromSigner(signer);
	...
}
```

Additionally, thanks to our support for [Cloudflare’s `D1Database` interface](https://developers.cloudflare.com/d1/platform/client-api/), support for an ORM is possible via `[d1-orm](https://docs.interactions.rest/d1-orm/)`. Here’s a quick example of creating, updating, and querying a table via a Model object:

```js
import {
   D1Orm,
   DataTypes,
   Model,
   GenerateQuery,
   QueryType,
   type Infer,
 } from "d1-orm";
import { Database } from "@tableland/sdk";

const db = new Database({ autoWait: true });
const orm = new D1Orm(db);

const users = new Model(
 {
   D1Orm: orm,
   tableName: "users",
   primaryKeys: "id",
   uniqueKeys: [["email"]],
 },
 {
   id: {
     type: DataTypes.INTEGER,
     notNull: true,
   },
   name: {
     type: DataTypes.STRING,
     notNull: true,
   },
   email: {
     type: DataTypes.STRING,
   },
 }
);
type User = Infer<typeof users>;

const { meta: create } = await users.CreateTable({
	strategy: "default",
});

// Slight temporary hack
(users.tableName as any) = create.txn.name;

await users.InsertOne({
	name: "Bobby Tables",
	email: "bobby-tab@gmail.com",
});

const { results } = await users.All({
	where: { name: "Bobby Tables" },
	limit: 1,
	offset: 0,
	orderBy: ["id"],
});
```

Additional integrations provide some client-side safety for injecting table names, query parameters, and more via prepared statement syntax. While you don’t need `[@databases/sql](https://www.atdatabases.org)` to leverage prepared statements with the Tableland SDK, it does provide some nice methods for working with raw SQL strings, so we leverage it here:

```js
import sql, { FormatConfig } from "@databases/sql";
import { escapeSQLiteIdentifier } from "@databases/escape-identifier";
import { Database } from "@tableland/sdk";

// See https://www.atdatabases.org/docs/sqlite
const sqliteFormat: FormatConfig = {
  escapeIdentifier: (str) => escapeSQLiteIdentifier(str),
  formatValue: (value) => ({ placeholder: "?", value }),
};

// First, we'll test out using sql identifiers
const primaryKey = sql.ident("id");
const query = sql`CREATE TABLE test_sql (${primaryKey} integer primary key, counter integer, info text);`;
const { text, values } = query.format(sqliteFormat);
const { meta } = await db.prepare(text).bind(values).run();
const { name } = await meta.txn.wait();
console.log(`Created table ${name}`);
```

What about all those fancy `ethersjs` tools out there? We can leverage those in Tableland quite nicely, as we have pretty direct control over the `Signer` interface that drives our database mutations. Here’s how you might instantiate a `Database` within a Node app:
