<!-- Generator: Widdershins v4.0.1 -->

<h1 id="tableland-validator-openapi-3-0">Tableland Validator - OpenAPI 3.0 v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

In Tableland, Validators are the execution unit/actors of the protocol.
They have the following responsibilities:
- Listen to on-chain events to materialize Tableland-compliant SQL queries in a database engine (currently, SQLite by default).
- Serve read-queries (e.g: SELECT * FROM foo_69_1) to the external world.
- Serve state queries (e.g. list tables, get receipts, etc) to the external world.

In the 1.0.0 release of the Tableland Validator API, we've switched to a design first approach!
You can now help us improve the API whether it's by making changes to the definition itself or to the code.
That way, with time, we can improve the API in general, and expose some of the new features in OAS3.

Base URLs:

* <a href="https://testnets.tableland.xyz/api/v1">https://testnets.tableland.xyz/api/v1</a>

<a href="http://docs.tableland.xyz">Terms of service</a>
Email: <a href="mailto:carson@textile.io">core devs</a> 
License: <a href="http://www.apache.org/licenses/LICENSE-2.0.html">Apache 2.0</a>

<h1 id="tableland-validator-openapi-3-0-query">query</h1>

Query the Tableland network

<a href="http://docs.tableland.xyz">Find out more about queries</a>

## queryFromQuery

<a id="opIdqueryFromQuery"></a>

> Code samples

```javascript
fetch("https://testnets.tableland.xyz/api/v1/query?statement=string", {
  "method": "GET",
  "headers": {
    "Accept": "application/json"
  }
})
.then(response => {
  console.log(response);
})
.catch(err => {
  console.error(err);
});
```

```javascript--node
const http = require("https");

const options = {
  "method": "GET",
  "hostname": "testnets.tableland.xyz",
  "port": null,
  "path": "/api/v1/query?statement=string",
  "headers": {
    "Accept": "application/json"
  }
};

const req = http.request(options, function (res) {
  const chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    const body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.end();
```

```go
package main

import (
	"fmt"
	"net/http"
	"io/ioutil"
)

func main() {

	url := "https://testnets.tableland.xyz/api/v1/query?statement=string"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Accept", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```shell
curl --request GET \
  --url 'https://testnets.tableland.xyz/api/v1/query?statement=string' \
  --header 'Accept: application/json'
```

`GET /query`

*Query the Tableland network*

Returns the results of a SQL read query against the Tabeland network

<h3 id="queryfromquery-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|statement|query|string|true|The SQL read query statement|
|format|query|string|false|The requested response format:|
|extract|query|boolean|false|Whether to extract the JSON object from the single property of the surrounding JSON object.|
|unwrap|query|boolean|false|Whether to unwrap the returned JSON objects from their surrounding array.|

#### Detailed descriptions

**format**: The requested response format:
 * `objects` - Returns the query results as a JSON array of JSON objects.
 * `table` - Return the query results as a JSON object with columns and rows properties.

#### Enumerated Values

|Parameter|Value|
|---|---|
|format|objects|
|format|table|

> Example responses

> 200 Response

```json
{}
```

<h3 id="queryfromquery-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful operation|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid query/statement value|None|

<h3 id="queryfromquery-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="tableland-validator-openapi-3-0-receipt">receipt</h1>

Get information about transaction progress

<a href="http://docs.tableland.xyz">Find out more about receipts</a>

## receiptByTransactionHash

<a id="opIdreceiptByTransactionHash"></a>

> Code samples

```javascript
fetch("https://testnets.tableland.xyz/api/v1/receipt/0/string", {
  "method": "GET",
  "headers": {
    "Accept": "application/json"
  }
})
.then(response => {
  console.log(response);
})
.catch(err => {
  console.error(err);
});
```

```javascript--node
const http = require("https");

const options = {
  "method": "GET",
  "hostname": "testnets.tableland.xyz",
  "port": null,
  "path": "/api/v1/receipt/0/string",
  "headers": {
    "Accept": "application/json"
  }
};

