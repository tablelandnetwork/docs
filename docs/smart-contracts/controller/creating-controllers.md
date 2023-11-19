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

Similar to the example above, you could choose to disable everything by setting `false` or empty values:

```solidity
ITablelandController.Policy({
  allowInsert: false,
  allowUpdate: false,
  allowDelete: false,
  whereClause: Policies.joinClauses(new string[](0)),
  withCheck: Policies.joinClauses(new string[](0)),
  updatableColumns: new string[](0)
});
```

### Example implementation

The following example shows how to import the `ITablelandController` interface and then create a policy that only allows `INSERT`s on a table, from any address.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@tableland/evm/contracts/ITablelandController.sol";
import "@tableland/evm/contracts/policies/Policies.sol";

contract ExamplePolicy is ITablelandController {
  function getPolicy(address sender)
      public
      payable
      override
      returns (ITablelandController.Policy memory)
  {

    /*
    * Add any custom ACL check here, like token ownership.
    */

    // Return allow-insert policy
    return
      ITablelandController.Policy({
        allowInsert: true,
        allowUpdate: false,
        allowDelete: false,
        whereClause: Policies.joinClauses(new string[](0)),
        withCheck: Policies.joinClauses(new string[](0)),
        updatableColumns: new string[](0)
      });
  }
}
```

Alternatively, you could lock down your table to "allow none" for now, and then _unlock_ your policy with a modification later. A dynamic policy could be interesting in cases such as post-reveal during your NFT launch.
