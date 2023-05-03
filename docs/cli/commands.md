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

`tableland chains`: List information about supported chains.

---

`tableland controller <subcommand>`: Get, set, and lock the controller contract for a given table.

- `get <name>` : Get the current controller address for a table.
- `set <controller> <name>`: Set the controller address for a table.
- `lock <name>`: Lock the controller address for a table.

---

`tableland create <schema> [prefix]`: Create a new table (prefix is optional).

---

`tableland info <name>`: Get info about a given table by name.

---

`tableland init`: Create a config file.

---

`tableland list <address>`: List tables owned by an address.

---

`tableland namespace <subdomain> <name>`: Use ENS to namespace tables.

- `set <subdomain> <name>`: Set the namespace with a subdomain mapped to a table.
- `get <namespace>` : Get the table mapped to a namespace.

---

`tableland read <statement>`: Run a read-only query against a remote table.

---

`tableland receipt <hash>`: Get the receipt of a chain transaction to know if it was executed, and the execution details.

---

`tableland schema <name>`: Get info about a given table schema.

---

`tableland shell [statement]`: Interact with tableland via an interactive shell environment.

---

`tableland transfer <name> <receiver>`: Transfer a table to another address.

---

`tableland write <statement>`: Run a mutating SQL statement against a remote table.

## Global flags

The Tableland CLI includes a number of global flags.

---

`--help`
Show help.

---

`--version`
Show version number.

---

`-k, --privateKey <private_key>`
Private key string.
_Note: most commands, aside from read queries, will need to flag a `--privateKey` (or set the configuration variables with the `init` command)._

---

`-c, --chain <chain_name>`
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

`--baseUrl <url>`: The URL of a Tableland validator.

---

`--providerUrl <url>`: JSON RPC API provider URL (e.g., `https://eth-mainnet.alchemyapi.io/v2/123abc123a...`).

---

### Defaults

The following are the default options:

- `--chain` ⇒ `maticmum`
  Polygon Mumbai has been set as the default chain; any other chain names from the `tableland chains` command can be used.
