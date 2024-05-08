# Function: getContractReceipt()

> **getContractReceipt**(`tx`): `Promise` \<[`MultiEventTransactionReceipt`](../interfaces/MultiEventTransactionReceipt.md)\>

Given a transaction, this helper will return the tableIds that were part of the transaction.
Especially useful for transactions that create new tables because you need the tableId to
calculate the full table name.

## Parameters

• **tx**: [`ContractTransactionResponse`](../classes/ContractTransactionResponse.md)

## Returns

`Promise` \<[`MultiEventTransactionReceipt`](../interfaces/MultiEventTransactionReceipt.md)\>

tableland receipt

## Source

@tableland/sdk/src/helpers/ethers.ts:154
