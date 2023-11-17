---
id: "Result"
title: "Interface: Result<T>"
sidebar_label: "Result"
sidebar_position: 0
custom_edit_url: null
---

Result represents the core return result for an executed statement.

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

## Properties

### error

• **error**: `undefined`

If there was an error, this will contain the error string.

#### Defined in

@tableland/sdk/src/registry/utils.ts:169

___

### meta

• **meta**: [`Metadata`](Metadata.md)

Additional meta information.

#### Defined in

@tableland/sdk/src/registry/utils.ts:173

___

### results

• **results**: `T`[]

Possibly empty list of query results.

#### Defined in

@tableland/sdk/src/registry/utils.ts:159

___

### success

• **success**: ``true``

Whether the query or transaction was successful.

#### Defined in

@tableland/sdk/src/registry/utils.ts:163
