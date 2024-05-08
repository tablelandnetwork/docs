# Interface: Metadata

Metadata represents meta information about an executed statement/transaction.

## Indexable

 \[`key`: `string`\]: `any`

## Properties

### duration

> **duration**: `number`

Total client-side duration of the async call.

#### Source

@tableland/sdk/src/registry/utils.ts:141

***

### txn?

> `optional` **txn**: [`WaitableTransactionReceipt`](../type-aliases/WaitableTransactionReceipt.md)

The optional transaction information receipt.

#### Source

@tableland/sdk/src/registry/utils.ts:145
