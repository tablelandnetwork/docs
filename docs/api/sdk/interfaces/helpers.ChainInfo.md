---
id: "helpers.ChainInfo"
title: "Interface: ChainInfo"
sidebar_label: "ChainInfo"
custom_edit_url: null
---

[helpers](../namespaces/helpers.md).ChainInfo

Chain information used to determine defaults for the set of supported chains.

## Indexable

▪ [key: `string`]: [`ChainInfo`](helpers.ChainInfo.md)[keyof [`ChainInfo`](helpers.ChainInfo.md)]

## Properties

### baseUrl

• **baseUrl**: `string`

The validator base URL for the chain.

#### Defined in

@tableland/sdk/src/helpers/chains.ts:28

___

### chainId

• **chainId**: `number`

The chain ID.

#### Defined in

@tableland/sdk/src/helpers/chains.ts:26

___

### chainName

• **chainName**: keyof `TablelandNetworkConfig`

The name of the chain as defined in [ChainName](../namespaces/helpers.md#chainname).

#### Defined in

@tableland/sdk/src/helpers/chains.ts:25

___

### contractAddress

• **contractAddress**: `string`

The registry contract address for the chain.

#### Defined in

@tableland/sdk/src/helpers/chains.ts:27

___

### pollingInterval

• **pollingInterval**: `number`

The validator polling interval for the chain.

#### Defined in

@tableland/sdk/src/helpers/chains.ts:30

___

### pollingTimeout

• **pollingTimeout**: `number`

The validator polling timeout for the chain.

#### Defined in

@tableland/sdk/src/helpers/chains.ts:29
