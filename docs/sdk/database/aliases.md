---
title: Table aliases
description: Simplify development using table aliases instead of raw auto-generated table names.
---

Tableland tables are created in a globally unique format. However, this can disrupt the development workflow as it requires developers to adhere to the exact table name, which can be cumbersome to remember and type out. Instead, you can leverage table aliases to enhance the development experience and configure custom table names used locally by the SDK.

## Overview

When instantiating a `Database`, the `aliases` parameter can be used to configure table aliases within a JSON file. The `aliases` parameter can make use of the `@tableland/node-helpers` synchronous method `jsonFileAliases('...')` where the configuration file's path is passed to it. Or, for asynchronous operations or non-Node.js environments, you can set up your own implementation. Table reads and writes will automatically use this file upon `Database.prepare(...)` method calls.

An alias is, in a sense, the same as a table prefix but with local uniqueness restrictions and only scoped to your project alone (i.e., has no relationship to the broader Tableland network).

Under the hood, `aliases` contains an object with `read` and `write` functions. The `read` function must return a mapping of the project-scoped table alias to the universally unique Tableland table name—for example, `{ "users": "users_31337_2" }`. The `write` function will be called any time a `Database` instance is used to create a table and modifies the JSON file, writing the mapping to it.

:::note
All project aliases must be unique. If you try to create a table with a preexisting alias saved in your config file, it'll overwrite the existing mapping.
:::

## Installation

From your project, install the SDK and node helpers:

```bash npm2yarn
npm install --save @tableland/sdk @tableland/node-helpers
```

Then, in your source code, import these packages:

```js
import { Database } from "@tableland/sdk";
import { jsonFileAliases } from "@tableland/node-helpers";
```

### Database `aliases` parameter

When you use aliases, you pass them as the `aliases` value upon instantiating a new `Database`. The `aliases` parameter can make use of the `node-helpers` method `jsonFileAliases('...')` for Node.js environments, and it's synchronous in nature. For non-Node.js environments, you'll have to implement the `read` and `write` functions yourself—this can be asynchronous, if desired.

For context, the type and interface below underpin the `aliases` parameter, shown in TypeScript. A `NameMapping` is a simple object that maps a table alias to a table name. The `AliasesNameMap` is an object that contains the `read` and `write` functions; the former returns an object of table names to table aliases, and the latter will write aliases to the config file. This all happens under the hood, so you don't have to worry about it once you set it up.

```ts title="@tableland/sdk/helpers"
type NameMapping = Record<string, string>;

interface AliasesNameMap {
  read: (() => Promise<NameMapping>) | (() => NameMapping);
  write: ((map: NameMapping) => Promise<void>) | ((map: NameMapping) => void);
}
```

## Node.js environment

The `@tableland/node-helpers` is designed to operate in a Node.js environment, creating a file on your local machine that contains the table aliases.

As a best practice, the alias config file should exist in your project's directory to ensure the mappings from table aliases to the generated names are persisted and do not get lost. It will ultimately contain all of your table aliases. You can either create a file (e.g., name it `tableland.aliases.json`), or you can simply pass a path to a directly or path to a non-existent file to have one created for you. All of these would be valid ways to define the `aliases` parameter:

- Path to a file that exists: `jsonFileAliases("/path/to/tableland.aliases.json")`
- Path to a directory without an existing aliases file: `jsonFileAliases("./")`
  - This will create one called `tableland.aliases.json` in the directory.
- Path to a custom filename that doesn't exist: `jsonFileAliases("./my-aliases.json")`
  - This will create one with the custom name in the directory.

First, import `jsonFileAliases` from the `node-helpers` package into your source code; this is a utility function that allows you to simply provide the path to your aliases file.

```js
import { Database } from "@tableland/sdk";
import { jsonFileAliases } from "@tableland/node-helpers";

const db = new Database({
  signer,
  // highlight-start
  // Specify the path to your aliases config file
  aliases: jsonFileAliases("./tableland.aliases.json"),
  // highlight-end
});
```

You'll start by creating a table. Note how the `prepare` statements for writes and reads make use of the table prefix used in the create statement instead of the raw, generated table name (`{prefix}_{chainId}_{tableId}`).

```js
// Create a table with the custom prefix `main`, which is then used as an alias
const { meta: create } = await db
  .prepare(`CREATE TABLE my_table (id integer primary key, val text);`)
  .run();
await create.txn?.wait();

// Write to the table using the alias `main`, instead of the raw table name
const { meta: write } = await db
  .prepare(`INSERT INTO my_table (val) VALUES ('test')`)
  .run();
await write.txn?.wait();

// Also, read from the table with the alias
const { results } = await db.prepare(`SELECT * FROM my_table`).all();
```

