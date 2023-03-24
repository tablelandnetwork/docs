---
title: Endpoints
description: Make API calls to get table and validator information.
keywords:
  - validator api
  - rest api
---

## Synopsis

This general API specification is used to automatically generate clients and backend services; it should be used as the primary source of truth for Validator APIs. This specification is a living document, and as such, may be updated over time. Proposals for the addition of API features and fixes may be submitted by the Tableland community over time. These proposals will be evaluated for technical feasibility, utility to the community, and longer-term sustainability.

In Tableland, Validators are the execution unit/actors of the protocol. They have the following responsibilities:

- Listen to on-chain events to materialize Tableland-compliant SQL queries in a database engine (currently, SQLite by default).
- Serve read-queries (e.g: `SELECT * FROM foo_69_1`) to the external world.
- Serve state queries (e.g. list tables, get receipts, etc) to the external world.

## query

_See the **Query Formatting** section for how to transform the response, such as making it ERC721 compliant._

### Query the network

Example

```bash
### You can also use wget
curl -X GET https://testnets.tableland.network/api/v1/query?statement=select%20%2A%20from%20healthbot_80001_1 \
  -H 'Accept: application/json'
```

### `GET /query`

Returns the results of a SQL read query against the Tableland network

### Parameters

| Name      | In    | Type    | Required | Description                                                                                 |
| --------- | ----- | ------- | -------- | ------------------------------------------------------------------------------------------- |
| statement | query | string  | true     | The SQL read query statement                                                                |
| format    | query | string  | false    | The requested response format:                                                              |
| extract   | query | boolean | false    | Whether to extract the JSON object from the single property of the surrounding JSON object. |
| unwrap    | query | boolean | false    | Whether to unwrap the returned JSON objects from their surrounding array.                   |

### Detailed descriptions

**format**: The requested response format:

- `objects` - Returns the query results as a JSON array of JSON objects.
- `table` - Return the query results as a JSON object with columns and rows properties.

### Enumerated Values

| Parameter | Value   |
| --------- | ------- |
| format    | objects |
| format    | table   |

Example responses

- 200 Response

```json
{}
```

### Responses

| Status | Meaning                                           | Description                   | Schema |
| ------ | ------------------------------------------------- | ----------------------------- | ------ |
| 200    | https://tools.ietf.org/html/rfc7231#section-6.3.1 | Successful operation          | Inline |
| 400    | https://tools.ietf.org/html/rfc7231#section-6.5.1 | Invalid query/statement value | None   |
| 404    | https://tools.ietf.org/html/rfc7231#section-6.5.4 | Row Not Found                 | None   |
| 429    | https://tools.ietf.org/html/rfc6585#section-4     | Too Many Requests             | None   |

### Response Schema

This operation does not require authentication

## receipt

Get information about transaction progress

### Get transaction status

Example

```bash
### You can also use wget
curl -X GET https://testnets.tableland.network/api/v1/receipt/{chainId}/{transactionHash} \
  -H 'Accept: application/json'
```

### `GET /receipt/{chainId}/{transactionHash}`

Returns the status of a given transaction receipt by hash

### Parameters

| Name            | In   | Type           | Required | Description                     |
| --------------- | ---- | -------------- | -------- | ------------------------------- |
| chainId         | path | integer(int32) | true     | The parent chain to target      |
| transactionHash | path | string         | true     | The transaction hash to request |

Example responses

- 200 Response

```json
{
  "table_id": "1",
  "transaction_hash": "0x02f319429b8a7be1cbb492f0bfbf740d2472232a2edadde7df7c16c0b61aa78b",
  "block_number": 27055540,
  "chain_id": 80001,
  "error": "The query statement is invalid",
  "error_event_idx": 1
}
```

### Responses

| Status | Meaning                                           | Description                                         | Schema             |
| ------ | ------------------------------------------------- | --------------------------------------------------- | ------------------ |
| 200    | https://tools.ietf.org/html/rfc7231#section-6.3.1 | successful operation                                | TransactionReceipt |
| 400    | https://tools.ietf.org/html/rfc7231#section-6.5.1 | Invalid chain identifier or transaction hash format | None               |
| 404    | https://tools.ietf.org/html/rfc7231#section-6.5.4 | No transaction receipt found with the provided hash | None               |
| 429    | https://tools.ietf.org/html/rfc6585#section-4     | Too Many Requests                                   | None               |

