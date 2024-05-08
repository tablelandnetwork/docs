# Interface: AliasesNameMap

Used to read and write table aliases within a `Database` instance

## Properties

### read

> **read**: () => `Promise` \<[`NameMapping`](../type-aliases/NameMapping.md)\> \| () => [`NameMapping`](../type-aliases/NameMapping.md)

A function that returns a [NameMapping](../type-aliases/NameMapping.md) object, or a
`Promise` of a [NameMapping](../type-aliases/NameMapping.md) object.

#### Source

@tableland/sdk/src/helpers/config.ts:37

***

### write

> **write**: (`map`) => `Promise`\<`void`\> \| (`map`) => `void`

A function that accepts a [NameMapping](../type-aliases/NameMapping.md) object and
returns `void`, or a Promise of void.

#### Source

@tableland/sdk/src/helpers/config.ts:38
