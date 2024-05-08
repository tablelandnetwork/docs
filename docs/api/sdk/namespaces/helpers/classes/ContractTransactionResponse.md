# Class: ContractTransactionResponse

A **ContractTransactionResponse** will return a
 [[ContractTransactionReceipt]] when waited on.

## Extends

- `TransactionResponse`

## Constructors

### new ContractTransactionResponse()

> **new ContractTransactionResponse**(`iface`, `provider`, `tx`): [`ContractTransactionResponse`](ContractTransactionResponse.md)

@_ignore:

#### Parameters

• **iface**: `Interface`

• **provider**: `Provider`

• **tx**: `TransactionResponse`

#### Returns

[`ContractTransactionResponse`](ContractTransactionResponse.md)

#### Overrides

`TransactionResponse.constructor`

#### Source

ethers/lib.commonjs/contract/wrappers.d.ts:75

## Properties

### #private

> `private` **#private**: `any`

#### Source

ethers/lib.commonjs/contract/wrappers.d.ts:71

***

### #private

> `private` **#private**: `any`

#### Inherited from

`TransactionResponse.#private`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:712

***

### accessList

> `readonly` **accessList**: `null` \| `AccessList`

The [[link-eip-2930]] access list for transaction types that
 support it, otherwise ``null``.

#### Inherited from

`TransactionResponse.accessList`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:822

***

### blobVersionedHashes

> `readonly` **blobVersionedHashes**: `null` \| `string`[]

The [[link-eip-4844]] BLOb versioned hashes.

#### Inherited from

`TransactionResponse.blobVersionedHashes`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:826

***

### blockHash

> `readonly` **blockHash**: `null` \| `string`

The blockHash of the block that this transaction was included in.

 This is ``null`` for pending transactions.

#### Inherited from

`TransactionResponse.blockHash`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:729

***

### blockNumber

> `readonly` **blockNumber**: `null` \| `number`

The block number of the block that this transaction was included in.

 This is ``null`` for pending transactions.

#### Inherited from

`TransactionResponse.blockNumber`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:723

***

### chainId

> `readonly` **chainId**: `bigint`

The chain ID.

#### Inherited from

`TransactionResponse.chainId`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:813

***

### data

> `readonly` **data**: `string`

The data.

#### Inherited from

`TransactionResponse.data`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:804

***

### from

> `readonly` **from**: `string`

The sender of this transaction. It is implicitly computed
 from the transaction pre-image hash (as the digest) and the
 [[signature]] using ecrecover.

#### Inherited from

`TransactionResponse.from`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:757

***

### gasLimit

> `readonly` **gasLimit**: `bigint`

The maximum units of gas this transaction can consume. If execution
 exceeds this, the entries transaction is reverted and the sender
 is charged for the full amount, despite not state changes being made.

#### Inherited from

`TransactionResponse.gasLimit`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:772

***

### gasPrice

> `readonly` **gasPrice**: `bigint`

The gas price can have various values, depending on the network.

 In modern networks, for transactions that are included this is
 the //effective gas price// (the fee per gas that was actually
 charged), while for transactions that have not been included yet
 is the [[maxFeePerGas]].

 For legacy transactions, or transactions on legacy networks, this
 is the fee that will be charged per unit of gas the transaction
 consumes.

#### Inherited from

`TransactionResponse.gasPrice`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:785

***

### hash

> `readonly` **hash**: `string`

The transaction hash.

#### Inherited from

`TransactionResponse.hash`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:737

***

### index

> `readonly` **index**: `number`

The index within the block that this transaction resides at.

#### Inherited from

`TransactionResponse.index`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:733

***

### maxFeePerBlobGas

> `readonly` **maxFeePerBlobGas**: `null` \| `bigint`

The [[link-eip-4844]] max fee per BLOb gas.

#### Inherited from

`TransactionResponse.maxFeePerBlobGas`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:800

***

### maxFeePerGas

> `readonly` **maxFeePerGas**: `null` \| `bigint`

The maximum fee (per unit of gas) to allow this transaction
 to charge the sender.

#### Inherited from

`TransactionResponse.maxFeePerGas`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:796

***

### maxPriorityFeePerGas

> `readonly` **maxPriorityFeePerGas**: `null` \| `bigint`

The maximum priority fee (per unit of gas) to allow a
 validator to charge the sender. This is inclusive of the
 [[maxFeeFeePerGas]].

#### Inherited from

`TransactionResponse.maxPriorityFeePerGas`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:791

***

### nonce

> `readonly` **nonce**: `number`

The nonce, which is used to prevent replay attacks and offer
 a method to ensure transactions from a given sender are explicitly
 ordered.

 When sending a transaction, this must be equal to the number of
 transactions ever sent by [[from]].

#### Inherited from

`TransactionResponse.nonce`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:766

***

### provider

> `readonly` **provider**: `Provider`

The provider this is connected to, which will influence how its
 methods will resolve its async inspection methods.

#### Inherited from

`TransactionResponse.provider`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:717

***

### signature

> `readonly` **signature**: `Signature`

The signature.

#### Inherited from

`TransactionResponse.signature`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:817

***

### to

> `readonly` **to**: `null` \| `string`

The receiver of this transaction.

 If ``null``, then the transaction is an initcode transaction.
 This means the result of executing the [[data]] will be deployed
 as a new contract on chain (assuming it does not revert) and the
 address may be computed using [[getCreateAddress]].

#### Inherited from

`TransactionResponse.to`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:751

***

### type

> `readonly` **type**: `number`

