---
title: Write
description: Run a mutating SQL statement against a remote table.
keywords:
  - CLI
  - command line
  - tableland write
---

## `tableland write <statement>`

The `write` command allows for vanilla SQL `INSERT`, `UPDATE`, and `DELETE` statements.

| Argument      | Type     | Description             |
| ------------- | -------- | ----------------------- |
| `<statement>` | `string` | The mutating SQL query. |

One key aspect to keep in mind when working with tables is that you must specify the table `name` that you get back from the [`create`](/cli/create) command. The global flags for `--privateKey`, `--chain`, and `--providerUrl` should also be included unless a config file has been created.

## Example

Insert some values into a table, which will return other meaningful information like the block and transaction hash.

```bash
tableland write "INSERT INTO cli_demo_table_31337_2 VALUES (1, 'Bobby Tables');"
```

Output:

```json
{
  "meta": {
    "duration": 95.6428337097168,
    "txn": {
      "tableIds": ["2"],
      "transactionHash": "0x8e8b3150fcf3e18bca92d0db79d2a9eed49a7cbebbb2a938aecb1c2f90c275e3",
      "blockNumber": 7362,
      "chainId": 31337,
      "tableId": "2",
      "name": "_31337_2",
      "prefix": ""
    }
  },
  "success": true,
  "results": [],
  "link": ""
}
```

## Using ENS

:::warning
ENS support is very experimental; long term support is not guaranteed!
:::

You must specify the `enableEnsExperiment` flag, either in your `.tablelandrc` file or your flags. You must also specify an `ensProviderUrl`, which should use a provider for an ENS compatible testnet or mainnet.

If an ENS text record has a record corresponding to a table, you can insert into it by wrapping the namespace in brackets and treating it as the table's name.

```
tableland write "insert into [example.foo.bar.eth] (id, message) values (1, 'Some message');"
```

See the [`namespace`](/cli/namespace) command for more details on how to add tables to ENS.

## Using a table alias

If you create a table with a provided JSON file passed to the `--aliases` flag, a full table name (`{prefix}_{chainId}_{tableId}`) is not needed. For example, if you have a file `tableland.aliases.json` with the following:

```json title="./tableland.aliases.json"
{
  "example": "example_31337_2"
}
```

You can run the write command with the table alias.

```bash
tableland write "INSERT INTO example VALUES (1, 'Bobby Tables');"
```
