---
title: Incrementing values automatically
sidebar_label: Auto-incrementing
description: Tableland allows developers to automatically increment a cell, with some restrictions.
keywords:
  - auto-increment
  - autoincrement
---

When a table is created with a row that has both an `INTEGER` type and `PRIMARY KEY` constraint, it will get to use a feature that auto-increments the value upon row insertion. Be sure to keep in mind the exact way in which this is achieved—the `AUTOINCREMENT` keyword cannot be used. Rather, it get automatically attached when this combination is provided.

The auto-incrementing feature can be achieved with a rather straightforward column—here’s what the schema should look like:

```sql
id INTEGER PRIMARY KEY
```

Namely, use the `INTEGER PRIMARY KEY` definition. Then, upon inserting a row, the `id` will monotonically increase if the `id` is _not specified_.

## Usage

Let’s say we have an empty table named `my_table` with the following schema:

```sql
id INTEGER PRIMARY KEY, val TEXT
```

Simply insert a value and do not specify the `id`:

```sql
INSERT INTO my_table (val) VALUES ('Bobby Tables'), ('Molly Tables');
```

The table will automatically increment the `id`, resulting in the following:

| id  | val          |
| --- | ------------ |
| 1   | Bobby Tables |
| 2   | Molly Tables |

### Clarifications

The type `INT` _will not_ behave in the same way as a type `INTEGER` in this incrementing setup. An `INT` _will not_ be incremented and will throw an error upon running the insert statement defined above because it would violate the implicit `NOT NULL` constraint that comes with a `PRIMARY KEY`. Additionally, as noted in the [SQL spec](/specs/sql/), `AUTOINCREMENT` is a reserved keyword and should not be directly used.

:::tip
The `AUTOINCREMENT` keyword as a _potential_ feature is being further explored. Thus, it is subject to change, pending future research.

:::

## Precautions

There is one aspect to be aware of—`DELETE` statements. Let’s assume we have the same table as above but as a fresh table with no rows yet—you insert a couple of rows and then read the table's data:

```sql
INSERT INTO my_table (val) VALUES ('v_1'), ('v_2');
SELECT * FROM my_table;
```

This will return data with the following structure:

| id  | val |
| --- | --- |
| 1   | v_1 |
| 2   | v_2 |

Now, delete the last row (i.e., the highest index), insert a new one, and then observe how the `id` is reused:

```sql
DELETE FROM my_table WHERE val='v_2';
INSERT INTO my_table (val) values ('v_3');
SELECT * FROM my_table;
```

Namely, the `id` for the initial value `v_2` _was_ `2`, but then this row was deleted. A new row was inserted with a value of `v_3`—so its `id` was _also_ created as `2`, even though it was a brand new row. Please be sure to keep this in mind when leveraging the auto-incrementing capability.

| id    | val     |
| ----- | ------- |
| 1     | v_1     |
| **2** | **v_3** |

Aside from this edge case, deleting some previous row that _isn’t the highest_ index will have an outcome that is rather logical; the auto-incrementing is unaffected. Let's take our empty table and insert a few rows.

```sql
INSERT INTO my_table (val) VALUES ('v_1'), ('v_2'), ('v_3');
SELECT * FROM my_table;
```

The table will now look like so:

| id  | val |
| --- | --- |
| 1   | v_1 |
| 2   | v_2 |
| 3   | v_3 |

Then, delete some "middle" row (any row that's not the highest index) and then insert a row.

```sql
DELETE FROM my_table WHERE name='v_2';
INSERT INTO my_table (name) values ('v_4');
SELECT * FROM my_table;
```

Auto-incrementing occurs without issue since the newest `id` (`4`) is correctly one greater than the previous value (`3`).

| id    | val     |
| ----- | ------- |
| 1     | v_1     |
| 3     | v_3     |
| **4** | **v_4** |
