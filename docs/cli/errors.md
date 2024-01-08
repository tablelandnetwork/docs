---
title: CLI errors
sidebar_label: Errors
description: Understand commons errors that occur when using the Tableland CLI.
keywords:
  - cli
  - command line
  - errors
---

Generally, most errors that occur when using the CLI bubble up from the underlying SDK since the CLI is built on top of it. Of course, there are some unique aspects that come with the command line, and the CLI itself offers some additional features that are not available in other clients, such as the `shell` or `namespace` commands.

When in doubt, use the `receipt` command to check why a create table statement or mutating query did not work by passing the successful transaction hash as a parameter. The `error` will be displayed and describe the SQL-related error; i.e., the transaction was successful but the database execution thereof was not.

## Missing or incorrect required flags

Recall that the [`shell`](/cli/shell) command sets up a `privateKey`, `chain`, and `providerUrl`, and you can also choose to pass these as flags. An incorrect or missing value lead to some of the most common issues. Some of these examples intentionally expose a private key of `0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d` since this is an account used by many tools and given to developers for local development purposes.

## Could not detect network

You **must define** your `providerUrl`. If you do not configure this value, you will be unable to create or mutate tables—unless you are you `local-tableland` (which spins up a local EVM node). Also, if you are offline but try to interact with some live network, this would also lead to problems since you cannot actually interact with the chain due to connection issues.

```bash
could not detect network (event="noNetwork", code=NETWORK_ERROR, version=providers/5.7.2)
```

## Missing private key

If you create or mutate a table, this will always require a `privateKey` to be specified. If you do not specify a private key, then there's no way to interact with a table since all tables are ERC721 tokens that, under the hood, are mutated with SQL passed to smart contract methods.

```md
missing required flag (`-k` or `--privateKey`)
```

## Invalid hexlify value

Let's say you try to use a private key value of `asdf1234`. This is not a valid hexadecimal value (a hex value starts with `0x` and consists of numbers `0` to `9` and letters `a` through `f`) and will throw.

```bash
invalid hexlify value (argument="value", value="asdf1234", code=INVALID_ARGUMENT, version=bytes/5.7.0)
```

## Hex data is odd-length

Or, you might incorrectly specify a value that _is_ a valid hexadecimal number but _is not_ a valid private key. Private keys should be 64 characters long (after the `0x` prefix).

```bash
# A value that is an odd number of characters short (here, it's missing the final character).
hex data is odd-length (argument="value", value="0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690", code=INVALID_ARGUMENT, version=bytes/5.7.0)
```

## Invalid private key

Lastly, you cannot use a value that has 64 (or an even number of characters) but isn't a real key.

```bash
invalid private key (argument="privateKey", value="[[ REDACTED ]]", code=INVALID_ARGUMENT, version=signing-key/5.7.0)
```

## Chain ID mismatch

Every table is created and unique to the host chain. If you specify the _wrong_ `chain`, you're effectively trying to interact with something that doesn't exist. For example, trying to write to a table named `healthbot_1_1` (a mainnet Ethereum table—on chain ID `1`) while the `chain` specified is Ethereum's testnet (`sepolia`, which is a chain ID of `11155111`) would raise an error.

```bash
chain id mismatch: received 11155111, expected 1
```

## Cannot determine chain ID

If you cannot connect to a chain, you might run into an issue where the provider and chain ID cannot be determined. For example, if you're trying to use Local Tableland but never actually started the node, the provider chain ID cannot be determined since nothing exists.

```bash
cannot determine provider chain ID
```

## Provider / chain mismatch

Similarly, you cannot use a provider URL that points to a different network than the chain you've specified.

```bash
Provider / chain mismatch.
```

## Cannot estimate gas

You cannot interact with a table that doesn't actually exist on any chain. If you do so, you'll like run into an `cannot estimate gas` error. This means the host chain is trying to estimate what it will cost to execute the transaction, and since the table does not exist, the execution / transaction will fail.

```bash
cannot estimate gas; transaction may fail or may require manual gas limit
```

## Insufficient funds

If you _are_ interacting with a valid table, it's possible the wallet doesn't have enough currency to pass for the the execution. Always check you're on the correct `chain`. Anytime you're developing locally (on chain `31337`), you should opt for one of the accounts specified by the local node (like the aforementioned private key)—or, you can send test currency from this account to some other one that's not spun up as part of the local node's startup process.

This may resemble the following:

<!-- prettier-ignore -->
```bash
processing response error (body="{
  jsonrpc: "2.0",
  id: 57,
  error: {
    code: -32000,
    message:
      "sender doesn't have enough funds to send tx. The max upfront cost is: 86692500809130 and the sender's account only has: 0",
  }
}"
```

## Invalid table name

Be sure to only use valid table names. These should be in the format `{prefix}_{chainId}_{tableId}`—for example, `healthbot_1_1`.

```bash
invalid table name (name format is `{prefix}_{chainId}_{tableId}`)
```
