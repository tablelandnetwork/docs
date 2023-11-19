---
title: SQL helpers library
description: Use the SQL helpers library to make it easier write SQL in Solidity.
keywords:
  - sql helpers
  - solidity
  - toCreateFromSchema
  - toNameFromId
  - toInsert
  - toBatchInsert
  - toUpdate
  - toDelete
  - quote
  - batch insert
  - batch update
  - batch delete
  - batch create
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

## [`toCreateFromSchema`](https://github.com/tablelandnetwork/evm-tableland/blob/e0a6802cf3c55d6df54dbe6260079b613c88b184/contracts/utils/SQLHelpers.sol#L46)

Form a `CREATE TABLE` statement by supplying the table `schema` and custom `prefix`, which then must be passed to the registry contract's `create` method.

```solidity
function toCreateFromSchema(
    string memory schema,
    string memory prefix
) public view returns (string memory);
```

### Example: create single table

A method that creates a table with `id integer primary key, val text` schema and sets the `tableId` storage variable. The result from `toCreateFromSchema` is passed to the registry contract's `create` method.

```solidity
uint256 private _tableId; // Unique table ID—set once table created
string private constant _TABLE_PREFIX = "my_table"; // Custom table prefix

function createTable() external {
    _tableId = TablelandDeployments.get().create(
        address(this), // Table owner, i.e., this contract
        SQLHelpers.toCreateFromSchema(
            "id integer primary key,"
            "val text",
            _TABLE_PREFIX
        )
    );
}
```

For example, if the `toCreateFromSchema` method was called in a Hardhat environment, the chain ID would be `31337`, and the returned string would be a `CREATE TABLE` statement:

```sql
CREATE TABLE my_table_31337 (id integer primary key, val text);
```

As you can see, it's a lot easier to use the helper method vs. having to format this yourself!

### Example: batch create tables

A method that creates two tables and stores them in an array of `tableIds`. It's prudent to store the table information in a mapping or struct to make sure you're getting the correct table ID for a specific prefix, but we're simplifying this for demonstration purposes.

```solidity
uint256[] private _tableIds; // Unique table IDs—set once table created
string private constant _TABLE_PREFIX_ONE = "my_table"; // Custom table prefix
string private constant _TABLE_PREFIX_TWO = "my_other_table";

function createBatchTables() external {
    string[] memory statements = new string[](2);
    statements[0] = SQLHelpers.toCreateFromSchema(
        "id integer primary key,"
        "val text",
        _TABLE_PREFIX_ONE
    );
    statements[1] = SQLHelpers.toCreateFromSchema(
        "id integer primary key,"
        "some_other_val text",
        _TABLE_PREFIX_TWO
    );

    _tableIds = TablelandDeployments.get().create(
        address(this), // Table owner, i.e., this contract
        statements // Array of statement strings
    );
}
```

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
uint256 private _tableId; // Unique table ID—set once table created
string private constant _TABLE_PREFIX = "my_table"; // Custom table prefix

function getTableName() external view returns (string memory) {
    return SQLHelpers.toNameFromId(_TABLE_PREFIX, _tableId);
}
```

For example, if the `toNameFromId` method was called in a Hardhat environment, the chain ID would be `31337`, and let's say your `_tableId` had the value `2`. The returned string would be the universally unique table name:

```sql
my_table_31337_2
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

### Example: single `INSERT` statement

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

For example, if the `toInsert` method was used in a Hardhat environment, the chain ID would be `31337`, and the returned string would be an `INSERT INTO` statement:

```sql
INSERT INTO my_table_31337_2 (val) VALUES ('test value');
```

### Example: batch `INSERT` statements

