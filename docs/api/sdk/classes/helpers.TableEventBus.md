---
id: "helpers.TableEventBus"
title: "Class: TableEventBus"
sidebar_label: "TableEventBus"
custom_edit_url: null
---

[helpers](../namespaces/helpers.md).TableEventBus

TableEventBus provides a way to listen for:
 mutations, transfers, and changes to controller

## Constructors

### constructor

• **new TableEventBus**(`config?`)

Create a TableEventBus instance with the specified connection configuration.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | `Partial`<`Partial`<[`ReadConfig`](../interfaces/helpers.ReadConfig.md) & [`SignerConfig`](../interfaces/helpers.SignerConfig.md)\>\> | The connection configuration. This must include an ethersjs Signer. If passing the config from a pre-existing Database instance, it must have a non-null signer key defined. |

#### Defined in

@tableland/sdk/src/helpers/subscribe.ts:77

## Properties

### config

• `Readonly` **config**: `Partial`<[`ReadConfig`](../interfaces/helpers.ReadConfig.md) & [`SignerConfig`](../interfaces/helpers.SignerConfig.md)\>

#### Defined in

@tableland/sdk/src/helpers/subscribe.ts:67

___

### contracts

• `Readonly` **contracts**: `ContractMap`

#### Defined in

@tableland/sdk/src/helpers/subscribe.ts:68

___

### listeners

• `Readonly` **listeners**: `ListenerMap`

#### Defined in

@tableland/sdk/src/helpers/subscribe.ts:69

## Methods

### \_attachEmitter

▸ **_attachEmitter**(`contract`, `emitter`, `tableIdentifier`): `ContractEventListener`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `contract` | `TablelandTables` |
| `emitter` | `EventEmitter` |
| `tableIdentifier` | [`TableIdentifier`](../interfaces/TableIdentifier.md) |

#### Returns

`ContractEventListener`[]

#### Defined in

@tableland/sdk/src/helpers/subscribe.ts:224

___

### \_ensureListening

▸ **_ensureListening**(`listenerId`, `emitter`): `Promise`<`ContractEventListener`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `listenerId` | `string` |
| `emitter` | `EventEmitter` |

#### Returns

`Promise`<`ContractEventListener`[]\>

#### Defined in

@tableland/sdk/src/helpers/subscribe.ts:214

___

### \_getContract

▸ **_getContract**(`chainId`): `Promise`<`TablelandTables`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |

#### Returns

`Promise`<`TablelandTables`\>

#### Defined in

@tableland/sdk/src/helpers/subscribe.ts:198

___

### addListener

▸ **addListener**(`tableName`): `Promise`<`EventEmitter`\>

Start listening to the Registry Contract for events that are associated
with a given table.
There's only ever one "listener" for a table, but the emitter that
Contract listener has can have as many event listeners as the environment
supports.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tableName` | `string` | The full name of table that you want to listen for changes to. |

#### Returns

`Promise`<`EventEmitter`\>

#### Defined in

@tableland/sdk/src/helpers/subscribe.ts:97

___

### addTableIterator

▸ **addTableIterator**<`T`\>(`tableName`): `Promise`<`AsyncIterable`<`T`\>\>

A simple wrapper around `addListener` that returns an async iterable
which can be used with the for await ... of pattern.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tableName` | `string` | The full name of table that you want to listen for changes to. |

#### Returns

`Promise`<`AsyncIterable`<`T`\>\>

#### Defined in

@tableland/sdk/src/helpers/subscribe.ts:132

___

### removeAllListeners

▸ **removeAllListeners**(): `void`

#### Returns

`void`

#### Defined in

@tableland/sdk/src/helpers/subscribe.ts:163

___

### removeListener

▸ **removeListener**(`params`): `void`

Remove a listener (or iterator) based on chain and tableId

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | [`TableIdentifier`](../interfaces/TableIdentifier.md) | A TableIdentifier Object. Must have `chainId` and `tableId` keys. |

#### Returns

`void`

#### Defined in

@tableland/sdk/src/helpers/subscribe.ts:145
