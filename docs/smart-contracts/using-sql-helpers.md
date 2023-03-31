---
title: Using SQLHelpers
description: Use the SQL helpers library to make it easier write SQL in Solidity.
---

When creating and writing to tables, Solidity can be a bit challenging to work with when it comes to forming SQL statements. The `SQLHelpers` library provides a series of helper methods to ease writing create table statements, insert, updates, and deletes, and it also has a couple of common helpers. This page describes these methods, their function signatures, and links to the actual implementation.

## [`toNameFromSchema`](https://github.com/tablelandnetwork/evm-tableland/blob/b350a363ea3d10bbeb3d3a088e9c27c77c6cae30/contracts/utils/SQLHelpers.sol#L20)

Pass a table `prefix` and `tableId`, which returns the formatted table name as `{prefix}_{chainId}_{tableId}` (e.g., `healthbot_1_1`).

```solidity
function toNameFromId(
    string memory prefix,
    uint256 tableId
) public view returns (string memory);
```

## [`toCreateFromSchema`](https://github.com/tablelandnetwork/evm-tableland/blob/b350a363ea3d10bbeb3d3a088e9c27c77c6cae30/contracts/utils/SQLHelpers.sol#L46)

Form a `CREATE TABLE` statement by supplying the table `schema` and custom `prefix`, which then must be passed to the registry contract's `createTable` method.

```solidity
function toCreateFromSchema(
    string memory schema,
    string memory prefix
) public view returns (string memory);
```

## [`toInsert`](https://github.com/tablelandnetwork/evm-tableland/blob/b350a363ea3d10bbeb3d3a088e9c27c77c6cae30/contracts/utils/SQLHelpers.sol#L76)

Generate an `INSERT` statement with the specified columns and values for a specific table, which then can be passed to the registry's `runSQL` method to mutate the table itself.

```solidity
function toInsert(
    string memory prefix,
    uint256 tableId,
    string memory columns,
    string memory values
) public view returns (string memory)
```

## [`toBatchInsert`](https://github.com/tablelandnetwork/evm-tableland/blob/b350a363ea3d10bbeb3d3a088e9c27c77c6cae30/contracts/utils/SQLHelpers.sol#L109)

Rather than a single set of values, you can also batch insert data. That is, you must define the set of columns to alter but then pass a string of comma-separated `values`.

```solidity
function toBatchInsert(
    string memory prefix,
    uint256 tableId,
    string memory columns,
    string[] memory values
) public view returns (string memory);
```

## [`toUpdate`](https://github.com/tablelandnetwork/evm-tableland/blob/b350a363ea3d10bbeb3d3a088e9c27c77c6cae30/contracts/utils/SQLHelpers.sol#L141)

Form an `UPDATE` statement where the `setters` establishes what values to `SET` existing data to, and `filers` allows for additional checks to add to the update. This response can then be passed to the `runSQL` method.

```solidity
function toUpdate(
    string memory prefix,
    uint256 tableId,
    string memory setters,
    string memory filters
) public view returns (string memory);
```

## [`toDelete`](https://github.com/tablelandnetwork/evm-tableland/blob/b350a363ea3d10bbeb3d3a088e9c27c77c6cae30/contracts/utils/SQLHelpers.sol#L167)

Define what and how table data should be deleted with `filters` applied to the `DELETE FROM` statement—the returned string should then be passed to `runSQL` for execution.

```solidity
function toDelete(
    string memory prefix,
    uint256 tableId,
    string memory filters
) public view returns (string memory);
```

## [`toQuote`](https://github.com/tablelandnetwork/evm-tableland/blob/b350a363ea3d10bbeb3d3a088e9c27c77c6cae30/contracts/utils/SQLHelpers.sol#L183)

All `TEXT` types must be inserted into a table wrapped in single quotes (e.g., `'my string'`). In Solidity, this can bea bit cumbersome with doing the string concatenation on your own, so this helper will wrap the `input` string and return it with single quotes around it.

```solidity
function quote(string memory input) public pure returns (string memory);
```
