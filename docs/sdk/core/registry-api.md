---
title: Registry API
description: Use the Registry API for directly calling the Tableland registry smart contract.
---

The `Database` API provides a surface area that is familiar to SQL developers. However, Tableland is a web3 database, which means it comes with some blockchain-specific nuances. In order to finely tune access control, a developer must be able to directly interact with the Tableland registry contract; this holds methods that are abstracted in the `Database` API but also a few new ones.

```js
import { Registry, helpers } from "@tableland/sdk";

const { getContractReceipt } = helpers;

// Pull info from an existing Database instance
const reg = await new Registry(db.config); // Must have a signer

const tx = await reg.create({
  chainId: 31337,
  statement: "create table test_ownership_31337 (id int, name text)",
});
// Helper function to extract table name event information
const receipt = await getContractReceipt(tx);

// List my tables
const results = await reg.listTables(/* default to connected wallet address */);

// Transfer the above table to my friend!
const tx = await reg.safeTransferFrom({
  to: friendAddress,
  tableName: receipt, // Also accepts name as string
});
// Tableland adopts this "wait" style pattern from ethers!
await tx.wait();
```

For more details about the Tableland registry, review the [smart contract docs](/smart-contracts).
