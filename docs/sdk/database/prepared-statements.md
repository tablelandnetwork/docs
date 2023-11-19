---
title: Prepared statements
description: Use a single method for all table creates, reads, and writes.
keywords:
  - prepare
  - prepared statements
---

The Tableland SDK comes with a `Database` API that supports both _static_ and _prepared_ statements. A static statement is typical SQL where the values are part of the statement; prepared statement will _bind_ values to the statement as part of a separate method.

```ts
const preparedStmt = db
  .prepare("SELECT * FROM users WHERE name = ?1")
  .bind("Bobby Tables");
const staticStmt = db.prepare(
  'SELECT * FROM users WHERE name = "Bobby Tables"'
);
```

## Parameter binding

Tableland follows the [SQLite convention](https://www.sqlite.org/lang_expr.html#varparam) for prepared statement parameter binding. This includes _Ordered_ (?NNNN) and _Anonymous_ (?) parameters, as well as all three forms of _Named_ parameters. To bind a parameter, simply use the method `stmt.bind()`. This **\*\***\***\*\***only works for parameters**\*\***\***\*\***; a table’s name **cannot** be passed and bound as a parameter (e.g., `SELECT * FROM ? ...`).

<!-- prettier-ignore -->
| Syntax | Type | Description |
| ------ | --------- | ----------- |
| ?NNN   | Ordered   | A question mark followed by a number NNN holds a spot for the NNN-th parameter.  |
| ?      | Anonymous | A question mark that is not followed by a number creates a parameter with a number one greater than the largest parameter number already assigned. This parameter format is provided for compatibility with other database engines. But because it is easy to miscount the question marks, the use of this parameter format is discouraged. Programmers are encouraged to use one of the symbolic formats below or the ?NNN format above instead |
| :AAAA  | Named     | A colon followed by an identifier name holds a spot for a named parameter with the name :AAAA. To avoid confusion, it is best to avoid mixing named and numbered parameters.  |
| @AAAA  | Named     | An "at" sign works exactly like a colon, except that the name of the parameter created is @AAAA.   |
| $AAAA  | Named     | A dollar-sign followed by an identifier name also holds a spot for a named parameter with the name $AAAA. |

With anonymous binding, the order in which values are passed is the order assigned within the query. The ordered style allows you to specify a number that corresponds to position of the parameter within the statement, starting at `1`.

```ts
const stmt = db
  .prepare("SELECT * FROM users WHERE name = ? AND age = ?")
  .bind("John Doe", 41);

const stmt = db
  .prepare("SELECT * FROM users WHERE name = ?2 AND age = ?1")
  .bind(41, "John Doe");
```

More complex binding is possible using named parameters and complex data types, which are converted to basic types on the fly. Named parameters are prefixed with `@`, `:`, or `$`, and it is best to not mix named and numbered parameters, as it can get a bit confusing.

```ts
const stmt = db
  .prepare(
    "INSERT INTO people VALUES (@first, ?, :first, ?, ?4, ?3, ?, $last);"
  )
  .bind(
    45,
    { first: "Bobby", last: "Tables" },
    [54, true, Uint8Array.from([1, 2, 3])],
    null
  );
```

## Reusing prepared statements

Prepared statements can be reused with new bindings; there is no need to redefine the prepared statement:

```ts
const stmt = db.prepare("SELECT name, age FROM users WHERE age < ?1");
const young = await stmt.bind(20).all();
console.log(young);
/*
{
  results: [...],
  success: true
  meta: {
    duration: 31,
  }
}
*/
const old = await stmt.bind(80).all();
console.log(old);
/*
{
  results: [...],
  success: true
  meta: {
    duration: 29,
  }
}
*/
```

## Return object

In the example above, the returned object from the `prepare` method is assigned to the `stmt` variable. Using the methods `stmt.run()`, `stmt.all()` and `db.batch()` will return an object that contains the results (if applicable), the success status, and a `meta` object with the internal duration of the operation in milliseconds, and any transaction information available.

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

See the [query statement methods](/sdk/database/query-statement-methods) page for more details.
