---
title: Chunking queries
description: Break up large queries into smaller chunks to onchain gas limits.
keywords:
  - query chunking
  - limits
  - 35kb
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

## Overview

Tableland create and write statements flow through a pass chain. Because all chains have execution limits, there is a [35kb limit](/fundamentals/limits) imposed on the size of a single transaction. This means that if you try to execute a statement that is larger than 35kb, it will fail. We'll walk through how you can implement your own query chunking logic to get around this limit and submit multiple transactions to execute a set of statements.

## Setup

Make sure you have the SDK installed:

```bash npm2yarn
npm install @tableland/sdk
```

We'll assume you already have a `Database` instantiated with a signer, but check out the [getting started guide](/sdk/database) if you need help.

## Chunking queries

With the `batch` method, you can execute multiple statements in a method call. Each individual statement must only touch a single table, but multiple tables can be mutated in the batch. The `batch` method takes an array of prepared statements but if the statement exceeds 35kb, the onchain execution will fail due to gas limits being exceeded. To get around this, we can chunk the statements into smaller batches and execute them in sequence.

If you have a set of full statements, the process is a bit easier because you can just send the prepared statements one by one:

```js
const [batch] = await db.batch([
  db.prepare(`INSERT INTO my_table (id, val) VALUES (1, 'test 1');`),
  db.prepare(`INSERT INTO my_table (id, val) VALUES (2, 'test 2');`),
]);
```

However, if you're inserting into the same columns, this can be a bit inefficient and costly because the longer a string is, the more gas it will cost to execute. Instead, a more efficient route would be to form the SQL statement as `INSERT INTO my_table(id, val)VALUES(1,'test 1'),(2,'test 2');`. We'll walk through how to do this.

### Table & data creation

First, we'll create a table and set up the rows that we want to chunk. The example below creates an array of arrays, where each inner array is a row to be inserted into the table: the row ID, and the row value. In total, 10k rows are created, and this will end up totalling to over 188kb of data—well over the 35kb limit!

```js
// Create a table with `id` and `val`
const { meta: create } = await db
  .prepare(`CREATE TABLE my_table (id integer primary key, val text);`)
  .all();
await create.txn?.wait();
const [tableName] = create.txn?.names ?? [];

// Crete an array like `[ [1, 'test 1'], [2, 'test 2'], ... ]`
const data = Array.from({ length: 10000 }, (_, i) => [i, `'test ${i}'`]);
```

### Helper methods

The first set of helpers will make it easy to do two things:

1. Convert a row into a string that can be inserted into the table (e.g., `(1, 'test 1')`).
2. Get the byte size of a string.

<Tabs groupId="sdk">
<TabItem value="js" label="JavaScript" default>

```js
const getNextValues = function (row) {
  return `(${row.join(",")}),`;
};

const getByteSize = function (str) {
  return new Blob([str]).size;
};
```

</TabItem>
<TabItem value="ts" label="TypeScript">

```ts
const getNextValues = function (row: Array<string | number>): string {
  return `(${row.join(",")}),`;
};

const getByteSize = function (str: string): number {
  return new Blob([str]).size;
};
```

</TabItem>
</Tabs>

### Chunking

Here, will write the core logic for chunking. The `getBatches` function takes an array of rows and returns an array of strings such that each string is contains a set of values that can be executed in a single transaction. The `MAX_STATEMENT_SIZE` is set to 35kb, and the outer `while` loop will continue to execute until all rows have been processed.

The inner `while` loop will continue to execute until the next row would exceed the 35kb limit. Once the limit is reached, the `statement` is pushed to the `batches` array, and the next statement processing is started. Once all rows have been processed, the `batches` array is returned after mapping it to an array of prepared statements.

<Tabs groupId="sdk">
<TabItem value="js" label="JavaScript" default>

```js
const getBatches = function (rows) {
  const MAX_STATEMENT_SIZE = 35000;
  const batches = [];
  while (rows.length > 0) {
    // Example with INSERT INTO statement (minimal whitespace for cost efficiency)
    let statement = `INSERT INTO ${tableName}(id,val)VALUES`;

    // Make sure a row can be added without exceeding the 35kb limit
    while (
      rows.length > 0 &&
      getByteSize(statement) + getByteSize(getNextValues(rows[0])) <
        MAX_STATEMENT_SIZE
    ) {
      // Remove the row from the array and add it to the statement
      const row = rows.shift();
      if (!row) break;
      statement += getNextValues(row);
    }

    // Remove the trailing comma and add a semicolon for the final statement
    statement = statement.slice(0, -1) + ";";
    batches.push(statement);
  }

  // Map to the format that the `batch` method expects
  return batches.map((stmt) => db.prepare(stmt));
};
```

</TabItem>
<TabItem value="ts" label="TypeScript">

```ts
import { type Statement } from "@tableland/sdk";

// Existing code...

const getBatches = function (rows: Array<Array<string | number>>): Statement[] {
  const MAX_STATEMENT_SIZE = 35000;
  const batches = [];
  while (rows.length > 0) {
    // Example with INSERT INTO statement (minimal whitespace for cost efficiency)
    let statement = `INSERT INTO ${tableName}(id,val)VALUES`;

    // Make sure a row can be added without exceeding the 35kb limit
    while (
      rows.length > 0 &&
      getByteSize(statement) + getByteSize(getNextValues(rows[0])) <
        MAX_STATEMENT_SIZE
    ) {
      // Remove the row from the array and add it to the statement
      const row = rows.shift();
      if (!row) break;
      statement += getNextValues(row);
    }

    // Remove the trailing comma and add a semicolon for the final statement
    statement = statement.slice(0, -1) + ";";
    batches.push(statement);
  }

  // Map to the format that the `batch` method expects
  return batches.map((stmt) => db.prepare(stmt));
};
```

</TabItem>
</Tabs>

### Execution

Now that we have the helper methods and the chunking logic, we can execute the statements. We can take the `data` that we created above, pass it to the `getBatches` function to get an array of statements, and the

```js
const batches = getBatches(data);

const [{ meta }] = await db.batch(batches);
await meta.txn?.wait();
```

The execution logs will show that multiple sets of statements were created and executed, allowing a large set of statements to be executed across many individual INSERT statements.
