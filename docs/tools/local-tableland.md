---
title: Local development & testing
sidebar_label: Local Tableland
description: Build with Local Tableland to quickly iterate with Tableland using a local environment.
synopsis: Developers can leverage a local-only instance of the Tableland network that spins up a local Hardhat node in the process. This allows for quickly iterating while developing (create, write, and read local tables) and also allows for integrating Local Tableland into your testing flow.
keywords:
  - local tableland
  - hardhat
---

## Setup

### Install

You can install the `local-tableland` via `npm`:

```bash
npm install --save-dev @tableland/local
```

Or `yarn`:

```bash
yarn add @tableland/local
```

## Usage

Simply run the following command from your project:

```bash
npx local-tableland
```

Under the hood, a few things will then happen:

1. A local [Hardhat](https://hardhat.org/) node is spun up (at `http://localhost:8545`), along with 20 test accounts (public-private keypairs). Note the `chainId` is `31337` for the local blockchain.
2. The `TablelandTables.sol` contract is deployed on the local network, allowing for smart contract calls for table creates and writes.
3. A local Tableland network node is spun up, which will process the events from the `TablelandTables.sol` contract, materializes the SQL instructions, and allows for read queries locally (via REST API at `http://localhost:8080`).

### SDK

If you’re using the SDK, connecting to the local Tableland network simply requires the `chain` option to be set to `local-tableland` upon connecting to the network.

```js
import { connect } from "@tableland/sdk";

const tableland = connect({ chain: "local-tableland" });
```

Thus, creating, writing to, and reading from tables will all happen locally, without needing to connect to a testnet or mainnet chain. See the [JavaScript SDK](/develop/sdk) documentation for more SDK usage details.

### Smart Contracts

Since running `npx local-tableland` starts a hardhat node, developers can bypass the usage of `npx hardhat node`. For example, if you’re following hardhat’s [deployment instructions](https://hardhat.org/hardhat-runner/docs/guides/deploying), the following steps would be used to deploy your smart contracts:

```bash
npx local-tableland
## In a separate window, deploy the contracts locally
npx hardhat run --network localhost scripts/deploy.js
```

### REST API

Once the local node is running, tables can be accessed just as they are with the Tableland testnet and mainnet network. But, instead of the Tableland-hosted gateway, the local Tableland network is accessible at `http://localhost:8080`. The network will always create a `healthbot` table as the first table, so you can easily test out this functionality from the get go:

```bash
curl http://localhost:8080/chain/31337/tables/1
## Or, simply open your browser and paste the address

## This will provide the following response
{
  "name": "healthbot_31337_1",
  "external_url": "http://localhost:8080/chain/31337/tables/1",
  "image": "https://render.tableland.xyz/31337/1",
  "attributes": [
    {
      "display_type": "date",
      "trait_type": "created",
      "value": 1668659178
    }
  ]
}

## Another example, using the `query` endpoint with URI encoding
curl http://localhost:8080/query?s=select%20counter%20from%20healthbot_31337_1

## Returns the table data
[
  {
    "counter": 1
  }
]
```

All of the Tableland APIs are available at this URL, so anything that you’d like to develop and test out locally is available on testnet / mainnet chains (and vice versa). Check out the [REST API](/develop/api) docs for more details! And if you’re unfamiliar with the encoding used, see the docs on [URI Encoding](/concepts/related/uri-encoding).

### Wallets & nonce issues

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

#### Nonce too high

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

### Logging & Startup

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

#### Additional Context

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

## Testing

It’s also useful to leverage `local-tableland` in test suites, such as with the `[mocha](https://mochajs.org/)` testing framework. It’s important to test if the table creation, writes, and reads are all behaving as expected. To accomplish this:

1. Import the named `LocalTableland` export from `@tableland/local`.
2. Create an instance of `LocalTableland` — here’s it’s stored as an `lt` variable.
3. Call the `start()` method to launch the Tableland network; this launches all of the required local nodes (hardhat + Tableland) to allow for tests to be written for tables.
4. Call the `stop()` method to stop the network; this should only happen once the tests finish.

A best practice is to **only start a single network** to run all of your tests against. In other words, **do not create** a `LocalTableland` instance for each test but only at the start. The following provides a basic skeleton of what this should look like with [global setup fixtures](https://mochajs.org/#global-setup-fixtures):

```js
// test/setup.js

import { after, before } from "mocha";
import { LocalTableland } from "@tableland/local";

// Set `silent` or `verbose` with boolean values
// You'll likely want to silence logging during tests
const lt = new LocalTableland({ silent: true });

before(async function () {
  this.timeout(15000);
  lt.start();
  await lt.isReady();
});

after(async function () {
  await lt.shutdown();
});
```

Within `setup.js`, the local Tableland network starts and stop with the global fixtures; these will run before and after the tests elsewhere are executed. For Tableland and crypto-specific tests, you’ll want to import the `@tableland/sdk` package and `ethers`:

## Next Steps

```js
// test/index.test.js

// Use the `assert` library for more testing features
import { strictEqual, deepStrictEqual } from "assert";
// Standard for `mocha` testing
import { describe, test } from "mocha";
// `getAccounts` is a useful utility method to get accounts on the local network
import { getAccounts } from "@tableland/local";
// Get the provide using the `ethers` lib utility method
import { getDefaultProvider } from "ethers";
// Lastly, import the `connect` method for connecting to local Tableland
import { Database, Statement } from "@tableland/sdk";

describe("statement", function () {
  // Note that we're using the second account here
  const [, wallet] = getAccounts();
  const provider = getDefaultProvider("http://127.0.0.1:8545");
  const signer = wallet.connect(provider);
  const db = new Database({ signer });

  test("when created via db.prepare()", async function () {
    const sql = "CREATE TABLE test (counter integer);";
    const stmt = db.prepare(sql);
    strictEqual(stmt.toString(), sql);
    deepStrictEqual(stmt, new Statement(db.config, sql));
  });

	test("when executing mutations works and adds rows", async function () {
		const sql = "CREATE TABLE test (counter integer);";
    const stmt = db.prepare(sql);
    const sql = `INSERT INTO ${tableName} (counter) VALUES (5);
    INSERT INTO ${tableName} (counter) VALUES (9);`;
    const { meta } = await db.exec(sql);
    assert(meta.duration != null);
    strictEqual(meta.count, 2);
    assert(meta.txn != null);

    await meta.txn.wait();

    const results = await db.prepare("SELECT * FROM " + tableName).all();
    strictEqual(results.results.length, 2);
  });
};
```

As you get started with testing, it may be helpful to check out the [`js-template`](https://github.com/tablelandnetwork/js-template) repo, which comes packed with useful Tableland-specific features, including the example tests noted above.
