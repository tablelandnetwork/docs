---
title: Configure table write access
sidebar_label: Configure write access
description: Everything you need to know to control access for programmable tables.
---

By default, the _owner_ of a table is the only one that can modify data. However, Tableland gives you a suite of options for programming ownership in useful ways. The most feature rich way to use a _controller_; a smart contract that implements the `ITablelandTables` interface, enabling on-chain rules that govern off-chain table mutations.

## Access control with controllers

First, it’s important to understand a _controller_ vs. _owner_. The _controller_ of a table is the address who controls the table’s access control list ("ACL"). The _owner_ of the table is the address who originally minted the table and has the ownership. Both of these values can be a user’s account or a smart contract, but the owner is ultimately the one who can change who the controller is and transfer table ownership altogether.

There are default options that allow for the owner to have full control of the table. But, for custom access controls, you must create a contract that implements `ITablelandController`. Within the `TablelandTables` registry contract, the `mutate` method is the only function that leverages the controller. The controller is used to define what an address can do to a table, including the ability to `INSERT`, `UPDATE`, and `DELETE` rows, plus some additional `GRANT` / `REVOKE` provisioning.

## Creating a `TablelandController`

A `TablelandController` compliant contract is one that implements `ITablelandController`, meaning, it supports a `getPolicy` read method that returns the `ITablelandController`’s `Policy` struct. This method can include on-chain rules as logical checks prior to the `Policy` being returned (e.g., conditional logic to check ownership of a token or certain balance).

### How it works

The default controller is the `0x0` address.

Optionally, a table owner can register the `TablelandController`'s address via the registry contract’s `setController` method. Once registered, Tableland will check any `INSERT`, `UPDATE`, or `DELETE` statement against the `getPolicy` response to ensure it is a valid modification. Additionally, the `getController` method makes it easy to check who is a table's controller, and `lockController` _permanently_ sets the controller for a table.

### Default options

The default ownership of a table is granted to the address that creates it. Some examples include:

- Externally Owned Account ("EOA")
  - A developer creates a table with their Ethereum wallet => The developer’s wallet address retains default ownership of the table.
  - A user of an app built on Tableland creates a table with their Ethereum wallet => The user’s wallet address retains default ownership of the table.
- Smart contract
  - A smart contract creates a table => The smart contract retains default ownership of the table.

Here are some callouts to consider:

- If the controller is never explicitly set (default setting), the controller is automatically defined as the `0x0` address. This means that a table owner has the default "allow all" permissions.
  - In other words, the owner is the only one who can call a `mutate` function by default; it’s the only address that can perform any SQL write queries.
- If the owner sets the controller to an EOA, the caller of a `mutate` function must be the controller of the table. This controller EOA address will now have the default "allow all" permissions, removing all query permissions from the table owner.
  - For example, user `address_1` mints a table and sets the controller to user `address_2`.
  - _Before_ setting the controller, `address_1` had full "allow all" permissions and ownership of the table; `address_1` could perform any SQL write operations _and_ was the owner of the ERC721 token (e.g., can still set the controller, transfer ownership, etc.).
  - _After_ `address_1` set the controller to `address_2`, `address_1` no longer has the "allow all" permissions. The controller `address_2` has the "allow all" permission, but the owner still _owns_ the table (e.g., can set/change the controller, transfer ownership, etc.).
- If the controller is set to a contract address, it must implement `ITablelandController`.
  - It \**is *technically possible\* to set a controller to a contract address that doesn’t implement the controller interface. However, this would lead to issues.
  - There is logic that checks if the `mutate` caller is a contract. If so, the registry contract makes a `getPolicy` call on this calling controller contract — which, if `ITablelandController` isn’t implemented, will cause the call to revert.

## Dynamic ACL

The power of the `TablelandController` and pure smart contract approach is that they allow you to create ACLs that evolve with your project. Perhaps you have an NFT where users have a window of time where they can update metadata, and then your project will lock it down. To do this, you can simply update the `TablelandController` or change the logic in your smart contract to enforce the new rules. It's that easy.
