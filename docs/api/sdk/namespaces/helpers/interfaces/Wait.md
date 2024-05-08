# Interface: Wait\<T\>

A waitable interface to check for results.

## Type parameters

• **T** = `unknown`

## Properties

### wait()

> **wait**: (`controller`?) => `Promise`\<`T`\>

A function to check for results.

#### Parameters

• **controller?**: [`PollingController`](../type-aliases/PollingController.md)

A [PollingController](../type-aliases/PollingController.md) with the custom timeout & interval.

#### Returns

`Promise`\<`T`\>

#### Source

@tableland/sdk/src/helpers/await.ts:59
