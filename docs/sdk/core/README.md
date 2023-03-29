---
title: Get started
description: Get up an running with the Tableland SDK.
keywords:
  - SQL query
  - Tableland SDK
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

The JavaScript / TypeScript SDK allows developers to create tables on their chain of choice. Connect, create, and then interact with your tables thereafter with table writes and reads by using the primary `Database` API.

## Installation

You can install the SDK from the command line—navigate to the project's directory and run the following:

```bash npm2yarn
npm install --save @tableland/sdk
```

<br />

:::note
The Tableland SDK uses the modern `fetch` API. When working in Node, it is necessary to use a version of Node (v18+) that supports `fetch`, or provide global access to `node-fetch` to use the SDK. Review [these docs for an example](https://github.com/node-fetch/node-fetch#providing-global-access).
:::

## Usage

All table creates, writes, and reads fall under a single method: [`prepare`](prepared-statements).

Start by creating an instance of a `Database` and then pass SQL, such as `CREATE TABLE`, `INSERT INTO`, `UPDATE`, `DELETE`, and `SELECT` statements. Let’s start with a simple table read query. Every chain comes with a "healthbot" table that can be queried, which has a single `counter` column with integer value. For example, on Polygon Mumbai, this table is `healthbot_80001_1`.

### Reads

Start by importing the `Database` and establishing a read-only connection. This allows developers to bypass any wallet connection since table reads are not an on-chain operation. You’ll notice the `all` method (and `run` in the example below) is chained to the statement—more details are provided in the [query statement methods](query-statement-methods) section.

<Tabs groupId="sdk">
  <TabItem value="js" label="JavaScript" default>

    import { Database } from "@tableland/sdk";

    const tableName = "healthbot_80001_1"; // Our pre-defined health check table

    const db = new Database();

    const { results } = await db.prepare(`SELECT * FROM ${tableName};`).all();
    console.log(results);

  </TabItem>
    <TabItem value="ts" label="TypeScript">

    import { Database } from "@tableland/sdk";

    // This table has schema: `counter INTEGER PRIMARY KEY`
    const tableName: string = "healthbot_80001_1"; // Our pre-defined health check table

    interface HealthBot {
      counter: number;
    }

    const db = new Database<HealthBot>();

    // Type is inferred due to `Database` instance definition.
    // Or, it can be identified in `prepare`.
    const { results } = await db.prepare<HealthBot>(`SELECT * FROM ${tableName};`).all();
    console.log(results);

  </TabItem>
</Tabs>

### Creates

Once you are ready to create a table, you can follow rather standard SQL convention. You’ll first import the `Database` class, create a new instance, and then pass a `CREATE TABLE` statement to `prepare`. For readability purposes, a `prefix` variable is created and passed using string templating within the `prepare` method.

When connecting to the `Database`, the default will connect to Polygon Mumbai and use a browser connection (e.g., MetaMask prompt). For context, the [`run`](query-statement-methods#run) method returns metrics about the query, such as transaction information.

<Tabs groupId="sdk">
  <TabItem value="js" label="JavaScript" default>

    import { Database } from "@tableland/sdk";

    // Default to grabbing a wallet connection in a browser
    const db = new Database();

    // This is the table's `prefix`--a custom table value prefixed as part of the table's name
    const prefix = "my_sdk_table";

    const { meta: create } = await db
      .prepare(`CREATE TABLE ${prefix} (id integer primary key, name text);`)
      .run();

    // The table's `name` is in the format `{prefix}_{chainId}_{tableId}`
    console.log(create.txn.name); // e.g., my_sdk_table_80001_311

  </TabItem>
    <TabItem value="ts" label="TypeScript">

    import { Database } from "@tableland/sdk";

    interface Schema {
      id: number;
      name: string;
    }

    // Default to grabbing a wallet connection in a browser
    const db = new Database<Schema>();

    // This is the table's `prefix`; a custom table value prefixed as part of the table's name
    const prefix: string = "my_sdk_table";

    const { meta: create } = await db
      .prepare(`CREATE TABLE ${prefix} (id integer primary key, name text);`)
      .run();

    // The table's `name` is in the format `{prefix}_{chainId}_{tableId}`
    console.log(create.txn?.name); // e.g., my_sdk_table_80001_311

  </TabItem>
</Tabs>

At this point, the table exists, but it has no data.

Note it _is_ possible to create a table without a `prefix` value; you can use an empty string. In this case, do be careful with string interpolation. You’ll want to wrap the prefix passed to the `prepare` method in double quotes so that the "empty" table name is recognized and doesn't cause a SQL syntax error.

```js
const prefix = ""; // An empty string is a valid prefix, but make sure the CREATE TABLE statement sees it!
const { meta: create } = await db
  .prepare(`CREATE TABLE "${prefix}" (id integer primary key, name text);`)
  .run();
```

In general, double quotes around any table name in a statement is valid SQL.

### Writes

The SDK allows for _[parameter binding](prepared-statements#parameter-binding)_ to help simplify writing queries (includes both mutating and read queries). The `?` is an _anonymous_ parameter, which replaces the values in the statement with those in `bind`. Let’s extend the example for creating a table.

<Tabs groupId="sdk">
  <TabItem value="js" label="JavaScript" default>

    // Insert a row into the table
    const { meta: insert } = await db
      .prepare(`INSERT INTO ${name} (id, name) VALUES (?, ?);`)
      .bind(0, "Bobby Tables")
      .run();

    // Wait for transaction finality
    await insert.txn.wait();

    // Perform a read query, requesting all rows from the table
    const { results } = await db.prepare(`SELECT * FROM ${name};`).all();

  </TabItem>
    <TabItem value="ts" label="TypeScript">

    // Insert a row into the table
    const { meta: insert } = await db
      .prepare(`INSERT INTO ${name} (id, name) VALUES (?, ?);`)
      .bind(0, "Bobby Tables")
      .run();

    // Wait for transaction finality
    await insert.txn?.wait();

    // Perform a read query, requesting all rows from the table
    const { results } = await db.prepare(`SELECT * FROM ${name};`).all();

  </TabItem>
</Tabs>

When a table is written to, it includes two steps:

1. On-chain interaction—this is what the `wait` method is waiting for (i.e., transaction finality).
2. Off-chain materialization—once `wait` is fulfilled, the mutating SQL query will have been materialized by the Tableland network and is now readable with the `SELECT` statement.