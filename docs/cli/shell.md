---
title: Shell
description: Open up a shell environment and run raw SQL statements for ease of use.
keywords:
  - cli
  - command line
  - shell
---

## `tableland shell`

The Tableland shell is useful for interacting with tables on any chain. It should be familiar to SQL developers and allows for standard SQL queries to be used. For example, the shell allows you to directly write a `CREATE TABLE` statement without having to use the `tableland create` command; this is also true for mutating and read-only queries.

Running the following command will open up a shell environment to make it easier to interact with the network:

```bash
tableland shell
```

The shell will then open up and resemble the following, allowing for SQL queries to be passed directly:

```bash
tableland>
```

## Example

First, run the command `tableland shell`. Once in the shell, you can create tables and make other queries.

```shell
Welcome to Tableland
Tableland CLI shell
Connected to local-tableland using 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
tableland> create table cli_demo_table (id integer primary key, val text);
tableland> insert into cli_demo_table_31337_12(val) values ('Bobby Tables');
tableland> select * from cli_demo_table_31337_2;
```

Output:

```json
[
  {
    "id": 1,
    "val": "Bobby Tables"
  }
]
```

## Using ENS

:::warning
ENS support is very experimental; long term support is not guaranteed!
:::warning

You must specify the `enableEnsExperiment` flag, either in your `.tablelandrc` file or your flags. You must also specify an `ensProviderUrl`, which should use a provider for an ENS compatible testnet or mainnet.

If an ENS text record has a record corresponding to a table, you can use it within a query by wrapping the namespace in brackets and treating it as the table's name. See the [`namespace`](/cli/namespace) command for more details on how to add tables to ENS.

## Using a table alias

If you create a table with a provided JSON file passed to the `--aliases` flag, a full table name is not needed. The results from creates, writes, and reads will use the passed JSON file (e.g., `tableland.aliases.json`).

```json title="./tableland.aliases.json"
{
  "cli_demo_table": "cli_demo_table_31337_2"
}
```

Allowing you to use the alias in commands instead of the full name (`{prefix}_{chainId}_{tableId}`):

```bash
tableland> create table cli_demo_table (id integer primary key, val text);
tableland> insert into cli_demo_table(val) values ('Bobby Tables');
tableland> select * from cli_demo_table;
```