Creating a table will automatically write the mapping to the `tableland.aliases.json` file. The aliases file will look something like the following (e.g., if you create a `main` prefixed table using Local Tableland):

```json
{
  "main": "my_table_31337_2"
}
```

## Web environment

In a non-Node.js environment or one that requires asynchronous read/write operations, you'll have to manage the implementation based on your project's capabilities.

### Async implementation

If you're using an asynchronous implementation, you'll need to make sure the `read` and `write` functions are asynchronous. For example, you can use a `Promise` to read/write to a file.

<Tabs groupId="sdk">
<TabItem value="js" label="JavaScript" default>

```js
import fs from "fs";
import path from "path";

const aliasesFile = new Promise(async (resolve, reject) => {
  try {
    const file = path.join(process.cwd(), `tableland.aliases.json`);
    fs.access(file, fs.constants.F_OK, (err) => {
      if (err) {
        fs.writeFileSync(file, JSON.stringify({}, null, 2));
      }
      resolve(file);
    });
  } catch (e) {
    reject(e);
  }
});

const aliases = {
  read: async function () {
    const jsonBuf = fs.readFileSync(await aliasesFile);
    return JSON.parse(jsonBuf.toString());
  },
  write: async function (nameMap) {
    const jsonBuf = fs.readFileSync(await aliasesFile);
    const jsonObj = { ...JSON.parse(jsonBuf.toString()), ...nameMap };
    fs.writeFileSync(await aliasesFile, JSON.stringify(jsonObj, null, 2));
  },
};
```

</TabItem>
<TabItem value="ts" label="TypeScript">

```ts
import { helpers } from "@tableland/sdk"; // For types
import fs from "fs";
import path from "path";

const aliasesFile = new Promise<string>(async (resolve, reject) => {
  try {
    const file = path.join(process.cwd(), `tableland.aliases.json`);
    fs.access(file, fs.constants.F_OK, (err) => {
      if (err) {
        fs.writeFileSync(file, JSON.stringify({}, null, 2));
      }
      resolve(file);
    });
  } catch (e) {
    reject(e);
  }
});

const aliases: helpers.AliasesNameMap = {
  read: async function () {
    const jsonBuf = fs.readFileSync(await aliasesFile);
    return JSON.parse(jsonBuf.toString()) as helpers.NameMapping;
  },
  write: async function (nameMap: helpers.NameMapping) {
    const jsonBuf = fs.readFileSync(await aliasesFile);
    const jsonObj = { ...JSON.parse(jsonBuf.toString()), ...nameMap };
    fs.writeFileSync(await aliasesFile, JSON.stringify(jsonObj, null, 2));
  },
};
```

</TabItem>
</Tabs>

### In-memory implementation

To further demonstrate its functionality, let's review how this setup works with an in-memory implementation. This might be especially useful if you're writing tests and do not want to read from a local file. We'll use a `nameMap` variable that stores an empty object, but again, in practice, this should be a JSON file so that the mappings are persisted.

<Tabs groupId="sdk">
<TabItem value="js" label="JavaScript" default>

```js
const nameMap = {};

const aliases = {
  read: async function () {
    return nameMap;
  },
  write: async function (names) {
    for (const uuTableName in names) {
      nameMap[uuTableName] = names[uuTableName];
    }
  },
};
```

</TabItem>
<TabItem value="ts" label="TypeScript">

```ts
import { helpers } from "@tableland/sdk"; // For types

const nameMap: helpers.NameMapping = {};

const aliases: helpers.AliasesNameMap = {
  read: async function () {
    return nameMap;
  },
  write: async function (names) {
    for (const uuTableName in names) {
      nameMap[uuTableName] = names[uuTableName];
    }
  },
};
```

</TabItem>
</Tabs>

The `read` function will return the `nameMap` object, while the `write` function will update the `nameMap` object with the provided table aliases.

## Multiple table aliases

One important callout: every time you create a table, it will overwrite mappings in the file specified in the `aliases` parameter. So, if you were to execute `CREATE TABLE` statements individually instead of batching them together, the config file will be overwritten upon each statement successfully resolving.

For example, after the last statement executes, only the `table_3`'s alias will exist in the config file.

```js
await db.prepare(`CREATE TABLE table_1 (id int, val text)`).run();
await db.prepare(`CREATE TABLE table_2 (id int, val text)`).run();
await db.prepare(`CREATE TABLE table_3 (id int, val text)`).run();
```

Instead, you'll want to do the following, which will ensure all three table aliases are written to the config file and later accessible in reads/writes.

```js
const [{ meta }] = await db.batch([
  db.prepare(`CREATE TABLE table_1 (id int, val text)`),
  db.prepare(`CREATE TABLE table_2 (id int, val text)`),
  db.prepare(`CREATE TABLE table_3 (id int, val text)`),
]);
```