This operation does not require authentication

## tables

Access to table information

### Get table information

Example

```bash
### You can also use wget
curl -X GET https://testnets.tableland.network/api/v1/tables/{chainId}/{tableId} \
  -H 'Accept: application/json'
```

### `GET /tables/{chainId}/{tableId}`

Returns information about a single table, including schema information

### Parameters

| Name    | In   | Type           | Required | Description                |
| ------- | ---- | -------------- | -------- | -------------------------- |
| chainId | path | integer(int32) | true     | The parent chain to target |
| tableId | path | string         | true     | Table identifier           |

Example responses

- 200 Response

```json
{
  "name": "healthbot_5_1",
  "external_url": "https://testnet.tableland.network/tables/healthbot_5_1",
  "animation_url": "https://render.tableland.xyz/anim/?chain=1&id=1",
  "image": "https://render.tableland.xyz/healthbot_5_1",
  "attributes": {
    "display_type": "date",
    "trait_type": "created",
    "value": 1657113720
  },
  "schema": {
    "columns": [
      {
        "name": "id",
        "type": "integer",
        "constraints": ["NOT NULL", "PRIMARY KEY", "UNIQUE"]
      }
    ],
    "table_constraints": ["PRIMARY KEY (id)"]
  }
}
```

### Responses

| Status | Meaning                                           | Description                       | Schema                                                                                      |
| ------ | ------------------------------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------- |
| 200    | https://tools.ietf.org/html/rfc7231#section-6.3.1 | successful operation              | notion://www.notion.so/textile/REST-API-Latest-e622f52063314c0db8dca75363ebb793#schematable |
| 400    | https://tools.ietf.org/html/rfc7231#section-6.5.1 | Invalid chain or table identifier | None                                                                                        |
| 404    | https://tools.ietf.org/html/rfc7231#section-6.5.4 | Table Not Found                   | None                                                                                        |
| 429    | https://tools.ietf.org/html/rfc6585#section-4     | Too Many Requests                 | None                                                                                        |
| 500    | https://tools.ietf.org/html/rfc7231#section-6.6.1 | Internal Server Error             | None                                                                                        |

This operation does not require authentication

## health

### Get health status

Example

```bash
### You can also use wget
curl -X GET https://testnets.tableland.network/api/v1/health
```

### `GET /health`

Returns OK if the validator considers itself healthy.

### Responses

| Status | Meaning                                           | Description               | Schema |
| ------ | ------------------------------------------------- | ------------------------- | ------ |
| 200    | https://tools.ietf.org/html/rfc7231#section-6.3.1 | The validator is healthy. | None   |

This operation does not require authentication

## version

### Get version information

Example

```bash
### You can also use wget
curl -X GET https://testnets.tableland.network/api/v1/version \
  -H 'Accept: application/json'
```

### `GET /version`

Returns version information about the validator daemon.

Example responses

- 200 Response

```bash
{
  "version": 0,
  "git_commit": "79688910d4689dcc0991a0d8eb9d988200586d8f",
  "git_branch": "foo/experimentalfeature",
  "git_state": "dirty",
  "git_summary": "v1.2.3_dirty",
  "build_date": "2022-11-29T16:28:04Z",
  "binary_version": "v1.0.1"
}
```

### Responses

| Status | Meaning                                           | Description          | Schema      |
| ------ | ------------------------------------------------- | -------------------- | ----------- |
| 200    | https://tools.ietf.org/html/rfc7231#section-6.3.1 | successful operation | VersionInfo |

This operation does not require authentication

## Schemas

### Table

```json
{
  "name": "healthbot_5_1",
  "external_url": "https://testnet.tableland.network/tables/healthbot_5_1",
  "animation_url": "https://render.tableland.xyz/anim/?chain=1&id=1",
  "image": "https://render.tableland.xyz/healthbot_5_1",
  "attributes": {
    "display_type": "date",
    "trait_type": "created",
    "value": 1657113720
  },
  "schema": {
    "columns": [
      {
        "name": "id",
        "type": "integer",
        "constraints": ["NOT NULL", "PRIMARY KEY", "UNIQUE"]
      }
    ],
    "table_constraints": ["PRIMARY KEY (id)"]
  }
}
```

### Properties

