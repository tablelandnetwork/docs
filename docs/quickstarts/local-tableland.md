---
title: Local development & testing
sidebar_label: Local Tableland
description: Build with Local Tableland to quickly iterate with Tableland using a local environment.
keywords:
  - local tableland
  - hardhat
---

Developers can leverage a local-only instance of the Tableland network that spins up a local Hardhat node in the process. This allows for quickly iterating while developing (create, write, and read local tables) and also allows for integrating Local Tableland into your testing flow.

## Installation & setup

Install `@tableland/local` within a project:

```bash npm2yarn
npm install --save-dev @tableland/local
```

You can simply run the following command, which will spin up a Local Tableland and Hardhat node for local-only prototyping.

```bash
npx local-tableland
```

Under the hood, a few things will then happen:

1. A local [Hardhat](https://hardhat.org/) node is spun up (at `http://localhost:8545`), along with 20 test accounts (public-private key pairs). Note the `chainId` is `31337` for the local blockchain.
2. The `TablelandTables.sol` contract is deployed on the local network, allowing for smart contract calls for table creates and writes.
3. A local Tableland network node is spun up, which will process the events from the `TablelandTables.sol` contract, materializes the SQL instructions, and allows for read queries locally (via REST API at `http://localhost:8080`).

## SDK

If you’re using the SDK, connecting to the local Tableland network comes as part of the `Signer` connection. For example, with a browser wallet, the following would prompt for a connection, and assuming the wallet connects to a local Hardhat node running on `http://127.0.0.1:8545` and chain `31337`, then it should be good to go.

```js
import { Database } from "@tableland/sdk";
import { providers, Signer } from "ethers";

// Establish a connection with a `Signer`
const provider = new providers.Web3Provider(window.ethereum);
// Request the connected accounts, prompting a browser wallet popup to connect.
await provider.send("eth_requestAccounts", []);
// Create a signer from the returned provider connection.
const signer = provider.getSigner();

const tableland = Database({ signer });
```

Thus, creating, writing to, and reading from tables will all happen locally, without needing to connect to a testnet or mainnet chain. See the [JavaScript SDK](/sdk) documentation for more SDK usage details.

### Smart contracts

Since running `npx local-tableland` starts a hardhat node, developers can bypass the usage of `npx hardhat node`. For example, if you’re following hardhat’s [deployment instructions](https://hardhat.org/hardhat-runner/docs/guides/deploying), the following steps would be used to deploy your smart contracts:

```bash
npx local-tableland
## In a separate window, deploy the contracts locally
npx hardhat run scripts/deploy.js --network localhost
```

Alternatively, check the [Hardhat quickstart](hardhat) for using the `@tableland/hardhat` plugin, which differs a bit from this usage.

## REST API

Once the local node is running, tables can be accessed just as they are with the Tableland testnet and mainnet network. But, instead of the Tableland-hosted gateway, the local Tableland network is accessible at `http://localhost:8080`. The network will always create a `healthbot` table as the first table, so you can easily test out this functionality from the get go.

You can use the `query` endpoint to retrieve some data (not the chain ID is `31337`):

```bash
curl http://localhost:8080/api/v1/query?statement=select%20counter%20from%20healthbot_31337_1
```

Which should return:

```json
[
  {
    "counter": 1
  }
]
```

All of the Tableland APIs are available at this URL, so anything that you’d like to develop and test out locally is available on testnet / mainnet chains (and vice versa). Check out the [REST API](/gateway-api) docs for more details! And if you’re unfamiliar with the encoding used, see the docs on [URI Encoding](/smart-contracts/uri-encoding).

## CLI

With the CLI, you should specify `local-tableland` with the `init` command or pass it as a `--chain` flag. Once doing so, you will be able to create, write, and read tables locally, once the nodes are running:

```bash
tableland read "select * from healthbot_31337_1"
```

## Wallets & nonce issues

When testing locally, you may want to import an account created during the hardhat process. These are publicly known accounts such that exposing the private key is not an issue as they’re meant for testing purposes. **Do not** use the first account (`0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`) since this can lead to nonce issues. This account is the one "owned" by the validator upon creating the first `healthbot` table on the network, so it should be reserved for that and that alone.

```markdown
[Registry] Accounts
[Registry] ========
[Registry]
[Registry] WARNING: These accounts, and their private keys, are publicly known.
[Registry] Any funds sent to them on Mainnet or any other live network WILL BE LOST.
[Registry]
[Registry] Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
[Registry] Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
[Registry]
[Registry] Account #1: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 (10000 ETH)
[Registry] Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
```

For example, with the **_second_** account created, import the private key value into your wallet, which will allow you to use the 10000 test ETH provided:

- Public key: `0x70997970C51812dc3A010C7d01b50e0d17dc79C8`
- Private key: `0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d`

:::tip
For more information, dive into the [Local Tableland](/local-tableland) documentation.
:::
