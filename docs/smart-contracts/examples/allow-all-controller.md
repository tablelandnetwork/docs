---
title: Allow all controller
description: Provision access so that any account can perform any action on a table.
---

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.10 <0.9.0;

import {TablelandController} from "@tableland/evm/contracts/TablelandController.sol";
import {TablelandPolicy} from "@tableland/evm/contracts/TablelandPolicy.sol";

contract TestAllowAllTablelandController is TablelandController {
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
