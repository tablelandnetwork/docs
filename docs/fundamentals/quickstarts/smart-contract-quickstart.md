---
title: Smart contract quickstart
sidebar_label: Smart contracts
description: Learn how to create a table and insert add some sample data using the Solidity.
---

Tableland smart contracts support both table creates and writes that interact with a `TablelandTables` registry smart contract that exist on each chain. Reads are an off-chain operation, better suited for the SDK, CLI, or validator API.

## 1. Contract scaffold

Take a very basic smart contract. There are some additional variables to store table information and make it easier to run queries later on.

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

## 2. Install and import helpers

First, install [`evm-tableland`](https://github.com/tablelandnetwork/evm-tableland).

```bash npm2yarn
npm install --save @tableland/evm
```

OpenZeppelin has a useful `Strings` library that makes it easier to work with variables in string templating (i.e., a SQL statement is passed to the registry as a string). So, it's best to also import `@openzeppelin/contracts` and use `Strings`.

```bash npm2yarn
npm install --save @openzeppelin/contracts
```

You'll use the `TablelandDeployments` contract to easily set up an interface with the `TablelandTables` registry, but you're free to do this on your own. Although optional, `SQLHelpers` makes it more straightforward to develop in Solidity when producing SQL statements (forming compliant statements, wrapping text in quotes, etc.). Import these into your smart contract.

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

Call `TablelandDeployments.get().createTable()` and pass parameters for the address that should receive the table as well as the `CREATE TABLE` statement that defines the table schema and prefix. The `SQLHelper`'s `toCreateFromSchema()` method makes this a little easier to do.

```solidity
function create() public payable {
 /*  Under the hood, SQL helpers formulates:
  *
  *  CREATE TABLE {prefix}_{chainId} (
  *    id integer primary key,
  *    name text
  *  );
  */
  _tableId = TablelandDeployments.get().createTable(
    msg.sender,
    SQLHelpers.toCreateFromSchema(
      "id integer primary key," // Notice the trailing comma
      "name text",
      _TABLE_PREFIX
    )
  );
}
```

## 4. Write to a table

You can insert, update, or delete data using `TablelandDeployments.get().runSQL()`. The `SQLHelpers` `toInsert()` method helps format the `runSQL`'s input properly.

```solidity
// Insert data into a table
function insert() public payable {
 /*  Under the hood, SQL helpers formulates:
  *
  *  INSERT INTO {prefix}_{chainId}_{tableId} (id,name) VALUES(
  *    1
  *    'msg.sender'
  *  );
  */
  TablelandDeployments.get().runSQL(
    msg.sender,
    _tableId,
    SQLHelpers.toInsert(
      _TABLE_PREFIX,
      _tableId,
      "id,name",
      string.concat(
        Strings.toString(1), // Convert to a string
        ",",
        SQLHelpers.quote(Strings.toHexString(msg.sender)) // Wrap strings in single quotes
      )
    )
  );
};
```

:::tip

Be sure to always wrap strings (i.e., if a table's column has a `text` type) in single quotes when writing SQL statements! The `SQLHelpers.quote()` method makes this easy.

:::

If you want to update table values, it technically goes through the same `runSQL` method in the `TablelandTables` registry smart contract, but a different `SQLHelpers` method is used (`toUpdate()`).

```solidity
// Update data in the table
function update(uint256 myId, string memory myName) public payable {
  // Set values to update, like the "name" column to the function input param
  string memory setters = string.concat(
    "name=",
    SQLHelpers.quote(myName) // Wrap strings in single quotes
  );
  // Only update the row with the matching `id`
  string memory filters = string.concat(
    "id=",
    Strings.toString(myId)
  );
  /*  Under the hood, SQL helpers formulates:
   *
   *  UPDATE {prefix}_{chainId}_{tableId} SET name=<myName> WHERE id=<id>
   */
  TablelandDeployments.get().runSQL(
    msg.sender,
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

## 5. Add contract table ownership

If you want the contract to _own_ the table (instead of some Externally Owned Account—"EOA"), an additional import is needed so that the contract can own an ERC721 token.

```bash npm2yarn
npm install --save @openzeppelin/contracts
```

Then, instead of minting to an EOA address (i.e., a wallet), you can actually have the contract own the table. One way to do this is by importing and inheriting from `ERC721Holder`, and once you do so, you can then use `address(this)` within something like the `createTable()` method, which will send the [ERC721 TABLE](https://opensea.io/collection/tableland-tables) to the contract itself. Alternatively, implement [`onERC721Received`](https://github.com/binodnp/openzeppelin-solidity/blob/master/docs/ERC721Holder.md#onerc721received) on your own.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@tableland/evm/contracts/utils/TablelandDeployments.sol";
import "@tableland/evm/contracts/utils/SQLHelpers.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
// highlight-start
// Needed if the contract must own the table
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
// highlight-end

// highlight-next-line
contract Starter is ERC721Holder {
  // Existing code here

  function create() public payable {
  _tableId = TablelandDeployments.get().createTable(
    // highlight-next-line
    address(this),
    SQLHelpers.toCreateFromSchema(
      "id integer primary key," // Notice the trailing comma
      "name text",
      _TABLE_PREFIX
    )
  );
}
```

## Dealing with issues

When in doubt, use the Tableland CLI's [`receipt`](/guides/cli/commands#receipt) command or [REST API endpoint](api-quickstart#3-get-other-table-info) and pass the transaction hash. If a table create or write transaction is successful, that doesn't mean the table was successfully created or mutated. More advanced validation is all handled off-chain at the Tableland validator to help save on gas costs, so an invalid schema type or mutating a column that doesn't exist will result in a successful transaction but never materialize. The receipt will explain what the issue was.
