---
id: "helpers.ContractTransactionResponse"
title: "Class: ContractTransactionResponse"
sidebar_label: "ContractTransactionResponse"
custom_edit_url: null
---

[helpers](../namespaces/helpers.md).ContractTransactionResponse

A **ContractTransactionResponse** will return a
 [[ContractTransactionReceipt]] when waited on.

## Hierarchy

- `TransactionResponse`

  ↳ **`ContractTransactionResponse`**

## Constructors

### constructor

• **new ContractTransactionResponse**(`iface`, `provider`, `tx`): [`ContractTransactionResponse`](helpers.ContractTransactionResponse.md)

@_ignore:

#### Parameters

| Name | Type |
| :------ | :------ |
| `iface` | `Interface` |
| `provider` | `Provider` |
| `tx` | `TransactionResponse` |

#### Returns

[`ContractTransactionResponse`](helpers.ContractTransactionResponse.md)

#### Overrides

TransactionResponse.constructor

#### Defined in

ethers/lib.commonjs/contract/wrappers.d.ts:75

## Properties

### #private

• `Private` **#private**: `any`

#### Defined in

ethers/lib.commonjs/contract/wrappers.d.ts:71

___

### #private

• `Private` **#private**: `any`

#### Inherited from

TransactionResponse.#private

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:712

___

### accessList

• `Readonly` **accessList**: ``null`` \| `AccessList`

The [[link-eip-2930]] access list for transaction types that
 support it, otherwise ``null``.

#### Inherited from

TransactionResponse.accessList

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:822

___

### blobVersionedHashes

• `Readonly` **blobVersionedHashes**: ``null`` \| `string`[]

The [[link-eip-4844]] BLOb versioned hashes.

#### Inherited from

TransactionResponse.blobVersionedHashes

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:826

___

### blockHash

• `Readonly` **blockHash**: ``null`` \| `string`

The blockHash of the block that this transaction was included in.

 This is ``null`` for pending transactions.

#### Inherited from

TransactionResponse.blockHash

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:729

___

### blockNumber

• `Readonly` **blockNumber**: ``null`` \| `number`

The block number of the block that this transaction was included in.

 This is ``null`` for pending transactions.

#### Inherited from

TransactionResponse.blockNumber

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:723

___

### chainId

• `Readonly` **chainId**: `bigint`

The chain ID.

#### Inherited from

TransactionResponse.chainId

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:813

___

### data

• `Readonly` **data**: `string`

The data.

#### Inherited from

TransactionResponse.data

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:804

___

### from

• `Readonly` **from**: `string`

The sender of this transaction. It is implicitly computed
 from the transaction pre-image hash (as the digest) and the
 [[signature]] using ecrecover.

#### Inherited from

TransactionResponse.from

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:757

___

### gasLimit

• `Readonly` **gasLimit**: `bigint`

The maximum units of gas this transaction can consume. If execution
 exceeds this, the entries transaction is reverted and the sender
 is charged for the full amount, despite not state changes being made.

#### Inherited from

TransactionResponse.gasLimit

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:772

___

### gasPrice

• `Readonly` **gasPrice**: `bigint`

The gas price can have various values, depending on the network.

 In modern networks, for transactions that are included this is
 the //effective gas price// (the fee per gas that was actually
 charged), while for transactions that have not been included yet
 is the [[maxFeePerGas]].

 For legacy transactions, or transactions on legacy networks, this
 is the fee that will be charged per unit of gas the transaction
 consumes.

#### Inherited from

TransactionResponse.gasPrice

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:785

___

### hash

• `Readonly` **hash**: `string`

The transaction hash.

#### Inherited from

TransactionResponse.hash

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:737

___

### index

• `Readonly` **index**: `number`

The index within the block that this transaction resides at.

#### Inherited from

TransactionResponse.index

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:733

___

### maxFeePerBlobGas

• `Readonly` **maxFeePerBlobGas**: ``null`` \| `bigint`

The [[link-eip-4844]] max fee per BLOb gas.

#### Inherited from

TransactionResponse.maxFeePerBlobGas

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:800

___

### maxFeePerGas

• `Readonly` **maxFeePerGas**: ``null`` \| `bigint`

The maximum fee (per unit of gas) to allow this transaction
 to charge the sender.

#### Inherited from

TransactionResponse.maxFeePerGas

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:796

___

### maxPriorityFeePerGas

• `Readonly` **maxPriorityFeePerGas**: ``null`` \| `bigint`

The maximum priority fee (per unit of gas) to allow a
 validator to charge the sender. This is inclusive of the
 [[maxFeeFeePerGas]].

#### Inherited from

TransactionResponse.maxPriorityFeePerGas

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:791

___

### nonce

• `Readonly` **nonce**: `number`

The nonce, which is used to prevent replay attacks and offer
 a method to ensure transactions from a given sender are explicitly
 ordered.

 When sending a transaction, this must be equal to the number of
 transactions ever sent by [[from]].

#### Inherited from

TransactionResponse.nonce

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:766

___

### provider

• `Readonly` **provider**: `Provider`

The provider this is connected to, which will influence how its
 methods will resolve its async inspection methods.

#### Inherited from

TransactionResponse.provider

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:717

___

### signature

• `Readonly` **signature**: `Signature`

The signature.

#### Inherited from

TransactionResponse.signature

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:817

___

### to

• `Readonly` **to**: ``null`` \| `string`

The receiver of this transaction.

 If ``null``, then the transaction is an initcode transaction.
 This means the result of executing the [[data]] will be deployed
 as a new contract on chain (assuming it does not revert) and the
 address may be computed using [[getCreateAddress]].

#### Inherited from

TransactionResponse.to

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:751

___

### type

