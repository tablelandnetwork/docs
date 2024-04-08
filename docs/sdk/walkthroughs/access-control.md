---
title: Access control
description: Define access controllers for your tables with the SDK.
keywords:
  - access control
  - grant
  - revoke
---

The Tableland SDK works with the standard access control paradigms: smart contract controllers, or `GRANT`/`REVOKE` statements. This page will walk through simple examples for how to configure access rules for your tables.

## Basic access control

With [`GRANT` and `REVOKE` statements](/sql/access-control), you can `prepare` a statement and define what a _specific_ address can do. For example, if you wanted to add another "admin" to the table with full access permissions on writing data, you could execute the following:

```js
import { Database } from "@tableland/sdk";

// Assuming you've instantiated a `signer`
const db = new Database({ signer });
const tableName = "my_table_31337_2"; // Your table name

const { meta } = await db
  .prepare(
    `GRANT INSERT, UPDATE, DELETE ON ${tableName} TO '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC'`
  )
  .run();
await meta.txn?.wait();
```

Thus, if the account `0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC` tries to write to the table, they'll have full permissions.

## Advanced control with controllers

There is no native support in the SDK for _deploying_ controllers, which are smart contracts that [define an access control policy](/smart-contracts/controller/), which are more dynamic than the `GRANT`/`REVOKE` feature. But, once a controller contract is deployed, you can the use the SDK's [`Registry API`](/sdk/registry/) to set the controller.

Let's say you've deployed a contract that has ["allow all" permissions](/smart-contracts/examples/allow-all-controller) at address `0x83a4bE0B792996f3b607f28cFD98f4E82AFcDD20` (note: this is a [real contract on Sepolia](https://sepolia.etherscan.io/address/0x83a4bE0B792996f3b607f28cFD98f4E82AFcDD20#code)). Then, you can use the [`setController` method](/sdk/registry) to, basically, state: this address is a controller contract that should dictate access controls for my table. Here's what it would look like:

```js
import { Registry } from "@tableland/sdk";

// Assuming you've instantiated a `signer`
const registry = new Registry({ signer });
const tableName = "my_table_11155111_2"; // Your table name
const controller = "0x83a4bE0B792996f3b607f28cFD98f4E82AFcDD20";

const tx = await registry.setController({
  tableName,
  controller,
});
await tx.wait();
```

:::tip
[Remix](https://remix.ethereum.org/) makes it _really_ easy to deploy one-off smart contracts. You can create one of the example controllers and sign/send the transaction using your browser wallet, making it straightforward to add more flexible access controls without much Solidity experience.
:::
