---
title: SQL helpers library
description: Use the SQL helpers library to make it easier write SQL in Solidity.
---

When creating and writing to tables, Solidity can be a bit challenging to work with when it comes to forming SQL statements. The `SQLHelpers` library provides a series of helper methods to ease writing create table statements, insert, updates, and deletes, and it also has a couple of common helpers. This page describes these methods, their function signatures, and links to the actual implementation.

## Installation

First, install `@tableland/evm` as a dependency:

```bash npm2yarn
npm install --save-dev @tableland/evm
```

Then in your smart contract, import the `SQLHelpers` library:

```solidity
import {SQLHelpers} from "@tableland/evm/contracts/utils/SQLHelpers.sol";
```

A common pattern is to chain the library with the [`TablelandDeployments`](/smart-contracts/tableland-deployments) library, which sets up the interface to the Tableland registry contract and lets you easily access its methods:

```solidity
import {SQLHelpers} from "@tableland/evm/contracts/utils/TablelandDeployments.sol";
```

Note the examples use `address(this)` for table operations. These assume the table [can own an ERC721 token](/smart-contracts/contract-owned-tables).

## [`toNameFromId`](https://github.com/tablelandnetwork/evm-tableland/blob/e0a6802cf3c55d6df54dbe6260079b613c88b184/contracts/utils/SQLHelpers.sol#L20)

Pass a table `prefix` and `tableId`, which returns the formatted table name as `{prefix}_{chainId}_{tableId}` (e.g., `healthbot_1_1`).

```solidity
function toNameFromId(
    string memory prefix,
    uint256 tableId
) public view returns (string memory);
```

### Example

A simple method that returns the table name:

```solidity
uint256 private _tableId = 2; // Unique table ID
string private constant _TABLE_PREFIX = "my_table"; // Custom table prefix

function getTableName() external view returns (string memory) {
    return SQLHelpers.toNameFromId(_TABLE_PREFIX, _tableId);
}
```

## [`toCreateFromSchema`](https://github.com/tablelandnetwork/evm-tableland/blob/e0a6802cf3c55d6df54dbe6260079b613c88b184/contracts/utils/SQLHelpers.sol#L46)

Form a `CREATE TABLE` statement by supplying the table `schema` and custom `prefix`, which then must be passed to the registry contract's `create` method.

```solidity
function toCreateFromSchema(
    string memory schema,
    string memory prefix
) public view returns (string memory);
```

### Example

A method that creates a table with `id integer primary key, val text` schema and sets the `tableId` storage variable:

```solidity
uint256 private _tableId; // Unique table ID
string private constant _TABLE_PREFIX = "my_table"; // Custom table prefix

function createTable() external {
    _tableId = TablelandDeployments.get().create(
        address(this), // Table owner, i.e., this contract
        SQLHelpers.toCreateFromSchema(
            "id integer primary key,"
            "address text,"
            "val text",
            _TABLE_PREFIX
        )
    );
}
```

## [`toInsert`](https://github.com/tablelandnetwork/evm-tableland/blob/e0a6802cf3c55d6df54dbe6260079b613c88b184/contracts/utils/SQLHelpers.sol#L76)

Generate an `INSERT` statement with the specified columns and values for a specific table, which then can be passed to the registry's `mutate` method to mutate the table itself.

```solidity
function toInsert(
    string memory prefix,
    uint256 tableId,
    string memory columns,
    string memory values
) public view returns (string memory);
```

### Example

Here, we insert a value into the table with the `val` column:

```solidity
uint256 private _tableId; // Unique table ID
string private constant _TABLE_PREFIX = "my_table"; // Custom table prefix

function insertIntoTable() external {
    string memory val = "test value";
    TablelandDeployments.get().mutate(
        address(this), // Table owner, i.e., this contract
        _tableId,
        SQLHelpers.toInsert(
            _TABLE_PREFIX,
            _tableId,
            "val",
            SQLHelpers.quote(val) // Wrap strings in single quotes with the `quote` method
        )
    );
}
```

