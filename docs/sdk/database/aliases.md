---
title: Table aliases
description: Simplify development using table aliases instead of raw auto-generated table names.
---

Tableland tables are created in a globally unique format. However, this can disrupt the development workflow as it requires developers to adhere to the exact table name, which can be cumbersome to remember and type out. Instead, you can leverage table aliases to enhance the development experience and configure custom table names used locally by the SDK.

## Overview

When instantiating a `Database`, the `aliases` parameter can be used to configure table aliases within a JSON file. The `aliases` parameter should make use of the SDK's `helpers.jsonFileAliases('...')` method where the configuration file's path is passed to it. Table reads and writes will automatically read from this file upon `Database.prepare(...)` method calls.

An alias is, in a sense, the same as a table prefix but with local uniqueness restrictions and only scoped to your project alone (i.e., has no relationship to the broader Tableland network).

Under the hood, `aliases` contains an object with `read` and `write` functions. The `read` function must return a mapping of the project-scoped table alias to the universally unique Tableland table name—for example, `{ "users": "users_31337_2" }`. The `write` function will be called any time a `Database` instance is used to create a table and modifies the JSON file, writing the mapping to it.

:::note
All project aliases must be unique. If you try to create a table with a preexisting alias saved in your config file, you'll run into an error: `table name already exists in aliases`.
:::

## Configuration file

As a best practice, the alias config file should exist in your project's directory to ensure the mappings from table aliases to the generated names are persisted and do not get lost. First, create a JSON file with an empty object (`{}`) in the root of your project (or a subdirectory). It will ultimately contain all of your table aliases. Let's name the file `tableland.aliases.json`, but it can be any file name you'd like.

```sh
echo '{}' > tableland.aliases.json
```

Then, import `jsonFileAliases` from the SDK's `helpers` into your source code; this is a utility function that allows you to simply provide the path to your aliases file.

```js
import { Database } from "@tableland/sdk";
import { jsonFileAliases } from "@tableland/sdk/helpers";

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

Creating a table will automatically write the mapping to the `tableland.aliases.json` file. The config file will look something like the following (e.g., if you create a `main` prefixed table using Local Tableland):

```json
{
  "main": "my_table_31337_2"
}
```

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

## In-memory implementation

To further demonstrate its functionality, let's review how this setup works with an in-memory implementation. This might be especially useful if you're writing tests and do not want to read from a local file. We'll use a `nameMap` variable that stores an empty object, but again, in practice, this should be a JSON file that contains an empty object as described above.

```js
const nameMap = {};

const db = new Database({
  signer,
  aliases: {
    read: async function () {
      return nameMap;
    },
    write: async function (names) {
      for (const uuTableName in names) {
        nameMap[uuTableName] = names[uuTableName];
      }
    },
  },
});
```

The `read` function will return the `nameMap` object, while the `write` function will update the `nameMap` object with the provided table aliases.