The [[link-eip-2718]] transaction envelope type. This is
 ``0`` for legacy transactions types.

#### Inherited from

`TransactionResponse.type`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:742

***

### value

> `readonly` **value**: `bigint`

The value, in wei. Use [[formatEther]] to format this value
 as ether.

#### Inherited from

`TransactionResponse.value`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:809

## Methods

### confirmations()

> **confirmations**(): `Promise`\<`number`\>

Resolve to the number of confirmations this transaction has.

#### Returns

`Promise`\<`number`\>

#### Inherited from

`TransactionResponse.confirmations`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:850

***

### getBlock()

> **getBlock**(): `Promise`\<`null` \| `Block`\>

Resolves to the Block that this transaction was included in.

 This will return null if the transaction has not been included yet.

#### Returns

`Promise`\<`null` \| `Block`\>

#### Inherited from

`TransactionResponse.getBlock`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:840

***

### getTransaction()

> **getTransaction**(): `Promise`\<`null` \| `TransactionResponse`\>

Resolves to this transaction being re-requested from the
 provider. This can be used if you have an unmined transaction
 and wish to get an up-to-date populated instance.

#### Returns

`Promise`\<`null` \| `TransactionResponse`\>

#### Inherited from

`TransactionResponse.getTransaction`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:846

***

### isBerlin()

> **isBerlin**(): `this is TransactionResponse & Object`

Returns true if the transaction is a Berlin (i.e. ``type == 1``)
 transaction. See [[link-eip-2070]].

 This provides a Type Guard that this transaction will have
 the ``null``-ness for hardfork-specific properties set correctly.

#### Returns

`this is TransactionResponse & Object`

#### Inherited from

`TransactionResponse.isBerlin`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:892

***

### isCancun()

> **isCancun**(): `this is TransactionResponse & Object`

Returns true if hte transaction is a Cancun (i.e. ``type == 3``)
 transaction. See [[link-eip-4844]].

#### Returns

`this is TransactionResponse & Object`

#### Inherited from

`TransactionResponse.isCancun`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:913

***

### isLegacy()

> **isLegacy**(): `this is TransactionResponse & Object`

Returns true if the transaction is a legacy (i.e. ``type == 0``)
 transaction.

 This provides a Type Guard that this transaction will have
 the ``null``-ness for hardfork-specific properties set correctly.

#### Returns

`this is TransactionResponse & Object`

#### Inherited from

`TransactionResponse.isLegacy`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:880

***

### isLondon()

> **isLondon**(): `this is TransactionResponse & Object`

Returns true if the transaction is a London (i.e. ``type == 2``)
 transaction. See [[link-eip-1559]].

 This provides a Type Guard that this transaction will have
 the ``null``-ness for hardfork-specific properties set correctly.

#### Returns

`this is TransactionResponse & Object`

#### Inherited from

`TransactionResponse.isLondon`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:904

***

### isMined()

> **isMined**(): `this is MinedTransactionResponse`

Returns ``true`` if this transaction has been included.

 This is effective only as of the time the TransactionResponse
 was instantiated. To get up-to-date information, use
 [[getTransaction]].

 This provides a Type Guard that this transaction will have
 non-null property values for properties that are null for
 unmined transactions.

#### Returns

`this is MinedTransactionResponse`

#### Inherited from

`TransactionResponse.isMined`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:872

***

### removedEvent()

> **removedEvent**(): `OrphanFilter`

Returns a filter which can be used to listen for orphan events
 that evict this transaction.

#### Returns

`OrphanFilter`

#### Inherited from

`TransactionResponse.removedEvent`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:924

***

### reorderedEvent()

> **reorderedEvent**(`other`?): `OrphanFilter`

Returns a filter which can be used to listen for orphan events
 that re-order this event against %%other%%.

#### Parameters

• **other?**: `TransactionResponse`

#### Returns

`OrphanFilter`

#### Inherited from

`TransactionResponse.reorderedEvent`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:929

***

### replaceableTransaction()

> **replaceableTransaction**(`startBlock`): `TransactionResponse`

Returns a new TransactionResponse instance which has the ability to
 detect (and throw an error) if the transaction is replaced, which
 will begin scanning at %%startBlock%%.

 This should generally not be used by developers and is intended
 primarily for internal use. Setting an incorrect %%startBlock%% can
 have devastating performance consequences if used incorrectly.

#### Parameters

• **startBlock**: `number`

#### Returns

`TransactionResponse`

#### Inherited from

`TransactionResponse.replaceableTransaction`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:939

***

### toJSON()

> **toJSON**(): `any`

Returns a JSON-compatible representation of this transaction.

#### Returns

`any`

#### Inherited from

`TransactionResponse.toJSON`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:834

***

### wait()

> **wait**(`confirms`?, `timeout`?): `Promise`\<`null` \| [`ContractTransactionReceipt`](ContractTransactionReceipt.md)\>

Resolves once this transaction has been mined and has
 %%confirms%% blocks including it (default: ``1``) with an
 optional %%timeout%%.

 This can resolve to ``null`` only if %%confirms%% is ``0``
 and the transaction has not been mined, otherwise this will
 wait until enough confirmations have completed.

#### Parameters

• **confirms?**: `number`

• **timeout?**: `number`

#### Returns

`Promise`\<`null` \| [`ContractTransactionReceipt`](ContractTransactionReceipt.md)\>

#### Overrides

`TransactionResponse.wait`

#### Source

ethers/lib.commonjs/contract/wrappers.d.ts:85
