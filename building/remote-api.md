---
description: API Reference for the core REST/JSON RPC API.
---

# Remote API

Each Tableland Validator provides a simple JSON RPC 2.0 API and REST API to interact with the Tableland network. These API methods are used under the hood by the Javascript SDK. The API surface is purposefully small, but enables tons of flexibility once you start utilizing the power of SQL statements.

## RPC API

### Setup

There are just a few setup steps required before making RPC calls. Firstly, since all Tableland API calls are "gated" by Wallet address, you'll need to request access as mentioned in Quick Start guide.

{% content-ref url="quick-start.md" %}
[quick-start.md](quick-start.md)
{% endcontent-ref %}

One you have registered your ETH address, you'll need to generate a Sign In With Ethereum (SIWE) token. This is done automatically when using the [javascript-sdk.md](javascript-sdk.md "mention") via a browser that has an integrated Wallet, e.g. [Brave](https://brave.com/) or [Metamask](https://metamask.io)). For interacting _directly_ with the JSON RPC API via the CLI, you'll need to create one "manually" and include it with all API calls.&#x20;

The following [codepen.io demo](https://codepen.io/carsonfarmer/pen/zYPBVbO) can be used to generate a SIWE token using a Wallet-enabled browser. Simply run the demo and select the output token text. This can then be set on the CLI to be included in all RPC calls (see below).

{% embed url="https://codepen.io/asutula/pen/dyZJeKV" %}

With a SIWE token in hand (and access already granted via Discord), you are ready to start making RPC calls. The following settings are needed when interacting with the Tableland network RPC APIs.&#x20;

#### Settings

For now, the following HTTP settings are all you need to interact with the JSON-RPC APIs:

* `POST` for all methods
* `JSON RPC 2.0`
* `id: 1`  (doesn't really matter)
* endpoint URL: `https://testnet.tableland.network/rpc`.

{% hint style="info" %}
It may be useful to create a local environment variable to avoid pasting the above SIWE token in all CLI commands. Copy the previously generated token and create an env var called `TOKEN` (the examples below assume the token string has been exported as `TOKEN`): `export TOKEN=<generated.token.string>`
{% endhint %}

#### Postman

An easy way to test the examples below would be to use an API request tool such as [Postman](https://www.postman.com). You will only need to configure a few things. First, you'll need to make sure you [add a header](https://learning.postman.com/docs/sending-requests/requests/#configuring-request-headers) with a key of `Content-Type` and value of `application/json`. Additionally, you'll need to take the SIWE token you created previously, and [set this as a Bearer token](https://learning.postman.com/docs/sending-requests/authorization/#bearer-token). Next, you'll need to select the `Body` tab and choose the `raw` radio button and ensure `JSON` is the selected format. Lastly, just copy/paste the `JSON object` example snippets below into the `body` of your request on Postman, and click `send`.

#### HTTPie

If you prefer to use a command line interface, we have provided RPC examples you can use with [HTTPie](https://httpie.org) (and [cURL](https://curl.se)). Please note that params take either an object or array passed as a string.

```
https -A bearer -a $TOKEN post https://testnet.tabeland.network/rpc \
    jsonrpc=2.0 id=1 method=tableland_runSQL params:='[]'
```

### Endpoint

The core RPC API is available via the following endpoint. All RPC calls expect an Authorization header value with a signed SIWE message. There are four available JSON-RPC methods:
 - The `tableland_validateCreateTable` method allows you validate a CREATE TABLE query as a pre-mint check, and also calculate its corresponding structure hash.
 - The `tableland_runSQL` method allows you to rely on the validator to send a runSQL SC call on your behalf for write-queries. For read-queries, it will return the query result.
 - The `tableland_getReceipt` method allows you to get the receipt of a chain transaction to know if it was executed, and the execution details.
 - The `tableland_setController` method allows you to rely on the validator to send a setController SC call on your behalf for a table.

{% swagger src="../.gitbook/assets/tableland-openapi-spec.yaml" path="/rpc" method="post" %}
[tableland-openapi-spec.yaml](../.gitbook/assets/tableland-openapi-spec.yaml)
{% endswagger %}

### Creating Tables Directly

Like most relational database systems, Tableland requires the user to create tables for storing, querying, and relating data. See [#creating-tables](javascript-sdk.md#creating-tables "mention") in the [javascript-sdk.md](javascript-sdk.md "mention") docs for more details on `CREATE` requirements.
Creating a table directly is an advanced technique and almost all users will want to use the SDK or a cli of some kind. The actual creation of a table is done by first calling the Tableland table registry Smart Contract's [`createTable`](https://github.com/tablelandnetwork/eth-tableland/tree/main/contracts) function with the address of the new table's owner, and the create table SQL statement that should be used to create the table.  There is a lot to unpack in that sentance, so let's think about a few things:

1. In a very similar manner to minting a standard ERC-721 token (NFT) you must specify the addres that will own the table/token, and that does not need to be your address.  If you acidentally put the wrong address in you will have given the table to someone else and you will have no way to recover it, without agreement from the new owner.
2. The create table SQL statement you send cannot and will not be validated in the Smart Contract code.  This means if you send an invalid statement you will pay for the transaction, but no table will be created because the outcome of running the statement in the validator will be an error.

So let's now assume that you made a call to the Tableland registry contract with your address and a valid create table SQL statement. The response to this will include information about the transaction.  Within that info you will see a transaction hash, which you can then use to ask a Validator to see the result of executing the transaction via the `tableland_getReceipt` RPC method.  Assuming the table has been created by the validator you will see a response body with data similar to below:

```
chain_id: 4
txn_hash: "0xc3e7d1e81b59556f414a5f5c23760eb61b4bfaa18150d924d7d3b334941dbecd"
block_number: 1000
error: ""
table_id: 102
```

If the `error` field has a value that means that there was an error processing your transaction.  The error string will be a en-us human readable explanation of the failure.

{% hint style="info" %}
Minting a `TABLE` directly via the [Tableland Tables Registry](https://rinkeby.etherscan.io/token/0x30867AD98A520287CCc28Cde70fCF63E3Cdb9c3C) is made much easier via the [javascript SDK](javascript-sdk.md "mention")
{% endhint %}

### Running SQL

Now that we have a table to work with, it is easy to use vanilla SQL statements to insert new rows, update existing rows, delete old rows, and even query the whole thing! See [#mutating-tables](javascript-sdk.md#mutating-tables "mention") and [#querying-tables](javascript-sdk.md#querying-tables "mention") from the [javascript-sdk.md](javascript-sdk.md "mention") docs for further details. A key thing to keep in mind when working with tables is that you must specify the table's full name which is the table name from the create statement combined with the chain ID and the table_id separated by an underscore. So if your create statement is `CREATE TABLE mytable (a int);`, the chain ID is `4`, and your table_id is `102`, then the full table name is `mytable_4_102`


#### tableland\_runSQL

| param      | type                 |
| ---------- | -------------------- |
| controller | eth address string   |
| statement  | sql statement string |

{% tabs %}
{% tab title="JSON" %}
```json
{
  "jsonrpc": "2.0",
  "method": "tableland_runSQL",
  "id": 1,
  "params": [{
    "statement": "SELECT * FROM myname_0;"
  }]
}
```
{% endtab %}

{% tab title="httpie" %}
```bash
https -A bearer -a $TOKEN post https://testnet.tableland.network/rpc \
  jsonrpc=2.0 id=1 method=tableland_runSQL \
  params:='[{
    "statement": "SELECT * FROM myname_0;"
  }]'
```
{% endtab %}

{% tab title="curl" %}
```
curl --location --request POST 'https://testnet.tableland.network/rpc' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer '"$TOKEN"'' \
--data-raw '{
    "jsonrpc": "2.0", 
    "method": "tableland_runSQL", 
    "id" : 1,
    "params": [{
        "statement": "SELECT * FROM myname_0;"
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
    "data": {
      "columns": [
        {
          "name": "column_a"
        },
        {
          "name": "column_b"
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

There are a few additional REST APIs that can be used to discover tables controlled by a given address on a given chain, and to retreive the metadata information for a given table. Table metadata is [ERC-721 compliant](https://eips.ethereum.org/EIPS/eip-721), allowing tables to be treated like NFTs.

{% swagger src="../.gitbook/assets/tableland-openapi-spec.yaml" path="/chain/{chainId}/tables/controller/{ethAddress}" method="get" %}
[tableland-openapi-spec.yaml](../.gitbook/assets/tableland-openapi-spec.yaml)
{% endswagger %}

{% swagger src="../.gitbook/assets/tableland-openapi-spec.yaml" path="/chain/{chainId}/tables/{id}" method="get" %}
[tableland-openapi-spec.yaml](../.gitbook/assets/tableland-openapi-spec.yaml)
{% endswagger %}

These two RESTful APIs provide useful features to app builders looking to provide table discovery features, or to allow a user to explore and interact with tables they previously created. These APIs are _not_ gated, and can be called directly from any HTTP-enabled tool. See [#listing-tables](javascript-sdk.md#listing-tables "mention") in the [javascript-sdk.md](javascript-sdk.md "mention") docs for further details.

{% tabs %}
{% tab title="httpie" %}
Since these are `GET` methods, the httpie call is simple. We're using a test address here.

```
http --print=b https://testnet.tableland.network/chain/{chainId}/tables/controller/0xbAb12215Ed94713A290e0c618fa8177fAb5eFd2D
```
{% endtab %}

{% tab title="curl" %}
Here we're piping the `curl` output to [`jq` for pretty printing](https://stedolan.github.io/jq/).

```
curl -s https://testnet.tableland.network/chain/{chainId}/tables/controller/0xbAb12215Ed94713A290e0c618fa8177fAb5eFd2D | jq
```
{% endtab %}
{% endtabs %}

Now you know everything you need to know to interact with the low-level REST and RPC APIs provided by the Tableland network. Next, take a look at our [examples](examples/ "mention"), just start building your own application. While you're at it, jump over to our community resources and let us konw what you're up to!

{% content-ref url="../general/community/" %}
[community](../general/community/)
{% endcontent-ref %}
