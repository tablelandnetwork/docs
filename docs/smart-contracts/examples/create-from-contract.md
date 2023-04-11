---
title: Create from contract
description: Create a table from a contract.
---

Smart contracts can create tables on behalf of some caller, which then mints a table to the `msg.sender`. This is a factory pattern where the contract is tracking ownership with a `mapping(string => uint256)` of table names to table IDs.

Note that in order for _the contract_ to own a table (i.e., minting to `address(this)` over `msg.sender`), you would have to implement ERC721 contract ownership through an interface or some inheritance pattern. You can learn how to do this in [this walkthrough](/smart-contracts/contract-owned-tables).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.10 <0.9.0;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ITablelandTables} from "@tableland/evm/contracts/interfaces/ITablelandTables.sol";

contract CreateFromContract is ERC721, Ownable {
    mapping(string => uint256) public tables;

    ITablelandTables private _tableland;

    constructor(address registry) ERC721("TestCreateFromContract", "MTK") {
        _tableland = ITablelandTables(registry);
    }

    function create(string memory name) public payable {
        require(tables[name] == 0, "name already exists");

        // Make sure we can get table_id back from calling createTable
        uint256 tableId = _tableland.createTable(
            msg.sender,
            string(
                abi.encodePacked(
                    "CREATE TABLE ",
                    name,
                    "_31337 (int id, string name, string description, string external_link);"
                )
            )
        );

        tables[name] = tableId;
    }
}
```
