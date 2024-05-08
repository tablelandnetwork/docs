---
title: JETI extension
sidebar_label: Overview
description: The JETI package lets you transform data on the client-side for SDK queries.
keywords:
  - IPFS
  - CID
  - encrypt
  - decrypt
  - truncate
  - plugin
  - extension
---

import DocCardList from '@theme/DocCardList';

## Overview

The JETI (JavaScript Extension for Tableland Integrations) package is a library designed to be used with the `@tableland/sdk`. It provides a few out-of-the-box extensions to easily transform data you are submitting to and "untransform" data queried from Tableland, and you can also create your own using the `createProcessor` function.

## Usage

There are a few ways to use JETI with the following exports:

- `pinToLocal` or `pinToProvider`: Use string templating to define values in a SQL string that should be replaced with IPFS CIDs, pinning them in the process. That is, a CID will be inserted into the table and stored on IPFS, and you can call the `resolve` function to retrieve the underlying data from IPFS. See the [pinning docs](/sdk/plugins/pinning-to-ipfs) for more information.
- `truncate`: In Tableland, each cell has a max size of [1024 bytes](/fundamentals/limits). Thus, you might want to use IPFS to store larger strings or files. Alternatively, if you want to simply store a string that _can be lossy_, the `truncate` function will limit the string to 1024 bytes and write the raw value to the table.
- `symmetricEncrypt`: This is more of an experimental example of how you can use JETI to encrypt data before it is sent to Tableland. It uses AES encryption with random secrets and salts, but it's safer to use more secure implementations in a production environment. See the [encryption docs](/sdk/plugins/encryption) for more information.
- `createProcessor`: Alteratively, you can create your own plugin using the `createProcessor` function. This lets you define other methods of transformation outside of those out-of-the-box extensions described above.

<DocCardList />

## Installation & setup

Throughout the examples in the plugins section, we'll assume you've done the following to create a table. You can install the `@tableland/jeti` package:

```bash npm2yarn
npm install @tableland/jeti @tableland/sdk
```

Then, import the `Database` class from `@tableland/sdk` as well as some ethers utilities (used in the examples below):

```javascript
import { Database } from "@tableland/sdk";
import { Wallet, getDefaultProvider } from "ethers";
```

We'll show how to import/use the various methods from `@tableland/jeti` later on.

### Local development

As a best practice, use [Local Tableland](/local-tableland) when you're first getting started. It spins up local Hardhat and Tableland nodes on chain ID `31337` and RPC URL `http://127.0.0.1`—a sandboxed environment for you to test your code.

```bash npm2yarn
npm install -g @tableland/local
```

Then, start the processes so that you can interact with the local network:

```bash
npx local-tableland
```

## Set up the database and table

Let's create a new instance of the `Database` class with the Tableland JavaScript SDK and create a table. First, set up your signer—this example uses a Hardhat private key from [`Local Tableland`](/local-tableland/), which we'll assume is running in the background to let you interact with the sandboxed network.

```js
const privateKey =
  "59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d";
const wallet = new Wallet(privateKey);
// To avoid connecting to the browser wallet (locally, port 8545).
// For example: "https://polygon-amoy.g.alchemy.com/v2/YOUR_ALCHEMY_KEY"
const provider = getDefaultProvider("http://127.0.0.1:8545");
const signer = wallet.connect(provider);
```

Then, create a simple table with an `id` and `val` column:

```js
const db = new Database({ signer });
const { meta: create } = await db
  .prepare(`CREATE TABLE my_table (id integer primary key, val text);`)
  .run();
await create.txn?.wait();
const [tableName] = create.txn?.names ?? [];
console.log(tableName); // my_table_31337_2
```

In the subsequent sections, we'll use this `my_table_31337_2` (or whatever the value is for you) as the table name.
