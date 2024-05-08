# Function: writeNameMapping()

> **writeNameMapping**(`aliases`, `nameMap`): `Promise`\<`void`\>

Write table aliases with an [AliasesNameMap](../interfaces/AliasesNameMap.md) and a provided
[NameMapping](../type-aliases/NameMapping.md), which can support either synchronous or asynchronous
`write()` execution. It will wrap a synchronous result, or wrap an unwrapped
result if asynchronous.

## Parameters

• **aliases**: [`AliasesNameMap`](../interfaces/AliasesNameMap.md)

An `AliasesNameMap` object to write to.

• **nameMap**: [`NameMapping`](../type-aliases/NameMapping.md)

A `NameMapping` object to write to the `AliasesNameMap`.

## Returns

`Promise`\<`void`\>

A promise containing `void` upon write completion.

## Source

@tableland/sdk/src/helpers/config.ts:134
