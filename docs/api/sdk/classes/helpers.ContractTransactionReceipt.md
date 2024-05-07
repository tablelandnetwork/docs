---
id: "helpers.ContractTransactionReceipt"
title: "Class: ContractTransactionReceipt"
sidebar_label: "ContractTransactionReceipt"
custom_edit_url: null
---

[helpers](../namespaces/helpers.md).ContractTransactionReceipt

A **ContractTransactionReceipt** includes the parsed logs from a
 [[TransactionReceipt]].

## Hierarchy

- `TransactionReceipt`

  ↳ **`ContractTransactionReceipt`**

## Constructors

### constructor

• **new ContractTransactionReceipt**(`iface`, `provider`, `tx`): [`ContractTransactionReceipt`](helpers.ContractTransactionReceipt.md)

@_ignore:

#### Parameters

| Name | Type |
| :------ | :------ |
| `iface` | `Interface` |
| `provider` | `Provider` |
| `tx` | `TransactionReceipt` |

#### Returns

[`ContractTransactionReceipt`](helpers.ContractTransactionReceipt.md)

#### Overrides

TransactionReceipt.constructor

#### Defined in

ethers/lib.commonjs/contract/wrappers.d.ts:59

## Properties

### #private

• `Private` **#private**: `any`

#### Defined in

ethers/lib.commonjs/contract/wrappers.d.ts:55

___

### #private

• `Private` **#private**: `any`

#### Inherited from

TransactionReceipt.#private

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:539

___

### blobGasPrice

• `Readonly` **blobGasPrice**: ``null`` \| `bigint`

The price paid per BLOB in gas. See [[link-eip-4844]].

#### Inherited from

TransactionReceipt.blobGasPrice

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:614

___

### blobGasUsed

• `Readonly` **blobGasUsed**: ``null`` \| `bigint`

The gas used for BLObs. See [[link-eip-4844]].

#### Inherited from

TransactionReceipt.blobGasUsed

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:594

___

### blockHash

• `Readonly` **blockHash**: `string`

The block hash of the [[Block]] this transaction was included in.

#### Inherited from

TransactionReceipt.blockHash

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:572

___

### blockNumber

• `Readonly` **blockNumber**: `number`

The block number of the [[Block]] this transaction was included in.

#### Inherited from

TransactionReceipt.blockNumber

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:576

___

### contractAddress

• `Readonly` **contractAddress**: ``null`` \| `string`

The address of the contract if the transaction was directly
 responsible for deploying one.

 This is non-null **only** if the ``to`` is empty and the ``data``
 was successfully executed as initcode.

#### Inherited from

TransactionReceipt.contractAddress

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:560

___

### cumulativeGasUsed

• `Readonly` **cumulativeGasUsed**: `bigint`

The amount of gas used by all transactions within the block for this
 and all transactions with a lower ``index``.

 This is generally not useful for developers but can be used to
 validate certain aspects of execution.

#### Inherited from

TransactionReceipt.cumulativeGasUsed

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:602

___

### from

• `Readonly` **from**: `string`

The sender of the transaction.

#### Inherited from

TransactionReceipt.from

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:552

___

### gasPrice

• `Readonly` **gasPrice**: `bigint`

The actual gas price used during execution.

 Due to the complexity of [[link-eip-1559]] this value can only
 be caluclated after the transaction has been mined, snce the base
 fee is protocol-enforced.

#### Inherited from

TransactionReceipt.gasPrice

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:610

___

### gasUsed

• `Readonly` **gasUsed**: `bigint`

The actual amount of gas used by this transaction.

 When creating a transaction, the amount of gas that will be used can
 only be approximated, but the sender must pay the gas fee for the
 entire gas limit. After the transaction, the difference is refunded.

#### Inherited from

TransactionReceipt.gasUsed

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:590

___

### hash

• `Readonly` **hash**: `string`

The transaction hash.

#### Inherited from

TransactionReceipt.hash

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:564

___

### index

• `Readonly` **index**: `number`

The index of this transaction within the block transactions.

#### Inherited from

TransactionReceipt.index

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:568

___

### logsBloom

