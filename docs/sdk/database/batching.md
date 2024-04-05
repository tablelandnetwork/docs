---
title: Batching statements & operations
sidebar_label: Database batch methods
description: Get up an running with the Tableland SDK.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

The following methods act only on the the an instance of `Database`. They provide more performant ways of writing SQL statement or performing migration tasks.

## Options

All methods can take an optional `controller` as the last parameter. This can control polling behavior to specify how long to wait for a transaction to be mined, and you can create your own, if desired. See the [polling controller docs](/sdk/helpers/polling-queries) for more details.

## Batch statements

Batching sends multiple SQL statements inside a single call to the network. This can have a huge performance impact as it reduces latency from network round trips to Tableland. This implementation guarantees that each statement in the list will execute and commit, sequentially, non-concurrently.

You _can_ batch queries that touch different tables, but you **_cannot_ have different statement types in a single batch call**. When batching queries, they must only correspond to the same type of query. For example, you can batch multiple mutating statements (`INSERT`, `UPDATE` and `DELETE`) together, but you cannot batch something like an `INSERT` with a `CREATE TABLE` nor a `SELECT` statement.

Batched statements are similar to [SQL transactions](https://www.sqlite.org/lang_transaction.html). If a statement in the sequence fails, then an error is returned for that specific statement, and it aborts or rolls back the entire sequence.

:::tip
If you're looking for an in-depth example of breaking up queries for batch execution, check out the chunking queries [walkthrough](/sdk/walkthroughs/chunking-queries).
:::

### `batch`

To send batch statements, you must feed `batch()` with a list of prepared statements and get back the results. That is, these do not have a statement method attached (e.g., `.all()`) since the `batch` method will handle the execution. You can also construct batches reusing the same prepared statement.

Let's review an example with different mutating queries that touch different tables:

```js
const db = new Database({ signer });
await db.batch([
  db.prepare("INSERT INTO my_table(id) VALUES ?1").bind(1234),
  db.prepare("UPDATE my_table SET id = ?1 WHERE id = ?2").bind(5678, 1234),
  db.prepare("INSERT INTO some_other_table(id) VALUES (999)"),
  db.prepare("DELETE FROM some_other_table"),
]);
```

### Response format

The query type affects the returned value. See the [query statement method docs](/sdk/database/query-statement-methods) for more details on these properties.

For `batch()`, if the statement is a mutating query, the response is an array containing objects with the following properties. That is, the `txn` property will be included only for create/mutate queries. Since these are executed atomically, if you pass multiple statements, the response will be a _single_ object within the array where the `txn` property shows the atomic transaction details. But, if it's a `batch()` of read-only query, then the `txn` will _not_ be included. If you're passing multiple `SELECT` statements, the array will contain _multiple_ response objects, each returning query results.

Thus, you wind up with something like the following for mutating queries vs. read queries:

<Tabs groupId="statement">
<TabItem value="mutate" label="Mutate" default>

```js
[
  {
    meta: {
      duration: 242.74066734313965,
      txn: {
        tableIds: ["2", "3"],
        transactionHash: "0xbd4e2b6c62263bfa1b0d9b9d2c6ea3960b3484e2957d14da9995841c6e09fb5b",
        blockNumber: 342,
        chainId: 31337,
        prefixes: ["my_table", "my_other_table"],
        names: ["my_table_31337_2", "my_other_table_31337_3"],
        wait: [AsyncFunction: wait]
      }
    },
    success: true,
    results: [],
    error: undefined
  }
]
```

</TabItem>
<TabItem value="read" label="Read">

```js
[
  {
    meta: {
      duration: 23.729291915893555,
    },
    success: true,
    results: [
      {
        id: 1,
        val: "test 1",
      },
    ],
    error: undefined,
  },
  {
    meta: {
      duration: 22.734291215893355,
    },
    success: true,
    results: [
      {
        id: 2,
        val: "test 2",
      },
    ],
    error: undefined,
  },
];
```

</TabItem>
</Tabs>

## Batching operations

There also exists an `exec()` method for the `Database`, which should only be used for maintenance and one-shot tasks. One important callout explained below is how the response format differs from all other database and statement methods. After calling `exec()`, the `meta` property is not included, so the typical `await meta.txn?.wait()` pattern will not work. Instead, you must use `await txn?.wait()` since it's now a top-level field.

### `exec`

This method executes one or more queries directly without prepared statements or parameters binding. This method can have poorer performance (prepared statements can be reused in some cases) and, more importantly, is less safe. Only use this method for maintenance and one-shot tasks (e.g., migration jobs). The input can be one or multiple queries separated by the standard `;`. If an error occurs, an exception is thrown with the query and error messages (see below for `Errors`).

Currently, the entire string of statements is submitted as a single transaction. In the future, more "intelligent" transaction planning, splitting, and batching may be used.

```js
const db = new Database({ signer });
const migration = await fetch("./migration.sql");
const execMigration = await db.exec(migration.text());
await execMigration.txn?.wait();

// Although not advised, this demonstrates how to execute multiple statements
const execWrites = await db.exec(
  "insert into my_table values (1); insert into my_table values (2);"
);
await execWrites.txn?.wait();

// But read-only queries must be a single statement
const execRead = await db.exec("select * from my_table;");
```

### Response format

The query type affects the returned value. See the [query statement method docs](/sdk/database/query-statement-methods) for more details on these properties, but the format is _slightly_ different from all other database and statement methods.

Recall the "typical" response format includes the `duration` and `txn` properties within a `meta` object, and it _always_ returns a `result`, even if it's empty. The `exec()` method moves these up into a top-level response, _does not_ include an `error` property, and includes a `count` property to represent the number of statements. It also conditionally includes a `txn` property for mutating queries, _or_ a `results` property for read-only queries (one or the other, but not both).

Thus, the response format is as follows:

<Tabs groupId="statement">
<TabItem value="mutate" label="Mutate" default>

```js
{
  count: number,
  duration: number,
  txn: { ... }
};
```

</TabItem>
<TabItem value="read" label="Read">

```js
{
  count: number,
  duration: number,
  results: [ ... ]
};
```

</TabItem>
</Tabs>

You wind up with something like the following for mutating queries vs. read queries:

<Tabs groupId="statement">
<TabItem value="mutate" label="Mutate" default>

```js
{
  count: 2,
  duration: 298.28783416748047,
  txn: {
    tableIds: ["2"],
    transactionHash: "0x8f83ed5e6fd5956098cdcf65321cf5a9804799546c122eb9507e9d4ede25ae4f",
    blockNumber: 11869,
    chainId: 31337,
    wait: [AsyncFunction: wait],
    prefixes: [ "my_table" ],
    names: [ "my_table_31337_2" ]
  }
}
```

</TabItem>
<TabItem value="read" label="Read">

```js
{
  count: 1,
  duration: 54.100582122802734,
  results: [ { id: 1 } ]
}
```

</TabItem>
</Tabs>
