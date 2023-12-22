---
title: Controller contract anatomy
sidebar_label: Controller contract
description: Dive into into the Tableland controller contract's design.
keywords:
  - smart contracts
  - controllers
  - access control
tags:
  - access control
---

A controller needs to implement the `TablelandController` abstract contract (or the `ITablelandController` interface). This enables advanced, custom access control features. Note the default access controls define that only the owner can control everything on the table—this is implemented by default in the `TablelandTables` registry contract, so if you don't create/set your own controller, those rules are applied.

## Controller anatomy

### `getPolicy` method

The [`TablelandController`](https://github.com/tablelandnetwork/evm-tableland/blob/main/contracts/TablelandController.sol) inherits from the [`ITablelandController`](https://github.com/tablelandnetwork/evm-tableland/blob/main/contracts/interfaces/ITablelandController.sol). It implements a single `getPolicy` method that returns a [`TablelandPolicy`](https://github.com/tablelandnetwork/evm-tableland/blob/main/contracts/TablelandPolicy.sol); this is the core of the access control logic.

The `getPolicy` method signature is the following:

```solidity title="@tableland/evm/contracts/TablelandController.sol"
function getPolicy(address caller, uint256 tableId)
    external
    payable
    virtual
    override
    returns (TablelandPolicy memory);
```

Here's how it works:

- `caller`: The address that is attempting to access the table.
  - For example, the address calling the registry contract's `create` or `mutate` method.
- `tableId`: The ID of the table that is being mutated.
- `payable`: Used to allow the controller to, optionally, charge a fee for the access control (e.g., require payment to mutate data).

Once you create a controller contract, you then call the `setController` method on the `TablelandTables` registry contract—see [here](smart-contracts/controller/setting-controllers) for more details. This will set the controller for the specified table ID so that it returns a unique policy for the specific table.

### `TablelandPolicy` struct

The return type for a controller is a `TablelandPolicy`, which specifies access control rules for the caller on the table ID:

```solidity title="@tableland/evm/contracts/TablelandPolicy.sol"
struct TablelandPolicy {
    bool allowInsert;
    bool allowUpdate;
    bool allowDelete;
    string whereClause;
    string withCheck;
    string[] updatableColumns;
}
```

It has the following properties:

- `allowInsert`: Whether or not the table should allow SQL `INSERT` statements.
- `allowUpdate`: Whether or not the table should allow SQL `UPDATE` statements.
- `allowDelete`: Whether or not the table should allow SQL `DELETE` statements.
- `whereClause`: A conditional `WHERE` clause used with SQL UPDATE and DELETE statements.
  - For example, a value of `"foo > 0"` will concatenate all SQL `UPDATE` and/or `DELETE` statements with `"WHERE foo > 0"`. This can be useful for limiting how a table can be modified. Also, the `Policies` library's `joinClauses` should be used to include more than one condition.
- `withCheck`: A conditional `CHECK` clause used with SQL INSERT statements.
  - For example, a value of `"foo > 0"` will concatenate all SQL `INSERT` statements with a check on the incoming data. Namely, `"CHECK (foo > 0)"`. This can be useful for limiting how table data ban be added. Also, the `Policies` library's `joinClauses` should be used to include more than one condition.
- `updatableColumns`: A list of SQL column names that can be updated.

## Example controller

The following example shows how to create a controller—it imports the `TablelandController` contract and implements the `getPolicy` method to return a `TablelandPolicy` that allows operations by any caller with no restrictions:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.10 <0.9.0;

import {TablelandController} from "@tableland/evm/contracts/TablelandController.sol";
import {TablelandPolicy} from "@tableland/evm/contracts/TablelandPolicy.sol";

contract Controller is TablelandController {
    function getPolicy(
        address caller,
        uint256
    ) public payable override returns (TablelandPolicy memory) {
        // Return allow-all policy if the caller is the owner
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
}
```

## Policies library

To make it easier to work with more complex `WHERE` and `WITH CHECK` clauses, the [`Policies`](https://github.com/tablelandnetwork/evm-tableland/blob/main/contracts/policies/Policies.sol) library provides a `joinClauses` method that can be used to concatenate multiple clauses. For example, the following code will return `"WHERE foo > 0 AND bar = 1"`:

```solidity
// Import the Policies library
import {Policies} from "@tableland/evm/contracts/policies/Policies.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

// ...
// Set up WHERE clause with two conditions
string[] memory whereClause = new string[](2);
uint256 foo = 0;
uint256 bar = 1;
whereClause[0] = string.concat(
    "foo > ",
    Strings.toString(foo)
);
whereClause[0] = string.concat(
    "bar = ",
    Strings.toString(bar)
);
string[] memory clauses = Policies.joinClauses(whereClause);
```

In this example, both `foo` and `bar` are `INTEGER` columns in SQL, and in Solidity, they are `uint256` types. We first convert them to a string with the OpenZeppelin `Strings` library before concatenating with the clause condition. Note that if you're ever dealing with `TEXT` or `BLOB` SQL types, they must always be wrapped in single quotes—the [`SQLHelpers`](/smart-contracts/sql-helpers) library provides a nice `quote` method for this.

For reference, this is what the library looks like; it simply concatenates the clauses with `" and "`:

```solidity title="@tableland/evm/contracts/policies/Policies.sol"
library Policies {
    function joinClauses(
        string[] memory clauses
    ) internal pure returns (string memory) {
        bytes memory clause;
        for (uint256 i = 0; i < clauses.length; i++) {
            if (bytes(clauses[i]).length == 0) {
                continue;
            }
            if (bytes(clause).length > 0) {
                clause = bytes.concat(clause, bytes(" and "));
            }
            clause = bytes.concat(clause, bytes(clauses[i]));
        }
        return string(clause);
    }
}
```
