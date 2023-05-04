---
title: JETI Extension
sidebar_label: JETI Extension
description: Use IPFS for Tableland data
---

## JavaScript Extension for Tableland and IPFS

Using JETI with Tableland
JETI (JavaScript Extension for Tableland and IPFS) allows you to easily add data to IPFS and read it in your applications while interacting with the Tableland network. The following guide will walk you through the process of integrating JETI into your project using JavaScript.

### 1. Installation

First, install the JETI package using npm or yarn:

```
npm i @tableland/jeti @tableland/sdk
```

### 2. Import the necessary modules from @tableland/sdk and @tableland/jeti:

```javascript
import { Database } from "@tableland/sdk";
import { prepare, resolve } from "@tableland/jeti";
```

### 3. Initialize the Database and table

Create a new instance of the Database class and create a table. Create a new table using the prepare and run methods. Specify a prefix for your table directly in the CREATE TABLE statement:

```javascript
const db = new Database(); 4. Create a Table

const { meta: create } = await db
.prepare(
`CREATE TABLE my_sdk_table (id integer primary key, name text, avatar_cid text);`
)
.run();

// The table's `name` is in the format `{prefix}_{chainId}_{tableId}`
console.log(create.txn?.name); // e.g., my_sdk_table_80001_311
```

### 4. Prepare the Data for IPFS

Get the data you want to add to IPFS as a Blob object, and use the `prepare` template function to insert it into a query:

```javascript
const avatar = new Blob([
  /* avatar img file contents here */
]);

const preparedQuery =
  await prepare`INSERT INTO ${create.txn?.name} (name, avatar_cid) VALUES ('Murray', ${avatar});`;

const receipt = await db.query(preparedQuery);
```

### 5. Retrieve Data from IPFS

Use the resolve function to fetch data from IPFS and include it in the result set:

```javascript
const { rows, columns } = await resolve(receipt, ["avatar_cid"]);
// Instead of containing the CID from the database,
// 'row' now contains the actual content as an AsyncIterator of a UINT8Array

console.log({ rows, columns });
```

By following these steps, you can integrate JETI into your Tableland-based application using JavaScript, allowing for seamless IPFS data handling.
