---
title: Reading a table's data
sidebar_label: Reading data
description: Extract data from a table and organize it however you'd like.
keywords:
  - reads
  - reading data
---

Querying table data has a bit more complexity as compared to other SQL clauses. There are more features available, plus, the added benefit of being able to compose data across multiple tables. The following page will walk through how to query data in read-only scenarios. If you're looking for specifics on subqueries _within_ writes (inserts), you should refer to the [documentation about writing data](/playbooks/sql/write#subqueries) to tables—the approach with writes is, generally, the same but with limitations.

For these examples, let's assume we own a `my_table` with a schema of `id int, val text`.

| id  | val          |
| --- | ------------ |
| 1   | Bobby Tables |
| 2   | Molly Tables |

:::note
For reading data across _multiple_ tables (via `SELECT`s and `JOIN`s), refer to the [docs about composing data](/playbooks/sql/composing-data).
:::

## Selecting data

All read queries follow the general format of selecting the data you want from a dataset. That is, `SELECT` defines which columns to target (use the `*` operator for "all" data) and is the start of any read query; `FROM` indicates the table to retrieve data from.

```sql
SELECT *
FROM my_table;
```

Instead of getting _all_ (`*`) data, you can also choose to select only specific columns.

```sql
SELECT id, val
FROM my_table;
```

Both examples will ultimately return the all of the rows in the table since `id` and `val` _are_ all of the possible rows. When making a read query, there are also a number of clauses / keywords you can include to further reduce and organize the results.

## Where clause

Developers can restrict which rows are returned by using a comparison predicate (i.e., comparison evaluates to true, false, or null). For example, if you want to only return the rows with a certain value, you can achieve this with a simple `WHERE` clause.

```sql
SELECT
  id,
  val
FROM
  my_table
WHERE
  id = 1;
```

This will give you _only_ the rows; the one with an `id` of `1`.

## Group by

Often, to eliminate duplicate rows from a result set, developers may want to group rows by common values. The `GROUP BY` clause does exactly that. To make things more interesting, let's say our table has a new row with a duplicative "Molly Tables" value:

| id  | val          |
| --- | ------------ |
| 1   | Bobby Tables |
| 2   | Molly Tables |
| 3   | Molly Tables |

We could [`count()`](https://www.sqlite.org/lang_aggfunc.html#count) the number of times `Molly Tables` shows up in the table and group the results by the `val` column:

```sql
SELECT
  val,
  count(val)
FROM
  my_table
GROUP BY
  val;
```

Which will allow you to, in this example, aggregate the results:

| val          | count |
| ------------ | ----- |
| Bobby Tables | 1     |
| Molly Tables | 2     |

### Filtering with `HAVING`

Using the `HAVING` clause, you can filter rows resulting from the `GROUP BY` clause using some predicate; it _must_ come after a `GROUP BY`. Think of it as a search condition for a group. We can extend the example above with some additional condition, such as only returning data where the `val` is `Molly Tables`:

```sql
SELECT
  id,
  val
FROM
  my_table
GROUP BY
  val
HAVING
  val = 'Molly Tables';
```

Thus, the resulting set is reduced to only the rows that meet the condition:

| val          | count |
| ------------ | ----- |
| Molly Tables | 2     |

## Ordering

Developers can identify which column(s) to sort a return set by—either ascending `ASC` or descending `DESC` order. If no value is provided, then the default ordering will be ascending. Taking our sample data, we can order it however we'd like. Since the table is, coincidentally, sorted in ascending order (based on the `id`), let's sort it in descending order:

```sql
SELECT
 id,
 val
FROM
 my_table
ORDER BY
 id DESC;
```

This would change the order in which results are returned:

| id  | val          |
| --- | ------------ |
| 3   | Molly Tables |
| 2   | Molly Tables |
| 1   | Bobby Tables |

## Limit

You can define the maximum number of rows to return—perhaps, only two rows are desired.

```sql
SELECT
  id,
  val
FROM
  my_table
LIMIT
  2;
```

Using a limit, the first two rows are returned (i.e., the row with an `id` of `3` is left out of the set):

| id  | val          |
| --- | ------------ |
| 1   | Bobby Tables |
| 2   | Molly Tables |

### Offset

With an `OFFSET`, developers can define the number of rows to skip before returning results; this can _only_ be used after a `LIMIT` clause. For example, maybe you want to limit the results to two total but skip the first row:

```sql
SELECT
  id,
  val
FROM
  my_table
LIMIT
  2 OFFSET 1;
```

The offset will skip the first `Bobby Tables` row and return the next two rows (both of the `Molly Tables` rows). If you were to set an offset that exceeds the limit, then no results would be returned.

| id  | val          |
| --- | ------------ |
| 2   | Molly Tables |
| 3   | Molly Tables |

:::tip
A `LIMIT` can be `-1` to signal no upper bound, which may be useful with an `OFFSET` in case you want to, basically, ignore imposing any `LIMIT`.
:::
