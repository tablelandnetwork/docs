# Type alias: RegistryReceipt

> **RegistryReceipt**: `Required`\<`Omit` \<[`TransactionReceipt`](../../../type-aliases/TransactionReceipt.md), `"error"` \| `"errorEventIdx"`\>\>

RegistryReceipt is based on the TransactionReceipt type which defined by the API spec.
The API v1 has a known problem where it only returns the first tableId from a transaction.

## Source

@tableland/sdk/src/helpers/ethers.ts:126
