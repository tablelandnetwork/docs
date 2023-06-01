---
id: "Registry"
title: "Class: Registry"
sidebar_label: "Registry"
sidebar_position: 0
custom_edit_url: null
---

Registry provides direct access to remote Registry smart contract APIs.

## Constructors

### constructor

• **new Registry**(`config?`)

Create a Registry instance with the specified connection configuration.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | `Partial`<[`SignerConfig`](../interfaces/helpers.SignerConfig.md)\> | The connection configuration. This must include an ethersjs Signer. If passing the config from a pre-existing Database instance, it must have a non-null signer key defined. |

#### Defined in

@tableland/sdk/src/registry/index.ts:63

## Properties

### config

• `Readonly` **config**: [`SignerConfig`](../interfaces/helpers.SignerConfig.md)

#### Defined in

@tableland/sdk/src/registry/index.ts:56

## Methods

### create

▸ **create**(`params`): `Promise`<[`ContractTransaction`](../interfaces/helpers.ContractTransaction.md)\>

Creates a new table owned by `owner` using `statement` and returns its `tableId`.

owner - the to-be owner of the new table
statement - the SQL statement used to create the table

Requirements:

- contract must be unpaused

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`CreateParams`](../modules.md#createparams) |

#### Returns

`Promise`<[`ContractTransaction`](../interfaces/helpers.ContractTransaction.md)\>

#### Defined in

@tableland/sdk/src/registry/index.ts:164

___

### createTable

▸ **createTable**(`params`): `Promise`<[`ContractTransaction`](../interfaces/helpers.ContractTransaction.md)\>

@custom:deprecated Use `create` instead.

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`CreateTableParams`](../interfaces/CreateTableParams.md) |

#### Returns

`Promise`<[`ContractTransaction`](../interfaces/helpers.ContractTransaction.md)\>

#### Defined in

@tableland/sdk/src/registry/index.ts:171

___

### getController

▸ **getController**(`table`): `Promise`<`string`\>

Returns the controller for a table.

tableId - the id of the target table

#### Parameters

| Name | Type |
| :------ | :------ |
| `table` | `string` \| [`TableIdentifier`](../interfaces/TableIdentifier.md) |

#### Returns

`Promise`<`string`\>

#### Defined in

@tableland/sdk/src/registry/index.ts:150

___

### listTables

▸ **listTables**(`owner?`): `Promise`<[`TableIdentifier`](../interfaces/TableIdentifier.md)[]\>

Gets the list of table IDs of the requested owner.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner?` | `string` | The address owning the table. |

#### Returns

`Promise`<[`TableIdentifier`](../interfaces/TableIdentifier.md)[]\>

#### Defined in

@tableland/sdk/src/registry/index.ts:83

___

### lockController

▸ **lockController**(`table`): `Promise`<[`ContractTransaction`](../interfaces/helpers.ContractTransaction.md)\>

Locks the controller for a table _forever_. Controller can be an EOA or contract address.

Although not very useful, it is possible to lock a table controller that is set to the zero address.

caller - the address that is locking the controller
tableId - the id of the target table

Requirements:

- contract must be unpaused
- `msg.sender` must be `caller` or contract owner and owner of `tableId`
- `tableId` must exist
- `tableId` controller must not be locked

#### Parameters

| Name | Type |
| :------ | :------ |
| `table` | `string` \| [`TableIdentifier`](../interfaces/TableIdentifier.md) |

#### Returns

`Promise`<[`ContractTransaction`](../interfaces/helpers.ContractTransaction.md)\>

#### Defined in

@tableland/sdk/src/registry/index.ts:139

___

### mutate

▸ **mutate**(`params`): `Promise`<[`ContractTransaction`](../interfaces/helpers.ContractTransaction.md)\>

Runs a SQL statement for `caller` using `statement`.

caller - the address that is running the SQL statement
tableId - the id of the target table
statement - the SQL statement to run

Requirements:

- contract must be unpaused
- `msg.sender` must be `caller`
- `tableId` must exist
- `caller` must be authorized by the table controller
- `statement` must be less than 35000 bytes after normalizing

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`MutateParams`](../modules.md#mutateparams) |

#### Returns

`Promise`<[`ContractTransaction`](../interfaces/helpers.ContractTransaction.md)\>

#### Defined in

@tableland/sdk/src/registry/index.ts:190

___

### runSQL

▸ **runSQL**(`params`): `Promise`<[`ContractTransaction`](../interfaces/helpers.ContractTransaction.md)\>

Runs a set of SQL statements for `caller` using `runnables`.
@custom:deprecated Using this with a single statement is deprecated. Use `mutate` instead.

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`MutateParams`](../modules.md#mutateparams) |

#### Returns

`Promise`<[`ContractTransaction`](../interfaces/helpers.ContractTransaction.md)\>

#### Defined in

@tableland/sdk/src/registry/index.ts:198

___

### safeTransferFrom

▸ **safeTransferFrom**(`params`): `Promise`<[`ContractTransaction`](../interfaces/helpers.ContractTransaction.md)\>

Safely transfers the ownership of a given table ID to another address.

Requires the msg sender to be the owner, approved, or operator

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`TransferParams`](../interfaces/TransferParams.md) |

#### Returns

`Promise`<[`ContractTransaction`](../interfaces/helpers.ContractTransaction.md)\>

#### Defined in

@tableland/sdk/src/registry/index.ts:92

___

### setController

▸ **setController**(`params`): `Promise`<[`ContractTransaction`](../interfaces/helpers.ContractTransaction.md)\>

Sets the controller for a table. Controller can be an EOA or contract address.

When a table is created, it's controller is set to the zero address, which means that the
contract will not enforce write access control. In this situation, validators will not accept
transactions from non-owners unless explicitly granted access with "GRANT" SQL statements.

When a controller address is set for a table, validators assume write access control is
handled at the contract level, and will accept all transactions.

You can unset a controller address for a table by setting it back to the zero address.
This will cause validators to revert back to honoring owner and GRANT bases write access control.

caller - the address that is setting the controller
tableId - the id of the target table
controller - the address of the controller (EOA or contract)

Requirements:

- contract must be unpaused
- `msg.sender` must be `caller` or contract owner and owner of `tableId`
- `tableId` must exist
- `tableId` controller must not be locked

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`SetParams`](../interfaces/SetParams.md) |

#### Returns

`Promise`<[`ContractTransaction`](../interfaces/helpers.ContractTransaction.md)\>

#### Defined in

@tableland/sdk/src/registry/index.ts:120

___

### forSigner

▸ `Static` **forSigner**(`signer`): `Promise`<[`Registry`](Registry.md)\>

Create a Registry that is connected to the given Signer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `signer` | [`Signer`](helpers.Signer.md) | An ethersjs Signer to use for mutating queries. |

#### Returns

`Promise`<[`Registry`](Registry.md)\>

#### Defined in

@tableland/sdk/src/registry/index.ts:75
