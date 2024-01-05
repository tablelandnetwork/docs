---
title: Version
description: Returns version information about the validator daemon.
keywords:
  - rest api
  - gateway api
  - validator api
  - version
---

## Endpoint

`GET /version`

The following describes the usage with placeholder parameters on a testnet gateway URL:

```bash
curl -X GET https://testnets.tableland.network/api/v1/version \
  -H 'Accept: application/json'
```

## Responses

| Status | Meaning                                           | Description          | Schema      |
| ------ | ------------------------------------------------- | -------------------- | ----------- |
| 200    | https://tools.ietf.org/html/rfc7231#section-6.3.1 | successful operation | VersionInfo |

This operation does not require authentication.

## Response properties

| Name           | Type   | Required | Restrictions | Description |
| -------------- | ------ | -------- | ------------ | ----------- |
| git_commit     | string | false    | none         | none        |
| git_branch     | string | false    | none         | none        |
| git_state      | string | false    | none         | none        |
| git_summary    | string | false    | none         | none        |
| build_date     | string | false    | none         | none        |
| binary_version | string | false    | none         | none        |

## Example

```bash
curl -X GET https://testnets.tableland.network/api/v1/version \
  -H 'Accept: application/json'
```

Returns a successful (200) response:

```json
{
  "git_commit": "c9a7e8d",
  "git_branch": "HEAD",
  "git_state": "clean",
  "git_summary": "v1.9.1-2-gc9a7e8d",
  "build_date": "2023-11-28T18:55:34Z",
  "binary_version": "git"
}
```
