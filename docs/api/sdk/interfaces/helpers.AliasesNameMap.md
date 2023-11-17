---
id: "helpers.AliasesNameMap"
title: "Interface: AliasesNameMap"
sidebar_label: "AliasesNameMap"
custom_edit_url: null
---

[helpers](../namespaces/helpers.md).AliasesNameMap

Used to read and write table aliases within a `Database` instance

## Properties

### read

• **read**: () => `Promise`<[`NameMapping`](../namespaces/helpers.md#namemapping)\> \| () => [`NameMapping`](../namespaces/helpers.md#namemapping)

A function that returns a [NameMapping](../namespaces/helpers.md#namemapping) object, or a
`Promise` of a [NameMapping](../namespaces/helpers.md#namemapping) object.

#### Defined in

@tableland/sdk/src/helpers/config.ts:37

___

### write

• **write**: (`map`: [`NameMapping`](../namespaces/helpers.md#namemapping)) => `Promise`<`void`\> \| (`map`: [`NameMapping`](../namespaces/helpers.md#namemapping)) => `void`

A function that accepts a [NameMapping](../namespaces/helpers.md#namemapping) object and
returns `void`, or a Promise of void.

#### Defined in

@tableland/sdk/src/helpers/config.ts:38
