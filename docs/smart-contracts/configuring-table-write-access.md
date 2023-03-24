---
title: Configuring table write access
description: Everything you need to know to control access for programmable tables.
---

By default, the _owner_ of a table is the only one that can modify data. However, Tableland gives you a suite of options for programming ownership in useful ways. The most feature rich way to use a _controller_; a smart contract that implements the `ITablelandTables` interface, enabling on-chain rules that govern off-chain table mutations.

## Access control with controllers

First, it’s important to understand a _controller_ vs. _owner_. The _controller_ of a table is the address who controls the table’s access control list (”ACL”). The _owner_ of the table is the address who originally minted the table and has the ownership. Both of these values can be a user’s account or a smart contract, but the owner is ultimately the one who can change who the controller is and transfer table ownership altogether.

There are [default options](https://www.notion.so/b0c9ade1ff704d669bb4f3254a9dc113) that exist, but for custom access controls, you must create a contract that implements `ITablelandController`. Within the `TablelandTables` registry contract, the `runSQL` method is the only function that leverages the controller. The controller is used to define what an address can do to a table, including the ability to `INSERT`, `UPDATE`, and `DELETE` rows, plus some additional `GRANT` / `REVOKE` provisioning.

## `ITablelandController`

The required `ITablelandController` interface of the `TablelandController` contract. Developers must implement the `ITablelandController` for advanced, custom access control features. Default values are implemented by the `[TablelandTables](https://github.com/tablelandnetwork/evm-tableland/blob/9b8256adb9377bddc76325cf834e4801961771c5/contracts/TablelandTables.sol#L123)` registry contract.

```tsx
interface ITablelandController {
    /**
     * @dev Object defining how a table can be accessed.
     */
    struct Policy {
        bool allowInsert;
        bool allowUpdate;
        bool allowDelete;
        string whereClause;
        string withCheck;
        string[] updatableColumns;
    }

    /**
     * @dev Returns a {Policy} struct defining how a table can be accessed by `caller`.
     */
    function getPolicy(address caller) external payable returns (Policy memory);
}
```

S*ource code: [ITablelandController.sol](https://github.com/tablelandnetwork/evm-tableland/blob/main/contracts/ITablelandController.sol)*

## `Policy`

Object defining how a table can be accessed.

`allowInsert` _(boolean)_

Whether or not the table should allow SQL `INSERT` statements.

---

`allowUpdate` _(boolean)_

Whether or not the table should allow SQL `UPDATE` statements.

---

`allowDelete` _(boolean)_

Whether or not the table should allow SQL `DELETE` statements.

---

`whereClause` _(string)_

A conditional `WHERE` clause used with SQL UPDATE and DELETE statements.

- For example, a value of `"foo > 0"` will concatenate all SQL `UPDATE` and/or `DELETE` statements with `"WHERE foo > 0"`. This can be useful for limiting how a table can be modified.
- Use the `[Policies](https://github.com/tablelandnetwork/evm-tableland/blob/main/contracts/policies/Policies.sol)` library’s `joinClauses` to include more than one condition.

---

`withCheck` _(string)_

A conditional `CHECK` clause used with SQL INSERT statements.

- For example, a value of `"foo > 0"` will concatenate all SQL `INSERT` statements with a check on the incoming data. Namely, `"CHECK (foo > 0)"`. This can be useful for limiting how table data ban be added.
- Use the `[Policies](https://github.com/tablelandnetwork/evm-tableland/blob/main/contracts/policies/Policies.sol)` library’s `joinClauses` to include more than one condition.

---

`updatableColumns` _(string[])_

A list of SQL column names that can be updated.

---

## `getPolicy`

Returns a `Policy` struct, defining how a table can be accessed by `caller`.

### Parameters

`caller` _(address)_
The address to be used to check access control permissions.

### Defintion

_external, payable_

### Returns

`Policy`
The corresponding `Policy` struct for the given address.

> _Note: The method is marked as `payable`. This means developers can set up access controls that require payment in order for the caller to even make a write query attempt._

---

## Default options

The default ownership of a table is granted to the address that creates it. Some examples include:

- Externally Owned Account (”EOA”)
  - A developer creates a table with their Ethereum wallet → The developer’s wallet address retains default ownership of the table.
  - A user of an app built on Tableland creates a table with their Ethereum wallet → The user’s wallet address retains default ownership of the table.
- Smart contract
  - A smart contract creates a table → The smart contract retains default ownership of the table.

### _Allow All_ policy

Default ownership grants the owner the following “allow all” abilities:

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
- _Note: Also allows `GRANT` and `REVOKE` capabilities ([see below](https://www.notion.so/b0c9ade1ff704d669bb4f3254a9dc113))._

In other words, if a custom `TablelandController` contract has not been set, the default values for the `Policy` are those defined above. There are a few additional things to note:

- If the controller is never explicitly set (default setting), the controller is automatically defined as the `0x0` address. This means that a table owner has the default “allow all” permissions.
  - In other words, the owner is the only one who can call a `[runSQL](https://github.com/tablelandnetwork/evm-tableland/blob/9b8256adb9377bddc76325cf834e4801961771c5/contracts/TablelandTables.sol#L71)` function by default; it’s the only address that can perform any SQL write queries.
- If the owner sets the controller to an EOA, the caller of a `[runSQL](https://github.com/tablelandnetwork/evm-tableland/blob/9b8256adb9377bddc76325cf834e4801961771c5/contracts/TablelandTables.sol#L71)` function must be the controller of the table. This controller EOA address will now have the default “allow all” permissions, removing all query permissions from the table owner.
  - For example, user `address_1` mints a table and sets the controller to user `address_2`.
  - _Before_ setting the controller, `address_1` had full “allow all” permissions and ownership of the table; `address_1` could perform any SQL write operations _and_ was the owner of the ERC721 token (e.g., can still set the controller, transfer ownership, etc.).
  - _After_ `address_1` set the controller to `address_2`, `address_1` no longer has the “allow all” permissions. The controller `address_2` has the “allow all” permission, but the owner still _owns_ the table (e.g., can set/change the controller, transfer ownership, etc.).
- If the controller is set to a contract address, it must implement `ITablelandController`.
  - It \**is *technically possible\* to set a controller to a contract address that doesn’t implement the controller interface. However, this would lead to issues.
  - There is logic that checks if the `runSQL` caller is a contract. If so, the registry contract makes a `getPolicy` call on this calling controller contract — which, if `ITablelandController` isn’t implemented, will cause the call to revert.

## `GRANT` & `REVOKE`

Rather than a smart contract defined ACL, mutating SQL statements can provision access to certain addresses using the `GRANT` or `REVOKE` keywords. _Only the owner_ can make a write query with the following:

- `GRANT` ⇒ Allows the caller to grant an address permissions for `INSERT`, `UPDATE`, or `DELETE` abilities on a table.
- `REVOKE` ⇒ Removes any privileges that were enabled for an address using `GRANT`.

It’s important to note that when the owner explicitly sets the controller (using `setController`), any `GRANT` provisions will no longer be valid. The action of setting a controller causes previously defined `GRANT` abilities to be “ignored.” Upon removing (”unsetting”) the controller, those permissions are fully respected.

The act of “unsetting” — recall the default controller is defined as the `0x0` address. To unset an existing controller, simply update the table’s controller using this address:

```sql
// Set some controller address, and previous `GRANT`s no longer work.
setController(0xAbCdEf1234567890AbCdEf1234567890AbCdEf12)
// "Unset" the controller, and `GRANT`s are back in action & work again.
setController(0x0000000000000000000000000000000000000000)
```

### Example SQL statements

To grant permissions for all table mutation abilities, you can execute a `runSQL` write query that resembles something like the following:

```sql
GRANT INSERT, UPDATE, DELETE ON <tableName> TO '<0x_address_value>'
```

Perhaps at a point in the future, you decide to remove the permission to `DELETE` rows via a write query:

```sql
REVOKE DELETE ON <tableName> FROM '<0x_address_value>'
```

_For more information on `GRANT` and `REVOKE`, see the [SQL Specification](https://www.notion.so/Statement-Types-942586c6bfda444d9f51fb70a81ba8f9)._

# Registry controller methods

The `TablelandTables` registry smart contract has three dedicated controller methods, which are helpful to understand within this context.

---

`getController(uint256 tableId)`

Get the current controller address for a table.

If a table has its controller set (e.g., using `setController`), this method will return the corresponding address via a _direct_ smart contract call. Otherwise, all tables default to the `0x0` address as being the table’s controller.

---

`setController(address caller, uint256 tableId, address controller)`

Set the controller address for a table.

Only the table owner can set the controller of a table to an address, such as another account address or contract that implements Tableland’s `ITablelandTables` ACL policy. However, a table with a _locked_ controller can no longer have its controller be set.

---

`lockController(address caller, uint256 tableId)`

Lock the controller address for a table.

A table can have its controller **_permanently locked_**. This can be useful as a final ACL “lock” to ensure the table owner can no longer make any ACL changes (e.g., after some steady state in a production setting). Only the table owner can call this method.

---

# Creating a `TablelandController`

A _[TablelandController](https://github.com/tablelandnetwork/evm-tableland/blob/main/contracts/ITablelandController.sol)_ compliant contract is one that implements `ITablelandController`, meaning, it supports a `getPolicy` read method that returns the `ITablelandController`’s \*\*`Policy` struct. This method can include on-chain rules as logical checks prior to the `Policy` being returned (e.g., conditional logic to check ownership of a token or certain balance).

## How it works

As noted, the default controller is the `0x0` address. Optionally, a table owner can register the `TablelandController`'s address via the `TablelandTables` contract’s `setController` method. Once registered, Tableland will check any `INSERT`, `UPDATE`, or `DELETE` statement against the `getPolicy` response to ensure it is a valid modification.

## Writing the TablelandController

The following example shows how to import the `ITablelandController` interface and then create a policy that only allows `INSERT`s on a table, from any address.

```tsx
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@tableland/evm/contracts/ITablelandController.sol";
import "@tableland/evm/contracts/policies/Policies.sol";

contract ExamplePolicy {
  function getPolicy(address sender)
      public
      payable
      override
      returns (ITablelandController.Policy memory)
  {

      /*
      * Add any custom ACL check here.
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

Alternatively, you could lock down your table to “allow none” for now, and then _unlock_ your policy with a modification later. A dynamic policy could be interesting in cases such as post-reveal during your NFT launch.

## E**xample of _Allow None_**

```tsx
ITablelandController.Policy({
  allowInsert: false,
  allowUpdate: false,
  allowDelete: false,
  whereClause: Policies.joinClauses(new string[](0)),
  withCheck: Policies.joinClauses(new string[](0)),
  updatableColumns: new string[](0)
});
```

## Setting the policy

The owner of a contract needs to call the Tableland registry’s `setController` method to register a _deployed_ policy on-chain.

```tsx
function setController(
  address caller,     // The table owner's address.
  uint256 tableId,    // Unique `tableId`, as defined in `prefix_chainId_tableId`
  address controller  // Contract address that implements `ITablelandController`
)
```

### S**mart Contract Calls**

In cases where a table is _owned_ by a smart contract, you can also call the `setController` method from the smart contract. Here, adding a policy update method that can be called after deploy (where the `onlyOwner` modifier is from a useful `Ownable` [OpenZeppelin contract](https://docs.openzeppelin.com/contracts/2.x/access-control)):

```tsx
function updateController() onlyOwner {
   _tableland.setController(
      address(this),
      _tableId,
      address(this)
    );
}
```

### Dev environment

If you are using a development framework, like `[hardhat](https://hardhat.org/)`, or simply using a library like `[ethers](https://docs.ethers.io/v5/)`, you can make smart contact calls directly to the Tableland registry smart contract to set the controller.

### **Manually**

If you are just playing around, you can also call the `setController` method on Etherscan by going to the Tableland registry contract directly (you’ll need to call the method from the address of the table owner). You can find the list of live contracts [here](https://www.notion.so/Deployed-Contracts-20ca28a952684cdab428981aed061dc5).

# Using a Smart Contract only

When you create tables directly from your smart contract, you are not required to use the `TablelandController` since all updates need to come from your smart contract. In these cases, you can write various abstractions around SQL updates and build them into your app.

Take the example from [Build a Dynamic NFT in Solidity](https://www.notion.so/Build-a-Dynamic-NFT-in-Solidity-2f86d506c51b46369246226c3b91eab9) where the smart contract dynamically inserts token metadata into a table at the time of token minting.

## Dynamic INSERTs

```tsx
function safeMint(address to) public returns (uint256) {
    uint256 newItemId = _tokenIds.current();
    _tableland.runSQL(
      address(this),
			_metadataTableId,
			SQLHelpers.toInsert(
				_tablePrefix, // prefix
				_metadataTableId, // table id
			  // column names
				"id, external_link, x, y",
			  // values
				string.concat(
					Strings.toString(newItemId),
					", 'not.implemented.xyz', 0, 0"
				)
      )
    );
    _safeMint(to, newItemId, "");
    _tokenIds.increment();
    return newItemId;
}
```

Because the contract sending the `runSQL` command has full ownership over the table, the query will run. If any other contract or end-user attempts to make the same call, it will fail!

Later on in that same example [Build a Dynamic NFT in Solidity](https://www.notion.so/Build-a-Dynamic-NFT-in-Solidity-2f86d506c51b46369246226c3b91eab9), we run an `UPDATE` command to dynamically update the data for a single NFT. You can see that in the example, we allow only the NFT owner to change _only_ the row in the table that records their NFT’s metadata. Pretty cool, the smart contract is driving the ACL here.

## User Controlled UPDATEs

```tsx
function makeMove(uint256 tokenId, uint256 x, uint256 y) public {
  // Check token ownership
  require(this.ownerOf(tokenId) == msg.sender, "Invalid owner");
  // Simple on-chain gameplay enforcement
  require(x < 512 && 0 <= x, "Out of bounds");
  require(y < 512 && 0 <= y, "Out of bounds");
  // Update the row in tableland
  _tableland.runSQL(
    address(this),
		_metadataTableId,
		SQLHelpers.toUpdate(
			_tablePrefix, //prefix
			_metadataTableId, //table id
      // setters
			string.concat(
	      "x = ",
	      Strings.toString(x),
	      ", y = ",
	      Strings.toString(y),
			),
			// where conditions
			string.concat(
	      "id = ",
	      Strings.toString(tokenId)
			)
    )
  );
}
```

# Dynamic ACL

The power of the `TablelandController` and pure smart contract approach is that they allow you to create ACLs that evolve with your project. Perhaps you have an NFT where users have a window of time where they can update metadata, and then your project will lock it down. To do this, you can simply update the `TablelandController` or change the logic in your smart contract to enforce the new rules. It's that easy.