• `Readonly` **type**: `number`

The [[link-eip-2718]] transaction envelope type. This is
 ``0`` for legacy transactions types.

#### Inherited from

TransactionResponse.type

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:742

___

### value

• `Readonly` **value**: `bigint`

The value, in wei. Use [[formatEther]] to format this value
 as ether.

#### Inherited from

TransactionResponse.value

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:809

## Methods

### confirmations

▸ **confirmations**(): `Promise`\<`number`\>

Resolve to the number of confirmations this transaction has.

#### Returns

`Promise`\<`number`\>

#### Inherited from

TransactionResponse.confirmations

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:850

___

### getBlock

▸ **getBlock**(): `Promise`\<``null`` \| `Block`\>

Resolves to the Block that this transaction was included in.

 This will return null if the transaction has not been included yet.

#### Returns

`Promise`\<``null`` \| `Block`\>

#### Inherited from

TransactionResponse.getBlock

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:840

___

### getTransaction

▸ **getTransaction**(): `Promise`\<``null`` \| `TransactionResponse`\>

Resolves to this transaction being re-requested from the
 provider. This can be used if you have an unmined transaction
 and wish to get an up-to-date populated instance.

#### Returns

`Promise`\<``null`` \| `TransactionResponse`\>

#### Inherited from

TransactionResponse.getTransaction

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:846

___

### isBerlin

▸ **isBerlin**(): this is TransactionResponse & Object

Returns true if the transaction is a Berlin (i.e. ``type == 1``)
 transaction. See [[link-eip-2070]].

 This provides a Type Guard that this transaction will have
 the ``null``-ness for hardfork-specific properties set correctly.

#### Returns

this is TransactionResponse & Object

#### Inherited from

TransactionResponse.isBerlin

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:892

___

### isCancun

▸ **isCancun**(): this is TransactionResponse & Object

Returns true if hte transaction is a Cancun (i.e. ``type == 3``)
 transaction. See [[link-eip-4844]].

#### Returns

this is TransactionResponse & Object

#### Inherited from

TransactionResponse.isCancun

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:913

___

### isLegacy

▸ **isLegacy**(): this is TransactionResponse & Object

Returns true if the transaction is a legacy (i.e. ``type == 0``)
 transaction.

 This provides a Type Guard that this transaction will have
 the ``null``-ness for hardfork-specific properties set correctly.

#### Returns

this is TransactionResponse & Object

#### Inherited from

TransactionResponse.isLegacy

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:880

___

### isLondon

▸ **isLondon**(): this is TransactionResponse & Object

Returns true if the transaction is a London (i.e. ``type == 2``)
 transaction. See [[link-eip-1559]].

 This provides a Type Guard that this transaction will have
 the ``null``-ness for hardfork-specific properties set correctly.

#### Returns

this is TransactionResponse & Object

#### Inherited from

TransactionResponse.isLondon

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:904

___

### isMined

▸ **isMined**(): this is MinedTransactionResponse

Returns ``true`` if this transaction has been included.

 This is effective only as of the time the TransactionResponse
 was instantiated. To get up-to-date information, use
 [[getTransaction]].

 This provides a Type Guard that this transaction will have
 non-null property values for properties that are null for
 unmined transactions.

#### Returns

this is MinedTransactionResponse

#### Inherited from

TransactionResponse.isMined

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:872

___

### removedEvent

▸ **removedEvent**(): `OrphanFilter`

Returns a filter which can be used to listen for orphan events
 that evict this transaction.

#### Returns

`OrphanFilter`

#### Inherited from

TransactionResponse.removedEvent

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:924

___

### reorderedEvent

▸ **reorderedEvent**(`other?`): `OrphanFilter`

Returns a filter which can be used to listen for orphan events
 that re-order this event against %%other%%.

#### Parameters

| Name | Type |
| :------ | :------ |
| `other?` | `TransactionResponse` |

#### Returns

`OrphanFilter`

#### Inherited from

TransactionResponse.reorderedEvent

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:929

___

### replaceableTransaction

▸ **replaceableTransaction**(`startBlock`): `TransactionResponse`

Returns a new TransactionResponse instance which has the ability to
 detect (and throw an error) if the transaction is replaced, which
 will begin scanning at %%startBlock%%.

 This should generally not be used by developers and is intended
 primarily for internal use. Setting an incorrect %%startBlock%% can
 have devastating performance consequences if used incorrectly.

#### Parameters

| Name | Type |
| :------ | :------ |
| `startBlock` | `number` |

#### Returns

`TransactionResponse`

#### Inherited from

TransactionResponse.replaceableTransaction

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:939

___

### toJSON

▸ **toJSON**(): `any`

Returns a JSON-compatible representation of this transaction.

#### Returns

`any`

#### Inherited from

TransactionResponse.toJSON

#### Defined in

ethers/lib.commonjs/providers/provider.d.ts:834

___

### wait

▸ **wait**(`confirms?`, `timeout?`): `Promise`\<``null`` \| [`ContractTransactionReceipt`](helpers.ContractTransactionReceipt.md)\>

Resolves once this transaction has been mined and has
 %%confirms%% blocks including it (default: ``1``) with an
 optional %%timeout%%.

 This can resolve to ``null`` only if %%confirms%% is ``0``
 and the transaction has not been mined, otherwise this will
 wait until enough confirmations have completed.

#### Parameters

| Name | Type |
| :------ | :------ |
| `confirms?` | `number` |
| `timeout?` | `number` |

#### Returns

`Promise`\<``null`` \| [`ContractTransactionReceipt`](helpers.ContractTransactionReceipt.md)\>

#### Overrides

TransactionResponse.wait

#### Defined in

ethers/lib.commonjs/contract/wrappers.d.ts:85
