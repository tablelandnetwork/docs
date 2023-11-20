---
title: Row-level access controls
description: Create a table with row-level guards on who can update specific columns.
keywords:
  - row-level access
  - controller
---

If you're creating a shared table, it's useful to gate row-level access controls such that only a specific set of users can mutate a row. This setup is quite flexible since controller logic can be anything that's written in a smart contract, but let's take a simple example with [OpenZeppelin's access control](https://docs.openzeppelin.com/contracts/2.x/access-control) framework and making checks on the table data.

In contract-owned table use cases, you can often avoid using controllers and simply rely on logic you write in your smart contract. By default, only the table owner can mutate data, so smart contracts that own tables can act as a "forwarding" entity on behalf of the `msg.sender`. But, controllers enable more "hybrid" use cases that bring flexibility to collaborative data by letting anyone contribute to your table's data but with custom limitations. They are often useful when developing with the [SDK](/sdk) or similar.

## Setup

First, install the OpenZeppelin and Tableland contracts:

```bash
npm install @openzeppelin/contracts @tableland/evm
```

Your contract should import the OpenZeppelin `Ownable` and `Strings` contracts as well Tableland utilities for simpler SQL-in-Solidity syntax. We'll also have the contract create a table during deployment, so `onERC721Received` is required for the contract to receive an ERC721 TABLE token. The table has the schema `id integer primary key, address text, val text` and will store a user's address with a custom message.

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

    // Return the table ID
    function getTableId() external view returns (uint256) {
        return _tableId;
    }

    // Return the table name
    function getTableName() external view returns (string memory) {
        return SQLHelpers.toNameFromId(_TABLE_PREFIX, _tableId);
    }

    // Needed for the contract to own a table
    function onERC721Received(address, address, uint256, bytes calldata) external pure returns (bytes4) {
      return IERC721Receiver.onERC721Received.selector;
    }
}
```

Notice the `getTableId` and `getTableName` are public methods that return the table ID and name. These aren't required but can be useful in deployment scripts.

## Table mutation methods

Let's create a way for this contract to insert data into the table. We'll create a simple `insertIntoTable` method that allows anyone to insert a row into the table, and the `Example` contract will control this data by forwarding it to the Tableland registry contract. The `updateTable` method will gate row-level access so that only the one who inserted the row can update it (by checking the `address` column is the same as the method's caller).

```solidity
contract Example is Ownable {
  	// Store relevant table info
    uint256 private _tableId; // Unique table ID
    string private constant _TABLE_PREFIX = "access_control"; // Custom table prefix

    // Other methods here...

    // highlight-start
    // Let anyone insert into the table
    function insertIntoTable(string memory val) external {
        TablelandDeployments.get().mutate(
            address(this), // Table owner, i.e., this contract
            _tableId,
            SQLHelpers.toInsert(
                _TABLE_PREFIX,
                _tableId,
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
            _tableId,
            SQLHelpers.toUpdate(_TABLE_PREFIX, _tableId, setters, filters)
        );
    }
    // highlight-end
}
```

At this point, `Example.sol` owns the table and forwards all SQL to the Tableland registry. The `insertIntoTable` and `updateTable` methods are marked as `external`, so this lets anyone call them and write data to the table based on the logic defined in these methods. But, we can choose to also define a controller contract that gates row-level access controls for use cases outside of the `Example.sol` contract.

Once we deploy the controller, we'll call the `setAccessControl` to apply the controller to the table. This will use the `onlyOnly` modifier to ensure this `Example.sol` contract's deployer (i.e., the account that deployed it) is the only one that can change the controller.

```solidity
contract Example is Ownable {
  	// Store relevant table info
    uint256 private _tableId; // Unique table ID
    string private constant _TABLE_PREFIX = "access_control"; // Custom table prefix

    // Other methods here...

    // highlight-start
    // Set the ACL controller to enable row-level writes with dynamic policies
    function setAccessControl(address controller) external onlyOwner {
      TablelandDeployments.get().setController(
          address(this), // Table owner, i.e., this contract
          _tableId,
          controller // Set the controller address—a separate controller contract
      );
    }
    // highlight-end
}
```

## Row-level controller

### Background

We'll create a "hybrid" framework for the controller of this contract-owned table; for many contract-owned table use cases, this might not be needed. Controllers allow for anyone to write SQL statements against your table without needing to interact directly with your custom `Example` contract. It brings more flexibility to decentralized collaboration since you can let others write their own logic for interacting with your table such that they don't _have to_ call your `Example` contract's methods and can utilize the Tableland registry alone. But, executed SQL statements will still abide by access control rules that you define in the controller.

Put differently, if someone is developing with the Tableland SDK or CLI, these are just wrappers around the Tableland registry. All calls will directly hit the registry and never go through a forwarding like with `Example.sol`. So, controllers let you configure logic such that anyone can write SQL without touching the `Example` contract. If you don't set up a controller, only the table owner can make changes to the table.

This will be a simple controller contract that does a few checks:

- If the caller is the table's owner, let the account do anything. This happens when someone calls the `insertIntoTable` or `updateTable` methods (aka the SQL forwarding process), and the `Example` contract already manages how data is inserted or updated with WHERE clauses and column setters.
- If the caller is not the table's owner, only let the account mutate rows that they inserted via `Example.sol`—the table tracks the address of who inserted the row in the `insertIntoTable` method.
- If the caller is not the table's owner, don't allow any inserts nor deletions.

One of the key things to understand is how the registry uses the `getPolicy` method:

1. When a user calls `Example.sol`'s `insertIntoTable` or `updateTable` and tries to mutate a table, the registry will call the `getPolicy` method on the controller contract, passing in the caller's address and the table ID.
   1. In our setup, the **smart contract is forwarding** SQL statements on behalf of the `msg.sender` when the `insertIntoTable` and `updateTable` methods are called.
   2. So, the `caller` is the _contract's address_ and **not the original caller** of the method.
2. The controller contract will then return a `TablelandPolicy` struct that specifies the permissions for the caller. If someone is calling `insertIntoTable` or `updateTable`, it will always return an "allow-all" policy since the `caller` from the registry's point of view is, technically, `Example.sol`.
3. If a user directly hits the Tableland registry and avoids `Example.sol`, it will only allow updates and make a check on the `caller`'s address—here, the `caller` is _not_ `Example.sol` but could be anyone.

Why is this important? When someone calls `insertIntoTable` or `updateTable`, if you do any sort of address checking for `caller` in the controller contract—such as in the `whereClause` or `updatableColumns`—the address you're checking against is the contract's address, not the original caller's address. That's why the "allow-all" concept is necessary. In use cases where someone is directly hitting the registry, the `caller` is that person's address, so you _can_ do checks on the `caller`'s address.

### Setup

We'll store the address of the table owner (the `Example` contract) in a variable called `_TABLE_OWNER`. The contract will establish a `whereClause` and `updatableColumns` to gate write access such that anyone can update their row if it exists. That is, in `Example.sol`, the `updateTable` method handles how the caller can update the `val` column based on the corresponding `address` column. If someone hits the registry directly, it will use the controller for checking this—the `whereClause` will check that the `address` column matches the caller's address and enable the same functionality as `Example.sol`.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.10 <0.9.0;

import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {SQLHelpers} from "@tableland/evm/contracts/utils/SQLHelpers.sol";
import {TablelandController} from "@tableland/evm/contracts/TablelandController.sol";
import {TablelandPolicy} from "@tableland/evm/contracts/TablelandPolicy.sol";
import {Policies} from "@tableland/evm/contracts/policies/Policies.sol";

contract RowController is TablelandController {
    // Track the address of the contract owner, which is our `Example` contract
    address private _TABLE_OWNER;

    // Set the table owner during contract deployment
    constructor(address tableOwner) {
        _TABLE_OWNER = tableOwner;
    }

    function getPolicy(
        address caller,
        uint256
    ) public payable override returns (TablelandPolicy memory) {
        // Return allow-all policy if the caller is the owner—our `Example` contract
        if (caller == _TABLE_OWNER) {
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

        // For all others, we'll have controls on the update
        // First, establish WHERE clauses (i.e., where the address is the caller)
        string[] memory whereClause = new string[](1);
        whereClause[0] = string.concat(
            "address=",
            SQLHelpers.quote(Strings.toHexString(caller))
        );

        // Restrict updates to a single `val` column
        string[] memory updatableColumns = new string[](1);
        updatableColumns[0] = "val";

        // Now, return the policy that gates by the WHERE clause & updatable columns
        return
            TablelandPolicy({
                allowInsert: false,
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

First, deploy the `Example.sol` contract, and afterward, the `RowController.sol` contract, passing the address of `Example.sol` as a constructor argument. Then, have the deployer of `Example.sol` call `setAccessControl`, passing the address of `RowController.sol` as a parameter. Note that you _could_ choose to have `Example.sol` also be the controller, but we've separated them in this walkthrough for clarity.

Now, you can test out the functionality! If any account calls `insertIntoTable`, their value will be added to the table. The same goes for `updateTable`—if someone inserted a row, they can openly update theirs. Let's review this from an access control perspective:

- If the caller is the table owner, the policy will return "allow all" permissions—inserts, updates, and deletes are all possible.
- If the caller is not the table owner and an insert or delete is attempted, nothing will happen.
- If the caller is not the table owner and an update is attempted, the policy will set the WHERE clause (only update rows where the `address` column matches the caller's address) and the updatable columns (only update the `val` column).
  - Recall: anyone calling `insertIntoTable` or `updateTable` is actually having their SQL statement forwarded by the `Example.sol` contract. So, this use case is only useful if the caller is directly interacting with the Tableland registry.

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
    uint256 private _tableId; // Unique table ID
    string private constant _TABLE_PREFIX = "access_control"; // Custom table prefix

    // Constructor that creates a simple table with a an `id` and `val` column
    constructor() {
        // Create a table
        _tableId = TablelandDeployments.get().create(
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
            _tableId,
            SQLHelpers.toInsert(
                _TABLE_PREFIX,
                _tableId,
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
            _tableId,
            SQLHelpers.toUpdate(_TABLE_PREFIX, _tableId, setters, filters)
        );
    }

    // Set the ACL controller to enable row-level writes with dynamic policies
    function setAccessControl(address controller) external onlyOwner {
        TablelandDeployments.get().setController(
            address(this), // Table owner, i.e., this contract
            _tableId,
            controller // Set the controller address—a separate controller contract
        );
    }

    // Return the table ID
    function getTableId() external view returns (uint256) {
        return _tableId;
    }

    // Return the table name
    function getTableName() external view returns (string memory) {
        return SQLHelpers.toNameFromId(_TABLE_PREFIX, _tableId);
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

To demonstrate how this might look in a Hardhat project, here's an example script that deploys the contract and sets the controller.

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
  const rowController = await RowController.deploy(example.address);
  await rowController.deployed();
  console.log(`Controller contract deployed to '${rowController.address}'.\n`);

  // Set the Example contract's table controller to the RowController contract
  let tx = await example.setAccessControl(rowController.address);
  await tx.wait();
  console.log(
    `Example contract's table controller set to '${rowController.address}'.\n`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

We can also do a test insert and update. Note that you can use the Tableland SDK, CLI, or Gateway APIs to check if the table data was mutated correctly.

```js
async function main() {
  // Existing code...

  // Now, let's insert into the table using some random account
  const [other] = await ethers.getSigners();
  tx = await example.connect(other).insertIntoTable("init");
  await tx.wait();
  // We can also update the row we just inserted
  tx = await example.connect(other).updateTable("test other");
  await tx.wait();
}
```

At this point, if you query the data, it should look like:

```json
[
  {
    "address": "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
    "id": 1,
    "val": "test other"
  }
]
```

If you want to test the full access control functionality, you can update the script even further. Start by installing and importing the `@tableland/sdk` to use the `Registry` class. This will allow us to test out the controller in the instance someone is directly hitting the registry and _not_ interacting with the `Example.sol` contract.

The first time we call `mutate`, the SQL will never execute due to an error: `insert is not allowed by policy`. In the second case, it _will_ succeed and update the existing row in the table.

```js
import { ethers } from "hardhat";
// highlight-next-line
import { Registry } from "@tableland/sdk";

async function main() {
  // Existing code...

  // Now, we're going to try & insert into the table by directly hitting the registry
  const registry = await Registry.forSigner(other);
  const { chainId } = await ethers.provider.getNetwork();
  const tableId = await example.getTableId();
  const tableName = await example.getTableName();
  // The tx will succeed, but the SQL will fail and never mutate the table since
  // the caller is not authorized to insert data
  let statement = `INSERT INTO ${tableName} (val) VALUES ('this fails')`;
  tx = await registry.mutate({ chainId, tableId, statement });
  await tx.wait();
  // The tx will succeed, and the SQL will execute to mutate the table since
  // the caller is allowed to update their row
  statement = `UPDATE ${tableName} SET val = 'this succeeds'`;
  tx = await registry.mutate({ chainId, tableId, statement });
  await tx.wait();
}
```

Thus, the entry in the table will now be updated:

```json
[
  {
    "address": "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
    "id": 1,
    "val": "this succeeds"
  }
]
```

## Final thoughts

We walked through how to create a simple controller contract that gates writes to a table! Hopefully, this provided enough detail needed to get started! For more complex examples with NFT gating and balances, check out the [example contracts](/smart-contracts/examples/).
