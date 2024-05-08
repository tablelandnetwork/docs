---
title: Query
description: Returns the results of a SQL read query against the Tableland network.
keywords:
  - rest api
  - gateway api
  - validator api
  - query
---

## Endpoint

The `/query` endpoint supports both `GET` and `POST` requests, returning the results of a SQL read query, along with options for formatting the response.

`GET /query` or `POST /query`

### GET request

The following describes the `GET` usage with placeholder parameters on a testnet gateway URL:

```bash
curl -X GET https://testnets.tableland.network/api/v1/query?format={objects|table}&extract={boolean}&unwrap={boolean}&statement={sql_select_statement} \
  -H 'Accept: application/json'
```

For example, to query the `healthbot_80002_1` table with default formatting options:

```bash
curl -X GET https://testnets.tableland.network/api/v1/query?statement=select%20%2A%20from%20healthbot_80002_1 \
  -H 'Accept: application/json'
```

### POST request

The following describes the `POST` usage with example parameters on a testnet gateway URL:

```bash
curl -L 'https://testnets.tableland.network/api/v1/query' \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "statement": "select * from healthbot_80002_1",
    "format": "objects",
    "extract": false,
    "unwrap": false
  }'
```

## Parameters

| Name      | In    | Type    | Required | Description                                                                                                      |
| --------- | ----- | ------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
| statement | query | string  | true     | The SQL read query statement                                                                                     |
| format    | query | string  | false    | The requested response format: objects (array of objects) or table (object with columns and rows as properties). |
| extract   | query | boolean | false    | Whether to extract the JSON object from the single property of the surrounding JSON object.                      |
| unwrap    | query | boolean | false    | Whether to unwrap the returned JSON objects from their surrounding array.                                        |

## Responses

| Status | Meaning                                           | Description                   | Schema |
| ------ | ------------------------------------------------- | ----------------------------- | ------ |
| 200    | https://tools.ietf.org/html/rfc7231#section-6.3.1 | Successful operation          | Inline |
| 400    | https://tools.ietf.org/html/rfc7231#section-6.5.1 | Invalid query/statement value | None   |
| 404    | https://tools.ietf.org/html/rfc7231#section-6.5.4 | Row Not Found                 | None   |
| 429    | https://tools.ietf.org/html/rfc6585#section-4     | Too Many Requests             | None   |

## Response properties

See the [**query formatting**](/validator/api/query-formatting) section for how to transform the response, such as composing a JSON object (e.g., for ERC721 compliance).

## Example

```bash
curl -X GET https://testnets.tableland.network/api/v1/query?statement=select%20%2A%20from%20healthbot_80002_1 \
  -H 'Accept: application/json'
```

Or:

```bash
curl -L 'https://testnets.tableland.network/api/v1/query' \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "statement": "select * from healthbot_80002_1"
  }'
```

Returns a successful (200) response:

```json
[
  {
    "counter": 148247
  }
]
```
