# Class: ApiError

## Extends

- `Error`

## Constructors

### new ApiError()

> **new ApiError**(`response`): [`ApiError`](ApiError.md)

#### Parameters

• **response**: `Omit`\<`ApiResponse`\<`any`\>, `"ok"`\>

#### Returns

[`ApiError`](ApiError.md)

#### Overrides

`Error.constructor`

#### Source

@tableland/sdk/src/validator/client/types.ts:164

## Properties

### cause?

> `optional` **cause**: `unknown`

#### Inherited from

`Error.cause`

#### Source

typescript/lib/lib.es2022.error.d.ts:24

***

### data

> `readonly` **data**: `any`

#### Source

@tableland/sdk/src/validator/client/types.ts:162

***

### headers

> `readonly` **headers**: `Headers`

#### Source

@tableland/sdk/src/validator/client/types.ts:158

***

### message

> **message**: `string`

#### Inherited from

`Error.message`

#### Source

typescript/lib/lib.es5.d.ts:1068

***

### name

> **name**: `string`

#### Inherited from

`Error.name`

#### Source

typescript/lib/lib.es5.d.ts:1067

***

### stack?

> `optional` **stack**: `string`

#### Inherited from

`Error.stack`

#### Source

typescript/lib/lib.es5.d.ts:1069

***

### status

> `readonly` **status**: `number`

#### Source

@tableland/sdk/src/validator/client/types.ts:160

***

### statusText

> `readonly` **statusText**: `string`

#### Source

@tableland/sdk/src/validator/client/types.ts:161

***

### url

> `readonly` **url**: `string`

#### Source

@tableland/sdk/src/validator/client/types.ts:159

***

### prepareStackTrace()?

> `static` `optional` **prepareStackTrace**: (`err`, `stackTraces`) => `any`

Optional override for formatting stack traces

#### See

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Parameters

• **err**: `Error`

• **stackTraces**: `CallSite`[]

#### Returns

`any`

#### Inherited from

`Error.prepareStackTrace`

#### Source

@types/node/globals.d.ts:28

***

### stackTraceLimit

> `static` **stackTraceLimit**: `number`

#### Inherited from

`Error.stackTraceLimit`

#### Source

@types/node/globals.d.ts:30

## Methods

### captureStackTrace()

> `static` **captureStackTrace**(`targetObject`, `constructorOpt`?): `void`

Create .stack property on a target object

#### Parameters

• **targetObject**: `object`

• **constructorOpt?**: `Function`

#### Returns

`void`

#### Inherited from

`Error.captureStackTrace`

#### Source

@types/node/globals.d.ts:21
