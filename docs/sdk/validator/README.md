---
title: Validator API
description: The Validator API allows for direct access to a Tableland Validator node.
keywords:
  - validator api
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Setting up a validator node connection starts by importing a `Validator`. The methods defined in the [Gateway REST API](/gateway-api/endpoints) are exposed in the SDK, such as checking the `health` of a node or getting a table's name. Note that a validator can use a `Database` instance's `config`, which requires a `baseUrl` param in order to connect to and query a validator node. Alternatively, the SDK's `helpers` module provides a `getBaseUrl` function that can be used to determine the correct URL for a given chain ID.

## Installation

If you haven't already, make sure the SDK is installed in your project:

```bash npm2yarn
npm install @tableland/sdk
```

## Setup

The `Validator` class requires a `baseUrl` param to connect to a validator node. The base URL is one of the following, and the `getBaseUrl` helper function can be used to determine the correct one for your chain:

- `https://tableland.network/api/v1/` (mainnets)
- `https://testnets.tableland.network/api/v1/` (testnets)
- `http://localhost:8080/api/v1/` (local)

All of these examples will use [Local Tableland](/local-tableland), so the chain ID is defined as `31337`, but you can use this on any supported network. There are few ways to set up the `Validator` class. You can use the `forChain` method with a chain ID or ethersjs chain name:

```js
import { Validator } from "@tableland/sdk";

// Pass a chain ID or ethersjs chain name to the `forChain` method
const validator = Validator.forChain(31337); // Replace with your chain ID
```

The `getBaseUrl` helper function can be used to determine the correct URL for your chain:

```js
import { Validator, helpers } from "@tableland/sdk";

// Pass the `getBaseUrl` helper function a chain ID (or ethersjs chain name)
const baseUrl = helpers.getBaseUrl(31337); // Replace with your chain ID
const validator = new Validator({ baseUrl });
```

Or, you can use the `Database` class's `config` to instantiate a `Validator` instance:

```js
import { Database, Validator, helpers } from "@tableland/sdk";

// Instantiate a `Database` instance with a `baseUrl` param; no `signer` needed
const db = new Database({
  baseUrl: helpers.getBaseUrl(31337), // Replace with your chain ID
});

// Pull info from an existing Database instance
const validator = new Validator(db.config);
```

## `isHealthy`

Get health status of a validator node; returns `true` if healthy, `false` otherwise.

```js
// Check health info
const isHealthy = await validator.health();
console.log(isHealthy); // true
```

## `version`

Get version information, returning version information about the validator daemon.

```js
const version = await validator.version();
console.log(version);
```

This will return an object with the following properties:

```js
{
  gitCommit: 'bd7c3ab',
  gitBranch: 'HEAD',
  gitState: 'clean',
  gitSummary: 'v1.9.0',
  buildDate: '2023-11-17T19:07:13Z',
  binaryVersion: 'git'
}
```

## `getTableById`

Get table information by providing an object with `chainId` and `tableId` fields, returning the table's name, schema, and other metadata. Note that `tableId` must be converted to a string.

```js
const tableInfo = await validator.getTableById({
  chainId: 31337,
  tableId: "1", // Must be a string
});
console.log(tableInfo);
```

This will log something like:

```js
{
  name: 'healthbot_31337_1',
  externalUrl: 'http://localhost:8080/api/v1/tables/31337/1',
  animationUrl: 'https://render.tableland.xyz/31337/1.html',
  image: 'https://bafkreifhuhrjhzbj4onqgbrmhpysk2mop2jimvdvfut6taiyzt2yqzt43a.ipfs.dweb.link',
  schema: { columns: [ { name: 'counter', type: 'integer' } ] },
  attributes: [ { displayType: 'date', traitType: 'created', value: 1700348503 } ]
}
```

## `queryByStatement`

Query the Tableland network directly and get the results of a SQL _read_ query (i.e., no writes or creates). The parameters include an object with:

- `statement` (required): The SQL `SELECT` statement to execute.
- `format` (optional): Can be `"objects"` (default) or `"table"`.
- `extract` (optional): A boolean to extract the results.
- `unwrap` (optional): A boolean to unwrap the results.

See the Gateway API's [query formatting](/gateway-api/query-formatting) docs for more information on the optional parameters noted above; the `extract` and `unwrap` are only for special cases with `"objects"`. Here's an example of a simple query that formats the output as either `"objects"` or `"table"`:

<Tabs groupId="formatting">
<TabItem value="objects" label="objects" default>

```js
const query = await validator.queryByStatement({
  statement: "SELECT counter FROM healthbot_31337_1",
  format: "objects", // default
});
console.log(query);
// [
// 	{
// 		counter: 1
// 	}
// ]
```

</TabItem>
<TabItem value="table" label="table">

```js
const query = await validator.queryByStatement({
  statement: "SELECT counter FROM healthbot_31337_1",
  format: "table",
});
console.log(query);
// {
// 	columns: [
// 		{ name: 'counter' }
// 	],
// 	rows: [
// 		[ 1 ]
// 	]
// }
```

</TabItem>
</Tabs>

To use the unwrap & extract functionality, you can target a single column and keep the output as the default "objects" format:

<Tabs groupId="unwrap-extract">
<TabItem value="unwrap-only" label="unwrap only" default>

```js
const query = await validator.queryByStatement({
  statement: "SELECT counter FROM healthbot_31337_1",
  unwrap: true,
});
console.log(query);
// Unwraps the surrounding array
// { counter: 1 }
```

</TabItem>
<TabItem value="extract-only" label="extract only">

```js
const query = await validator.queryByStatement({
  statement: "SELECT counter FROM healthbot_31337_1",
  extract: true,
});
console.log(query);
// Extracts the column value, still wrapped in an array
// [ 1 ]
```

</TabItem>
<TabItem value="unwrap-extract" label="extract only">

```js
const query = await validator.queryByStatement({
  statement: "SELECT counter FROM healthbot_31337_1",
  unwrap: true,
  extract: true,
});
console.log(query);
// Unwrap and extracts the raw column value
// 1
```

</TabItem>
</Tabs>

## `receiptByTransactionHash`

Get transaction status from a create or write transaction hash. The parameters include an object with:

- `chainId`: The chain ID of the transaction.
- `transactionHash`: The transaction hash of the create or write transaction.

```js
const receipt = await validator.receiptByTransactionHash({
  chainId: 31337,
  transactionHash:
    "0x577789da0325fc53bffaa845ba7a24500ccf058d8a3dd001774e8bf118646eb7",
});
console.log(receipt);
```

If the transaction exists, the it'll log table and chain information, meaning, the transaction was seen by the validator:

```js
{
  tableIds: [ '2' ],
  transactionHash: '0x577789da0325fc53bffaa845ba7a24500ccf058d8a3dd001774e8bf118646eb7',
  blockNumber: 14664,
  chainId: 31337
}
```

If the transaction is still pending and has _not_ been seen by the validator, it'll throw a `404` error with `Not found`.

## `pollForReceiptByTransactionHash`

Polls for the status of a given transaction receipt by `chainId` and `transactionHash`, waiting until its complete. See the [polling transactions](/sdk/validator/polling-transactions) docs for more advanced polling usage.

```js
const poll = await validator.pollForReceiptByTransactionHash({
  chainId: 31337,
  transactionHash: 0x577789da0325fc53bffaa845ba7a24500ccf058d8a3dd001774e8bf118646eb7,
});
console.log(poll);
```

This will log the same response as above but will wait for the transaction to complete before returning the response.
