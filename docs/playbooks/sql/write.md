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

When you write data, it **can only correspond to a single table** in a single transaction. For example, the following query would fail since it touches two different tables (if submitted in one transaction):

```sql
INSERT INTO my_table(id) VALUES(1); INSERT INTO other_table(id) VALUES(2);
```

Also, **subqueries have very limited support** (only possible in `INSERT`s but with limits). Both of these features are common in "traditional" relational databases but are excluded from Tableland's SQL due to determinism issues.

You can insert data by defining the columns and data values for those columns. If _all_ of the columns are being inserted into, then there's no need for you to explicitly specify the columns; the list order will insert into the columns (from lowest to highest index...visually, in order from left to right). If, however, there is mismatch between the columns and values defined, you will run into issues.

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

You can only write flattened subqueries in insert statements; thus, you _cannot_ use `HAVING`, `GROUP BY`, `UNION`, `JOIN`, or further subqueries. But, since you're only _operating_ on a single table, it is totally fine to query data from a different different table within the sub-select statement. Also, there is an an implicit `ORDER BY rowid` clause forced on the [`SELECT` statement](/playbooks/sql/read).

A valid example of a flattened query is the following—let's assume the schema and types are the same for each table to help simplify things:

```sql
INSERT INTO my_table (id, val)
SELECT id, val
FROM
  other_table;
```

This query takes the values returned from the `other_table` and inserts them into `my_table`.

## Updating data

You can alter a row's existing values with the `UPDATE` clause. Basically, you note what table and conditions must be met for the new value to be `SET`. The following example would update `my_table` with a `val` set to `new` for only rows with an `id` of `1`:

```sql
UPDATE
  my_table
SET
  val = 'new'
WHERE
  id = 1;
```

You'll notice a `WHERE` clause was attached to the query to help identify which row to update. See the [read query](/playbooks/read) documentation for more details on clauses.

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

Deletes allow for deleting a single, multiple, or all table rows and make use of the `DELETE FROM` statement. You can fine tune exactly what type of data you want to delete by passing additional clauses (e.g., `WHERE`), and if no such clauses are provided, _all_ of the data will be deleted.

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