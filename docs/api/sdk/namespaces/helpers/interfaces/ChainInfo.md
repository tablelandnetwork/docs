# Interface: ChainInfo

Chain information used to determine defaults for the set of supported chains.

## Indexable

 \[`key`: `string`\]: [`ChainInfo`](ChainInfo.md)\[keyof [`ChainInfo`](ChainInfo.md)\]

## Properties

### baseUrl

> **baseUrl**: `string`

The validator base URL for the chain.

#### Source

@tableland/sdk/src/helpers/chains.ts:28

***

### chainId

> **chainId**: `number`

The chain ID.

#### Source

@tableland/sdk/src/helpers/chains.ts:26

***

### chainName

> **chainName**: keyof `TablelandNetworkConfig`

The name of the chain as defined in [ChainName](../type-aliases/ChainName.md).

#### Source

@tableland/sdk/src/helpers/chains.ts:25

***

### contractAddress

> **contractAddress**: `string`

The registry contract address for the chain.

#### Source

@tableland/sdk/src/helpers/chains.ts:27

***

### pollingInterval

> **pollingInterval**: `number`

The validator polling interval for the chain.

#### Source

@tableland/sdk/src/helpers/chains.ts:30

***

### pollingTimeout

> **pollingTimeout**: `number`

The validator polling timeout for the chain.

#### Source

@tableland/sdk/src/helpers/chains.ts:29
