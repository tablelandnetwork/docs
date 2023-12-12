---
id: "ExecResult"
title: "Interface: ExecResult<T>"
sidebar_label: "ExecResult"
sidebar_position: 0
custom_edit_url: null
---

ExecResult represents the return result for executed Database statements via `exec()`.

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

## Hierarchy

- `Pick`\<[`Metadata`](Metadata.md), ``"duration"`` \| ``"txn"``\>

  ↳ **`ExecResult`**

## Properties

### count

• **count**: `number`

The count of executed statements.

#### Defined in

@tableland/sdk/src/registry/utils.ts:184

___

### duration

• **duration**: `number`

Total client-side duration of the async call.

#### Inherited from

Pick.duration

#### Defined in

@tableland/sdk/src/registry/utils.ts:141

___

### results

• `Optional` **results**: `T`[]

The optional list of query results.

#### Defined in

@tableland/sdk/src/registry/utils.ts:188

___

### txn

• `Optional` **txn**: [`WaitableTransactionReceipt`](../modules.md#waitabletransactionreceipt)

The optional transaction information receipt.

#### Inherited from

Pick.txn

#### Defined in

@tableland/sdk/src/registry/utils.ts:145
