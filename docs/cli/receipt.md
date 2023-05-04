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
tableland receipt 0xe62a3d3c5955e63b69daced639570e6e59559750d19a8e21bc91251a1876cce3 --chain maticmum
```

Output:

```json
{
  "tableId": "5942",
  "transactionHash": "0xe62a3d3c5955e63b69daced639570e6e59559750d19a8e21bc91251a1876cce3",
  "blockNumber": 35114209,
  "chainId": 80001
}
```

If some transaction has a problem and didn't mutate the database, this information will also be described in the `error` field:

```bash
tableland receipt 0xf186073a8b1e3eba78e76a91517bc0daf425bb0d3f10379a26f2b386bc28c2ea --chain maticmum
```

Output:

```json
{
  "transactionHash": "0xf186073a8b1e3eba78e76a91517bc0daf425bb0d3f10379a26f2b386bc28c2ea",
  "blockNumber": 35114382,
  "chainId": 80001,
  "error": "db query execution failed (code: SQLITE_cannot store TEXT value in INT column t_80001_5942.id, msg: cannot store TEXT value in INT column t_80001_5942.id)"
}
```
