

## receipt

`tableland receipt <txn_hash>` _(string)_
Get the receipt of a chain transaction to know if it was executed, and the execution details. This is useful for errors that occur when a transaction is successful but the SQL execution was not.

```bash
tableland receipt <hash>

Positionals:
  hash  Transaction hash                                     [string] [required]

Options:
      --help        Show help                                          [boolean]
  -k, --privateKey  Private key string                       [string] [required]
      --chain       The EVM compatible chain to target
                                           [string] [default: "maticmum"]
```

### Example

This allows you to retrieve data like the chain id, block number, and table ID—and note that the transaction hash itself is returned when running the `create` and `write` commands:

```bash
tableland receipt 0x2406508ff28f673e9a080b6295af4cfd0de75a199f2a9044a1cad580cd0aae0a --chain <chanName> --private-key <privateKey>
```

```json
{
  "tableId": "2",
  "transactionHash": "0x2406508ff28f673e9a080b6295af4cfd0de75a199f2a9044a1cad580cd0aae0a",
  "blockNumber": 135,
  "chainId": 31337
}
```
