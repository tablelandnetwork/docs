---
title: Controller contract anatomy
sidebar_label: Controller contract
description: Dive into into the Tableland controller contract's design.
---

A controller needs to implement the `ITablelandController` interface to create a `TablelandController` contract. This enables advanced, custom access control features. Note that the default controls that allow for the owner to control the table are implemented by the `TablelandTables` registry contract, so if you don't create your own control, there still are rules applied.

```solidity
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
- Use the [`Policies`](https://github.com/tablelandnetwork/evm-tableland/blob/main/contracts/policies/Policies.sol) library’s `joinClauses` to include more than one condition.

---

`withCheck` _(string)_

A conditional `CHECK` clause used with SQL INSERT statements.

- For example, a value of `"foo > 0"` will concatenate all SQL `INSERT` statements with a check on the incoming data. Namely, `"CHECK (foo > 0)"`. This can be useful for limiting how table data ban be added.
- Use the [`Policies`](https://github.com/tablelandnetwork/evm-tableland/blob/main/contracts/policies/Policies.sol) library’s `joinClauses` to include more than one condition.

---

`updatableColumns` _(string[])_

A list of SQL column names that can be updated.

---

## `getPolicy`

Returns a `Policy` struct, defining how a table can be accessed by `caller`.

### Parameters

`caller` _(address)_
The address to be used to check access control permissions.

### Definition

_external, payable_

### Returns

`Policy`
The corresponding `Policy` struct for the given address.

> _Note: The method is marked as `payable`. This means developers can set up access controls that require payment in order for the caller to even make a write query attempt._
