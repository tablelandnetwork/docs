---
id: "Validator"
title: "Class: Validator"
sidebar_label: "Validator"
sidebar_position: 0
custom_edit_url: null
---

Validator provides direct access to remote Validator REST APIs.

## Constructors

### constructor

• **new Validator**(`config?`)

Create a Validator instance with the specified connection configuration.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | `Partial`<[`ReadConfig`](../interfaces/helpers.ReadConfig.md)\> | The connection configuration. This must include a baseUrl string. If passing the config from a pre-existing Database instance, it must have a non-null baseUrl key defined. |

#### Defined in

@tableland/sdk/src/validator/index.ts:45

## Properties

### config

• `Readonly` **config**: [`ReadConfig`](../interfaces/helpers.ReadConfig.md)

#### Defined in

@tableland/sdk/src/validator/index.ts:38

## Methods

### getTableById

▸ **getTableById**(`params`, `opts?`): `Promise`<[`Table`](../interfaces/Table.md)\>

Get table information

**`Description`**

Returns information about a single table, including schema information

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `Object` | - |
| `params.chainId` | `number` | **`Description`** The parent chain to target **`Example`** ```ts 80001 ``` |
| `params.tableId` | `string` | **`Description`** Table identifier **`Example`** ```ts 1 ``` |
| `opts` | [`Signal`](../interfaces/helpers.Signal.md) | - |

#### Returns

`Promise`<[`Table`](../interfaces/Table.md)\>

#### Defined in

@tableland/sdk/src/validator/index.ts:83

___

### health

▸ **health**(`opts?`): `Promise`<`boolean`\>

Get health status

**`Description`**

Returns OK if the validator considers itself healthy

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [`Signal`](../interfaces/helpers.Signal.md) |

#### Returns

`Promise`<`boolean`\>

#### Defined in

@tableland/sdk/src/validator/index.ts:67

___

### pollForReceiptByTransactionHash

▸ **pollForReceiptByTransactionHash**(`params`, `opts?`): `Promise`<`Camelize`<`AssertedResponse`\>\>

Wait for transaction status

**`Description`**

Polls for the status of a given transaction receipt by hash until

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `Object` | - |
| `params.chainId` | `number` | **`Description`** The parent chain to target **`Example`** ```ts 80001 ``` |
| `params.transactionHash` | `string` | **`Description`** The transaction hash to request **`Example`** ```ts 0x02f319429b8a7be1cbb492f0bfbf740d2472232a2edadde7df7c16c0b61aa78b ``` |
| `opts` | [`SignalAndInterval`](../namespaces/helpers.md#signalandinterval) | - |

#### Returns

`Promise`<`Camelize`<`AssertedResponse`\>\>

#### Defined in

@tableland/sdk/src/validator/index.ts:127

___

### queryByStatement

▸ **queryByStatement**<`T`\>(`params`, `opts?`): `Promise`<[`ObjectsFormat`](../modules.md#objectsformat)<`T`\>\>

Query the network

**`Description`**

Returns the results of a SQL read query against the Tabeland network

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`QueryParams`](../modules.md#queryparams)<`undefined` \| ``"objects"``\> |
| `opts?` | [`Signal`](../interfaces/helpers.Signal.md) |

#### Returns

`Promise`<[`ObjectsFormat`](../modules.md#objectsformat)<`T`\>\>

#### Defined in

@tableland/sdk/src/validator/index.ts:97

▸ **queryByStatement**<`T`\>(`params`, `opts?`): `Promise`<[`TableFormat`](../interfaces/TableFormat.md)<`T`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`QueryParams`](../modules.md#queryparams)<``"table"``\> |
| `opts?` | [`Signal`](../interfaces/helpers.Signal.md) |

#### Returns

`Promise`<[`TableFormat`](../interfaces/TableFormat.md)<`T`\>\>

#### Defined in

@tableland/sdk/src/validator/index.ts:101

___

### receiptByTransactionHash

▸ **receiptByTransactionHash**(`params`, `opts?`): `Promise`<`Camelize`<`AssertedResponse`\>\>

Get transaction status

**`Description`**

Returns the status of a given transaction receipt by hash

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `Object` | - |
| `params.chainId` | `number` | **`Description`** The parent chain to target **`Example`** ```ts 80001 ``` |
| `params.transactionHash` | `string` | **`Description`** The transaction hash to request **`Example`** ```ts 0x02f319429b8a7be1cbb492f0bfbf740d2472232a2edadde7df7c16c0b61aa78b ``` |
| `opts` | [`Signal`](../interfaces/helpers.Signal.md) | - |

#### Returns

`Promise`<`Camelize`<`AssertedResponse`\>\>

#### Defined in

@tableland/sdk/src/validator/index.ts:116

___

### version

▸ **version**(`opts?`): `Promise`<`Camelize`<`Required`<{ `binary_version?`: `string` ; `build_date?`: `string` ; `git_branch?`: `string` ; `git_commit?`: `string` ; `git_state?`: `string` ; `git_summary?`: `string` ; `version?`: `number`  }\>\>\>

Get version information

**`Description`**

Returns version information about the validator daemon

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [`Signal`](../interfaces/helpers.Signal.md) |

#### Returns

`Promise`<`Camelize`<`Required`<{ `binary_version?`: `string` ; `build_date?`: `string` ; `git_branch?`: `string` ; `git_commit?`: `string` ; `git_state?`: `string` ; `git_summary?`: `string` ; `version?`: `number`  }\>\>\>

#### Defined in

@tableland/sdk/src/validator/index.ts:75

___

### forChain

▸ `Static` **forChain**(`chainNameOrId`): [`Validator`](Validator.md)

Create a new Validator instance that uses the default baseUrl for a given chain.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `chainNameOrId` | `number` \| keyof `TablelandNetworkConfig` | The name or id of the chain to target. |

#### Returns

[`Validator`](Validator.md)

A Validator with a default baseUrl.

#### Defined in

@tableland/sdk/src/validator/index.ts:58
