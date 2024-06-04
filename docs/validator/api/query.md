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
curl -X GET https://testnets.tableland.network/api/v1/query?format={objects|table}&extract={boolean}&unwrap={boolean}&statement={sql_select_statement}&params={parameter_value} \
  -H 'Accept: application/json'
```

For example, to query the `healthbot_80002_1` table with default formatting options:

```bash
curl -X GET https://testnets.tableland.network/api/v1/query?statement=select%20%2A%20from%20healthbot_80002_1 \
  -H 'Accept: application/json'
```

#### Parameter binding

GET requests can use the `params` query parameter to bind it to the statement. This involves using a `?` placeholder in the statement, which is replaced by the value of the `params` parameter. The example below has a statement `SELECT * FROM healthbot_80002_1 WHERE counter >= ?` and a `params` value of `1`:

```bash
curl -X GET https://testnets.tableland.network/api/v1/query?statement=select%20%2A%20from%20healthbot_80002_1%20where%20counter%20%3E=%20?%20&params=1
```

If you have _multiple_ parameters, you can attach them params as duplicate `params` keys, like `params=1&params='two'`.

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

#### Parameter binding

POST requests can also use the `params` query parameter to bind it to the statement. The `?` placeholder in the statement is replaced by the value of the `params` array, which is slightly different than the GET request and its multiple `params` keys.

```bash
curl -L 'https://testnets.tableland.network/api/v1/query' \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "statement": "select * from healthbot_80002_1 counter >= ?",
    "params": [1]
  }'
```

Thus, if you have multiple parameters, you can include them as array values, like `params: [1, 'two']`.

If you have _multiple_ parameters, you can attach multiple params, like `params=1&params='two'`.

## Parameters

| Name      | In    | Type                    | Required | Description                                                                                                      |
| --------- | ----- | ----------------------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
| statement | query | string                  | true     | The SQL read query statement                                                                                     |
| format    | query | string                  | false    | The requested response format: objects (array of objects) or table (object with columns and rows as properties). |
| extract   | query | boolean                 | false    | Whether to extract the JSON object from the single property of the surrounding JSON object.                      |
| unwrap    | query | boolean                 | false    | Whether to unwrap the returned JSON objects from their surrounding array.                                        |
| params    | query | number, string, boolean | false    | Parameters that get bound to the statement by replacing instances of `?` (in order)                              |

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
