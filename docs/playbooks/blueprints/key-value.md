---
title: Key-value store
description: Store arbitrary key-value data in a table.
keywords:
  - key value store
---

Tableland is all about relational data between tables. But, relational databases also make excellent key-value stores. When you store key-value pairs in a relational database, your keys become relational links to other content and data, adding nice query features that SQL was designed for.

## Setup

Let's say you want to store key-value pairs that map strings to JSON data. You'll need to create a table with two columns, specifying that your key column (e.g., `k`) is of type `TEXT` and `PRIMARY KEY`, and your value column (e.g., `v`) is of type `TEXT`.

```sql
CREATE TABLE kv (
  k TEXT PRIMARY KEY,
  v TEXT
);
```

Tableland also supports the `BLOB` (binary large objects) datatype. Certain use cases might prefer to use this as a type for the value `v` since the data is stored exactly as it was input (e.g., as bytes).

:::note
The word `key` is a _reserved keyword_ in SQLite and cannot be used, hence, why `k` was selected above. Attempting to use `key` will cause the table's creation to fail.
:::

## Working with data

Adding key-value pairs to the table is straightforward. You can `INSERT` the data with some key and value, and since the type is `TEXT`, it is rather flexible to handle a [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) or unique identifier (generated outside of Tableland).

```sql
INSERT INTO
  kv
VALUES
  ('key-or-uuid', '{"some_json_key":"some_value"}');
```

This is exactly the type of repetitive query string that you can easily wrap in an app or [use a library](https://www.npmjs.com/package/uuid) to make it even easier. If you want to retrieve the data a specific key, it follows standard SQL read convention.

```sql
SELECT
  v
FROM
  kv
WHERE
  k = 'key-or-uuid';
```

The resulting query will give you the JSON values.

| v                                |
| -------------------------------- |
| `{"some_json_key":"some_value"}` |

Since `k` is a primary key, it is guaranteed unique and will return a single value `v`. Thus, you have key-value data in relational tables. Imagine linking arbitrary JSON data to other structured data via its key, or storing encrypted blobs of data in a `TEXT` → `BLOB` key-value-style table. There are an endless number of possibilities, and the relational model with SQL makes everything a lot easier to work with.
