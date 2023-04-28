---
title: CLI quickstart
sidebar_label: CLI
description: Learn how to create a table, add some sample data, and query the data using the CLI.
---

Using the Tableland CLI, developers can interact with their tables from the command line. There are some optional setup steps, including a config file and ensuring you have the proper testnet currency to execute table creates and writes.

## 1. Installation

Open your terminal and globally install the Tableland CLI.

```bash npm2yarn
npm install -g @tableland/cli
```

## 2. Create a configuration file

Specify your development environment's `privateKey`, `chain`, and `providerUrl` (e.g., Alchemy, Infura, Etherscan, etc.). This creates a configuration file at `/Users/$USER/.tablelandrc.json` that is automatically read by the `tableland` commands`.

```bash
tableland init
```

## 3. Create a table

Choose to define an optional prefix, such as `quickstart`. If you didn’t run the `init` command, you can also specify the required parameters as command options (prefix, chain, and private key).

```bash
# Create a table & save its returned `name` locally
tableland create "id int primary key, val text" --prefix "quickstart" --chain "80001" --privateKey "your_private_key"
```

## 4. Write and read data

Insert (`write`) a value, and `read` from the newly updated table.

```bash
# Write to the table by INSERTing a value
# Note: every table is unique, so replace this with your table and correct `--chain`
tableland write "INSERT INTO quickstart_80001_2 VALUES (0, 'Bobby Tables')" --chain "80001" --privateKey "your_private_key"

# Read from the table
# Note: replace the table name with yours
# Although, anyone can *read* from *any* table, so this statement is valid for anyone
tableland read "SELECT * FROM quickstart_80001_2;" --chain "80001"
```
