---
id: "helpers.Signer"
title: "Class: Signer"
sidebar_label: "Signer"
custom_edit_url: null
---

[helpers](../namespaces/helpers.md).Signer

## Constructors

### constructor

• **new Signer**(): [`Signer`](helpers.Signer.md)

#### Returns

[`Signer`](helpers.Signer.md)

#### Defined in

@ethersproject/abstract-signer/lib/index.d.ts:30

## Properties

### \_isSigner

• `Readonly` **\_isSigner**: `boolean`

#### Defined in

@ethersproject/abstract-signer/lib/index.d.ts:29

___

### provider

• `Optional` `Readonly` **provider**: `Provider`

#### Defined in

@ethersproject/abstract-signer/lib/index.d.ts:24

## Methods

### \_checkProvider

▸ **_checkProvider**(`operation?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `operation?` | `string` |

#### Returns

`void`

#### Defined in

@ethersproject/abstract-signer/lib/index.d.ts:42

___

### call

▸ **call**(`transaction`, `blockTag?`): `Promise`\<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `transaction` | `Deferrable`\<`TransactionRequest`\> |
| `blockTag?` | `BlockTag` |

#### Returns

`Promise`\<`string`\>

#### Defined in

@ethersproject/abstract-signer/lib/index.d.ts:34

___

### checkTransaction

▸ **checkTransaction**(`transaction`): `Deferrable`\<`TransactionRequest`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `transaction` | `Deferrable`\<`TransactionRequest`\> |

#### Returns

`Deferrable`\<`TransactionRequest`\>

#### Defined in

@ethersproject/abstract-signer/lib/index.d.ts:40

___

### connect

▸ **connect**(`provider`): [`Signer`](helpers.Signer.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `provider` | `Provider` |

#### Returns

[`Signer`](helpers.Signer.md)

#### Defined in

@ethersproject/abstract-signer/lib/index.d.ts:28

___

### estimateGas

▸ **estimateGas**(`transaction`): `Promise`\<`BigNumber`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `transaction` | `Deferrable`\<`TransactionRequest`\> |

#### Returns

`Promise`\<`BigNumber`\>

#### Defined in

@ethersproject/abstract-signer/lib/index.d.ts:33

___

### getAddress

▸ **getAddress**(): `Promise`\<`string`\>

#### Returns

`Promise`\<`string`\>

#### Defined in

@ethersproject/abstract-signer/lib/index.d.ts:25

___

### getBalance

▸ **getBalance**(`blockTag?`): `Promise`\<`BigNumber`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `blockTag?` | `BlockTag` |

#### Returns

`Promise`\<`BigNumber`\>

#### Defined in

@ethersproject/abstract-signer/lib/index.d.ts:31

___

### getChainId

▸ **getChainId**(): `Promise`\<`number`\>

#### Returns

`Promise`\<`number`\>

#### Defined in

@ethersproject/abstract-signer/lib/index.d.ts:36

___

### getFeeData

▸ **getFeeData**(): `Promise`\<`FeeData`\>

#### Returns

`Promise`\<`FeeData`\>

#### Defined in

@ethersproject/abstract-signer/lib/index.d.ts:38

___

### getGasPrice

▸ **getGasPrice**(): `Promise`\<`BigNumber`\>

#### Returns

`Promise`\<`BigNumber`\>

#### Defined in

@ethersproject/abstract-signer/lib/index.d.ts:37

___

### getTransactionCount

▸ **getTransactionCount**(`blockTag?`): `Promise`\<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `blockTag?` | `BlockTag` |

#### Returns

`Promise`\<`number`\>

#### Defined in

@ethersproject/abstract-signer/lib/index.d.ts:32

___

### populateTransaction

▸ **populateTransaction**(`transaction`): `Promise`\<`TransactionRequest`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `transaction` | `Deferrable`\<`TransactionRequest`\> |

#### Returns

`Promise`\<`TransactionRequest`\>

#### Defined in

@ethersproject/abstract-signer/lib/index.d.ts:41

___

### resolveName

▸ **resolveName**(`name`): `Promise`\<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Promise`\<`string`\>

#### Defined in

@ethersproject/abstract-signer/lib/index.d.ts:39

___

### sendTransaction

▸ **sendTransaction**(`transaction`): `Promise`\<`TransactionResponse`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `transaction` | `Deferrable`\<`TransactionRequest`\> |

#### Returns

`Promise`\<`TransactionResponse`\>

#### Defined in

@ethersproject/abstract-signer/lib/index.d.ts:35

___

### signMessage

▸ **signMessage**(`message`): `Promise`\<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` \| `Bytes` |

#### Returns

`Promise`\<`string`\>

#### Defined in

@ethersproject/abstract-signer/lib/index.d.ts:26

___

### signTransaction

▸ **signTransaction**(`transaction`): `Promise`\<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `transaction` | `Deferrable`\<`TransactionRequest`\> |

#### Returns

`Promise`\<`string`\>

#### Defined in

@ethersproject/abstract-signer/lib/index.d.ts:27

___

### isSigner

▸ **isSigner**(`value`): value is Signer

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

value is Signer

#### Defined in

@ethersproject/abstract-signer/lib/index.d.ts:43
