---
title: JETI Extension
sidebar_label: JETI Extension
description: Use IPFS for Tableland data
---

TODO: update

## JavaScript Extension for Tableland Integrations

Using JETI
JETI (JavaScript Extension for Tableland Integrations) allows you to easily transform data you are submitting to and querying from tableland.

### 1. Installation

First, install the JETI package using npm or yarn:

```
npm i @tableland/jeti @tableland/sdk
```

### 2. Import the necessary modules from @tableland/sdk and @tableland/jeti:

```javascript
import { Database } from "@tableland/sdk";
import { createProcessor } from "@tableland/jeti";
```

### 3. Initialize the Database and table

Create a new instance of the Database class using the Tableland JavaScript SDK and create a table. Create a new table using the prepare and run methods. Specify a prefix for your table directly in the CREATE TABLE statement:

```javascript
const db = new Database();

const { meta: create } = await db
  .prepare(
    `CREATE TABLE my_sdk_table (id integer primary key, name text, avatar_cid text);`
  )
  .run();

// The table's `name` is in the format `{prefix}_{chainId}_{tableId}`
console.log(create.txn?.name); // e.g., my_sdk_table_80001_311
```

## Built in processes

Here are a few built in proceses for ways you can transform and resolve data.

### Pin to IPFS

:::note
JETI requires you to have an IPFS node running locally on port 5001, and to have a remote pinning service configured. This is because the point of JETI is to pin your IPFS files when they go to Tableland. It can be tricky.

More on remote pinning services can be found [here](https://docs.ipfs.tech/how-to/work-with-pinning-services/#use-an-existing-pinning-service).
:::note

```JavaScript
import { pinToLocal, skip } from '@tableland/jeti';

const contentToPin = "Content To Pin";

const sql = pinToLocal`insert into ${skip(tableName)} (message) values ('${contentToPin}');`;

// Later

const results = await db.prepare(`select * from ${tableName}`, [message]).all();

const resultsWithCIDsResolved = await ipfs.resolve(results);


```

### Symetrically Encrypt

**_Please note: be careful with encryption. This encryption function is simple and purely symetric. Probably not suitable for most use cases._**

This one is a little trickier, because you have to specify your key.

```JavaScript
import { symetricEncrpt, skip } from '@tableland/jeti';

const tableName = "table_31337_1";
const message = "Hello world";

// Note the use of the "skip" function. This ensure this value is not processed, but used as-is
const sql = symetricEncrpyt("my-symetric-key")`INSERT INTO ${skip(tableName)} (message) values ('${message}')`;
// INSERT INTO table_31337_1 (message) values ('U2FsdGVkXMOREGIBBIRISH');

```

To fetch the message, you would simply resolve it:

```JavaScript

const originalResult = db.prepare('select id, message message from table_31337_1').all();
// [
//  {
//    id: 0,
//    message: "U2FsdGVkXMOREGIBBIRISH"
//  }
// ];

const newResult = symetricEncrypt("my-symetric-key").resolve(originalResult, ['message']);
// [
//  {
//    id: 0,
//    message: "Hello world"
//  }
// ];
```

### Truncate

The truncate function isn't recommended, because it _will_ lose data. If you're find with that, then go ahead and use it. Otherwise, avoid.

```JavaScript
import { truncate } from '@tableland/jeti';

const message = "This is a really, really long string that I want to truncate to a mere 20 characters";

const sql = await truncate`INSERT INTO test_table_31337_1 message values ('${message}')`;
// INSERT INTO test_table_31337_1 message values ('This is a really, re')

```

There is no `resolve` function for truncate.

## Create your own process

Here's the exiting part; you can create your own process! Let's imagine you wanted to pin something to IPFS, however, you weren't using the standard pinning API, but a proprietary API. That's fine!

```JavaScript
import { createProcessor } from "@tableland/jeti";
import { ipfsPin, ipfsFetch } from "some-custom-ipfs-lib";

const ipfs = createProcessor(ipfsPin, ipfsFetch);

const db = new Database();

const message = getFile();
const image = getImage();
const query = await ipfs`
INSERT
  INTO MyTable_31337_1
    (id, message, image)
    values
    (
      0,
      '${message}',
      '${image}'
    )`;
```

The result will look approximately like this:

```sql
 INSERT INTO MyTable_31337_1
    (id, message, image)
     values
     (
        0,
        'ipfs://bafy...',
        'ipfs://bafy2...'
     );
```

But wait, wait, there's more!

Great, we can get this data _into_ tableland and IPFS, but what about getting it out? That's where the `resolve` function comes in.

```JavaScript
const originalResultSet = db.prepare.all("SELECT * FROM MyTable");

const resolveResponseSet = ipfs.resolve(
  originalResultSet,
  ["message", "image"] // This tells it to only attempt to resolve these columns.
);

// Result
{
  id: 0,
  message: // Your message
  image: // Your image
}

```
