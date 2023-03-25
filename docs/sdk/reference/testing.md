---
title: Testing
description: Learn how to create test scripts that use Local Tableland under the hood.
---

It’s useful to leverage [`@tableland/local`](/quickstarts/local-tableland) in test suites, such as with the `[mocha](https://mochajs.org/)` testing framework. It’s important to test if the table creation, writes, and reads are all behaving as expected.

## Installation & setup

To accomplish this, first, install `@tableland/local` (and this assumes you already have the SDK installed):

```bash
npm i -D @tableland/local
```

The following details what you'll need to do from here:

1. Import the named `LocalTableland` export from `@tableland/local`.
2. Create an instance of `LocalTableland`—here’s it’s stored as an `lt` variable.
3. Call the `start()` method to launch the Tableland network; this launches all of the required local nodes (hardhat + Tableland) to allow for tests to be written for tables.
4. Call the `stop()` method to stop the network; this should only happen once the tests finish.

A best practice is to **only start a single network** to run all of your tests against. In other words, **do not create** a `LocalTableland` instance for each test but only at the start. The following provides a basic skeleton of what this should look like with [global setup fixtures](https://mochajs.org/#global-setup-fixtures):

```js title="test/setup.js"
import { after, before } from "mocha";
import { LocalTableland } from "@tableland/local";

// Set `silent` or `verbose` with boolean values
// You'll likely want to silence logging during tests
const lt = new LocalTableland({ silent: true });

before(async function () {
  this.timeout(15000);
  lt.start();
  await lt.isReady();
});

after(async function () {
  await lt.shutdown();
});
```

Within `setup.js`, the local Tableland network starts and stop with the global fixtures; these will run before and after the tests elsewhere are executed. For Tableland and crypto-specific tests, you’ll want to import the `@tableland/sdk` package and `ethers`.

## Next Steps

```js title="test/index.test.js"
// Use the `assert` library for more testing features
import { strictEqual, deepStrictEqual } from "assert";
// Standard for `mocha` testing
import { describe, test } from "mocha";
// `getAccounts` is a useful utility method to get accounts on the local network
import { getAccounts } from "@tableland/local";
// Get the provide using the `ethers` lib utility method
import { getDefaultProvider } from "ethers";
// Lastly, import the `connect` method for connecting to local Tableland
import { Database, Statement } from "@tableland/sdk";

describe("statement", function () {
  // Note that we're using the second account here
  const [, wallet] = getAccounts();
  const provider = getDefaultProvider("http://127.0.0.1:8545");
  const signer = wallet.connect(provider);
  const db = new Database({ signer });

  test("when created via db.prepare()", async function () {
    const sql = "CREATE TABLE test (counter integer);";
    const stmt = db.prepare(sql);
    strictEqual(stmt.toString(), sql);
    deepStrictEqual(stmt, new Statement(db.config, sql));
  });

  test("when executing mutations works and adds rows", async function () {
    const sql = "CREATE TABLE test (counter integer);";
    const stmt = db.prepare(sql);
    const sql = `INSERT INTO ${tableName} (counter) VALUES (5);
    INSERT INTO ${tableName} (counter) VALUES (9);`;
    const { meta } = await db.exec(sql);
    assert(meta.duration != null);
    strictEqual(meta.count, 2);
    assert(meta.txn != null);

    await meta.txn.wait();

    const results = await db.prepare("SELECT * FROM " + tableName).all();
    strictEqual(results.results.length, 2);
  });
});
```

As you get started with testing, it may be helpful to check out the [`js-template`](https://github.com/tablelandnetwork/js-template) repo, which comes packed with useful Tableland-specific features, including the example tests noted above.
