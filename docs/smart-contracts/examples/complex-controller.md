---
title: Complex controller
description: Create a controller with balance and token ownership checks.
---

A more complex controller can provision write access in, really, any way you'd like! This example contract does a few things:

- Checks the sender has sent some required value in order to execute the query (e.g., pay 1 ETH to mutate data).
- Checks ownership of some token at `_foos` and `_bars`, each which have a token ID in a table such that your `WHERE` clause will include a `foo_id` and `bar_id` column, respectively.
- If these checks pass, only allow an update and restrict it to a specific column like `baz`, but only if the supplied value is passes a check of being `> 0`.

If you can program the rules in a smart contract, you can program how data is mutated.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.10 <0.9.0;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {TablelandController} from "@tableland/evm/contracts/TablelandController.sol";
import {TablelandPolicy} from "@tableland/evm/contracts/TablelandPolicy.sol";
import {Policies} from "@tableland/evm/contracts/policies/Policies.sol";
import {ERC721EnumerablePolicies} from "@tableland/evm/contracts/policies/ERC721EnumerablePolicies.sol";
import {ERC721AQueryablePolicies} from "@tableland/evm/contracts/policies/ERC721AQueryablePolicies.sol";

contract ComplexController is TablelandController, Ownable {
    error InsufficientValue(uint256 receivedValue, uint256 requiredValue);

    uint256 public constant REQUIRED_VALUE = 1 ether;

    address private _foos;
    address private _bars;

    function getPolicy(
        address caller,
        uint256
    ) public payable override returns (TablelandPolicy memory) {
        // Enforce some ether and revert if insufficient
        if (msg.value < 1 ether) {
            revert InsufficientValue(msg.value, REQUIRED_VALUE);
        }

        // The following line is for coverage of a revert/require error
        require(msg.value == 1 ether, "too much ether!");

        string[] memory whereClauses = new string[](2);
        string[] memory withChecks = new string[](3);

        // Require one of FOO
        whereClauses[0] = ERC721EnumerablePolicies.getClauseForRequireOneOf(
            caller,
            _foos,
            "foo_id"
        );

        // Require one of BAR
        whereClauses[1] = ERC721AQueryablePolicies.getClauseForRequireOneOf(
            caller,
            _bars,
            "bar_id"
        );

        // Restrict updates to a single column
        string[] memory updatableColumns = new string[](1);
        updatableColumns[0] = "baz";

        // Include a check on the incoming data
        withChecks[0] = ""; // included to filter in Policies.joinClauses
        withChecks[1] = "baz > 0";
        withChecks[2] = ""; // included to filter in Policies.joinClauses

        // Return policy
        return
            TablelandPolicy({
                allowInsert: false,
                allowUpdate: true,
                allowDelete: false,
                whereClause: Policies.joinClauses(whereClauses),
                withCheck: Policies.joinClauses(withChecks),
                updatableColumns: updatableColumns
            });
    }

    function setFoos(address foos) external onlyOwner {
        _foos = foos;
    }

    function setBars(address bars) external onlyOwner {
        _bars = bars;
    }
}
```
