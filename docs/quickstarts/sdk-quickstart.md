---
title: SDK quickstart
sidebar_label: SDK
description: Learn how to create a table, add some sample data, and query the data using the SDK.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

`Database` connections can either be either read-only or mutating and use a providers & signers to dictate chain connections. If you are simply reading from a database, you can use the `Database` object without a `Signer` since reads can occur across any chain. However, if you want to create a table or write to it, you must use a `Signer` to specify and connect to the chain. For more information, check out the [`Signers`](/sdk/database/signers) page.

## 1. Installation & setup

From the command line, `cd` to the project’s directory and install the SDK.

```bash npm2yarn
npm install --save @tableland/sdk
```

Then, in your source code, import the SDK:

```js
import { Database } from "@tableland/sdk";
```

:::note
Note Tableland SDK uses the modern `fetch` API, which is only available starting with Node 18. If you're using an earlier version (Node 16 or before), you must [provide global access](https://github.com/node-fetch/node-fetch#providing-global-access) to `fetch` as well as `Headers` to use the SDK. [Check out this walkthrough](/sdk/reference/compatability#node-polyfills) for how to do this.
:::

### Ethers

Note that Tableland uses [ethersjs](https://docs.ethers.org/v5/) under the hood. The version being used is the **last version of ethersjs v5** (5.7.2) and **not the latest version overall** (v6). So, it's likely you'll need to install `ethers@^5.7.2` in your project:

```bash
npm i --save ethers@^5.7.2
```

### Local development

It's easiest to also use Local Tableland when you're first getting started. Install the `@tableland/local` package globally (see [here](/local-tableland) for details) and then start the local nodes. This will spin up a local Tableland validator node as well as a Hardhat node, allowing you to connect to chain ID `31337` and RPC URL `http://127.0.0.1` for testing purposes.

```bash npm2yarn
npm install -g @tableland/local
```

And then spin the nodes up so that you can use Tableland without needing to connect to any testnets or mainnets:

```bash
npx local-tableland
```

## 2. Connect to a signer

The snippet below is not needed if you're connecting to a browser wallet. But, if you're developing in Node, you'll have to instantiate a `Signer` and then pass the signer to the `Database` constructor. Let's review this first with a Hardhat account being used as the signer & private key.

<Tabs groupId="sdk">
<TabItem value="nodejs" label="Node.js" default>

```js
import { Database } from "@tableland/sdk";
import { Wallet, getDefaultProvider } from "ethers";

const privateKey =
  "59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"; // Your private key
const wallet = new Wallet(privateKey);
// To avoid connecting to the browser wallet (locally, port 8545),
// replace the URL with a provider like Alchemy, Infura, Etherscan, etc.
const provider = getDefaultProvider("http://127.0.0.1:8545"); // For example: "https://polygon-mumbai.g.alchemy.com/v2/${process.env.YOUR_ALCHEMY_KEY}"
const signer = wallet.connect(provider);
// Connect to the database
const db = new Database({ signer });
```

</TabItem>
<TabItem value="web" label="Web">

```js
import { Database } from "@tableland/sdk";
import { providers, Signer } from "ethers";

// Establish a connection with a `Signer`
const provider = new providers.Web3Provider(window.ethereum);
// Request the connected accounts, prompting a browser wallet popup to connect.
await provider.send("eth_requestAccounts", []);
// Create a signer from the returned provider connection.
const signer = provider.getSigner();

const tableland = Database({ signer });
```

</TabItem>
</Tabs>

## 3. Create a table

As mentioned, you can create a table by instantiating an ethers a `Signer`, but if you're working with frontends, a `Database` instantiation will default to a browser wallets if no signer is passed. There might be a bit of extra work if you're _not_ using ethers—for example, [wagmi](https://wagmi.sh/) using the [viem](https://viem.sh/) library, which needs special adapter to handle the `ethers` library's `Signer`. See the [wagmi docs](/playbooks/frameworks/wagmi) for more details.

Start by connecting to an instance of the `Database` class, and use the `prepare` method while passing a `CREATE TABLE {prefix} ...` statement. You can then `run` this statement to execute it.

Note the examples below do use a `signer` passed to the `Database`. If you want to default to a browser connect, instead of passing the signer, you can choose to instantiate the `Database` with nothing, like `const db = new Database()`. This is an alternative to the example from the previous step.

<Tabs groupId="sdk">
<TabItem value="js" label="JavaScript" default>

```js
const db = new Database({ signer });

// This is the table's `prefix`--a custom table value prefixed as part of the table's name
const prefix = "my_table";
const { meta: create } = await db
  .prepare(`CREATE TABLE ${prefix} (id integer primary key, val text);`)
  .run();
await create.txn?.wait();

// The table's `name` is in the format `{prefix}_{chainId}_{tableId}`
const tableName = create.txn?.names[0] ?? ""; // e.g., my_table_31337_2
```

</TabItem>
<TabItem value="ts" label="TypeScript">

```ts
// Interface for the table's schema
interface TableSchema {
  id: number;
  val: string;
}

const db = new Database<TableSchema>({ signer });

// This is the table's `prefix`--a custom table value prefixed as part of the table's name
const prefix: string = "my_table";
const { meta: create } = await db
  .prepare(`CREATE TABLE ${prefix} (id integer primary key, val text);`)
  .run();
await create.txn?.wait();

// The table's `name` is in the format `{prefix}_{chainId}_{tableId}`
const tableName = create.txn?.names[0] ?? ""; // e.g., my_table_31337_2
```

</TabItem>
</Tabs>

All tables are created onchain (as ERC721 tokens). The main takeaway: every table creation comes with an onchain transaction. Once that transaction has been finalized (time varies, per chain), you can access the table’s `name`, which will have appended the `chainId` and `tableId` to whatever `prefix` was specified in the create statement.

## 4. Write to a table

Now that you’ve created a table, you now own it. It is associated with the wallet / address that created it. With ownership, you have full access control and write privileges unless otherwise specified. You’ll notice that _parameter binding_ is possible with the `?` symbol, allowing developers to follow the [SQLite convention](https://www.sqlite.org/lang_expr.html#varparam) for prepared statements and pass replace values from `prepare` with those in `bind`.

<Tabs groupId="sdk">
<TabItem value="js" label="JavaScript" default>

```js
// Insert a row into the table
const { meta: insert } = await db
  .prepare(`INSERT INTO ${tableName} (id, val) VALUES (?, ?);`)
  .bind(0, "Bobby Tables")
  .run();

// Wait for transaction finality
await insert.txn?.wait();
```

</TabItem>
<TabItem value="ts" label="TypeScript">

```js
// Insert a row into the table
const { meta: insert } = await db
  .prepare(`INSERT INTO ${tableName} (id, val) VALUES (?, ?);`)
  .bind(0, "Bobby Tables")
  .run();

// Wait for transaction finality
await insert.txn?.wait();
```

</TabItem>
</Tabs>

Static statements are still possible (e.g., specifying `0` and `"Bobby Tables"` within the `INSERT` statement), but binding can make things a lot easier. There are also more complex controls that table owners can implement to grant other addresses mutation privileges.

## 5. Read from a table

Table _reads_ do not require an onchain connection. Technically, you can instate the `Database` class without needing a signer in order to make a read query (`SELECT` statement) using the same `prepare`, which returns the values in the table. Let's continue using the same table created and written to in the prior steps, which was saved in the `tableName` variable. Note that in these examples, we show a "read-only" `Database` instantiation. There's no need to instantiate a different database connection for creates vs. writes vs. reads, but we're doing so here to show that you can use the `Database` class a bit differently in read-only use cases. Namely, no signer required!

<Tabs groupId="sdk">
<TabItem value="js" label="JavaScript" default>

```js
const db = new Database();

const { results } = await db.prepare(`SELECT * FROM ${tableName};`).all();
console.log(results);
```

</TabItem>
<TabItem value="ts" label="TypeScript">

```js
interface TableSchema {
  id: number;
  val: string;
}

const db: Database<TableSchema> = new Database();

// Type is inferred due to `Database` instance definition
const { results } = await db.prepare(`SELECT * FROM ${tableName};`).all();
console.log(results);
```

</TabItem>
</Tabs>

## Putting it all together

For copypasta examples using Node, you can use the following. The private key shown is one of the Hardhat accounts that is created with you start Local Tableland. If you're developing on the frontend, the examples below can simply remove the ethers import and setup prior to instantiating the `Database` class, along with eliminating passing the signer to the `Database` constructor (e.g., `const db = new Database()`).

<Tabs groupId="sdk">
<TabItem value="js" label="JavaScript" default>

```js
import { Database } from "@tableland/sdk";
import { Wallet, getDefaultProvider } from "ethers";

const privateKey =
  "59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"; // Your private key
const wallet = new Wallet(privateKey);
// To avoid connecting to the browser wallet (locally, port 8545).
// For example: "https://polygon-mumbai.g.alchemy.com/v2/YOUR_ALCHEMY_KEY"
const provider = getDefaultProvider("http://127.0.0.1:8545");
const signer = wallet.connect(provider);

// Create a database connection
const db = new Database({ signer });
const prefix = "my_table";
const { meta: create } = await db
  .prepare(`CREATE TABLE ${prefix} (id integer primary key, val text);`)
  .run();
await create.txn?.wait();

// The table's `name` is in the format `{prefix}_{chainId}_{tableId}`
const tableName = create.txn?.names[0] ?? ""; // e.g., my_table_31337_2
console.log(tableName);
const { meta: insert } = await db
  .prepare(`INSERT INTO ${tableName} (id, val) VALUES (?, ?);`)
  .bind(0, "Bobby Tables")
  .run();

// Wait for transaction finality
await insert.txn?.wait();

// Read the table
const { results } = await db.prepare(`SELECT * FROM ${tableName};`).all();
console.log(results);
```

</TabItem>
<TabItem value="ts" label="TypeScript">

```ts
import { Database } from "@tableland/sdk";
import { Wallet, getDefaultProvider } from "ethers";

const privateKey =
  "59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d";
const wallet = new Wallet(privateKey);
// To avoid connecting to the browser wallet (locally, port 8545).
// For example: "https://polygon-mumbai.g.alchemy.com/v2/YOUR_ALCHEMY_KEY"
const provider = getDefaultProvider("http://127.0.0.1:8545");
const signer = wallet.connect(provider);

// Create a database connection
interface TableSchema {
  id: number;
  val: string;
}

const db: Database<TableSchema> = new Database({ signer });
const prefix = "my_table";
const { meta: create } = await db
  .prepare(`CREATE TABLE ${prefix} (id integer primary key, val text);`)
  .run();
await create.txn?.wait();

// The table's `name` is in the format `{prefix}_{chainId}_{tableId}`
const tableName = create.txn?.names[0] ?? ""; // e.g., my_table_31337_2
console.log(tableName);
const { meta: insert } = await db
  .prepare(`INSERT INTO ${tableName} (id, val) VALUES (?, ?);`)
  .bind(0, "Bobby Tables")
  .run();

// Wait for transaction finality
await insert.txn?.wait();

// Read the table
const { results } = await db.prepare(`SELECT * FROM ${tableName};`).all();
console.log(results);
```

</TabItem>
</Tabs>
