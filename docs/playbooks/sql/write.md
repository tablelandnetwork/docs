---
title: Writing table data
sidebar_label: Writing data
description: Mutate values through table inserts (plus upserts), updates, and deletes.
keywords:
  - sql write
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

A table can be mutated _only_ by those with the correct permissions. By default, the one who creates the table is the owner with full admin privileges—the ability to write table however they so please. There are ways to collaborate and provision access to writes so that others can also mutate data, if desired.

For these examples, let's assume we own a `my_table` with a schema of `id int, val text`.

| id  | val          |
| --- | ------------ |
| 1   | Bobby Tables |
| 2   | Molly Tables |

## Inserting data

You can `INSERT` data into a table by defining the columns and data values for those columns.

If _all_ of the columns are being inserted into, then there's no need for you to explicitly specify the columns; the list order will insert into the columns (from lowest to highest index...visually, in order from left to right). If, however, there is mismatch between the columns and values defined, you will run into issues.

<Tabs>
<TabItem value='include' label="Include columns" default>

```sql
INSERT INTO my_table (id, val)
VALUES
  (1, 'Bobby Tables');
```

</TabItem>
<TabItem value='exclude' label="Exclude columns">

```sql
INSERT INTO my_table
VALUES
  (1, 'Bobby Tables');
```

</TabItem>
</Tabs>

If no value is provided (and there aren't additional constraints), a `NULL` value is inserted. When it comes to inserting multiple rows of data, that is also possible by providing a comma-separated list of row value groups:

<Tabs>
<TabItem value='include' label="Include columns" default>

```sql
INSERT INTO my_table (id, val)
VALUES
  (1, 'Bobby Tables'),
  (2, 'Molly Tables');
```

</TabItem>
<TabItem value='exclude' label="Exclude columns">

```sql
INSERT INTO my_table
VALUES
  (1, 'Bobby Tables'),
  (2, 'Molly Tables');
```

</TabItem>
</Tabs>

### Subqueries

**Subqueries have limited support** and are only possible in `INSERT`s but with limitations due to determinism considerations.

Generally, flattened subqueries are fully supported in insert statements; [compound select statements](/playbooks/sql/composing-data) are **not supported** for inserts. In other words, you _can_ make sub-selects with a flat `SELECT` statement or one with `GROUP BY` and `HAVING` clauses; however, you _cannot_ use `UNION`, `JOIN`, or further subqueries. Also, there is an an implicit `ORDER BY rowid` clause forced on the [`SELECT` statement](/playbooks/sql/read).

A valid example of a flattened query is the following—let's assume the schema and types are the same for each table to help simplify things:

```sql
INSERT INTO my_table (id, val)
SELECT id, val
FROM
  other_table;
```

This query takes the values returned from the `other_table` and inserts them into `my_table`. An example with `GROUP BY` and `HAVING`:

```sql
INSERT INTO my_table (val)
SELECT val
FROM
  other_table
GROUP BY
  id
HAVING id > 1;
```

## Updating data

You can alter a row's existing values with the `UPDATE` clause.

Basically, you note what table and conditions must be met for the new value to be `SET`. The following example would update `my_table` with a `val` set to `new` for only rows with an `id` of `1`:

```sql
UPDATE
  my_table
SET
  val = 'new'
WHERE
  id = 1;
```

You'll notice a `WHERE` clause was attached to the query to help identify which row to update. See the [read query](/playbooks/sql/read) documentation for more details on clauses.

## Upserts

Although an "upsert" is not a specific keyword, it's a way to attempt an `INSERT`, but if there is a constraint conflict, an `UPDATE` will be performed instead. For example, a table with some `UNIQUE` column constraint might want to update the existing data rather than failing when it tries to insert the constraint-violating row. In other words, if you were try to insert a non-unique value into that table's column, a conflict would occur and cause the upsert feature to go into effect.

You can either choose to `DO` an update on the data upon a conflict or, simply, `DO NOTHING`—let's assume the `val` column also has a `UNIQUE` constraint:

<Tabs>
<TabItem value='update' label="Update on conflict" default>

```sql
INSERT INTO my_table (val)
VALUES
  ('Bobby Tables') ON CONFLICT (val) DO
UPDATE
SET
  val = 'Molly Tables';
```

</TabItem>
<TabItem value='do-nothing' label="Do nothing">

```sql
INSERT INTO my_table (val)
VALUES
  ('Bobby Tables') ON CONFLICT (val) DO NOTHING
```

</TabItem>
</Tabs>

## Deleting data

Deletes allow for deleting a single, multiple, or all table rows and make use of the `DELETE FROM` statement.

You can fine tune exactly what type of data you want to delete by passing additional clauses (e.g., `WHERE`), and if no such clauses are provided, _all_ of the data will be deleted.

<Tabs>
<TabItem value='delete-row' label="Delete row(s)" default>

```sql
DELETE FROM my_table
WHERE id = 1;
```

</TabItem>
<TabItem value='delete-all' label="Delete all rows">

```sql
DELETE FROM my_table;
```

</TabItem>
</Tabs>

Note that if you want to "delete" a single value in a row but not the whole row itself, you could just `UPDATE` the specific column to `NULL`.

## Multiple tables & atomicity

It's important to understand how transactions work in the context of both the Tableland database and base blockchain. The examples above all demonstrate how to mutate a single table, but what happens if you want to alter multiple tables?

When you write data, a mutation request is passed as a single string that includes one or more statements, separated by a semicolon (`;`). This string _cannot_ touch multiple tables but only a single one. For example, the following query is **invalid** and would fail since multiple statements reference different tables (`my_table`, `other_table`) in a single string:

```sql
/* A single string, different tables */
INSERT INTO my_table(id) VALUES(1); INSERT INTO other_table(id) VALUES(2);
```

If, instead, it was the same table in each statement in the string, it would be valid:

```sql
/* A single string, same table */
INSERT INTO my_table(id) VALUES(1); INSERT INTO my_table(id) VALUES(2);
```

The following set of queries are also **valid** if included in a single transaction and will insert values into two different tables (assuming there aren't issues like invalid syntax or permissions):

```sql
/* First string */
INSERT INTO my_table(id) VALUES(1); INSERT INTO my_table(id) VALUES(2);
/* Second, separate string */
INSERT INTO other_table(id) VALUES(2);
```

There is a bit of nuance here. A single _string of statements_ contains contiguous statements such that each must touch the same table. A single _transaction_ can include one or more submitted _strings of statements_ such that each string can touch a different table.

In other words, you can only touch multiple tables in a single transaction if queries are submitted in a way that keeps the strings separate from each other. How these are submitted / committed is abstracted at the client level, such as with the Tableland SDK or registry smart contract call, to help make this distinction a bit more clear. For example, these clients provide a `mutate` method where you can pass individual strings of statements:

<!-- prettier-ignore -->
```js
mutate(
  [
    "INSERT INTO my_table(id) VALUES(1); INSERT INTO my_table(id) VALUES(2);",
    "INSERT INTO other_table(id) VALUES(2);",
  ]
);
```

Note that transactions can be viewed as [atomic](/fundamentals/architecture/protocol-design#atomicity) such that if one of the queries in a single transaction fails, they all fail.
