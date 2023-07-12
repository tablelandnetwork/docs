---
title: Validator API
sidebar_label: Overview
description: The Validator API allows for direct access to a Tableland Validator node. This does not involve any on-chain actions and directly connects to a validator node.
keywords:
  - validator api
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Setting up a validator node connection starts by importing a `Validator`. The methods defined in the [Gateway REST API](/gateway-api/endpoints) are exposed in the SDK, such as checking the `health` of a node or getting a table's name. Note that a validator uses a `Database` instance's `config`, which requires a `baseUrl` param in order to connect to and query a validator node.

```js
import { Database, Validator } from "@tableland/sdk";
import { getBaseUrl } from "@tableland/sdk/helpers";

// Instantiate a `Database` instance with a `baseUrl` param; no `signer` needed
const db = new Database({
  baseUrl: getBaseUrl(31337), // Replace with your chain ID
});

// Pull info from an existing Database instance
const validator = await new Validator(db.config);
// Check health info
const isHealthy = await validator.health();
console.log(isHealthy); // true

const { name, schema } = await validator.getTableById({
  chainId: 31337,
  tableId: "1",
});
console.log(name); // healthbot_31337_1
console.log(schema);
/*
{
	columns: [
		{
			name: "counter",
			type: "integer",
		},
	],
}
*/
```

## Polling for table changes

You can watch for table changes by setting up polling on a validator node. The general flow requires setting up a `Database` and `Validator` connection, defining an instance of [`AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController), and using `pollForReceiptByTransactionHash` to check for changes based on the transaction hash generated by an on-chain action.

<Tabs groupId="sdk">
<TabItem value="js" label="JavaScript" default>

```js
const db = new Database({
  signer,
  baseUrl: helpers.getBaseUrl(chainId),
});
// Connect to a Tableland validator node (used for some specific APIs)
const validator = new Validator(db.config);
// Create a controller & signal to help abort the pending tx request, once
// it is fulfilled.
const controller = new AbortController();
const signal = controller.signal;
// Poll the validator on a specific chain at a specific tx hash, where the
// `interval` is in milliseconds. Then, clear the pending tx from state.
validator
  .pollForReceiptByTransactionHash(
    {
      chainId: chainId,
      transactionHash: pendingWriteTx,
    },
    { interval: 500, signal }
  )
  .then((_) => {
    clearPendingTxAndRefresh();
  })
  .catch((_) => {
    clearPendingTxAndRefresh();
  });
return () => {
  controller.abort();
};
```

</TabItem>
<TabItem value="ts" label="TypeScript" default>

```ts
const db = new Database({
  signer,
  baseUrl: helpers.getBaseUrl(chainId!),
});
// Connect to a Tableland validator node (used for some specific APIs)
const validator = new Validator(db.config);
// Create a controller & signal to help abort the pending tx request, once
// it is fulfilled.
const controller = new AbortController();
const signal = controller.signal;
// Poll the validator on a specific chain at a specific tx hash, where the
// `interval` is in milliseconds. Then, clear the pending tx from state.
validator
  .pollForReceiptByTransactionHash(
    {
      chainId: chainId!,
      transactionHash: pendingWriteTx!,
    },
    { interval: 500, signal }
  )
  .then((_) => {
    clearPendingTxAndRefresh();
  })
  .catch((_) => {
    clearPendingTxAndRefresh();
  });
return () => {
  controller.abort();
};
```

</TabItem>
</Tabs>