---
title: Setting controllers
description: Understand how to set or unset a controller contract.
---

It’s important to note that when the owner explicitly sets the controller (using the registry's `setController`), a new controller contract will be used and no longer abide by the default permissions. This is "setting" the controller. To "unset" the controller back to its original value, set it back to the `0x0` address—thus, default permissions will go back into place.

## Registry methods

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

A table can have its controller **permanently locked**. This can be useful as a final ACL "lock" to ensure the table owner can no longer make any ACL changes (e.g., after some steady state in a production setting). Only the table owner can call this method.

---

## Setting the controller

The owner of a contract needs to call the Tableland registry’s `setController` method to register a _deployed_ policy on-chain.

```solidity
function setController(
  address caller,     // The table owner's address.
  uint256 tableId,    // Unique `tableId`, as defined in `prefix_chainId_tableId`
  address controller  // Contract address that implements `ITablelandController`
)
```

In cases where a table is _owned_ by a smart contract, you can also call the `setController` method from the smart contract. Here, adding a policy update method that can be called after deploy (where the `onlyOwner` modifier is from a useful [`Ownable` OpenZeppelin contract](https://docs.openzeppelin.com/contracts/2.x/access-control#ownership-and-ownable)):

```solidity
function updateController(uint256 tableId) public onlyOwner {
   TablelandDeployments.get().setController(
      address(this),
      tableId,
      address(this)
    );
}
```

If you want to ever check the controller, you could use the `getController` to, for example, check the current controller and only set a new one if it is different than expected.

```solidity
function updateController(uint256 tableId) public onlyOwner {
  // highlight-next-line
  address currentController = TablelandDeployments.get().getController(tableId);
  if (currentController != address(this)) {
    TablelandDeployments.get().setController(
      address(this),
      tableId,
      address(this)
    );
  }
}
```

And recall that if you want to undo this, you can set it to zero address (`0x0...0`).

## Locking the controller

In order to **permanently** set a controller, the `lockController` method will make it so that a controller can never be updated. This is an irreversible operation to help trustlessly guarantee a table's mutability rules.

```solidity
function lockController(uint256 tableId) public onlyOwner {
  TablelandDeployments.get().lockController(
    address(this),
    tableId
  );
}
```

## Using JavaScript

If you are using a development framework, like [`hardhat`](https://hardhat.org/), or simply using a library like [`ethers`](https://docs.ethers.io/v5/), you can make smart contact calls directly to the Tableland registry smart contract to set the controller. This can occur in some script that connects to the one of the [deployed registry contracts](/smart-contracts/deployed-contracts) and calls one of the controller methods.

The Tableland SDK also offers a [`Registry` API](/sdk/core/registry-api) to handle registry smart contract calls, too.

## Using a block explorer

If you are just playing around, you can also call the `setController` method on something like Etherscan by going to the Tableland registry contract directly (you’ll need to call the method from the address of the table owner).
