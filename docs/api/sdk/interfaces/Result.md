# Interface: Result\<T\>

Result represents the core return result for an executed statement.

## Type parameters

• **T** = `unknown`

## Properties

### error

> **error**: `undefined`

If there was an error, this will contain the error string.

#### Source

@tableland/sdk/src/registry/utils.ts:169

***

### meta

> **meta**: [`Metadata`](Metadata.md)

Additional meta information.

#### Source

@tableland/sdk/src/registry/utils.ts:173

***

### results

> **results**: `T`[]

Possibly empty list of query results.

#### Source

@tableland/sdk/src/registry/utils.ts:159

***

### success

> **success**: `true`

Whether the query or transaction was successful.

#### Source

@tableland/sdk/src/registry/utils.ts:163
