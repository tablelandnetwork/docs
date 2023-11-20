---
title: Expressions & operators
description: SQL expressions & operators provide a way to compute values from table data.
keywords:
  - expression
  - operator
  - string concatenation
  - json extraction
  - arithmetic
  - comparison
  - case
  - between
  - exists
  - cast
---

[Operators](https://www.sqlite.org/lang_expr.html#operators_and_parse_affecting_attributes) provide ways to compute on or transform data; [expressions](https://www.sqlite.org/lang_expr.html) allow for more complex logic in your queries. You can do things like conditional logic with `CASE` statements, type casting, and more. We'll walk through some of the more common use cases here, but refer to the [SQL functions docs](/playbooks/sql/functions) to understand what else is possible. For most of these examples, let's assume we own a `my_table` with a schema of `id int, val text`.

| id  | val          |
| --- | ------------ |
| 1   | Bobby Tables |
| 2   | Molly Tables |

## Operators

Throughout the sections below, there are examples for how to use a few of these operators to check or compare values; most of those not covered here are covered are self-explanatory (e.g., arithmetic).

### Comparison

There are operators that can check if the operands are:

<div className="row margin-bottom--lg">
<div className="col">

- `=`: Equal (used when operands are guaranteed to not be `NULL` values).
- `!=`: Not equal (used when operands are guaranteed to not be `NULL` values).
- `>`: Greater than.
- `>=`: Greater than or equal to.
- `<`: Less than.
- `<=`: Less than or equal to.
- `IS`: Equal (`NULL` values can be checked against).
- `IS NOT`: Not equal (`NULL` values can be checked against).
- `AND`: True if both operands are true.
- `OR`: True if either operand is true.

</div>
<div className="col">

- `NOT`: True if the operand is false.
- `IN`: Equal to one of a list of expressions.
- `BETWEEN`: True if the operand is within a range of values (inclusive).
- `LIKE`: Matches a pattern for strings.
- `GLOB`: Matches a pattern using the Unix file globbing rules.
- `IS NULL`, `ISNULL`: True if the operand is NULL.
- `IS NOT NULL`, `NOTNULL`: True if the operand is not NULL.
- `IS TRUE`: True if the operand is true.
- `IS FALSE`: True if the operand is false.
- `DISTINCT`: Deduplicate values in a query.

</div>
</div>

Note that `NOT` can be combined with the named operators, e.g., `NOT BETWEEN` or `NOT LIKE`.

### Arithmetic & output modifiers

You can also use operators to perform arithmetic operations or affect the output:

<div className="row margin-bottom--lg">
<div className="col">

- `+`: Addition.
- `-`: Subtraction.
- `*`: Multiplication.
- `/`: Division.
- `%`: Modulo.
- `<<`: Left shift.
- `>>`: Right shift.

</div>
<div className="col">

- `&`: Bitwise AND.
- `|`: Bitwise OR.
- `~`: Bitwise NOT.
- `||`: String concatenation.
- `COLLATE`: Specify a set of rules for comparing characters in a string.
- `CAST`: Convert the value from one type to another.

</div>
</div>

## `BETWEEN`

The `BETWEEN` operator can be used to query for values between a specified criteria; it is _inclusive_. Let's say our table now has three rows:

| id  | val          |
| --- | ------------ |
| 1   | Bobby Tables |
| 2   | Molly Tables |
| 3   | Other val    |

In this example, we'll query for all rows with an `id` between 2 and 3, meaning, we'll get back the last two rows:

```sql
SELECT
  *
FROM
  my_table
WHERE
  id BETWEEN 2 AND 3;
```

Or, you could include the `NOT` operator to do the inverse, which would give you only the first row:

```sql
SELECT
  *
FROM
  my_table
WHERE
  id NOT BETWEEN 2 AND 3;
```

## `CASE`

A `CASE` statement can be viewed as a more powerful `IF` statement. It allows you to define multiple conditions and their corresponding values. The syntax is as follows:

```sql
INSERT INTO
  my_table(id, val)
VALUES
  (
    3,
    CASE
      WHEN NULL IS NOT NULL THEN 'New val'
      ELSE 'Other val'
    END
  );
```

The `WHEN NULL` is demonstrating that you can use any expression in the `WHEN` clause—instead of placing `NULL` here, it'd be better to have some form of parameter binding at the client layer. The `ELSE` clause is optional, but if you don't include it, the `CASE` statement will return `NULL` if none of the `WHEN` conditions are met. In this example, the value `Other val` will be inserted into the `val` column for a new row with `id` 3.

So, altering this a bit, we could use parameter binding and control the four values at the client:

```sql
INSERT INTO
  my_table(id, val)
VALUES
  (
    ?1,
    CASE
      WHEN ?2 IS NOT NULL THEN ?3
      ELSE ?4
    END
  );
```

## `CAST`

The `CAST` operation is particularly important when dealing with columns that store mixed types of data. The syntax follows `CAST(expression AS type)` and converts the value of `expression` to `type`. For example, let's say our `val` in a the table, which is a `TEXT` column, stores the value `"1"`, and the `id` column is of type `INTEGER`.

```sql
SELECT CAST(id as TEXT) FROM my_table;
SELECT CAST(val as INTEGER) FROM my_table;
```

The first query would return `"1"` as a string, and the second query would return `1` as an integer.

## Concatenation

The aggregate concatenation function ([`group_concat()`](https://www.sqlite.org/lang_aggfunc.html#group_concat)) is only for a _group_ of data, such as concatenating all values in a column into a single string. If you wanted to concatenate each value in `my_table` to have a custom string output, the double pipe (`||`) can be used. It's not a function per se but is often useful in tandem with the JSON functions to further customize response data.

To combine two or more strings, use `||` between each value:

```sql
SELECT
  val || ' is #' || id
FROM
  my_table;
```

This will return transformed values for each row: `Bobby Tables is #1` and `Molly Tables is #2`.

## `COLLATE`

The `COLLATE` operator can be used to specify a set of rules for comparing characters in a string. Collations determine how data is sorted and compared in a database, affecting operations like `SELECT`, `ORDER BY`, and G`ROUP BY`. The syntax is `column_name COLLATE collation_name`, and there are three options:

- `BINARY`: The default collation. It compares string data using C's `memcmp()` function, which results in a case-sensitive comparison based on the binary representations of the characters.
- `NOCASE`: A case-insensitive comparison, which is useful when you want to treat `A` and `a` as equivalent.
- `RTRIM`: Trims trailing spaces before comparison, which is useful when comparing strings where the presence of trailing spaces should be ignored.

Let's change up our table data a bit to show how this works in more detail. We'll add rows that have the same set of `val` values but with different casing, a duplicative `bobby tables`, and the with the final `molly tables` row having a few trailing spaces:

| id  | val          |
| --- | ------------ |
| 1   | Bobby Tables |
| 2   | Molly Tables |
| 3   | bobby tables |
| 4   | bobby tables |
| 5   | molly tables |
| 6   | molly tables |

<br/>

Now, let's run a few queries with different collations:

```sql
SELECT * FROM my_table ORDER BY val COLLATE NOCASE;
SELECT COUNT(*), val FROM my_table GROUP BY val COLLATE BINARY;
SELECT * FROM my_table WHERE val COLLATE NOCASE = 'bobby tables';
SELECT * FROM my_table WHERE val COLLATE RTRIM = 'molly tables';
```

Here are the results for each with the ordering or grouping:

1. The ordering moves the lowercase `bobby tables` up to a lower index:

   | id  | val          |
   | --- | ------------ |
   | 1   | Bobby Tables |
   | 3   | bobby tables |
   | 4   | bobby tables |
   | 2   | Molly Tables |
   | 5   | molly tables |
   | 6   | molly tables |

2. The grouping sees duplicative `bobby tables` values, but all others are unique (e.g., `molly tables` and `molly tables   ` with trailing spaces are seen as separate values).

   | count | val          |
   | ----- | ------------ |
   | 1     | Bobby Tables |
   | 1     | Molly Tables |
   | 2     | bobby tables |
   | 1     | molly tables |
   | 1     | molly tables |

3. Since `NOCASE` is specified, the query will return all rows with `val` equal to `bobby tables` regardless of casing:

   | id  | val          |
   | --- | ------------ |
   | 1   | Bobby Tables |
   | 3   | bobby tables |
   | 4   | bobby tables |

4. Since `RTRIM` is specified, it will trim the trailing whitespace on `molly tables   ` at `id` of `6` and also return the row with `id` of `5`:

   | id  | val          |
   | --- | ------------ |
   | 5   | molly tables |
   | 6   | molly tables |

## `DISTINCT` (deduplicate)

If you want a query to only include unique data, the `DISTINCT` clause will remove duplicate values from the return set. Take, for example, the desire to only include unique values in the `val` column, which currently has two duplicate rows with `Molly Tables`:

```sql
SELECT
  DISTINCT val
FROM
  my_table;
```

This will only return the two distinct `val`s instead of one `Bobby Tables` and two `Molly Tables`:

| val          |
| ------------ |
| Bobby Tables |
| Molly Tables |

## `EXISTS`

The `EXISTS` operator can be used to check if a subquery returns any rows. This is useful for checking if a row exists before inserting it, or for checking if a row exists before deleting it. For example, let's say we want to get the rows in `my_table` that only exist in some `other_table` with an `id` column. The `other_table` only contains a matching `id` for the first row of `my_table`:

| id  |
| --- |
| 1   |

Thus, when we run the following:

```sql
SELECT
  *
FROM
  my_table
WHERE
  EXISTS (
    SELECT
      1
    FROM
      other_table
    WHERE
      other_table.id = my_table.id
  );
```

It will return the first row of `my_table`. There are other way to approach this with a `JOIN` clause, but this is a simple example of how `EXISTS` can be used. The `EXISTS` take a boolean `1` or `0` value, so the subquery will only return `1` if the `id` exists in `other_table`. Similarly, using `NOT EXISTS` will return the inverse.

## Extracting JSON values

The `->` and `->>` operators take a JSON string as their left operand and a path expression or object field label or array index as their right operand, returning the JSON of the subcomponent. Let's say our table has this data:

| id  | val                     |
| --- | ----------------------- |
| 1   | '{"my_key":"my_value"}' |

With `->`, the result is returned as a JSON object or array, including any string values being returned with quotes:

```sql
SELECT
  val -> 'my_key'
FROM
  my_table;
```

This will give you the result: `"\"my_value\""`.

To get the raw text value, the `->>` operand extracts the JSON element as a text string, without the JSON formatting. For example, if we wanted to get the `my_key` value from the `val` column, we could do the following:

```sql
SELECT
  val ->> 'my_key'
FROM
  my_table;
```

Giving you: `"my_value"`.

## `GLOB`

Similar to `LIKE`, `GLOB` can do Unix-like pattern matching but with case sensitivity and different wildcards. It can use `*` to match any number of characters, including zero characters, or `?` for exactly one character.

```sql
SELECT * FROM my_table WHERE val GLOB 'B*';
SELECT * FROM my_table WHERE val GLOB '[B,M]*';
SELECT * FROM my_table WHERE val  GLOB '?o*';
```

In these examples, the first query would give us the first row since it finds row starting with `B`. The second query would give us both rows since it looks in the range that includes `B` and `M`. And the third query would also give us both rows because it matches any string that has `o` as the second character.

## `IN`

The `IN` operator is used to query for values in a specific set. For example, `WHERE id IN (1, 2, 3)` gives all rows with `id` in the set, which in our case, would be all rows. Let's put together a different example, where we check for rows with `val` in a set that includes `Bobby Tables`:

```sql
SELECT
  *
FROM
  my_table
WHERE
  val IN ('Bobby Tables');
```

This would give us the first row, alone.

## `LIKE`

With the `LIKE` operator, it can do case-insensitive pattern matching in string comparisons. For example, it can check if the `val` column has a value that contains `bobby tables` (i.e., doesn't worry about case):

```sql
SELECT
  *
FROM
  my_table
WHERE
  val LIKE 'bobby tables';
```

The `%` character is a wildcard. Perhaps we want to check if the `val` column starts with `m`, so we'd use `LIKE 'm%'`, giving us the row with `Molly Tables`. Or, it could check for a substring anywhere within the value, such as `LIKE '%abl%'`, which would give us both rows since they both contain the word `Tables`. A slightly more specific example there is with `%_abl%`, which would only give us the rows where `val` has any character followed by "abl" at the beginning.
