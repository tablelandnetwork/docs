---
title: Get started
description: Use the Studio from the command line to interact with team, projects, and tables.
keywords:
  - CLI
  - command line
  - studio
---

The `@tableland/studio-cli` package is a developer tool to help you interact with projects created in the [Studio web app](/studio/web/getting-started). You can:

- Login with the account you signed up for in the Studio.
- List team and project information, and create new projects.
- List project deployment information, and deploy table blueprints you've staged.
- Create new teams, add members, and create new projects.
- Import existing tables into projects.
- Import data (CSV files) from your machine and write the data to project tables.
- Set up contexts to make it easier to execute Studio CLI commands.

## Setup

### Install

You can install the CLI tool globally:

```bash npm2yarn
npm install -g @tableland/studio-cli
```

### Configuration

You will need a `privateKey`, `chain`, and `providerUrl` when you first use the Studio CLI, which starts with the `login` command. From there, these values will be used thereafter and no longer needed on a per-command basis. The `privateKey` should be for the same account you used in the Studio web app, and the other values correspond to the chain you plan on deploying your project to.

Many of the commands make use of CLI-specific data that is not shown in the UI, such as team and project IDs. Thus, there are helpful commands to list (`ls`) details that log these IDs for use in subsequent commands.

## Examples format

For many of the examples, the format `<some_text_here>` will be used to denote a value passed the developer. For example, in `--private-key <private_key>`, some private key `abc123` would then be used as `--private-key abc123`. All of the commands start with the login command. We’ll also show examples using tables created on a local network with `@tableland/local` running in the background (with chain ID `31337`), but in reality, the Studio is available for use on testnet and mainnet chains.

## Commands

The Studio CLI includes a number of commands that let you interact with your projects. The general command format is as follows:

```bash
studio <command> <arguments> [flags]
```

You can see all of these commands available by either running the `help` command or passing the help flag `-h, --help`.

### Deployment

`studio deployment <subcommand>`: View your project deployments and deploy blueprints you've staged.

- `ls [project_id]`: List the deployments for the given project ID, or if no id is given, use the default context.
- `create <name> `: Create a new table deployment with the given name, description, chain, and provider URL, also requiring the `--projectId` flag is passed. Note: the `--chain`, `--providerUrl`, and `--privateKey` should be included since you are writing data to the chain.

### Import data

`studio import-data <table> <file>`: Import data from a CSV file into a table in a project. Note the `name` is the name of the table in the Studio, and `--chain`, `--providerUrl`, and `--privateKey` should also be included.

### Import table

`studio import-table <table> <project> <description> [name]`: Import an existing Tableland table into a project with description and (optionally) with a new name/alias, defined only in the Studio.

### Login

`studio login`: Login to the Studio with your account, which creates a login session via a private key. Note: this will create a session file (`.studioclisession.json`) in your directory that will store session information.

### Logout

`studio logout`: Logout of the Studio, which logs out of the current session.

### Team

`studio team <subcommand>`: Manage your studio teams.

- `ls [identifier]`: Get a list of your teams, or get the teams for a default team ID.

### Project

`studio project <subcommand>`: Manage your studio projects.

- `ls [team_id]`: List the projects for the given ID, or if no id is given, use the default context.
- `create <name> <description>`: Creates a new project with the given name and description.

### Use

`studio use [context] [id]`: Use the given context ID for all ensuing commands, where a context is one of: `team`, `project`, or `api`.

### Unuse

`studio unuse [context]`: Remove a context set with `use`, where a context is one of: `team`, `project`, or `api`.

## Global flags

The Tableland CLI includes a number of global flags.

### Help

`-h, --help`: Show help.

### Version

`-V, --version`: Show version number.

### Private Key

`-k, --privateKey <private_key>`: Private key string, defaults to an empty string. Note: you'll need this when using the `login` command, but once the session is set up, it should be good to go.

### Provider URL

`-p, --providerUrl <url>`: JSON RPC API provider URL (e.g., `https://eth-mainnet.alchemyapi.io/v2/123abc123a...`). Defaults to an empty string

### Chain

`-c, --chain <chain_name>`: The EVM chain to target. Defaults to an empty string.

Testnets

- `sepolia` (Ethereum Sepolia)
- `polygon-amoy` (Polygon Amoy)
- `optimism-sepolia` (Optimism Sepolia)
- `arbitrum-sepolia` (Arbitrum Sepolia)
- `filecoin-calibration` (Filecoin Calibration)

Mainnets

- `mainnet` (Ethereum)
- `homestead` (Ethereum)
- `polygon` (Polygon)
- `optimism` (Optimism)
- `arbitrum` (Arbitrum One)
- `arbitrum-nova` (Arbitrum Nova)
- `filecoin` (Filecoin)

Local (for development mode only)

- `localhost`
- `local-tableland` (Local Tableland)

### Project ID

`--pid, --projectId <project_id>`: Project ID the command is scoped to. Defaults to an empty string.

### API URL

`--apiUrl <url>`: The URL of a Studio application API, which defaults to `https://studio.tableland.xyz` (only varies during local development, e.g., with a localhost endpoint). Defaults to an empty string.

### Base URL

`--baseUrl <url>`: The URL of a Tableland validator. Defaults to an empty string.

### Store

`--store <path>`: Path to file store to use for login session. Defaults to `.studioclisession.json`, which gets created when you first use the `login` command.

### Config

`--config`: Path to JSON config file created by the "standard" [Tableland CLI's `init`](/cli/init) command to create `.tablelandrc.json` file. Defaults to an empty string.
