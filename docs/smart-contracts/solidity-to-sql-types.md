---
title: Solidity to SQL Types
description: Review the best practices for Solidity types and SQL compatibility.
keywords:
  - create table
---

To prevent overflows while working with Solidity numbers, it is recommended to use a `text` type in certain scenarios. Anything larger than a `uint64` / `int32` _could_ lead to an overflow in the SQLite database. Note that in many use cases, it is _unlikely_ overflows will happen due to the extremely large size of these numbers.

Alternatively, consider casting the overflow-able numbers to or simply use a `int64` in smart contracts if it makes sense for the use case.

## Type conversion

See the following tables for how each Solidity number should be defined in Tableland schemas:

| Solidity Type | SQL Type |
| ------------- | -------- |
| uint256       | text     |
| uint128       | text     |
| uint64        | text     |
| uint32        | integer  |
| uint16        | integer  |
| uint8         | integer  |

| Solidity Type | SQL Type |
| ------------- | -------- |
| int256        | text     |
| int128        | text     |
| int64         | integer  |
| int32         | integer  |
| int16         | integer  |
| uint8         | integer  |

Other best practices have also been defined below:

| Solidity Type | SQL Type |
| ------------- | -------- |
| string        | text     |
| address       | text     |
| bytes         | blob     |
| bool          | text     |
| bool int8     | integer  |

:::tip
Tableland doesn’t support boolean values, so instead of using a Solidity `bool`, consider using a `uint8` to represent a true/false as `1` or `0`, which is then stored in Tableland as an `integer`.

:::

## Strings & Casting

A common practice is to use the `[Strings](https://docs.openzeppelin.com/contracts/3.x/api/utils#Strings)` library by OpenZeppelin when writing SQL statements in Solidity. This library has a number of useful methods, including `toString`, which takes a `uint256` and converts it into the `string` type.

For example, a quick and dirty "simple" cast from a `uint` to a `uint256` before calling the `Strings.toString()` method could resemble the following. The `multipleToString` method is simply an example of how to concatenate multiple strings together, which is often useful when generating SQL statements that use variables. Basically, use the `string` casting and `abi.encodePacked` with a comma-separated list of values with type `string`.

```tsx
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Strings.sol";

contract SimpleCast {
    function uint8ToString(uint8 _i) internal pure returns (string memory str) {
        return string(Strings.toString(_i));
    }
    function multipleToString(uint8 _i, uint8 _j) internal pure returns (string memory str) {
        return string(abi.encodePacked(Strings.toString(_i), " and ", Strings.toString(_j)));
    }
}
```

It's possible to cast any _unsigned_ integer to a `uint256` using `uint256(<number_here>)`. Since the `toString` method takes `uint256`, the casting is performed implicitly, meaning, `uint256(_i)` is unneeded in the example above (i.e., no need for `string(Strings.toString(uint256(_i)))`).

For math reasons, there exists a `[SafeCast](https://docs.openzeppelin.com/contracts/3.x/api/utils#SafeCast)` library as well, which handles a full suite of number conversion possibilities. There are safety considerations to take into account since Solidity does not revert on overflows, so it’s always recommended to proceed with caution and ensure the proper testing has been performed in casting scenarios. Below is an example of how to use `SafeCast` to convert a signed integer `int8` to an unsigned `uint256`, thus, enabling `int8` to be used by the `Strings` library. Note that it still cannot convert a negative number into a positive one without some additional logic:

```tsx
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/math/SafeCast.sol";

contract SimpleCast {
    function positiveInt8ToString(int8 _i) internal pure returns (string memory str) {
        return string(Strings.toString(SafeCast.toUint256(_i)));
    }
    function anyInt8ToString(int8 _i) internal pure returns (string memory str) {
        if(_i < 0) {
            return string(abi.encodePacked('-', Strings.toString(SafeCast.toUint256(_i * -1))));
        }
        return string(Strings.toString(SafeCast.toUint256(_i)));
    }
}
```

For reference, the `SafeCast` library comes equipped with all potential casting possibilities needed for number conversion. This includes the following:

- `toUint8`
- `toUint16`
- `toUint32`
- `toUint64`
- `toUint128`
- `toUint256`

- `toInt8`
- `toInt16`
- `toInt32`
- `toInt64`
- `toInt128`
- `toInt256`

More information can be found in the `SafeCast` documentation: [here](https://docs.openzeppelin.com/contracts/3.x/api/utils#SafeCast).

## Addresses & Casting

The `Strings` library also comes with a `toHexString` method. This can be used to easily convert an address to a string and insert the value into a table. As a best practice, the `address` should be of type `text` in the Tableland world. For example, take some method that allows the calling address `_addr` to insert itself into a table:

```tsx
/* schema: address text */
function insertAddress(
		address _addr,
		unint256 tableId,
		string tableName,
		address tableland
	) public {
		string memory addr = Strings.toHexString(_addr);
		tableland.runSQL(
			_addr,
			tableId,
			// INSERT INTO {tableName} VALUES ('{addr}');
			string.concat(
				"INSERT INTO ",
				tableName,
				" VALUES ",
				"('",
				addr,
				"');"
			)
		);
}
```
