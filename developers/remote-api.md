---
description: API Reference for the core REST/JSON RPC API.
---

# Remote API

Each Tableland validator provides a simple JSON RPC 2.0 API and REST API to interact with the Tableland network. These API methods are used under the hood by the Javascript SDK. The API surface is purposefully small, but enables tons of flexibility once you start utilizing the power of SQL statements.

## RPC API

### Setup

There are just a few setup steps required before making RPC calls. Firstly, since all Tableland API calls are "gated" by Ethereum address, you'll need to request access as mentioned in our [quick-start.md](quick-start.md "mention") guide. One you have registered your ETH address, you'll need to generate a self-signed JWT token. This is done automatically when using the Javascript SDK via a browser app, however, for interacting directly with the JSON RPC APIs, you'll need to create one manually.

{% hint style="danger" %}
This hasn't been flushed out yet, so we'll have to come back to this later.
{% endhint %}

With a JWT token in hand and access granted via Discord, you are ready to start making RPC calls. The following settings are needed when interacting with the Tableland network RPC APIs.

#### Settings

For now, the following HTTP settings are all you need to interact with the JSON-RPC APIs:

* `POST` for all methods
* `JSON RPC 2.0`
* `id: "dontcare"` (i.e., doesn't really matter)
* endpoint URL: `https://testnet.tableland.network/rpc`.

#### Postman

An easy way to test the examples below, would be to use an API request tool such as [Postman](https://www.postman.com). You will only need to configure a few things. First, you'll need to make sure you add a header with a key of `Content-Type` and value of `application/json`. Additionally, you'll need to create a self-signed JWT using the address you wish to use to interact with the Tableland network. Next, you'll need to select the `Body` tab and choose the `raw` radio button and ensure `JSON` is the selected format. Lastly, just copy/paste the `JSON object` example snippets below into the `body` of your request, on Postman, and click `send`.

#### HTTPie

If you prefer to use a command line interface, we have provided RPC examples you can use with [HTTPie](https://httpie.org). Please note that params take either an object or array passed as a string.

```
http post https://testnet.tabeland.network/rpc \
    jsonrpc=2.0 id=1 method=tableland_runSQL params:='[]'
```

### Endpoint

The core RPC API is available via the following endpoint. There are currently only two RPC methods available, `createTable` and `runSQL`. The `createdTable` method allows you to create a table that has already been minted in the on-chain registry. The `runSQL` method allows you to run SQL statements on an existing table.

{% swagger src="../.gitbook/assets/tableland-openapi-spec.yaml" path="/rpc" method="post" %}
[tableland-openapi-spec.yaml](../.gitbook/assets/tableland-openapi-spec.yaml)
{% endswagger %}

### Creating Tables

Like most relational database systems, Tableland requires the user to create tables for storing, querying, and relating data. See [#creating-tables](javascript-sdk.md#creating-tables "mention") in the [javascript-sdk.md](javascript-sdk.md "mention") docs for details on `CREATE` requirements.

#### tableland\_ceateTable

| param      | type                 |
| ---------- | -------------------- |
| tableId    | uuid string          |
| type       | string               |
| controller | eth address string   |
| statement  | sql statement string |

{% tabs %}
{% tab title="JSON" %}
```json
{
  "jsonrpc": "2.0",
  "method": "tableland_createTable",
  "id": 1,
  "params": {
    "tableId": "d9163b48-670f-4549-813a-6f66888bc1fb",
    "type": "mytabletype",
    "controller": "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E",
    "statement": "CREATE TABLE mytable (column_a int, column_b text);"
  }
}
```
{% endtab %}

{% tab title="httpie" %}
```bash
https -A bearer -a token post https://testnet.tableland.network/rpc \
  jsonrpc=2.0 id=1 method=tableland_createTable \
  params:='[{
    "tableId": "d9163b48-670f-4549-813a-6f66888bc1fb",
    "type": "mytabletype",
    "controller": "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E",
    "statement": "CREATE TABLE mytable (column_a int, column_b text);"
  }]'
```
{% endtab %}

{% tab title="curl" %}
```
curl --location --request POST 'https://testnet.tableland.network/rpc' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer token' \
--data-raw '{
    "jsonrpc": "2.0", 
    "method": "tableland_createTable", 
    "id" : 1,
    "params": [{
        "tableId": "d9163b48-670f-4549-813a-6f66888bc1fb",
        "type": "mytabletype",
        "controller": "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E",
        "statement": "CREATE TABLE mytable (column_a int, column_b text);"
    }]
}'
```
{% endtab %}
{% endtabs %}

<details>

<summary>Example Response</summary>

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "result": {
    "message": "Table created",
    "data": null
  }
}
```

</details>

### Running SQL

Now that we have a table to work with, it is easy to use vanilla SQL statements to insert new rows, update existing rows, delete old rows, and even query the whole thing! See [#mutating-tables](javascript-sdk.md#mutating-tables "mention") and [#querying-tables](javascript-sdk.md#querying-tables "mention") from the [javascript-sdk.md](javascript-sdk.md "mention") docs for further details.

#### tableland\_runSQL

| param      | type                 |
| ---------- | -------------------- |
| tableId    | uuid string          |
| controller | eth address string   |
| statement  | sql statement string |

{% tabs %}
{% tab title="JSON" %}
```json
{
  "jsonrpc": "2.0",
  "method": "tableland_runSQL",
  "id": 1,
  "params": {
    "tableId": "d9163b48-670f-4549-813a-6f66888bc1fb",
    "controller": "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E",
    "statement": "SELECT * FROM mytable;"
  }
}
```
{% endtab %}

{% tab title="httpie" %}
```bash
https -A bearer -a token post https://testnet.tableland.network/rpc \
  jsonrpc=2.0 id=1 method=tableland_runSQL \
  params:='[{
    "tableId": "d9163b48-670f-4549-813a-6f66888bc1fb",
    "controller": "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E",
    "statement": "SELECT * FROM mytable;"
  }]'
```
{% endtab %}

{% tab title="curl" %}
```
curl --location --request POST 'https://testnet.tableland.network/rpc' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer token' \
--data-raw '{
    "jsonrpc": "2.0", 
    "method": "tableland_runSQL", 
    "id" : 1,
    "params": [{
        "tableId": "d9163b48-670f-4549-813a-6f66888bc1fb",
        "controller": "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E",
        "statement": "SELECT * FROM mytable;"
    }]
}'
```
{% endtab %}
{% endtabs %}

<details>

<summary>Example Response</summary>

```json
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

</details>

### Errors

What could possibly go wrong?! When RPC API requests fail, the RPC server returns a structured error response with a limited number of well-defined error variants, so client code can exhaustively handle all the possible error cases.

## REST API

There are a few additional REST APIs that can be used to discover tables controlled by a given Ethereum address, and to retreive the metadata information for a given table. Table metadata is [ERC-721 compliant](https://eips.ethereum.org/EIPS/eip-721), allowing tables to be treated like NFTs.

{% swagger src="../.gitbook/assets/tableland-openapi-spec.yaml" path="/tables/controller/{ethAddress}" method="get" %}
[tableland-openapi-spec.yaml](../.gitbook/assets/tableland-openapi-spec.yaml)
{% endswagger %}

{% swagger src="../.gitbook/assets/tableland-openapi-spec.yaml" path="/tables/{uuid}" method="get" %}
[tableland-openapi-spec.yaml](../.gitbook/assets/tableland-openapi-spec.yaml)
{% endswagger %}

These two RESTful APIs provide useful features to app builders looking to provide table discovery features, or to allow a user to explore and interact with tables they previously created. These APIs are _not_ gated, and can be called directly from any HTTP-enabled tool. See [#listing-tables](javascript-sdk.md#listing-tables "mention") in the [javascript-sdk.md](javascript-sdk.md "mention") docs for further details.

{% tabs %}
{% tab title="httpie" %}
Since these are `GET` methods, the httpie call is simple. We're using a test address here.

```
http --print=b https://testnet.tableland.network/tables/controller/0xbDA5747bFD65F08deb54cb465eB87D40e51B197E
```
{% endtab %}

{% tab title="curl" %}
Here we're piping the `curl` output to [`jq` for pretty printing](https://stedolan.github.io/jq/).

```
curl -s https://testnet.tableland.network/tables/controller/0xbDA5747bFD65F08deb54cb465eB87D40e51B197E | jq
```
{% endtab %}
{% endtabs %}

Now you know everything you need to know to interact with the low-level REST and RPC APIs provided by the Tableland network. Next, take a look at our [demos-and-examples.md](demos-and-examples.md "mention"), just start building your own application. While you're at it, jump over to our community resources and let us konw what you're up to!

{% content-ref url="../general/community/" %}
[community](../general/community/)
{% endcontent-ref %}

{% hint style="success" %}
Some of the above content is borrowed from the excellent NEAR RPC docs ([https://docs.near.org/docs/api/rpc](https://docs.near.org/docs/api/rpc)). Big thanks to the NEAR team :pray:!
{% endhint %}
