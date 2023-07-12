---
title: SDK quickstart
sidebar_label: SDK
description: Learn how to create a table, add some sample data, and query the data using the SDK.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

`Database` connections can either be either read-only or mutating and use a providers & signers to dictate chain connections. If you are simply reading from a database, you can use the `Database` object without a `Signer` since reads can occur across any chain. However, if you want to create a table or write to it, you must use a `Signer` to specify and connect to the chain. For more information, check out the [`Signers`](/sdk/database/signers) page.

## 1. Installation

From the command line, `cd` to the project’s directory and install the SDK.

```bash npm2yarn
npm install --save @tableland/sdk
```

:::note
The Tableland SDK uses the modern `fetch` API, which is only available starting with Node 18. If you're using an earlier version (Node 16 or before), you must [provide global access](https://github.com/node-fetch/node-fetch#providing-global-access) to `fetch` as well as `Headers` to use the SDK. [Check out this walkthrough](/sdk/reference/node-polyfills) for how to do this.
:::

## 2. Read from a table

Table _reads_ do not require an on-chain connection. You can import the `Database` object, specify the chain you’re reading from, and make a read query (`SELECT` statement) using `prepare`, which returns the values in the table.

<Tabs groupId="sdk">
<TabItem value="js" label="JavaScript" default>

```js
import { Database } from "@tableland/sdk";

const tableName = "healthbot_80001_1"; // Our pre-defined health check table

const db = new Database();

const { results } = await db.prepare(`SELECT * FROM ${tableName};`).all();
console.log(results);
```

</TabItem>
<TabItem value="ts" label="TypeScript">

```js
import { Database } from "@tableland/sdk";

// This table has schema: `counter INTEGER PRIMARY KEY`
const tableName: string = "healthbot_80001_1"; // Our pre-defined health check table

interface HealthBot {
  counter: number;
}

const db: Database<HealthBot> = new Database();

// Type is inferred due to `Database` instance definition
const { results } = await db.prepare(`SELECT * FROM ${tableName};`).all();
console.log(results);
```

</TabItem>
</Tabs>

The healthbot table exists on each network in which Tableland is deployed on with a varying chain ID. The table name format is in the format `{prefix}_{chainId}_{tableId}`.

## 3. Create a table

Instead of _only_ reading data, you can create your own table and also write to it; this will need a `Signer` (a `Database` instantiation will default to a browser wallets). Do this by connecting to an instance of the `Database` object, and use the same `prepare` method while passing a `CREATE TABLE {prefix} ...` statement. You can then `run` this statement to execute it.

<Tabs groupId="sdk">
<TabItem value="js" label="JavaScript" default>

```js
import { Database } from "@tableland/sdk";

// Default to grabbing a wallet connection in a browser
const db = new Database();

// This is the table's `prefix`--a custom table value prefixed as part of the table's name
const prefix: string = "my_sdk_table";

const { meta: create } = await db
  .prepare(`CREATE TABLE ${prefix} (id integer primary key, val text);`)
  .run();

// The table's `name` is in the format `{prefix}_{chainId}_{tableId}`
const { name } = create.txn; // e.g., my_sdk_table_80001_311
```

</TabItem>
<TabItem value="ts" label="TypeScript">

```js
import { Database } from "@tableland/sdk";

interface Schema {
  id: number;
  val: string;
}

// Default to grabbing a wallet connection in a browser
const db = new Database<Schema>();

// This is the table's `prefix`; a custom table value prefixed as part of the table's name
const prefix: string = "my_sdk_table";

const { meta: create } = await db
  .prepare(`CREATE TABLE ${prefix} (id integer primary key, val text);`)
  .run();

// The table's `name` is in the format `{prefix}_{chainId}_{tableId}`
const { name } = create.txn!; // e.g., my_sdk_table_80001_311
```

</TabItem>
</Tabs>

All tables are created on-chain (as ERC721 tokens). The main takeaway: every table creation comes with an on-chain transaction. Once that transaction has been finalized (time varies, per chain), you can access the table’s `name`, which will have appended the `chainId` and `tableId` to whatever `prefix` was specified in the create statement.

## 4. Write to a table

Now that you’ve created a table, you now own it. It is associated with the wallet / address that created it. With ownership, you have full access control and write privileges unless otherwise specified. You’ll notice that _parameter binding_ is possible with the `?` symbol, allowing developers to follow the [SQLite convention](https://www.sqlite.org/lang_expr.html#varparam) for prepared statements and pass replace values from `prepare` with those in `bind`.

<Tabs groupId="sdk">
<TabItem value="js" label="JavaScript" default>

```js
// Insert a row into the table
const { meta: insert } = await db
  .prepare(`INSERT INTO ${name} (id, val) VALUES (?, ?);`)
  .bind(0, "Bobby Tables")
  .run();

// Wait for transaction finality
await insert.txn.wait();

// Perform a read query, requesting all rows from the table
const { results } = await db.prepare(`SELECT * FROM ${name};`).all();
```

</TabItem>
<TabItem value="ts" label="TypeScript">

```js
// Insert a row into the table
const { meta: insert } = await db
  .prepare(`INSERT INTO ${name} (id, val) VALUES (?, ?);`)
  .bind(0, "Bobby Tables")
  .run();

// Wait for transaction finality
await insert.txn?.wait();

// Perform a read query, requesting all rows from the table
const { results } = await db.prepare(`SELECT * FROM ${name};`).all();
```

</TabItem>
</Tabs>

Static statements are still possible (e.g., specifying `0` and `"Bobby Tables"` within the `INSERT` statement), but binding can make things a lot easier. There are also more complex controls that table owners can implement to grant other addresses mutation privileges.

:::tip
The Tableland SDK uses the modern fetch API. When working in Node, it is necessary to use a version of Node (v18+) that supports fetch, or provide global access to node-fetch to use the SDK (e.g., for Node v16 or earlier). [Check out this example](https://github.com/node-fetch/node-fetch#providing-global-access).

:::
