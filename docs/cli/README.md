---
title: Installation
description: Experiment with creating, editing, and querying tables from the comfort of the command line.
keywords:
  - CLI
  - command line
---

The `@tableland/cli` is a developer tool to help you connect, create, write, and read from The comfort of your command line. It’s simple, easy to use, and integrates nicely with tools like [jq](https://stedolan.github.io/jq/). When interacting with the Tableland CLI, you can also specify your own [provider endpoints](https://www.alchemy.com/blog/what-is-a-node-provider) for added control. Using the CLI, you can:

- Connect to any of the chains that Tableland supports.
- Create, write to, and read from tables.
- Retrieve and set table controllers.
- Leverage utility commands for retrieving other table related information.

:::tip
See the [CLI quickstart page](/get-started/quickstarts/cli-quickstart) if you’re looking to get up and running without all of the details.
:::

## Setup

### Install

You can install the CLI tool globally via `npm` or `yarn`.

```bash npm2yarn
npm install -g @tableland/cli@latest
```

### Configuration

The `init` command sets up a configuration file at `/Users/$USER/.tablelandrc.json` (or wherever you'd like to place it). This makes it easier to use the CLI such that it will look for `privateKey`, `chain`, and `providerUrl` values within this file. Alternatively, you can pass these values as flags (e.g., `--privateKey abc123`) for each command.

Generally, **every command _should_ have these values** specified, except for the `read` command since it directly interacts with a Tableland validator without needing to go through a host chain. If you do not specify a `privateKey` or `providerUrl`, you will run into issues. There _is_ a default value for the `chain` (`maticmum`), so it's fine to use the `chain` default if you are in fact developing on this chain.

## Usage patterns

Most of the common Tableland usage patterns are possible via the command line. In general, you'll need to connect (to a host/provider), create a table (with a schema, using `create`), insert/mutate values (`write`), and query (`read`) a table. Developers can even retrieve all tables owned by a specific EVM address (using `list`). And for a full list of valid SQL statements used throughout these different commands, check out the [SQL Specification’s statement types](/reference/sql-specification#statement-types).

There also exists some useful commands for on-chain information. View Tableland’s live chain deployments & smart contract addresses (`chains`) or retrieve on-chain data from a `create` or `write` query (passing the transaction hash to `receipt`). Lastly, the corresponding token metadata about a table can also be requested (i.e., tables are on-chain as ERC721s — the minted table’s name can be passed to `info`).

## Examples format

For many of the examples, the format `<some_text_here>` will be used to denote a value passed the developer. For example, in `--private-key <private_key>`, some private key `abc123` would then be used as `--private-key abc123`.

Additionally, a table created with the prefix `cli_demo_table` should resemble something like `cli_demo_table_31337_2`, where `31337` is the specific chain and `2` is unique to the chain / table owner. This is the standard `{prefix}_{chainId}_{tableId}` format. Be sure to replace `prefix`, `chainId`, & `tableId` with your unique values.