const req = http.request(options, function (res) {
  const chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    const body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.end();
```

```go
package main

import (
	"fmt"
	"net/http"
	"io/ioutil"
)

func main() {

	url := "https://testnets.tableland.xyz/api/v1/receipt/0/string"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Accept", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```shell
curl --request GET \
  --url https://testnets.tableland.xyz/api/v1/receipt/0/string \
  --header 'Accept: application/json'
```

`GET /receipt/{chainId}/{transactionHash}`

*Query the Tableland network for transaction status*

Returns the status of a given transaction receipt by hash

<h3 id="receiptbytransactionhash-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|chainId|path|integer(int32)|true|The parent chain to target|
|transactionHash|path|string|true|The transaction hash to request|

> Example responses

> 200 Response

```json
{
  "table_id": "healthbot_5_1",
  "transaction_hash": "0x400508d7cc035b14cc53f64393a8dafcc55f66ad8f9b44d626744157337e2098",
  "block_number": 1,
  "chain_id": 80001,
  "error": "The query statement is invalid",
  "error_event_idx": 1
}
```

<h3 id="receiptbytransactionhash-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|[TransactionReceipt](#schematransactionreceipt)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid chain identifier or transaction hash format|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not transaction receipt found with the provided hash|None|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="tableland-validator-openapi-3-0-tables">tables</h1>

Access to table information

<a href="http://docs.tableland.xyz">Find out more about tables</a>

## getTableById

<a id="opIdgetTableById"></a>

> Code samples

```javascript
fetch("https://testnets.tableland.xyz/api/v1/tables/0/0", {
  "method": "GET",
  "headers": {
    "Accept": "application/json"
  }
})
.then(response => {
  console.log(response);
})
.catch(err => {
  console.error(err);
});
```

```javascript--node
const http = require("https");

const options = {
  "method": "GET",
  "hostname": "testnets.tableland.xyz",
  "port": null,
  "path": "/api/v1/tables/0/0",
  "headers": {
    "Accept": "application/json"
  }
};

const req = http.request(options, function (res) {
  const chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    const body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.end();
```

```go
package main

import (
	"fmt"
	"net/http"
	"io/ioutil"
)

func main() {

	url := "https://testnets.tableland.xyz/api/v1/tables/0/0"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Accept", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```shell
curl --request GET \
  --url https://testnets.tableland.xyz/api/v1/tables/0/0 \
  --header 'Accept: application/json'
```

`GET /tables/{chainId}/{tableId}`

*Get information about a table*

Returns information about a single table, including schema information

<h3 id="gettablebyid-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|chainId|path|integer(int32)|true|The parent chain to target|
|tableId|path|integer(int64)|true|Table identifier|

> Example responses

> 200 Response

```json
{
  "name": "healthbot_5_1",
  "external_url": "https://testnet.tableland.network/tables/healthbot_5_1",
  "animation_url": "https://render.tableland.xyz/anim/?chain=1&id=1",
  "image": "https://render.tableland.xyz/healthbot_5_1",
  "attributes": {
    "display_type": "date",
    "trait_type": "created",
    "value": 1657113720
  },
  "schema": {
    "columns": [
      {
        "name": "id",
        "type": "integer",
        "constraints": [
          "NOT NULL",
          "PRIMARY KEY",
          "UNIQUE"
        ]
      }
    ],
    "table_constraints": [
      "PRIMARY KEY (id)"
    ]
  }
}
```

<h3 id="gettablebyid-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|[Table](#schematable)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid chain or table identifier|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Table not found|None|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="tableland-validator-openapi-3-0-health">health</h1>

## health

<a id="opIdhealth"></a>

> Code samples

```javascript
fetch("https://testnets.tableland.xyz/api/v1/health", {
  "method": "GET",
  "headers": {}
})
.then(response => {
  console.log(response);
})
.catch(err => {
  console.error(err);
});
```

```javascript--node
const http = require("https");

const options = {
  "method": "GET",
  "hostname": "testnets.tableland.xyz",
  "port": null,
  "path": "/api/v1/health",
  "headers": {}
};

const req = http.request(options, function (res) {
  const chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    const body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.end();
```

```go
package main

import (
	"fmt"
	"net/http"
	"io/ioutil"
)

func main() {

	url := "https://testnets.tableland.xyz/api/v1/health"

	req, _ := http.NewRequest("GET", url, nil)

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```shell
curl --request GET \
  --url https://testnets.tableland.xyz/api/v1/health
```

`GET /health`

*Returns OK if the validator considers itself healthy.*

Returns OK if the validator considers itself healthy.

<h3 id="health-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|The validator is healthy.|None|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="tableland-validator-openapi-3-0-version">version</h1>

## version

<a id="opIdversion"></a>

> Code samples

```javascript
fetch("https://testnets.tableland.xyz/api/v1/version", {
  "method": "GET",
  "headers": {
    "Accept": "application/json"
  }
})
.then(response => {
  console.log(response);
})
.catch(err => {
  console.error(err);
});
```

```javascript--node
const http = require("https");

const options = {
  "method": "GET",
  "hostname": "testnets.tableland.xyz",
  "port": null,
  "path": "/api/v1/version",
  "headers": {
    "Accept": "application/json"
  }
};

const req = http.request(options, function (res) {
  const chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    const body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.end();
```

```go
package main

import (
	"fmt"
	"net/http"
	"io/ioutil"
)

func main() {

	url := "https://testnets.tableland.xyz/api/v1/version"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Accept", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```shell
curl --request GET \
  --url https://testnets.tableland.xyz/api/v1/version \
  --header 'Accept: application/json'
```

`GET /version`

*Returns version information about the validator daemon.*

Returns version information about the validator daemon.

> Example responses

> 200 Response

```json
{
  "version": 0,
  "git_commit": "79688910d4689dcc0991a0d8eb9d988200586d8f",
  "git_branch": "foo/experimentalfeature",
  "git_state": "dirty",
  "git_summary": "v1.2.3_dirty",
  "build_date": "2022-11-29T16:28:04Z",
  "binary_version": "v1.0.1"
}
```

<h3 id="version-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|[VersionInfo](#schemaversioninfo)|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_Table">Table</h2>
<!-- backwards compatibility -->
<a id="schematable"></a>
<a id="schema_Table"></a>
<a id="tocStable"></a>
<a id="tocstable"></a>

```json
{
  "name": "healthbot_5_1",
  "external_url": "https://testnet.tableland.network/tables/healthbot_5_1",
  "animation_url": "https://render.tableland.xyz/anim/?chain=1&id=1",
  "image": "https://render.tableland.xyz/healthbot_5_1",
  "attributes": {
    "display_type": "date",
    "trait_type": "created",
    "value": 1657113720
  },
  "schema": {
    "columns": [
      {
        "name": "id",
        "type": "integer",
        "constraints": [
          "NOT NULL",
          "PRIMARY KEY",
          "UNIQUE"
        ]
      }
    ],
    "table_constraints": [
      "PRIMARY KEY (id)"
    ]
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|false|none|none|
|external_url|string|false|none|none|
|animation_url|string|false|none|none|
|image|string|false|none|none|
|attributes|[object]|false|none|none|
|» display_type|string|false|none|The display type for marketplaces|
|» trait_type|string|false|none|The trait type for marketplaces|
|» value|object|false|none|The value of the property|

oneOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|string|false|none|none|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|number|false|none|none|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|integer|false|none|none|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|boolean|false|none|none|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|object|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|schema|[Schema](#schemaschema)|false|none|none|

<h2 id="tocS_TransactionReceipt">TransactionReceipt</h2>
<!-- backwards compatibility -->
<a id="schematransactionreceipt"></a>
<a id="schema_TransactionReceipt"></a>
<a id="tocStransactionreceipt"></a>
<a id="tocstransactionreceipt"></a>

```json
{
  "table_id": "healthbot_5_1",
  "transaction_hash": "0x400508d7cc035b14cc53f64393a8dafcc55f66ad8f9b44d626744157337e2098",
  "block_number": 1,
  "chain_id": 80001,
  "error": "The query statement is invalid",
  "error_event_idx": 1
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|table_id|string|false|none|none|
|transaction_hash|string|false|none|none|
|block_number|integer(int64)|false|none|none|
|chain_id|integer(int32)|false|none|none|
|error|string|false|none|none|
|error_event_idx|integer(int32)|false|none|none|

<h2 id="tocS_Schema">Schema</h2>
<!-- backwards compatibility -->
<a id="schemaschema"></a>
<a id="schema_Schema"></a>
<a id="tocSschema"></a>
<a id="tocsschema"></a>

```json
{
  "columns": [
    {
      "name": "id",
      "type": "integer",
      "constraints": [
        "NOT NULL",
        "PRIMARY KEY",
        "UNIQUE"
      ]
    }
  ],
  "table_constraints": [
    "PRIMARY KEY (id)"
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|columns|[[Column](#schemacolumn)]|false|none|none|
|table_constraints|[string]|false|none|none|

<h2 id="tocS_Column">Column</h2>
<!-- backwards compatibility -->
<a id="schemacolumn"></a>
<a id="schema_Column"></a>
<a id="tocScolumn"></a>
<a id="tocscolumn"></a>

```json
{
  "name": "id",
  "type": "integer",
  "constraints": [
    "NOT NULL",
    "PRIMARY KEY",
    "UNIQUE"
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|false|none|none|
|type|string|false|none|none|
|constraints|[string]|false|none|none|

<h2 id="tocS_VersionInfo">VersionInfo</h2>
<!-- backwards compatibility -->
<a id="schemaversioninfo"></a>
<a id="schema_VersionInfo"></a>
<a id="tocSversioninfo"></a>
<a id="tocsversioninfo"></a>

```json
{
  "version": 0,
  "git_commit": "79688910d4689dcc0991a0d8eb9d988200586d8f",
  "git_branch": "foo/experimentalfeature",
  "git_state": "dirty",
  "git_summary": "v1.2.3_dirty",
  "build_date": "2022-11-29T16:28:04Z",
  "binary_version": "v1.0.1"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|version|integer(int32)|false|none|none|
|git_commit|string|false|none|none|
|git_branch|string|false|none|none|
|git_state|string|false|none|none|
|git_summary|string|false|none|none|
|build_date|string|false|none|none|
|binary_version|string|false|none|none|

