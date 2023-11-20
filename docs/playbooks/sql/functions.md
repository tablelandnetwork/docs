---
title: SQL functions
sidebar_label: SQL functions & JSON
description: Use built-in SQL functions to transform query data.
keywords:
  - sql functions
---

This page highlights the some commonly used built-in SQLite functions and also custom ones that are web3-specific. Functions are pretty useful because they allow you to create custom API responses with your queries; you can control the keys, values, and transform the data as needed. The subset of functions that **are not supported** can be summarized by whether or not the [function is deterministic](https://www.sqlite.org/deterministic.html#overview).

For these examples, let's assume we own a `my_table` with a schema of `id int, val text`.

| id  | val          |
| --- | ------------ |
| 1   | Bobby Tables |
| 2   | Molly Tables |

## Custom functions

Currently, there are two functions unique to the Tableland protocol: `BLOCK_NUM()` and `TXN_HASH()`. Each of these provide web3-specific functionality for write queries, and `BLOCK_NUM(<chain_id>)` can be used with read queries as well.

### Block number

When a SQL write query is submitted, it is associated with an on-chain transaction. Using the `BLOCK_NUM()` function, you can insert the value of the associated block of the query. In other words, the Tableland network will replace this text with the number of the block that delivered the SQL event.

```sql
INSERT INTO
  my_table
VALUES
  (BLOCK_NUM(), 'This is the block number');
```

You can also use this in read queries. The main difference is that you must pass the chain ID of the chain you want to retrieve the block number from—for example, getting the block number of Ethereum mainnet would use a chain ID of `1`:

```sql
SELECT
  BLOCK_NUM(1)
FROM
  my_table;
```

### Transaction hash

To insert a transaction hash associated with a write query, all you have to do is pass the `TXN_HASH()` function (and for demonstration purposes, we'll use `BLOCK_NUM()` again, but this is not required).

```sql
INSERT INTO
  my_table
VALUES
  (BLOCK_NUM(), TXN_HASH());
```

Our newest row might now look something the table below. Note how the transaction hash is stored; a hash is a string, so it should use a `TEXT` type. But, in the `INSERT` statement itself, there was no need to wrap the function in single quotes; the database will handle this for you upon insertion.

| id    | val                                                                |
| ----- | ------------------------------------------------------------------ |
| 23055 | 0x57699025c13bbc95fbf39804e61247220a7be2fe6f32280faf878a3dc24f1486 |

## JSON functions

One of the most useful types of functions are for [transforming table data to JSON](https://www.sqlite.org/json1.html). Data stored in tableland is accessible via a gateway read query, so converting this data into JSON makes it much more usable with typical web applications.

### Objects

You can use `json_object()` to define the keys (also referred to as _names_) and values of a JSON object. To create an object, pass the name followed by a value in a comma separate list. For example, query the `my_table` with `json_object('my_key', val)`:

```sql
SElECT
  json_object('my_key', val)
FROM
  my_table;
```

This will return an object:

```json
{
  "my_key": "Bobby Tables"
}
```

If you want more than one key, that's perfectly fine as well:

```sql
SElECT
  json_object('id', id, 'name', val)
FROM
  my_table;
```

Which will return an object _for each row_:

```json
{
  "id": 1,
  "name": "Bobby Tables"
}
```

Using `json_group_object()`, you can also return a JSON object comprised of all key-value pairs but within an aggregation.

### Arrays

The `json_array()` function allows you to wrap data in a JSON array. For example, you can create an array of objects:

```sql
SELECT
  json_array(
    json_object('id', id, 'name', val)
  )
FROM
  my_table;
```

Which will return an array _for each row_ that resembles:

```json
[
  {
    "id": 1,
    "name": "Bobby Tables"
  }
]
```

There also exists a `json_group_array()` function that returns a JSON array comprised of all values in the aggregation. This can be especially useful in scenarios where multiple rows should be returned with the same keys but different values. For example, we can create a JSON array of objects for each row in our sample `my_table`:

```sql
SELECT
  json_group_array(
    json_object('id', id, 'name', val)
  )
FROM
  my_table;
```

This will take each row's values from `my_table` and map them to the associated keys and differs from the standard `json_array()` function in that it _aggregates_ the values into a single array (instead of one array for each row);

```json
[
  {
    "id": 1,
    "name": "Bobby Tables"
  },
  {
    "id": 2,
    "name": "Molly Tables"
  }
]
```

### Coalesce

The [coalesce](https://www.sqlite.org/lang_corefunc.html#coalesce) function can be useful if you're making queries that might have a `NULL` value. For example, here, we're saying that if the value is `NULL`, then insert the string `New val` instead:

```sql
UPDATE my_table
SET
    val = COALESCE(NULL, 'New val'),
WHERE id = 1;
```

More notably, it's relevant with parameter binding when you use clients like the SDK, CLI, or smart contracts. Instead of directly passing `NULL` the statement might look like:

```sql
UPDATE my_table
SET
    val = COALESCE(?1, 'New val'),
WHERE id = ?2;
```

Where in the client, you bind parameters from application logic to the `?1` and `?2` placeholders. If the value is `NULL`, then the `COALESCE` function will insert the string `New val` instead.

## Date & time functions

Since dates and times are unsupported types, **none** of the [date nor time functions](https://www.sqlite.org/lang_datefunc.html) can be used.

## Math functions

**None** of the [math functions](https://www.sqlite.org/lang_mathfunc.html) are supported. Every math function introduces possible floating point values and are entirely restricted from Tableland's SQL.

## Window functions

There is **not** support for any of the [SQLite window functions](https://www.sqlite.org/windowfunctions.html).

## Aggregate functions

**All** of the built-in [aggregate functions](https://www.sqlite.org/lang_aggfunc.html) are supported. These are useful for operations across multiple rows, such as summing, averaging, and concatenating values. This includes the following:

- `avg(X)`: Average value of all non-NULL X within a group (`TEXT` or `BLOB` that do not look like numbers are interpreted as `0`).
- `count(X)`, `count(*)`: Count of the number of times that X is not NULL, or total number of rows in the group
- `group_concat(X)`: Returns a string which is the concatenation of all non-NULL values of X.
- `group_concat(X,Y)`: Same as `group_concat(X)` but with a separator Y between instances of X.
  - For example, `group_concat(X, '|')` will return a pipe-separated list of values.
- `max(X)`: Maximum value of all non-NULL X within a group (ORDER BY is applied to determine the maximum value).
- `min(X)`: Minimum value of all non-NULL X within a group (ORDER BY is applied to determine the minimum value).
- `sum(X)`, `total(X)`: Sum of all non-NULL X within a group.

## Scalar functions

Tableland supports **the majority of** [SQLite's core scalar functions](https://www.sqlite.org/lang_corefunc.html) (an output for each row of input), which can be used to further transform a value within some query (a value's length, matching substrings, absolute values, formatting, etc.). Those unsupported are due to [determinism](https://www.sqlite.org/deterministic.html#overview) issues.

| Function                                                                                            | Compatible?                            | Example                                           |
| --------------------------------------------------------------------------------------------------- | -------------------------------------- | ------------------------------------------------- |
| [abs(X)](https://www.sqlite.org/lang_corefunc.html#abs)                                             | <span className="circle-green"></span> | SELECT abs(id) from my_table;                     |
| [changes()](https://www.sqlite.org/lang_corefunc.html#changes)                                      | <span className="circle-red"></span>   | N/A                                               |
| [char(X1,X2,...,XN)](https://www.sqlite.org/lang_corefunc.html#char)                                | <span className="circle-green"></span> | SELECT char(72,105) from my_table;                |
| [coalesce(X,Y,...)](https://www.sqlite.org/lang_corefunc.html#coalesce)                             | <span className="circle-green"></span> | SELECT coalesce(NULL,val) FROM my_table;          |
| [format(FORMAT,...)](https://www.sqlite.org/lang_corefunc.html#format)                              | <span className="circle-green"></span> | SELECT format('%s', 123) from my_table;           |
| [glob(X,Y)](https://www.sqlite.org/lang_corefunc.html#glob)                                         | <span className="circle-green"></span> | SELECT glob('abc','abc') from my_table;           |
| [hex(X)](https://www.sqlite.org/lang_corefunc.html#hex)                                             | <span className="circle-green"></span> | SELECT hex(0x1234) from my_table;                 |
| [ifnull(X,Y)](https://www.sqlite.org/lang_corefunc.html#ifnull)                                     | <span className="circle-green"></span> | SELECT ifnull(NULL,1) from my_table;              |
| [iif(X,Y,Z)](https://www.sqlite.org/lang_corefunc.html#iif)                                         | <span className="circle-green"></span> | SELECT iif(0,1,'false') from my_table;            |
| [instr(X,Y)](https://www.sqlite.org/lang_corefunc.html#instr)                                       | <span className="circle-green"></span> | SELECT instr('Hello','o') from my_table;          |
| [last_insert_rowid()](https://www.sqlite.org/lang_corefunc.html#last_insert_rowid)                  | <span className="circle-red"></span>   | N/A                                               |
| [length(X)](https://www.sqlite.org/lang_corefunc.html#length)                                       | <span className="circle-green"></span> | SELECT length(val) from my_table;                 |
| [like(X,Y)](https://www.sqlite.org/lang_corefunc.html#like)                                         | <span className="circle-green"></span> | SELECT like('abc','abc') from my_table;           |
| [like(X,Y,Z)](https://www.sqlite.org/lang_corefunc.html#like)                                       | <span className="circle-green"></span> | SELECT like('a*b','ab','*') from my_table;        |
| [likelihood(X,Y)](https://www.sqlite.org/lang_corefunc.html#likelihood)                             | <span className="circle-red"></span>   | N/A                                               |
| [likely(X)](https://www.sqlite.org/lang_corefunc.html#likely)                                       | <span className="circle-red"></span>   | N/A                                               |
| [load_extension(X)](https://www.sqlite.org/lang_corefunc.html#load_extension)                       | <span className="circle-red"></span>   | N/A                                               |
| [load_extension(X)](https://www.sqlite.org/lang_corefunc.html#load_extension)                       | <span className="circle-red"></span>   | N/A                                               |
| [lower(X)](https://www.sqlite.org/lang_corefunc.html#lower)                                         | <span className="circle-green"></span> | SELECT lower(val) FROM my_table;                  |
| [ltrim(X)](https://www.sqlite.org/lang_corefunc.html#ltrim)                                         | <span className="circle-green"></span> | SELECT ltrim(val) FROM my_table;                  |
| [ltrim(X,Y)](https://www.sqlite.org/lang_corefunc.html#ltrim)                                       | <span className="circle-green"></span> | SELECT ltrim(val, ‘Bobby') FROM my_table;         |
| [max(X,Y,...)](https://www.sqlite.org/lang_corefunc.html#max_scalar)                                | <span className="circle-green"></span> | SELECT max(1,2) FROM my_table;                    |
| [min(X,Y,...)](https://www.sqlite.org/lang_corefunc.html#min_scalar)                                | <span className="circle-green"></span> | SELECT min(1,2) FROM my_table;                    |
| [nullif(X,Y)](https://www.sqlite.org/lang_corefunc.html#nullif)                                     | <span className="circle-green"></span> | SELECT nullif(NULL,2) FROM my_table;              |
| [printf(FORMAT,...)](https://www.sqlite.org/lang_corefunc.html#printf)                              | <span className="circle-green"></span> | SELECT format('%s', 123) from my_table;           |
| [quote(X)](https://www.sqlite.org/lang_corefunc.html#quote)                                         | <span className="circle-green"></span> | SELECT quote(id) FROM my_table;                   |
| [random()](https://www.sqlite.org/lang_corefunc.html#random)                                        | <span className="circle-red"></span>   | N/A                                               |
| [randomblob(N)](https://www.sqlite.org/lang_corefunc.html#randomblob)                               | <span className="circle-red"></span>   | N/A                                               |
| [replace(X,Y,Z)](https://www.sqlite.org/lang_corefunc.html#replace)                                 | <span className="circle-green"></span> | SELECT replace(val,'Bobby', 'Dan') FROM my_table; |
| [round(X)](https://www.sqlite.org/lang_corefunc.html#round)                                         | <span className="circle-green"></span> | SELECT round('1.1234') FROM my_table;             |
| [round(X,Y)](https://www.sqlite.org/lang_corefunc.html#round)                                       | <span className="circle-green"></span> | SELECT round('1.1234',2) FROM my_table;           |
| [rtrim(X)](https://www.sqlite.org/lang_corefunc.html#rtrim)                                         | <span className="circle-green"></span> | SELECT rtrim(val) FROM my_table;                  |
| [rtrim(X,Y)](https://www.sqlite.org/lang_corefunc.html#rtrim)                                       | <span className="circle-green"></span> | SELECT rtrim(val,'Tables') FROM my_table;         |
| [sign(X)](https://www.sqlite.org/lang_corefunc.html#sign)                                           | <span className="circle-green"></span> | SELECT sign(-1) FROM my_table;                    |
| [soundex(X)](https://www.sqlite.org/lang_corefunc.html#soundex)                                     | <span className="circle-red"></span>   | N/A                                               |
| [sqlite_compileoption_get(N)](https://www.sqlite.org/lang_corefunc.html#sqlite_compileoption_get)   | <span className="circle-red"></span>   | N/A                                               |
| [sqlite_compileoption_used(X)](https://www.sqlite.org/lang_corefunc.html#sqlite_compileoption_used) | <span className="circle-red"></span>   | N/A                                               |
| [sqlite_offset(X)](https://www.sqlite.org/lang_corefunc.html#sqlite_offset)                         | <span className="circle-red"></span>   | N/A                                               |
| [sqlite_source_id()](https://www.sqlite.org/lang_corefunc.html#sqlite_source_id)                    | <span className="circle-red"></span>   | N/A                                               |
| [sqlite_version()](https://www.sqlite.org/lang_corefunc.html#sqlite_version)                        | <span className="circle-red"></span>   | N/A                                               |
| [substr(X,Y), substring(X,Y)](https://www.sqlite.org/lang_corefunc.html#substr)                     | <span className="circle-green"></span> | SELECT substr(val,7) FROM my_table;               |
| [substr(X,Y,Z), substring(X,Y,Z)](https://www.sqlite.org/lang_corefunc.html#substr)                 | <span className="circle-green"></span> | SELECT substr(val,7,3) FROM my_table;             |
| [total_changes()](https://www.sqlite.org/lang_corefunc.html#total_changes)                          | <span className="circle-red"></span>   | N/A                                               |
| [trim(X)](https://www.sqlite.org/lang_corefunc.html#trim)                                           | <span className="circle-green"></span> | SELECT trim(val) FROM my_table;                   |
| [trim(X,Y)](https://www.sqlite.org/lang_corefunc.html#trim)                                         | <span className="circle-green"></span> | SELECT trim(val, ' Tables') FROM my_table;        |
| [typeof(X)](https://www.sqlite.org/lang_corefunc.html#typeof)                                       | <span className="circle-green"></span> | SELECT typeof(id) FROM my_table                   |
| [unhex(X)](https://www.sqlite.org/lang_corefunc.html#unhex)                                         | <span className="circle-red"></span>   | N/A                                               |
| [unhex(X,Y)](https://www.sqlite.org/lang_corefunc.html#unhex)                                       | <span className="circle-red"></span>   | N/A                                               |
| [unicode(X)](https://www.sqlite.org/lang_corefunc.html#unicode)                                     | <span className="circle-green"></span> | SELECT unicode('a') FROM my_table;                |
| [unlikely(X)](https://www.sqlite.org/lang_corefunc.html#unlikely)                                   | <span className="circle-red"></span>   | N/A                                               |
| [upper(X)](https://www.sqlite.org/lang_corefunc.html#upper)                                         | <span className="circle-green"></span> | SELECT upper(val) FROM my_table;                  |
| [zeroblob(N)](https://www.sqlite.org/lang_corefunc.html#zeroblob)                                   | <span className="circle-red"></span>   | N/A                                               |
