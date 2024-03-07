---
title: Init
description: Create a config file.
keywords:
  - CLI
  - command line
  - tableland init
---

## `tableland init`

Before starting with the CLI, it’s best to create a config file. This will create a JSON or YAML file that stores a `privateKey`, `chain`, and `providerUrl`. Once these are set, commands will leverage these values.

Run the command, and then follow the prompts:

```bash
tableland init
```

This will trigger a series of steps. First, select your desired chain:

```bash
? Select a preferred default chain (Use arrow keys)
❯ local-tableland
mainnet
homestead
optimism
arbitrum
arbitrum-nova
matic
filecoin
sepolia
optimism-sepolia
arbitrum-sepolia
maticmum
filecoin-calibration
localhost
```

You’ll want to set your private key. For example, a private key with value `0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d` is an openly used account the comes with local node tooling like Hardhat, so it can also be used if you’re developing with `local-tableland`. However, for any mainnets or testnets, it’s best to use your own private key.

```bash
? Enter your private key (optional)
0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
```

Set your preferred config file format (JSON or YAML).

```bash
? Select a config file output format
❯ json
yaml
```

Optionally, store your provider URL (Alchemy, Infura, etc.) or default to `http://127.0.0.1:8545`.

```bash
? Enter a default JSON RPC API provider URL (optional)
http://127.0.0.1:8545
```

Then, enter the path where this value should be stored; the default value will be under `/Users/$USER/.tablelandrc.json`.

```bash
? Enter path to store config file (use "." to print to stdout)
(/Users/$USER/.tablelandrc.json)
```

Lastly, you can optionally set a table aliases file to use, allowing for an alias to replace the full table name. It's a local-only mapping. If you don't have an existing JSON file, passing a directory path will create one.

```bash
? Enter file path to existing table aliases file, or directory path to create a
new one (optional)
./path/to/dir/or/file
```

The resulting config file will resemble the following:

```json title=".tablelandrc.json"
{
  "privateKey": "59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d",
  "chain": "local-tableland",
  "providerUrl": "http://127.0.0.1:8545",
  "aliases": "./tableland.aliases.json"
}
```
