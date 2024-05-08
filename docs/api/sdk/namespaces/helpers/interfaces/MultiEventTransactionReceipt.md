# Interface: MultiEventTransactionReceipt

MultiEventTransactionReceipt represents a mapping of a response from a Validator
transaction receipt to the tableIds that were affected.

## Properties

### blockNumber

> **blockNumber**: `number`

The block number of the transaction

#### Source

@tableland/sdk/src/helpers/ethers.ts:142

***

### chainId

> **chainId**: `number`

The chain id of the transaction

#### Source

@tableland/sdk/src/helpers/ethers.ts:143

***

### tableIds

> **tableIds**: `string`[]

The list of table ids affected in the transaction

#### Source

@tableland/sdk/src/helpers/ethers.ts:140

***

### transactionHash

> **transactionHash**: `string`

The hash of the transaction

#### Source

@tableland/sdk/src/helpers/ethers.ts:141
