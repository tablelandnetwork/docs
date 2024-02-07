---
title: Forking chain state
description: Fork a live testnet or mainnet chain and use its state on Local Tableland.
keywords:
  - fork
  - fork chain
  - local tableland
---

A common development pattern is to use an existing chain's state as a starting point for testing. Local Tableland supports forking a live testnet or mainnet chain, and the full chain's state is available for use. This includes any smart contract or transactions that occurred on the chain, and the Tableland table state materialized is also materialized on Local Tableland. In other words, you can interact with some table deployed on the forked, live chain as if it were a local table.

## Overview

The required parameters to fork a chain are passed during `LocalTableland` instantiation:

- `forkUrl`: The provider URL of the chain to fork, such as an Alchemy or Infura URL.
- `forkBlockNumber`: The block number to fork from, which recreates the chain state starting at that block.
- `forkChainId`: The chain ID of the chain to fork.

Once these values are set, a few things will happen:

- The chain's forked state will be initialized at the starting block number.
- Events/logs will be replayed from the forked chain, starting from the block number specified.
- The Tableland validator will process _all_ of the Tableland registry's events/logs from the forked chain up until the forked block, and the state of the tables will be materialized.

When you initially start Local Tableland, it will take a bit of time to backfill the forked chain's state. The `forkUrl` you specify for the provider will make API calls to `eth_getLogs` in batches, and the validator replays these one-by-one. Keep in mind this will continue hitting the API until the state is fully backfilled, but it _should_ be cached after the first time you run it.

:::note
Forking testnet chains _is_ possible. However, due to the large volume of data on chains like Polygon Mumbai, the backfilling process can take a **very long time**—potentially, up to an hour. We're researching ways to optimize this process (e.g., trusted bootstrap for backfilled state), but for now, it's best to fork mainnet chains with less data.
:::

## Setup

This example will use `mocha`, `chai` and `chai-as-promised`, so make sure these are installed, along with Local Tableland:

```bash npm2yarn
npm install -D @tableland/local mocha chai chai-as-promised
```

Import the necessary functions and classes from Local Tableland and the testing libraries:

```js
import { after, before, describe } from "mocha";
import { LocalTableland, getAccounts, getDatabase } from "@tableland/local";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);
const expect = chai.expect;

describe("fork", function () {
  // Set up Local Tableland and tests...
});
```

Now, let's set up the `LocalTableland` instance with the forked chain parameters. The example uses Polygon mainnet:

- `forkUrl`: The Alchemy URL for Polygon mainnet `https://polygon-mainnet.g.alchemy.com/v2/<your_alchemy_api_key>`, but be sure to replace the path parameter your API key.
- `forkBlockNumber`: The block `53200000` occurs in [early 2024](https://polygonscan.com/block/53200000).
- `forChainId`: The Polygon mainnet chain ID is `137`.

The top-level `this.timeout` is set to `30000` milliseconds, which is used for each test. But, the `before` hook that starts Local Tableland need a longer timeout, so it's set to `90000` milliseconds. After `lt.start()` is called, API calls are made to the `forkUrl` to get historical state information, and then this data is materialized by the validator, which is why an additional `setTimeout` is used to wait for the state to be fully backfilled. Depending on which chain you fork, this process can take a while—e.g., a testnet might take tens of minutes or more, whereas mainnets might take a minute or two.

```js
describe("fork", function () {
  this.timeout(30000);

  const lt = new LocalTableland({
    silent: false,
    forkUrl: "https://polygon-mainnet.g.alchemy.com/v2/<your_alchemy_api_key>",
    forkBlockNumber: "53200000",
    forkChainId: "137",
  });
  const [, signer] = getAccounts(lt);
  const db = getDatabase(signer);

  before(async function () {
    // Depending on the chain, this could take a while—adjust timeout for Local
    // Tableland startup, in case it's longer than the top-level timeout
    this.timeout(90000);
    await lt.start();
    // After calling `start`, the forked chain data must be materialized—you
    // must set this timeout to wait until all state is materialized
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve(undefined);
      }, 60000)
    );
  });

  after(async function () {
    await lt.shutdown();
  });

  // Tests here...
});
```

The first time you run this test, it will take a bit longer because the chain state is not cached. After the first run, the state should be cached (i.e., no additional API calls needed if you use the same block number). Thus, the tests should run faster in subsequent runs; however, the validator will still need to process the state from the forked chain. In other words, after each test run, the validator's state is entirely cleared, but the Hardhat node's state is cached and reused.

## Testing forked chain data

Now, let's run a couple of tests. The first test makes a read query on the `healthbot_137_1` table, which is a health check table that was deployed by the Tableland team upon launching on Polygon mainnet. The second test creates a new table on the forked chain, and the table name will be suffixed with the `chainId` of `137` and use the next available `tableId` of `245`.

```js
describe("fork", function () {
  // Exiting code...

  it("should read existing table created on forked chain", async function () {
    // The "healthbot" table is created on the forked chain
    // It always has value `1` on mainnets, whereas it's incremented on testnets
    const { results } = await db.prepare("select * from healthbot_137_1").all();
    expect(results[0].counter).to.be.equal(1);
  });

  it("should create a new table on forked chain", async function () {
    // Create a table on the forked chain
    const { meta } = await db
      .prepare("create table my_table (id int primary key, val text)")
      .run();
    await meta.txn?.wait();
    const [table] = meta.txn?.names ?? [];
    // Since the forked chain is Polygon, the table name will be suffixed with
    // with `chainId` of `137` and use the next available `tableId` of `245`
    expect(table).to.be.equal("my_table_137_245");
  });
});
```
