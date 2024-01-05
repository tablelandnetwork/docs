---
title: Health
description: Check the status of the validator for if its healthy and running.
keywords:
  - rest api
  - gateway api
  - validator api
  - health
---

## Endpoint

`GET /health`

The following describes the usage with placeholder parameters on a testnet gateway URL:

```bash
curl -X GET https://testnets.tableland.network/api/v1/health \
  -H 'Accept: application/json'
```

## Responses

| Status | Meaning                                           | Description               | Schema |
| ------ | ------------------------------------------------- | ------------------------- | ------ |
| 200    | https://tools.ietf.org/html/rfc7231#section-6.3.1 | The validator is healthy. | None   |

This operation does not require authentication.

## Example

Returns a successful (200) response:

```bash
curl -X GET https://testnets.tableland.network/api/v1/health
```
