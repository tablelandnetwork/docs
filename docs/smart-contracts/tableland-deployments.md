---
title: Tableland deployments library
description: Use the Tableland Deployments library to set interfaces the Tableland registry contract.
---

To make it easier to interact with the Tableland registry, the [`TablelandDeployments`](https://github.com/tablelandnetwork/evm-tableland/blob/main/contracts/utils/TablelandDeployments.sol) library will dynamically provide the implementation for the registry contract. It infers the `chainid` from the contract call and return the correct contract for the respective network.

## Installation

First, install `@tableland/evm` as a dependency:

```bash npm2yarn
npm install --save-dev @tableland/evm
```

Then in your smart contract, import the `TablelandDeployments` library:

```solidity
import {SQLHelpers} from "@tableland/evm/contracts/utils/TablelandDeployments.sol";
```

Note the examples use `address(this)` for table operations. These assume the table [can own an ERC721 token](/smart-contracts/contract-owned-tables).

## [`get`](https://github.com/tablelandnetwork/evm-tableland/blob/e0a6802cf3c55d6df54dbe6260079b613c88b184/contracts/utils/TablelandDeployments.sol#L65) the registry

The `get()` method returns the implementation for the `TablelandTables` registry contract:

```solidity
function get() internal view returns (TablelandTables);
```

There are internal constants stored in the library, such as:

```solidity
address internal constant MAINNET = 0x012969f7e3439a9B04025b5a049EB9BAD82A8C12;
address internal constant POLYGON = 0x5c4e6A9e5C1e1BF445A062006faF19EA6c49aFeA;
address internal constant FILECOIN = 0x59EF8Bf2d6c102B4c42AEf9189e1a9F0ABfD652d;
address internal constant SEPOLIA = 0xc50C62498448ACc8dBdE43DA77f8D5D2E2c7597D;
// etc...
```

So, when you call `TablelandDeployments.get()`, it will return the correct `TablelandTables` implementation for the respective network after going through logic that checks the `chainid`:

```solidity
if (block.chainid == 1) {
    return TablelandTables(MAINNET);
} else if (block.chainid == 314) {
    return TablelandTables(FILECOIN);
}
// etc...
```

### Examples

All of the available registry methods (creating, mutating, controllers, transfers) can be chained to `get()`, but a few examples are provided below.

#### `create` a table

A simple example of creating a table—the `TablelandDeployments.get()` chains with the `create` method from the registry contract:

```solidity
uint256 private _tableId; // Unique table ID
string private constant _TABLE_PREFIX = "my_table"; // Custom table prefix

function createTable() external {
    _tableId = TablelandDeployments.get().create(
        address(this), // Table owner, i.e., this contract
        SQLHelpers.toCreateFromSchema(
            "id integer primary key,"
            "address text,"
            "val text",
            _TABLE_PREFIX
        )
    );
}
```

#### `mutate` data in a table

A simple example of mutating data a table—the `TablelandDeployments.get()` chains with the `mutate` method from the registry contract:

```solidity
uint256 private _tableId; // Unique table ID
string private constant _TABLE_PREFIX = "my_table"; // Custom table prefix

function insertIntoTable() external {
    string memory val = "test value";
    TablelandDeployments.get().mutate(
        address(this), // Table owner, i.e., this contract
        _tableId,
        SQLHelpers.toInsert(
            _TABLE_PREFIX,
            _tableId,
            "val",
            SQLHelpers.quote(val) // Wrap strings in single quotes with the `quote` method
        )
    );
}
```

#### Set a table `controller`

A simple example of mutating data a table—the `TablelandDeployments.get()` chains with the `mutate` method from the registry contract. Note this method should have guard logic to ensure the caller is the table owner, like an `onlyOwner` modifier:

```solidity
uint256 private _tableId; // Unique table ID
string private constant _TABLE_PREFIX = "my_table"; // Custom table prefix

function updateController() external {
   TablelandDeployments.get().setController(
      address(this), // Table owner
      _tableId, // Table ID
      "0x70997970C51812dc3A010C7d01b50e0d17dc79C8" // New owner
    );
}
```

#### Transfer a table

The `safeTransferFrom` method will transfer a table from the owner to a new address. The caller _must_ own the table or be an approved operator—this functions like an NFT transfer would.

```solidity
uint256 private _tableId; // Unique table ID
string private constant _TABLE_PREFIX = "my_table"; // Custom table prefix

function transferTable(uint256 tableId) external {
   TablelandDeployments.get().safeTransferFrom(
      address(this), // Table owner
      msg.sender, // New owner
      _tableId // Table ID
    );
}
```

## [`getBaseURI`](https://github.com/tablelandnetwork/evm-tableland/blob/e0a6802cf3c55d6df54dbe6260079b613c88b184/contracts/utils/TablelandDeployments.sol#L104) for the gateway

The `getBaseURI()` method returns the correct gateway base URI for the Tableland validator:

```solidity
function getBaseURI() internal view returns (string memory);
```

Recall there are three gateway variants:

- `https://tableland.network/api/v1/`
- `https://testnets.tableland.network/api/v1/`
- `http://localhost:8080/api/v1/`

Similar to the `get()` method, the `chainid` is inferred and returns the correct gateway string. Here's a sample of the logic, for reference:

```solidity
if (block.chainid == 1) {
    return "https://tableland.network/api/v1/";
} else if (block.chainid == 11155111) {
    return "https://testnets.tableland.network/api/v1/";
} else if (block.chainid == 31337) {
    return "http://localhost:8080/api/v1/";
}
// etc...
```

### Example

You can use the `getBaseURI()` method to construct the gateway URI for your table—which is helpful if you're ever setting the base URI during contract deployment or method calls:

```solidity
function baseURI() external view returns (string memory) {
    return TablelandDeployments.get().getBaseURI();
}
```
