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

- `goerli` (Ethereum Goerli)
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






