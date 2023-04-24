---
title: CLI commands
sidebar_label: Commands
description: The Tableland CLI comes with purpose built commands, which slightly differs from the convention in other clients.
keywords:
  - cli
  - command line
---

There are a number of commands available for interacting with Tableland. Each one has a specific set of required and optional arguments, plus various flags. Be sure to specify a `providerUrl` and `privateKey` for most commands, along with the desired host `chain`.

```bash
tableland <command> <arguments> [flags]
```

## Synopsis

`tableland chains`
List information about supported chains.

---

`tableland controller <subcommand>` (string)
Get, set, and lock the controller contract for a given table.

- Show all controller `subcommand` values
  `get <name>` _(string)_
  Get the current controller address for a table.
  ***
  `set <controller> <name>` _(string; string)_
  Set the controller address for a table.
  ***
  `lock <name>` _(string)_
  Lock the controller address for a table.

---

`tableland create <schema> [prefix]` _(string; string)_
Create a new table (prefix is optional).

---

`tableland info <name>` _(string)_
Get info about a given table by name.

---

`tableland init`
\*\*Create a config file.

---

`tableland list <address>` _(string)_
List tables by address.

---

`tableland read <statement>` _(string)_
Run a read-only query against a remote table.

---

`tableland receipt <hash>` _(string)_
Get the receipt of a chain transaction to know if it was executed, and the execution details.

---

`tableland schema <name>` _(string)_
Get info about a given table schema.

---

`tableland write <statement>` _(string)_
Run a mutating SQL statement against a remote table.

---

`tableland shell [statement]` _(string)_
Interact with tableland via an interactive shell environment.

## Global Flags

The Tableland CLI includes a number of global flags.

---

`--help`
Show help.

---

`--version`
Show version number.

---

`-k, --privateKey <private_key>` _(string)_
Private key string.
_Note: most commands, aside from read queries, will need to flag a `--privateKey` (or set the configuration variables with the `init` command)._

---

`-c, --chain <chain_name>` _(string)_
The EVM chain to target (default: `maticmum`).

Testnets

- `sepolia` (Ethereum Sepolia)
- `maticmum` (Polygon Mumbai)
- `optimism-goerli` (Optimism Goerli)
- `arbitrum-goerli` (Arbitrum Goerli)

Mainnets

- `mainnet` (Ethereum)
- `homestead` (Ethereum)
- `matic` (Polygon)
- `optimism` (Optimism)
- `arbitrum` (Arbitrum One)
- `arbitrum-nova` (Arbitrum Nova)

Local

- `localhost`
- `local-tableland` (Local Tableland)

---

`--baseUrl <url>` _(string)_
The URL of a Tableland validator.

---

`--providerUrl <url>` _(string)_
JSON RPC API provider URL (e.g., `https://eth-rinkeby.alchemyapi.io/v2/123abc123a...`).

---

### Defaults

The following are the default options:

- `--chain` ⇒ `maticmum`
  Polygon Mumbai has been set as the default chain; any other chain names from the `tableland chains` command can be used.

## init

`tableland init`

Create a config file.

Before starting with the CLI, it’s best to create a config file. This will create a JSON or YAML file that stores a `privateKey`, `chain`, and `providerUrl`. Once these are set, commands will leverage these values.

Run the command, and then follow the prompts:

```bash
tableland init
```

This will trigger a series of steps. First, select your desired chain:

```markdown
? Select a preferred default chain (Use arrow keys)
❯ mainnet
homestead
optimism
arbitrum
matic
sepolia
optimism-goerli
arbitrum-goerli
maticmum
localhost
local-tableland
```

You’ll want to set your private key. For example, a private key with value `0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d` is an openly used account the comes with local node tooling like Hardhat, so it can also be used if you’re developing with `local-tablealand`. However, for any mainnets or testnets, it’s best to use your own private key.

```json
? Enter your private key (optional)
0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
```

Set your preferred format (JSON or YAML):

