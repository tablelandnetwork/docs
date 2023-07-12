---
title: Batching statement & operations
sidebar_label: Batching
description: Get up an running with the Tableland SDK.
---

The following methods act only on the the an instance of `Database`. They provide more performant ways of writing SQL statement or performing migration tasks.

## Batch statements

Batching sends multiple SQL statements inside a single call to the network. This can have a huge performance impact as it reduces latency from network round trips to Tableland. This implementation guarantees that each statement in the list will execute and commit, sequentially, non-concurrently.

You **cannot use this method across _multiple_ tables**. When batching mutating queries, they must only correspond to a **_single_** table.

Batched statements are similar to [SQL transactions](https://www.sqlite.org/lang_transaction.html). If a statement in the sequence fails, then an error is returned for that specific statement, and it aborts or rolls back the entire sequence.

### `batch`

To send batch statements, you must feed `batch()` with a list of prepared statements and get back the results..

```js
const db = new Database();
await db.batch([
  db.prepare("UPDATE users SET name = ?1 WHERE id = ?2").bind("John", 17),
  db.prepare("UPDATE users SET age = ?1 WHERE id = ?2").bind(35, 19),
]);
```

You can construct batches reusing the same prepared statement.

## Batching operations

There also exists one method for the `Database`, which should only be used for maintenance and one-shot tasks.

### `exec`

Executes one or more queries directly without prepared statements or parameters binding. This method can have poorer performance (prepared statements can be reused in some cases) and, more importantly, is less safe. Only use this method for maintenance and one-shot tasks (e.g., migration jobs). The input can be one or multiple queries separated by the standard `;`. If an error occurs, an exception is thrown with the query and error messages (see below for `Errors`).

Currently, the entire string of statements is submitted as a single transaction. In the future, more "intelligent" transaction planning, splitting, and batching may be used.

```js
const db = new Database();
const migration = await fetch("/migration.sql");
const out = await db.exec(migration.text());
console.log(out);
/*
{
  count: 5,
  duration: 76,
  ...
}
*/
```
