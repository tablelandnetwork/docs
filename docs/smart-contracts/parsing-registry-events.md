---
title: Parsing events from registry contract calls
sidebar_label: Parsing registry events
description: Parse events from constructor or method calls to another contract—the Tableland registry—to get table details.
keywords:
  - parsing events
  - parsing ethers logs
  - ethers constructor logs
  - smart contract events
---

A common pattern is to have a smart contract create and write to tables. Tableland clients like the CLI and Gateway API have transaction receipt methods to retrieve table information from a transaction hash. However, if you're deploying a contract with ethers and Hardhat, you might want to parse the logs directly to facilitate other logic in your scripts. This can be a bit challenging since the Tableland registry contract emits events that cannot be parsed within your deployed contract's logs; the registry is a standalone contract (i.e., it's not inherited).

## Context

Let's assume you've created a Hardhat project that deploys a smart contract, and in the contract's constructor (or some method), you create a table. The walkthrough for [creating tables from contracts](/smart-contracts/contract-owned-tables) is a good reference. When this occurs, your contract will make a call to the registry's `create` method from within the constructor, and that will trigger a table to be minted as an ERC721 token along with an event. The emitted event has the following ABI:

```md
event CreateTable(address owner, uint256 tableId, string statement)
```

We'll need to parse the deployed contract's transaction receipt to get the table information, and this ABI is needed to properly decode the logs. For example, if you were try to use a method like the SDK's `helpers.getContractReceipt` method or immediately parse `events` from the [`deployed()`](https://docs.ethers.org/v5/api/contract/contract-factory/#ContractFactory-deploy) method, it won't provide the full context. Luckily, the `@tableland/evm` package exports the `TablelandTables` registry's ABI! You'll want to make sure you've installed it before you get started.

```bash npm2yarn
npm install @tableland/evm
```

## Parsing constructor logs for table creation events

In this scenario, the contract you deployed makes subsequent calls the Tableland registry contract in the constructor, and the registry contract is the one that emits the `CreateTable` event. So, without knowing this ABI, `getContractReceipt` or similar won't have any knowledge of the event; separate parsing is required to get the table information from the constructor's logs. The `ITablelandTables__factory` contains the full ABI of the registry, but you could choose to pass a subset of events directly, such as only the `CreateTable` event signature as shown above.

Our Hardhat deployment script—located at `scripts/deploy.js`—should resemble the following:

```js title="scripts/deploy.js"
import { ethers } from "hardhat";
import { ITablelandTables__factory as TablelandTables } from "@tableland/evm";

async function main() {
  // Deploy the Example contract
  const Example = await ethers.getContractFactory("Example");
  const example = await Example.deploy();
  await example.deployed();
  console.log(`Example contract deployed to '${example.address}'.\n`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

The `deploy()` method's result contains a `deployTransaction` field that contains transaction information. First, we'll need to get this transaction's receipt with ethers' `getTransactionReceipt` method, and then we'll use the ABI to set up an interface, helping parse the logs for the `tableId` and other data.

```js title="scripts/deploy.js"
async function main() {
  // Existing code...

  // Let's get the table creation receipt, which contains the table ID
  const deploymentReceipt = await ethers.provider.getTransactionReceipt(
    example.deployTransaction.hash
  );
  // Set up the ABI for the registry contract
  const { abi } = TablelandTables;
  // Create an interface and parse all of the logs for the CreateTable event
  const iface = new ethers.utils.Interface(abi);
  let registryLog;
  for (const log of deploymentReceipt.logs) {
    if (log.topics.includes(iface.getEventTopic("CreateTable"))) {
      registryLog = log;
    }
  }

  // If a CreateTable event exists, parse the log to get the table ID
  if (registryLog) {
    // Get the table's ID emitted from the event
    const logParsed = iface.parseLog(registryLog);
    const { owner, tableId } = logParsed.args;
    console.log(`Table owner '${owner}' minted table ID '${tableId}'`);
  }
}
```

### Getting the full table name

You can use the SDK's `Validator` class to get additional table information by its table ID, including the table's full name. Start by importing this class as well as the `helpers` module. We'll set up a validator connection to the connected chain, and then the validator's `getTableById` method will provide the table's name.

```js title="scripts/deploy.js"
async function main() {
  // Existing code...

  // If a CreateTable event exists, parse the log to get the table ID and name
  if (registryLog) {
    // Get the table's ID emitted from the event
    const logParsed = iface.parseLog(registryLog);
    const { owner: tableOwner, tableId } = logParsed.args;
    console.log(`Table owner '${tableOwner}' minted table ID '${tableId}'`);
    // highlight-start
    // Now, let's get the full table name by querying a validator
    const [account] = await ethers.getSigners(); // Set up a signer
    const chainId = await account.getChainId(); // Get the signer's chain ID so the validator knows the chain
    const val = new Validator({
      baseUrl: helpers.getBaseUrl(chainId), // Gets the validator baseURL for either local, testnet, or mainnet
    });
    const { name } = await val.getTableById({
      chainId,
      tableId: tableId.toString(), // This API requires a string, not a number
    });
    console.log(`Table name: '${name}'`); // The full name table in the format `{prefix}_{chainId}_{tableId}`
    // highlight-end
  }
}
```

Note that it doesn't take into account multiple `CreateTable` events, but it's a good starting point.

## Parsing logs for table mutation events

If you're looking to decode logs in a similar setup where some contract calls the registry's `mutate` method, there will be a `RunSQL` event emitted for table mutations. The only changes needed are the following, primarily, replacing `CreateTable` with `RunSQL` and small tweaks on the input transaction and logging:

```js title="scripts/deploy.js"
import { ethers } from "hardhat";
import { Validator, helpers } from "@tableland/sdk";
import { ITablelandTables__factory as TablelandTables } from "@tableland/evm";

async function main() {
  // Deploy the Example contract
  const Example = await ethers.getContractFactory("Example");
  const example = await Example.deploy();
  await example.deployed();
  console.log(`Example contract deployed to '${example.address}'.\n`);

  // Here's a dummy method that calls the registry's `mutate` method under the hood
  // highlight-start
  const tx = await example.callSomeMutatingMethod();
  await tx.wait();
  // highlight-end

  // Let's get the table mutation receipt, which contains the caller and table ID
  const deploymentReceipt = await ethers.provider.getTransactionReceipt(
    // highlight-next-line
    tx.hash
  );
  // Set up the ABI for the registry contract
  const { abi } = TablelandTables;
  // Create an interface and parse all of the logs for the RunSQL event
  const iface = new ethers.utils.Interface(abi);
  let registryLog;
  for (const log of deploymentReceipt.logs) {
    // highlight-next-line
    if (log.topics.includes(iface.getEventTopic("RunSQL"))) {
      registryLog = log;
    }
  }

  // If a RunSQL event exists, parse the log to get the caller and table ID
  if (registryLog) {
    // Get the table's ID emitted from the event
    const logParsed = iface.parseLog(registryLog);
    // highlight-start
    const { caller, tableId } = logParsed.args;
    console.log(`Mutation by '${caller}' for table ID '${tableId}'`);
    // highlight-end
    // Now, let's get the full table name by querying a validator
    const [account] = await ethers.getSigners(); // Set up a signer
    const chainId = await account.getChainId(); // Get the signer's chain ID so the validator knows the chain
    const val = new Validator({
      baseUrl: helpers.getBaseUrl(chainId), // Gets the validator baseURL for either local, testnet, or mainnet
    });
    const { name } = await val.getTableById({
      chainId,
      tableId: tableId.toString(), // This API requires a string, not a number
    });
    console.log(`Table name: '${name}'`); // The full name table in the format `{prefix}_{chainId}_{tableId}`
  }
}
```
