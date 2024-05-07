---
id: "helpers.Signer"
title: "Interface: Signer"
sidebar_label: "Signer"
custom_edit_url: null
---

[helpers](../namespaces/helpers.md).Signer

A Signer represents an account on the Ethereum Blockchain, and is most often
 backed by a private key represented by a mnemonic or residing on a Hardware Wallet.

 The API remains abstract though, so that it can deal with more advanced exotic
 Signing entities, such as Smart Contract Wallets or Virtual Wallets (where the
 private key may not be known).

## Hierarchy

- `Addressable`

- `ContractRunner`

- `NameResolver`

  ↳ **`Signer`**

## Properties

### provider

• **provider**: ``null`` \| `Provider`

The [[Provider]] attached to this Signer (if any).

#### Overrides

ContractRunner.provider

#### Defined in

ethers/lib.commonjs/providers/signer.d.ts:18

## Methods

### call

▸ **call**(`tx`): `Promise`\<`string`\>

Evaluates the //tx// by running it against the current Blockchain state. This
 cannot change state and has no cost in ether, as it is effectively simulating
 execution.

 This can be used to have the Blockchain perform computations based on its state
 (e.g. running a Contract's getters) or to simulate the effect of a transaction
 before actually performing an operation.

#### Parameters

| Name | Type |
| :------ | :------ |
| `tx` | `TransactionRequest` |

#### Returns

`Promise`\<`string`\>

#### Overrides

ContractRunner.call

#### Defined in

ethers/lib.commonjs/providers/signer.d.ts:86

___

### connect

▸ **connect**(`provider`): [`Signer`](helpers.Signer.md)

Returns a new instance of this Signer connected to //provider// or detached
 from any Provider if null.

#### Parameters

| Name | Type |
| :------ | :------ |
| `provider` | ``null`` \| `Provider` |

#### Returns

[`Signer`](helpers.Signer.md)

#### Defined in

ethers/lib.commonjs/providers/signer.d.ts:23

___

### estimateGas

▸ **estimateGas**(`tx`): `Promise`\<`bigint`\>

Estimates the required gas required to execute //tx// on the Blockchain. This
 will be the expected amount a transaction will require as its ``gasLimit``
 to successfully run all the necessary computations and store the needed state
 that the transaction intends.

 Keep in mind that this is **best efforts**, since the state of the Blockchain
 is in flux, which could affect transaction gas requirements.

#### Parameters

| Name | Type |
| :------ | :------ |
| `tx` | `TransactionRequest` |

#### Returns

`Promise`\<`bigint`\>

**`Throws`**

UNPREDICTABLE_GAS_LIMIT A transaction that is believed by the node to likely
         fail will throw an error during gas estimation. This could indicate that it
         will actually fail or that the circumstances are simply too complex for the
         node to take into account. In these cases, a manually determined ``gasLimit``
         will need to be made.

#### Overrides

ContractRunner.estimateGas

#### Defined in

ethers/lib.commonjs/providers/signer.d.ts:76

___

### getAddress

▸ **getAddress**(): `Promise`\<`string`\>

Get the address of the Signer.

#### Returns

`Promise`\<`string`\>

#### Overrides

Addressable.getAddress

#### Defined in

ethers/lib.commonjs/providers/signer.d.ts:27

___

### getNonce

▸ **getNonce**(`blockTag?`): `Promise`\<`number`\>

Gets the next nonce required for this Signer to send a transaction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `blockTag?` | `BlockTag` | The blocktag to base the transaction count on, keep in mind many nodes do not honour this value and silently ignore it [default: ``"latest"``] |

#### Returns

`Promise`\<`number`\>

#### Defined in

ethers/lib.commonjs/providers/signer.d.ts:34

___

### populateCall

▸ **populateCall**(`tx`): `Promise`\<`TransactionLike`\<`string`\>\>

Prepares a TransactionRequest for calling:
 - resolves ``to`` and ``from`` addresses
 - if ``from`` is specified , check that it matches this Signer

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tx` | `TransactionRequest` | The call to prepare |

#### Returns

`Promise`\<`TransactionLike`\<`string`\>\>

#### Defined in

ethers/lib.commonjs/providers/signer.d.ts:42

___

### populateTransaction

▸ **populateTransaction**(`tx`): `Promise`\<`TransactionLike`\<`string`\>\>

Prepares a TransactionRequest for sending to the network by
 populating any missing properties:
 - resolves ``to`` and ``from`` addresses
 - if ``from`` is specified , check that it matches this Signer
 - populates ``nonce`` via ``signer.getNonce("pending")``
 - populates ``gasLimit`` via ``signer.estimateGas(tx)``
 - populates ``chainId`` via ``signer.provider.getNetwork()``
 - populates ``type`` and relevant fee data for that type (``gasPrice``
   for legacy transactions, ``maxFeePerGas`` for EIP-1559, etc)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tx` | `TransactionRequest` | The call to prepare |

#### Returns

`Promise`\<`TransactionLike`\<`string`\>\>

**`Note`**

Some Signer implementations may skip populating properties that
       are populated downstream; for example JsonRpcSigner defers to the
       node to populate the nonce and fee data.

#### Defined in

ethers/lib.commonjs/providers/signer.d.ts:60

___

### resolveName

▸ **resolveName**(`name`): `Promise`\<``null`` \| `string`\>

Resolves an ENS Name to an address.

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Promise`\<``null`` \| `string`\>

#### Overrides

ContractRunner.resolveName

#### Defined in

ethers/lib.commonjs/providers/signer.d.ts:90

___

### sendTransaction

▸ **sendTransaction**(`tx`): `Promise`\<`TransactionResponse`\>

Sends %%tx%% to the Network. The ``signer.populateTransaction(tx)``
 is called first to ensure all necessary properties for the
 transaction to be valid have been popualted first.

#### Parameters

| Name | Type |
| :------ | :------ |
| `tx` | `TransactionRequest` |

#### Returns

`Promise`\<`TransactionResponse`\>

#### Overrides

ContractRunner.sendTransaction

#### Defined in

ethers/lib.commonjs/providers/signer.d.ts:101

___

### signMessage

▸ **signMessage**(`message`): `Promise`\<`string`\>

Signs an [[link-eip-191]] prefixed personal message.

 If the %%message%% is a string, it is signed as UTF-8 encoded bytes. It is **not**
 interpretted as a [[BytesLike]]; so the string ``"0x1234"`` is signed as six
 characters, **not** two bytes.

 To sign that example as two bytes, the Uint8Array should be used
 (i.e. ``new Uint8Array([ 0x12, 0x34 ])``).

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` \| `Uint8Array` |

#### Returns

`Promise`\<`string`\>

#### Defined in

ethers/lib.commonjs/providers/signer.d.ts:112

___

### signTransaction

▸ **signTransaction**(`tx`): `Promise`\<`string`\>

Signs %%tx%%, returning the fully signed transaction. This does not
 populate any additional properties within the transaction.

#### Parameters

| Name | Type |
| :------ | :------ |
| `tx` | `TransactionRequest` |

#### Returns

`Promise`\<`string`\>

#### Defined in

ethers/lib.commonjs/providers/signer.d.ts:95

___

### signTypedData

▸ **signTypedData**(`domain`, `types`, `value`): `Promise`\<`string`\>

Signs the [[link-eip-712]] typed data.

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `TypedDataDomain` |
| `types` | `Record`\<`string`, `TypedDataField`[]\> |
| `value` | `Record`\<`string`, `any`\> |

#### Returns

`Promise`\<`string`\>

#### Defined in

ethers/lib.commonjs/providers/signer.d.ts:116