```markdown
? Select a config file output format
❯ json
yaml
```

Store your provider URL (Alchemy, Infura, etc.):

```markdown
? Enter a default JSON RPC API provider URL (optional)
https://eth-mainnet.alchemyapi.io/v2/123abc123a...
```

Then, enter the path where this value should be stored; the default value will be under `/Users/$USER/.tablelandrc.json`:

```markdown
? Enter path to store config file (use "." to print to stdout)
(/Users/$USER/.tablelandrc.json)
```

The resulting config file will resemble the following:

```json
{
  "privateKey": "59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d",
  "chain": "mainnet",
  "providerUrl": "https://eth-mainnet.alchemyapi.io/v2/123abc123a..."
}
```

## chains

`tableland chains`

List information about supported chains.

In particular, use the `chains` command to retrieve which chains Tableland is deployed on, which returns information about the deployment itself, including the chain name, id, and contract address:

### Example

```bash
tableland chains
```

```json
{
  "mainnet": {
    "chainName": "mainnet",
    "chainId": 1,
    "contractAddress": "0x012969f7e3439a9B04025b5a049EB9BAD82A8C12",
    "baseUrl": "https://tableland.network/api/v1"
  },
  "homestead": {
    "chainName": "homestead",
    "chainId": 1,
    "contractAddress": "0x012969f7e3439a9B04025b5a049EB9BAD82A8C12",
    "baseUrl": "https://tableland.network/api/v1"
  },
  "optimism": {
    "chainName": "optimism",
    "chainId": 10,
    "contractAddress": "0xfad44BF5B843dE943a09D4f3E84949A11d3aa3e6",
    "baseUrl": "https://tableland.network/api/v1"
  },
  "arbitrum": {
    "chainName": "arbitrum",
    "chainId": 42161,
    "contractAddress": "0x9aBd75E8640871A5a20d3B4eE6330a04c962aFfd",
    "baseUrl": "https://tableland.network/api/v1"
  },
  "arbitrum-nova": {
    "chainName": "arbitrum-nova",
    "chainId": 42170,
    "contractAddress": "0x1A22854c5b1642760a827f20137a67930AE108d2",
    "baseUrl": "https://tableland.network/api/v1"
  },
  "matic": {
    "chainName": "matic",
    "chainId": 137,
    "contractAddress": "0x5c4e6A9e5C1e1BF445A062006faF19EA6c49aFeA",
    "baseUrl": "https://tableland.network/api/v1"
  },
  "sepolia": {
    "chainName": "sepolia",
    "chainId": 11155111,
    "contractAddress": "0xc50C62498448ACc8dBdE43DA77f8D5D2E2c7597D",
    "baseUrl": "https://testnets.tableland.network/api/v1"
  },
  "optimism-goerli": {
    "chainName": "optimism-goerli",
    "chainId": 420,
    "contractAddress": "0xC72E8a7Be04f2469f8C2dB3F1BdF69A7D516aBbA",
    "baseUrl": "https://testnets.tableland.network/api/v1"
  },
  "arbitrum-goerli": {
    "chainName": "arbitrum-goerli",
    "chainId": 421613,
    "contractAddress": "0x033f69e8d119205089Ab15D340F5b797732f646b",
    "baseUrl": "https://testnets.tableland.network/api/v1"
  },
  "maticmum": {
    "chainName": "maticmum",
    "chainId": 80001,
    "contractAddress": "0x4b48841d4b32C4650E4ABc117A03FE8B51f38F68",
    "baseUrl": "https://testnets.tableland.network/api/v1"
  },
  "localhost": {
    "chainName": "localhost",
    "chainId": 31337,
    "contractAddress": "",
    "baseUrl": "http://localhost:8080/api/v1"
  },
  "local-tableland": {
    "chainName": "local-tableland",
    "chainId": 31337,
    "contractAddress": "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512",
    "baseUrl": "http://localhost:8080/api/v1"
  }
}
```

