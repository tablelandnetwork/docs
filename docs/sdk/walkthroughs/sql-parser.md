---
title: SQL parser
description: Parse and normalize SQL expressions to ensure Tableland compatibility.
keywords:
  - sql parser
---

When you write SQL statements, they must adhere to the Tableland SQL grammar, which has some imposed constraints relative to typical SQL language. The SQL parser ensures that your SQL statements are valid and normalizes them to ensure compatibility with Tableland.

## Installation

Start by installing the SQL parser package in your project:

```bash npm2yarn
npm install @tableland/sqlparser
```

If you're using the Tableland SDK, it uses the SQL parser under the hood to normalize and pull out information from SQL statements. Installing this package is not required but useful if you want to normalize statements outside of the SDK. The parser supports both ESM and CommonJS.

## Setup

In your source file, import the `init` function from the SQL parser, and then call the function to initialize the parser. This add the `sqlparser` object to the global namespace, [`globalThis`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis).

```js
import { init } from "@tableland/sqlparser";

await init();
```

Because the global namespace is used, you can call the `sqlparser` object from anywhere in your code, which should always be preceded with `await` since it's an asynchronous function. If you run into issues during this first step, it might be an issue with loading WASM, which powers the parser. In this instance, you can import `__wasm` and use it to conditionally check if WASM is loaded, then calling `init`:

```js
import { init, __wasm } from "@tableland/sqlparser";

if (__wasm == null) {
  await init();
}
```

## Usage

The SQL parser exposes three functions: `normalize`, `validateTableName`, and `getUniqueTableNames`.

### `normalize`

You can use the `normalize` function to normalize SQL statements. It takes a single argument—the SQL statement to normalize—and returns an object with the following properties:

- `statements`: An array of normalized SQL statements (e.g., removed whitespace).
- `type`: The type of SQL statement; one of: `create`, `read`, `write`, or `acl` (for `GRANT`/`REVOKE` statements).
- `tables`: An array of table names referenced in the SQL statement.

```js
const { statements, type, tables } = await sqlparser.normalize(
  "select   * FrOM   my_table  WHere    something = 'nothing';"
);
```

The values returned will be:

- `statements`: `["select * from my_table where something='nothing'"]`
- `type`: `"read"`
- `tables`: `["my_table"]`

If you pass multiple statements that touch different tables, it'll include those as well:

```js
const { statements, type, tables } = await sqlparser.normalize(
  "insert into my_table values (1); insert into other_table values ('test');"
);
```

The values returned will be:

- `statements`: `["insert into my_table values(1)", "insert into other_table values('test')"]`
- `type`: `"write"`
- `tables`: `["my_table", "other_table"]`

If you pass an invalid statement, it will provide context as to what's wrong with it.

```js
try {
  const invalid = await sqlparser.normalize(
    "insert blah into my_table values (1);"
  );
} catch (e) {
  // error parsing statement: syntax error at position 11 near 'blah'
  console.log(e.message);
}
```

## `validateTableName`

The `validateTableName` function takes a single argument: the table name to validate. In the examples above, you'll notice the table names we used were `my_table`. In reality, all table names look like `{prefix}_{chainId}_{tableId}` since this is their globally unique identifier. This function allows you to check if the table name used in the statement adheres to the generally accepted format, providing you with the table's prefix, chain ID, table ID, and full name.

```js
const info = await sqlparser.validateTableName("table_1_1");
```

This will provide you with the following information:

```json
{
  "prefix": "table",
  "chainId": 1,
  "tableId": 1,
  "name": "table_1_1"
}
```

It's important to note this doesn't enforce chain ID compliance. For example, the following statement uses chain ID `1`, which is in fact a valid network (Ethereum mainnet), but any number will pass. It simply checks the format is in the form of `{prefix}_{chainId}_{tableId}`.

If you were to pass an invalid name, it'll throw:

```js
try {
  const info = await sqlparser.validateTableName("$123table_1_1");
} catch (e) {
  // error validating name: table name has wrong format: $123table_1_1
  console.log(e.message);
}
```

## `getUniqueTableNames`

If you have a statement with multiple tables, you can use the `getUniqueTableNames` function to get an array of unique table names. It takes a single argument: the SQL statement to parse. It returns an array of table names.

```js
const tableNames = await sqlparser.getUniqueTableNames(
  "select t1.id, t3.* from t1, t2 join t3 join (select * from t4);"
);
```

Providing you with: `["t1", "t2", "t3", "t4"]`.

If you pass an invalid SQl statement, it'll throw:

```js
try {
  const invalid = await sqlparser.getUniqueTableNames(
    "insert blah_1_1 into values (1);"
  );
} catch (e: any) {
  // error parsing statement: syntax error at position 15 near 'blah_1_1'
  console.log(e.message);
}
```

## TypeScript

If you're using TypeScript, the types for these are also exported. Both `NormalizedStatement` and `StatementType` are part of the response from `normalize`, and `validateTableName` uses `ValidatedTable`. For `getUniqueTableNames`, it simply returns strings.

## Dealing with build issues

Certain build systems don't support WASM out of the box, so you might need to adjust your configuration file. For example, with [Vite](https://vitejs.dev), you'd adjust the config with the following exclusion:

```ts title="vite.config.ts"
// ...
optimizeDeps: {
  exclude: ["@tableland/sqlparser"];
}
// ...
```
