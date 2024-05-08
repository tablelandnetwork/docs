# Interface: ExecResult\<T\>

ExecResult represents the return result for executed Database statements via `exec()`.

## Extends

- `Pick` \<[`Metadata`](Metadata.md), `"duration"` \| `"txn"`\>

## Type parameters

• **T** = `unknown`

## Properties

### count

> **count**: `number`

The count of executed statements.

#### Source

@tableland/sdk/src/registry/utils.ts:184

***

### duration

> **duration**: `number`

Total client-side duration of the async call.

#### Inherited from

`Pick.duration`

#### Source

@tableland/sdk/src/registry/utils.ts:141

***

### results?

> `optional` **results**: `T`[]

The optional list of query results.

#### Source

@tableland/sdk/src/registry/utils.ts:188

***

### txn?

> `optional` **txn**: [`WaitableTransactionReceipt`](../type-aliases/WaitableTransactionReceipt.md)

The optional transaction information receipt.

#### Inherited from

`Pick.txn`

#### Source

@tableland/sdk/src/registry/utils.ts:145
