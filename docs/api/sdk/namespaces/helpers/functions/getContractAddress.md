# Function: getContractAddress()

> **getContractAddress**(`chainNameOrId`): `string`

Get the default contract address for a given chain name.

## Parameters

• **chainNameOrId**: `number` \| keyof TablelandNetworkConfig

The requested chain name or ID.

## Returns

`string`

A hex string representing the default address for the Tableland registry contract.

## Source

@tableland/sdk/src/helpers/chains.ts:117
