---
title: Limits
description: A listing of table, data, and query limits.
keywords:
  - limits
  - cell limit
  - row limit
  - column limit
  - data limit
---

Since Tableland is still in open beta, each table is limited to the following constraints while the full production network is further clarified. These are temporary limits while the production mainnet is further researched.

<div className="row margin-bottom--lg">
<div className="col">

## Table limits

| Constraint | Max size |
| ---------- | -------- |
| Rows       | 500000   |
| Columns    | 24       |

</div>

<div className="col">

## Data limits

Each cell limit is **1kb**.

Tableland is _not a file storage_ solution. Instead, use pointers to solutions like IPFS, Filecoin, & Arweave to enable large file integrations and store the pointers in table cells.

</div>
</div>

:::info
Since the Tableland network is currently in [open beta](/fundamentals/about/open-beta), row limits have been imposed. When Tableland launches a _production network_ (its own mainnet), there **likely won’t be row limits**. This is subject to change based on pending research.
:::

## Query limits

Query size is limited to a **maximum of 35kb.**

Recall that mutating queries require an on-chain operation—thus, a limit for write queries must abide by standard blockspace constraints. That is, Tableland inherits EVM-based limitations, including computational gas that exceeds the gas limit. For reference, multiple transactions are fully supported such that one or more SQL statements can exist in a single block, which could near this query limit for a large set of writes.

Note that on Ethereum, due to the block gas limit (30 million gas), the query limit is reached when it is around **14.5kb**. In other words, query size is limited to 14.5kb when writing to Ethereum mainnet only; other chains should assume a maximum of 35kb.

:::tip
You can create tables and write data to it within the same on-chain transaction, but note that database operations are _atomic_. If one of these fail, then all operations in that transaction fail—so be careful to not exceed the query size limit!

:::

### Query "lag"

When a table is created or written to, there will be a "lag" between calling the smart contract and the time at which the event’s SQL instructions are materialized in Tableland. This "lag" is documented below as **a chain-driven limitation** due to block times and block depth. See the [chains](/fundamentals/chains) page for more information on how this works.

| Chain         | Avg. block finalization time | Block depth | Avg. SQL materialize time |
| ------------- | ---------------------------- | ----------- | ------------------------- |
| Ethereum      | 13.5 seconds                 | 1           | 30-40 seconds             |
| Optimism      | 2 seconds                    | 0           | <5 seconds                |
| Arbitrum One  | <2 seconds                   | 0           | <5 seconds                |
| Arbitrum Nova | 2-3 seconds                  | 0           | <5 seconds                |
| Polygon       | 2 seconds                    | 1           | <10 seconds               |
| Filecoin      | 30 seconds                   | 5           | ~ 4 mins.                 |

### Table reads

**All table reads** must happen through an off-chain interaction using an unauthenticated REST API call to a Tableland validator node's gateway.

The TL;DR is that table _reads_ directly access the Tableland network, and mutating database instructions (_create_ & _write_ transactions) are on-chain actions. You can make read queries at a gateway, such as the one hosted by the core Tableland team. For more information, see the docs on [gateways](/fundamentals/architecture/gateway).

:::note
**It is not possible** for a smart contract to read data from a table created in Tableland. Using an oracle or some off-chain logic to write data back on chain (e.g., inbox-outbox type of setup) is an alternative.

:::
