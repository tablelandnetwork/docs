---
id: "Statement"
title: "Class: Statement<S>"
sidebar_label: "Statement"
sidebar_position: 0
custom_edit_url: null
---

Statement defines a single SQL statement.
Both static and prepared statements are supported. In the current
implementation, the prepared statements are prepared locally, and
executed remotely (on-chain).
Mutating transactions such as INSERTs, DELETEs, and UPDATEs produce
a two-phase transaction. Firstly, the transaction is sent to the
registry contract, and awaited. The returned `txn` information also
contains a `wait` method than can be used to await finalization on
the Tableland network. This method will also throw an exception if
any runtime errors occur.

## Type parameters

| Name | Type |
| :------ | :------ |
| `S` | `unknown` |

## Constructors

### constructor

• **new Statement**\<`S`\>(`config`, `sql`, `parameters?`): [`Statement`](Statement.md)\<`S`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Partial`\<[`ReadConfig`](../interfaces/helpers.ReadConfig.md) & [`SignerConfig`](../interfaces/helpers.SignerConfig.md)\> & `Partial`\<[`AutoWaitConfig`](../interfaces/helpers.AutoWaitConfig.md)\> |
| `sql` | `string` |
| `parameters?` | [`Parameters`](../interfaces/Parameters.md) |

#### Returns

[`Statement`](Statement.md)\<`S`\>

#### Defined in

@tableland/sdk/src/statement.ts:62

## Properties

### config

• `Private` `Readonly` **config**: `Partial`\<[`ReadConfig`](../interfaces/helpers.ReadConfig.md) & [`SignerConfig`](../interfaces/helpers.SignerConfig.md)\> & `Partial`\<[`AutoWaitConfig`](../interfaces/helpers.AutoWaitConfig.md)\>

#### Defined in

@tableland/sdk/src/statement.ts:58

___

### parameters

• `Private` `Optional` `Readonly` **parameters**: [`Parameters`](../interfaces/Parameters.md)

#### Defined in

@tableland/sdk/src/statement.ts:60

___

### sql

• `Private` `Readonly` **sql**: `string`

#### Defined in

@tableland/sdk/src/statement.ts:59

## Methods

### #checkIsValidOpts

▸ **#checkIsValidOpts**(`opts`): opts is Options

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `any` |

#### Returns

opts is Options

#### Defined in

@tableland/sdk/src/statement.ts:185

___

### #parseAndExtract

▸ **#parseAndExtract**(): `Promise`\<`ExtractedStatement`\>

#### Returns

`Promise`\<`ExtractedStatement`\>

#### Defined in

@tableland/sdk/src/statement.ts:112

___

### #waitExec

▸ **#waitExec**(`params`, `controller?`): `Promise`\<[`WaitableTransactionReceipt`](../modules.md#waitabletransactionreceipt)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `ExtractedStatement` |
| `controller?` | [`PollingController`](../namespaces/helpers.md#pollingcontroller) |

#### Returns

`Promise`\<[`WaitableTransactionReceipt`](../modules.md#waitabletransactionreceipt)\>

#### Defined in

@tableland/sdk/src/statement.ts:143

___

### all

▸ **all**\<`T`\>(`opts?`): `Promise`\<[`Result`](../interfaces/Result.md)\<`T`\>\>

Executes a query and returns all rows and metadata.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `Record`\<`string`, `S`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `opts` | [`Options`](../interfaces/Options.md) | An optional object used to control behavior, see [Options](../interfaces/Options.md) |

#### Returns

`Promise`\<[`Result`](../interfaces/Result.md)\<`T`\>\>

#### Defined in

@tableland/sdk/src/statement.ts:158

___

### bind

▸ **bind**\<`T`\>(`...values`): [`Statement`](Statement.md)\<`T`\>

Bind a set of values to the parameters of the prepared statement.
We follow the SQLite convention for prepared statements parameter binding.
We support Ordered (?NNNN), Anonymous (?), and Named (@name, :name, $name) parameters.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `S` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...values` | [`ValuesType`](../modules.md#valuestype)[] | A variadic list of values to bind. May include base types, and objects. |

#### Returns

[`Statement`](Statement.md)\<`T`\>

A new bound Statement.

#### Defined in

@tableland/sdk/src/statement.ts:83

___

### first

▸ **first**\<`T`\>(`opts?`): `Promise`\<``null`` \| `T`\>

Executes a query and returns the first row of the results.
This does not return metadata like the other methods.
Instead it returns the object directly. If the query returns no
rows, then first() will return null.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `Record`\<`string`, `S`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `opts?` | [`Options`](../interfaces/Options.md) | An optional object used to control behavior, see [Options](../interfaces/Options.md) |

#### Returns

`Promise`\<``null`` \| `T`\>

#### Defined in

@tableland/sdk/src/statement.ts:197

▸ **first**\<`T`, `K`\>(`colName`, `opts?`): `Promise`\<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `S` |
| `K` | extends `string` = keyof `T` & `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `colName` | `undefined` |
| `opts?` | [`Options`](../interfaces/Options.md) |

#### Returns

`Promise`\<`T`\>

#### Defined in

@tableland/sdk/src/statement.ts:199

▸ **first**\<`T`, `K`\>(`colName`, `opts?`): `Promise`\<``null`` \| `T`[`K`]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `S` |
| `K` | extends `string` = keyof `T` & `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `colName` | `K` |
| `opts?` | [`Options`](../interfaces/Options.md) |

#### Returns

`Promise`\<``null`` \| `T`[`K`]\>

#### Defined in

@tableland/sdk/src/statement.ts:203

___

### raw

▸ **raw**\<`T`\>(`opts?`): `Promise`\<[`ValueOf`](../modules.md#valueof)\<`T`\>[]\>

Same as stmt.all(), but returns an array of rows instead of objects.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `S` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `opts` | [`Options`](../interfaces/Options.md) | An optional object used to control behavior, see [Options](../interfaces/Options.md) |

#### Returns

`Promise`\<[`ValueOf`](../modules.md#valueof)\<`T`\>[]\>

An array of raw query results.

#### Defined in

@tableland/sdk/src/statement.ts:286

___

### run

▸ **run**\<`T`\>(`opts?`): `Promise`\<[`Result`](../interfaces/Result.md)\<`T`\>\>

Runs the query/queries, but returns no results. Instead, run()
returns the metrics only. Useful for write operations like
UPDATE, DELETE or INSERT.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `Record`\<`string`, `S`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `opts` | [`Options`](../interfaces/Options.md) | An optional object used to control behavior, see [Options](../interfaces/Options.md) |

#### Returns

`Promise`\<[`Result`](../interfaces/Result.md)\<`T`\>\>

A results object with metadata only (results are null or an empty array).

#### Defined in

@tableland/sdk/src/statement.ts:255

___

### toObject

▸ **toObject**(): `Object`

Export a Statement's sql string and parameters.

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `parameters?` | [`Parameters`](../interfaces/Parameters.md) |
| `sql` | `string` |

#### Defined in

@tableland/sdk/src/statement.ts:105

___

### toString

▸ **toString**(): `string`

Resolve a bound statement to a SQL string.

#### Returns

`string`

A valid SQL string.

#### Defined in

@tableland/sdk/src/statement.ts:92
