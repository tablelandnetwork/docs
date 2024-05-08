---
title: Receipt
description: Returns the status of a given transaction receipt by hash
keywords:
  - rest api
  - gateway api
  - validator api
  - receipt
---

## Endpoint

`GET /receipt/{chainId}/{transactionHash}`

The following describes the usage with placeholder parameters on a testnet gateway URL:

```bash
curl -X GET https://testnets.tableland.network/api/v1/receipt/{chainId}/{transactionHash} \
  -H 'Accept: application/json'
```

## Parameters

| Name            | In   | Type           | Required | Description                     |
| --------------- | ---- | -------------- | -------- | ------------------------------- |
| chainId         | path | integer(int32) | true     | The parent chain to target      |
| transactionHash | path | string         | true     | The transaction hash to request |

## Responses

| Status | Meaning                                           | Description                                         | Schema             |
| ------ | ------------------------------------------------- | --------------------------------------------------- | ------------------ |
| 200    | https://tools.ietf.org/html/rfc7231#section-6.3.1 | successful operation                                | TransactionReceipt |
| 400    | https://tools.ietf.org/html/rfc7231#section-6.5.1 | Invalid chain identifier or transaction hash format | None               |
| 404    | https://tools.ietf.org/html/rfc7231#section-6.5.4 | No transaction receipt found with the provided hash | None               |
| 429    | https://tools.ietf.org/html/rfc6585#section-4     | Too Many Requests                                   | None               |

This operation does not require authentication

## Response properties

| Name             | Type           | Required | Restrictions | Description              |
| ---------------- | -------------- | -------- | ------------ | ------------------------ |
| table_id         | string         | false    | none         | This field is deprecated |
| table_ids        | \[string\]     | false    | none         | none                     |
| transaction_hash | string         | false    | none         | none                     |
| block_number     | integer(int64) | false    | none         | none                     |
| chain_id         | integer(int32) | false    | none         | none                     |
| error            | string         | false    | none         | none                     |
| error_event_idx  | integer(int32) | false    | none         | none                     |

## Example

```bash
curl -X GET https://testnets.tableland.network/api/v1/receipt/80002/0x02f319429b8a7be1cbb492f0bfbf740d2472232a2edadde7df7c16c0b61aa78b \
  -H 'Accept: application/json'
```

Returns a successful (200) response:

```json
{
  "table_id": "1",
  "table_ids": ["1"],
  "transaction_hash": "0x02f319429b8a7be1cbb492f0bfbf740d2472232a2edadde7df7c16c0b61aa78b",
  "block_number": 27055540,
  "chain_id": 80002
}
```