| Name           | Type     | Required | Restrictions | Description                       |
| -------------- | -------- | -------- | ------------ | --------------------------------- |
| name           | string   | false    | none         | none                              |
| external_url   | string   | false    | none         | none                              |
| animation_url  | string   | false    | none         | none                              |
| image          | string   | false    | none         | none                              |
| attributes     | [object] | false    | none         | none                              |
| » display_type | string   | false    | none         | The display type for marketplaces |
| » trait_type   | string   | false    | none         | The trait type for marketplaces   |
| » value        | object   | false    | none         | The value of the property         |

**oneOf**

| Name         | Type   | Required | Restrictions | Description |
| ------------ | ------ | -------- | ------------ | ----------- |
| »» anonymous | string | false    | none         | none        |

**xor**

| Name         | Type   | Required | Restrictions | Description |
| ------------ | ------ | -------- | ------------ | ----------- |
| »» anonymous | number | false    | none         | none        |

**xor**

| Name         | Type    | Required | Restrictions | Description |
| ------------ | ------- | -------- | ------------ | ----------- |
| »» anonymous | integer | false    | none         | none        |

**xor**

| Name         | Type    | Required | Restrictions | Description |
| ------------ | ------- | -------- | ------------ | ----------- |
| »» anonymous | boolean | false    | none         | none        |

**xor**

| Name         | Type   | Required | Restrictions | Description |
| ------------ | ------ | -------- | ------------ | ----------- |
| »» anonymous | object | false    | none         | none        |

**continued**

| Name   | Type   | Required | Restrictions | Description |
| ------ | ------ | -------- | ------------ | ----------- |
| schema | Schema | false    | none         | none        |

### TransactionReceipt

```json
{
  "table_id": "1",
  "transaction_hash": "0x02f319429b8a7be1cbb492f0bfbf740d2472232a2edadde7df7c16c0b61aa78b",
  "block_number": 27055540,
  "chain_id": 80001,
  "error": "The query statement is invalid",
  "error_event_idx": 1
}
```

### Properties

| Name             | Type           | Required | Restrictions | Description |
| ---------------- | -------------- | -------- | ------------ | ----------- |
| table_id         | string         | false    | none         | none        |
| transaction_hash | string         | false    | none         | none        |
| block_number     | integer(int64) | false    | none         | none        |
| chain_id         | integer(int32) | false    | none         | none        |
| error            | string         | false    | none         | none        |
| error_event_idx  | integer(int32) | false    | none         | none        |

### Schema

```json
{
  "columns": [
    {
      "name": "id",
      "type": "integer",
      "constraints": ["NOT NULL", "PRIMARY KEY", "UNIQUE"]
    }
  ],
  "table_constraints": ["PRIMARY KEY (id)"]
}
```

### Properties

| Name              | Type     | Required | Restrictions | Description |
| ----------------- | -------- | -------- | ------------ | ----------- |
| columns           | [Column] | false    | none         | none        |
| table_constraints | [string] | false    | none         | none        |

### Column

```json
{
  "name": "id",
  "type": "integer",
  "constraints": ["NOT NULL", "PRIMARY KEY", "UNIQUE"]
}
```

### Properties

| Name        | Type     | Required | Restrictions | Description |
| ----------- | -------- | -------- | ------------ | ----------- |
| name        | string   | false    | none         | none        |
| type        | string   | false    | none         | none        |
| constraints | [string] | false    | none         | none        |

### VersionInfo

```json
{
  "version": 0,
  "git_commit": "79688910d4689dcc0991a0d8eb9d988200586d8f",
  "git_branch": "foo/experimentalfeature",
  "git_state": "dirty",
  "git_summary": "v1.2.3_dirty",
  "build_date": "2022-11-29T16:28:04Z",
  "binary_version": "v1.0.1"
}
```

### Properties

| Name           | Type           | Required | Restrictions | Description |
| -------------- | -------------- | -------- | ------------ | ----------- |
| version        | integer(int32) | false    | none         | none        |
| git_commit     | string         | false    | none         | none        |
| git_branch     | string         | false    | none         | none        |
| git_state      | string         | false    | none         | none        |
| git_summary    | string         | false    | none         | none        |
| build_date     | string         | false    | none         | none        |
| binary_version | string         | false    | none         | none        |

## Interactive demo

Test out the Validator API yourself: [here](https://codesandbox.io/embed/red-surf-6bnbmm?fontsize=14&hidenavigation=1&theme=dark&view=preview)
