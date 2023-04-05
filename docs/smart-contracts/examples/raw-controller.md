---
title: Raw controller
description: Create an raw Tableland controller to trigger the policy without specifying custom rules.
---

This contract shows how to create a "raw" controller, which simply reverts in order to execute a call to `getPolicy(address)`.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.10 <0.9.0;

import {TablelandController} from "@tableland/evm/contracts/TablelandController.sol";
import {TablelandPolicy} from "@tableland/evm/contracts/TablelandPolicy.sol";

contract RawTablelandController is TablelandController {
    function getPolicy(
        address,
        uint256
    ) external payable virtual override returns (TablelandPolicy memory) {
        // Revert w/o reason string to trigger call to getPolicy(address)
        // solhint-disable-next-line reason-string
        revert();
    }
}
```
