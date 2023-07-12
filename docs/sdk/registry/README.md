---
title: Registry API
sidebar_label: Overview
description: Use the Registry API for directly calling the Tableland registry smart contract.
---

The `Database` API provides a surface area that is familiar to SQL developers. However, Tableland is a web3 database, which means it comes with some blockchain-specific nuances. In order to finely tune access control, a developer must be able to directly interact with the Tableland registry contract; this holds methods that are abstracted in the `Database` API but also a few new ones.

```js
import { Database, Registry, Validator } from "@tableland/sdk";
import { getContractReceipt } from "@tableland/sdk/helpers";

// Configure a `signer` to then pass to the `Database` instance

// Note: the `baseUrl` is not required for `Registry` API calls
const db = new Database({ signer, baseUrl: getBaseUrl(31337) });

// Pull info from an existing Database instance
const reg = new Registry(db.config); // Note: *must* have a signer

// Create a table
let tx = await reg.create({
  chainId: 31337,
  statement: "create table test_31337 (id int, name text)", // Must append the chain ID to the table prefix
});
// Tableland adopts this "wait" style pattern from ethers!
await tx.wait();
// Helper function to extract table event information
const receipt = await getContractReceipt(tx);

// Use a `Validator` to get the table name
const validator = new Validator(db.config);
const { tableName } = await validator.getTableById({
  chainId: receipt.chainId,
  tableId: receipt.tableIds[0],
});

// List my tables
const results = await reg.listTables(/* default to connected wallet address */);

// Set the table's controller to a different address
tx = await reg.setController({
  controller: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC", // The address to send the table to
  tableName: receipt, // Also accepts name as string
});
await tx.wait();

// Transfer the above table to my friend!
tx = await reg.safeTransferFrom({
  to: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC", // The address to send the table to
  tableName: tableName, // Also accepts name as string
});
await tx.wait();
```

For more details about the Tableland registry, review the [smart contract docs](/smart-contracts).
