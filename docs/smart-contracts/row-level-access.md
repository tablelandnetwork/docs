---
title: Row-level access controls
description: Create a table with row-level guards on who can update specific columns.
keywords:
  - row-level access
  - controller
---

If you're creating a shared table, it's useful to gate row-level access controls such that only a specific set of users can mutate a row. This setup is quite flexible since controller logic can be anything that's written in a smart contract, but let's take a simple example with [OpenZeppelin's access control](https://docs.openzeppelin.com/contracts/2.x/access-control) framework and making checks on the table data.

## Setup

First, install the OpenZeppelin and Tableland contracts:

```bash
npm install @openzeppelin/contracts @tableland/evm
```

Your contract should import the OpenZeppelin `Ownable` and `Strings` contracts as well Tableland utilities for simpler SQL-in-Solidity syntax. We'll also have the contract create a table during deployment for demonstration purposes, so `onERC721Received` is required for the contract to receive an ERC721 TABLE token. The table has the schema `id integer primary key, address text, val text` and will store a user's address with a custom message.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.10 <0.9.0;

import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC721Receiver} from "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import {TablelandDeployments} from "@tableland/evm/contracts/utils/TablelandDeployments.sol";
import {SQLHelpers} from "@tableland/evm/contracts/utils/SQLHelpers.sol";

contract Example is Ownable {
  	// Store relevant table info
    uint256 private tableId; // Unique table ID
    string private constant _TABLE_PREFIX = "access_control"; // Custom table prefix

    // Constructor that creates a simple table with a an `id` and `val` column
    constructor() {
        // Create a table
        tableId = TablelandDeployments.get().create(
            address(this),
            SQLHelpers.toCreateFromSchema(
                "id integer primary key,"
                "address text,"
                "val text",
                _TABLE_PREFIX
            )
        );
    }

    // Needed for the contract to own a table
    function onERC721Received(address, address, uint256, bytes calldata) external pure returns (bytes4) {
      return IERC721Receiver.onERC721Received.selector;
    }
}
```

## Contract methods

Let's create a way for this contract to insert data into the table. We'll create a simple `insertIntoTable` method that allows anyone to insert a row into the table, but the `updateTable` method will gate row-level access so that only the one who inserted the row can update it (by checking the `address` column is the same as the caller).

```solidity
contract Example is Ownable {
  	// Store relevant table info
    uint256 private tableId; // Unique table ID
    string private constant _TABLE_PREFIX = "access_control"; // Custom table prefix

    // Other methods here...

    // highlight-start
    // Let anyone insert into the table
    function insertIntoTable(string memory val) external {
        TablelandDeployments.get().mutate(
            address(this), // Table owner, i.e., this contract
            tableId,
            SQLHelpers.toInsert(
                _TABLE_PREFIX,
                tableId,
                "address,val",
                string.concat(
                    SQLHelpers.quote(Strings.toHexString(msg.sender)), // Insert the caller's address
                    ",",
                    SQLHelpers.quote(val) // Wrap strings in single quotes with the `quote` method
                )
            )
        );
    }
    // highlight-end

    // highlight-start
    // Update only the row that the caller inserted
    function updateTable(string memory val) external {
        // Set the values to update
        string memory setters = string.concat("val=", SQLHelpers.quote(val));
        // Specify filters for which row to update
        string memory filters = string.concat("address=", SQLHelpers.quote(Strings.toHexString(msg.sender)));
        // Mutate a row at `address` with a new `val`—gating for the correct row is handled by the controller contract
        TablelandDeployments.get().mutate(
            address(this),
            tableId,
            SQLHelpers.toUpdate(_TABLE_PREFIX, tableId, setters, filters)
        );
    }
    // highlight-end
}
```

Once we deploy the controller, we'll call the `setAccessControl` to apply the controller to the table. This will allow us to use the `onlyOnly` modifier to ensure this `Example.sol` contract's owner (i.e., the account that deployed it) is the only one that can change the controller.

```solidity
contract Example is Ownable {
  	// Store relevant table info
    uint256 private tableId; // Unique table ID
    string private constant _TABLE_PREFIX = "access_control"; // Custom table prefix

    // Other methods here...

    // highlight-start
    // Set the ACL controller to enable row-level writes with dynamic policies
    function setAccessControl(address controller) external onlyOwner {
      TablelandDeployments.get().setController(
          address(this), // Table owner, i.e., this contract
          tableId,
          controller // Set the controller address—a separate controller contract
      );
    }
    // highlight-end
}
```

## Row-level controller

We'll create a framework for the controller on this contract-owned table. This will be a simple contract that does two things when some calls the `insertIntoTable` or `updateTable` methods:

- If the caller is the contract's owner, let the account do anything.
- If the caller is not the contract's owner, let anyone insert a row.
- If the caller is not the contract's owner, only let the account mutate rows that they inserted.

We'll assume the owner here is the same one that's deploying the `Example.sol` contract and use `Ownable` again. There are better ways to do this via an interface to the `Example.sol` contract and calling `owner()` to get the owner's address, but this is just for demonstration purposes. The contract will establish a `whereClause` and `updatableColumns` to gate write access such that anyone can write, but only the caller can update the `val` column based on the corresponding `address` column in the table; it must match the caller's address.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.10 <0.9.0;

import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {SQLHelpers} from "@tableland/evm/contracts/utils/SQLHelpers.sol";
import {TablelandController} from "@tableland/evm/contracts/TablelandController.sol";
import {TablelandPolicy} from "@tableland/evm/contracts/TablelandPolicy.sol";
import {Policies} from "@tableland/evm/contracts/policies/Policies.sol";

contract RowController is TablelandController, Ownable {
    function getPolicy(
        address caller,
        uint256
    ) public payable override returns (TablelandPolicy memory) {
        // Return allow-all policy if the caller is the owner
        if (caller == owner()) {
            return
                TablelandPolicy({
                    allowInsert: true,
                    allowUpdate: true,
                    allowDelete: true,
                    whereClause: "",
                    withCheck: "",
                    updatableColumns: new string[](0)
                });
        }

        // For all others, we'll let anyone insert but have controls on the update
        // First, establish WHERE clauses (i.e., where the address it the caller)
        string[] memory whereClause = new string[](1);
        whereClause[0] = string.concat(
            "address=",
            SQLHelpers.quote(Strings.toHexString(caller))
        );

        // Restrict updates to a single `val` column
        string[] memory updatableColumns = new string[](1);
        updatableColumns[0] = "val";

        // Now, return the policy that gates by the WHERE clause & updatable columns
        // Note: insert calls won't need to check these additional parameters; they're just for the updates
        return
            TablelandPolicy({
                allowInsert: true,
                allowUpdate: true,
                allowDelete: false,
                whereClause: Policies.joinClauses(whereClause),
                withCheck: "",
                updatableColumns: updatableColumns
            });
    }
}
```

