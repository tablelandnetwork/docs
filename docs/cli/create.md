
## create

`tableland create <schema> --prefix [prefix]` _(string; string)_
Create a new table.

```bash
Positionals:
  schema      SQL table schema                                [string] [required]
  prefix      The table prefix                                [string] [optional]

Options:
      --help        Show help                                          [boolean]`
      --schema      SQL table schema.                                   [string]
      --prefix      Table name prefix.                                  [string]
  -k, --privateKey  Private key string                                  [string]
      --chain       The EVM compatible chain to target
                                           [string] [default: "maticmum"]
      --alchemy     Alchemy provider API key                            [string]
      --infura      Infura provider API key                             [string]
      --etherscan   Etherscan provider API key                          [string]
```

Like most relational database systems, Tableland requires the user to create tables for storing, querying, and relating data. See the [JavaScript SDK](https://www.notion.so/JavaScript-SDK-Legacy-9acf7b81bec5444aa4f9230445972658) docs for details on `create` requirements.

### Example

The response from a `create` statement includes the created table `name`, which the caller can use to make subsequent queries and updates:

```bash
tableland create "id int primary key, name text" --prefix "cli_demo_table"
```

```json
{
  meta: {
    duration: 128.64695739746094,
    txn: {
      tableId: '2',
      transactionHash: '0x9f51022ba7c82eba2a659d5a9000ba4c70b9f37de77ca299fb17c467d9659178',
      blockNumber: 13,
      chainId: 31337,
      wait: [AsyncFunction: wait],
      name: 'cli_demo_table_31337_2',
      prefix: 'cli_demo_table'
    }
  },
  success: true,
  results: [],
  link: ''
}
```

Since creating a table on requires a smart contract interactions, it is recommended to provide an API key to a remote EVM _provider_ API when using the `create` command. This avoids [rate limiting by `ethers`](https://docs.ethers.io/api-keys/). For context, Tableland mints a `TABLE` (ERC721) token using the [Tableland smart contract](https://github.com/tablelandnetwork/evm-tableland/blob/main/contracts/TablelandTables.sol), which is the on-chain representation of every table then created in Tableland. Simply specify your desired API provider key (or provide all three), and create a table.
