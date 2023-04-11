---
title: SQL FAQs
sidebar_label: FAQs
description: Check out helpful pointers when dealing with SQL.
keywords:
  - grant
  - revoke
  - access control
---

## Does Tableland support foreign keys?

No, not at this time as there are potential determinism issues involved.

## Can I use subqueries in write statements?

Only "flattened" subqueries are supported within `INSERT` statements but are not possible in `UPDATES`. For read queries, nesting subqueries is perfectly acceptable. See the [docs for more info](/playbooks/sql/write#inserting-data).

## Does Tableland support numbers with decimals values?

No, because floating points are hard to deal with in decentralized systems due to non-deterministic behavior. So, blockchains and related infrastructure have to adopt whole integer values and arithmetic, instead.

## Does Tableland support types for dates or times?

No, because these lead to non-deterministic behavior. But, you are free to store these values as `TEXT` or `INTEGER` types, and the custom `BLOCK_NUM()` and `TXN_HASH()` functions can help a bit here, too.

## Can I update _more than one_ table in a single transaction?

Yes, mutating queries (inserts, updates, deletes) can only touch _one or more tables at a time_. Keep in mind that if one of the statements fail, they all fail.

## Are all SQLite functions supported?

No—and read the [SQL functions docs](/playbooks/sql/functions) for details!

## How do I escape single quotes within a SQL string literal?

SQL string literals (e.g., a table with a TEXT value) are wrapped single quotes. In order to use a single quote within the string literal, double the single quote that must be escaped:

```sql
INSERT INTO escape_table (id, VALUES (0, 'My string''s escaping!')
```

## What's the difference between single and double quotes in SQL?

A simple rule to remember which to use and when:

- [**S**]ingle quotes are for [**S**]tring Literals
- [**D**]ouble quotes are for [**D**]atabase Identifiers
  ```sql
  INSERT INTO
    "my_table" ("id", "val")
  VALUES
    (0, 'Bobby Tables');
  ```
  _Sourced from [StackOverflow](https://stackoverflow.com/questions/1992314/what-is-the-difference-between-single-and-double-quotes-in-sql)_

## Can I use lowercase letters for keywords?

It doesn't matter if you use all caps or all lowercase—either way is perfectly acceptable! For example, `select * from my_table;` is further parsed and works just the same as `SELECT * FROM my_table;`.

## What are some useful tools and resources to learn and work with SQL?

The following is a list of cool and useful SQL-related tools. These are not affiliated with Tableland but simply being shared to help developers using the protocol:

- [https://www.beekeeperstudio.io/](https://www.beekeeperstudio.io/)
- [https://prql-lang.org/](https://prql-lang.org/)
- [https://ricardoanderegg.com/posts/sqlite-remote-explorer-gui/](https://ricardoanderegg.com/posts/sqlite-remote-explorer-gui/)
- [https://dataland.io/](https://dataland.io/)
- [https://github.com/datafold/data-diff](https://github.com/datafold/data-diff)
- [https://www.dolthub.com/](https://www.dolthub.com/)
- [https://principles.planetscale.com/](https://principles.planetscale.com/)
- [https://sqliteviewer.app/](https://sqliteviewer.app/)
- [https://codebeautify.org/sqlformatter](https://codebeautify.org/sqlformatter)
- [https://beta.openai.com/examples/default-sql-request](https://beta.openai.com/examples/default-sql-request)
- Mock SQL data ⇒ [https://www.mockaroo.com/](https://www.mockaroo.com/)