## Putting it all together

First, deploy both the `Example.sol` and `RowController.sol` contracts. Then, have the owner of these contracts call `setAccessControl`, passing the address of `RowController.sol` as a parameter. Note that you _could_ choose to have `Example.sol` also be the controller, but we've separated them in this walkthrough for clarity.

Now, you can test out the functionality! If any account calls `insertIntoTable`, their value will be added to the table. Upon calling `updateTable`, a few things will be checked:

- If the caller is the owner, the policy will return "allow all" permissions—inserts, updates, and deletes are all possible.
- If the caller is not the owner and an insert is attempted, the policy will return "allow all inserts" permissions—any address can add a row to the table with a custom "val" message.
- If the caller is not the owner and an update is attempted, the policy will set the WHERE clause (only update rows where the `address` column matches the caller's address) and the updatable columns (only update the `val` column).
- If the caller is not the owner and a deletion is attempted, nothing will happen.

You can imagine more complex workflows like gating with NFT ownership or onchain balances, but this should provide a starting point for how to gate row-level access controls! For replicating this setup, you can use the controller contract noted above, and the full `Example.sol` contract is below:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.10 <0.9.0;

import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC721Receiver} from "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import {TablelandDeployments} from "@tableland/evm/contracts/utils/TablelandDeployments.sol";
import {SQLHelpers} from "@tableland/evm/contracts/utils/SQLHelpers.sol";