## [`toBatchInsert`](https://github.com/tablelandnetwork/evm-tableland/blob/e0a6802cf3c55d6df54dbe6260079b613c88b184/contracts/utils/SQLHelpers.sol#L109)

Rather than a single set of values, you can also batch insert data. That is, you must define the set of columns to alter but then pass a string of comma-separated `values`. This will form a statement like `INSERT INTO my_table_1 (val) VALUES ('test value 1'), ('test value 2')`. If you want to send _multiple_ statements that affect different tables instead of the same set of columns on a single table, the `mutate` method can, instead, take an array of strings—you'd use the standard `toInsert` method for that use case.

```solidity
function toBatchInsert(
    string memory prefix,
    uint256 tableId,
    string memory columns,
    string[] memory values
) public view returns (string memory);
```

### Example

Similarly, we can batch insert values into the table with the `val` column—this is just an array of strings that represent each row for the `val` column:

```solidity
uint256 private _tableId; // Unique table ID
string private constant _TABLE_PREFIX = "my_table"; // Custom table prefix

function insertBatchIntoTable() external {
    string[] memory values = new string[](2);
    values[0] = SQLHelpers.quote("test value 1");
    values[1] = SQLHelpers.quote("test value 2");
    TablelandDeployments.get().mutate(
        address(this), // Table owner, i.e., this contract
        _tableId,
        SQLHelpers.toBatchInsert(_TABLE_PREFIX, _tableId, "val", values)
    );
}
```

## [`toUpdate`](https://github.com/tablelandnetwork/evm-tableland/blob/e0a6802cf3c55d6df54dbe6260079b613c88b184/contracts/utils/SQLHelpers.sol#L141)

Form an `UPDATE` statement where the `setters` establishes what values to `SET` existing data to, and `filers` allows for additional checks to add to the update. This response can then be passed to the `mutate` method.

```solidity
function toUpdate(
    string memory prefix,
    uint256 tableId,
    string memory setters,
    string memory filters
) public view returns (string memory);
```

### Example

This will update a value in the table with the `val` column at column `id`:

```solidity
uint256 private _tableId; // Unique table ID
string private constant _TABLE_PREFIX = "my_table"; // Custom table prefix

function updateTable() external {
    uint256 id = 1;
    string memory val = "test value";
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
```

## [`toDelete`](https://github.com/tablelandnetwork/evm-tableland/blob/e0a6802cf3c55d6df54dbe6260079b613c88b184/contracts/utils/SQLHelpers.sol#L167)

Define what and how table data should be deleted with `filters` applied to the `DELETE FROM` statement—the returned string should then be passed to `mutate` for execution.

```solidity
function toDelete(
    string memory prefix,
    uint256 tableId,
    string memory filters
) public view returns (string memory);
```

### Example

This will delete a row in the table for a specific `id`:

```solidity
uint256 private _tableId; // Unique table ID
string private constant _TABLE_PREFIX = "my_table"; // Custom table prefix

function deleteFromTable() external {
    uint256 id = 1;
    // Specify filters for which row to delete
    string memory filters = string.concat(
        "id=",
        Strings.toString(id)
    );
    // Delete a row at `id`
    TablelandDeployments.get().mutate(
        address(this),
        _tableId,
        SQLHelpers.toUpdate(_TABLE_PREFIX, _tableId, filters)
    );
}
```

## [`quote`](https://github.com/tablelandnetwork/evm-tableland/blob/e0a6802cf3c55d6df54dbe6260079b613c88b184/contracts/utils/SQLHelpers.sol#L183)

All `TEXT` types must be inserted into a table wrapped in single quotes (e.g., `'my string'`). In Solidity, this can be a bit cumbersome with doing the string concatenation on your own, so this helper will wrap the `input` string and return it with single quotes around it.

```solidity
function quote(string memory input) public pure returns (string memory);
```

### Example

This will delete a row in the table for a specific `id`:

```solidity
function wrapInSingleQuotes() external {
    string memory val = "test value";
    // Wrap the string in single quotes
    string memory quotedVal = SQLHelpers.quote(val)
}
```
