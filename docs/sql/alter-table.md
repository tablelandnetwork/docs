---
title: Alter table
description: Change a table's structure after it has been created.
keywords:
  - alter table
  - schema
---

If you create a table and later want to change its structure, this is possible but with a couple of limitations. Developers can take advantage of the `ALTER TABLE` statement but only for adding additional columns, renaming an existing one, or dropping a column. You **cannot** remove or change type definitions for existing columns nor rename the table itself, and a column with a `PRIMARY KEY` constraint cannot be dropped.

## Overview

The `ALTER TABLE` clause can be passed as a mutating SQL query in few scenarios (note: you cannot rename or drop a table):

- Adding a column.
- Renaming a column.
- Dropping a column.

## Adding a column

To add a new column, you simply specify the column name, type, and any other constraints.

```sql
ALTER TABLE table_name ADD COLUMN new_col text;
```

Now, querying the table will yield results with the new column name.

## Renaming a column

To change a column's name, it's a similar process but

```sql
ALTER TABLE table_name RENAME orig_col TO new_col;
```

## Dropping a column

Lastly, you can also remove a column entirely by "dropping" it.

```sql
ALTER TABLE table_name DROP new_col;
```
