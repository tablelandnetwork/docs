---
title: Command line
description: Run the sandboxed Tableland network from the command line.
keywords:
  - CLI
  - command line
  - local tableland
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

## Installation

You can install the tool globally:

```bash npm2yarn
npm install -g @tableland/local@latest
```

## Startup

To start running the Local Tableland network, do the following:

```bash
npx local-tableland
```

This will start a Local Tableland server on port `http://localhost:8080` and a hardhat node on `http://127.0.0.1:8545`. For example, it's common that you'll pass the hardhat RPC URL to clients trying to send onchain transactions. For querying the Tableland network via the [Gateway API](/validator/api), you can use the Local Tableland URL, such as making read queries with the `query?statement=...` endpoint and query param.

## Available flags

There are a number of optional flags available:

<!-- prettier-ignore -->
| Flag             | Type                           | Description                               |
| ---------------- | ------------------------------ | ----------------------------------------- |
| `--help`         | `boolean`, defaults to `false` | Show help.                                |
| `--version`      | `boolean`, defaults to `false` | Show the version number.                  |
| `--silent`       | `boolean`, defaults to `false` | Silence all output to stdout.             |
| `--verbose`      | `boolean`, defaults to `false` | Output verbose logs to stdout.            |
| `--init`         | `boolean`, defaults to `false` | Initialize a Local Tableland config file. |
| `--docker`       | `boolean`, defaults to `false` | Initialize a Local Tableland config file. |
| `--validator`    | `string`                       | Path to the Tableland Validator directory (note: if the docker flag is set, this must be the full repository). |
| `--registry`     | `string`                       | Path to the Tableland Registry contract repository. |
| `--registryPort` | `string`                       | Use a custom Registry port for hardhat. |

## Logging

The `--verbose` flag allows you to see verbose logs from the Tableland validator node, which can be useful for debugging purposes. The `--silent` flag allows you to silence all logs from the Tableland validator node in case you'd like to run the node in the background. You can use these independently or together.

<Tabs>
<TabItem value='silent' label="silent" default>

```bash
npx local-tableland --silent
```

</TabItem>
<TabItem value='verbose' label="verbose">

```bash
npx local-tableland --verbose
```

</TabItem>
</Tabs>

## Configuration

The `init` option is optional and sets up a configuration file within your project. By default, the following `tableland.config.js` file comes with Local Tableland and is also what's created when running `npx local-tableland --init`:

```js title="tableland.config.js"
module.exports = {
  validatorDir: "../go-tableland",
  registryDir: "../evm-tableland",
  verbose: false,
  silent: false,
};
```

If you'd like to override these, such as working with a different Tableland validator or silencing logged outputs, you can update these values accordingly. For most use cases, this is not necessary.

## Docker

Under the hood, the Validator behaves a little differently when using Docker. The path structure changes slightly as compared to the default usage. If you'd like to use Local Tableland on a Docker image, simply pass the flag:

```bash
npx local-tableland --docker
```

## Validator overrides

Instead of setting paths in the config file, the `--validator` flag allows you to override the default path to a [`go-tableland`](https://github.com/tablelandnetwork/go-tableland) directory, which is the source code for a Tableland validator node. Recall the default path is `../go-tableland`. If you'd like to, for example, point to some other location where this repo exists, it might look like the following:

```bash
npx local-tableland --validator /path/to/go-tableland
```

## Registry overrides

### Path

The `--registry` flag lets you to override the default path to a [`go-tableland`](https://github.com/tablelandnetwork/go-tableland) directory, which is the source code for the Tableland registry smart contract. The default path is `../evm-tableland`. To point to some other location where this repo exists, it might look like the following:

```bash
npx local-tableland --registry /path/to/evm-tableland
```

### Port

You can set a custom Registry port for hardhat via the `--registryPort` flag; the default port is 8545. To set a custom port, it might look like the following, which would then use the RPC URL `http://127.0.0.1:9999` instead of the default. This is useful in scenarios where port 8545 is already in use.

```bash
npx local-tableland --registryPort 9999
```

A word of caution. When you'd like to make any onchain actions (sending transactions, reading from contracts), this means the commonly used `http://127.0.0.1:8545` must be replaced with `http://127.0.0.1:9999`. Some clients automatically look for 8545 with a local network, so it's something to keep an eye for and make sure you pass the new, custom URL.
