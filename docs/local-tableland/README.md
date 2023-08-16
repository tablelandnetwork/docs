---
title: Overview
description: Local-first development with a sandboxed Tableland validator and hardhat node.
keywords:
  - local tableland
  - hardhat
  - development
  - testing
---

The `@tableland/local` package is a tool that works with any of the other Tableland clients. Commonly, you'll spin up Local Tableland via the command line, and for testing, you'll import a `LocalTableland` instance into your JavaScript code. It allows developers to create a local Tableland validator and hardhat node, which can be used for local development and testing. This is useful for developers who want to test their Tableland applications locally before deploying to a live chain.

:::tip
See the [quickstart page](/quickstarts/local-tableland) if you’re looking to get up and running without all of the details.
:::

## Startup & logging

Starting `local-tableland` will provide logging for both the local hardhat blockchain and the Local Tableland network. This will happen irrespective of the method you're using it. Note there are optional `silent` and `verbose` flags for silencing the logs or making them verbose.

If no flags are passed, the default logging will resemble the following, which starts a Local Tableland server on port `http://localhost:8080` and a hardhat node on `http://127.0.0.1:8545`:

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

## Nonce too high errors

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
