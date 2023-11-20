---
title: Query statement methods
description: Mutate your table values with additional access control.
keywords:
  - write to table
  - mutate table
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

A `Database` will `prepare` a `Statement` and then let you choose how it should be executed. Each statement method comes with different behavior, tailored to your use case.

## Overview

When calling the the `Database` API’s `prepare` method, it returns an object that supports a variety of query statement methods. Each one is asynchronous and should be called upon that response object—for demonstration purposes, the `stmt` variable is used to save the response from `prepare` and then further transform the result.

```js
const tableName = `healthbot_80001_1`;
// Define the `Database` response object
const stmt = db.prepare(`SELECT * FROM ${tableName};`);
// Call a query statement method
await stmt.all();
```

All of these methods should be `await`ed. The following defines the full set of possible methods and how they should be called with some variable like `stmt`.

- `await stmt.all()`
- `await stmt.run()`
- `await stmt.raw()`
- `await stmt.first( [column] )`

On Tableland, mutating transactions such as `INSERT`, `DELETE`, and `UPDATE` produce a two-phase transaction. Firstly, the transaction is sent to the registry contract and awaited. The returned `txn` information also contains a `wait` method that can be used to await finalization on the Tableland network. This method will also throw an exception if any runtime errors occur.

## Options

All methods can take an optional `opts` object as the last parameter. This is an object that only has a single parameter for polling behavior: `controller`. It can be used to specify how long to wait for a transaction to be mined, and you can create your own, if desired. See the [polling controller docs](/sdk/database/polling-queries) for more details.

## Response format

The responses vary, depending on the query and method. For `all()`, `raw()`, and `run()`, if the statement is a create/mutate query, the response is an object with the following properties. Namely, the `txn` property will be included only for mutating queries, so if it's a read-only query, then the `txn` will _not_ be included. (Read queries don't execute onchain, so there's not a transaction to return.) The general format is:

```js
{
  results: [], // may be empty if the query is a mutating query
  success: boolean, // true if the operation was successful
  error?: string, // undefined if no error
  meta: {
    duration: number, // duration of operation in milliseconds
    txn?: {
        tableIds: string[],
        transactionHash: string,
        blockNumber: number,
        chainId: number,
        names: string[],
        prefixes: string[],
        wait(): Promise<{ ... }>
    }
  }
}
```

- `results`: An array of query results. For mutating queries, this will always be an empty array. Read queries will return the results of the query.
- `success`: A boolean that indicates whether the query was successful or not (almost always `true`).
- `error`: An error string, if applicable. This will be `undefined` if the query was successful. Note that calling the `wait()` method on the `txn` object will throw an exception if any runtime errors occur.
- `meta`: A metadata object that contains the following properties:
  - `duration`: The time it took to execute the query, in milliseconds.
  - `txn` (only included for mutating queries): The transaction object, if applicable. This is only returned for mutating transactions such as `CREATE TABLE`, `INSERT`, `UPDATE`, and `DELETE`. Within this, there will be:
    - `tableIds`: The ID of the table(s) that were mutated.
    - `transactionHash`: The transaction hash of the transaction that was sent to the registry contract.
    - `blockNumber`: The block number of the transaction.
    - `chainId`: The chain ID of the transaction/network.
    - `names`: The universally unique table name(s) of the mutated table(s).
    - `prefixes`: The table(s) custom prefix.
    - `wait`: An async function that can be used to await finalization on the Tableland network. This method will also throw an exception if any runtime errors occur.

Thus, you wind up with something like the following for mutating queries vs. read queries:

<Tabs groupId="statement">
<TabItem value="mutate" label="Mutate" default>

```js
{
  meta: {
    duration: 242.74066734313965,
    txn: {
      tableIds: ["2"],
      transactionHash: "0xbd4e2b6c62263bfa1b0d9b9d2c6ea3960b3484e2957d14da9995841c6e09fb5b",
      blockNumber: 342,
      chainId: 31337,
      prefixes: ["my_table"],
      names: ["my_table_31337_2"],
      wait: [AsyncFunction: wait]
    }
  },
  success: true,
  results: [],
  error: undefined
}
```

</TabItem>
<TabItem value="read" label="Read">

```js
{
  meta: {
    duration: 23.729291915893555
  },
  success: true,
  results: [
    {
      id: 1,
      val: "test 1"
    }
  ],
  error: undefined
}
```

</TabItem>
</Tabs>

Now, for the `first()` and `raw()` methods, these behave a little differently. The `raw()` method will return _only_ metrics for mutating queries, and read queries will get a simple, raw response of an array of arrays (each a row). The `first()` method will return the first row of the results, and it will be an object—or if you pass the column name, it will be an array of the just column value. See the details below for more context.

## `all`

Returns all rows and metadata.

The first example is a `CREATE TABLE` query, which is a mutating query—notice the `meta.txn?.wait()` pattern. The second example is a `SELECT` query, which is a read query (there's no `txn` property, so the a different pattern is used).

```js
const stmt = db.prepare(
  "CREATE TABLE my_table (id integer primary key, val text)"
);
const { meta } = await stmt.all();
await meta.txn?.wait();
```

After you insert a few rows, you can run a `SELECT` query:

```js
const stmt = db.prepare("SELECT * FROM my_table LIMIT 3");
const { results } = await stmt.all();
```

The destructing lets you access the `results` property directly.

```json
[
  {
    "id": 1,
    "val": "test 1",
  },
  {
    "id": 2,
    "val": "test 2",
  },
  {
    "id": 3,
    "val": "test 3",
  }
];
```

## `run`

Runs the query but returns no results. Instead, `run()` returns the metrics only, so it's useful for write operations like `UPDATE`, `DELETE` or `INSERT`.

```js
const { meta } = await db
  .prepare("INSERT INTO my_table (id, val) VALUES (?1, ?2)")
  .bind(2, "test 2")
  .run();
await meta.txn?.wait();
```

Thus, the `meta` will be:

```json
{
  "duration": 242.74066734313965,
  "txn": {
    "tableIds": ["2"],
    "transactionHash": "0xbd4e2b6c62263bfa1b0d9b9d2c6ea3960b3484e2957d14da9995841c6e09fb5b",
    "blockNumber": 342,
    "chainId": 31337,
    "prefixes": ["my_table"],
    "names": ["my_table_31337_2"]
  }
}
```

## `raw`

Returns all rows and metadata.

For read queries, this has similar functionality as `all()`, but returns an array of rows instead of objects. Mutating queries operate the same as `all()`.

```js
const stmt = db.prepare("SELECT * FROM my_table");
const results = await stmt.raw();
```

So, `results` will be an array of arrays, each representing a row:

```json
[
  [1, "test 1"],
  [2, "test 2"],
  [3, "test 3"]
];
```

## `first`

Returns the first row of the results.

It _should only_ be used with `SELECT` queries; this does not return metadata like the other methods. Instead, it returns the object directly. It also takes an optional `column` parameter.

For example, get a specific column from the first row:

```js
const stmt = db.prepare("SELECT * FROM my_table");
const total = await stmt.first("id");
```

This will simply give you the result of the first row's `id` column within an array: `[ 1 ]`

Or, to get all of the columns from the first row:

```js
const stmt = db.prepare("SELECT * FROM my_table");
const values = await stmt.first();
```

This will simply give you the result as an object:

```json
{
  "id": 1,
  "val": "test 1"
}
```

If the query returns no rows, then `first()` will return `null`. And if the query returns rows, but `column` does not exist, then `first()` will throw an exception.
