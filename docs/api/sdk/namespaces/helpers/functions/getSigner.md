# Function: getSigner()

> **getSigner**(`external`?): `Promise` \<[`Signer`](../interfaces/Signer.md)\>

Request a signer object from the global ethereum object.

## Parameters

• **external?**: [`Eip1193Provider`](../interfaces/Eip1193Provider.md)

A valid external provider. Defaults to `globalThis.ethereum` if not provided.

## Returns

`Promise` \<[`Signer`](../interfaces/Signer.md)\>

A promise that resolves to a valid web3 provider/signer

## Throws

If no global ethereum object is available.

## Source

@tableland/sdk/src/helpers/ethers.ts:207
