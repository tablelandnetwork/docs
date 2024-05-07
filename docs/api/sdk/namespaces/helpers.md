---
id: "helpers"
title: "Namespace: helpers"
sidebar_label: "helpers"
sidebar_position: 0
custom_edit_url: null
---

## Classes

- [ContractTransactionReceipt](../classes/helpers.ContractTransactionReceipt.md)
- [ContractTransactionResponse](../classes/helpers.ContractTransactionResponse.md)
- [TableEventBus](../classes/helpers.TableEventBus.md)

## Interfaces

- [AliasesNameMap](../interfaces/helpers.AliasesNameMap.md)
- [AutoWaitConfig](../interfaces/helpers.AutoWaitConfig.md)
- [ChainInfo](../interfaces/helpers.ChainInfo.md)
- [Eip1193Provider](../interfaces/helpers.Eip1193Provider.md)
- [Interval](../interfaces/helpers.Interval.md)
- [MultiEventTransactionReceipt](../interfaces/helpers.MultiEventTransactionReceipt.md)
- [ReadConfig](../interfaces/helpers.ReadConfig.md)
- [Signal](../interfaces/helpers.Signal.md)
- [Signer](../interfaces/helpers.Signer.md)
- [SignerConfig](../interfaces/helpers.SignerConfig.md)
- [Wait](../interfaces/helpers.Wait.md)

## Type Aliases

### ChainName

Ƭ **ChainName**: keyof `TablelandNetworkConfig`

The set of supported chain names as used by the Tableland network.

#### Defined in

@tableland/sdk/src/helpers/chains.ts:12

___

### Config

Ƭ **Config**: `Partial`\<[`ReadConfig`](../interfaces/helpers.ReadConfig.md) & [`SignerConfig`](../interfaces/helpers.SignerConfig.md)\>

#### Defined in

@tableland/sdk/src/helpers/config.ts:22

___

### NameMapping

Ƭ **NameMapping**: `Record`\<`string`, `string`\>

A series of mappings from a table alias to its globally unique table name.

#### Defined in

@tableland/sdk/src/helpers/config.ts:27

___

### NormalizedStatement

Ƭ **NormalizedStatement**: `sqlparser.NormalizedStatement`

#### Defined in

@tableland/sqlparser/types.d.ts:34

___

### PollingController

Ƭ **PollingController**: [`Signal`](../interfaces/helpers.Signal.md) & [`Interval`](../interfaces/helpers.Interval.md) & `Timeout`

A polling controller with a custom timeout & interval.

#### Defined in

@tableland/sdk/src/helpers/await.ts:48

___

### RegistryReceipt

