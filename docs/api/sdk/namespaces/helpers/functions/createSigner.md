# Function: createSigner()

> **createSigner**(`__namedParameters`): [`Signer`](../interfaces/Signer.md)

Create a signer with a private key, a provider URL, and a chain. Optionally,
pass the chain name or ID to create a static network and reduce calls made by
the provider (by not checking the chain ID).

## Parameters

• **\_\_namedParameters**

• **\_\_namedParameters.chainNameOrId?**: `number` \| keyof TablelandNetworkConfig

• **\_\_namedParameters.options?**: `JsonRpcApiProviderOptions`= `{}`

• **\_\_namedParameters.privateKey**: `string`

• **\_\_namedParameters.providerUrl**: `string`

## Returns

[`Signer`](../interfaces/Signer.md)

## Source

@tableland/sdk/src/helpers/ethers.ts:261
