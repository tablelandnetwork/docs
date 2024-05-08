---
title: Receipt
description: Get the receipt from a table's transaction.
keywords:
  - CLI
  - command line
  - tableland receipt
---

## `tableland receipt <txn_hash>`

You can use `receipt` to get a mutating query's transaction information, including if it was executed and the execution details. This is especially useful for errors that occur when a transaction is successful, but the SQL execution was not (syntax error, insufficient permissions, etc.). The global flag for `--chain` should also be included unless a config file has been created.

| Argument | Type     | Description                                              |
| -------- | -------- | -------------------------------------------------------- |
| `<hash>` | `string` | The transaction hash from a table create or write query. |

## Example

Retrieve data associated with a transaction, including the block number, table ID, and chain ID.

```bash
tableland receipt 0x808afd525b8bac7d7d74ba9e0b214984e6862cf83e3b42cb181f8f415be57c9e --chain polygon-amoy
```

Output:

```json
{
  "tableId": "151",
  "tableIds": ["151"],
  "transactionHash": "0x808afd525b8bac7d7d74ba9e0b214984e6862cf83e3b42cb181f8f415be57c9e",
  "blockNumber": 6765201,
  "chainId": 80002
}
```

If some transaction has a problem and didn't mutate the database, this information will also be described in the `error` field:

```bash
tableland receipt 0xa7f946bddeda6f70171a7b8850e9ccbd7a7c5b027a05652479bc3b8b2ae86c61 --chain polygon-amoy
```

Output:

```json
{
  "transactionHash": "0xa7f946bddeda6f70171a7b8850e9ccbd7a7c5b027a05652479bc3b8b2ae86c61",
  "blockNumber": 6765236,
  "chainId": 80002,
  "error": "db query execution failed (code: SQLITE_UNIQUE constraint failed: cli_demo_table_80002_151.id, msg: UNIQUE constraint failed: cli_demo_table_80002_151.id)"
}
```
