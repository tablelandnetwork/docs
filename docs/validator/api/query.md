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

`GET /query`

The following describes the usage with placeholder parameters on a testnet gateway URL:

```bash
curl -X GET https://testnets.tableland.network/api/v1/query?format={objects|table}&extract={boolean}&unwrap={boolean}&statement={sql_select_statement} \
  -H 'Accept: application/json'
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
curl -X GET https://testnets.tableland.network/api/v1/query?statement=select%20%2A%20from%20healthbot_80001_1 \
  -H 'Accept: application/json'
```

Returns a successful (200) response:

```json
[
  {
    "counter": 148247
  }
]
```
