---
title: Using IPFS, Filecoin, & web3.storage
description: Understand the basics for storing data with IPFS & Filecoin in tables.
keywords:
  - ipfs
  - cid
  - filecoin
  - fvm
  - fevm
  - web3 storage
  - web3.storage
  - w3s
---

Tableland naturally imposes [limits](/fundamentals/limits) on the size of data you can store in a table. If you need to store larger pieces media, you can use IPFS to store the data and then reference it in your table—and Filecoin is a perfect fit! Additionally, you can further extend persistence guarantees by creating Filecoin deals for your content.

## Background

[IPFS](https://ipfs.tech/) is a peer-to-peer network and protocol for storing and sharing data in a distributed file system. [Filecoin](https://filecoin.io/) is a decentralized storage network that uses IPFS as its underlying protocol. The Filecoin Virtual Machine (FVM) adds programmability to the Filecoin network, and the FVM also contains an Ethereum Virtual Machine (EVM) runtime, called the FEVM. The FEVM lets you use familiar languages like Solidity to write smart contracts (also called "actors" on the FVM), which makes building on top of Filecoin easier for existing web3 developers.

Since Tableland is an EVM-compatible protocol, you can use the FEVM to deploy tables and interact with them, such as storing IPFS CIDs. For greater persistence guarantees, you can also create Filecoin deals for your content with [web3.storage](https://web3.storage), which will handle the deal-making process.

## Installation

We'll walk through how to use the [Tableland SDK](/sdk) to deploy a table and store an IPFS CID in it. You can choose to use whatever IPFS library you like, but we'll be using the SDK's [JETI](/sdk/plugins/) plugin since it comes with a way to seamlessly pin data to IPFS upon table writes and also unpack the contents on table reads.

From within your project, install the SDK and JETI:

```bash npm2yarn
npm install @tableland/sdk @tableland/jeti
```

The Tableland SDK comes with ethers v5, which is used below—but make sure that's installed as well. Lastly, you'll also want to make sure you have testnet Filecoin (TFIL) in your wallet to pay for storage; you can get some from the [Filecoin faucet](https://faucet.calibration.fildev.network/).

## Setup

In your source code, import the `Database` class, the pinning & skip method from JETI, and ethers helpers for setting up a wallet:

```js
import { Database } from "@tableland/sdk";
import { pinToLocal, skip } from "@tableland/jeti";
import { Wallet, getDefaultProvider } from "ethers";
```

JETI assumes that you have an IPFS node running and exposed over HTTP. For example, you can use [IPFS Desktop](https://docs.ipfs.io/install/ipfs-desktop/) to run a local node and then find the HTTP API address in the settings.

Then, instantiate the local pinner via `pinToLocal` by passing host/port information to connect to the IPFS node:

```js
const localPinner = pinToLocal({
  host: "127.0.0.1",
  port: 5001,
  protocol: "http",
});
```

Once you local pinner is set up, you can create a new `Database` instance and create a table. This example shows how you might set it up in a Node.js environment where the provider URL is the [Filecoin Calibration testnet](/quickstarts/chains/filecoin#filecoin-calibration-testnet). Or, if you wanted to deploy this table to the Filecoin mainnet, you would simply swap out the provider URL (e.g., `https://api.node.glif.io/rpc/v0`). Make sure to replace the private key with your own!

```js
// Set up wallet & chain connection
const privateKey =
  "59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"; // Replace with your private key
const wallet = new Wallet(privateKey);
const provider = getDefaultProvider(
  "https://api.calibration.node.glif.io/rpc/v1" // Connect to Filecoin Calibration
);
const signer = wallet.connect(provider);

// Create a database connection and create a table
const db = new Database({ signer });
const { meta: create } = await db
  .prepare(`CREATE TABLE my_table (id integer primary key, val text);`)
  .run();
await create.txn?.wait();
const [tableName] = create.txn?.names ?? [];
```

:::note
Filecoin operates with 30 second block times, and Tableland must optimistically wait a few block in order to ensure the transaction is included in a block. This means that you'll have to wait a few minutes before the table is created. See the Filecoin docs for more details: [here](/quickstarts/chains/filecoin).
:::

## Using a local IPFS node

Then, you can use the pinner to write data and unpack the CID contents. This will upload the data to your local IPFS node, but note that it will not have persistence guarantees, such as creating a Filecoin deal. We'll touch on this in the next section.

```js
// Set up the pinner to convert non-skipped values to CIDs
const contentToPin = "Hello world"; // A string, or a file buffer (Uint8Array)
const sql = await localPinner`insert into ${skip(
  tableName
)} (val) values ('${contentToPin}');`;

// Insert the CID into the table
const { meta: insert } = await db.prepare(sql).all();
await insert.txn?.wait();

// Unpack the CID contents
const { results } = await db.prepare(`select * from ${tableName}`).all();
const resultsWithCIDsResolved = await localPinner.resolve(results, ["val"]);
console.log(resultsWithCIDsResolved);
```

If you were to inspect the table's data, it would look like this:

| id  | val                                                         |
| --- | ----------------------------------------------------------- |
| 1   | bafybeiabfiu2uipule2sro2maoufk2waokktnsbqp5gvaaod3y44ouft54 |

But the `resultsWithCIDsResolved` variable would contain the original data:

```js
[
  {
    id: 1,
    val: "Hello world",
  },
];
```

For reference, you can check out a deployed table on Filecoin Calibration: [table data](https://testnets.tableland.network/api/v1/query?statement=select%20*%20from%20my_table_314159_684) and [table info](https://testnets.tableland.network/api/v1/tables/314159/684).

## Using web3.storage for persistence

If you want to persist your data, you can use [web3.Storage](https://web3.storage/) to create a deal that will store your data on the Filecoin network. This process slightly differs from the setup above because web3.storage will handle creating the CID, so the JETI plugin will not be used.

Make sure you've created an account before continuing [here](https://console.web3.storage/) since you'll use your email address in the steps below. Then, you'll need to install the web3.storage client:

```bash npm2yarn
npm install @web3-storage/w3up-client
```

First, import the client and instantiate it:

```js
import { create } from "@web3-storage/w3up-client";

const client = await create();
```

The next step is to create a "space" that acts as a namespace for your content—the name passed is entirely optional, but we'll use `tableland` in this example:

```js
const space = await client.createSpace("tableland");
const w3sAccount = await client.login("you@example.com"); // Replace with your w3s account's email address
```

When you call `client.login()` for the first time, you'll be prompted to authenticate with your email address—you'll have to go to your email inbox and click the verification. Then, you can upload your data to the space. Before doing so, save the space configuration:

```js
await w3sAccount.provision(space.did());
await space.createRecovery(w3sAccount.did());
await space.save();
await client.setCurrentSpace(space.did());
```

Now, you can upload some data! The w3s `uploadFile` method expects a Blob, so you'll need to convert the `Hello world` string that we used in the previous example accordingly:

```js
// Convert the string to a Blob
const content = "Hello world";
const blob = new Blob([content], { type: "text/plain" });

// Upload the data
const cid = await client.uploadFile(blob);
```

This will provide us with a CID. As with the local pinning example above, we can insert that raw CID into the table and store the reference for later retrieval. Be sure to convert the CID object returned from w3s to a string upon inserting the data:

```js
const sql = `insert into ${tableName} (val) values ('${cid.toString()}');`;

const { meta: insert } = await db.prepare(sql).all();
await insert.txn?.wait();
```

Then, you can fetch the table data:

```js
const { results } = await db.prepare(`select * from ${tableName}`).all();
console.log(results);
```

And the table data will contain the CID:

| id  | val                                                         |
| --- | ----------------------------------------------------------- |
| 1   | bafybeicrrabdtihvcyjppd4posgj7cbk3wr7xvokda7crxjt3wpul75ary |
