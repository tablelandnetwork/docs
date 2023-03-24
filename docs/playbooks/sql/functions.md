---
title: SQL functions
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

### String concatenation

Note that the aggregate concatenation function ([`group_concat()`](https://www.sqlite.org/lang_aggfunc.html#group_concat)) is only for a _group_ of data, such as concatenating all values in a column into a single string. If you wanted to concatenate each value in `my_table` to have a custom string output, the double pipe (`||`) can be used. It's not a function per se but is often useful in tandem with the JSON functions to further customize response data.

To combine two or more strings, use `||` between each value:

```sql
SELECT
  val || ' is #' || id
FROM
  my_table;
```

Thus, you now have access to phrases like `Bobby Tables is #1` and `Molly Tables is #2`!

## Date & time functions

Since dates and times are unsupported types, **none** of the [date nor time functions](https://www.sqlite.org/lang_datefunc.html) can be used.

## Math functions

**None** of the [math functions](https://www.sqlite.org/lang_mathfunc.html) are supported. Every math function introduces possible floating point values and are entirely restricted from Tableland's SQL.

## Window functions

There is **not** support for any of the [SQLite window functions](https://www.sqlite.org/windowfunctions.html).

## Aggregate functions

**All** of the built-in [aggregate functions](https://www.sqlite.org/lang_aggfunc.html#group_concat) are supported. These are useful for operations across multiple rows, such as summing, averaging, and concatenating values.

## Scalar functions

Tableland supports **the majority of** [SQLite's core scalar functions](https://www.sqlite.org/lang_corefunc.html) (an output for each row of input), which can be used to further transform a value within some query (a value's length, matching substrings, absolute values, formatting, etc.). Those unsupported are due to [determinism](https://www.sqlite.org/deterministic.html#overview) issues.
