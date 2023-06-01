---
id: "helpers.ContractTransaction"
title: "Interface: ContractTransaction"
sidebar_label: "ContractTransaction"
custom_edit_url: null
---

[helpers](../namespaces/helpers.md).ContractTransaction

## Hierarchy

- `TransactionResponse`

  ↳ **`ContractTransaction`**

## Properties

### accessList

• `Optional` **accessList**: `AccessList`

#### Inherited from

TransactionResponse.accessList

#### Defined in

@ethersproject/transactions/lib/index.d.ts:40

___

### blockHash

• `Optional` **blockHash**: `string`

#### Inherited from

TransactionResponse.blockHash

#### Defined in

@ethersproject/abstract-provider/lib/index.d.ts:26

___

### blockNumber

• `Optional` **blockNumber**: `number`

#### Inherited from

TransactionResponse.blockNumber

#### Defined in

@ethersproject/abstract-provider/lib/index.d.ts:25

___

### chainId

• **chainId**: `number`

#### Inherited from

TransactionResponse.chainId

#### Defined in

@ethersproject/transactions/lib/index.d.ts:35

___

### confirmations

• **confirmations**: `number`

#### Inherited from

TransactionResponse.confirmations

#### Defined in

@ethersproject/abstract-provider/lib/index.d.ts:28

___

### data

• **data**: `string`

#### Inherited from

TransactionResponse.data

#### Defined in

@ethersproject/transactions/lib/index.d.ts:33

___

### from

• **from**: `string`

#### Inherited from

TransactionResponse.from

#### Defined in

@ethersproject/abstract-provider/lib/index.d.ts:29

___

### gasLimit

• **gasLimit**: `BigNumber`

#### Inherited from

TransactionResponse.gasLimit

#### Defined in

@ethersproject/transactions/lib/index.d.ts:31

___

### gasPrice

• `Optional` **gasPrice**: `BigNumber`

#### Inherited from

TransactionResponse.gasPrice

#### Defined in

@ethersproject/transactions/lib/index.d.ts:32

___

### hash

• **hash**: `string`

#### Inherited from

TransactionResponse.hash

#### Defined in

@ethersproject/abstract-provider/lib/index.d.ts:24

___

### maxFeePerGas

• `Optional` **maxFeePerGas**: `BigNumber`

#### Inherited from

TransactionResponse.maxFeePerGas

#### Defined in

@ethersproject/transactions/lib/index.d.ts:42

___

### maxPriorityFeePerGas

• `Optional` **maxPriorityFeePerGas**: `BigNumber`

#### Inherited from

TransactionResponse.maxPriorityFeePerGas

#### Defined in

@ethersproject/transactions/lib/index.d.ts:41

___

### nonce

• **nonce**: `number`

#### Inherited from

TransactionResponse.nonce

#### Defined in

@ethersproject/transactions/lib/index.d.ts:30

___

### r

• `Optional` **r**: `string`

#### Inherited from

TransactionResponse.r

#### Defined in

@ethersproject/transactions/lib/index.d.ts:36

___

### raw

• `Optional` **raw**: `string`

#### Inherited from

TransactionResponse.raw

#### Defined in

@ethersproject/abstract-provider/lib/index.d.ts:30

___

### s

• `Optional` **s**: `string`

#### Inherited from

TransactionResponse.s

#### Defined in

@ethersproject/transactions/lib/index.d.ts:37

___

### timestamp

• `Optional` **timestamp**: `number`

#### Inherited from

TransactionResponse.timestamp

#### Defined in

@ethersproject/abstract-provider/lib/index.d.ts:27

___

### to

• `Optional` **to**: `string`

#### Inherited from

TransactionResponse.to

#### Defined in

@ethersproject/transactions/lib/index.d.ts:28

___

### type

• `Optional` **type**: ``null`` \| `number`

#### Inherited from

TransactionResponse.type

#### Defined in

@ethersproject/transactions/lib/index.d.ts:39

___

### v

• `Optional` **v**: `number`

#### Inherited from

TransactionResponse.v

#### Defined in

@ethersproject/transactions/lib/index.d.ts:38

___

### value

• **value**: `BigNumber`

#### Inherited from

TransactionResponse.value

#### Defined in

@ethersproject/transactions/lib/index.d.ts:34

## Methods

### wait

▸ **wait**(`confirmations?`): `Promise`<[`ContractReceipt`](helpers.ContractReceipt.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `confirmations?` | `number` |

#### Returns

`Promise`<[`ContractReceipt`](helpers.ContractReceipt.md)\>

#### Overrides

TransactionResponse.wait

#### Defined in

@ethersproject/contracts/lib/index.d.ts:61
