---
title: Allow all controller
description: Provision access so that any account can perform any action on a table.
---

The allow all controller enables exactly as it sounds—allow _anyone_ to do _anything_ on a table. It is the definition of fully opening up for collaborative data, but keep in mind that this includes inserting, updating, and deleting data on any row/column. Thus, it's more common to add some addition logic checks before returning the `TablelandPolicy`; if those checks don't pass, perhaps you return a different policy.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.10 <0.9.0;

import {TablelandController} from "@tableland/evm/contracts/TablelandController.sol";
import {TablelandPolicy} from "@tableland/evm/contracts/TablelandPolicy.sol";

contract AllowAllController is TablelandController {
  function getPolicy(
    address,
    uint256
  ) public payable override returns (TablelandPolicy memory) {
    // Return allow-all policy
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