Ƭ **RegistryReceipt**: `Required`\<`Omit`\<[`TransactionReceipt`](../modules.md#transactionreceipt), ``"error"`` \| ``"errorEventIdx"``\>\>

RegistryReceipt is based on the TransactionReceipt type which defined by the API spec.
The API v1 has a known problem where it only returns the first tableId from a transaction.

#### Defined in

@tableland/sdk/src/helpers/ethers.ts:126

___

### StatementType

Ƭ **StatementType**: `sqlparser.StatementType`

#### Defined in

@tableland/sqlparser/types.d.ts:36

## Variables

### supportedChains

• `Const` **supportedChains**: `Record`\<keyof `TablelandNetworkConfig`, [`ChainInfo`](../interfaces/helpers.ChainInfo.md)\>

The set of chains and their information as supported by the Tableland network.

#### Defined in

@tableland/sdk/src/helpers/chains.ts:67

## Functions

### checkWait

▸ **checkWait**(`config`, `receipt`, `controller?`): `Promise`\<[`WaitableTransactionReceipt`](../modules.md#waitabletransactionreceipt)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Partial`\<[`ReadConfig`](../interfaces/helpers.ReadConfig.md) & [`SignerConfig`](../interfaces/helpers.SignerConfig.md)\> & `Partial`\<[`AutoWaitConfig`](../interfaces/helpers.AutoWaitConfig.md)\> |
| `receipt` | [`WaitableTransactionReceipt`](../modules.md#waitabletransactionreceipt) |
| `controller?` | [`PollingController`](helpers.md#pollingcontroller) |

#### Returns

`Promise`\<[`WaitableTransactionReceipt`](../modules.md#waitabletransactionreceipt)\>

#### Defined in

@tableland/sdk/src/helpers/config.ts:41

___

### createPollingController

▸ **createPollingController**(`timeout?`, `pollingInterval?`): [`PollingController`](helpers.md#pollingcontroller)

Create a polling controller with a custom timeout & interval.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `timeout` | `number` | `60_000` | The timeout period in milliseconds. |
| `pollingInterval` | `number` | `1500` | - |

#### Returns

[`PollingController`](helpers.md#pollingcontroller)

A [PollingController](helpers.md#pollingcontroller) with the custom timeout & interval.

#### Defined in

@tableland/sdk/src/helpers/await.ts:95

___

### createSignal

▸ **createSignal**(): [`Signal`](../interfaces/helpers.Signal.md)

Create a signal to abort a request.

#### Returns

[`Signal`](../interfaces/helpers.Signal.md)

A [Signal](../interfaces/helpers.Signal.md) to abort a request.

#### Defined in

@tableland/sdk/src/helpers/await.ts:79

___

### createSigner

▸ **createSigner**(`«destructured»`): [`Signer`](../interfaces/helpers.Signer.md)

Create a signer with a private key, a provider URL, and a chain. Optionally,
pass the chain name or ID to create a static network and reduce calls made by
the provider (by not checking the chain ID).

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `chainNameOrId?` | `number` \| keyof `TablelandNetworkConfig` |
| › `options?` | `JsonRpcApiProviderOptions` |
| › `privateKey` | `string` |
| › `providerUrl` | `string` |

#### Returns

[`Signer`](../interfaces/helpers.Signer.md)

#### Defined in

@tableland/sdk/src/helpers/ethers.ts:261

___

### extractBaseUrl

▸ **extractBaseUrl**(`conn?`, `chainNameOrId?`): `Promise`\<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `conn` | `Partial`\<[`ReadConfig`](../interfaces/helpers.ReadConfig.md) & [`SignerConfig`](../interfaces/helpers.SignerConfig.md)\> |
| `chainNameOrId?` | `number` \| keyof `TablelandNetworkConfig` |

#### Returns

`Promise`\<`string`\>

#### Defined in

@tableland/sdk/src/helpers/config.ts:53

___

### extractChainId

▸ **extractChainId**(`conn?`): `Promise`\<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `conn` | `Partial`\<[`ReadConfig`](../interfaces/helpers.ReadConfig.md) & [`SignerConfig`](../interfaces/helpers.SignerConfig.md)\> |

#### Returns

`Promise`\<`number`\>

#### Defined in

@tableland/sdk/src/helpers/config.ts:82

___

### extractSigner

▸ **extractSigner**(`conn?`, `external?`): `Promise`\<[`Signer`](../interfaces/helpers.Signer.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `conn` | `Partial`\<[`ReadConfig`](../interfaces/helpers.ReadConfig.md) & [`SignerConfig`](../interfaces/helpers.SignerConfig.md)\> |
| `external?` | [`Eip1193Provider`](../interfaces/helpers.Eip1193Provider.md) |

#### Returns

`Promise`\<[`Signer`](../interfaces/helpers.Signer.md)\>

#### Defined in

@tableland/sdk/src/helpers/config.ts:72

___

### getBaseUrl

▸ **getBaseUrl**(`chainNameOrId`): `string`

Get the default host uri for a given chain name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `chainNameOrId` | `number` \| keyof `TablelandNetworkConfig` | The requested chain name. |

#### Returns

`string`

A string representing the default host uri for a given chain.

#### Defined in

@tableland/sdk/src/helpers/chains.ts:135

___

### getChainId

▸ **getChainId**(`chainNameOrId`): `number`

Get the default chain ID for a given chain name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `chainNameOrId` | `number` \| keyof `TablelandNetworkConfig` | The requested chain name or ID. |

#### Returns

`number`

A number representing the default chain ID of the requested chain.

#### Defined in

@tableland/sdk/src/helpers/chains.ts:126

___

### getChainInfo

▸ **getChainInfo**(`chainNameOrId`): [`ChainInfo`](../interfaces/helpers.ChainInfo.md)

Get the default chain information for a given chain name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `chainNameOrId` | `number` \| keyof `TablelandNetworkConfig` | The requested chain name or ID. |

#### Returns

[`ChainInfo`](../interfaces/helpers.ChainInfo.md)

An object containing the default chainId, contractAddress, chainName, and baseUrl for the given chain.

#### Defined in

@tableland/sdk/src/helpers/chains.ts:82

___

### getContractAddress

▸ **getContractAddress**(`chainNameOrId`): `string`

Get the default contract address for a given chain name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `chainNameOrId` | `number` \| keyof `TablelandNetworkConfig` | The requested chain name or ID. |

#### Returns

`string`

A hex string representing the default address for the Tableland registry contract.

#### Defined in

@tableland/sdk/src/helpers/chains.ts:117

___

### getContractAndOverrides

▸ **getContractAndOverrides**(`signer`, `chainId`): `Promise`\<\{ `contract`: `TablelandTables` ; `overrides`: `Overrides`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signer` | [`Signer`](../interfaces/helpers.Signer.md) |
| `chainId` | `number` |

#### Returns

`Promise`\<\{ `contract`: `TablelandTables` ; `overrides`: `Overrides`  }\>

#### Defined in

@tableland/sdk/src/registry/contract.ts:41

___

### getContractReceipt

▸ **getContractReceipt**(`tx`): `Promise`\<[`MultiEventTransactionReceipt`](../interfaces/helpers.MultiEventTransactionReceipt.md)\>

Given a transaction, this helper will return the tableIds that were part of the transaction.
Especially useful for transactions that create new tables because you need the tableId to
calculate the full table name.

#### Parameters

| Name | Type |
| :------ | :------ |
| `tx` | [`ContractTransactionResponse`](../classes/helpers.ContractTransactionResponse.md) |

#### Returns

`Promise`\<[`MultiEventTransactionReceipt`](../interfaces/helpers.MultiEventTransactionReceipt.md)\>

tableland receipt

#### Defined in

@tableland/sdk/src/helpers/ethers.ts:154

___

### getDefaultProvider

▸ **getDefaultProvider**(`network?`, `options?`): `AbstractProvider`

Returns a default provider for %%network%%.

 If %%network%% is a [[WebSocketLike]] or string that begins with
 ``"ws:"`` or ``"wss:"``, a [[WebSocketProvider]] is returned backed
 by that WebSocket or URL.

 If %%network%% is a string that begins with ``"HTTP:"`` or ``"HTTPS:"``,
 a [[JsonRpcProvider]] is returned connected to that URL.

 Otherwise, a default provider is created backed by well-known public
 Web3 backends (such as [[link-infura]]) using community-provided API
 keys.

 The %%options%% allows specifying custom API keys per backend (setting
 an API key to ``"-"`` will omit that provider) and ``options.exclusive``
 can be set to either a backend name or and array of backend names, which
 will whitelist **only** those backends.

 Current backend strings supported are:
 - ``"alchemy"``
 - ``"ankr"``
 - ``"cloudflare"``
 - ``"chainstack"``
 - ``"etherscan"``
 - ``"infura"``
 - ``"publicPolygon"``
 - ``"quicknode"``

 @example:
   // Connect to a local Geth node
   provider = getDefaultProvider("http://localhost:8545/");

   // Connect to Ethereum mainnet with any current and future
   // third-party services available
   provider = getDefaultProvider("mainnet");

   // Connect to Polygon, but only allow Etherscan and
   // INFURA and use "MY_API_KEY" in calls to Etherscan.
   provider = getDefaultProvider("matic", {
     etherscan: "MY_API_KEY",
     exclusive: [ "etherscan", "infura" ]
   });

#### Parameters

| Name | Type |
| :------ | :------ |
| `network?` | `Networkish` \| `WebSocketLike` |
| `options?` | `any` |

#### Returns

`AbstractProvider`

#### Defined in

ethers/lib.commonjs/providers/default-provider.d.ts:48

___

### getFeeData

▸ **getFeeData**(`signer`): `Promise`\<`FeeData`\>

Fetches the current gas fee data for a connected network.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `signer` | [`Signer`](../interfaces/helpers.Signer.md) | A signer instance. |

#### Returns

`Promise`\<`FeeData`\>

Current gas fee information for the network.

#### Defined in

@tableland/sdk/src/helpers/ethers.ts:57

___

### getSigner

▸ **getSigner**(`external?`): `Promise`\<[`Signer`](../interfaces/helpers.Signer.md)\>

Request a signer object from the global ethereum object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `external?` | [`Eip1193Provider`](../interfaces/helpers.Eip1193Provider.md) | A valid external provider. Defaults to `globalThis.ethereum` if not provided. |

#### Returns

`Promise`\<[`Signer`](../interfaces/helpers.Signer.md)\>

A promise that resolves to a valid web3 provider/signer

**`Throws`**

If no global ethereum object is available.

#### Defined in

@tableland/sdk/src/helpers/ethers.ts:207

___

### isTestnet

▸ **isTestnet**(`chainNameOrId`): `boolean`

Get whether or not a chain is a testnet.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `chainNameOrId` | `number` \| keyof `TablelandNetworkConfig` | The requested chain name or ID. |

#### Returns

`boolean`

An boolean to indicate the testnet classification of the given chain.

#### Defined in

@tableland/sdk/src/helpers/chains.ts:101

___

### normalize

▸ **normalize**(`sql`, `nameMap?`): `Promise`\<[`NormalizedStatement`](helpers.md#normalizedstatement)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sql` | `string` |
| `nameMap?` | [`NameMapping`](helpers.md#namemapping) |

#### Returns

`Promise`\<[`NormalizedStatement`](helpers.md#normalizedstatement)\>

#### Defined in

@tableland/sdk/src/helpers/parser.ts:13

___

### overrideDefaults

▸ **overrideDefaults**(`chainNameOrId`, `values`): `void`

Override the internal list of registry addresses and validator urls that will be used for Contract calls and read queries

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `chainNameOrId` | `number` \| keyof `TablelandNetworkConfig` | Either the chain name or chainId. For a list of chain names see the evm-tableland networks file |
| `values` | `Record`\<keyof [`ChainInfo`](../interfaces/helpers.ChainInfo.md), `string` \| `number`\> | The values you would like to use to override the defaults. Example: {contractAddress: "0x000deadbeef", baseUrl: "https://my.validator.mydomain.tld"} |

#### Returns

`void`

void

#### Defined in

@tableland/sdk/src/helpers/chains.ts:160

___

### prepReadConfig

▸ **prepReadConfig**(`config`): `FetchConfig`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Partial`\<[`ReadConfig`](../interfaces/helpers.ReadConfig.md)\> |

#### Returns

`FetchConfig`

#### Defined in

@tableland/sdk/src/helpers/config.ts:97

___

### readNameMapping

▸ **readNameMapping**(`aliases`): `Promise`\<[`NameMapping`](helpers.md#namemapping)\>

Read the [NameMapping](helpers.md#namemapping) from an [AliasesNameMap](../interfaces/helpers.AliasesNameMap.md), which can
support either synchronous or asynchronous `read()` execution. It will wrap a
synchronous name mapping result, or wrap an unwrapped name mapping if
asynchronous.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `aliases` | [`AliasesNameMap`](../interfaces/helpers.AliasesNameMap.md) | An `AliasesNameMap` object. |

#### Returns

`Promise`\<[`NameMapping`](helpers.md#namemapping)\>

A promise containing a `NameMapping` object.

#### Defined in

@tableland/sdk/src/helpers/config.ts:118

___

### validateTableName

▸ **validateTableName**(`tableName`, `isCreate?`): `Promise`\<`ValidatedTable`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `tableName` | `string` | `undefined` |
| `isCreate` | `boolean` | `false` |

#### Returns

`Promise`\<`ValidatedTable`\>

#### Defined in

@tableland/sdk/src/helpers/parser.ts:27

___

### writeNameMapping

▸ **writeNameMapping**(`aliases`, `nameMap`): `Promise`\<`void`\>

Write table aliases with an [AliasesNameMap](../interfaces/helpers.AliasesNameMap.md) and a provided
[NameMapping](helpers.md#namemapping), which can support either synchronous or asynchronous
`write()` execution. It will wrap a synchronous result, or wrap an unwrapped
result if asynchronous.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `aliases` | [`AliasesNameMap`](../interfaces/helpers.AliasesNameMap.md) | An `AliasesNameMap` object to write to. |
| `nameMap` | [`NameMapping`](helpers.md#namemapping) | A `NameMapping` object to write to the `AliasesNameMap`. |

#### Returns

`Promise`\<`void`\>

A promise containing `void` upon write completion.

#### Defined in

@tableland/sdk/src/helpers/config.ts:134
