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

• `Optional` **error**: `string`

If there was an error, this will contain the error string.

#### Defined in

@tableland/sdk/src/registry/utils.ts:130

___

### meta

• **meta**: [`Metadata`](Metadata.md)

Additional meta information.

#### Defined in

@tableland/sdk/src/registry/utils.ts:134

___

### results

• **results**: `T`[]

Possibly empty list of query results.

#### Defined in

@tableland/sdk/src/registry/utils.ts:122

___

### success

• **success**: `boolean`

Whether the query or transaction was successful.

#### Defined in

@tableland/sdk/src/registry/utils.ts:126
