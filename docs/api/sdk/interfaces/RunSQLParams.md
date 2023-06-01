---
id: "RunSQLParams"
title: "Interface: RunSQLParams"
sidebar_label: "RunSQLParams"
sidebar_position: 0
custom_edit_url: null
---

@custom:deprecated This type will change in the next major version.
Use the `MutateOneParams` type.

## Hierarchy

- [`TableIdentifier`](TableIdentifier.md)

  ↳ **`RunSQLParams`**

## Properties

### chainId

• **chainId**: `number`

The target chain id.

#### Inherited from

[TableIdentifier](TableIdentifier.md).[chainId](TableIdentifier.md#chainid)

#### Defined in

@tableland/sdk/src/registry/contract.ts:19

___

### statement

• **statement**: `string`

SQL statement string.

#### Defined in

@tableland/sdk/src/registry/run.ts:43

___

### tableId

• **tableId**: `string`

The target table id.

#### Inherited from

[TableIdentifier](TableIdentifier.md).[tableId](TableIdentifier.md#tableid)

#### Defined in

@tableland/sdk/src/registry/contract.ts:23
