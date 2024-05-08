# Function: overrideDefaults()

> **overrideDefaults**(`chainNameOrId`, `values`): `void`

Override the internal list of registry addresses and validator urls that will be used for Contract calls and read queries

## Parameters

• **chainNameOrId**: `number` \| keyof TablelandNetworkConfig

Either the chain name or chainId.  For a list of chain names see the evm-tableland networks file

• **values**: `Record`\<keyof [`ChainInfo`](../interfaces/ChainInfo.md), `string` \| `number`\>

The values you would like to use to override the defaults.
 Example: `{contractAddress: "0x000deadbeef", baseUrl: "https://my.validator.mydomain.tld"}`

## Returns

`void`

void

## Source

@tableland/sdk/src/helpers/chains.ts:160
