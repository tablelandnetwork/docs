---
description: API Reference for the integrated Javascript/Typescript client/SDK.
---

# Javascript SDK

The Tableland project provides a zero-config Typescript/Javascript SDK that make it easy to interact with the Tableland network from Ethereum-based applications. The [`@tableland/sdk`](https://github.com/tablelandnetwork/js-tableland) SDK should feel comfortable to developers already familiar with the [`ethersjs` Javascript library](https://docs.ethers.io). The Tableland SDK provides a small but powerful API surface that integrates nicely with existing ETH development best practices.

Simply import the library, connect to the Tableland network, and you are ready to start creating and updating tables.

{% hint style="info" %}
Interested in supporting additional chains and ecosystems? Create an Issue and let us know!
{% endhint %}

## Setup

There are just a few setup steps required before using the Javascript/Typescript SDK. Firstly, since all Tableland API calls are "gated" by Ethereum address, you'll need to request access as mentioned in Quick Start guide.

{% content-ref url="quick-start.md" %}
[quick-start.md](quick-start.md)
{% endcontent-ref %}

​ One you have registered your ETH address, you'll need to install the SDK in your project or web-app.

### Install

You can install the SDK via `npm` or `yarn`. You can also pull the ESM build via `cdn.skypack.dev` or other means.

{% tabs %}
{% tab title="Node" %}
```
npm install @tableland/sdk
```
{% endtab %}

{% tab title="Browser" %}
```
https://cdn.skypack.dev/@tableland/sdk
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
**Note:** Currently only a Javascript/Typescript client is provided. Interested in another language? Please get in touch and let us know what you'd like to see next!
{% endhint %}

## Basic Usage

Most common Tableland usage patterns will follow something like the following. In general, you'll need to **connect**, **create**, **mutate**, and **query** your tables. In that order :smile:.

{% tabs %}
{% tab title="JS" %}
```typescript
import { connect } from "@tableland/sdk";

const tbl = await connect({ network: "testnet" });

const createRes = await tbl.create(
  `CREATE TABLE mytable (name text, id int, primary key (id));`
);

// `queryableName` will be the table name you chose with the
// table id separated by and underscore 
const queryableName = createRes.name;
console.log(queryableName); // e.g. mytable_1

const insertRes = await tbl.query(`INSERT INTO ${queryableName} (id, name) VALUES (0, 'Bobby Tables');`);

const queryRes = await tbl.query(`SELECT * FROM ${queryableName};`);

```
{% endtab %}

{% tab title="Node (import)" %}
```javascript
import { Wallet, providers } from "ethers";
import { connect } from "@tableland/sdk";

// Since we don't have Metamask, you need to supply a private key directly
const privateKey = "somePrivateKeyString";
const wallet = new Wallet(privateKey);

// We also need an RPC provider to connect to
const provider = new providers.AlchemyProvider("rinkeby", "myapikey");
const signer = wallet.connect(provider);
const tbl = await connect({ network: "testnet", signer });

const createRes = await tbl.create(
  `CREATE TABLE mytable (name text, id int, primary key (id));`
);

// `queryableName` will be the table name you chose with the
// table id separated by and underscore 
const queryableName = createRes.name;
console.log(queryableName); // e.g. mytable_1

const insertRes = await tbl.query(`INSERT INTO ${queryableName} (id, name) VALUES (0, 'Bobby Tables');`);

const queryRes = await tbl.query(`SELECT * FROM ${queryableName};`);

```
{% endtab %}

{% tab title="Node (require)" %}
```javascript
const ethers = require("ethers");
const tl = require("@tableland/sdk");
// Since we don't have Metamask, you need to supply a private key directly
const privateKey = "somePrivateKeyString";
const wallet = new ethers.Wallet(privateKey);
// We also need an RPC provider to connec to
const provider = new ethers.providers.AlchemyProvider("rinkeby", "myapikey");
const signer = wallet.connect(provider);

const createRes = await tbl.create(
  `CREATE TABLE mytable (name text, id int, primary key (id));`
);

// `queryableName` will be the table name you chose with the
// table id separated by and underscore 
const queryableName = createRes.name;
console.log(queryableName); // e.g. mytable_1

const insertRes = await tbl.query(`INSERT INTO ${queryableName} (id, name) VALUES (0, 'Bobby Tables');`);

const queryRes = await tbl.query(`SELECT * FROM ${queryableName};`);

```
{% endtab %}

{% tab title="Browser" %}
```html
<script type="module">
import { connect } from "https://cdn.skypack.dev/@tableland/sdk";

const tbl = await connect({ network: "testnet" });

const createRes = await tbl.create(
  `CREATE TABLE mytable (name text, id int, primary key (id));`
);

// `queryableName` will be the table name you chose with the
// table id separated by and underscore 
const queryableName = createRes.name;
console.log(queryableName); // e.g. mytable_1

const insertRes = await tbl.query(`INSERT INTO ${queryableName} (id, name) VALUES (0, 'Bobby Tables');`);

const queryRes = await tbl.query(`SELECT * FROM ${queryableName};`);

</script>
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
The Tableland SDK uses the modern `fetch` API. When working in Node it is necessary to use a version of Node that supports fetch, or provide [global access to node-fetch](https://github.com/node-fetch/node-fetch#providing-global-access) to use the SDK.
{% endhint %}

### Connecting to Tableland

The `@tableland/sdk` library includes functions for connecting to remote clients, creating and mutating tables, querying existing tables, and listing all user tables. These top level exports are available as individual function.

The `connect` function can be used to connect to a remote Tableland host, which is required to interact with the Tableland network. If information about a known Tableland validator is available, this can be specified as the host parameter in the `options` argument to the connect function.

Upon calling `connect`, the user will be prompted to sign a self-signed JSON web token. This token is used to verify ownership of the given Ethereum address, and to avoid the user having to sign subsequent Tableland transactions/method calls.

{% tabs %}
{% tab title="JS" %}
```typescript
import { connect } from "@tableland/sdk";

// By default, connect uses the tableland testnet validator
// It will sign a token via Metamask
const tbl = await connect({ network: "testnet" });
```
{% endtab %}

{% tab title="Node (import)" %}
```typescript
import { Wallet } from "ethers";
import { connect } from "@tableland/sdk";
// Since we don't have Metamask, supply the private key string directly
const privateKey = "somePrivateKeyString";
const signer = new Wallet(privateKey);
const tbl = await connect({ signer, network: "testnet" });
```
{% endtab %}

{% tab title="Node (require)" %}
```javascript
const ethers = require("ethers");
const tl = require("@tableland/sdk");
// Since we don't have Metamask, supply the private key string directly
const privateKey = "somePrivateKeyString";
const signer = new ethers.Wallet(privateKey);
const tbl = await tl.connect({ signer, network: "testnet" });
```
{% endtab %}
{% endtabs %}

### Creating Tables

Like most relational database systems, Tableland requires the user to create tables for storing, querying, and relating data. This is done via the `create` function. The `create` function takes a plain SQL statement string. Most valid SQL _constraints_ are supported, and the following data types are currently [supported](https://github.com/textileio/go-tableland/blob/main/pkg/parsing/query\_validator.go):

* `int2`, `int4`, `int8`, `serial`, `bigserial`
* `text`, `uri`, `varchar`, `bpchar`
* `date`, `timestamptz`
* `bool`, `float4`, `float8`, `numeric`
* `uuid`, `json`

{% hint style="info" %}
The above list is tentative and incomplete; the accepted types are still not well defined at the spec level.
{% endhint %}

```typescript
// Assumes a connection has already been established as above

const createRes = await tbl.create(
  "CREATE TABLE mytable (name text, id int, primary key (id));"
);

// `queryableName` will be the table name you chose with the
// table id separated by and underscore 
const queryableName = createRes.name;
console.log(queryableName); // e.g. mytable_1

```

Creating a table also generates a unique table identifier (table id). The table id is globally unique and can be used to reference the table for queries and updates after it has been created.  This table id is the tokenId from the Tableland Registry Smart Contract which means you can view your table on any blockchain scanner associated with the chain your table was minted on, Here is an example of a Tableland table viewed on [Opensea](https://testnets.opensea.io/assets/0x30867ad98a520287ccc28cde70fcf63e3cdb9c3c/723)
Queries and updates will use the table id with the table name from the create statement by combining them with the underscore character as a separator.  This results in the "queryable name".  The code snippets above show examples of this where the first table in Tableland has the name `mytable`, resulting in a queryable name of `mytable_1`.

Tables created by a given Ethereum address are owned by that address. The default access control for a table is that the owner is the only address allowed to make update to the table, but any address can read the table. The ownership is based on the Tableland Registry Smart Contract token associated with the table. Which means if you transfer ownership of the token you are transfering ownership of the table and all associated access rights and the ability to change the access rights.

For more on access control in Tableland see the [ACL section](/developers/access-controll.md)

{% hint style="warning" %}
Since all reads are always open to the public, and Tableland is still in very early development, it is not advised to store sensitive or private information on the Tableland network at this time.
{% endhint %}

### Listing Tables

Once tables have been created for a given address, they can be listed via the `list` function. This function takes no arguments and returns a list of `TableMetadata` objects, which contains table `controller`, `name`, and `structure`. The `structure` of a table is defined by its normalized schema, more on `structure` in the section on [Schema Structure](#schema-structure). The `name` is the "queryable name" described in the [Creating Tables](#creating-tables) section of this page.

```typescript
// Assumes a connection has already been established as above

const tables = await tbl.list();
// [
//     {
//         "controller": "0xbAb12215Ed94713A290e0c618fa8177fAb5eFd2D",
//         "created_at": "2022-02-07T22:57:41.606803Z",
//         "name": "myname_0",
//         "structure": "be1eb905f03347a439ecf9b612632fd53839b7f082dc2f9be6ef7da5dfddd660"
//     }
// ]
```

An application can use the `list` function to discover a user's tables, and determine if they are relevant for the given application.

### Mutating Tables

Now that we have a table to work with, it is easy to use vanilla SQL statements to insert new rows, update existing rows, and even delete old rows. These mutating SQL statements will eventually require network fees to be paid to network validators. For the current MVP beta/testing, they remain free. The generic `query` function can be used to mutate table rows. As an example, inserting new rows can be done like this:

```typescript
// Assumes a connection has already been established as above

const one = await tbl.query(
  `INSERT INTO ${createRes.name} (id, name) VALUES (0, 'Bobby Tables');`
);

const two = await tbl.query(
  `INSERT INTO ${createRes.name} (id, name) VALUES (0, 'Bobby Tables');`
);
```

{% hint style="info" %}
As mentioned previously, table mutations are currently restricted to the table creator address.
{% endhint %}

This inserted row can then be removed from the table state like this:

```typescript
const remove = await tbl.query(`DELETE FROM ${createRes.name} WHERE id = 0;`);
```

{% hint style="warning" %}
While rows can be deleted from the table state, row information will remain in the table's history for obvious reasons.
{% endhint %}

### Querying Tables

Finally, the moment we've all been waiting for; we are ready to query our table state! You already have all the tools required to get this done. Simply use the `query` function imported previously to query the latest table state. Currently, queries are extremely flexible in Tableland. You have most SQL query features available to craft your query, though the most common will likely be the classic `SELECT * FROM` pattern shown here:

```typescript
const { rows, columns } = await tbl.query(`SELECT * FROM ${createRes.name};`);
```

The response from a read query contains a `ReadQueryResult` object, with properties for `columns` and `rows`. The `columns` property contains an enumerated array of column ids and their corresponding `ColumnDescriptor` information. The `rows` property is an array of row-wise table data. The rows can be iterated over and used to populate UIs etc.

```typescript
for (const [rowId, row] of Object.entries(rows)) {
  console.log(`row: ${rowId}`);
  for (const [colId, data] of Object.entries(row)) {
    const { name } = columns[colId];
    console.log(`  ${name}: ${data}`);
  }
}
```

### Schema Structure

The last method we will talk about is `hash`.  An application builder will find two convenient uses for this method.
The first is combining it with the `list` method to determine if a user has already created a table that meets the needs of the application.

```typescript
// Assumes a connection has already been established as above

// see if the user already has mytable
const hashRes = await tbl.hash('CREATE TABLE mytable (name text, id int, primary key (id));')
const appTableStructure = hashRes.structureHash;

const tables = await tbl.list(); // returns an Array with the Tables the connected user has already created

const myTable = tables.find(table => table.structure === appTableStructure);

// Now the application might want to prompt the user to create `myTable` if it doesn't exist,
// or read from it if it does exist.

```

The second is the simple but useful case of validating create table SQL statements. If you find yourself wanting to validate a create statement without actually creating the table the `hash` method is what you're looking for.


```typescript
// Assumes a connection has already been established as above

// see if your statement is valid
try {
  // table names cannot start with a number...
  const hashRes = await tbl.hash('CREATE TABLE 123hello (id int primary key, val text);')
} catch (err) {
  console.log(err.message) // invalid sql near 123
}

```


And now you're ready to start building your next web3 experience with Tableland! If you want to dive deeper, you can check out the [code on github](https://github.com/tablelandnetwork/js-tableland), or check out some of our demos and examples:

{% content-ref url="examples/" %}
[examples](examples/)
{% endcontent-ref %}
