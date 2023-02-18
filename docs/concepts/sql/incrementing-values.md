---
title: Incrementing values automatically
sidebar_label: Auto-incrementing
description: Tableland allows developers to automatically increment a cell, with some restrictions.
synopsis: Developers often want to insert a row with a cell that automatically increases by a value of 1. There are some intricacies to be aware of, but this is fully possible with Tableland SQL and makes it easy to insert a row with an automatically generated identifier.
keywords:
  - auto-increment
  - autoincrement
---

## Overview

When a table is created with a row that has both an `INTEGER` type and `PRIMARY KEY` constraint, it will get to use a feature that auto-increments the value upon row insertion. Be sure to keep in mind the exact way in which this is achieved—the `AUTOINCREMENT` keyword cannot be used. Rather, it get automatically attached when this combination is provided.

The auto-incrementing feature can be achieved with a rather straightforward column— here’s what the schema should look like:

```sql
id INTEGER PRIMARY KEY
```

Namely, use the `INTEGER PRIMARY KEY` definition. Then, upon inserting a row, the `id` will monotonically increase if the `id` is _not specified_.

## Usage

Let’s say we have an empty table named `mytable` with the following schema:

```sql
id INTEGER PRIMARY KEY, name TEXT
```

Simply insert a value and do not specify the `id`:

```sql
INSERT INTO mytable (name) VALUES ('Bobby Tables');
INSERT INTO mytable (name) VALUES ('Molly Tables');
```

The table will automatically increment the `id`, resulting in the following:

| id  | name         |
| --- | ------------ |
| 1   | Bobby Tables |
| 2   | Molly Tables |

### Clarifications

The type `INT` _will not_ behave in the same way as a type `INTEGER` in this incrementing setup. An `INT` _will not_ be incremented and will throw an error upon running the insert statement defined above. Additionally, as noted in the [SQL spec](/concepts/sql/sql-spec), `AUTOINCREMENT` is a reserved keyword and should not be used.

:::tip
The `AUTOINCREMENT` keyword as a _potential_ feature is being further explored. Thus, it is subject to change, pending future research.

:::

## Precautions

There is one aspect to be aware of — `DELETE` queries. Let’s assume we have the same table as above (but as a fresh table with no rows yet):

```sql
/* `mytable` schema: id INTEGER PRIMARY KEY, name TEXT */
INSERT INTO mytable (name) VALUES ('v_1');
INSERT INTO mytable (name) VALUES ('v_2');
SELECT * FROM mytable;
1|v_1
2|v_2

/* Now, delete the last row and then insert one -- watch what happens */
DELETE FROM mytable WHERE name='v_2';
INSERT INTO mytable (name) values ('v_3');
select * from lulz;
1|v_1
2|v_3
```

As shown, the `id` for the value `v_2` was `2`. This row was deleted, and then a new row was inserted with a value of `v_3` — its `id` was _also_ created as `2`, even though it was a brand new row. So, please be sure to keep this in mind when leveraging the auto-incrementing capability.

Aside from this use case, the following demonstrates the behavior when deleting some previous row that isn’t of the highest index. This outcome is rather logical, but it’s useful to at least know what will happen:

```sql
/* `mytable` schema: id INTEGER PRIMARY KEY, name TEXT */
INSERT INTO mytable (name) VALUES ('v_1');
INSERT INTO mytable (name) VALUES ('v_2');
INSERT INTO mytable (name) VALUES ('v_3');
SELECT * FROM mytable;
1|v_1
2|v_2
3|v_3

/* Now, delete the middle row (or any non-highest-index) and then insert one */
DELETE FROM mytable WHERE name='v_2';
INSERT INTO mytable (name) values ('v_4');
select * from lulz;
1|v_1
3|v_3
4|v_4
```
