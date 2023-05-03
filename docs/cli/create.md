---
title: Create
description: Create a new table.
keywords:
  - CLI
  - command line
  - tableland create
---

## `tableland create <schema> [prefix]`

Pass either a table schema or full `CREATE TABLE` statement, thus, creating a Tableland table on the specified network and minting to the specified address. The global flags for `--privateKey`, `--chain`, and `--providerUrl` should also be included unless a config file has been created.

| Argument   | Type     | Description                                             |
| ---------- | -------- | ------------------------------------------------------- |
| `<schema>` | `string` | SQL table schema, _or_ a full `CREATE TABLE` statement. |

If you choose to pass a simple `schema` (columns, types, and constraints), then the `--prefix` option **must** also be passed. Alternatively, a full `CREATE TABLE` statement can be passed instead of a schema; in this case, the `--prefix` flag is not needed since the statement itself will define this information.

| Option   | Type     | Default | Description                                                |
| -------- | -------- | ------- | ---------------------------------------------------------- |
| --prefix | `string` | --      | Custom table prefix.                                       |
| --file   | `string` | --      | Path to a local file with a SQL create table statement.    |
| --ns     | `string` | --      | Attach a table to an ENS namespace (experimental feature). |

Note that with `--ns`, it can only be used with the `<schema> [prefix]` directives.

## Examples

In general, the response from a `create` statement includes the created table `name`, which the caller can use to make subsequent queries and updates.

### Schema and prefix

Pass a SQL table schema and prefix to the `create` command.

```bash
tableland create "id int primary key, val text" --prefix "cli_demo_table"
```

Output:

```json
{
  "meta": {
    "duration": 114.1470832824707,
    "txn": {
      "tableIds": ["2"],
      "transactionHash": "0xd11386bac25ac28c86edd047acb3ea4e027853f0e980aa65664817584849f9d5",
      "blockNumber": 317,
      "chainId": 31337,
      "tableId": "3",
      "name": "cli_demo_table_31337_2",
      "prefix": "cli_demo_table"
    }
  },
  "success": true,
  "results": [],
  "link": ""
}
```

### Create statement

Instead of passing a schema and prefix, you can specify this in a `CREATE TABLE` statement.

```bash
tableland create "CREATE TABLE cli_demo_table (id int primary key, val text)"
```

### File

If you have a file that defines the `CREATE TABLE` statement, the file path can be passed. For example, let's say you have a `.db` file saved in some `./project` path:

```bash title="./project/create.db"
CREATE TABLE cli_demo_table (id int primary key, val text)
```

You can pass this to `create` without needing any other arguments or flags except `--file`.

```bash
tableland create --file "./project/create.db"
```

## Adding a table to ENS namespace

:::warning
ENS support is very experimental. Long term support is not gaurunteed.
:::warning

You must specify the `enableEnsExperiment` flag, either in your `.tablelandrc` file or your flags. You must also specify an `ensProviderUrl`, which should use a provider for an ENS compatible testnet or mainnet.

To add a table to an ENS namespace while creating the table, you can specify the `ns` flag. You must also use the `schema` and `prefix` flags instead of using a full create statement.

```bash
tableland create "id integer, message text" --prefix "example" --ns "foo.bar.eth"
```

Output:

```json
{
  "meta": {
    "duration": 128.64695739746094,
    "txn": {
      "tableId": "2",
      "transactionHash": "0x9f51022ba7c82eba2a659d5a9000ba4c70b9f37de77ca299fb17c467d9659178",
      "blockNumber": 13,
      "chainId": 31337,
      "wait": [AsyncFunction: wait],
      "name": "example_31337_2",
      "prefix": "example"
    }
  },
  "success": true,
  "results": [],
  "link": "",
  "ensNameRegistered": true
}
```

This allows you to then access the table by only referring to the ENS name such that the `prefix` is now a subdomain of the ENS name. See the [`namespace`](/cli/namespace) command for more details on how to add tables to ENS.
