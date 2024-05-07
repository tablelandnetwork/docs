---
id: "helpers.Eip1193Provider"
title: "Interface: Eip1193Provider"
sidebar_label: "Eip1193Provider"
custom_edit_url: null
---

[helpers](../namespaces/helpers.md).Eip1193Provider

The interface to an [[link-eip-1193]] provider, which is a standard
 used by most injected providers, which the [[BrowserProvider]] accepts
 and exposes the API of.

## Methods

### request

▸ **request**(`request`): `Promise`\<`any`\>

See [[link-eip-1193]] for details on this method.

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | `Object` |
| `request.method` | `string` |
| `request.params?` | `any`[] \| `Record`\<`string`, `any`\> |

#### Returns

`Promise`\<`any`\>

#### Defined in

ethers/lib.commonjs/providers/provider-browser.d.ts:13