• `Readonly` **logsBloom**: `string`

The bloom filter bytes that represent all logs that occurred within
 this transaction. This is generally not useful for most developers,
 but can be used to validate the included logs.

#### Inherited from

TransactionReceipt.logsBloom

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:582

___

### provider

• `Readonly` **provider**: `Provider`

The provider connected to the log used to fetch additional details
 if necessary.

#### Inherited from

TransactionReceipt.provider

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:544

___

### root

• `Readonly` **root**: ``null`` \| `string`

The root hash of this transaction.

 This is no present and was only included in pre-byzantium blocks, but
 could be used to validate certain parts of the receipt.

#### Inherited from

TransactionReceipt.root

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:633

___

### status

• `Readonly` **status**: ``null`` \| `number`

The status of this transaction, indicating success (i.e. ``1``) or
 a revert (i.e. ``0``).

 This is available in post-byzantium blocks, but some backends may
 backfill this value.

#### Inherited from

TransactionReceipt.status

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:626

___

### to

• `Readonly` **to**: ``null`` \| `string`

The address the transaction was sent to.

#### Inherited from

TransactionReceipt.to

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:548

___

### type

• `Readonly` **type**: `number`

The [[link-eip-2718]] transaction type.

#### Inherited from

TransactionReceipt.type

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:618

## Accessors

### fee

• `get` **fee**(): `bigint`

The total fee for this transaction, in wei.

#### Returns

`bigint`

#### Inherited from

TransactionReceipt.fee

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:654

___

### length

• `get` **length**(): `number`

@_ignore:

#### Returns

`number`

#### Inherited from

TransactionReceipt.length

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:649

___

### logs

• `get` **logs**(): (`EventLog` \| `Log`)[]

The parsed logs for any [[Log]] which has a matching event in the
 Contract ABI.

#### Returns

(`EventLog` \| `Log`)[]

#### Overrides

TransactionReceipt.logs

#### Defined in

ethers/lib.commonjs/contract/wrappers.d.ts:64

## Methods

### [iterator]

▸ **[iterator]**(): `Iterator`\<`Log`, `any`, `undefined`\>

#### Returns

`Iterator`\<`Log`, `any`, `undefined`\>

#### Inherited from

TransactionReceipt.[iterator]

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:650

___

### confirmations

▸ **confirmations**(): `Promise`\<`number`\>

Resolves to the number of confirmations this transaction has.

#### Returns

`Promise`\<`number`\>

#### Inherited from

TransactionReceipt.confirmations

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:673

___

### getBlock

▸ **getBlock**(): `Promise`\<`Block`\>

Resolves to the block this transaction occurred in.

#### Returns

`Promise`\<`Block`\>

#### Inherited from

TransactionReceipt.getBlock

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:658

___

### getResult

▸ **getResult**(): `Promise`\<`string`\>

Resolves to the return value of the execution of this transaction.

 Support for this feature is limited, as it requires an archive node
 with the ``debug_`` or ``trace_`` API enabled.

#### Returns

`Promise`\<`string`\>

#### Inherited from

TransactionReceipt.getResult

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:669

___

### getTransaction

▸ **getTransaction**(): `Promise`\<`TransactionResponse`\>

Resolves to the transaction this transaction occurred in.

#### Returns

`Promise`\<`TransactionResponse`\>

#### Inherited from

TransactionReceipt.getTransaction

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:662

___

### removedEvent

▸ **removedEvent**(): `OrphanFilter`

@_ignore:

#### Returns

`OrphanFilter`

#### Inherited from

TransactionReceipt.removedEvent

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:677

___

### reorderedEvent

▸ **reorderedEvent**(`other?`): `OrphanFilter`

@_ignore:

#### Parameters

| Name | Type |
| :------ | :------ |
| `other?` | `TransactionResponse` |

#### Returns

`OrphanFilter`

#### Inherited from

TransactionReceipt.reorderedEvent

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:681

___

### toJSON

▸ **toJSON**(): `any`

Returns a JSON-compatible representation.

#### Returns

`any`

#### Inherited from

TransactionReceipt.toJSON

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:645