## controller

`tableland controller <subcommand>`
Get, set, and lock the controller contract for a given table.

Use these commands as a helper to retrieve the controller of a table (`get`) or to set _or permanently_ lock the controller of a table (`set` or `lock`). Recall the `name` is in the format `{prefix}_{chainId}_{tableId}`.

### Subcommands

`get <name>` _(string)_

Get the current controller address for a table.

---

`set <controller> <name>` _(string [string])_
Set the controller address for a table.

---

`lock <name>` _(string)_
Lock the controller address for a table.

### Example

`get`

```bash
tableland controller get cli_demo_table_31337_2
```

```json
"0x0000000000000000000000000000000000000000"
```

_Note: this example table originally had its controller set as `0x0`, which is the default value._

`set`

```bash
tableland controller set 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC cli_demo_table_31337_2
```

```json
{
  type: 2,
  chainId: 31337,
  nonce: 3,
  maxPriorityFeePerGas: BigNumber { _hex: '0x59682f00', _isBigNumber: true },
  maxFeePerGas: BigNumber { _hex: '0x59682f0e', _isBigNumber: true },
  gasPrice: null,
  gasLimit: BigNumber { _hex: '0xf14a', _isBigNumber: true },
  to: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
  value: BigNumber { _hex: '0x00', _isBigNumber: true },
  data: '0x8bb0ab9700000000000000000000000070997970c51812dc3a010c7d01b50e0d17dc79c800000000000000000000000000000000000000000000000000000000000000020000000000000000000000003c44cdddb6a900fa2b585dd299e03d12fa4293bc',
  accessList: [],
  hash: '0x5f8d81e07b908e501a8ccc1257bf2691400f3c68b657af3b36fa21fec0d9b16b',
  v: 1,
  r: '0x1e0ad1b9fc72c9d909ec64dd89d888e9299f5f2f57968d06fd737389357a5634',
  s: '0x429cdb090c318e50d3197cbb7405651b7c330dda15af2c4256ba47ae80deffcb',
  from: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
  confirmations: 0,
  wait: [Function (anonymous)],
  link: ''
}
```

`lock`

```bash
tableland controller lock cli_demo_table_31337_2
```

```json
{
  type: 2,
  chainId: 31337,
  nonce: 4,
  maxPriorityFeePerGas: BigNumber { _hex: '0x59682f00', _isBigNumber: true },
  maxFeePerGas: BigNumber { _hex: '0x59682f0e', _isBigNumber: true },
  gasPrice: null,
  gasLimit: BigNumber { _hex: '0xdefc', _isBigNumber: true },
  to: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
  value: BigNumber { _hex: '0x00', _isBigNumber: true },
  data: '0x0529568100000000000000000000000070997970c51812dc3a010c7d01b50e0d17dc79c80000000000000000000000000000000000000000000000000000000000000002',
  accessList: [],
  hash: '0xbf61cf9df3b7bc7df49bb127e23783fad2670d1b7076763d4e6c149864b8972e',
  v: 0,
  r: '0x56a4faa391111dfd54873dacc9e2b9dbfa47114914c9ca145402c12d1190a353',
  s: '0x1b773d3af98496662163600fa7ac81610a32ecf79de3a683ef7ffd606bab8e9a',
  from: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
  confirmations: 0,
  wait: [Function (anonymous)],
  link: ''
}
```

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

## info

`tableland info <name>` _(string)_
Get info about a given table by name.

```bash
Positionals:
  name  The target table name                                 [string] [required]

Options:
      --help        Show help                                          [boolean]
      --chain       The EVM compatible chain to target
                                           [string] [default: "maticmum"]
```

### Example

