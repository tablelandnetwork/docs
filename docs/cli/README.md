---
title: Get started
description: Experiment with creating, editing, and querying tables from the comfort of the command line.
keywords:
  - CLI
  - command line
---

The `@tableland/cli` package is a developer tool to help you connect, create, write, and read from The comfort of your command line. It’s simple, easy to use, and integrates nicely with tools like [jq](https://stedolan.github.io/jq/). When interacting with the Tableland CLI, you can also specify your own [provider endpoints](https://www.alchemy.com/blog/what-is-a-node-provider) for added control. Using the CLI, you can:

- Connect to any of the chains that Tableland supports.
- Create, write to, and read from tables.
- Retrieve and set table controllers.
- Leverage utility commands for retrieving other table related information.

:::tip
See the [CLI quickstart page](/quickstarts/cli-quickstart) if you’re looking to get up and running without all of the details.
:::

## Setup

### Install

You can install the CLI tool globally:

```bash npm2yarn
npm install -g @tableland/cli@latest
```

### Configuration

The `init` command sets up a configuration file at `/Users/$USER/.tablelandrc.json` (or wherever you'd like to place it). This makes it easier to use the CLI such that it will look for `privateKey`, `chain`, and `providerUrl` values within this file. Alternatively, you can pass these values as flags (e.g., `--privateKey abc123`) for each command.

Generally, **every command _should_ have these values** specified, except for the `read` command since it directly interacts with a Tableland validator without needing to go through a host chain. If you do not specify a `privateKey` or `providerUrl`, you will run into issues. There _is_ a default value for the `chain` (`maticmum`), so it's fine to use the `chain` default if you are in fact developing on this chain.

## Usage patterns

Most of the common Tableland usage patterns are possible via the command line. In general, you'll need to connect (to a host/provider), create a table (with a schema, using `create`), insert/mutate values (`write`), and query (`read`) a table. Developers can even retrieve all tables owned by a specific EVM address (using `list`). And for a full list of valid SQL statements used throughout these different commands, check out the [SQL Specification’s statement types](/sql/specification#statement-types).

There also exists some useful commands for onchain information. View Tableland’s live chain deployments & smart contract addresses (`chains`) or retrieve onchain data from a `create` or `write` query (passing the transaction hash to `receipt`). Lastly, the corresponding token metadata about a table can also be requested (i.e., tables are onchain as ERC721s — the minted table’s name can be passed to `info`).

## Examples format

For many of the examples, the format `<some_text_here>` will be used to denote a value passed the developer. For example, in `--private-key <private_key>`, some private key `abc123` would then be used as `--private-key abc123`.

Additionally, a table created with the prefix `cli_demo_table` should resemble something like `cli_demo_table_31337_2`, where `31337` is the specific chain and `2` is unique to the chain / table owner. This is the standard `{prefix}_{chainId}_{tableId}` format. Be sure to replace `prefix`, `chainId`, & `tableId` with your unique values.

## Commands

There are a number of commands available for interacting with Tableland. Each one has a specific set of required and optional arguments, plus various flags. Be sure to specify a `providerUrl` and `privateKey` for most commands, along with the desired host `chain`.

The general command format is as follows:

```bash
tableland <command> <arguments> [flags]
```

### Chains

`tableland chains`: List information about supported chains.

### Controller

`tableland controller <subcommand>`: Get, set, and lock the controller contract for a given table.

- `get <name>` : Get the current controller address for a table.
- `set <controller> <name>`: Set the controller address for a table.
- `lock <name>`: Lock the controller address for a table.

### Create

`tableland create <schema> [prefix]`: Create a new table (prefix is optional).

### Info

`tableland info <name>`: Get info about a given table by name.

### Init

`tableland init`: Create a config file—including the chain, provider, private key, and table aliases filepath—which is automatically read when each command is executed (i.e., instead of passing flags each time).

### List

`tableland list <address>`: List tables owned by an address.

### Namespace

`tableland namespace <subdomain> <name>`: Use ENS to namespace tables.

- `set <subdomain> <name>`: Set the namespace with a subdomain mapped to a table.
- `get <namespace>` : Get the table mapped to a namespace.

### Read

`tableland read <statement>`: Run a read-only query against a remote table.

### Receipt

`tableland receipt <hash>`: Get the receipt of a chain transaction to know if it was executed, and the execution details.

### Schema

`tableland schema <name>`: Get info about a given table schema.

### Shell

`tableland shell [statement]`: Interact with tableland via an interactive shell environment.

### Transfer

`tableland transfer <name> <receiver>`: Transfer a table to another address.

### Write

`tableland write <statement>`: Run a mutating SQL statement against a remote table.

## Global flags

The Tableland CLI includes a number of global flags.

### Help

`-h, --help`: Show help.

### Version

`-V, --version`: Show version number.

### Private Key

`-k, --privateKey <private_key>`: Private key string. Note: most commands, aside from read queries, will need to flag a `--privateKey` (or set the configuration variables with the `init` command).

### Chain

`-c, --chain <chain_name>`: The EVM chain to target (default: `maticmum`).

Testnets

- `sepolia` (Ethereum Sepolia)
- `maticmum` (Polygon Mumbai)
- `optimism-goerli` (Optimism Goerli)
- `arbitrum-sepolia` (Arbitrum Sepolia)
- `filecoin-calibration` (Filecoin Calibration)

Mainnets

- `mainnet` (Ethereum)
- `homestead` (Ethereum)
- `matic` (Polygon)
- `optimism` (Optimism)
- `arbitrum` (Arbitrum One)
- `arbitrum-nova` (Arbitrum Nova)
- `filecoin` (Filecoin)

Local

- `localhost`
- `local-tableland` (Local Tableland)

### Base URL

`--baseUrl <url>`: The URL of a Tableland validator.

### Provider URL

`-p, --providerUrl <url>`: JSON RPC API provider URL (e.g., `https://eth-mainnet.alchemyapi.io/v2/123abc123a...`).

### Table aliases

One helpful option to set during the `init` command or passed directly to any command is a JSON file stored table aliases to universally unique table names. All that's needed is a path to a JSON file. Creating a table will write an alias-to-name mapping, and subsequent table queries can make use of the alias instead of the full table name.

`-a, --aliases <filepath>`: Path to table aliases JSON file (e.g., `./tableland.aliases.json`).

### Defaults

The following are the default options:

- `--chain` ⇒ `maticmum`: Polygon Mumbai has been set as the default chain; any other chain names from the `tableland chains` command can be used.
- `--baseUrl` ⇒ `http://localhost:8080`: The default Tableland validator URL is on port `8080`; a custom port can be set in a validator's configuration file, such as with [Local Tableland](/local-tableland) or a full [validator node](/validator).
