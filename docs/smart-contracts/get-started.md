---
title: Get started
description: Get up an running with smart contracts and Tableland.
keywords:
  - tableland smart contracts
  - create
  - mutate
  - contract
  - tableland/evm
---

Tableland is live on a number of EVM chains and allows you to write SQL directly on-chain. If you're looking for what the addresses of these contracts are, head over to the [deployed contracts](deployed-contracts) section of the docs.

## Installation

Install [`evm-tableland`](https://github.com/tablelandnetwork/evm-tableland).

```bash npm2yarn
npm install --save @tableland/evm
```

We'll use the [`TablelandDeployments`](/smart-contracts/tableland-deployments) and [`SQLHelpers`](/smart-contracts/sql-helpers) contracts to help us interact with the registry contract and form SQL statements, respectively.

OpenZeppelin has a useful `Strings` library that makes it easier to work with variables in string templating (i.e., a SQL statement is passed to the registry as a string). So, it's best to also import `@openzeppelin/contracts` and use `Strings`.

```bash npm2yarn
npm install --save @openzeppelin/contracts
```

Thus, your imports should resemble the following:

```solidity
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {TablelandDeployments} from "@tableland/evm/contracts/utils/TablelandDeployments.sol";
import {SQLHelpers} from "@tableland/evm/contracts/utils/SQLHelpers.sol";
```

It's prudent to store a reference to your table ID and prefix within your contract; being unable to refer to them within various methods makes things more difficult.

```solidity
uint256 public _tableId;
string private constant _TABLE_PREFIX = "my_table";
```

## Create a table

Creating a table (calling `create()` on the Tableland [registry](/smart-contracts/registry-contract)) requires the following parameters:

- `owner`: The `address` that should own the table (i.e., ERC721 TABLE token is minted here).
- `statement`: A `string` that defines a `CREATE TABLE` statement.

You can use the `SQLHelpers`'s `toCreateFromSchema()` method to generate a `CREATE TABLE` statement for you:

- `schema`: A single `string` for the table's schema definition (e.g., `"id integer primary key, name text"`).
- `prefix`: A `string` that's the table's custom prefix.

Note that in the `statement`, the chain ID is expected as part of the definition, so if you choose to write a raw SQL statement _without_ `SQLHelpers`, the statement should use `CREATE TABLE my_table_<chain_id> ...`. That is, the `<chain_id>` should be replaced entirely with the chain ID number (e.g., `my_table_1` for Ethereum mainnet). It's recommended to _always_ use the `SQLHelpers` library to avoid any issues.

With [`TablelandDeployments`](/smart-contracts/tableland-deployments), it makes it easy to set up an interface with the correct `TablelandTables` [deployed contract address](/smart-contracts/deployed-contracts) with the `get()` method.

### Table owned by `msg.sender`

For example, place the following in your `constructor` method to create a table with the combination of these two libraries. This will create a table that's owned by the contract's owner, i.e., `msg.sender` upon deployment.

```solidity
constructor() {
  _tableId = TablelandDeployments.get().create(
    msg.sender,
    SQLHelpers.toCreateFromSchema(
      "id integer primary key," // Notice the trailing comma
      "val text", // Separate lines for readability—but it's a single string
      _TABLE_PREFIX
    )
  );
}
```

### Contract table ownership

Ideally, we should have our contract own the table so that it can execute SQL statements directly from methods. For the contract to _own_ the table (instead of some [EOA](/fundamentals/about/glossary#eoa)), the contract must be able to own an ERC721 token. We'll need to import `ERC721Holder` from OpenZeppelin—more on this in the docs [here](/smart-contracts/contract-owned-tables). If you were to, instead, mint to `msg.sender` (as in the example above), the contract wouldn't have the default permissions to also write to the table; contract ownership helps solve this issue.

Then, you can then use `address(this)` within the `create()` and other registry method, which will send the [ERC721 TABLE](https://opensea.io/collection/tableland-tables) to the contract itself. Alternatively, you could implement [`onERC721Received`](https://github.com/binodnp/openzeppelin-solidity/blob/master/docs/ERC721Holder.md#onerc721received) on your own vs. inheriting from `ERC721Holder`.

```solidity
// Existing imports
// highlight-start
// Needed if the contract must own the table
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
// highlight-end

// highlight-next-line
contract Example is ERC721Holder {
  // Existing code
}
```

Yu can now use `address(this)` in your function.

```solidity
constructor() {
  _tableId = TablelandDeployments.get().create(
    // highlight-next-line
    address(this),
    SQLHelpers.toCreateFromSchema(
      "id integer primary key," // Notice the trailing comma
      "val text", // Separate lines for readability—but it's a single string
      _TABLE_PREFIX
    )
  );
}
```

Additionally, developers can choose to set up and [configure their own controller contract](/smart-contracts/controller). In the contract-owned table setup, the contract acts as a "forwarder" for any method calls by an external account, i.e., the `msg.sender`—we'll set this up below. But, if you want more flexible controls where someone could bypass the your contract and directly hit the Tableland registry, a controller allows this to be flexible and, for example, allow both the contract's owner and the contract itself to have "allow all" admin permissions.

## Write table data

You can insert, update, or delete data using `TablelandDeployments.get().mutate()`. The `mutate` method takes the following:

- `caller`: The `address` of what is calling the registry contract.
- `tableId`: Unique `uint256` ID of the Tableland table.
- `statement`: A `string` for the SQL `INSERT` statement.

:::tip

Be sure to always wrap strings (i.e., if a table's column has a `text` type) in single quotes when writing SQL statements! The `SQLHelpers.quote()` method makes this easy by taking a `string` and returning it with `'` wrapped around it.

:::

### Insert values

The `SQLHelpers` contract has various method to help format the `mutate`'s input properly. For example, `toInsert()` expects the following:

- `prefix`: A `string` that's the table's custom prefix.
- `tableId`: Unique `uint256` ID of the Tableland table.
- `columns`: A `string` encoded ordered list of columns that will be updated (e.g., `"name, val"`)
- `values`: A `string` encoded ordered list of values that will be inserted (e.g., `"'jerry', 24"`).

This will produce an `INSERT` statement with its `VALUES`.

```solidity
// Insert data into a table
function insertIntoTable(uint256 id, string memory val) public payable {
 /*  Under the hood, SQL helpers formulates:
  *
  *  INSERT INTO {prefix}_{chainId}_{tableId} (id,val) VALUES(
  *    <id>,
  *    '<val>'
  *  );
  */
  function insertIntoTable(uint256 id, string memory val) external {
    TablelandDeployments.get().mutate(
      address(this), // Table owner, i.e., this contract
      _tableId,
      SQLHelpers.toInsert(
        _TABLE_PREFIX,
        _tableId,
        "id,val",
        string.concat(
          Strings.toString(id), // Convert to a string
          ",",
          SQLHelpers.quote(val) // Wrap strings in single quotes with the `quote` method
        )
      )
    );
  }
};
```

For strings, the `Strings.toString()` can be used for numbers. Although we're not using it here, the `Strings.toHexString()` method converts a hexadecimal value (e.g., an `address`) to a normal string.

### Update values

If you want to update table values, it technically goes through the same `mutate` method in the `TablelandTables` registry smart contract, but a different `SQLHelpers` method is used—`toUpdate()`—which takes:

- `prefix`: A `string` that's the table's custom prefix.
- `tableId`: Unique `uint256` ID of the Tableland table.
- `setters`: A `string` encoded set of updates (e.g., `"name='tom', age=26"`).
- `filters`: A `string` encoded list of filters (e.g., `"id<2 and name!='jerry'"`) or `""` for no filters.

This will produce an `UPDATE` statement with a `SET` and `WHERE` clause.

```solidity
// Update data in the table
function updateTable(uint256 id, string memory val) external {
   /*  Under the hood, SQL helpers formulates:
    *
    *  UPDATE {prefix}_{chainId}_{tableId} SET val=<val> WHERE id=<id>
    */
    // Set the values to update
    string memory setters = string.concat("val=", SQLHelpers.quote(val));
    // Specify filters for which row to update
    string memory filters = string.concat(
        "id=",
        Strings.toString(id)
    );
    // Mutate a row at `address` with a new `val`
    TablelandDeployments.get().mutate(
        address(this),
        _tableId,
        SQLHelpers.toUpdate(_TABLE_PREFIX, _tableId, setters, filters)
    );
}
```

### Delete data

Lastly, you can delete table data with the same `mutate` method but a different one from `SQLHelpers`. Use `toDelete()` to perform this action, which takes:

- `prefix`: A `string` that's the table's custom prefix.
- `tableId`: Unique `uint256` ID of the Tableland table.
- `filters`: A string encoded list of filters (e.g., `"id<2 and name!='jerry'"`).

This will produce a `DELETE FROM` statement with an attached `WHERE` clause

```solidity
    // Delete a row from the table by ID
    function deleteFromTable(uint256 id) external {
       /*  Under the hood, SQL helpers formulates:
        *
        *  DELETE FROM {prefix}_{chainId}_{tableId} WHERE id=<id>
        */
        // Specify filters for which row to delete
        string memory filters = string.concat(
            "id=",
            Strings.toString(id)
        );
        // Mutate a row at `id`
        TablelandDeployments.get().mutate(
            address(this),
            _tableId,
            SQLHelpers.toDelete(_TABLE_PREFIX, _tableId, filters)
        );
    }
```

## Setting access control

Lastly, here's an example of how you could have the contract set an access controller for the table. This assumes that you've already deployed a [controller contract](/smart-contracts/controller) and have its address, which will change who and how accounts can mutate data.

```solidity
// Set the ACL controller to enable row-level writes with dynamic policies
function setAccessControl(address controller) external {
    TablelandDeployments.get().setController(
        address(this), // Table owner, i.e., this contract
        _tableId,
        controller // Set the controller address—a separate controller contract
    );
}
```

## Full example

Below combines all of the steps above into a single contract. Note that the contract is the owner of the table, so it can execute SQL statements directly from methods. A couple of helpers for getting the table name and ID are also included.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.10 <0.9.0;

import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {ERC721Holder} from "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import {TablelandDeployments} from "@tableland/evm/contracts/utils/TablelandDeployments.sol";
import {SQLHelpers} from "@tableland/evm/contracts/utils/SQLHelpers.sol";

contract Example is ERC721Holder {
    // Store relevant table info
    uint256 private _tableId; // Unique table ID
    string private constant _TABLE_PREFIX = "my_table"; // Custom table prefix

    // Constructor that creates a simple table with a`val` column
    constructor() {
        // Create a table
        _tableId = TablelandDeployments.get().create(
            address(this),
            SQLHelpers.toCreateFromSchema(
                "id integer primary key,"
                "val text",
                _TABLE_PREFIX
            )
        );
    }

    // Let anyone insert into the table
    function insertIntoTable(uint256 id, string memory val) external {
        TablelandDeployments.get().mutate(
            address(this), // Table owner, i.e., this contract
            _tableId,
            SQLHelpers.toInsert(
                _TABLE_PREFIX,
                _tableId,
                "id,val",
                string.concat(
                    Strings.toString(id), // Convert to a string
                    ",",
                    SQLHelpers.quote(val) // Wrap strings in single quotes with the `quote` method
                )
            )
        );
    }

    // Update only the row that the caller inserted
    function updateTable(uint256 id, string memory val) external {
        // Set the values to update
        string memory setters = string.concat("val=", SQLHelpers.quote(val));
        // Specify filters for which row to update
        string memory filters = string.concat(
            "id=",
            Strings.toString(id)
        );
        // Mutate a row at `id` with a new `val`
        TablelandDeployments.get().mutate(
            address(this),
            _tableId,
            SQLHelpers.toUpdate(_TABLE_PREFIX, _tableId, setters, filters)
        );
    }

    // Delete a row from the table by ID
    function deleteFromTable(uint256 id) external {
        // Specify filters for which row to delete
        string memory filters = string.concat(
            "id=",
            Strings.toString(id)
        );
        // Mutate a row at `id`
        TablelandDeployments.get().mutate(
            address(this),
            _tableId,
            SQLHelpers.toDelete(_TABLE_PREFIX, _tableId, filters)
        );
    }

    // Set the ACL controller to enable row-level writes with dynamic policies
    function setAccessControl(address controller) external {
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
}
```
