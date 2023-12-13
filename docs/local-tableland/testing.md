---
title: Running tests
description: Use a sandboxed Tableland network in your test suite.
keywords:
  - mocha
  - testing
  - local tableland
---

You can run a local Tableland network in your test suite to test your application's integration with Tableland. This is useful for testing its behavior in a sandboxed environment without having to deploy to a public testnet.

## Installation

First, make sure you've installed the package:

```bash npm2yarn
npm install --save-dev @tableland/local@latest
```

You are free to use whatever test suite you'd like, but we'll be using [mocha](https://mochajs.org/) for this walkthrough. Make sure it is installed:

```bash npm2yarn
npm install --save-dev mocha
```

## Usage

You'll want to create two files: one for setting up the Tableland network, and one for running your tests. Let's assume you have a `test` folder that exists. You should create a `setup.js` file and, for example, a `unit.js` file.

In the setup file, we'll configure the Tableland network by importing `LocalTableland`, instantiating it, and then setting up `before` and `after` hooks for cleanup purposes. These will run once, each.

```js title="test/setup.js"
import { after, before } from "mocha";
import { LocalTableland } from "@tableland/local";

const lt = new LocalTableland({ silent: false });

before(async function () {
  this.timeout(30000);
  lt.start();
  await lt.isReady();
});

after(async function () {
  await lt.shutdown();
});
```

Recall the Tableland network works in two parts: a Registry contract that emits SQL events, and a Validator node that materializes the SQL. When you instantiate `LocalTableland`, it will automatically start both of these components. The `isReady` method will wait until these nodes have properly started, and the `this.timeout(30000)` ensures the tests don't exit early while waiting for these processes to begin (e.g., this is a 30 second timeout).

Now, let's set up a unit test. We'll import `equal` from node's `assert`, mocha helpers, and some helpers for Local Tableland. We'll also make use of the Tableland SDK in this example, but its usage will come from a helper method that comes with `@tableland/local`.

We'll use the second account from the `getAccounts` helper. This is important to note because the first account is specifically used during the Registry contract's deployment process, so it's always a bit safer to start with a fresh account. We'll connect this account to a new Tableland SDK `Database` instance—this is provided to you using the `getDatabase` helper.

```js title="test/unit.js"
import { match } from "assert";
import { describe, test } from "mocha";
import { getAccounts, getDatabase } from "@tableland/local";

describe("unit", function () {
  this.timeout(10000);

  const accounts = getAccounts();
  const db = getDatabase(accounts[1]);

  test("passes when a table is created", async function () {
    const prefix = "test";
    const { meta } = await db.prepare(`CREATE TABLE ${prefix} (a int);`).run();
    await meta.txn?.wait();
    const tableName = meta.txn?.names[0] ?? "";
    // We're using `chainId` 31337, and tables have the format `{prefix}_{chainId}_{tableId}`
    match(tableName, /test_31337_/);
  });
});
```

Note that we also use a timeout of 10 seconds here. You can adjust this based on your needs, but keep in mind that a transaction must first settle on the hardhat node before the Tableland validator processes it. This can take a few seconds end-to-end.

Finally, we'll add a `test` script to our `package.json` file:

```json title="package.json"
{
  "scripts": {
    "test": "mocha"
  }
}
```
