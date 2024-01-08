---
title: Get started
description: Dive into SQL and start using it to build web3 applications.
keywords:
  - sql
---

Tableland supports [SQLite](https://www.sqlite.org/fullsql.html) language compatibility with some unique limitations and enhancements. Any imposed language constraint is due to blockchain-related qualities and the requirement for deterministic state across any machine running the protocol. On the flip side, a couple of "magic" SQL functions can be used to insert chain-related data like block numbers and transaction hashes. Additional walkthroughs for concepts like NFT metadata and key-value store tables are also detailed.

## Using SQL

Whether or not you're new to SQL, you should still review some of the introductory docs. Namely, not all SQL is the same, so if you're coming from SQL _that's not_ SQLite, there are likely some some small differences here and there—although generally, the core concepts are the same. Once you have the basics down, you can then dive into the more tailored content that is more use case specific.

The intent of the first section is to provide a general overview of how to do something with Tableland SQL. It is not comprehensive, as the specification itself provides the most up-to-date and detailed information. From there, additional docs outline how to use SQL from a design perspective (structuring tables and query formation).

:::tip
Be sure to review the [SQL specification](/sql/specification) once you understand the basics. Also, note there are implementation-focused guides that demonstrate how to do this with actual code vs. pure SQL guides.
:::

## Usage

When you write SQL statements, they follow a format that loosely resembles that of the following in written / spoken language. Note that SQL syntax does not require all capital letters and can use lowercase (`create table` is the same as `CREATE TABLE`, `int` the same as `INT`, etc.).

Tableland currently supports the following SQL clauses:

- [`CREATE TABLE`](/sql/create): Create a table with a series of types aligned to columns and constraints.
- [`INSERT`](/sql/write#inserting-data): Insert data into a table's columns with certain values (with "[upsert](/sql/write#upserts)" support, too).
- [`UPDATE`](/sql/write#updating-data): Update a table's values where some condition is met.
- [`DELETE`](/sql/write#deleting-data): Delete a value from a table where some condition is met.
- [`SELECT`](/sql/read): Select a set of data from a table(s), along with conditions.
- [`GRANT`/`REVOKE`](/sql/access-control): Control how users can write to tables.
- [`ALTER TABLE`](/sql/alter-table): Adjust an existing table's structure.

To access the database, Tableland clients like the [SDK](/sdk), [smart contracts](/smart-contracts), and [CLI](/cli) can be used to create and mutate table data. These also use the [Gateway REST API](/validator/api) to actually read data directly from the Tableland network by directly writing `SELECT` statement against it.

## Expressions, operators, & functions

Expressions, operators, and functions are the building blocks of SQL. They allow you to compute on or transform data. You can do things like conditional logic, type casting, working with JSON, etc. Check out the following pages for more details:

- [Expressions & operators](/sql/expressions): Logic or simple transformations on data.
- [Functions](/sql/functions): Execute a function on a value or set of values to transform the data.
- [Incrementing values](/sql/incrementing-values): Automatically increment a value in a table upon inserts.
- [JOINs](/sql/composing-data): Compose data across two or more tables.

## Data types

Not all "typical" SQL data types are supported since blockchains and distributed systems can lead to non-deterministic state. The following defines what can be used in column definitions:

| Type      | Description                                                                                            |
| --------- | ------------------------------------------------------------------------------------------------------ |
| `INT`     | Signed integer values, stored in 0, 1, 2, 3, 4, 6, or 8 bytes depending on the magnitude of the value. |
| `INTEGER` | Same as `INT`, except it may also be used to represent an auto-incrementing `PRIMARY KEY` field.       |
| `TEXT`    | Text string, stored using the database encoding (UTF-8).                                               |
| `BLOB`    | A blob of data, stored exactly as it was input. Useful for byte slices etc.                            |

Note that a common pattern for dates / times is to use `INT`, `INTEGER`, or `TEXT`, depending on how you design your application. For booleans, use an `INT` or `INTEGER` and a `0` or `1` value.

## Table names

Every table created will have a [deterministically unique table name](/fundamentals/architecture/table-token.md) in the format `{prefix}_{chainId}_{tableId}`. If you're using clients or helpers built on top of the protocol, the `chainId` and `tableId` _should_ automatically appended _after_ a table is created. So, when you form create statements, they generally _should_ only need the first segment of the table name string, `{prefix}`, which is also optional. If you use a prefix, it must start with a letter, followed by any combination of (zero or more) letters, numbers, and/or underscores. If you choose to forego a prefix, be sure that the "prefix"—an empty string—is wrapped in double quotes (e.g., `CREATE TABLE "" (...)`) for SQL parsing purposes.

Keep in mind that lower level interactions, like smart contract calls without a Tableland helper library, _might_ expect a table name in the format `{prefix}_{chainId}`—it's something to keep in mind if you run into table name issues.

## Callouts

Tableland doesn't have full SQLite parity. Let's review a TL;DR of what to look out for:

- Table names in queries should use the format `{prefix}_{chainId}_{tableId}`, but a create statement should not have the `_{tableId}` portion since this ID autogenerated.
- There is a [set of reserved keywords](/sql/specification#reserved-keywords) to be aware of.
- Foreign keys constraints are not supported.
- Some common SQL languages have type support for numbers with decimals (floats/reals), dates/times, and booleans, but Tableland **does not support any of these** (see the [data type docs](/sql/#data-types)).
- Subqueries ("nesting" `SELECT` statements within a query) are fully supported in read queries but limited to flattened subqueries or `GROUP BY` statements (with `HAVING` support) for inserts; they cannot be used in updates nor deletes.
- Mutating queries (inserts, updates, deletes) can touch one or more tables in a single _transaction_, but they cannot touch multiple tables in a single _string of statements_.
- Be sure to wrap any `TEXT` in a single quotes (`'`), including hexadecimals numbers (e.g., EVM account addresses).
- Custom SQL functions (`TXN_HASH()` and `BLOCK_NUM()`) are available for accessing blockchain-related transaction hash and block numbers associated with a SQL query.
- Not _all_ of the SQLite [functions](https://www.sqlite.org/lang_corefunc.html) are supported, and be aware that unsupported types impact their usage as well.
