---
title: Creating a table
description: Define a set of columns, their types, and constraints for a table.
keywords:
  - create a table
---

A table is a structure of rows and columns that gets generated through a single top-level statement:

```sql
CREATE TABLE table_name(
  column1 datatype constraint,
  column2 datatype constraint,
  ...
);
```

The general flow is to start with the `CREATE TABLE` keywords, pass the (optional) table "prefix," and define columns plus constraints. You don't _have to_ use a table prefix nor any constraints, but you'll often want to.

:::tip
Review the [supported data types](/playbooks/sql/#data-types), which includes `INT`,`INTEGER`, `TEXT`, and `BLOB`.
:::

## Column definitions

Every `CREATE TABLE` statement should include one or more column definitions (a column name and type), optionally followed by a list of table constraints (e.g., `column1 datatype constraint` could be something like `my_col INT NOT_NULL`). Column names must also start with a letter, followed by any combination of (zero or more) letters, numbers, and/or underscores.

For example, we can create a table with two columns that contain a number and string:

```sql
CREATE TABLE my_table(
  id INT,
  val TEXT
);
```

## Constraints

You can attach column (or certain table) constraints to fine tune how data can be represented. This includes the following:

<!-- prettier-ignore -->
| Constraint | Definition | Column constraint? | Table constraint? |
| -- | -- | -- |-- |
| `PRIMARY KEY` | A unique value to identify a row—_at most, **one** primary key_ can be assigned to a table, which can be added to a single column or a grouping / list of columns. | Yes | Yes |
| `NOT NULL` | Ensure that a value is not null.  | Yes | No |
| `UNIQUE` | Ensure that a value is unique within the column. | Yes | No |
| `CHECK` | Perform a check of a value against an expression. | Yes | Yes |
| `DEFAULT` | Define a default value for a column (e.g., `my_col TEXT DEFAULT 'val1'`). | Yes | No |

As with the column constraints, a table constraint follows the format `column datatype constraint` within the schema portion of a `CREATE TABLE` statement.

- Primary keys
  - You can create a table with a `PRIMARY KEY` constraint, which, under the hood, is a combination of `NOT NULL` and `UNIQUE`. A primary key must uniquely identify a row by its column or set of columns, such `id INTEGER PRIMARY KEY`.
  - For a table constraint, place this at the end of a schema definition using a combination of columns like `PRIMARY KEY (col1, col2)`.
- Non-null values
  - Use a definition of `val TEXT NOT NULL` to ensure values are non-empty for a specific column.
  - A `NOT NULL` constraint can help with having "required" data constraints.
- Unique values
  - Similarly, something like `val TEXT UNIQUE` will only allow unique values to be inserted into a specific column.
  - This is useful if you're trying to make sure there aren't duplicate entries.
- Check against an expression
  - You want can make sure a column's values meet some criteria that use typical arithmetic operators (`>`, `<`,`>=`, `<=`, `!=`, `==`) plus `AND` or `OR`. For example, a column constraint might look like `id INT CHECK (id > 0)`.
  - For a table constraint, this follows a similar pattern. Perhaps, you'd like to perform some other table checks with something like `CHECK (id > 0 AND val != 2)`, which would be the last item in the schema definition list.
- Default values
  - Setting a default value is pretty straightforward—for example, `val TEXT DEFAULT 'message'` would set the value to `message` if nothing is provided upon row insertion.
  - There might be times when you want _something_ to exist as a placeholder and where you later update that value, when needed—the `DEFAULT` constraint helps with this.

The following shows a simple example with a few added column and table constraints:

```sql
CREATE TABLE my_table(
  id INT DEFAULT 0,
  val TEXT NOT NULL,
  PRIMARY KEY (id, val)
);
```

:::note
If you use the `INTEGER` type along with `PRIMARY KEY`, you unlock a special feature for auto-incrementing a row's data automatically. Check out the docs on [auto-incrementing values](/playbooks/sql/incrementing-values) for more specifics.
:::
