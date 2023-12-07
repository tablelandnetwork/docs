---
title: Custom plugin
description: Define your own Tableland SDK extension for client-side logic.
keywords:
  - plugin
  - createProcessor
---

## Overview

Let's take a look at how you can create your own plugin for the Tableland SDK. This example will simply append a string to the end of each cell value and remove it from read query results, but you could do anything you want with client-side data transformation.

## Installation & setup

If you haven't already, install the JETI package and SDK:

```bash npm2yarn
npm install @tableland/jeti
```

Then, import the `createProcessor` method from the JETI package.

```js
import { createProcessor } from "@tableland/jeti";
```

Note: if you're using TypeScript, you can also import the `PrepareResult` type, which is the return type of `createProcessor`.

## Custom processor

It might be helpful to check out the `createProcessor` source code [here](https://github.com/tablelandnetwork/jeti/blob/main/src/processor.ts). It takes two functions as arguments:

- `customProcessor`: Defines how to process the data, taking any number of values, performing whatever logic desired, and then returning the resulting string value. Under the hood, a [`TemplateStringsArray`](https://microsoft.github.io/PowerBI-JavaScript/interfaces/_node_modules_typedoc_node_modules_typescript_lib_lib_es5_d_.templatestringsarray.html#:~:text=,Indexable%0A%0A%5Bn%3A%20number%5D%3A%20string) is used to represent the cell value, which will parse the template string and values into a single string while making the values accessible to the `customProcessor` function.
- `resolver`: Defines how to reverse the processing, taking the processed string value and returning the original value. It expects a response type as defined by the Tableland SDK, which is an array of objects where each object key a kay-value pair of the column name and the row value.

## Example

Here, we'll create a custom processor that appends a string to the end of each cell value. We'll also create a resolver that removes the appended string from the cell value.

### Defining the processor

```js
function addValue(value: string): PrepareResult {
  const add = (input: string) => {
    return input + value;
  };

  const remove = (input: string) => {
    return input.replace(value, "");
  };

  return createProcessor(add, remove);
}
```

To use this, you'll start by instantiating the processor with the desired value to append.

```js
const processor = addValue(" world");
```

### Transform values for statements

You can use the processor with templated strings, which is typically used for create statements or mutating queries. Although, it could be used in any type of query since this is purely client-side logic.

```js
const originalValueOne = "Hello";
const originalValueTwo = "Hello again";

const sql =
  await processor`INSERT INTO my_table_31337_2 (val) VALUES ('${originalValueOne}'), ('${originalValueTwo}');`;
console.log(sql);
```

This will log the following:

```sql
INSERT INTO my_table_31337_2 VALUES ('Hello world'), ('Hello again world');
```

### Untransform values from query results

Assuming you've sent the query to the network, you'll get a response back from the Tableland `Database`. To demonstrate the functionality, we'll skip this step and hardcode what the response would look like.

```js
const rawResults = [
  {
    id: 1,
    val: "Hello world",
  },
  {
    id: 2,
    val: "Hello again world",
  },
];
```

Now, we can call the `resolve` method to get the original values back.

```js
const unprocessedResults = await processor.resolve(rawResults, ["val"]);
console.log(unprocessedResults);
```

Thus, the results are returned to their original state, albeit, the actual table is storing the transformed values:

```js
[
  {
    id: 1,
    val: "Hello",
  },
  {
    id: 2,
    val: "Hello again",
  },
];
```
