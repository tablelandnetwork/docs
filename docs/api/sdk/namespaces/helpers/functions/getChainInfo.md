# Function: getChainInfo()

> **getChainInfo**(`chainNameOrId`): [`ChainInfo`](../interfaces/ChainInfo.md)

Get the default chain information for a given chain name.

## Parameters

• **chainNameOrId**: `number` \| keyof TablelandNetworkConfig

The requested chain name or ID.

## Returns

[`ChainInfo`](../interfaces/ChainInfo.md)

An object containing the default chainId, contractAddress, chainName, and baseUrl for the given chain.

## Source

@tableland/sdk/src/helpers/chains.ts:82
