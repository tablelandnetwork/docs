---
description: API Reference for the integrated Javascript/Typescript Client/SDK.
---

# Javascript SDK

The Tableland project provides a zero-config Typescript/Javascript SDK that make it easy to interact with the Tableland network from Ethereum-based application. `@textile/tableland` should feel comfortable to developers already familiar with the [Ethers](https://docs.ethers.io) Javascript library. The Tableland SDK provides a small but powerful API surface that integrates nicely with existing ETH development best practices. Simply import the library, connect to the Tableland network, and you are ready to start creating and updating tables.

## API

The main entry point for the library is the (`connect`) function, which is an initialization function that connects to the Tableland network and returns a TODO. The connect function can optionally take information about a known Tableland Validator (otherwise a default Validator is used):

▸ **connect**(`validatorHost`, `options?`): `Promise`<`ConnectionDetails`>

`connect` is a wrapper for using an ethereum signature to communicate with a Tableland server. This client library can be used to interact with a local or remote Tableland gRPC-service It is a wrapper around Textile Tableland DB API

```typescript
import connect, { createTable } from '@textile/tableland'

async function setupDB() {
   const connectionDetails = await connect("https://tableland.com");
   createTable("CREATE TABLE table_name (Foo varchar(255), Bar int)", UUID())
}
```

**Parameters**

| Name            | Type            |
| --------------- | --------------- |
| `validatorHost` | `string`        |
| `options`       | `Authenticator` |

**Returns**

`Promise`<`ConnectionDetails`>

**Defined in**

[lib/single.ts:118](https://github.com/textileio/js-tableland/blob/main/src/lib/single.ts#L118)

## createTable

▸ **createTable**(`query`): `Promise`<`string`>

Registers an NFT with the Ethereum smart contract, then uses that to register a new Table on Tableland

**Parameters**

| Name    | Type     | Description             |
| ------- | -------- | ----------------------- |
| `query` | `string` | An SQL create statement |

**Returns**

`Promise`<`string`>

The token ID of the table created

**Defined in**

[main.ts:15](https://github.com/textileio/js-tableland/blob/main/src/main.ts#L15)

## myTables

▸ **myTables**(): `Promise`<`TableMetadata`\[]>

**Returns**

`Promise`<`TableMetadata`\[]>

**Defined in**

[lib/tableland-calls.ts:74](https://github.com/textileio/js-tableland/blob/main/src/lib/tableland-calls.ts#L74)

## runQuery

▸ **runQuery**(`query`, `tableId`): `Promise`<`ReadQueryResult` | `null`>

**Parameters**

| Name      | Type     | Description                                                     |
| --------- | -------- | --------------------------------------------------------------- |
| `query`   | `string` | A SQL query to run                                              |
| `tableId` | `string` | The token ID of the table which the query should be run against |

**Returns**

`Promise`<`ReadQueryResult` | `null`>

Table if read query, nothing if write query

**Defined in**

[main.ts:30](https://github.com/textileio/js-tableland/blob/main/src/main.ts#L30)
