# Interface: Signer

A Signer represents an account on the Ethereum Blockchain, and is most often
 backed by a private key represented by a mnemonic or residing on a Hardware Wallet.

 The API remains abstract though, so that it can deal with more advanced exotic
 Signing entities, such as Smart Contract Wallets or Virtual Wallets (where the
 private key may not be known).

## Extends

- `Addressable`.`ContractRunner`.`NameResolver`

## Properties

### provider

> **provider**: `null` \| `Provider`

The [[Provider]] attached to this Signer (if any).

#### Overrides

`ContractRunner.provider`

#### Source

ethers/lib.commonjs/providers/signer.d.ts:18

## Methods

### call()

> **call**(`tx`): `Promise`\<`string`\>

Evaluates the //tx// by running it against the current Blockchain state. This
 cannot change state and has no cost in ether, as it is effectively simulating
 execution.

 This can be used to have the Blockchain perform computations based on its state
 (e.g. running a Contract's getters) or to simulate the effect of a transaction
 before actually performing an operation.

#### Parameters

• **tx**: `TransactionRequest`

#### Returns

`Promise`\<`string`\>

#### Overrides

`ContractRunner.call`

#### Source

ethers/lib.commonjs/providers/signer.d.ts:86

***

### connect()

> **connect**(`provider`): [`Signer`](Signer.md)

Returns a new instance of this Signer connected to //provider// or detached
 from any Provider if null.

#### Parameters

• **provider**: `null` \| `Provider`

#### Returns

[`Signer`](Signer.md)

#### Source

ethers/lib.commonjs/providers/signer.d.ts:23

***

### estimateGas()

> **estimateGas**(`tx`): `Promise`\<`bigint`\>

Estimates the required gas required to execute //tx// on the Blockchain. This
 will be the expected amount a transaction will require as its ``gasLimit``
 to successfully run all the necessary computations and store the needed state
 that the transaction intends.

 Keep in mind that this is **best efforts**, since the state of the Blockchain
 is in flux, which could affect transaction gas requirements.

#### Parameters

• **tx**: `TransactionRequest`

#### Returns

`Promise`\<`bigint`\>

#### Overrides

`ContractRunner.estimateGas`

#### Throws

UNPREDICTABLE_GAS_LIMIT A transaction that is believed by the node to likely
         fail will throw an error during gas estimation. This could indicate that it
         will actually fail or that the circumstances are simply too complex for the
         node to take into account. In these cases, a manually determined ``gasLimit``
         will need to be made.

#### Source

ethers/lib.commonjs/providers/signer.d.ts:76

***

### getAddress()

> **getAddress**(): `Promise`\<`string`\>

Get the address of the Signer.

#### Returns

`Promise`\<`string`\>

#### Overrides

`Addressable.getAddress`

#### Source

ethers/lib.commonjs/providers/signer.d.ts:27

***

### getNonce()

> **getNonce**(`blockTag`?): `Promise`\<`number`\>

Gets the next nonce required for this Signer to send a transaction.

#### Parameters

• **blockTag?**: `BlockTag`

The blocktag to base the transaction count on, keep in mind
        many nodes do not honour this value and silently ignore it [default: ``"latest"``]

#### Returns

`Promise`\<`number`\>

#### Source

ethers/lib.commonjs/providers/signer.d.ts:34

***

### populateCall()

> **populateCall**(`tx`): `Promise`\<`TransactionLike`\<`string`\>\>

Prepares a TransactionRequest for calling:
 - resolves ``to`` and ``from`` addresses
 - if ``from`` is specified , check that it matches this Signer

#### Parameters

• **tx**: `TransactionRequest`

The call to prepare

#### Returns

`Promise`\<`TransactionLike`\<`string`\>\>

#### Source

ethers/lib.commonjs/providers/signer.d.ts:42

***

### populateTransaction()

> **populateTransaction**(`tx`): `Promise`\<`TransactionLike`\<`string`\>\>

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

• **tx**: `TransactionRequest`

The call to prepare

#### Returns

`Promise`\<`TransactionLike`\<`string`\>\>

#### Note

Some Signer implementations may skip populating properties that
       are populated downstream; for example JsonRpcSigner defers to the
       node to populate the nonce and fee data.

#### Source

ethers/lib.commonjs/providers/signer.d.ts:60

***

### resolveName()

> **resolveName**(`name`): `Promise`\<`null` \| `string`\>

Resolves an ENS Name to an address.

#### Parameters

• **name**: `string`

#### Returns

`Promise`\<`null` \| `string`\>

#### Overrides

`ContractRunner.resolveName`

#### Source

ethers/lib.commonjs/providers/signer.d.ts:90

***

### sendTransaction()

> **sendTransaction**(`tx`): `Promise`\<`TransactionResponse`\>

Sends %%tx%% to the Network. The ``signer.populateTransaction(tx)``
 is called first to ensure all necessary properties for the
 transaction to be valid have been popualted first.

#### Parameters

• **tx**: `TransactionRequest`

#### Returns

`Promise`\<`TransactionResponse`\>

#### Overrides

`ContractRunner.sendTransaction`

#### Source

ethers/lib.commonjs/providers/signer.d.ts:101

***

### signMessage()

> **signMessage**(`message`): `Promise`\<`string`\>

Signs an [[link-eip-191]] prefixed personal message.

 If the %%message%% is a string, it is signed as UTF-8 encoded bytes. It is **not**
 interpretted as a [[BytesLike]]; so the string ``"0x1234"`` is signed as six
 characters, **not** two bytes.

 To sign that example as two bytes, the Uint8Array should be used
 (i.e. ``new Uint8Array([ 0x12, 0x34 ])``).

#### Parameters

• **message**: `string` \| `Uint8Array`

#### Returns

`Promise`\<`string`\>

#### Source

ethers/lib.commonjs/providers/signer.d.ts:112

***

### signTransaction()

> **signTransaction**(`tx`): `Promise`\<`string`\>

Signs %%tx%%, returning the fully signed transaction. This does not
 populate any additional properties within the transaction.

#### Parameters

• **tx**: `TransactionRequest`

#### Returns

`Promise`\<`string`\>

#### Source

ethers/lib.commonjs/providers/signer.d.ts:95

***

### signTypedData()

> **signTypedData**(`domain`, `types`, `value`): `Promise`\<`string`\>

Signs the [[link-eip-712]] typed data.

#### Parameters

• **domain**: `TypedDataDomain`

• **types**: `Record`\<`string`, `TypedDataField`[]\>

• **value**: `Record`\<`string`, `any`\>

#### Returns

`Promise`\<`string`\>

#### Source

ethers/lib.commonjs/providers/signer.d.ts:116
