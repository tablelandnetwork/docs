---
id: "Metadata"
title: "Interface: Metadata"
sidebar_label: "Metadata"
sidebar_position: 0
custom_edit_url: null
---

Metadata represents meta information about an executed statement/transaction.

## Indexable

▪ [key: `string`]: `any`

Metadata may constrain additional arbitrary key/values pairs.

## Properties

### duration

• **duration**: `number`

Total client-side duration of the async call.

#### Defined in

@tableland/sdk/src/registry/utils.ts:141

___

### txn

• `Optional` **txn**: [`WaitableTransactionReceipt`](../modules.md#waitabletransactionreceipt)

The optional transaction information receipt.

#### Defined in

@tableland/sdk/src/registry/utils.ts:145
