---
id: "ApiError"
title: "Class: ApiError"
sidebar_label: "ApiError"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `Error`

  ↳ **`ApiError`**

## Constructors

### constructor

• **new ApiError**(`response`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `response` | `Omit`<`ApiResponse`<`any`\>, ``"ok"``\> |

#### Overrides

Error.constructor

#### Defined in

@tableland/sdk/src/validator/client/types.ts:164

## Properties

### cause

• `Optional` **cause**: `unknown`

#### Inherited from

Error.cause

#### Defined in

typescript/lib/lib.es2022.error.d.ts:26

___

### data

• `Readonly` **data**: `any`

#### Defined in

@tableland/sdk/src/validator/client/types.ts:162

___

### headers

• `Readonly` **headers**: `Headers`

#### Defined in

@tableland/sdk/src/validator/client/types.ts:158

___

### message

• **message**: `string`

#### Inherited from

Error.message

#### Defined in

typescript/lib/lib.es5.d.ts:1054

___

### name

• **name**: `string`

#### Inherited from

Error.name

#### Defined in

typescript/lib/lib.es5.d.ts:1053

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

typescript/lib/lib.es5.d.ts:1055

___

### status

• `Readonly` **status**: `number`

#### Defined in

@tableland/sdk/src/validator/client/types.ts:160

___

### statusText

• `Readonly` **statusText**: `string`

#### Defined in

@tableland/sdk/src/validator/client/types.ts:161

___

### url

• `Readonly` **url**: `string`

#### Defined in

@tableland/sdk/src/validator/client/types.ts:159

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

**`See`**

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

#### Inherited from

Error.prepareStackTrace

#### Defined in

@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

#### Defined in

@types/node/globals.d.ts:13

## Methods

### captureStackTrace

▸ `Static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

Error.captureStackTrace

#### Defined in

@types/node/globals.d.ts:4
