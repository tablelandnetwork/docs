# Class: Statement\<S\>

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

• **S** = `unknown`

## Constructors

### new Statement()

> **new Statement**\<`S`\>(`config`, `sql`, `parameters`?): [`Statement`](Statement.md)\<`S`\>

#### Parameters

• **config**: `Partial` \<[`ReadConfig`](../namespaces/helpers/interfaces/ReadConfig.md) & [`SignerConfig`](../namespaces/helpers/interfaces/SignerConfig.md)\> & `Partial` \<[`AutoWaitConfig`](../namespaces/helpers/interfaces/AutoWaitConfig.md)\>

• **sql**: `string`

• **parameters?**: [`Parameters`](../interfaces/Parameters.md)

#### Returns

[`Statement`](Statement.md)\<`S`\>

#### Source

@tableland/sdk/src/statement.ts:62

## Properties

### config

> `private` `readonly` **config**: `Partial` \<[`ReadConfig`](../namespaces/helpers/interfaces/ReadConfig.md) & [`SignerConfig`](../namespaces/helpers/interfaces/SignerConfig.md)\> & `Partial` \<[`AutoWaitConfig`](../namespaces/helpers/interfaces/AutoWaitConfig.md)\>

#### Source

@tableland/sdk/src/statement.ts:58

***

### parameters?

> `private` `optional` `readonly` **parameters**: [`Parameters`](../interfaces/Parameters.md)

#### Source

@tableland/sdk/src/statement.ts:60

***

### sql

> `private` `readonly` **sql**: `string`

#### Source

@tableland/sdk/src/statement.ts:59

## Methods

### #checkIsValidOpts()

> `private` **#checkIsValidOpts**(`opts`): `opts is Options`

#### Parameters

• **opts**: `any`

#### Returns

`opts is Options`

#### Source

@tableland/sdk/src/statement.ts:185

***

### #parseAndExtract()

> `private` **#parseAndExtract**(): `Promise`\<`ExtractedStatement`\>

#### Returns

`Promise`\<`ExtractedStatement`\>

#### Source

@tableland/sdk/src/statement.ts:112

***

### #waitExec()

> `private` **#waitExec**(`params`, `controller`?): `Promise` \<[`WaitableTransactionReceipt`](../type-aliases/WaitableTransactionReceipt.md)\>

#### Parameters

• **params**: `ExtractedStatement`

• **controller?**: [`PollingController`](../namespaces/helpers/type-aliases/PollingController.md)

#### Returns

`Promise` \<[`WaitableTransactionReceipt`](../type-aliases/WaitableTransactionReceipt.md)\>

#### Source

@tableland/sdk/src/statement.ts:143

***

### all()

> **all**\<`T`\>(`opts`): `Promise` \<[`Result`](../interfaces/Result.md)\<`T`\>\>

Executes a query and returns all rows and metadata.

#### Type parameters

• **T** = `Record`\<`string`, `S`\>

#### Parameters

• **opts**: [`Options`](../interfaces/Options.md)= `{}`

An optional object used to control behavior, see [Options](../interfaces/Options.md)

#### Returns

`Promise` \<[`Result`](../interfaces/Result.md)\<`T`\>\>

#### Source

@tableland/sdk/src/statement.ts:158

***

### bind()

> **bind**\<`T`\>(...`values`): [`Statement`](Statement.md)\<`T`\>

Bind a set of values to the parameters of the prepared statement.
We follow the SQLite convention for prepared statements parameter binding.
We support Ordered (?NNNN), Anonymous (?), and Named (@name, :name, $name) parameters.

#### Type parameters

• **T** = `S`

#### Parameters

• ...**values**: [`ValuesType`](../type-aliases/ValuesType.md)[]

A variadic list of values to bind. May include base types, and objects.

#### Returns

[`Statement`](Statement.md)\<`T`\>

A new bound Statement.

#### Source

@tableland/sdk/src/statement.ts:83

***

### first()

#### first(opts)

> **first**\<`T`\>(`opts`?): `Promise`\<`null` \| `T`\>

Executes a query and returns the first row of the results.
This does not return metadata like the other methods.
Instead it returns the object directly. If the query returns no
rows, then first() will return null.

##### Type parameters

• **T** = `Record`\<`string`, `S`\>

##### Parameters

• **opts?**: [`Options`](../interfaces/Options.md)

An optional object used to control behavior, see [Options](../interfaces/Options.md)

##### Returns

`Promise`\<`null` \| `T`\>

##### Source

@tableland/sdk/src/statement.ts:197

#### first(colName, opts)

> **first**\<`T`, `K`\>(`colName`, `opts`?): `Promise`\<`T`\>

##### Type parameters

• **T** = `S`

• **K** *extends* `string` = keyof `T` & `string`

##### Parameters

• **colName**: `undefined`

• **opts?**: [`Options`](../interfaces/Options.md)

##### Returns

`Promise`\<`T`\>

##### Source

@tableland/sdk/src/statement.ts:199

#### first(colName, opts)

> **first**\<`T`, `K`\>(`colName`, `opts`?): `Promise`\<`null` \| `T`\[`K`\]\>

##### Type parameters

• **T** = `S`

• **K** *extends* `string` = keyof `T` & `string`

##### Parameters

• **colName**: `K`

• **opts?**: [`Options`](../interfaces/Options.md)

##### Returns

`Promise`\<`null` \| `T`\[`K`\]\>

##### Source

@tableland/sdk/src/statement.ts:203

***

### raw()

> **raw**\<`T`\>(`opts`): `Promise` \<[`ValueOf`](../type-aliases/ValueOf.md)\<`T`\>[]\>

Same as stmt.all(), but returns an array of rows instead of objects.

#### Type parameters

• **T** = `S`

#### Parameters

• **opts**: [`Options`](../interfaces/Options.md)= `{}`

An optional object used to control behavior, see [Options](../interfaces/Options.md)

#### Returns

`Promise` \<[`ValueOf`](../type-aliases/ValueOf.md)\<`T`\>[]\>

An array of raw query results.

#### Source

@tableland/sdk/src/statement.ts:286

***

### run()

> **run**\<`T`\>(`opts`): `Promise` \<[`Result`](../interfaces/Result.md)\<`T`\>\>

Runs the query/queries, but returns no results. Instead, run()
returns the metrics only. Useful for write operations like
UPDATE, DELETE or INSERT.

#### Type parameters

• **T** = `Record`\<`string`, `S`\>

#### Parameters

• **opts**: [`Options`](../interfaces/Options.md)= `{}`

An optional object used to control behavior, see [Options](../interfaces/Options.md)

#### Returns

`Promise` \<[`Result`](../interfaces/Result.md)\<`T`\>\>

A results object with metadata only (results are null or an empty array).

#### Source

@tableland/sdk/src/statement.ts:255

***

### toObject()

> **toObject**(): `object`

Export a Statement's sql string and parameters.

#### Returns

`object`

##### parameters?

> `optional` **parameters**: [`Parameters`](../interfaces/Parameters.md)

##### sql

> **sql**: `string`

#### Source

@tableland/sdk/src/statement.ts:105

***

### toString()

> **toString**(): `string`

Resolve a bound statement to a SQL string.

#### Returns

`string`

A valid SQL string.

#### Source

@tableland/sdk/src/statement.ts:92