The response includes table information in a standard [ERC721 metadata](https://eips.ethereum.org/EIPS/eip-721) format, including the table’s name, creation data, external URL (which points to the Tableland gateway), and attributes:

```bash
tableland info cli_demo_table_31337_2
```

```json
{
  "name": "cli_demo_table_31337_2",
  "externalUrl": "http://localhost:8080/chain/31337/tables/2",
  "animationUrl": "https://render.tableland.xyz/?chain=31337&id=2",
  "image": "https://bafkreifhuhrjhzbj4onqgbrmhpysk2mop2jimvdvfut6taiyzt2yqzt43a.ipfs.dweb.link",
  "schema": {
    "columns": [
      { "name": "id", "type": "int", "constraints": ["primary key"] },
      { "name": "name", "type": "text" }
    ]
  },
  "attributes": [
    { "displayType": "date", "traitType": "created", "value": 1677184456 }
  ]
}
```

## list

`tableland list [address]` _(string)_
List tables by address.

```markdown
Positionals:
address The target address [string]

Options:
--help Show help [boolean]
-k, --privateKey Private key string [string] [required]
--chain The EVM compatible chain to target
[string] [default: "maticmum"]
```

Using `list` command provides and easy way to understand which tables are owned by a certain address.

### Example

The retrieved information about those tables includes the table’s name, structure (describing the schema), and created time:

```bash
# Be sure to either use the default `maticmum` or set the `--chain`
tableland list
```

```json
[
  {
    "tableId": "2",
    "chainId": 31337
  }
]
```

## transfer

Transfer a table to another address

```markdown
Positionals:
name The target table name [string] [required]
receiver The address to transfer the table to [string] [required]

Options:

-k, --privateKey Private key string [string]
-c, --chain The EVM chain to target [string]
```

### Example

Transfer a table from current wallet to another address

```bash
tableland transfer example_table_313337_1 0x0000000000000000000000
```

Response:

```JSON
{
  "type": 2,
  "chainId": 31337,
  "nonce": 1,
  "maxPriorityFeePerGas": {
    "type": "BigNumber",
    "hex": "0x59682f00"
  },
  "maxFeePerGas": {
    "type": "BigNumber",
    "hex": "0x7661cc5a"
  },
  "gasPrice": null,
  "gasLimit": {
    "type": "BigNumber",
    "hex": "0x0115da"
  },
  "to": "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
  "value": {
    "type": "BigNumber",
    "hex": "0x00"
  },
  "data": "0x42842e0e00000000000000000000000070997970c51812dc3a010c7d01b50e0d17dc79c80000000000000000000000003c44cdddb6a900fa2b585dd299e03d12fa4293bc0000000000000000000000000000000000000000000000000000000000000002",
  "accessList": [],
  "hash": "0x300816cf3b569f446240966e48588c55f735db91beb86e601fec09c1cce52caa",
  "v": 0,
  "r": "0xe2e861751e1fde983daca55659856c90894c3275fa6505bb393af6a40186c8cb",
  "s": "0x66553031615ac79e05cf46c826f130c5e122b04edcd441cc7acfa661ee7fb4c1",
  "from": "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
  "confirmations": 0
}

```

## read

`tableland read <query>` _(string)_
Run a read-only query against a remote table.

```bash
Positionals:
  query  SQL query statement                                 [string] [required]

Options:
      --help        Show help                                          [boolean]
  -c, --chain       The EVM chain to target [string] [default: "maticmum"]
      --format      Output format. One of 'pretty', 'table', or 'objects'.
                                                     [string] [default: "table"]
      --extract              Returns only the set of values of a single column.
                             Read statement must be require only a single column
                             .                        [boolean] [default: false]
      --unwrap               Returns the results of a single row instead of arra
                             y of results. Read statement must result in a singl
                             e row response.          [boolean] [default: false]
```

It is also easy to use vanilla SQL `SELECT` statements to query the whole table! See the [JavaScript SDK](https://www.notion.so/JavaScript-SDK-Legacy-9acf7b81bec5444aa4f9230445972658) docs for further details. As with the `write` command, you must specify the table name returned from the `create` command.

### Examples for Formatting Outputs

There are three possible `--format` options:

- `table` (default) ⇒ Data returned as an object that represents a table, with two keys called _columns_ and _rows_; each has column (array of objects) and row (array of arrays) information.
- `pretty` ⇒ A tabular view of the data, in a “pretty” table-like view.
- `objects` ⇒ The data is returned as an array of objects, where the _columns_ _and row data_ are included in each object; an object represents a row.

```bash
tableland read "SELECT * FROM cli_demo_table_80001_1285;" --format <table_objects_or_pretty>
```

```json
{
  "meta": { "duration": 33.1743745803833 },
  "success": true,
  "results": [{ "id": 1, "name": "Bobby Tables" }]
}
```

If `pretty` is flagged, then the output is a “pretty” tabular view for a nice human-readable format:

```json
> tableland read "SELECT * FROM cli_demo_table_80001_1285;" --format pretty
┌─────────┬────┬────────────────┐
│ (index) │ id │      name      │
├─────────┼────┼────────────────┤
│    0    │  1 │ 'Bobby Tables' │
└─────────┴────┴────────────────┘
```

Lastly, if you want the data to be returned as objects, use the `objects` flag:

```json
> tableland read "SELECT * FROM cli_demo_table_80001_1285;" --format objects
{
  meta: { duration: 29.877541542053223 },
  success: true,
  results: [ { id: 1, name: 'Bobby Tables' } ]
}
```

The unwrap flag will return a single row. Make sure to add `limit 1;` to your query to avoid errors.

```bash
tableland read "select * from healthbot_31337_1 limit 1;" --unwrap --chain "local-tableland"
// Result: {"counter":1}
```

The extract command will give you the results of a single column. Make sure your query is only generating a single column in it's response.

```bash
tableland read "select counter from healthbot 31337_1;" --extract --chain "local-tableland"
// Result: [1]
```

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

## schema

`tableland schema <name>` _(string)_
Get info about a given table schema.

```bash
Positionals:
  schema  SQL table schema                                   [string] [required]

Options:
      --help        Show help                                          [boolean]
```

### Example

```bash
tableland schema cli_demo_table_31337_2
```

```json
{
  "columns": [
    { "name": "id", "type": "int", "constraints": ["primary key"] },
    { "name": "name", "type": "text" }
  ]
}
```

## write

`tableland write <statement>` _(string)_
Run a mutating SQL statement against a remote table.

```bash
tableland write <statement>

Positionals:
  statement  SQL write statement                             [string] [required]

Options:
      --help        Show help                                          [boolean]
  -k, --privateKey  Private key string                                  [string]
      --chain       The EVM compatible chain to target
                                           [string] [default: "maticmum"]
```

The `write` command allows for vanilla SQL `INSERT`, `UPDATE`, and `DELETE` statements. One key aspect to keep in mind when working with tables is that you must specify the table `name` that you get back from the `create` command.

### Example

Using the `write` command will return a value of the blockchain’s _transaction hash:_

```bash
tableland write "INSERT INTO cli_demo_table_31337_2 VALUES (1, 'Bobby Tables');"
```

```json
{
  meta: {
    duration: 118.1787919998169,
    txn: {
      tableId: '2',
      transactionHash: '0x2406508ff28f673e9a080b6295af4cfd0de75a199f2a9044a1cad580cd0aae0a',
      blockNumber: 135,
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

## shell

Interact with tableland via an interactive shell environment.

```bash
tableland shell
```

This will open up a shell environment to make it easier to interact with the network:

```bash
tableland>
```

### Example

Once in the shell, you can create tables and make queries, such as a read statement:

```bash
tableland shell
tableland>select * from cli_demo_table_31337_2;
```

Which will print:

```json
{
  meta: { duration: 18.574082374572754 },
  success: true,
  results: [ { id: 1, name: 'Bobby Tables' } ]
}
{
  response: {
    meta: { duration: 18.574082374572754 },
    success: true,
    results: [ { id: 1, name: 'Bobby Tables' } ]
  }
}
```
