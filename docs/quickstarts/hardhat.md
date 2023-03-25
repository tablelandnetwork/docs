---
title: Hardhat
description: Use Tableland smart contracts with Hardhat.
keywords:
  - hardhat
---

[Hardhat](https://hardhat.org/) is an EVM development platform that comes packed with plenty of tools to get up and running. Using `npx`, you can quickly spin up a project with starter contracts and scripts to help deploy your application. This will quickly walk through Hardhat-specific usage, but do review the more detailed [quickstart](smart-contract-quickstart) or general [smart contract documentation](/smart-contracts) for creating and mutating tables.

## 1. Installation & setup

Create a folder and then `cd` into it to set up a Hardhat app. Follow the starter steps by choosing a project type (JavaScript, TypeScript, or empty) and other configurations.

```bash
npx hardhat
```

Then, install `@tableland/evm` as a dependency—optionally, `@openzeppelin/contracts`'s `Strings` are also useful.

```bash
npm install --save @tableland/evm @openzeppelin/contracts
```

Tableland also has a useful `@tableland/hardhat` development dependency that can be used when developing locally. It extends the `HardhatUserConfig` object with an optional `localTableland` field of type `Config`, which allows you to configure how Local Tableland (local Hardhat + Tableland node) will run.

```bash
npm install --save-dev @tableland/hardhat
```

Under `contracts`, find the `Lock` contract (remove its code) and import `TablelandDeployments` and `SQLHelpers` from `@tableland/evm`. A `_tableId` can be used to track the minted table.

```solidity title="contracts/Lock.sol"
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// highlight-start
import "@tableland/evm/contracts/utils/TablelandDeployments.sol";
import "@tableland/evm/contracts/utils/SQLHelpers.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
// highlight-end

contract Lock {
  // highlight-start
  // The table token ID, assigned upon `TablelandTables` minting a table
  uint256 private _tableId;
  // Table prefix for the table (custom value)
  string private constant _TABLE_PREFIX = "my_hardhat_table";
  // highlight-end
}

```

## 2. Create & insert to a table

Create a table that is sent to the caller (`msg.sender`)—note that if you want the _contract_ to own the table, you'll have to implement [contract ERC721 ownership](/quickstarts/smart-contract-quickstart#5-add-contract-table-ownership).

```solidity title="contracts/Lock.sol"
contract Lock {
  uint256 private _tableId;
  string private constant _TABLE_PREFIX = "my_hardhat_table";

  // Add a constructor that creates and inserts data
  constructor() {
    _tableId = TablelandDeployments.get().createTable(
    msg.sender,
    SQLHelpers.toCreateFromSchema(
      "id integer primary key," // Notice the trailing comma
      "val text",
      _TABLE_PREFIX
    ));

    TablelandDeployments.get().runSQL(
      address(this),
      _tableId,
      SQLHelpers.toInsert(
        _TABLE_PREFIX,
        _tableId,
        "id,val",
        string.concat(
          Strings.toString(1), // Convert to a string
          ",",
          SQLHelpers.quote("Bobby Tables") // Wrap strings in single quotes with the `quote` method
        )
      )
    );
  }
}
```

## 3. Adjust config & script

With `@tableland/hardhat`, you should import the plugin in your `hardhat.config.js` and adjust the object:

```js
require("@nomicfoundation/hardhat-toolbox");
// highlight-next-line
require("@tableland/hardhat");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  // highlight-start
  localTableland: {
    silent: false,
    verbose: false,
  },
  // highlight-end
};
```

Navigate to the `scripts` directory and find the `deploy.js` script. Some slight alterations are needed to reflect the changes above.

```js title="scripts/deploy.js"
const hre = require("hardhat");

// highlight-start
async function main() {
  const Lock = await hre.ethers.getContractFactory("Lock");
  const lock = await Lock.deploy();

  await lock.deployed();
  console.log(`Lock deployed to ${lock.address}`);
}
// highlight-end

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

## 4. Start a node & deploy locally

Start a Hardhat and Local Tableland node:

```bash
npx hardhat node --network local-tableland
```

Now that nodes are running, you can deploy your contract. This will create and write tables using the Hardhat node, and then the Local Tableland node will materialize emitted SQL events and allow for read queries at the HTTPS gateway.

```bash
npx hardhat run scripts/deploy.js --network local-tableland
```

It should print some deployment information:

```md
Lock deployed to 0x98dd705fBD9B12B90b8C997afd0362EB7a9fbe37
```

## 5. Deploy to live networks

If you want to deploy to a testnet or mainnet chain, you'll need to adjust the `--network` flag, which pulls information from the `hardhat.config.js` file. For example, you could add Ethereum `goerli` as a network. To do this, you'll have to use a provider like [Alchemy](https://www.alchemy.com/) with some account variables.

```js title="hardhat.config.js"
// highlight-start
const ALCHEMY_API_KEY = "API_KEY";
const GOERLI_PRIVATE_KEY = "GOERLI_PRIVATE_KEY";
// highlight-end

module.exports = {
  // ...
  // highlight-start
  networks: {
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY],
    },
  },
  // highlight-end
};
```

This will allow you to deploy to a live network:

```bash
npx hardhat run scripts/deploy.js --network goerli
```
