# Function: readNameMapping()

> **readNameMapping**(`aliases`): `Promise` \<[`NameMapping`](../type-aliases/NameMapping.md)\>

Read the [NameMapping](../type-aliases/NameMapping.md) from an [AliasesNameMap](../interfaces/AliasesNameMap.md), which can
support either synchronous or asynchronous `read()` execution. It will wrap a
synchronous name mapping result, or wrap an unwrapped name mapping if
asynchronous.

## Parameters

• **aliases**: [`AliasesNameMap`](../interfaces/AliasesNameMap.md)

An `AliasesNameMap` object.

## Returns

`Promise` \<[`NameMapping`](../type-aliases/NameMapping.md)\>

A promise containing a `NameMapping` object.

## Source

@tableland/sdk/src/helpers/config.ts:118
