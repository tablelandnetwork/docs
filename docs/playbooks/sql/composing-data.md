---
title: Composing data across tables
sidebar_label: Composing data
description: Extract data across multiple tables by joining them together.
keywords:
  - reads
  - reading data
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
