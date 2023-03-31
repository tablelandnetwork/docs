---
title: Contract owned tables
description: Learn how to create tables from and owned by a smart contract.
keywords:
  - create table
---

Developers can leverage smart contract calls to the `TablelandTables` [registry smart contract](/smart-contracts/deployed-contracts) for chain-based table creation. There is one major callout to implement:

- The creating contract **must be able to receive** an ERC721 token.

Namely, please be sure to implement a way for the contract to receive the ERC721 token that is minted & sent by the `TablelandTables` registry contract. Two common paths to achieve this include:

- Inherit the `ERC721Holder` contract, provided by OpenZeppelin.
- Implement the underlying `IERC721Receiver` and its `onERC721Received` function.

Without this implementation, your contract will revert when trying to create tables since it is unable receive the corresponding token.

## Implementation

For those opting to inherit from the `ERC721Holder`, please be sure to review the specification on OpenZeppelin for more information. If possible, try for at least solc `0.8.12` since this introduced [string concatenation bug fixes](https://blog.soliditylang.org/2022/02/16/solidity-0.8.12-release-announcement/), which is used in writing SQL.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@tableland/evm/contracts/utils/TablelandDeployments.sol";

contract BasicCreate is ERC721Holder {
    // Implement logic to create a table using `TablelandDeployments.get().createTable(...)`
    // Note: `onERC721Received` is implemented by `ERC721Holder`
}
```

Alternatively, you may wish to use `IERC721Receiver` and implement `onERC721Received` yourself:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@tableland/evm/contracts/utils/TablelandDeployments.sol";

contract BasicCreate is IERC721Receiver {
    // Implement logic to create a table using `TablelandDeployments.get().createTable(...)`

    function onERC721Received(address, address, uint256, bytes calldata) external pure returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }
}
```

## Example

Let’s walk through an example with `ERC721Holder` since `IERC721Receiver` is rather similar. This is a simple smart contract that calls the Tableland registry smart contract and mints a table. Upon minting a table, there is a mapping that tracks `tableName`s to their corresponding `tableId`s, but this is purely for demonstration purposes. Alternatively, you may want to store the `tableName` and `tableId` as storage variables if you anticipate only needing to mint and use a select few tables.

Put differently, the contract below is a table factory that simply mints tables, but your app will likely have a specific set of tables it needs to use, and that’s it. You might want to replace the `tables` mapping with its components, `tableName` and `tableId`, or something similar.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@tableland/evm/contracts/utils/TablelandDeployments.sol";

contract BasicCreate is ERC721Holder {
	// A mapping that holds `tableName` and its `tableId`
    mapping(string => uint256) public tables;

    function create(string memory prefix) public payable {
        uint256 tableId = TablelandDeployments.get().createTable(
            address(this),
            /*
            *  CREATE TABLE {prefix}_{chainId} (
            *    id integer primary key,
            *    message text
            *  );
            */
            string.concat(
                "CREATE TABLE ",
                prefix,
                "_",
                Strings.toString(block.chainid),
                " (id integer primary key, message text);"
            )
        );

        string memory tableName = string.concat(
            prefix,
            "_",
            Strings.toString(block.chainid),
            "_",
            Strings.toString(tableId)
        );

        tables[tableName] = tableId;
    }
}
```

The contract can now call the Tableland registry and mint tables. Note the usage of `address(this)`. The `TablelandTables` contract has a `createTable` function that takes an address called `owner` as the first parameter. It simply mints a TABLE ERC721 token to this owner — which is the contract since `address(this)` was passed.

It’s possible that a developer will choose to pass the address of some function caller’s address, like `msg.sender`, instead of having the contract itself be the owner via `address(this)`. Here, it would eliminate the need for inheriting `ERC721Holder` or `IERC721Receiver` since the contract would, thus, be acting as a passthrough to the Tableland registry contract and never actually receives an ERC721 token. It’d be minted right to `msg.sender`.
