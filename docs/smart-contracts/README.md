---
title: Get started
description: Interact with Tableland using smart contracts.
---

Tableland is a protocol that incorporates both on-chain and off-chain components. On-chain, there are "Registry" smart contracts that allow anyone to create a table, but only provisioned users can write to it. Using smart contracts, you can manage exactly how tables are created and written to.

## Registry contract

The `TablelandTables` registry contract is where you can create tables, write to them, and set the controller of the table itself. The primary methods exists for creating tables (`createTable`), writing SQL (`runSQL`), and setting controllers for the table itself. Check out the others by viewing the registry smart contract: [here](https://github.com/tablelandnetwork/evm-tableland/blob/main/contracts/TablelandTables.sol).

## Controller contract

The `ITablelandController` contract is how you can set you own access controls for a specific table. You can deploy implement and deploy your own controller contract and set custom permissions for your table(s).

## Installation

Install [`evm-tableland`](https://github.com/tablelandnetwork/evm-tableland)

```bash npm2yarn
npm install --save @tableland/evm
```

You'll often use the `TablelandDeployments` contract to easily set up an interface with the `TablelandTables` registry, but you're free to do this on your own. Although optional, `SQLHelpers` makes it more straightforward to develop in Solidity when producing SQL statements (forming compliant statements, wrapping text in quotes, etc.). Import these into your smart contract.

OpenZeppelin has a useful `Strings` library that makes it easier to work with variables in string templating (i.e., a SQL statement is passed to the registry as a string). So, it's best to also import `@openzeppelin/contracts` and use `Strings`.

```bash npm2yarn
npm install --save @openzeppelin/contracts
```

Thus, your imports should resemble the following:

```solidity
import "@tableland/evm/contracts/utils/TablelandDeployments.sol";
import "@tableland/evm/contracts/utils/SQLHelpers.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
```

## Create a table

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

## Write to a table

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
