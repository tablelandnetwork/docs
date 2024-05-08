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

### Local development

It's easiest to also use Local Tableland when you're first getting started. Install the `@tableland/local` package globally (see [here](/local-tableland) for details) and then start the local nodes. This will spin up a local Tableland validator node as well as a Hardhat node, allowing you to connect to chain ID `31337` and RPC URL `http://127.0.0.1` for testing purposes.

```bash npm2yarn
npm install -g @tableland/local
```

And then spin the nodes up so that you can use Tableland without needing to connect to any testnets or mainnets:

```bash
npx local-tableland
```

The rest of these examples will make use of the local nodes, but you can also connect to any supported EVM chain by specifying the `--chain` and `--providerUrl` flags.

## 2. Create a configuration file

Specify your development environment's `privateKey`, `chain`, and `providerUrl` (e.g., Alchemy, Infura, etc.). This creates a configuration file at `/Users/$USER/.tablelandrc.json` that is automatically read by the `tableland` commands.

```bash
tableland init
```

Ideally, you should choose to ues the `aliases` feature. This is an option during the config step, and it allows you to write SQL statement with a locally saved alias to table name map. Thus, you can write statements with something like `my_table` instead of `my_table_31337_2`.

Note that values for the `chain` can be found [here](/sdk/#chain-configuration) (e.g., Polygon Amoy is called `polygon-amoy`).

## 3. Create a table

Choose to define an optional prefix, such as `quickstart`. If you didn’t run the `init` command, you can also specify the required parameters as command options (prefix, chain, and private key). The private key being used here is the one that comes with Hardhat by default, so feel free to replace it with your own on live networks.

```bash
# Create a table & save its returned `name` locally
tableland create "id int primary key, val text" --prefix my_table --chain local-tableland --privateKey 59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d --providerUrl http://127.0.0.1:8545
```

Or, you can choose to pass a full CREATE TABLE statement without the prefix flag:

```bash
# Create a table & save its returned `name` locally
tableland create "CREATE TABLE (id int primary key, val text)" --prefix my_table --chain local-tableland --privateKey 59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d --providerUrl http://127.0.0.1:8545
```

The table created should look something like `my_table_31337_2`—a prefix of `my_table` on chain `31337` and table ID `2`.

## 4. Write data

Insert, update, or delete values while still specifying the chain, private key, and provider URL in case you didn't run the `init` command.

```bash
tableland write "INSERT INTO my_table_31337_2 VALUES (0, 'Bobby Tables')" --prefix my_table --chain local-tableland --privateKey 59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d --providerUrl http://127.0.0.1:8545
```

## 5. Read data

You can read data from the table you created.

```bash
tableland read "SELECT * FROM my_table_31337_2;" --chain local-tableland
```

## 5. Open the shell

Lastly, if you'd like to use raw SQL statements without commands, you can open the Tableland shell with the `shell` command. This lets you do all of the above but while passing the raw string SQL statement.

Run the command `tableland shell` to allow you to access these features.

```bash
tableland shell --chain local-tableland --privateKey 59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d --providerUrl http://127.0.0.1:8545
```

Then, you can make queries!

```shell
Welcome to Tableland
Tableland CLI shell
Connected to local-tableland using 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
tableland> create table my_table (id integer primary key, val text);
tableland> insert into my_table_table_31337_12(val) values ('Bobby Tables');
tableland> select * from my_table_table_31337_2;
```
