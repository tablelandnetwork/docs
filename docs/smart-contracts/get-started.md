---
title: Get started
description: Get up an running with smart contracts and Tableland.
keywords:
  - tableland smart contracts
---

Tableland is live on a number of EVM chains and allows you to write SQL directly on-chain. If you're looking for what the addresses of these contracts are, head over to the [deployed contracts](deployed-contracts) section of the docs.

## Installation

Install [`evm-tableland`](https://github.com/tablelandnetwork/evm-tableland).

```bash npm2yarn
npm install --save @tableland/evm
```

OpenZeppelin has a useful `Strings` library that makes it easier to work with variables in string templating (i.e., a SQL statement is passed to the registry as a string). So, it's best to also import `@openzeppelin/contracts` and use `Strings` as well.

```bash npm2yarn
npm install --save @openzeppelin/contracts
```

Thus, your imports should resemble the following:

```solidity
import "@tableland/evm/contracts/utils/TablelandDeployments.sol";
import "@tableland/evm/contracts/utils/SQLHelpers.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
```

It's prudent to store a reference to your table ID and prefix within your contract; being unable to refer to them within various methods makes things more difficult.

```solidity
uint256 public _tableId;
string private constant _TABLE_PREFIX = "my_quickstart_table";
```

## Create a table

Creating a table (calling `createTable()` on the [registry](https://github.com/tablelandnetwork/evm-tableland/blob/main/contracts/TablelandTables.sol)) requires the following parameters:

- `owner`: The `address` that should own the table (i.e., ERC721 TABLE token is minted here).
- `statement`: A `string` that defines a `CREATE TABLE` statement.

You can use the `SQLHelpers`'s `toCreateFromSchema()` method to generate a statement:

- `schema`: A single `string` for the table's schema definition (e.g., `"id integer primary key, name text"`).
- `prefix`: A `string` that's the table's custom prefix.

Note that in the `statement`, the chain ID is expected as part of the definition, so if you choose to write a raw SQL statement _without_ `SQLHelpers`, the statement should use `CREATE TABLE my_table_<chain_id> ...`. That is, the `<chain_id>` should be replaced entirely with the chain ID number (e.g., `my_table_1` for Ethereum mainnet).

With [`TablelandDeployments`](https://github.com/tablelandnetwork/evm-tableland/blob/main/contracts/utils/TablelandDeployments.sol), it makes it easy to set up an interface with the correct `TablelandTables` contract with the `get()` method.

```solidity
_tableId = TablelandDeployments.get().createTable(
  msg.sender,
  SQLHelpers.toCreateFromSchema(
    "id integer primary key," // Notice the trailing comma
    "val text", // Separate lines for readability—but it's a single string
    _TABLE_PREFIX
  )
);
```

### Contract table ownership

For the contract to _own_ the table (instead of some [EOA](/fundamentals/about/glossary#eoa)), an additional import is needed so that the contract can own an ERC721 token. If you were to, instead, mint to `msg.sender` as in the example above, the contract wouldn't have the default permissions to also write to the table; contract ownership helps solve this issue.

Thus, instead of minting to an EOA address (i.e., a wallet), you can actually have the contract own the table. One way to do this is by importing and inheriting from `ERC721Holder`, and once you do so, you can then use `address(this)` within something like the `createTable()` method, which will send the [ERC721 TABLE](https://opensea.io/collection/tableland-tables) to the contract itself. Alternatively, implement [`onERC721Received`](https://github.com/binodnp/openzeppelin-solidity/blob/master/docs/ERC721Holder.md#onerc721received) on your own.

```solidity
// Existing imports
// highlight-start
// Needed if the contract must own the table
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
// highlight-end

// highlight-next-line
contract Contract is ERC721Holder {
  // Existing code
}
```

Then, you can use `address(this0)` in your function.

```solidity
_tableId = TablelandDeployments.get().createTable(
  // highlight-next-line
  address(this),
  SQLHelpers.toCreateFromSchema(
    "id integer primary key," // Notice the trailing comma
    "val text", // Separate lines for readability—but it's a single string
    _TABLE_PREFIX
  )
);
```

Alternatively, developers can choose to set up and [configure their own controller contract](/smart-contracts/controller). In the current setup, the `msg.sender` will never be able to make table mutations as it always must come from the owner, which is `address(this)`. A controller allows this to be flexible and, for example, allow both the contract's owner and the contract itself to have "allow all" admin permissions.

## Write table data

You can insert, update, or delete data using `TablelandDeployments.get().runSQL()`. This method takes the following:

- `caller`: The `address` of what is calling the registry contract.
- `tableId`: Unique `uint256` ID of the Tableland table.
- `statement`: A `string` for the SQL `INSERT` statement.

:::tip

Be sure to always wrap strings (i.e., if a table's column has a `text` type) in single quotes when writing SQL statements! The `SQLHelpers.quote()` method makes this easy by taking a `string` and returning it with `'` wrapped around it.

:::

### Insert values

The `SQLHelpers` contract has various method to help format the `runSQL`'s input properly. For example, `toInsert()` expects the following:

- `prefix`: A `string` that's the table's custom prefix.
- `tableId`: Unique `uint256` ID of the Tableland table.
- `columns`: A `string` encoded ordered list of columns that will be updated (e.g., `"name, val"`)
- `values`: A `string` encoded ordered list of values that will be inserted (e.g., `"'jerry', 24"`).

This will produce an `INSERT` statement with its `VALUES`.

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
        SQLHelpers.quote(Strings.toHexString(msg.sender)) // Wrap strings in single quotes
      )
    )
  );
};
```

For strings, the `Strings.toHexString()` method converts a hexadecimal value (e.g., an `address`) to a normal string, and `Strings.toString()` can be used for numbers.

### Update values

If you want to update table values, it technically goes through the same `runSQL` method in the `TablelandTables` registry smart contract, but a different `SQLHelpers` method is used—`toUpdate()`—which takes:

- `prefix`: A `string` that's the table's custom prefix.
- `tableId`: Unique `uint256` ID of the Tableland table.
- `setters`: A `string` encoded set of updates (e.g., `"name='tom', age=26"`).
- `filters`: A `string` encoded list of filters (e.g., `"id<2 and name!='jerry'"`) or `""` for no filters.

This will produce an `UPDATE` statement with a `SET` and `WHERE` clause.

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
  TablelandDeployments.get().runSQL(
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

### Delete data

Lastly, you can delete table data with the same `runSQL` method but a different one from `SQLHelpers`. Use `toDelete()` to perform this action, which takes:

- `prefix`: A `string` that's the table's custom prefix.
- `tableId`: Unique `uint256` ID of the Tableland table.
- `filters`: A string encoded list of filters (e.g., `"id<2 and name!='jerry'"`).

This will produce a `DELETE FROM` statement with an attached `WHERE` clause

```solidity
// Update data in the table
function delete(uint256 myId) public payable {
  // Only delete the row with the matching `id`
  string memory filters = string.concat(
    "id=",
    Strings.toString(myId)
  );
  /*  Under the hood, SQL helpers formulates:
   *
   *  DELETE FROM {prefix}_{chainId}_{tableId} WHERE id=<id>
   */
  TablelandDeployments.get().runSQL(
    address(this),
    _tableId,
    SQLHelpers.toDelete(
      _TABLE_PREFIX,
      _tableId,
      filters
    )
  );
}
```
