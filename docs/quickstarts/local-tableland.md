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

1. A local [Hardhat](https://hardhat.org/) node is spun up (at `http://localhost:8545`), along with 20 test accounts (public-private keypairs). Note the `chainId` is `31337` for the local blockchain.
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

### Nonce too high

If, for some reason, "nonce" errors do occur, such as the "Nonce too high" warning, which might look like the snippet below. Basically, if you were interacting with a local node, the nonce gets tracked for each on-chain action. When you stop the node, that history is maintained such that a new node session is using old nonce tracking. The new node session wants the nonce to start at `0`, but old history says the nonce starts at some other number.

```json
MetaMask - RPC Error: [ethjs-query] while formatting outputs from RPC '
{
  "value": {
    "code":-32603,
      "data": {
        "code":-32000,
          "message":"Nonce too high. Expected nonce to be 0 but got 50. Note that transactions can't be queued when automining.",
        "data":{
          "message":"Nonce too high. Expected nonce to be 0 but got 7. Note that transactions can't be queued when automining."
      }
    }
  }
}
```

There are a few resolution paths:

1. If you’re using MetaMask, you can try to reset the transaction history by going to _Settings_ → _Advanced_ → _Reset Account_.

import WalletReset from "@site/static/assets/metamask-reset.png"

<img src={WalletReset} width='30%' />

1.  Resetting your account will clear your transaction history. This will not change the balances in your accounts or require you to re-enter your Secret Recovery Phrase.
2.  Again, this should only be done if you’re using some test account provided by hardhat.

3.  Enable a "custom nonce" to manually set the nonce upon sending a transaction. Go to _Settings_ → _Advanced_ → _Customize transaction nonce_.
4.  Delete the wallet and re-import it using the private key—be sure to \***\*only\*\*** delete and reimport the wallet if you do know the private key, or the account could be lost forever.

## Logging & startup

Starting `local-tableland` will provide logging for both the local hardhat blockchain and the local Tableland network. Note there are optional flags for silencing the logs or making them verbose:

```bash
npx local-tableland --silent
## Or
npx local-tableland --verbose
```

If no flags are passed, the default logging will resemble the following:

```bash
[Registry] Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/
[Registry]
[Registry]
[Registry] Accounts
[Registry] ========
---
[Registry] eth_sendTransaction
[Registry] Contract deployment: TablelandTables
[Registry] Contract address:    0x5fbdb2315678afecb367f032d93f642f64180aa3
---
[Validator] 8:26PM INF state hash block_number=6 chain_id=31337 component=eventprocessor elapsed_time=5 goversion=go1.19.1 hash=edde6a99dd8d30efb48f8a60de13f53b84a6c6f1 severity=Info version=7144099
[Validator]
[Validator] 8:26PM DBG executing create-table event chain_id=31337 component=txnscope goversion=go1.19.1 owner=0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 severity=Debug statement="create table healthbot_31337 (counter integer);" token_id=1 txn_hash=0x8459cc42f646c40233966c3ff366f16a4b6678045f23536c3a1839e459a8cd05 version=7144099
```

First, you’ll notice that each line is prefixed with either `[Registry]` or `[Validator]`, plus the local time at which the log occurred. The **Registry** logs are standard _hardhat node_ interactions. For example, when the `TablelandTables` contract is deployed, it shows up on a line with `[Registry]` and includes information passed by hardhat; the same information available with `npx hardhat node`.

For lines prefixed with **Validator**, these are corresponding to the local _Tableland validator node._ Thus, a line like `[Validator] 8:26PM DBG executing create-table event ...` is an action executed by the local Tableland network node. In this case, it’s relating to a create table statement that was made, but for any table creation, mutation, or read, there will be a corresponding log with the `[Validator]` prefix.

### Additional context

Any time you start `local-tableland`, you’ll notice the same series of events that occur after the _Tableland is running!_ message:

```bash
******  Tableland is running!  ******
             _________
         ___/         \
        /              \
       /                \
______/                  \______

[Validator] 8:26PM INF state hash block_number=6 chain_id=31337 component=eventprocessor elapsed_time=5 goversion=go1.19.1 hash=edde6a99dd8d30efb48f8a60de13f53b84a6c6f1 severity=Info version=7144099
[Validator]
[Validator] 8:26PM DBG executing create-table event chain_id=31337 component=txnscope goversion=go1.19.1 owner=0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 severity=Debug statement="create table healthbot_31337 (counter integer);" token_id=1 txn_hash=0x8459cc42f646c40233966c3ff366f16a4b6678045f23536c3a1839e459a8cd05 version=7144099
[Validator]
[Validator] 8:26PM DBG call ValidateCreateTable goversion=go1.19.1 query="create table healthbot_31337 (counter integer);" severity=Debug version=7144099
[Validator]
[Validator] 8:26PM DBG saved receipts chain_id=31337 component=eventprocessor goversion=go1.19.1 height=6 receipts=1 severity=Debug version=7144099
[Validator]
[Validator] 8:26PM DBG executing run-sql event chain_id=31337 component=txnscope goversion=go1.19.1 severity=Debug statement="insert into healthbot_31337_1 values (1);" txn_hash=0x0fccfecb3b7a692d2cb4fbb8a79c069a63d0351e1fa32dc00a3e8011b0880835 version=7144099
[Validator]
[Validator] 8:26PM DBG call ValidateMutatingQuery goversion=go1.19.1 query="insert into healthbot_31337_1 values (1);" severity=Debug version=7144099
[Validator]
[Validator] 8:26PM DBG saved receipts chain_id=31337 component=eventprocessor goversion=go1.19.1 height=7 receipts=1 severity=Debug version=7144099
[Validator]
```

The _Validator_ events preceding _Tableland is running!_ are related to the node starting up:

- Database (SQLite) is instantiated.
- The node "owner" account is set to the 0th wallet provided by hardhat (`0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`).
- Various daemons and event trackers are set up.

Then, the first table on the network — the `healthbot` table, consisting of a incrementing `counter` column — is created. Every testnet and mainnet chain that Tableland launches on actually follows the general logic in which this table is created as the first table on the new network. The following describes the steps that happen from this point onward:

- With `executing create-table event ...`, you’ll notice this event comes along with the actual statement (`create table healthbot_31337 (counter integer)`) the table’s `owner`, and the transaction hash at which it was created (`txn_hash`).
- The following line validates the create statement is valid (`ValidateCreateTable`) and saves the receipt of this create table event / transaction occurring.
- From there, a `run-sql` event is processed due to the mutating query that is being sent with `insert into healthbot_31337_1 values (1)` (which also comes with a `txn_hash`).
- The mutating query is validated (`ValidateMutatingQuery`) to ensure SQL compliance as well as the send of the query (who is the `owner`, in this case) has the process access.
- Lastly, the table mutation is made, and the associated receipt is saved by the node; from there, the local Tableland network is ready to process new tables and queries!
