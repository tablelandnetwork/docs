---
title: Tables
description: Returns information about a single table, including schema information.
keywords:
  - rest api
  - gateway api
  - validator api
  - tables
---

## Endpoint

`GET /tables/{chainId}/{tableId}`

The following describes the usage with placeholder parameters on a testnet gateway URL:

```bash
curl -X GET https://testnets.tableland.network/api/v1/tables/{chainId}/{tableId} \
  -H 'Accept: application/json'
```

## Parameters

| Name    | In   | Type           | Required | Description                |
| ------- | ---- | -------------- | -------- | -------------------------- |
| chainId | path | integer(int32) | true     | The parent chain to target |
| tableId | path | string         | true     | Table identifier           |

## Responses

| Status | Meaning                                           | Description                       | Schema                                                                                      |
| ------ | ------------------------------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------- |
| 200    | https://tools.ietf.org/html/rfc7231#section-6.3.1 | successful operation              | notion://www.notion.so/textile/REST-API-Latest-e622f52063314c0db8dca75363ebb793#schematable |
| 400    | https://tools.ietf.org/html/rfc7231#section-6.5.1 | Invalid chain or table identifier | None                                                                                        |
| 404    | https://tools.ietf.org/html/rfc7231#section-6.5.4 | Table Not Found                   | None                                                                                        |
| 429    | https://tools.ietf.org/html/rfc6585#section-4     | Too Many Requests                 | None                                                                                        |
| 500    | https://tools.ietf.org/html/rfc7231#section-6.6.1 | Internal Server Error             | None                                                                                        |

This operation does not require authentication

## Response properties

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
| schema         | object   | false    | none         | The table schema                  |

### Schema properties

| Name        | Type     | Required | Restrictions | Description |
| ----------- | -------- | -------- | ------------ | ----------- |
| name        | string   | false    | none         | none        |
| type        | string   | false    | none         | none        |
| constraints | [string] | false    | none         | none        |

## Example

```bash
curl -X GET https://testnets.tableland.network/api/v1/tables/80002/1 \
  -H 'Accept: application/json'
```

Returns a successful (200) response:

```json
{
  "name": "healthbot_80002_1",
  "external_url": "https://testnets.tableland.network/api/v1/tables/80002/1",
  "animation_url": "https://tables.testnets.tableland.xyz/80002/1.html",
  "image": "https://tables.testnets.tableland.xyz/80002/1.svg",
  "attributes": [
    {
      "display_type": "date",
      "trait_type": "created",
      "value": 1673973329
    }
  ],
  "schema": {
    "columns": [
      {
        "name": "counter",
        "type": "integer"
      }
    ]
  }
}
```
