---
title: Quick start
description: Experiment with creating, editing, and querying tables from the comfort of the command line.
synopsis: The JavaScript / TypeScript SDK allows developers to create tables on their chain of choice. Connect, create, and then interact with your tables thereafter with table writes and reads.
keywords:
  - CLI
  - command line
---

import {Address} from '@site/src/components/Wallet'

export const address = <Address/>

<code>
const t = "{address}";
</code>

The `@tableland/cli` is a developer tool to help you connect, create, write, and read from The comfort of your command line. It’s simple, easy to use, and integrates nicely with tools like [jq](https://stedolan.github.io/jq/). When interacting with the Tableland CLI, you can also specify your own [provider endpoints](https://www.alchemy.com/blog/what-is-a-node-provider) for added control. Using the CLI, you can:

- Connect to [any of the chains](Deployed%20Contracts%2020ca28a952684cdab428981aed061dc5.md) that Tableland supports
- Create, write to, and read from tables
- Retrieve and set table controllers
- Leverage utility commands for retrieving other table related information

## Setup

### Install

You can install the CLI tool via `npm`:

```bash
npm install -g @tableland/cli
```

Or `yarn`:

```bash
yarn global add @tableland/cli
```

### Environment variables

Tableland reads the following environment variables automatically instead of needing to specify the corresponding flag (i.e., `TBL_` prepended to an all caps snake case of the CLI flag described in **Usage** below):

```bash
TBL_PRIVATE_KEY=<your_wallet_private_key>
TBL_CHAIN=<chain_name> # See the chains by using `tableland chains`
## Optional provider(s) -- *only* use one provider env var at a time
TBL_ALCHEMY=<your_alchemy_api_key>
TBL_INFURA=<your_infura_api_key>
TBL_ETHERSCAN=<your_etherscan_api_key>
```

Some of the mutating commands will need a private key string (`--privateKey`) for EVM account access while interacting with Tableland (e.g., signing on-chain transactions). Optionally, a custom _provider_ can be set for connecting to the chain itself; only [Alchemy](https://docs.alchemy.com/alchemy/introduction/getting-started), [Infura](https://docs.infura.io/infura/getting-started), and [Etherscan](https://docs.etherscan.io/getting-started/viewing-api-usage-statistics) are currently supported (as optional flags).

:::tip
Tableland is still in open beta and will be launching the production network in 2023. But, smart contracts and apps deployed on testnet and mainnet chains can and should use the Tableland during the open beta period.

Developers should still proceed with caution due to the nature of open beta changes and ensure contracts that use Tableland are future-proof.

:::

### Fees

While using the Tableland testnet, developers can leverage the `--rpcRelay` flag, which defaults to `true` in testnet environments. This means that on-chain transactions like table writes are covered for, such that developers do not need to pay for transaction fees. Mainnet transactions _are not relayed_, so developers _will_ have to pay for transactions.

Regardless, it’s a good idea to be sure to have enough currency in your wallet before using Tableland!

### Usage Patterns

Most of the common Tableland usage patterns are possible via the command line. In general, you'll need to connect (to a host/provider), create a table (with a schema, using `create`), insert/mutate values (`write`), and query (`read`) a table. Developers can even retrieve all tables owned by a specific EVM address (using `list`). And for a full list of valid SQL statements used throughout these different commands, check out the [SQL Specification’s statement types](SQL%20Specification%20b8aaa9bfbb7c42938197737850b26d56.md).

There also exists some useful commands for on-chain information. View Tableland’s live chain deployments & smart contract addresses (`chains`) or retrieve on-chain data from a `create` or `write` query (passing the transaction hash to `receipt`). Lastly, the corresponding token metadata about a table can also be requested (i.e., tables are on-chain as ERC721s — the minted table’s name can be passed to `info`).

### Examples Format

For many of the examples, the format `<some_text_here>` will be used to denote a value passed the developer. For example, in `--private-key <private_key>`, some private key `abc123` would then be used as `--private-key abc123`.

Additionally, a table created with the prefix `cli_demo_table` should resemble something like `cli_demo_table_80001_1285`, where `80001` is the specific chain and `1285` is unique to the chain / table owner. This is the standard `{prefix}_{chainId}_{tableId}` format. Be sure to replace `prefix`, `chainId`, & `tableId` with your unique values.

## Commands

There are a number of commands available for interacting with Tableland. Each one has a specific set of required and optional arguments, plus various flags.

```bash
tableland {command} <arguments> [flags]
```

### Synopsis

`tableland chains`
List information about supported chains.

---

`tableland controller <subcommand>` (string)
Get, set, and lock the controller contract for a given table.

- Show all controller `subcommand` values
  `get <table_name>` _(string)_
  Get the current controller address for a table.
  ***
  `set <controller> <table_name>` _(string; string)_
  Set the controller address for a table.
  ***
  `lock <table_name>` _(string)_
  Lock the controller address for a table.

---

`tableland create <schema> [prefix]` _(string [string])_
Create a new table.

---

`tableland hash <schema> [prefix]` _(string [string])_
Validate a table schema and get the structure hash.

---

`tableland info <name>` _(string)_
Get info about a given table by name.

---

`tableland list [address]` _(string)_
List tables by address.

---

`tableland read <query>` _(string)_
Run a read-only query against a remote table.

---

`tableland receipt <txn_hash>` _(string)_
Get the receipt of a chain transaction to know if it was executed, and the execution details.

---

`tableland schema <name>` _(string)_
Get info about a given table schema.

---

`tableland structure <structure_hash>` _(string)_
Get table name(s) by schema structure hash.

---

`tableland token`
Create a SIWE token.

---

`tableland write <statement>` _(string)_
Run a mutating SQL statement against a remote table.

### Global Flags

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
_Note: most commands, aside from read queries, will need to flag a `--privateKey` (or set the `TBL_PRIVATE_KEY` environment variable)._

---

`-c, --chain <chain_name>` _(string)_
The EVM chain to target (default: `polygon-mumbai`).

- Show all `chain_name` values
  Testnets
  - `ethereum-goerli`
  - `polygon-mumbai`
  - `optimism-goerli`
  - `arbitrum-goerli`
    Mainnets
  - `ethereum`
  - `polygon`
  - `optimism`

---

`-r, --rpcRelay <value>` _(boolean)_
Whether testnet writes should be relayed via a validator (default: `true` for testnets, `false` for mainnets).

---

`--alchemy <alchemy_api_key>` _(string)_
Alchemy provider API key.

---

`--infura <infura_api_key>` _(string)_
Infura provider API key.

---

`--etherscan <etherscan_api_key>` _(string)_
Etherscan provider API key.

---

#### Defaults

The following are the default options:

- `--chain` ⇒ `polygon-mumbai`
  Polygon Mumbai has been set as the default chain; any other chain names from the `tableland chains` command can be used.
- `--rpcRelay` ⇒ `true`
  If using the default or any testnet option, that means the `rpcRelay` will be `true`; the only time it defaults to `false` is for mainnets.

### chains

`tableland chains`

List information about supported chains.

In particular, use the `chains` command to retrieve which chains Tableland is deployed on, which returns information about the deployment itself, including the chain name, id, and contract address:

#### Example

```bash
tableland chains
```

```json
{
  "polygon-mumbai": {
    "name": "maticmum",
    "phrase": "Polygon Mumbai",
    "chainId": 80001,
    "contract": "0x4b48841d4b32C4650E4ABc117A03FE8B51f38F68",
    "host": "https://testnets.tableland.network",
    "rpcRelay": true
  },
	...
}
```

### controller

`tableland controller <subcommand>`
Get, set, and lock the controller contract for a given table.

Use these commands as a helper to retrieve the controller of a table (`get`) or to set _or permanently_ lock the controller of a table (`set` or `lock`). Recall the `name` is in the format `{prefix}_{chainId}_{tableId}`.

#### Subcommands

`get <name>` _(string)_

Get the current controller address for a table.

---

`set <controller> <name>` _(string [string])_
Set the controller address for a table.

---

`lock <name>` _(string)_
Lock the controller address for a table.

#### Example

`get`

```bash
tableland controller get cli_demo_table_80001_1285
```

```json
"0x0000000000000000000000000000000000000000"
```

_Note: this example table originally had its controller set as `0x0`, which is the default value._

`set`

```bash
tableland controller set 0x4D5286d81317E284Cd377cB98b478552Bbe641ae cli_demo_table_80001_1285
```

```json
{
  "hash": "0x39b4dba8e209ddeb2e1f16998965e352917cd629fcd4a9f89226a5cae3510a48",
  "link": "https://mumbai.polygonscan.com/tx/0x39b4dba8e209ddeb2e1f16998965e352917cd629fcd4a9f89226a5cae3510a48"
}
```

`lock`

```bash
tableland controller lock cli_demo_table_80001_1285
```

```json
{
  "hash": "0x9b3979e9355a5ae32a2d34cae295e186a1aa60ae9522c3b0c9f1a5bbae8653e4"
}
```

### create

`tableland create <schema> [prefix]` _(string [string])_
Create a new table.

```bash
Positionals:
  schema      SQL table schema                                [string] [required]
  prefix      The table prefix                                [string] [optional]

Options:
      --help        Show help                                          [boolean]
      --schema      SQL table schema.                                   [string]
      --prefix      Table name prefix.                                  [string]
  -k, --privateKey  Private key string                                  [string]
      --chain       The EVM compatible chain to target
                                           [string] [default: "polygon-mumbai"]
      --alchemy     Alchemy provider API key                            [string]
      --infura      Infura provider API key                             [string]
      --etherscan   Etherscan provider API key                          [string]
```

Like most relational database systems, Tableland requires the user to create tables for storing, querying, and relating data. See the [JavaScript SDK](<JavaScript%20SDK%20(Legacy)%209acf7b81bec5444aa4f9230445972658.md>) docs for details on `create` requirements.

#### Example

The response from a `create` statement includes the created table `name`, which the caller can use to make subsequent queries and updates:

```bash
tableland create "id int primary key, name text" "cli_demo_table"
```

```json
{
  "tableId": "1285",
  "prefix": "cli_demo_table",
  "chainId": 80001,
  "txnHash": "0xe2aedd993f1697ddf678c6e3d0f2802f754524fc67816f8c5fc7087e7c6e6639",
  "blockNumber": 27822304,
  "name": "cli_demo_table_80001_1285",
  "link": "https://mumbai.polygonscan.com/tx/0xe2aedd993f1697ddf678c6e3d0f2802f754524fc67816f8c5fc7087e7c6e6639"
}
```

Since creating a table on requires a smart contract interactions, it is recommended to provide an API key to a remote EVM _provider_ API when using the `create` command. This avoids [rate limiting by `ethers`](https://docs.ethers.io/api-keys/). For context, Tableland mints a `TABLE` (ERC721) token using the [Tableland smart contract](https://github.com/tablelandnetwork/evm-tableland/blob/main/contracts/TablelandTables.sol), which is the on-chain representation of every table then created in Tableland. As noted, we currently support [Alchemy](https://alchemyapi.io/), [Infura](https://infura.io/), and [Etherscan](https://etherscan.io/). Simply specify your desired API provider key (or provide all three), and create a table.

### hash

`tableland hash <schema> [prefix]` _(string [string])_
Validate a table schema and get the structure hash.

```bash
Positionals:
  schema      SQL table schema                               [string] [required]
  prefix      The table prefix                               [string] [optional]

Options:
      --help        Show help                                          [boolean]
  -k, --privateKey  Private key string                                  [string]
      --prefix      Table name prefix.                                  [string]
      --chain       The EVM compatible chain to target
                                           [string] [default: "polygon-mumbai"]
```

#### Example

```bash
tableland hash "id int primary key, name text" "cli_demo_table"
```

```bash
{
  "structureHash": "466dc130f3b02cf995fb66f6a0bdbadc49d2a527c26ac328daddc3f7b8ef779c"
}
```

### info

`tableland info <name>` _(string)_
Get info about a given table by name.

```bash
Positionals:
  name  The target table name                                 [string] [required]

Options:
      --help        Show help                                          [boolean]
      --chain       The EVM compatible chain to target
                                           [string] [default: "polygon-mumbai"]
```

#### Example

The response includes table information in a standard [ERC721 metadata](https://eips.ethereum.org/EIPS/eip-721) format, including the table’s name, creation data, external URL (which points to the Tableland gateway), and attributes:

```bash
## Be sure to replace `<chainId>` & `<tableid>` with your unique values, e.g., `cli_demo_table_80001_1285`
tableland info cli_demo_table_<chainId>_<tableId> --chain <chainName>
```

```json
{
  "name": "cli_demo_table_80001_1285",
  "external_url": "https://testnets.tableland.network/chain/80001/tables/1285",
  "image": "https://render.tableland.xyz/80001/1285",
  "attributes": [
    {
      "display_type": "date",
      "trait_type": "created",
      "value": 1661740055
    }
  ]
}
```

### list

`tableland list [address]` _(string)_
List tables by address.

```markdown
Positionals:
address The target address [string]

Options:
--help Show help [boolean]
-k, --privateKey Private key string [string] [required]
--chain The EVM compatible chain to target
[string] [default: "polygon-mumbai"]
```

Using `list` command provides and easy way to understand which tables are owned by a certain address.

#### Example

The retrieved information about those tables includes the table’s name, structure (describing the schema), and created time:

```bash
## Be sure to either use the default `polygon-mumabi` or set the `--chain`
tableland list
```

```json
[
  {
    "controller": "0x4D5286d81317E284Cd377cB98b478552Bbe641ae",
    "name": "cli_demo_table_80001_1285",
    "structure": "466dc130f3b02cf995fb66f6a0bdbadc49d2a527c26ac328daddc3f7b8ef779c"
  }
]
```

### read

`tableland read <query>` _(string)_
Run a read-only query against a remote table.

```bash
Positionals:
  query  SQL query statement                                 [string] [required]

Options:
      --help        Show help                                          [boolean]
  -c, --chain       The EVM chain to target [string] [default: "polygon-mumbai"]
      --format      Output format. One of 'pretty', 'table', or 'objects'.
                                                     [string] [default: "table"]
```

It is also easy to use vanilla SQL `SELECT` statements to query the whole table! See the [JavaScript SDK](<JavaScript%20SDK%20(Legacy)%209acf7b81bec5444aa4f9230445972658.md>) docs for further details. As with the `write` command, you must specify the table name returned from the `create` command.

#### Examples for Formatting Outputs

There are three possible `--format` options:

- `table` (default) ⇒ Data returned as an object that represents a table, with two keys called _columns_ and _rows_; each has column (array of objects) and row (array of arrays) information.
- `pretty` ⇒ A tabular view of the data, in a "pretty" table-like view.
- `objects` ⇒ The data is returned as an array of objects, where the _columns_ _and row data_ are included in each object; an object represents a row.

```bash
tableland read "SELECT * FROM cli_demo_table_80001_1285;" --format <table_objects_or_pretty>
```

If `table` (or no option) is specified, this results in a response in the following format, with `columns` & `rows` and their specified values:

```json
> tableland read "SELECT * FROM cli_demo_table_80001_1285;" --format table
{
  "columns": [
    {
      "name": "id"
    },
    {
      "name": "name"
    }
  ],
  "rows": [
    [
      0,
      "Bobby Tables"
    ]
  ]
}
```

If `pretty` is flagged, then the output is a "pretty" tabular view for a nice human-readable format:

```json
> tableland read "SELECT * FROM cli_demo_table_80001_1285;" --format pretty
┌─────────┬────┬────────────────┐
│ (index) │ id │      name      │
├─────────┼────┼────────────────┤
│    0    │ 0  │ 'Bobby Tables' │
└─────────┴────┴────────────────┘
```

Lastly, if you want the data to be returned as objects, use the `objects` flag:

```json
> tableland read "SELECT * FROM cli_demo_table_80001_1285;" --format objects
[
  {
    "id": 0,
    "name": "Bobby Tables"
  }
]
```

### receipt

`tableland receipt <txn_hash>` _(string)_
Get the receipt of a chain transaction to know if it was executed, and the execution details.

```bash
tableland receipt <hash>

Positionals:
  hash  Transaction hash                                     [string] [required]

Options:
      --help        Show help                                          [boolean]
  -k, --privateKey  Private key string                       [string] [required]
      --chain       The EVM compatible chain to target
                                           [string] [default: "polygon-mumbai"]
```

#### Example

This allows you to retrieve data like the chain id, block number, and table Id — and note that the transaction hash itself is returned when running the `create` and `write` commands:

```bash
tableland receipt 0xe2aedd993f1697ddf678c6e3d0f2802f754524fc67816f8c5fc7087e7c6e6639 --chain <chanName> --private-key <privateKey>
```

```json
{
  "chainId": 80001,
  "txnHash": "0xe2aedd993f1697ddf678c6e3d0f2802f754524fc67816f8c5fc7087e7c6e6639",
  "blockNumber": 27822304,
  "tableId": "1285",
  "error": "",
  "errorEventIdx": -1,
  "link": "https://mumbai.polygonscan.com/tx/0xe2aedd993f1697ddf678c6e3d0f2802f754524fc67816f8c5fc7087e7c6e6639"
}
```

### schema

`tableland schema <name>` _(string)_
Get info about a given table schema.

```bash
Positionals:
  schema  SQL table schema                                   [string] [required]

Options:
      --help        Show help                                          [boolean]
```

#### Example

```bash
tableland schema cli_demo_table_80001_1285
```

```json
{
  "columns": [
    {
      "name": "id",
      "type": "int",
      "constraints": ["PRIMARY KEY"]
    },
    {
      "name": "name",
      "type": "text",
      "constraints": []
    }
  ],
  "table_constraints": []
}
```

### structure

`tableland structure <structure_hash>` _(string)_
Get table name(s) by schema structure hash.

```bash
Positionals:
  hash  The schema structure hash                            [string] [required]

Options:
      --help        Show help                                          [boolean]
      --chain       The EVM compatible chain to target
                                           [string] [default: "polygon-mumbai"]
```

#### Example

```bash
tableland structure 466dc130f3b02cf995fb66f6a0bdbadc49d2a527c26ac328daddc3f7b8ef779c
```

```bash
[
  {
    "controller": "0x4D5286d81317E284Cd377cB98b478552Bbe641ae",
    "name": "cli_demo_table_80001_1285",
    "structure": "466dc130f3b02cf995fb66f6a0bdbadc49d2a527c26ac328daddc3f7b8ef779c"
  },
	{
    "controller": "0xd2D77E5E3BCB0080913f68640CD6a576E7698710",
    "name": "cli_demo_table_80001_566",
    "structure": "466dc130f3b02cf995fb66f6a0bdbadc49d2a527c26ac328daddc3f7b8ef779c"
  },
	...
]
```

### token

`tableland token`
Create a SIWE token.

```bash
tableland token

Options:
      --help        Show help                                          [boolean]
  -k, --privateKey  Private key string                       [string] [required]
      --chain       The EVM compatible chain to target
                                           [string] [default: "polygon-mumbai"]
```

Use the CLI to generate a self-signed [SIWE Token](https://github.com/spruceid/siwe). This is done automatically when using the [JavaScript SDK](<JavaScript%20SDK%20(Legacy)%209acf7b81bec5444aa4f9230445972658.md>) via a browser app (thanks to [MetaMask](https://metamask.io/)). For creating one via the command line, use this command.

#### Example

```bash
tableland token
## returns a long string
## "eyJtZXNz..."
## Optionally, save this value as an env var named `SIWE_TOKEN`
```

Namely, with the `token` command, the response will simply be a long string: the SIWE token.

:::tip
It may be useful to create a local environment variable to avoid pasting the private key string (and SIWE token) in all CLI commands. Be sure to **_not prefix_** this with `TBL_` as this may cause unwanted errors with the CLI. Using the `TBL_` prefix for an environment variable causes the CLI to look for & apply the variable to the command. So, for any commands that _do not_ take a `--token` flag, using something like `TBL_TOKEN` would cause the command to apply the flag, leading to an error.

:::

### write

`tableland write <statement>` _(string)_
Run a mutating SQL statement against a remote table.

```bash
tableland write <statement>

Positionals:
  statement  SQL write statement                             [string] [required]

Options:
      --help        Show help                                          [boolean]
  -k, --privateKey  Private key string                                  [string]
  -r, --rpcRelay    Whether writes should be relayed via a validator   [boolean]
      --chain       The EVM compatible chain to target
                                           [string] [default: "polygon-mumbai"]
```

The `write` command allows for vanilla SQL `INSERT`, `UPDATE`, and `DELETE` statements. One key aspect to keep in mind when working with tables is that you must specify the table `name` that you get back from the `create` command.

#### Example

Using the `write` command will return a value of the blockchain’s _transaction hash:_

```bash
## Be sure to replace `<chainId>` & `<tableid>` with your unique values, e.g., `cli_demo_table_80001_1285`
tableland write "INSERT INTO cli_demo_table_80001_1285 VALUES (0, 'Bobby Tables');"
```

```json
{
  "hash": "0xb179f6730cdd99a059696c57cdbab03b44f244dd64d1f2ca42e64481bb8df1f0",
  "link": "https://mumbai.polygonscan.com/tx/0xb179f6730cdd99a059696c57cdbab03b44f244dd64d1f2ca42e64481bb8df1f0"
}
```

## End-to-End Example

The following is a simple **connect**, **create**, **mutate**, and **query** workflow to demonstrate interacting with Tableland from the command line.

Start with the install:

```bash
npm i -g @tableland/cli
```

Next, we'll create some env vars to use when interacting with the CLI:

```bash
export TBL_ALCHEMY=fblahblah-Osomethingd0MeXJ
export TBL_PRIVATE_KEY=myhexstringprivatekeystringthatissecret
export TBL_CHAIN=polygon-mumbai
```

Creating a table is generally the first thing we'll do, so let's start with something simple (note that this is an on-chain event, and so it can take a while to complete):

```bash
tableland create "id int primary key, name text" "cli_demo_table"
```

```json
{
  "tableId": "1285",
  "prefix": "cli_demo_table",
  "chainId": 80001,
  "txnHash": "0xe2aedd993f1697ddf678c6e3d0f2802f754524fc67816f8c5fc7087e7c6e6639",
  "blockNumber": 27822304,
  "name": "cli_demo_table_80001_1285",
  "link": "https://mumbai.polygonscan.com/tx/0xe2aedd993f1697ddf678c6e3d0f2802f754524fc67816f8c5fc7087e7c6e6639"
}
```

Optionally, you could then check the table creation details using the `receipt` command — use the `txnHash` returned from your own `create` response (or, you can use the example below):

```bash
tableland receipt 0xe2aedd993f1697ddf678c6e3d0f2802f754524fc67816f8c5fc7087e7c6e6639
```

```json
{
  "chainId": 80001,
  "txnHash": "0xe2aedd993f1697ddf678c6e3d0f2802f754524fc67816f8c5fc7087e7c6e6639",
  "blockNumber": 27822304,
  "tableId": "1285",
  "error": "",
  "errorEventIdx": -1,
  "link": "https://mumbai.polygonscan.com/tx/0xe2aedd993f1697ddf678c6e3d0f2802f754524fc67816f8c5fc7087e7c6e6639"
}
```

In case we forgot to note the table’s `name`, we can `list` our owned tables and retrieve it.

```bash
tableland list
```

```json
[
  {
    "controller": "0x4D5286d81317E284Cd377cB98b478552Bbe641ae",
    "name": "cli_demo_table_80001_1285",
    "structure": "466dc130f3b02cf995fb66f6a0bdbadc49d2a527c26ac328daddc3f7b8ef779c"
  }
]
```

:::tip
Note: if you run into any issues, you might need to `unset` your previous `TBL_` prefixed environment variable.

:::

Make note of the `tableId` of the previously created table from the `create`, `receipt`, or `list` statements — here, we had `1285`, but it’s unique to every created table. We'll use that id in the next command to retrieve metadata about the table:

```bash
tableland info cli_demo_table_80001_<your_tableId>
```

```json
{
  "name": "cli_demo_table_80001_1285",
  "external_url": "https://testnets.tableland.network/chain/80001/tables/1285",
  "image": "https://render.tableland.xyz/80001/1285",
  "attributes": [
    {
      "display_type": "date",
      "trait_type": "created",
      "value": 1661740055
    }
  ]
}
```

Ok, now we're going to create a SIWE token. Recall that we specified our `privateKey` argument previously (as `TBL_PRIVATE_KEY`), which is what will be used to sign the SIWE token:

```bash
tableland token
## returns a long string
## "eyJtZXNz..."
## Save this value as an env var named `SIWE_TOKEN`
```

If you want to hang on to the `token` value itself from the above command, export it for future ease of use (e.g., in [JSON RPC](JSON%20RPC%20API%208ee27a6c1a6843fa8faea990f81ee11d.md) calls). Recall to **_not prefix_** this with `TBL_` as this may cause unwanted errors while using commands. That is, the command line reads

```bash
export SIWE_TOKEN=$(tableland token | cut -d '"' -f2)
```

Finally, we can start mutating and querying our table using the `write` and `read` commands. We'll start with a basic `INSERT` and then `SELECT` to showcase that it really is working. Note that the if you used the `create` command to generate your own table, the appended `tokenId` will be unique to _your table_ and differ from the value shown below (`1285`):

```bash
## Be sure to replace `<your_tableId>` with, well, your `tableId`
tableland write "INSERT INTO cli_demo_table_80001_<your_tableId> VALUES (0, 'Bobby Tables');"
```

The returned value is the blockchain transaction hash, and optionally, check it out on Polygonscan with the link provided:

```json
{
  "hash": "0xb179f6730cdd99a059696c57cdbab03b44f244dd64d1f2ca42e64481bb8df1f0",
  "link": "https://mumbai.polygonscan.com/tx/0xb179f6730cdd99a059696c57cdbab03b44f244dd64d1f2ca42e64481bb8df1f0"
}
```

Ok, let's see if little Bobby Tables made it into our table on Tableland:

```bash
tableland read "SELECT * FROM cli_demo_table_80001_1285;"
```

Regardless of who _owns_ the table (or has the proper mutating permissions), anyone can actually _read_ from any table. The `read` commands will return something like:

```json
{
  "columns": [
    {
      "name": "id"
    },
    {
      "name": "name"
    }
  ],
  "rows": [[0, "Bobby Tables"]]
}
```

You should now see some a JSON output with `columns` and `rows` data. Using a tool like [jq](https://stedolan.github.io/jq/), you can pipe the JSON response to pull out what is needed:

```bash
tableland read "select * from cli_demo_table_80001_<your_tableId>" | jq '.rows'
```

```json
[[0, "Bobby Tables"]]
```

And that covers the basics of creating a table and mutating/reading from it — lastly, to lock the controller, the following demonstrates that workflow:

```bash
## Be sure to append your `tableId`
> tableland controller get cli_demo_table_80001_<your_tableId>
## "0x0000000000000000000000000000000000000000"

> tableland controller set 0x4D5286d81317E284Cd377cB98b478552Bbe641ae cli_demo_table_80001_<your_tableId>
## {
##   "hash": "0x39b4dba8e209ddeb2e1f16998965e352917cd629fcd4a9f89226a5cae3510a48",
##   "link": "https://mumbai.polygonscan.com/tx/0x39b4dba8e209ddeb2e1f16998965e352917cd629fcd4a9f89226a5cae3510a48"
## }

> tableland controller lock cli_demo_table_80001_<your_tableId>
## {
##  "hash": "0x9b3979e9355a5ae32a2d34cae295e186a1aa60ae9522c3b0c9f1a5bbae8653e4"
## }
```

:::tip
This is the experimental Tableland command line tool built on top of the `@tableland/sdk`. For any bugs or feature requests, please open an issue on GitHub.
[Open an Issue](https://github.com/tablelandnetwork/js-tableland-cli/issues)\*\*\*\*

:::
