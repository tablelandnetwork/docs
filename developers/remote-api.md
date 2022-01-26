---
description: API Reference for the core REST/JSON RPC API.
---

# Remote API

Dive into the specifics of each API endpoint by checking out our complete documentation.

## JSON-RPC

{% swagger method="post" path="/rpc" baseUrl="https://gateway.tableland.com" summary="Lets you interact with Tableland's JSON-RPC calls" %}
{% swagger-description %}
There are two available JSON-RPC methods: `createdTable` and `runSQL`.

The `createdTable` method allows you to create a table that was already minted.

The `runSQL` method allows you to run SQL statements on an existing table.
{% endswagger-description %}

{% swagger-parameter in="header" name="Authorization" required="true" %}
JWT Token
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Successful table creation" %}
```javascript
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "message": "Table created",
    "data": null
  }
}
```
{% endswagger-response %}

{% swagger-response status="200: OK" description="Successful SELECT executed" %}
```javascript
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "message": "Select executed",
    "data": {
      "columns": [
        {
          "name": "c1"
        },
        {
          "name": "c2"
        }
      ],
      "rows": [
        [
          "e11",
          "e12"
        ],
        [
          "e21",
          "e22"
        ]
      ]
    }
  }
}
```
{% endswagger-response %}
{% endswagger %}

### Request body for `createTable` method

```json
{
  "jsonrpc": "2.0",
  "method": "tableland_createTable",
  "id": 1,
  "params": {
    "tableId": "00000000-0000-0000-0000-000000000000",
    "type": "mytabletype",
    "controller": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "statement": "CREATE TABLE mytable (column_a int, column_b text);"
  }
}
```

### Request body for `runSQL` method

```json
{
  "jsonrpc": "2.0",
  "method": "tableland_runSQL",
  "id": 1,
  "params": {
    "tableId": "00000000-0000-0000-0000-000000000000",
    "controller": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "statement": "SELECT * FROM mytable;"
  }
}
```

## Tables

{% swagger src="../.gitbook/assets/tableland-openapi-spec.yaml" path="/tables/controller/{ethAddress}" method="get" %}
[tableland-openapi-spec.yaml](../.gitbook/assets/tableland-openapi-spec.yaml)
{% endswagger %}

{% swagger src="../.gitbook/assets/tableland-openapi-spec.yaml" path="/tables/{uuid}" method="get" %}
[tableland-openapi-spec.yaml](../.gitbook/assets/tableland-openapi-spec.yaml)
{% endswagger %}
