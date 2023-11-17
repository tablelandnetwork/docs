---
id: "MutateOneParams"
title: "Interface: MutateOneParams"
sidebar_label: "MutateOneParams"
sidebar_position: 0
custom_edit_url: null
---

TableIdentifier represents the information required to identify a table on the Tableland network.

## Hierarchy

- [`TableIdentifier`](TableIdentifier.md)

  ↳ **`MutateOneParams`**

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

@tableland/sdk/src/registry/run.ts:39

___

### tableId

• **tableId**: `string`

The target table id.

#### Inherited from

[TableIdentifier](TableIdentifier.md).[tableId](TableIdentifier.md#tableid)

#### Defined in

@tableland/sdk/src/registry/contract.ts:23
