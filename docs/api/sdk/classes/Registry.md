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

• **new Registry**(`config?`): [`Registry`](Registry.md)

Create a Registry instance with the specified connection configuration.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | `Partial`\<[`SignerConfig`](../interfaces/helpers.SignerConfig.md)\> | The connection configuration. This must include an ethersjs Signer. If passing the config from a pre-existing Database instance, it must have a non-null signer key defined. |

#### Returns

[`Registry`](Registry.md)

#### Defined in

@tableland/sdk/src/registry/index.ts:62

## Properties

### config

• `Readonly` **config**: [`SignerConfig`](../interfaces/helpers.SignerConfig.md)

#### Defined in

@tableland/sdk/src/registry/index.ts:55

## Methods

### create

▸ **create**(`params`): `Promise`\<[`ContractTransactionResponse`](helpers.ContractTransactionResponse.md)\>

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

`Promise`\<[`ContractTransactionResponse`](helpers.ContractTransactionResponse.md)\>

#### Defined in

@tableland/sdk/src/registry/index.ts:165

___

### getController

▸ **getController**(`table`): `Promise`\<`string`\>

Returns the controller for a table.

tableId - the id of the target table

#### Parameters

| Name | Type |
| :------ | :------ |
| `table` | `string` \| [`TableIdentifier`](../interfaces/TableIdentifier.md) |

#### Returns

`Promise`\<`string`\>

#### Defined in

@tableland/sdk/src/registry/index.ts:151

___

### listTables

▸ **listTables**(`owner?`): `Promise`\<[`TableIdentifier`](../interfaces/TableIdentifier.md)[]\>

Gets the list of table IDs of the requested owner.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner?` | `string` | The address owning the table. |

#### Returns

`Promise`\<[`TableIdentifier`](../interfaces/TableIdentifier.md)[]\>

#### Defined in

@tableland/sdk/src/registry/index.ts:82

___

### lockController

▸ **lockController**(`table`): `Promise`\<[`ContractTransactionResponse`](helpers.ContractTransactionResponse.md)\>

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

`Promise`\<[`ContractTransactionResponse`](helpers.ContractTransactionResponse.md)\>

#### Defined in

@tableland/sdk/src/registry/index.ts:140

___

### mutate

▸ **mutate**(`params`): `Promise`\<[`ContractTransactionResponse`](helpers.ContractTransactionResponse.md)\>

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

`Promise`\<[`ContractTransactionResponse`](helpers.ContractTransactionResponse.md)\>

#### Defined in

@tableland/sdk/src/registry/index.ts:184

___

### safeTransferFrom

▸ **safeTransferFrom**(`params`): `Promise`\<[`ContractTransactionResponse`](helpers.ContractTransactionResponse.md)\>

Safely transfers the ownership of a given table ID to another address.

Requires the msg sender to be the owner, approved, or operator

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`TransferParams`](../interfaces/TransferParams.md) |

#### Returns

`Promise`\<[`ContractTransactionResponse`](helpers.ContractTransactionResponse.md)\>

#### Defined in

@tableland/sdk/src/registry/index.ts:91

___

### setController

▸ **setController**(`params`): `Promise`\<[`ContractTransactionResponse`](helpers.ContractTransactionResponse.md)\>

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

`Promise`\<[`ContractTransactionResponse`](helpers.ContractTransactionResponse.md)\>

#### Defined in

@tableland/sdk/src/registry/index.ts:121

___

### forSigner

▸ **forSigner**(`signer`): `Promise`\<[`Registry`](Registry.md)\>

Create a Registry that is connected to the given Signer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `signer` | [`Signer`](../interfaces/helpers.Signer.md) | An ethersjs Signer to use for mutating queries. |

#### Returns

`Promise`\<[`Registry`](Registry.md)\>

#### Defined in

@tableland/sdk/src/registry/index.ts:74
