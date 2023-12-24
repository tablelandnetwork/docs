---
title: Access control
description: Learn how to configure access control on Tableland.
keywords:
  - access control
  - access control list
  - controller
  - set controller
  - grant
  - revoke
tags:
  - access control
---

Access control is a critical component of any database. Tableland provides a flexible access control system that allows you to configure access control on a per-table basis. This means that you can configure access control for each table in your database such that different users have different permissions on different tables, and the rules can be dynamic in nature.

## Overview

There are two ways to configure access control on Tableland:

- Smart contract rules & controllers.
- SQL `GRANT`/`REVOKE` statements.

The first method is more flexible and allows you to configure access control based on onchain definitions. The second method is more limited in scope, but is easier to use and is more familiar to SQL developers. Both methods can be used in conjunction with each other.

A controller contract can make assertions about a user's permissions—such as balances, roles, or ownership—before returning permissions for `INSERT`, `UPDATE`, or `DELETE` operations along with attached `WHERE` and `WITH CHECK` clauses.

With pure SQL, `GRANT`/`REVOKE` statements only allow for simple `INSERT`, `UPDATE`, or `DELETE` permissions to be granted to a user. These permissions are not dynamic and cannot be based on onchain definitions, so they're more rigid in nature (e.g., granting a specific address with `INSERT` permissions).

## How it works

Across the various Tableland clients, you can either write `GRANT`/`REVOKE` statements as a mutating query, or you can deploy a controller contract and set it as the controller for a table. The following sections are where these operations can be performed:

### `GRANT`/`REVOKE` statements

Assuming you have ownership permissions on a table, you can pass `GRANT`/`REVOKE` statements as mutating queries:

- SQL guide: [here](/sql/access-control)
- SDK with executing statements: [here](/sdk/database/query-statement-methods#all)
- CLI with `write` command: [here](/cli/write)
- Smart contracts with `mutate` method: [here](/smart-contracts/registry#mutate)

### Setting controllers

The prerequisites for setting a controller is to deploy a controller smart contract. Then, you can call methods that set the controller for a table:

- Creating smart contract controllers: [here](/smart-contracts/controller/)
- SDK with `Registry` methods: [here](/sdk/registry#setcontroller)
- CLI with `controller` command: [here](/cli/controller#set-controller-name)
- Smart contracts with `setController` method: [here](/smart-contracts/registry#setcontroller)
