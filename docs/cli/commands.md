---
title: CLI commands
sidebar_label: Commands
description: The Tableland CLI comes with purpose built commands, which slightly differs from the convention in other clients.
keywords:
  - cli
  - command line
---

There are a number of commands available for interacting with Tableland. Each one has a specific set of required and optional arguments, plus various flags. Be sure to specify a `providerUrl` and `privateKey` for most commands, along with the desired host `chain`.

The general command format is as follows:

```bash
tableland <command> <arguments> [flags]
```

## Synopsis

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
- `arbitrum-goerli` (Arbitrum Goerli)
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
