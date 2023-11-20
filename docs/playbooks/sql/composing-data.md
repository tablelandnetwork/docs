---
title: Composing data across tables
sidebar_label: Compound select statements
description: Extract data across multiple tables by joining them together.
keywords:
  - reads
  - reading data
  - join
  - inner join
  - outer join
  - union
  - union all
  - intersect
  - except
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

The `JOIN` subclause allows you to query and compose data across more than one table. It is extremely powerful and one of the key benefits of using the Tableland protocol for chain-neutral data composition. The basic syntax for a table join is to define what data you want and which tables to refer to.

For these examples, let's assume we own a `my_table` with a schema of `id int, val text`, and there's some `other_table` with a schema of `id int, num int`.

<div className="row margin-bottom--lg">
<div className="col">

<h4><code>my_table</code></h4>

| id  | val          |
| --- | ------------ |
| 1   | Bobby Tables |
| 2   | Molly Tables |

</div>
<div className="col">

<h4><code>other_table</code></h4>

| id  | num  |
| --- | ---- |
| 1   | 1000 |
| 2   | 2000 |

</div>
</div>

## `JOIN`

You can query data stored in two or more tables with a `JOIN` or simple `SELECT` statement. A `JOIN` is equivalent to an `INNER JOIN` in Tableland. The simplest approach will "merge" the tables together (also known as a `CROSS JOIN`; a `JOIN` without an `ON`), in a sense, with something like the following:

<Tabs>
<TabItem value='select' label="Multiple select" default>

```sql
SELECT
  *
FROM
  my_table
JOIN
  other_table;
```

</TabItem>
<TabItem value='join' label="Join">

```sql
SELECT
  *
FROM
  my_table,
  other_table;
```

</TabItem>
</Tabs>

This gives you access to data that exists in _both_ tables, and note how listing the table names after `FROM` vs. using the `JOIN` keyword behaved in the same way. They are equivalent syntax.

| id  | num  | val          |
| --- | ---- | ------------ |
| 1   | 1000 | Bobby Tables |
| 2   | 2000 | Bobby Tables |
| 1   | 1000 | Molly Tables |
| 2   | 2000 | Molly Tables |

But, this approach might now make sense for many use cases since you often want to restrict and further define how the final data should be represented, such as by using a unique key that matches across each table's row. Namely, in the example above, you'll notice how the `id`, `num`, and `val` could have "matched" on the `id` since each table contained a matching `id`.

By attaching a `WHERE` clause, you can apply conditions for how the data should be selected. This filters the _already merged_ tables and only returns rows where the `my_table` `id` is the same is the `id` from `other_table`.

```sql
SELECT
  *
FROM
  my_table,
  other_table
WHERE my_table.id = other_table.id;
```

The resulting set is much more organized and sensible using this matching `id` value.

| id  | num  | val          |
| --- | ---- | ------------ |
| 1   | 1000 | Bobby Tables |
| 2   | 2000 | Molly Tables |

Alternatively, the `ON` clause could also be used to specify exactly what matches between the two tables. This will return the same results as the `WHERE` clause above. The `JOIN` + `ON` will join the tables on only matching `id`s.

```sql
SELECT
  *
FROM
  my_table
JOIN
  other_table
ON
  my_table.id = other_table.id;
```

Note that because both `my_table` and `other_table` have the same column name of `id`, the query had to specify which table to look at (i.e., `my_table.id` and `other_table.id`). If, instead, the `other_table` had named its `id` column as `other_id`, the query could have been simplified a bit by providing the column name _without_ the preceding table it belongs to (i.e., `other_id` vs. `other_table.id`, `id` vs. `my_table.id`).

## Aliasing

To make it easier to write queries, you can use the concept of aliasing to rename columns and tables. This is especially useful when you're composing data across multiple tables and need to disambiguate columns. For example, in the `JOIN` example above, we could have renamed the `id` column in `other_table` to `other_id` and then used that in the `ON` clause. Similarly, we can have alias the table entirely.

```sql
SELECT
  m.id AS mid,
  o.num AS onum,
  m.val AS mval
FROM
  my_table as m
JOIN
  other_table as o
ON
  mid = o.id;
```

Notice the `SELECT` defines column aliases, including `mid` for `m.id`, and the `ON` looks where this `mid` column alias is equal to the `other_table`'s `o` alias and `id` column. Thus, our final result set will look like:

| mid | onum | mval         |
| --- | ---- | ------------ |
| 1   | 1000 | Bobby Tables |
| 2   | 2000 | Molly Tables |

## `UNION`

The `UNION` clause will combine results from multiple `SELECT` statements and remove duplicates. Let's create a new `some_table` with a schema of `id int, val text` that has the a couple duplicate rows from `my_table` and a distinct one.

| id  | val          |
| --- | ------------ |
| 1   | Bobby Tables |
| 2   | Molly Tables |
| 3   | Danny Tables |

```sql
SELECT
  id
FROM
  my_table
UNION
SELECT
  id
FROM
  some_table;
```

The output for this will be a single column of `id`s with no duplicates.

| id  |
| --- |
| 1   |
| 2   |
| 3   |

## `UNION ALL`

To include duplicate, the `UNION ALL` clause can be used instead.

```sql
SELECT
  id
FROM
  my_table
UNION ALL
SELECT
  id
FROM
  some_table;
```

The output for this will be a single column of `id`s with duplicates included since `my_table` and `some_table` both have two rows with `id` of `1` and `2` and one unique `3`.

| id  |
| --- |
| 1   |
| 2   |
| 1   |
| 2   |
| 3   |

## `INTERSECT`

With `INTERSECT`, you can find the intersection across `SELECT` statements. This will return only the rows that are common between the two tables.

```sql
SELECT
  id
FROM
  my_table
INTERSECT
SELECT
  id
FROM
  some_table;
```

The output for this will only include the rows with `id` of `1` and `2` since those are the only rows that are common between `my_table` and `some_table`.

| id  |
| --- |
| 1   |
| 2   |

## `EXCEPT`

The `EXCEPT` will return only the rows that are unique to the first `SELECT` statement; it can be viewed as the inverse of `INTERSECT` but where the query order matters. So, we'll change up the order so that we query `some_table` first since it contains a unique row of `id` of `3`.

```sql
SELECT
  id
FROM
  some_table
INTERSECT
SELECT
  id
FROM
  my_table;
```

Thus, only the row with `id` of `3` will be returned.

| id  |
| --- |
| 3   |
