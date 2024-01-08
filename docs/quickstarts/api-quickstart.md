---
title: Gateway API quickstart
sidebar_label: Gateway API
description: Learn how to read table data or retrieve relevant validator information.
---

The Gateway API can be used to retrieve data stored in tables. Only reads are supported at the gateway, not creates nor writes. If you've followed one of the other quickstarts, you may have already created a table. Otherwise, you can use any created table on the network, such as the `healthbot` table that exists on each chain.

Be sure to use `https://tableland.network` on mainnets, `https://testnets.tableland.network` on testnets, and `http://localhost:8080` for local development (using Local Tableland).

## 1. Make a read query

All requests should be `GET` requests. Simply append a read query to the `/query` endpoint with a parameter of `statement`. For example, take `https://testnets.tableland.network/api/v1/query?statement=` plus a read query of `SELECT * FROM healthbot_{chainId}_1` (where `{chainId}` is the chain's ID).

You can use something like `curl` or `wget` to query table data or even copy/paste the [URL below in your browser](https://testnets.tableland.network/api/v1/query?statement=select%20%2A%20from%20healthbot_80001_1).

```bash
# Here, were making a query on healthbot_80001_1.
curl -X GET https://testnets.tableland.network/api/v1/query?statement=select%20%2A%20from%20healthbot_80001_1 \
  -H 'Accept: application/json'
```

This returns objects in an array—this table has a single row and column for a `counter`.

```json
[
  {
    "counter": 84742
  }
]
```

## 2. Format the query response

You can further transform this using additional query parameters like `format` (as `objects` or `table`), `extract` (a JSON object from a single response object), or `unwrap` (unwrap the returned JSON objects from the array).

```bash
# Add some additional query params
curl -X GET https://testnets.tableland.network/api/v1/query?statement=select%20%2A%20from%20healthbot_80001_1&format=objects&unwrap=true&extract=true \
  -H 'Accept: application/json'
```

Since a _single_ value was originally returned, this allows the extract + unwrap to be used and get the `counter`'s value.

```json
84742
```

:::note
For more information, you should check out the [query formatting](/validator/api/query-formatting) documentation, which walks through this in much greater detail—there are many other ways to alter the response!
:::

## 3. Get other table info

The `receipt` endpoint take a transaction hash parameter for a specific chain ID.

```bash
# You can also use wget
curl -X GET https://testnets.tableland.network/api/v1/receipt/80001/0x02f319429b8a7be1cbb492f0bfbf740d2472232a2edadde7df7c16c0b61aa78b \
  -H 'Accept: application/json'
```

It [returns onchain transaction information](https://testnets.tableland.network/api/v1/receipt/80001/0x02f319429b8a7be1cbb492f0bfbf740d2472232a2edadde7df7c16c0b61aa78b) about a table creation or mutation.

```json
{
  "table_ids": ["1"],
  "transaction_hash": "0x02f319429b8a7be1cbb492f0bfbf740d2472232a2edadde7df7c16c0b61aa78b",
  "block_number": 27055540,
  "chain_id": 80001
}
```

And you can retrieve table metadata using the `tables` endpoint.

```bash
# You can also use wget
curl -X GET https://testnets.tableland.network/api/v1/tables/80001/1 \
  -H 'Accept: application/json'
```

The response includes information like the table's schema, the table's data shown in the [Console](https://console.tableland.xyz/) (at the [`animation_url`](https://tables.testnets.tableland.xyz/80001/1.html)), date created, etc.

```json
{
  "name": "healthbot_80001_1",
  "external_url": "https://testnets.tableland.network/api/v1/tables/80001/1",
  "animation_url": "https://tables.testnets.tableland.xyz/80001/1.html",
  "image": "https://tables.testnets.tableland.xyz/80001/1.svg",
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

## 4. Get validator information

Check the node's `/health` (returns a `200` if everything is fine).

```shell
# You can also use wget
curl -X GET https://testnets.tableland.network/api/v1/health
```

Or the [version of the validator code](https://github.com/tablelandnetwork/go-tableland/commits/main) that the node is running.

```bash
# You can also use wget
curl -X GET https://testnets.tableland.network/api/v1/version \
  -H 'Accept: application/json'
```

```json
{
  "git_commit": "6a39612",
  "git_branch": "HEAD",
  "git_state": "clean",
  "git_summary": "v1.0.1-beta-5-12-g6a39612",
  "build_date": "2023-03-01T12:36:29Z",
  "binary_version": "git"
}
```
