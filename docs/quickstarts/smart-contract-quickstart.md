---
title: Smart contract quickstart
sidebar_label: Smart contracts
description: Learn how to create a table and insert add some sample data using the Solidity.
---

Tableland smart contracts support both table creates and writes that interact with a `TablelandTables` registry smart contract that exist on each chain. Reads are an off-chain operation, better suited for the SDK, CLI, or Gateway API. If you're using [Hardhat](https://hardhat.org/), you should also the [quickstart](/quickstarts/hardhat)—it walks through how to configure Local Tableland during local development with hardhat.

## 1. Installation & setup

First, install [`evm-tableland`](https://github.com/tablelandnetwork/evm-tableland).

```bash npm2yarn
npm install --save @tableland/evm
```

OpenZeppelin has a useful `Strings` library that makes it easier to work with variables in string templating (i.e., a SQL statement is passed to the registry as a string). So, it's best to also import `@openzeppelin/contracts` and use `Strings`.

```bash npm2yarn
npm install --save @openzeppelin/contracts
```

Let's set up a basic contract scaffold. There are some additional variables to store table information and make it easier to run queries later on.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

contract Starter {
  // The table token ID, assigned upon `TablelandTables` minting a table
  uint256 private _tableId;
  // Table prefix for the table (custom value)
  string private constant _TABLE_PREFIX = "my_smart_contract_table";
}
```

If you're looking to set up a project from scratch, you can use something like [hardhat](https://hardhat.org/tutorial/creating-a-new-hardhat-project)—run `npx hardhat` from your terminal and follow the setup steps.

## 2. Import utilities & helpers

You'll use the `TablelandDeployments` contract to easily set up an interface with the `TablelandTables` registry, but you're free to do this on your own. Although optional, `SQLHelpers` makes it more straightforward to develop in Solidity when producing SQL statements (forming compliant statements, wrapping text in quotes, etc.). Import these into your smart contract. The same goes for the `Strings` library.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

// highlight-start
import "@tableland/evm/contracts/utils/TablelandDeployments.sol";
import "@tableland/evm/contracts/utils/SQLHelpers.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
// highlight-end

contract Starter {
  // The table token ID, assigned upon `TablelandTables` minting a table
  uint256 private _tableId;
  // Table prefix for the table (custom value)
  string private constant _TABLE_PREFIX = "my_smart_contract_table";
}
```

## 3. Create a table

Call `TablelandDeployments.get().create()` and pass parameters for the address that should receive the table as well as the `CREATE TABLE` statement that defines the table schema and prefix. The `SQLHelper`'s `toCreateFromSchema()` method makes this a little easier to do.

```solidity
function create() public payable {
 /*  Under the hood, SQL helpers formulates:
  *
  *  CREATE TABLE {prefix}_{chainId} (
  *    id integer primary key,
  *    val text
  *  );
  */
  _tableId = TablelandDeployments.get().create(
    msg.sender,
    SQLHelpers.toCreateFromSchema(
      "id integer primary key," // Notice the trailing comma
      "val text",
      _TABLE_PREFIX
    )
  );
}
```

Note that the table here is created and owned by `msg.sender`, so only this account will be able to write mutating SQL statements, by default. The contract will be unable to send SQL statements without additional configuration.

## 3. Add contract table ownership

To make calls SQL from the contract, the easiest approach is to have the contract own the table itself. OpenZeppelin has an `ERC721Holder` contract that enables this functionality, allowing you to use `address(this)` within the Tableland table creates and writes.

```solidity
// Existing imports
// highlight-start
// Needed if the contract must own the table
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
// highlight-end

// highlight-next-line
contract Starter is ERC721Holder {
  // Existing code here

  function create() public payable {
    _tableId = TablelandDeployments.get().create(
      // highlight-next-line
      address(this),
      SQLHelpers.toCreateFromSchema(
        "id integer primary key," // Notice the trailing comma
        "val text",
        _TABLE_PREFIX
      )
    );
  }
}
```

Failure to do so will not only prevent the contract from owning the table but also block `mutate` calls since the contract would not have admin write permissions. Using a [controller contract](/smart-contracts/controller) can make this much more flexible with multi-account and other permission checks.

## 4. Write to a table

You can insert, update, or delete data using `TablelandDeployments.get().mutate()`. The `SQLHelpers` `toInsert()` method helps format the `mutate`'s input properly.

```solidity
// Insert data into a table
function insert() public payable {
 /*  Under the hood, SQL helpers formulates:
  *
  *  INSERT INTO {prefix}_{chainId}_{tableId} (id,val) VALUES(
  *    1
  *    'msg.sender'
  *  );
  */
  TablelandDeployments.get().mutate(
    address(this),
    _tableId,
    SQLHelpers.toInsert(
      _TABLE_PREFIX,
      _tableId,
      "id,val",
      string.concat(
        Strings.toString(1), // Convert to a string
        ",",
        SQLHelpers.quote(Strings.toHexString(msg.sender)) // Wrap strings in single quotes
      )
    )
  );
};
```

The `Strings.toHexString()` method is used for hexadecimals like an `address`, but for other strings, keep in mind that `Strings.toString()` should be used.

:::tip

Be sure to always wrap strings (i.e., if a table's column has a `text` type) in single quotes when writing SQL statements! The `SQLHelpers.quote()` method makes this easy.

:::

If you want to update table values, it technically goes through the same `mutate` method in the `TablelandTables` registry smart contract, but a different `SQLHelpers` method is used (`toUpdate()`).

```solidity
// Update data in the table
function update(uint256 myId, string memory myVal) public payable {
  // Set values to update, like the "val" column to the function input param
  string memory setters = string.concat(
    "val=",
    SQLHelpers.quote(myVal) // Wrap strings in single quotes
  );
  // Only update the row with the matching `id`
  string memory filters = string.concat(
    "id=",
    Strings.toString(myId)
  );
  /*  Under the hood, SQL helpers formulates:
   *
   *  UPDATE {prefix}_{chainId}_{tableId} SET val=<myVal> WHERE id=<id>
   */
  TablelandDeployments.get().mutate(
    address(this),
    _tableId,
    SQLHelpers.toUpdate(
      _TABLE_PREFIX,
      _tableId,
      setters,
      filters
    )
  );
}
```

## Errors & issues

When in doubt, use the Tableland CLI's [`receipt`](/cli/commands#receipt) command or [REST API endpoint](api-quickstart#3-get-other-table-info) and pass the transaction hash. If a table create or write transaction is successful, that doesn't mean the table was successfully created or mutated. More advanced validation is all handled off-chain at the Tableland validator to help save on gas costs, so an invalid schema type or mutating a column that doesn't exist will result in a successful transaction but never materialize. The receipt will explain what the issue was.
