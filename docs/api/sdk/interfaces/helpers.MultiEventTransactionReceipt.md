---
id: "helpers.MultiEventTransactionReceipt"
title: "Interface: MultiEventTransactionReceipt"
sidebar_label: "MultiEventTransactionReceipt"
custom_edit_url: null
---

[helpers](../namespaces/helpers.md).MultiEventTransactionReceipt

MultiEventTransactionReceipt represents a mapping of a response from a Validator
transaction receipt to the tableIds that were affected.

## Properties

### blockNumber

• **blockNumber**: `number`

The block number of the transaction

#### Defined in

@tableland/sdk/src/helpers/ethers.ts:142

___

### chainId

• **chainId**: `number`

The chain id of the transaction

#### Defined in

@tableland/sdk/src/helpers/ethers.ts:143

___

### tableIds

• **tableIds**: `string`[]

The list of table ids affected in the transaction

#### Defined in

@tableland/sdk/src/helpers/ethers.ts:140

___

### transactionHash

• **transactionHash**: `string`

The hash of the transaction

#### Defined in

@tableland/sdk/src/helpers/ethers.ts:141
