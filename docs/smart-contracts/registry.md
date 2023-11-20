---
title: Registry contract
description: Understand the Tableland Registry contract for SQL interactions.
keywords:
  - registry
  - tableland registry
  - solidity
  - create
  - mutate
  - setController
  - getController
  - lockController
  - safeTransferFrom
  - transfer table
---

## Overview

The Tableland registry smart contract controls the creation and mutation of tables as well as access controls. When you interact with the registry contract, you pass raw SQL statements that are emitted and later materialized at the Tableland validator node.

When interacting the the registry, it's easiest to use a combination of the `TablelandDeployments.sol` and `SQLHelpers.sol` to form the SQL statements. You can choose to _not_ use these libraries, but it's highly recommend to do so. You can check out examples for how to use these libraries in the [Tableland Deployments](/smart-contracts/tableland-deployments) and [SQL Helpers](/smart-contracts/sql-helpers) pages, which outline how to use them with the registry methods. For example, you can chain `TablelandDeployments.get().create(...)` to create a table, and this pattern holds true for all of the other methods defined below.

## [`create`](https://github.com/tablelandnetwork/evm-tableland/blob/ab6162634347028f1138fb04504de7209e797e55/contracts/TablelandTables.sol#L67)

Creates a new table owned by `owner` using `statement` and returns its `tableId`:

- `owner`: The to-be owner of the new table.
- `statement`: The `CREATE TABLE` SQL statement used to create the table.

```solidity
function create(
    address owner,
    string memory statement
) external payable returns (uint256);
```

See the SQL Helpers page with an example for creating a table: [here](/smart-contracts/sql-helpers#example-create-single-table).

## Batch [`create`](https://github.com/tablelandnetwork/evm-tableland/blob/ab6162634347028f1138fb04504de7209e797e55/contracts/TablelandTables.sol#L77)

An overloaded function also exists—the only difference is that `statements` is an array of `CREATE TABLE` statements, and the return type will be an array of table IDs:

```solidity
function create(
    address owner,
    string[] calldata statements
) external payable returns (uint256[] memory);
```

See the SQL Helpers page with an example for creating multiple table: [here](/smart-contracts/sql-helpers#example-batch-create-tables).

## [`mutate`](https://github.com/tablelandnetwork/evm-tableland/blob/ab6162634347028f1138fb04504de7209e797e55/contracts/TablelandTables.sol#L110)

Creates a new table owned by `owner` using `statement` and returns its `tableId`:

- `caller`: The address that is running the SQL statement. The `msg.sender` must be `caller`, and the `caller` must be authorized by the table controller if the statement is mutating.
  - E.g., if a smart contract calls the registry, it'd use `address(this)` as the caller.
- `tableId`: The ID of the target table.
- `statement`: The SQL statement to run (`INSERT`, `UPDATE`, `DELETE`, `GRANT`, or `REVOKE`).

```solidity
function mutate(
    address caller,
    uint256 tableId,
    string calldata statement
) external payable;
```

See the SQL Helpers page with an example for a single `INSERT` statement against a table: [here](/smart-contracts/sql-helpers#example-single-insert-statement). The same pattern can be used for the other possible mutating methods noted above.

## Batch [`mutate`](https://github.com/tablelandnetwork/evm-tableland/blob/ab6162634347028f1138fb04504de7209e797e55/contracts/TablelandTables.sol#L121)

An overloaded function can also be used. The difference is that `statements` is an array of [`ITablelandTables.Statement`](https://github.com/tablelandnetwork/evm-tableland/blob/ab6162634347028f1138fb04504de7209e797e55/contracts/interfaces/ITablelandTables.sol#L74C1-L77C6), defined as:

```solidity
struct Statement {
    uint256 tableId;
    string statement;
}
```

The batching method is as follows:

```solidity
function mutate(
    address caller,
    ITablelandTables.Statement[] calldata statements
) external payable;
```

See the SQL Helpers page with an example for multiple `INSERT` statements against a table. [here](/smart-contracts/sql-helpers#example-batch-insert-statements), and there are other examples for `UPDATES` or `DELETES` as well.

## [`getController`](https://github.com/tablelandnetwork/evm-tableland/blob/e0a6802cf3c55d6df54dbe6260079b613c88b184/contracts/TablelandTables.sol#L262)

Get the current controller address for a table:

- `tableId`: The id of the target table.

```solidity
function getController(uint256 tableId) external returns (address);
```

If a table has its controller set (e.g., using `setController`), this method will return the corresponding address via a _direct_ smart contract call. Otherwise, all tables default to the `0x0` address as being the table’s controller.

See the controllers page for an example: [here](/smart-contracts/controller/setting-controllers#getting-the-controller).

## [`setController`](https://github.com/tablelandnetwork/evm-tableland/blob/e0a6802cf3c55d6df54dbe6260079b613c88b184/contracts/TablelandTables.sol#L243)

Set the controller address for a table:

- `caller`: The address that is setting the controller. The `msg.sender` must be `caller` and owner of `tableId`
- `tableId`: The ID of the target table.
- `controller`: The address of the controller (EOA or contract).

```solidity
function setController(
    address caller,
    uint256 tableId,
    address controller
) external;
```

Only the table owner can set the controller of a table to an address, such as another account address or contract that implements the `ITablelandController` ACL policy. However, a table with a _locked_ controller can no longer have its controller be set, again.

See the controllers page for an example: [here](/smart-contracts/controller/setting-controllers#setting-the-controller).

## [`lockController`](https://github.com/tablelandnetwork/evm-tableland/blob/e0a6802cf3c55d6df54dbe6260079b613c88b184/contracts/TablelandTables.sol#L271)

Lock the controller address for a table:

- `caller`: The address that is locking the controller. The `msg.sender` must be `caller` and owner of `tableId`
- `tableId`: The id of the target table.

```solidity
function lockController(address caller, uint256 tableId) external;
```

A table can have its controller **permanently locked**. This can be useful as a final ACL "lock" to ensure the table owner can no longer make any ACL changes (e.g., after some steady state in a production setting). Only the table owner can call this method.

See the controllers page for an example: [here](/smart-contracts/controller/setting-controllers#locking-the-controller).

## `safeTransferFrom`

Safely transfers a table between accounts (inherited from `ERC721A`)

- `from`: The current owner of the table. The caller must own the token or be an approved operator.
- `to`: The new owner of the table.
- `tokenId`: The ID of the target table.

```solidity
function safeTransferFrom(
    address from,
    address to,
    uint256 tokenId
) external payable;
```

See the Tableland Deployments page for example: [here](/smart-contracts/controller/setting-controllers#transfer-a-table).
