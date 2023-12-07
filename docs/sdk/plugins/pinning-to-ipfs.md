---
title: Insert & process IPFS data
description: Use IPFS to store large strings and files while inserting CIDs into your table.
keywords:
  - IPFS
  - CID
  - pinning
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

## Overview

JETI comes packed with `pinToLocal` and `pinToProvider` methods that let you insert data as CIDs into a cell. For example, you might have a long string or file contents that exceed the max cell size of [1024 bytes](/fundamentals/architecture/limits). You can use these methods with string templating to create SQL strings with custom processing logic that pins the table data to IPFS, inserts a CID, and lets you fetch the underlying content at that CID.

:::note
JETI requires you to have an IPFS node running locally on port 5001, and to have a remote pinning service configured. This is because the point of JETI is to pin your IPFS files when they go to Tableland. It can be tricky.

More on remote pinning services can be found [here](https://docs.ipfs.tech/how-to/work-with-pinning-services/#use-an-existing-pinning-service).
:::note

## Installation & setup

If you haven't already, install the JETI package and SDK:

```bash npm2yarn
npm install @tableland/jeti @tableland/sdk
```

Make sure you followed the initial setup steps for instantiating a `Database` and creating a table (with Local Tableland running): [here](/docs/sdk/plugins#installation--setup).

### Insert & read data with IPFS

Now, let's insert some data into the table. There are two ways to do this:

- `pinToLocal`: Pin the data to your local IPFS node, which means you'll need to have an IPFS node running locally on port 5001.
- `pinToProvider`: Pin the data to a remote IPFS node, which means you'll need to have a remote pinning service configured like [Piñata](https://www.pinata.cloud/dedicated-gateways).

Both of these methods can either take a `string` or `Uint8Array` as the data to pin. When the data is read from the table and `resolve`d, it'll be returned back as a `utf-8` string.

## Pinning locally

There are a number of ways to set this up—we'll assume you're running the [IPFS Desktop](ipns://docs.ipfs.tech/install/ipfs-desktop/) app in the background, which will automatically start a local IPFS node for you.

Import the local pinning method and `skip` function from `@tableland/jeti`. The `skip` method instructs the JETI extension to _not_ process the value in the string template, and to use it as-is. This is useful for inserting CIDs into the table when other data is inserted that shouldn't be converted to a CID and pinned, such as a table name that's passed in the SQL string.

```js
import { pinToLocal, skip } from "@tableland/jeti";
```

Then, instantiate the local pinner via `pinToLocal`. You should pass host/port information to connect to the IPFS node, which are endpoints defined in the [IPFS HTTP API](https://docs.ipfs.tech/reference/http/api/). For example, IPFS Desktop exposes the API on `http://127.0.0.1:5001` by default.

```js
const localPinner = pinToLocal({
  host: "127.0.0.1",
  port: 5001,
  protocol: "http",
});
```

Then, insert some data into the table:

```js
const tableName = "my_table_31337_2"; // Assuming the table was created in the setup steps
const contentToPin = "Hello world"; // A string, or a file buffer (Uint8Array)
const sql = await localPinner`insert into ${skip(
  tableName
)} (val) values ('${contentToPin}');`;
console.log(sql);

const { meta: insert } = await db.prepare(sql).all();
await insert.txn?.wait();
```

This will insert the CID into the table—the SQL string that gets materialized is the following:

```sql
INSERT INTO my_table_31337_2 (val) values ('bafybeiabfiu2uipule2sro2maoufk2waokktnsbqp5gvaaod3y44ouft54');
```

Then, you can query the table and resolve the CID to get the original data. If you simply query the table, you'll get the CID back.

```js
const { results } = await db.prepare(`SELECT * FROM ${tableName}`).all();
console.log(results);
// [
//   {
//     id: 1,
//     val: 'bafybeiabfiu2uipule2sro2maoufk2waokktnsbqp5gvaaod3y44ouft54'
//   }
// ]
```

Or, if you call the `resolve` method on the `localPinner` we set up, it'll resolve the CID to the original data. You must define which columns you want to resolve; in our case, the `val` column is storing CIDs.

```js
const resultsWithCIDsResolved = await localPinner.resolve(results, ["val"]);
console.log(resultsWithCIDsResolved);
// [
//   {
//     id: 1,
//     val: 'Hello world'
//   }
// ]
```

## Pinning with a remote provider

In the [IPFS Desktop](ipns://docs.ipfs.tech/install/ipfs-desktop/) app, you must define remote pinning services like Piñata or Filebase. We'll use Piñata as an example. Follow these steps for importing a remote pinning service into the IPFS Desktop app: [here](ipns://docs.ipfs.tech/how-to/work-with-pinning-services/#use-a-third-party-pinning-service). On the IPFS Desktop app, you'll go to **Settings > Add service** and set up the Piñata endpoint (`https://api.pinata.cloud`) with an JWT secret (`eyJhbG...`) that you created in the Piñata web app.

Then, import the `skip` function from `@tableland/jeti`, along with `pinToProvider`:

```js
import { pinToProvider, skip } from "@tableland/jeti";
```

After that, instantiate the remote pinner via `pinToProvider`. You'll pass the same local IPFS node host/port information; this is `http://127.0.0.1:5001` by default. The JETI extension will automatically use the remote pinning service you configured in the IPFS Desktop app—it'll use the _first_ remote pinning service you have configured, so keep that in mind in case you have multiple services defined.

```js
const remotePinner = pinToProvider({
  host: "127.0.0.1",
  port: 5001,
  protocol: "http",
});
```

Then, insert some data into the table:

```js
const tableName = "my_table_31337_2"; // Assuming the table was created in the setup steps

const contentToPin = "Hello world"; // A string, or a file buffer (Uint8Array)
const sql = await remotePinner`insert into ${skip(
  tableName
)} (val) values ('${contentToPin}');`;
console.log(sql);

const { meta: insert } = await db.prepare(sql).all();
await insert.txn?.wait();
```

This will insert the CID into the table—the SQL string that gets materialized is the following:

```sql
INSERT INTO my_table_31337_2 (val) values ('bafybeiabfiu2uipule2sro2maoufk2waokktnsbqp5gvaaod3y44ouft54');
```

Then, you can query the table and resolve the CID to get the original data. If you simply query the table, you'll get the CID back.

```js
const { results } = await db.prepare(`SELECT * FROM ${tableName}`).all();
console.log(results);
// [
//   {
//     id: 1,
//     val: 'bafybeiabfiu2uipule2sro2maoufk2waokktnsbqp5gvaaod3y44ouft54'
//   }
// ]
```

Or, if you call the `resolve` method on the `remotePinner` we set up, it'll resolve the CID to the original data. You must define which columns you want to resolve; in our case, the `val` column is storing CIDs.

```js
const resultsWithCIDsResolved = await remotePinner.resolve(results, ["val"]);
console.log(resultsWithCIDsResolved);
// [
//   {
//     id: 1,
//     val: 'Hello world'
//   }
// ]
```

## Working with files

Since these methods can take a `Uint8Array` as the data to pin, you can use the `fs` module to read a file and insert it into the table. For example, let's say you have a file called `hello.txt` in the same directory as your script, and it contains a simple string `Hello world`. You can create a method like the following, which will convert the file to a `Uint8Array`:

```js
import { readFile } from "node:fs";

function fileToUint8Array(filePath: string) {
  return new Promise((resolve, reject) => {
    readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(new Uint8Array(data));
    });
  });
}

const filePath = "./hello.txt"; // Replace with your file path
const contentToPin = await fileToUint8Array(filePath);
```

As with our examples above, you can use the `contentToPin` with `pinToLocal` or `pinToProvider` to insert the file contents into the table. (Since the text is `Hello world`, the result will be identical to the previous examples.)
