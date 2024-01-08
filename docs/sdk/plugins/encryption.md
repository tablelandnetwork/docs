---
title: Encrypt & decrypt data
description: Use the experimental encryption plugin to encrypt table data or decrypt it after querying.
keywords:
  - encryption
  - decryption
  - encrypt
  - decrypt
---

## Overview

Tableland is an open database, so whatever values you write and publicly readable. However, you can use the experimental encryption plugin to encrypt and decrypt data with AES encryption. It's intended to be a simple symmetric encryption example, but you can use it as a starting point for your own custom encryption/decryption process. JETI is extensible; you can build your own, more secure encryption schemes using this plugin as a starting reference point.

:::warning
The encryption plugin is simple and purely symmetric, so it's _not_ suitable for production use cases. But, you can create your own custom process/extension with the exported `createProcessor` method. See the encryption [source code](https://github.com/tablelandnetwork/jeti/blob/main/src/processors/symetricEncrypt.ts) for more details on the implementation or the [custom plugin docs](/sdk/plugins/custom-plugin) for how to create your own.
:::

## Installation & setup

Make sure you've install the JETI package and SDK:

```bash npm2yarn
npm install @tableland/jeti @tableland/sdk
```

Note: the following assumes you've gone through the setup steps for instantiating a `Database` and creating a table (with Local Tableland): [here](/sdk/plugins/#installation--setup).

## Encrypting data

First, you need to import `symmetricEncrypt` and specify your secret and salt as string. You can generate random key and salt string using `generateRandomSecretAndSalt` (or choose to pass your own values):

```js
import {
  symmetricEncrypt,
  generateRandomSecretAndSalt,
  skip,
} from "@tableland/jeti";

const { secret, salt } = generateRandomSecretAndSalt();
```

The values for the secret and key will look something like `a7934850975cfac84607eab664dfb2d69bdc91164fbb93f8980cc354312e8ff3` and `64ad222d51690a14c9bf89c9558df245`, respectively. Again, note there are better way to manage this on your own, but this is a simple example.

Then, you'll want to set up the encrypter and pass in these values. The `symmetricEncrypt` function is a tagged template literal, which means you can use it to interpolate values into your SQL string. You can `skip` values that you don't want to encrypt, such as the table name, and all other passes variables will be encrypted.

```js
const tableName = "my_table_31337_2"; // Assuming the table was created in the setup steps

const contentToEncrypt = "Hello world";
const encrypter = symmetricEncrypt(secret, salt);
const sql = await encrypter`INSERT INTO ${skip(
  tableName
)} (val) values ('${contentToEncrypt}')`;

const { meta: insert } = await db.prepare(sql).all();
await insert.txn?.wait();
```

At this point, the SQL string will look something like this:

```sql
INSERT INTO my_table_31337_3 (val) values ('4cc306df4d39469e33f6926539567a82Ps7O889tv80A2sG00GLPfQ==')
```

## Decrypting data

Let's then decrypt the result after reading from the table. First, we'll just read the raw results without decrypting it:

```js
const { results } = await db.prepare(`select * from ${tableName}`).all();
console.log(results);
// [
//   {
//     id: 1,
//     val: '4cc306df4d39469e33f6926539567a82Ps7O889tv80A2sG00GLPfQ=='
//   }
// ]
```

You can use the `resolve` method to decrypt this, passing in the column you want to decrypt (i.e., `val`).

```js
const decrypted = await encrypter.resolve(results, ["val"]);
console.log(decrypted);
// [
//   {
//     id: 1,
//     val: 'Hello world'
//   }
// ]
```
