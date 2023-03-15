---
title: Query statement methods
description: Mutate your table values with additional access control.
synopsis: Table values can be mutated by the table owner or provisioned actors.
keywords:
  - write to table
  - mutate table
---

When calling the the `Database` API’s `prepare` method, it returns an object that supports a variety of query statement methods. Each one is asynchronous and should be called upon that response object—for demonstration purposes, the `stmt` variable is used to save the response from `prepare` and then further transform the result.

```tsx
const tableName = `healthbot_80001_1`;
// Define the `Database` response object
const stmt = db.prepare(`SELECT * FROM ${tableName};`);
// Call a query statement method
await stmt.all();
```

All of these methods should be `await`ed. The following defines the full set of possible methods and how they should be called with some variable like `stmt`.

- `await stmt.first( [column] )`
- `await stmt.all( [column] )`
- `await stmt.raw()`
- `await stmt.run()`

## `first`

Returns the first row of the results. This does not return metadata like the other methods. Instead, it returns the object directly. It takes an optional `column` parameter.

Get a specific column from the first row:

```tsx
const stmt = db.prepare("SELECT COUNT(*) AS total FROM users");
const total = await stmt.first("total");
console.log(total); // 50
```

Get all the the columns from the first row:

```tsx
const stmt = db.prepare("SELECT COUNT(*) AS total FROM users");
const values = await stmt.first();
console.log(values); // { total: 50 }
```

If the query returns no rows, then `first()` will return `null`.

If the query returns rows, but `column` does not exist, then `first()` will throw an exception.

## `all`

Returns all rows and metadata. Optionally, a column can be specified.

```tsx
const stmt = db.prepare("SELECT name, age FROM users LIMIT 3");
const { results } = await stmt.all();
// Or, pass a column: const { results } = await stmt.all("name");
console.log(results);
/*
[
  {
     name: "John",
     age: 42,
  },
   {
     name: "Anthony",
     age: 37,
  },
    {
     name: "Dave",
     age: 29,
  },
 ]
*/
```

## `raw`

Returns all rows and metadata. Optionally, a column can be specified. This has the same functionality as `all()` but returns an array of rows instead of objects.

```tsx
const stmt = db.prepare("SELECT name, age FROM users LIMIT 3");
const raw = await stmt.raw();
console.log(raw);
/*
[
  [ "John", 42 ],
  [ "Anthony", 37 ],
  [ "Dave", 29 ],
]
*/
```

## `run`

Runs the query but returns no results. Instead, `run()` returns the metrics only. Useful for write operations like `UPDATE`, `DELETE` or `INSERT`.

```tsx
const info = await db
  .prepare("INSERT INTO users (name, age) VALUES (?1, ?2)")
  .bind("John", 42)
  .run();
console.log(info);
/*
{
  success: true
  meta: {
    duration: 366.55073300004005,
    txn: {
        tableId: '5',
        transactionHash: '0x050b60bfec948c82f81528d60b3189cc00bd967b3ffcf5ac253a6a103bd2c3b7',
        blockNumber: 7710,
        chainId: 31337,
        wait: [AsyncFunction: wait],
        name: 'test_run_31337_5'
    }
  }
}
*/
```

On Tableland, mutating transactions such as `INSERT`, `DELETE`, and `UPDATE` produce a two-phase transaction. Firstly, the transaction is sent to the registry contract, and awaited. The returned `txn` information also contains a `wait` method that can be used to await finalization on the Tableland network. This method will also throw an exception if any runtime errors occur.

```tsx
const { transactionHash } = await info.txn.wait();
console.log(transactionHash);
/*
 0x050b60bfec948c82f81528d60b3189cc00bd967b3ffcf5ac253a6a103bd2c3b7
 */
```
