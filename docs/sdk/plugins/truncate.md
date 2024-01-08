---
title: Truncating values
description: Adhere to the 1024 byte limit per cell by truncating values.
keywords:
  - truncate
  - truncating
  - cell limit
---

## Overview

The truncate function is useful if you need to insert data longer than the [max cell size of 1024 bytes](/fundamentals/limits) and don't wish to use the [string-to-CID extension](/sdk/plugins/pinning-to-ipfs). However, it is not recommended unless you are okay with lossy data because it **will truncate** inputs such that the **original value is unrecoverable**. It's intended to use if you're fine with losing data, such as if you're inserting a large string that you don't need to keep around.

## Installation & setup

If you haven't already, install the JETI package and SDK:

```bash npm2yarn
npm install @tableland/jeti @tableland/sdk
```

The initial setup steps for instantiating a `Database` and creating a table (with Local Tableland running) can be found [here](/sdk/plugins/#installation--setup).

## Truncating values

If you `truncate`, it will cut the length at 1024 bytes and append an ellipsis (`...`) to the end of the string. For example:

```js
import { truncate } from "@tableland/jeti";

// 1025 letter 'a's, i.e., 1025 bytes is one over the limit
const longString = new Array(1026).join("a"); // First value is `undefined`, so it will be skipped

const sql =
  await truncate`INSERT INTO my_table_31337_2 (val) values ('${longString}')`;
```

The result will look approximately like this but will be truncated to 1024 bytes (instead of simply 20 characters in this example):

```sql
INSERT INTO test_table_31337_1 (val) values ('aaaaaaaaaaaaaaaaaa')
```

## Detruncating values

Reading the data after inserting it will return the truncated value for the `val` column:

```js
const { meta: insert } = await db.prepare(sql).all();
await insert.txn?.wait();

const { results } = await db.prepare(`select * from ${tableName}`).all();
console.log(results);
// [
//   {
//     id: 1,
//     val: 'aaaaaaaaaaaaaaaaaa'
//   }
// ]
```

As noted above, **this will not** return the original value, but rather, the truncated value. Thus, if you wish to get the "original" value back, you can use the `resolve` function. It'll look something like `aaaaaaaaaaaaaaaaaa...` but with 1024 `a`s (instead of 20 in the example), and note the `...` at the end.

```js
const detruncated = await truncate.resolve([{ val: `${longString}` }], ["val"]);
console.log(detruncated);
// [
//   {
//     id: 1,
//     val: 'aaaaaaaaaaaaaaaaaa...'
//   }
// ]
```

In other words, the value from `results` and `detruncated` are, essentially, the same, but with the `...` appended to the end. It's only really useful if you need to display some truncated value to the user to help show that the full value is not being displayed.
