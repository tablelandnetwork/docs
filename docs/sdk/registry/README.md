---
title: Registry API
description: Use the Registry API for directly calling the Tableland registry smart contract.
keywords:
  - registry api
  - access control
  - controller
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

The `Database` API provides a surface area that combines the `Validator` and `Registry` functionality. However, the `Registry` class allows developers to directly interact with the Tableland registry contract, which exposes a few additional features that aren't part of the `Database` class.

## Installation

If you haven't already, make sure the SDK is installed in your project:

```bash npm2yarn
npm install @tableland/sdk
```

## Setup

The `Registry` class requires a `signer` param to connect to and interact with a base chain. There are various ways to do this, but we'll show a simple example using a `Wallet` from ethersjs, along with [Local Tableland](/local-tableland) / Hardhat as the chain.

There are a couple ways to instantiate the `Registry`. You can pass an ethers signer to the constructor:

```js
import { Registry } from "@tableland/sdk";
import { Wallet, getDefaultProvider } from "ethers";

const privateKey =
  "59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d";
const wallet = new Wallet(privateKey);
const provider = getDefaultProvider("http://127.0.0.1:8545");
const signer = wallet.connect(provider);

// Pass a signer to the constructor
const registry = new Registry({ signer });
```

Or, pass a signer to the `forSigner` method:

```js
const registry = await Registry.forSigner(signer);
```

## `listTables`

Gets the list of table IDs of the requested owner. It takes a single `owner` parameter, which is the address of the owner to query—or if none provided, it'll default to the connected signer's address.

```js
const list = await registry.listTables();
// Or, pass an address as a param, like "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
console.log(list);
```

This will log an array of table IDs and its chain ID:

```js
[{ tableId: "2", chainId: 31337 }];
```

## `setController`

Sets the controller for a table, where the controller can be an EOA or contract address. The caller must be the table's owner, and the parameters include an object with:

- `tableName`: The name of the table to transfer in the format `{name}_{chainId}_{tableId}`.
- `controller`: The address of the controller (EOA or contract).

```js
const tx = await registry.setController({
  tableName: "my_table_31337_2",
  controller: "0xdD2FD4581271e230360230F9337D5c0430Bf44C0",
});
const rec = await tx.wait();
const { transactionHash } = rec;
console.log(transactionHash); // 0x90524fa82043d645bd0a843f627aeef8b013307e39ba1d1474a12c40cb381ba3
```

The full return an object includes all of the "typical" ethersjs transaction details, including the `hash` and input parameters.

## `getController`

Get the table's controller by providing an object with `chainId` and `tableId` fields, returning the address of the controller. Note that `tableId` must be converted to a string.

```js
const controller = await registry.getController({
  chainId: 31337,
  tableId: "2",
});
console.log(controller); // 0xdD2FD4581271e230360230F9337D5c0430Bf44C0
```

## `lockController`

Locks the controller for a table **forever**, where the controller can be an EOA or contract address. The caller must be the table's owner, and the parameters include an object with:

- `chainId`: The chain ID to lock the controller on.
- `tableId`: The table ID to lock the controller on.

```js
const tx = await registry.lockController({
  chainId: 31337,
  tableId: "2",
});
const rec = await tx.wait();
const { transactionHash } = rec;
console.log(transactionHash); // 0x90524fa82043d645bd0a843f627aeef8b013307e39ba1d1474a12c40cb381ba3
```

The full return an object includes all of the "typical" ethersjs transaction details.

## `safeTransferFrom`

Safely transfers the ownership of a given table ID to another address. The caller must be the table's owner or an approved operator (i.e., this acts like any NFT transfer would). The parameters include an object with:

- `tableName`: The name of the table to transfer in the format `{name}_{chainId}_{tableId}`.
- `to`: The address to transfer the table to.

```js
const tx = await registry.safeTransferFrom({
  tableName: "my_table_31337_2",
  to: "0xdD2FD4581271e230360230F9337D5c0430Bf44C0",
});
const rec = await tx.wait();
const { transactionHash } = rec;
console.log(transactionHash); // 0xa2c551c3b3a4b2a81eb33c2e2b7a2614d771196c7dc5f193b20250b34b6b451b
```

The full return an object includes all of the "typical" ethersjs transaction details.

## `create`

Create a table directly with the registry smart contract. The parameters include an object with:

- `statement`: The SQL statement to create the table.
- `chainId`: The chain ID to create the table on.

```js
const tx = await registry.create({
  statement: "CREATE TABLE my_table (id INTEGER PRIMARY KEY, name TEXT)",
  chainId: 31337,
});
const rec = await tx.wait();
const { transactionHash } = rec;
console.log(transactionHash); // 0x322fcd14d7290dbe25e9eac0c371905d9b7529eb9e92a9be514f66ce577b22e5
```

The full return an object includes all of the "typical" ethersjs transaction details.

## `mutate`

Runs a mutating SQL statement for the caller where the caller must be authorized to mutate table data. The parameters include an object with:

- `statement`: The SQL statement to create the table.
- `chainId`: The chain ID to create the table on.
- `tableId`: The table ID to mutate. Note that this must be a string.

```js
const tx = await registry.mutate({
  statement: "insert into test_31337_32 values (1)",
  chainId: 31337,
  tableId: "27",
});
const rec = await tx.wait();
const { transactionHash } = rec;
console.log(transactionHash); // 0x1df063ebae1792170042d6d06d5bd5dd6a638a89d75db8e445a8c3d75aac5637
```

The full return an object includes all of the "typical" ethersjs transaction details.
