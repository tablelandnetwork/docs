# Class: ContractTransactionReceipt

A **ContractTransactionReceipt** includes the parsed logs from a
 [[TransactionReceipt]].

## Extends

- `TransactionReceipt`

## Constructors

### new ContractTransactionReceipt()

> **new ContractTransactionReceipt**(`iface`, `provider`, `tx`): [`ContractTransactionReceipt`](ContractTransactionReceipt.md)

@_ignore:

#### Parameters

• **iface**: `Interface`

• **provider**: `Provider`

• **tx**: `TransactionReceipt`

#### Returns

[`ContractTransactionReceipt`](ContractTransactionReceipt.md)

#### Overrides

`TransactionReceipt.constructor`

#### Source

ethers/lib.commonjs/contract/wrappers.d.ts:59

## Properties

### #private

> `private` **#private**: `any`

#### Source

ethers/lib.commonjs/contract/wrappers.d.ts:55

***

### #private

> `private` **#private**: `any`

#### Inherited from

`TransactionReceipt.#private`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:539

***

### blobGasPrice

> `readonly` **blobGasPrice**: `null` \| `bigint`

The price paid per BLOB in gas. See [[link-eip-4844]].

#### Inherited from

`TransactionReceipt.blobGasPrice`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:614

***

### blobGasUsed

> `readonly` **blobGasUsed**: `null` \| `bigint`

The gas used for BLObs. See [[link-eip-4844]].

#### Inherited from

`TransactionReceipt.blobGasUsed`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:594

***

### blockHash

> `readonly` **blockHash**: `string`

The block hash of the [[Block]] this transaction was included in.

#### Inherited from

`TransactionReceipt.blockHash`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:572

***

### blockNumber

> `readonly` **blockNumber**: `number`

The block number of the [[Block]] this transaction was included in.

#### Inherited from

`TransactionReceipt.blockNumber`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:576

***

### contractAddress

> `readonly` **contractAddress**: `null` \| `string`

The address of the contract if the transaction was directly
 responsible for deploying one.

 This is non-null **only** if the ``to`` is empty and the ``data``
 was successfully executed as initcode.

#### Inherited from

`TransactionReceipt.contractAddress`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:560

***

### cumulativeGasUsed

> `readonly` **cumulativeGasUsed**: `bigint`

The amount of gas used by all transactions within the block for this
 and all transactions with a lower ``index``.

 This is generally not useful for developers but can be used to
 validate certain aspects of execution.

#### Inherited from

`TransactionReceipt.cumulativeGasUsed`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:602

***

### from

> `readonly` **from**: `string`

The sender of the transaction.

#### Inherited from

`TransactionReceipt.from`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:552

***

### gasPrice

> `readonly` **gasPrice**: `bigint`

The actual gas price used during execution.

 Due to the complexity of [[link-eip-1559]] this value can only
 be caluclated after the transaction has been mined, snce the base
 fee is protocol-enforced.

#### Inherited from

`TransactionReceipt.gasPrice`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:610

***

### gasUsed

> `readonly` **gasUsed**: `bigint`

The actual amount of gas used by this transaction.

 When creating a transaction, the amount of gas that will be used can
 only be approximated, but the sender must pay the gas fee for the
 entire gas limit. After the transaction, the difference is refunded.

#### Inherited from

`TransactionReceipt.gasUsed`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:590

***

### hash

> `readonly` **hash**: `string`

The transaction hash.

#### Inherited from

`TransactionReceipt.hash`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:564

***

### index

> `readonly` **index**: `number`

The index of this transaction within the block transactions.

#### Inherited from

`TransactionReceipt.index`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:568

***

### logsBloom

> `readonly` **logsBloom**: `string`

The bloom filter bytes that represent all logs that occurred within
 this transaction. This is generally not useful for most developers,
 but can be used to validate the included logs.

#### Inherited from

`TransactionReceipt.logsBloom`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:582

***

### provider

> `readonly` **provider**: `Provider`

The provider connected to the log used to fetch additional details
 if necessary.

#### Inherited from

`TransactionReceipt.provider`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:544

***

### root

> `readonly` **root**: `null` \| `string`

The root hash of this transaction.

 This is no present and was only included in pre-byzantium blocks, but
 could be used to validate certain parts of the receipt.

#### Inherited from

`TransactionReceipt.root`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:633

***

### status

> `readonly` **status**: `null` \| `number`

The status of this transaction, indicating success (i.e. ``1``) or
 a revert (i.e. ``0``).

 This is available in post-byzantium blocks, but some backends may
 backfill this value.

#### Inherited from

`TransactionReceipt.status`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:626

***

### to

> `readonly` **to**: `null` \| `string`

The address the transaction was sent to.

#### Inherited from

`TransactionReceipt.to`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:548

***

### type

> `readonly` **type**: `number`

The [[link-eip-2718]] transaction type.

#### Inherited from

`TransactionReceipt.type`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:618

## Accessors

### fee

> `get` **fee**(): `bigint`

The total fee for this transaction, in wei.

#### Returns

`bigint`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:654

***

### length

> `get` **length**(): `number`

@_ignore:

#### Returns

`number`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:649

***

### logs

> `get` **logs**(): (`EventLog` \| `Log`)[]

The parsed logs for any [[Log]] which has a matching event in the
 Contract ABI.

#### Returns

(`EventLog` \| `Log`)[]

#### Source

ethers/lib.commonjs/contract/wrappers.d.ts:64

## Methods

### `[iterator]`()

> **\[iterator\]**(): `Iterator`\<`Log`, `any`, `undefined`\>

#### Returns

`Iterator`\<`Log`, `any`, `undefined`\>

#### Inherited from

`TransactionReceipt.[iterator]`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:650

***

### confirmations()

> **confirmations**(): `Promise`\<`number`\>

Resolves to the number of confirmations this transaction has.

#### Returns

`Promise`\<`number`\>

#### Inherited from

`TransactionReceipt.confirmations`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:673

***

### getBlock()

> **getBlock**(): `Promise`\<`Block`\>

Resolves to the block this transaction occurred in.

#### Returns

`Promise`\<`Block`\>

#### Inherited from

`TransactionReceipt.getBlock`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:658

***

### getResult()

> **getResult**(): `Promise`\<`string`\>

Resolves to the return value of the execution of this transaction.

 Support for this feature is limited, as it requires an archive node
 with the ``debug_`` or ``trace_`` API enabled.

#### Returns

`Promise`\<`string`\>

#### Inherited from

`TransactionReceipt.getResult`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:669

***

### getTransaction()

> **getTransaction**(): `Promise`\<`TransactionResponse`\>

Resolves to the transaction this transaction occurred in.

#### Returns

`Promise`\<`TransactionResponse`\>

#### Inherited from

`TransactionReceipt.getTransaction`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:662

***

### removedEvent()

> **removedEvent**(): `OrphanFilter`

@_ignore:

#### Returns

`OrphanFilter`

#### Inherited from

`TransactionReceipt.removedEvent`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:677

***

### reorderedEvent()

> **reorderedEvent**(`other`?): `OrphanFilter`

@_ignore:

#### Parameters

• **other?**: `TransactionResponse`

#### Returns

`OrphanFilter`

#### Inherited from

`TransactionReceipt.reorderedEvent`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:681

***

### toJSON()

> **toJSON**(): `any`

Returns a JSON-compatible representation.

#### Returns

`any`

#### Inherited from

`TransactionReceipt.toJSON`

#### Source

ethers/lib.commonjs/providers/provider.d.ts:645
