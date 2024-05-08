# Class: TableEventBus

TableEventBus provides a way to listen for:
 mutations, transfers, and changes to controller

## Constructors

### new TableEventBus()

> **new TableEventBus**(`config`): [`TableEventBus`](TableEventBus.md)

Create a TableEventBus instance with the specified connection configuration.

#### Parameters

• **config**: `Partial`\<`Partial` \<[`ReadConfig`](../interfaces/ReadConfig.md) & [`SignerConfig`](../interfaces/SignerConfig.md)\>\>= `{}`

The connection configuration. This must include an ethersjs
Signer. If passing the config from a pre-existing Database instance, it
must have a non-null signer key defined.

#### Returns

[`TableEventBus`](TableEventBus.md)

#### Source

@tableland/sdk/src/helpers/subscribe.ts:131

## Properties

### config

> `readonly` **config**: `Partial` \<[`ReadConfig`](../interfaces/ReadConfig.md) & [`SignerConfig`](../interfaces/SignerConfig.md)\>

#### Source

@tableland/sdk/src/helpers/subscribe.ts:121

***

### contracts

> `readonly` **contracts**: `ContractMap`

#### Source

@tableland/sdk/src/helpers/subscribe.ts:122

***

### listeners

> `readonly` **listeners**: `ListenerMap`

#### Source

@tableland/sdk/src/helpers/subscribe.ts:123

## Methods

### \_attachEmitter()

> **\_attachEmitter**(`contract`, `emitter`, `tableIdentifier`): `ContractEventListener`[]

#### Parameters

• **contract**: `TablelandTables`

• **emitter**: `EventEmitter`

• **tableIdentifier**: [`TableIdentifier`](../../../interfaces/TableIdentifier.md)

#### Returns

`ContractEventListener`[]

#### Source

@tableland/sdk/src/helpers/subscribe.ts:278

***

### \_ensureListening()

> **\_ensureListening**(`listenerId`, `emitter`): `Promise`\<`ContractEventListener`[]\>

#### Parameters

• **listenerId**: `string`

• **emitter**: `EventEmitter`

#### Returns

`Promise`\<`ContractEventListener`[]\>

#### Source

@tableland/sdk/src/helpers/subscribe.ts:268

***

### \_getContract()

> **\_getContract**(`chainId`): `Promise`\<`TablelandTables`\>

#### Parameters

• **chainId**: `number`

#### Returns

`Promise`\<`TablelandTables`\>

#### Source

@tableland/sdk/src/helpers/subscribe.ts:252

***

### addListener()

> **addListener**(`tableName`): `Promise`\<`EventEmitter`\>

Start listening to the Registry Contract for events that are associated
with a given table.
There's only ever one "listener" for a table, but the emitter that
Contract listener has can have as many event listeners as the environment
supports.

#### Parameters

• **tableName**: `string`

The full name of table that you want to listen for
changes to.

#### Returns

`Promise`\<`EventEmitter`\>

#### Source

@tableland/sdk/src/helpers/subscribe.ts:151

***

### addTableIterator()

> **addTableIterator**\<`T`\>(`tableName`): `Promise`\<`AsyncIterable`\<`T`\>\>

A simple wrapper around `addListener` that returns an async iterable
which can be used with the for await ... of pattern.

#### Type parameters

• **T**

#### Parameters

• **tableName**: `string`

The full name of table that you want to listen for
changes to.

#### Returns

`Promise`\<`AsyncIterable`\<`T`\>\>

#### Source

@tableland/sdk/src/helpers/subscribe.ts:186

***

### removeAllListeners()

> **removeAllListeners**(): `void`

#### Returns

`void`

#### Source

@tableland/sdk/src/helpers/subscribe.ts:217

***

### removeListener()

> **removeListener**(`params`): `void`

Remove a listener (or iterator) based on chain and tableId

#### Parameters

• **params**: [`TableIdentifier`](../../../interfaces/TableIdentifier.md)

A TableIdentifier Object. Must have `chainId` and `tableId` keys.

#### Returns

`void`

#### Source

@tableland/sdk/src/helpers/subscribe.ts:199
