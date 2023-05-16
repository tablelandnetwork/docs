---
title: Using Remix
description: An online IDE that makes it easy to tinker with and deploy smart contracts.
keywords:
  - remix
---

import injectedProvider from "@site/static/assets/smart-contracts/using-remix/2.png";
import setController from "@site/static/assets/smart-contracts/using-remix/6.png";
import verfiyingContract from "@site/static/assets/smart-contracts/using-remix/7.png";
import blockExplorer from "@site/static/assets/smart-contracts/using-remix/8.png";
import verifiedContract from "@site/static/assets/smart-contracts/using-remix/9.png";
import remixdImg from "@site/static/assets/smart-contracts/using-remix/remixd.png";

[Remix](https://remix.ethereum.org/) is a useful tool whenever you need to test out Solidity contracts locally, curiously inspect gas costs, or even deploy actual contracts to live chain deployments.

## Understanding Remix

Let’s review the primary capabilities:

1. [File explorer](https://remix-ide.readthedocs.io/en/latest/file_explorer.html)—Create workspaces and files.
2. File search—Search for files.
3. [Compiler](https://remix-ide.readthedocs.io/en/latest/compile.html)—Compiles the desired smart contracts (if possible, try for at least `0.8.12` since this introduced [string concatenation bug fixes](https://blog.soliditylang.org/2022/02/16/solidity-0.8.12-release-announcement/), which is used in writing SQL).
4. [Deployer](https://remix-ide.readthedocs.io/en/latest/run.html)—Deploy and interact / transact with contracts.

![](@site/static/assets/smart-contracts/using-remix/1.png)

There are also a number of useful plugins that you could choose to install, including:

- [Debugger](https://remix-ide.readthedocs.io/en/latest/debugger.html)—Helps when debugging contracts.
- [Solhint Linter](https://protofire.github.io/solhint/docs/rules.html)—Shows linting errors that can help with compilation issues.
- [Solidity Unit Testing](https://remix-ide.readthedocs.io/en/latest/unittesting.html)—Write & run unit tests in Solidity.
- [Flattener](https://github.com/bunsenstraat/flattener)—Used for manual contract verification on block explorers.

## Creating & deploying on Remix

When doing quick development in Remix, the most typical pattern is to:

1. Create a workspace.
2. Create a contract (or many of them).
3. Compile.
4. Deploy.

The first two steps are straightforward; simply, click the _Create Workspace_ button, and after creating one, click the _New File_ button and create a smart contract (`.sol` extension).

It's a lot easier to use Local Tableland to develop locally. To do this with Remix, you'll have to deploy the registry contract since it doesn't exist, yet, and all you're doing is contract-only interactions. Note that if you were to use a live testnet, this wouldn't be needed.

Thus, you’ll want to import and copy / paste the required [Tableland smart contracts](https://github.com/tablelandnetwork/evm-tableland/tree/main/contracts), write your custom smart contract, and compile them separately (with a version that matches the _pragma_ in the file). Lastly, the contract deployment defaults to a local testnet (_Remix VM_), but you can select _Injected Provider_ to use a wallet provider and deploy contracts to testnets or mainnets. The _Injected Provider_ leverages your actual wallet’s accounts.

<img src={injectedProvider} width='60%' />

### Using `TablelandTables` locally

For local development environment setup, please ensure the following contracts are created in the same directory.

1. `TablelandTables.sol`
2. `ITablelandTables.sol`
3. `ITablelandController.sol`

Thus, your environment should resemble the following—but _creating_ the contracts noted above is only needed if you plan to do local environment testing where you call the registry contract.

![](@site/static/assets/smart-contracts/using-remix/3.png)

Separately, your custom smart contract may look like the following, where it instantiates and subsequently calls the registry using an interface `ITablelandTables`. Namely, contracts are imported from `@tableland/evm`, and you can also choose to import `@openzeppelin/contracts` and `ERC721Holder` for smart contract owned NFTs. The `TablelandDeployments` makes calling the contract easy.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol"; // Required for contracts to receive ERC721 tokens
import "@tableland/evm/contracts/utils/TablelandDeployments.sol";

contract CallingTablelandTables is ERC721Holder {

    function create() public payable {
        TablelandDeployments.get().create(/* do create logic */);
    }

    function writeToTable() public payable {
        TablelandDeployments.get().mutate(/* do write logic */);
    }
}
```

When deploying, first compile & push the `TablelandTables` contract, and note its address. Then, compile & deploy the custom `CallingTablelandTables`, passing that address to it.

![](@site/static/assets/smart-contracts/using-remix/4.png)

The process of compiling, deploying, and calling is very useful when writing quick & dirty contracts for testing some Tableland contract interactions.

### Using a `TablelandController`

A much simpler Remix use case is to deploy a `TablelandController` contract. This could follow the same design above—just create a new contract that imports and implements the `ITablelandController`. For detailed information on the controller, please read the documentation on configuring table write access.

Let’s also take the use case where you want to quickly deploy a controller without the additional setup work. This is all that’s required:

1. Create a contract.
2. Import `ITablelandController.sol`; optionally, the `Policies` library.
3. Implement `ITablelandController` and its `Policy` functionality.
4. Compile & deploy.

For example, the following shows an "allow all inserts" controller, which means that _any_ address can insert into the table, but the update and delete policies are set to `false` to prevent table alterations. The main requirement is to implement the `getPolicy` method and return the desired `Policy` object.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@tableland/evm/contracts/ITablelandController.sol";
import "@tableland/evm/contracts/policies/Policies.sol"; // Optional

contract AllowAllInsertController is ITablelandController {
    function getPolicy(address)
        public
        payable
        override
        returns (ITablelandController.Policy memory)
    {
        return
            ITablelandController.Policy({
                allowInsert: true,
                allowUpdate: false,
                allowDelete: false,
                whereClause: Policies.joinClauses(new string[](0)), // Can use an empty string, instead: `""`
                withCheck: "", // Example using an empty string vs. the `Policies` library
                updatableColumns: new string[](0) // Must be a string array; this one is empty
            });
    }
}
```

From there, you can deploy this contract to a live testnet—the example below pushes this contract to Polygon Mumbai and logs some useful information:

- Transaction hash: [0x74ec88ad290625c8c17fc601f4431e5ee1b6277290ab6b69b277273b58c02499](https://mumbai.polygonscan.com/tx/0x74ec88ad290625c8c17fc601f4431e5ee1b6277290ab6b69b277273b58c02499)
- Contract address (bottom left corner): [0x966b2E6615962cdeeD891323e66504B6C3214cB1](https://mumbai.polygonscan.com/address/0x966b2E6615962cdeeD891323e66504B6C3214cB1)

![An example of sending an on-chain testnet transaction and deploying the controller contract.](@site/static/assets/smart-contracts/using-remix/5.png)

An example of sending an on-chain testnet transaction and deploying the controller contract.

### Setting the controller

You can then use tools like Etherscan to manually call the smart contract’s [`setController`](https://mumbai.polygonscan.com/address/0x4b48841d4b32C4650E4ABc117A03FE8B51f38F68#writeProxyContract#F12) method from a UI. Alternatively, this same method is made available in direct smart contract calls, SDK, and CLI.

<img src={setController} width='60%' />

Here, we set the controller to `0x966b2E6615962cdeeD891323e66504B6C3214cB1` (transaction hash [here](https://mumbai.polygonscan.com/tx/0x802d7ded8537fc92b683357b932d17090cac7dc3ebda3df720c40b7590130a22), for reference) for the table `tbl_calls_80001_1887` (i.e., _tableId_ is `1887`), owned by the address `0x9bA89c8aD3856C0137E268bD76ed12d14696E140`.

You can test it out yourself—try and successfully insert some row into `tbl_calls_80001_1887` but updates or deletes will fail! You could try the following by replacing `<your_address>` with your address or some message string, and then view the results [via a read query](https://testnets.tableland.network/api/v1/query?statement=select%20*%20from%20tbl_calls_80001_1887).

```sql
INSERT INTO
    tbl_calls_80001_1887 (message)
VALUES
    ('0xYOUR_EVM_ADDRESS');
```

## Verifying Remix contracts

There does exist an Etherscan Remix verification tool, which requires an API key from the Etherscan website. As an alternative, the [flattener](https://github.com/bunsenstraat/flattener) plugin can be used to create a single flat Solidity file; this can be used to verify a contract manually.

1. Navigate to _Verify & Publish_ on the block explorer where `<0x_contract_address>` should be replaced with the deployed contract’s address and fill out the required information.

   ```markdown
   https://mumbai.polygonscan.com/verifyContract?a=<0x_contract_address>
   ```

   - _Please select Compiler Type_ ⇒ _Solidity (Single Part)_.
   - _Please select Compiler Version_ ⇒ Whatever was used for compilation, e.g., `*v0.8.12+commitf00d7308*`.
   - _Please select Open Source License Type_ ⇒ Often, it’ll be _MIT License (MIT)._
   - Click _Continue_

2. Back in Remix, navigate to the installed _Flattener_ plugin, click _Flatten_ (while your screen is opened / highlighting the desired contract), click _Save_, and then copy the flattened file to your clipboard.

    <img src={verfiyingContract} width='60%' />

   An example of how to manually flatten a file for contract verification purposes.

3. Back in the block explorer, paste the flattened file in the text area (_Enter the Solidity Contract Code below_), and then click _Verify & Publish._

<img src={blockExplorer} width='60%' />

4. Contract is verified and easily readable! See it [here](https://mumbai.polygonscan.com/address/0x966b2E6615962cdeeD891323e66504B6C3214cB1#code).

<img src={verifiedContract} width='60%' />

## Connecting local projects to Remix

A nice npm package called [`@remix-project/remixd`](https://www.npmjs.com/package/@remix-project/remixd) allows you to connect to Remix _from your local project._ For example, let’s say you’ve spun up a [hardhat](https://hardhat.org/) project (or some local folder with `.sol` files) from your machine. With a simple command, you can open that project up on Remix and interact with the contract directly in the Remix UI!

1. Install `remixd`.

   ```bash npm2yarn
   npm install -g @remix-project/remixd
   ```

2. From the root of your project’s directory, connect to remix.

   ```bash
   remixd -s . -u https://remix.ethereum.org
   ```

3. On Remix, connect to `localhost`, and then you’ll have access to your project and can deploy everything using Remix (e.g., using hardhat accounts or injected providers)!

<img src={remixdImg} width='60%' />
