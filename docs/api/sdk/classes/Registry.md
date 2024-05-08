# Class: Registry

Registry provides direct access to remote Registry smart contract APIs.

## Constructors

### new Registry()

> **new Registry**(`config`): [`Registry`](Registry.md)

Create a Registry instance with the specified connection configuration.

#### Parameters

• **config**: `Partial` \<[`SignerConfig`](../namespaces/helpers/interfaces/SignerConfig.md)\>= `{}`

The connection configuration. This must include an ethersjs
Signer. If passing the config from a pre-existing Database instance, it
must have a non-null signer key defined.

#### Returns

[`Registry`](Registry.md)

#### Source

@tableland/sdk/src/registry/index.ts:62

## Properties

### config

> `readonly` **config**: [`SignerConfig`](../namespaces/helpers/interfaces/SignerConfig.md)

#### Source

@tableland/sdk/src/registry/index.ts:55

## Methods

### create()

> **create**(`params`): `Promise` \<[`ContractTransactionResponse`](../namespaces/helpers/classes/ContractTransactionResponse.md)\>

Creates a new table owned by `owner` using `statement` and returns its `tableId`.

owner - the to-be owner of the new table
statement - the SQL statement used to create the table

Requirements:

- contract must be unpaused

#### Parameters

• **params**: [`CreateParams`](../type-aliases/CreateParams.md)

#### Returns

`Promise` \<[`ContractTransactionResponse`](../namespaces/helpers/classes/ContractTransactionResponse.md)\>

#### Source

@tableland/sdk/src/registry/index.ts:165

***

### getController()

> **getController**(`table`): `Promise`\<`string`\>

Returns the controller for a table.

tableId - the id of the target table

#### Parameters

• **table**: `string` \| [`TableIdentifier`](../interfaces/TableIdentifier.md)

#### Returns

`Promise`\<`string`\>

#### Source

@tableland/sdk/src/registry/index.ts:151

***

### listTables()

> **listTables**(`owner`?): `Promise` \<[`TableIdentifier`](../interfaces/TableIdentifier.md)[]\>

Gets the list of table IDs of the requested owner.

#### Parameters

• **owner?**: `string`

The address owning the table.

#### Returns

`Promise` \<[`TableIdentifier`](../interfaces/TableIdentifier.md)[]\>

#### Source

@tableland/sdk/src/registry/index.ts:82

***

### lockController()

> **lockController**(`table`): `Promise` \<[`ContractTransactionResponse`](../namespaces/helpers/classes/ContractTransactionResponse.md)\>

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

• **table**: `string` \| [`TableIdentifier`](../interfaces/TableIdentifier.md)

#### Returns

`Promise` \<[`ContractTransactionResponse`](../namespaces/helpers/classes/ContractTransactionResponse.md)\>

#### Source

@tableland/sdk/src/registry/index.ts:140

***

### mutate()

> **mutate**(`params`): `Promise` \<[`ContractTransactionResponse`](../namespaces/helpers/classes/ContractTransactionResponse.md)\>

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

• **params**: [`MutateParams`](../type-aliases/MutateParams.md)

#### Returns

`Promise` \<[`ContractTransactionResponse`](../namespaces/helpers/classes/ContractTransactionResponse.md)\>

#### Source

@tableland/sdk/src/registry/index.ts:184

***

### safeTransferFrom()

> **safeTransferFrom**(`params`): `Promise` \<[`ContractTransactionResponse`](../namespaces/helpers/classes/ContractTransactionResponse.md)\>

Safely transfers the ownership of a given table ID to another address.

Requires the msg sender to be the owner, approved, or operator

#### Parameters

• **params**: [`TransferParams`](../interfaces/TransferParams.md)

#### Returns

`Promise` \<[`ContractTransactionResponse`](../namespaces/helpers/classes/ContractTransactionResponse.md)\>

#### Source

@tableland/sdk/src/registry/index.ts:91

***

### setController()

> **setController**(`params`): `Promise` \<[`ContractTransactionResponse`](../namespaces/helpers/classes/ContractTransactionResponse.md)\>

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

• **params**: [`SetParams`](../interfaces/SetParams.md)

#### Returns

`Promise` \<[`ContractTransactionResponse`](../namespaces/helpers/classes/ContractTransactionResponse.md)\>

#### Source

@tableland/sdk/src/registry/index.ts:121

***

### forSigner()

> `static` **forSigner**(`signer`): `Promise` \<[`Registry`](Registry.md)\>

Create a Registry that is connected to the given Signer.

#### Parameters

• **signer**: [`Signer`](../namespaces/helpers/interfaces/Signer.md)

An ethersjs Signer to use for mutating queries.

#### Returns

`Promise` \<[`Registry`](Registry.md)\>

#### Source

@tableland/sdk/src/registry/index.ts:74
