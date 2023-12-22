---
title: Creating controllers
description: Understand how to create a controller contract.
keywords:
  - smart contracts
  - controllers
  - access control
tags:
  - access control
---

This page highlights a few examples of how to create a controller contract in Solidity.

### "Allow all" policy

Default ownership grants the owner the following "allow all" abilities to only the owner, but a custom controller could enable this for _anyone_:

- `allowInsert` ⇒ `true`
  Allow `INSERT`s into the table.
- `allowUpdate` ⇒ `true`
  Allow `UPDATE` on all columns.
- `allowDelete` ⇒ `true`
  Allow `DELETE`, including using `WHERE` statements.
- `whereCheck` ⇒ `""`
  Defaults to an empty string, meaning, no `WHERE` clause additions are implemented.
- `withCheck` ⇒ `""`
  Defaults to an empty string, meaning, no `CHECK` clause additions are implemented.
- `updatableColumns` ⇒ `new string[](0)`
  Defaults to an empty list, meaning, there are no restrictions on which columns can be updated.

In other words, if a custom `TablelandController` contract has not been set, the default values for the `Policy` are those defined above.

### "Allow none" policy

Similar to the example above, you could choose to disable everything by setting `false` or empty values. This would essentially lock the table from being mutated.

```solidity
TablelandPolicy({
  allowInsert: false,
  allowUpdate: false,
  allowDelete: false,
  whereClause: "",
  withCheck: "",
  updatableColumns: new string[](0)
});
```

### Allow update for columns

You can easily create a policy that allows `UPDATE`s on a table, but only for certain columns and with restriction. For example, the following policy allows `UPDATE`s for:

- Only the `baz` column can be updated.
- Only for rows that pass the `WHERE` clause to check the value of `foo > 0` and `bar = 10`.
- Also makes a check on the `baz` data being updated, ensuring it is less than 100.

Note that if there are multiple `WHERE` or `WITH CHECK` clauses, the `Policies` (`@tableland/evm/contracts/policies/Policies.sol`) library's `joinClauses` should be used to concatenate them.

```solidity
// Updatable columns
string[] updatableCols = new string[](1);
updatableCols[0] = "baz";

// WHERE clause
string[] whereClause = new string[](2);
whereClause[0] = "foo > 0";
whereClause[1] = "bar = 10";

// WITH CHECK clause
string[] withClause = new string[](1);
withClause[0] = "baz < 100";

TablelandPolicy({
  allowInsert: true,
  allowUpdate: false,
  allowDelete: false,
  whereClause: Policies.joinClauses(whereClause),
  withCheck: withClause,
  updatableColumns: updatableCols
});
```

For example, the example above will define `"WHERE foo > 0 AND bar = 10"`.

### Example implementation

The following example shows how to import the `TablelandController` interface and then create a policy that only allows `INSERT`s on a table, from any address.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import {TablelandController} from "@tableland/evm/contracts/TablelandController.sol";
import {TablelandPolicy} from "@tableland/evm/contracts/TablelandPolicy.sol";

contract ExamplePolicy is TablelandController {
    function getPolicy(
        address,
        uint256
    ) public payable override returns (TablelandPolicy memory) {
        // Return allow-insert policy
        return
            TablelandPolicy({
                allowInsert: true,
                allowUpdate: false,
                allowDelete: false,
                whereClause: "",
                withCheck: "",
                updatableColumns: new string[](0)
            });
    }
}
```

Alternatively, you could lock down your table to "allow none" for now, and then _unlock_ your policy with a modification later. A dynamic policy could be interesting in cases such as post-reveal during your NFT launch.
