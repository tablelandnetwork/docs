---
title: Helper methods
description: Helpers that come part of the Tableland SDK.
keywords:
  - sdk helpers
---

The page outlines a few of the most useful helper methods exported from the `@tableland/sdk` package. You can find the full suite of methods and types available in the [API Reference](/api/sdk/namespaces/helpers).

## Setup

To use the helpers, you'll need to import them from the SDK:

```js
import { helpers } from "@tableland/sdk";
```

The subsequent examples will show how to call each of these methods on the `helpers` module, such as [`helpers.createPollingController()`](/sdk/helpers/polling-queries). Alternatively, you can import them directly:

```js
import { createPollingController } from "@tableland/sdk/helpers";
```

## `getBaseUrl`

The validator base URL can be retrieved using the `getBaseUrl` method to check what URL should be used when making direct requests to the validator API.

```js
const baseUrl = helpers.getBaseUrl(11155111); // Or pass the ethersjs name, e.g., `sepolia`
// https://testnets.tableland.network/api/v1
```

## `getChainInfo`

The `getChainInfo` method returns the chain information for the current network. This includes the chain name, chain ID, Tableland registry contract address, and validator information (base URL, polling timeout, and polling interval).

```js
const chainInfo = helpers.getChainInfo(11155111); // Or pass the ethersjs name, e.g., `sepolia`
// {
//   chainName: 'sepolia',
//   chainId: 11155111,
//   contractAddress: '0xc50C62498448ACc8dBdE43DA77f8D5D2E2c7597D',
//   baseUrl: 'https://testnets.tableland.network/api/v1',
//   pollingTimeout: 40000,
//   pollingInterval: 1500
// }
```

## `getContractAddress`

To simply get the Tableland registry contract address, you can use the `getContractAddress` method.

```js
const contractAddress = helpers.getContractAddress(11155111); // Or pass the ethersjs name, e.g., `sepolia`
// 0xc50C62498448ACc8dBdE43DA77f8D5D2E2c7597D
```

## `createPollingController`

See the [polling](/sdk/helpers/polling-queries) docs for more information on how to use the `PollingController` object. It's designed to control the polling behavior for `Database` transaction polling and validator query materialization.

## `createSignal`

A `Signal` is a wrapper around the [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) object and an `abort()` method to cancel the signal. It can be used to cancel a request or polling operation.

```js
const signal = helpers.createSignal();
signal.abort(); // Cancels the signal
```

## `extractChainId`

If you have an existing `Database` instance, you can extract the chain ID by passing the `Database` configuration object to the `extractChainId` method.

```js
// Set up a `signer` and pass to the `Database` constructor
const db = new Database({ signer });
const chainInfo = await helpers.extractChainId(db.config);
// 31337
```

## `isTestnet`

The `isTestnet` method can be used to determine if the current network is a testnet, returning true or false based on the chain ID or name.

```js
const isTestnet = helpers.isTestnet(11155111); // Or pass the ethersjs name, e.g., `sepolia`
// true
```

## `overrideDefaults`

You can override the chain and database settings by passing an object with the new values to the `overrideDefaults` method, which only needs to be executed.

```js
helpers.overrideDefaults(1, {
  chainName: "mainnet",
  chainId: 1,
  contractAddress: "0x012969f7e3439a9B04025b5a049EB9BAD82A8C12",
  baseUrl: "https://rpc.flashbots.net",
  pollingTimeout: 30000,
  pollingInterval: 1000,
});
```

## `normalize`

The `@tableland/sqlparser` comes as part of the SDK and can be used to normalize SQL queries. See the full docs on the [SQL parser](/sdk/walkthroughs/sql-parser) for more information, but here's a simple example:

```js
const normalize = (sql) => helpers.normalize(sql);
const statement = `create table my_table ("invalid-$" int)`;
const normalized = await normalize(statement);
// Error: error parsing statement: syntax error at position 31 near '-'
```

## `supportedChains`

You can retrieve an array of all of the chains Tableland supports, along with relative chain information.

```js
const chains = helpers.supportedChains;
// {
//   mainnet: {
//     chainName: 'mainnet',
//     chainId: 1,
//     contractAddress: '0x012969f7e3439a9B04025b5a049EB9BAD82A8C12',
//     baseUrl: 'https://tableland.network/api/v1',
//     pollingTimeout: 40000,
//     pollingInterval: 1500
//   },
//   ...
// ]
```

## `validateTableName`

The `validateTableName` method can be used to validate a table name and extract the prefix, chain ID, and table ID.

```js
const tableParts = await helpers.validateTableName("my_table_31337_2");
// {
//   prefix: 'my_table',
//   chainId: 31337,
//   tableId: 2,
//   name: 'my_table_31337_2'
// }
```
