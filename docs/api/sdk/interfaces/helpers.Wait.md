---
id: "helpers.Wait"
title: "Interface: Wait<T>"
sidebar_label: "Wait"
custom_edit_url: null
---

[helpers](../namespaces/helpers.md).Wait

A waitable interface to check for results.

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

## Properties

### wait

• **wait**: (`controller?`: [`PollingController`](../namespaces/helpers.md#pollingcontroller)) => `Promise`\<`T`\>

#### Type declaration

▸ (`controller?`): `Promise`\<`T`\>

A function to check for results.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `controller?` | [`PollingController`](../namespaces/helpers.md#pollingcontroller) | A [PollingController](../namespaces/helpers.md#pollingcontroller) with the custom timeout & interval. |

##### Returns

`Promise`\<`T`\>

#### Defined in

@tableland/sdk/src/helpers/await.ts:59
