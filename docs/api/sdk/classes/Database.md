---
id: "Database"
title: "Class: Database<D>"
sidebar_label: "Database"
sidebar_position: 0
custom_edit_url: null
---

Database is the primary API for accessing the Tableland network as a database.
This class provides a small and simple API that will feel very familiar to
web2 database users. It includes the concept of prepared statements, SQL
parameter binding, execution and query modes, and more. It is actually similar
to the better-sqlite3, and D1 APIs in many respects.

## Type parameters

| Name | Type |
| :------ | :------ |
| `D` | `unknown` |

## Constructors

### constructor

• **new Database**\<`D`\>(`config?`): [`Database`](Database.md)\<`D`\>

Create a Database instance with the specified connection configuration.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | `unknown` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | `Partial`\<[`ReadConfig`](../interfaces/helpers.ReadConfig.md) & [`SignerConfig`](../interfaces/helpers.SignerConfig.md)\> & `Partial`\<[`AutoWaitConfig`](../interfaces/helpers.AutoWaitConfig.md)\> | The connection configuration. These keys are evaluated lazily, so it is possible to omit the baseUrl or signer, depending on your query needs. For a read-only Database for instance, only the baseUrl needs to be provided. |

#### Returns

[`Database`](Database.md)\<`D`\>

#### Defined in

@tableland/sdk/src/database.ts:39

## Properties

### config

• `Readonly` **config**: `Partial`\<[`ReadConfig`](../interfaces/helpers.ReadConfig.md) & [`SignerConfig`](../interfaces/helpers.SignerConfig.md)\> & `Partial`\<[`AutoWaitConfig`](../interfaces/helpers.AutoWaitConfig.md)\>

#### Defined in

@tableland/sdk/src/database.ts:30

## Methods

### batch

▸ **batch**\<`T`\>(`statements`, `controller?`): `Promise`\<[`Result`](../interfaces/Result.md)\<`T`\>[]\>

Execute a set of Statements in batch mode.
Batching sends multiple SQL statements inside a single call to the
network. This can have a huge performance impact, as it only sends
one transaction to the Tableland smart contract, thereby reducing
gas costs.
Batched statements are similar to SQL transactions. If a statement
in the sequence fails, then an error is returned for that specific
statement, and it aborts or rolls back the entire sequence.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `D` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `statements` | [`Statement`](Statement.md)\<`unknown`\>[] | A set of Statement objects to batch and submit. |
| `controller?` | [`PollingController`](../namespaces/helpers.md#pollingcontroller) | An optional object used to control receipt polling behavior. |

#### Returns

`Promise`\<[`Result`](../interfaces/Result.md)\<`T`\>[]\>

An array of run results.

#### Defined in

@tableland/sdk/src/database.ts:82

___

### dump

▸ **dump**(`_controller?`): `Promise`\<`ArrayBuffer`\>

Export a (set of) tables to the SQLite binary format.
Not implemented yet!

#### Parameters

| Name | Type |
| :------ | :------ |
| `_controller?` | [`PollingController`](../namespaces/helpers.md#pollingcontroller) |

#### Returns

`Promise`\<`ArrayBuffer`\>

#### Defined in

@tableland/sdk/src/database.ts:207

___

### exec

▸ **exec**\<`T`\>(`statementStrings`, `controller?`): `Promise`\<[`ExecResult`](../interfaces/ExecResult.md)\<`T`\>\>

Executes one or more queries directly without prepared statements
or parameters binding. This method can have poorer performance
(prepared statements can be reused in some cases) and, more importantly,
is less safe. Only use this method for maintenance and one-shot tasks
(example: migration jobs). The input can be one or multiple queries
separated by the standard `;`.
If an error occurs, an exception is thrown with the query and error
messages (see below for `Errors`).
Currently, the entire string of statements is submitted as a single
transaction. In the future, more "intelligent" transaction planning,
splitting, and batching may be used.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `D` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `statementStrings` | `string` | A set of SQL statement strings separated by semi-colons. |
| `controller?` | [`PollingController`](../namespaces/helpers.md#pollingcontroller) | An optional object used to control receipt polling behavior. |

#### Returns

`Promise`\<[`ExecResult`](../interfaces/ExecResult.md)\<`T`\>\>

A single run result.

#### Defined in

@tableland/sdk/src/database.ts:183

___

### prepare

▸ **prepare**\<`T`\>(`sql`): [`Statement`](Statement.md)\<`T`\>

Create a new prepared statement.
Both static and prepared statements are supported. In the current
implementation, the prepared statements are prepared locally, and
executed remotely (on-chain).

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `D` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sql` | `string` | The SQL statement string to prepare. |

#### Returns

[`Statement`](Statement.md)\<`T`\>

A Statement object constructed with the given SQL string.

#### Defined in

@tableland/sdk/src/database.ts:61

___

### forSigner

▸ **forSigner**(`signer`): `Promise`\<[`Database`](Database.md)\<`unknown`\>\>

Create a Database that is connected to the given Signer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `signer` | [`Signer`](../interfaces/helpers.Signer.md) | An ethersjs Signer to use for mutating queries. |

#### Returns

`Promise`\<[`Database`](Database.md)\<`unknown`\>\>

A Database with a Signer, and a default baseUrl.

#### Defined in

@tableland/sdk/src/database.ts:48