contract Example is Ownable {
    // Store relevant table info
    uint256 private tableId; // Unique table ID
    string private constant _TABLE_PREFIX = "access_control"; // Custom table prefix

    // Constructor that creates a simple table with a an `id` and `val` column
    constructor() {
        // Create a table
        tableId = TablelandDeployments.get().create(
            address(this),
            SQLHelpers.toCreateFromSchema(
                "id integer primary key,"
                "address text,"
                "val text",
                _TABLE_PREFIX
            )
        );
    }

    // Let anyone insert into the table
    function insertIntoTable(string memory val) external {
        TablelandDeployments.get().mutate(
            address(this), // Table owner, i.e., this contract
            tableId,
            SQLHelpers.toInsert(
                _TABLE_PREFIX,
                tableId,
                "address,val",
                string.concat(
                    SQLHelpers.quote(Strings.toHexString(msg.sender)), // Insert the caller's address
                    ",",
                    SQLHelpers.quote(val) // Wrap strings in single quotes with the `quote` method
                )
            )
        );
    }

    // Update only the row that the caller inserted
    function updateTable(string memory val) external {
        // Set the values to update
        string memory setters = string.concat("val=", SQLHelpers.quote(val));
        // Specify filters for which row to update
        string memory filters = string.concat(
            "address=",
            SQLHelpers.quote(Strings.toHexString(msg.sender))
        );
        // Mutate a row at `address` with a new `val`—gating for the correct row is handled by the controller contract
        TablelandDeployments.get().mutate(
            address(this),
            tableId,
            SQLHelpers.toUpdate(_TABLE_PREFIX, tableId, setters, filters)
        );
    }

    // Set the ACL controller to enable row-level writes with dynamic policies
    function setAccessControl(address controller) external onlyOwner {
        TablelandDeployments.get().setController(
            address(this), // Table owner, i.e., this contract
            tableId,
            controller // Set the controller address—a separate controller contract
        );
    }

    // Needed for the contract to own a table
    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external pure returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }
}
```

### Hardhat deployment

To demonstrate how this might look in a Hardhat project, here's an example script that deploys the contract, sets the control, and then does a test insert and update. Note that you can use the Tableland SDK, CLI, or Gateway APIs to check if the table data was mutated correctly.

```javascript
import { ethers } from "hardhat";

async function main() {
  // Deploy the Example contract
  const Example = await ethers.getContractFactory("Example");
  const example = await Example.deploy();
  await example.deployed();
  console.log(`Example contract deployed to '${example.address}'.\n`);

  // Deploy the RowController contract
  const RowController = await ethers.getContractFactory("RowController");
  const rowController = await RowController.deploy();
  await rowController.deployed();
  console.log(`Controller contract deployed to '${rowController.address}'.\n`);

  // Set the Example contract's table controller to the RowController contract
  let tx = await example.setAccessControl(rowController.address);
  await tx.wait();
  console.log(
    `Example contract's table controller set to '${rowController.address}'.\n`
  );

  // Now, let's insert into the table with a owner account
  const [owner, other] = await ethers.getSigners();
  tx = await example.connect(owner).insertIntoTable("test owner");
  await tx.wait();
  // Insert with a non-owner account
  tx = await example.connect(other).insertIntoTable("test other");
  await tx.wait();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

## Final thoughts

We walked through how to create a simple controller contract that gates writes to a table, allowing anyone to insert data but only letting the row's "owner" update the value. The setup doesn't take into account when more than one row has the same creator, and the controller and `updateTable` had some redundant logic around specifying update logic.

Also note that we've written the `Example.sol` contract such that some random address doesn't even have the ability to try and update another's row. However, since Tableland tables are openly accessible, it's possible someone could try and mutate the table, independent of this `Example.sol` contract. That's why controllers are so important! If you don't set one up, the default setting will only let the table owner mutate data; a controller makes this more flexible and also enables other mediums (SDK, CLI, or smart contracts) to mutate the data, if designed in such a way.

Aside from these points, hopefully, this provided enough detail needed to get started! For more complex examples with NFT gating and balances, check out the [example contracts](/smart-contracts/examples/).