Here, we must set up `statements` as an array of [`ITablelandTables.Statement`](https://github.com/tablelandnetwork/evm-tableland/blob/ab6162634347028f1138fb04504de7209e797e55/contracts/interfaces/ITablelandTables.sol#L74C1-L77C6). When you send multiple statements to `mutate`, it needs to know the `tableId` and `statement` string for each—these are part of the `Statement` struct.

```solidity
// Use the ITablelandTables interface to get the `Statement` struct
import {ITablelandTables} from "@tableland/evm/contracts/interfaces/ITablelandTables.sol";

uint256[] private _tableIds; // Unique table IDs—set once table created
string private constant _TABLE_PREFIX_ONE = "my_table"; // Custom table prefix
string private constant _TABLE_PREFIX_TWO = "my_other_table";

function insertBatchStatements() external {
    // Set up SQL strings
    string memory val_one = "test value";
    string memory val_two = "other test value";
    string[] memory sql = new string[](2);
    sql[0] = SQLHelpers.toInsert(
        _TABLE_PREFIX_ONE,
        _tableIds[0],
        "val",
        SQLHelpers.quote(val_one)
    );
    sql[1] = SQLHelpers.toInsert(
        _TABLE_PREFIX_TWO,
        _tableIds[1],
        "val",
        SQLHelpers.quote(val_two)
    );

    // Set up statements array of Statement structs
    ITablelandTables.Statement[]
        memory statements = new ITablelandTables.Statement[](2);
    statements[0] = ITablelandTables.Statement(_tableIds[0], sql[0]);
    statements[1] = ITablelandTables.Statement(_tableIds[1], sql[1]);

    TablelandDeployments.get().mutate(
        address(this), // Table owner, i.e., this contract
        statements // Array of Statements
    );
}
```

This would pass distinct SQL statement strings, which differs from the `toBatchInsert` use case below:

```sql
INSERT INTO my_table_31337_2 (val) VALUES ('test value');
INSERT INTO my_other_table_31337_3 (val) VALUES ('other test value');
```

## [`toBatchInsert`](https://github.com/tablelandnetwork/evm-tableland/blob/e0a6802cf3c55d6df54dbe6260079b613c88b184/contracts/utils/SQLHelpers.sol#L109)

Rather than a single row of values, you can also batch insert data across multiple rows for specific columns. That is, you must define the set of columns to alter but then pass a string of comma-separated `values`. This will form a statement like `INSERT INTO my_table_1 (val) VALUES ('test value 1'), ('test value 2')`. If you want to send _multiple_ statement strings instead of the same set of columns on a single table, the `mutate` method can, instead, take an array of strings. You'd use the standard `toInsert` method for that use case (see the example above for more details), and it's useful in case the statements touch different tables.

```solidity
function toBatchInsert(
    string memory prefix,
    uint256 tableId,
    string memory columns,
    string[] memory values
) public view returns (string memory);
```

### Example: single `UPDATE` statement

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

For example, if the `toBatchInsert` method was used in a Hardhat environment, the chain ID would be `31337`, and the returned string would be an `INSERT INTO` statement:

```sql
INSERT INTO my_table_31337_2 (val) VALUES ('test value 1'), ('test value 2');
```

### Example: grouped batch `INSERT` statements

You can refer to the batch `INSERT` example above to see how to set up a batch of statements sent to the `mutate` method. Then, you could replace or use `toBatchInsert` in tandem there. For example, maybe one statement is a full string, and another one is a "grouped" insert:

```solidity
string memory val_one = "test value";
string memory val_two = "other test value";
string[] memory sql = new string[](2);

// A SQL string that affects a table with a single row—as in the example above
sql[0] = SQLHelpers.toInsert(
    _TABLE_PREFIX_ONE,
    _tableIds[0],
    "val",
    SQLHelpers.quote(val_one)
);

// A SQL string that affects a different table with grouped row inserts
// INSERT INTO my_other_table_31337_3 (val) VALUES ('test value'), ('other test value');
string[] memory values = new string[](2);
values[0] = SQLHelpers.quote(val_one);
values[1] = SQLHelpers.quote(val_two);
sql[1] = SQLHelpers.toBatchInsert(
    _TABLE_PREFIX_TWO,
    _tableIds[1],
    "val",
    SQLHelpers.quote(val_two)
);

// Then, form the ITablelandTables.Statement array with the SQL, and pass to `mutate`
```

This would pass distinct SQL statement strings, the latter of which uses `toBatchInsert`:

```sql
INSERT INTO my_table_31337_2 (val) VALUES ('test value');
INSERT INTO my_other_table_31337_3 (val) VALUES ('test value'), ('other test value');
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

### Example: single `UPDATE` statement

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

For example, if the `toUpdate` method was used in a Hardhat environment, the chain ID would be `31337`, and the returned string would be an `UPDATE` statement:

```sql
UPDATE my_table_31337_2 SET val='test value' WHERE id=1;
```

### Example: batch `UPDATE` statements

You can refer to the [batch `INSERT` statements example](#example-batch-insert-statements) above to see how to set up a batch of statements sent to the `mutate` method. Then, use `toUpdate` in tandem there. Recall that you must pass an array of [`ITablelandTables.Statement`](https://github.com/tablelandnetwork/evm-tableland/blob/ab6162634347028f1138fb04504de7209e797e55/contracts/interfaces/ITablelandTables.sol#L74C1-L77C6) to `mutate` in order to send multiple `UPDATE` statements. This array would replace the line above with `SQLHelpers.toUpdate(...)` in the example above, and the `SQLHelpers.toUpdate(...)` calls would happen prior to calling `mutate` while forming the array.

## [`toDelete`](https://github.com/tablelandnetwork/evm-tableland/blob/e0a6802cf3c55d6df54dbe6260079b613c88b184/contracts/utils/SQLHelpers.sol#L167)

Define what and how table data should be deleted with `filters` applied to the `DELETE FROM` statement—the returned string should then be passed to `mutate` for execution.

```solidity
function toDelete(
    string memory prefix,
    uint256 tableId,
    string memory filters
) public view returns (string memory);
```

### Example: single `DELETE` statement

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
        SQLHelpers.toDelete(_TABLE_PREFIX, _tableId, filters)
    );
}
```

For example, if the `toDelete` method was used in a Hardhat environment, the chain ID would be `31337`, and the returned string would be an `DELETE FROM` statement:

```sql
DELETE FROM my_table_31337_2 WHERE id=1;
```

### Example: batch `DELETE` statements

You can refer to the [batch `INSERT` statements example](#example-batch-insert-statements) above to see how to set up a batch of statements sent to the `mutate` method. You must pass an array of [`ITablelandTables.Statement`](https://github.com/tablelandnetwork/evm-tableland/blob/ab6162634347028f1138fb04504de7209e797e55/contracts/interfaces/ITablelandTables.sol#L74C1-L77C6) to `mutate` in order to send multiple `DELETE` statements. This array would replace the line above with `SQLHelpers.toDelete(...)` in the example above, and the `SQLHelpers.toDelete(...)` calls would happen prior to calling `mutate` while forming the array.

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

This would result in the string simply being wrapped in `'` so that it's valid SQL `TEXT`:

```sql
'test value'
```
