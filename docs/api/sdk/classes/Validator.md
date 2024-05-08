# Class: Validator

Validator provides direct access to remote Validator REST APIs.

## Constructors

### new Validator()

> **new Validator**(`config`): [`Validator`](Validator.md)

Create a Validator instance with the specified connection configuration.

#### Parameters

• **config**: `Partial` \<[`ReadConfig`](../namespaces/helpers/interfaces/ReadConfig.md)\>= `{}`

The connection configuration. This must include a baseUrl
string. If passing the config from a pre-existing Database instance, it
must have a non-null baseUrl key defined.

#### Returns

[`Validator`](Validator.md)

#### Source

@tableland/sdk/src/validator/index.ts:53

## Properties

### config

> `readonly` **config**: [`ReadConfig`](../namespaces/helpers/interfaces/ReadConfig.md)

#### Source

@tableland/sdk/src/validator/index.ts:46

## Methods

### getTableById()

> **getTableById**(`params`, `signal`?): `Promise` \<[`Table`](../interfaces/Table.md)\>

Get table information

#### Parameters

• **params**

• **params.chainId**: `number`

**Description**
The parent chain to target

**Example**
```ts
80001
```

• **params.tableId?**: `string`

**Description**
Table identifier

**Example**
```ts
1
```

• **signal?**: [`Signal`](../namespaces/helpers/interfaces/Signal.md)

#### Returns

`Promise` \<[`Table`](../interfaces/Table.md)\>

#### Description

Returns information about a single table, including schema information

#### Source

@tableland/sdk/src/validator/index.ts:91

***

### health()

> **health**(`signal`?): `Promise`\<`boolean`\>

Get health status

#### Parameters

• **signal?**: [`Signal`](../namespaces/helpers/interfaces/Signal.md)

#### Returns

`Promise`\<`boolean`\>

#### Description

Returns OK if the validator considers itself healthy

#### Source

@tableland/sdk/src/validator/index.ts:75

***

### pollForReceiptByTransactionHash()

> **pollForReceiptByTransactionHash**(`params`, `controller`?): `Promise`\<`Camelize`\<`AssertedResponse`\>\>

Wait for transaction status

#### Parameters

• **params**

• **params.chainId**: `number`

**Description**
The parent chain to target

**Example**
```ts
80001
```

• **params.transactionHash?**: `string`

**Description**
The transaction hash to request

**Example**
```ts
0x02f319429b8a7be1cbb492f0bfbf740d2472232a2edadde7df7c16c0b61aa78b
```

• **controller?**: [`PollingController`](../namespaces/helpers/type-aliases/PollingController.md)

#### Returns

`Promise`\<`Camelize`\<`AssertedResponse`\>\>

#### Description

Polls for the status of a given transaction receipt by hash until

#### Source

@tableland/sdk/src/validator/index.ts:135

***

### queryByStatement()

#### queryByStatement(params, signal)

> **queryByStatement**\<`T`\>(`params`, `signal`?): `Promise` \<[`ObjectsFormat`](../type-aliases/ObjectsFormat.md)\<`T`\>\>

Query the network

##### Type parameters

• **T** = `unknown`

##### Parameters

• **params**: [`QueryParams`](../type-aliases/QueryParams.md)\<`undefined` \| `"objects"`\>

• **signal?**: [`Signal`](../namespaces/helpers/interfaces/Signal.md)

##### Returns

`Promise` \<[`ObjectsFormat`](../type-aliases/ObjectsFormat.md)\<`T`\>\>

##### Description

Returns the results of a SQL read query against the Tabeland network

##### Source

@tableland/sdk/src/validator/index.ts:105

#### queryByStatement(params, signal)

> **queryByStatement**\<`T`\>(`params`, `signal`?): `Promise` \<[`TableFormat`](../interfaces/TableFormat.md)\<`T`\>\>

##### Type parameters

• **T** = `unknown`

##### Parameters

• **params**: [`QueryParams`](../type-aliases/QueryParams.md)\<`"table"`\>

• **signal?**: [`Signal`](../namespaces/helpers/interfaces/Signal.md)

##### Returns

`Promise` \<[`TableFormat`](../interfaces/TableFormat.md)\<`T`\>\>

##### Source

@tableland/sdk/src/validator/index.ts:109

***

### receiptByTransactionHash()

> **receiptByTransactionHash**(`params`, `signal`?): `Promise`\<`Camelize`\<`AssertedResponse`\>\>

Get transaction status

#### Parameters

• **params**

• **params.chainId**: `number`

**Description**
The parent chain to target

**Example**
```ts
80001
```

• **params.transactionHash?**: `string`

**Description**
The transaction hash to request

**Example**
```ts
0x02f319429b8a7be1cbb492f0bfbf740d2472232a2edadde7df7c16c0b61aa78b
```

• **signal?**: [`Signal`](../namespaces/helpers/interfaces/Signal.md)

#### Returns

`Promise`\<`Camelize`\<`AssertedResponse`\>\>

#### Description

Returns the status of a given transaction receipt by hash

#### Source

@tableland/sdk/src/validator/index.ts:124

***

### version()

> **version**(`signal`?): `Promise`\<`Camelize`\<`Required`\<`object`\>\>\>

Get version information

#### Parameters

• **signal?**: [`Signal`](../namespaces/helpers/interfaces/Signal.md)

#### Returns

`Promise`\<`Camelize`\<`Required`\<`object`\>\>\>

#### Description

Returns version information about the validator daemon

#### Source

@tableland/sdk/src/validator/index.ts:83

***

### forChain()

> `static` **forChain**(`chainNameOrId`): [`Validator`](Validator.md)

Create a new Validator instance that uses the default baseUrl for a given chain.

#### Parameters

• **chainNameOrId**: `number` \| keyof TablelandNetworkConfig

The name or id of the chain to target.

#### Returns

[`Validator`](Validator.md)

A Validator with a default baseUrl.

#### Source

@tableland/sdk/src/validator/index.ts:66
