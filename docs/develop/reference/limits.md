---
title: Limits
description: A listing of the table/data limits and smart contract deployment locations on supported chains.
synopsis: Since Tableland is still in open beta, each table is limited to the following constraints while the full production network is further clarified. These are temporary limits while the production mainnet is further researched.
keywords:
  - limits
  - cell limit
  - row limit
  - column limit
---

## Table limits

| Constraint | Max size |
| ---------- | -------- |
| Rows       | 500000   |
| Columns    | 24       |

## Data limits

Each cell limit is **1kb.**

Tableland is _not a file storage_ solution. Instead, use pointers to solutions like IPFS, Filecoin, & Arweave to enable large file integrations and store the pointers in table cells.

:::tip
Since the Tableland network is **_currently in open beta_** (testnet), row limits have been imposed. When Tableland launches its **_production network_** (mainnet), there likely _won’t be row limits_. This is subject to change based on pending research.

:::

## Query limits

Query size is limited to a **maximum of 35kb.**

Recall that mutating queries require an on-chain operation—thus, a limit for write queries must abide by standard blockspace constraints. That is, Tableland inherits EVM-based constraints, including computational gas exceeding the gas limit. Additionally, note **_there are not limits_** when it comes to the number of transactions in a single block; multi-transaction events are fully supported (e.g., mint more than one table and/or immediately insert into it in a constructor).

Note that on Ethereum, due to the block gas limit (30 million gas), the gas limit is reached when a query is around **14.5kb**. In other words, query size is limited to 14.5kb when writing to Ethereum mainnet only; other chains should assume a maximum of 35kb.

:::tip
For more details on multi-transactions and Tableland execution, read the overview about [Tableland state](/concepts/network/tableland-state) and how it relates to the EVM.

:::

### Query "lag"

When a table is created or written to, there will be a "lag" between calling the smart contract and the time at which the event’s SQL instructions are materialized in Tableland. This "lag" is documented below as **_a chain-driven limitation_** of block times:

| Chain    | Average Block Finalization Time |
| -------- | ------------------------------- |
| Ethereum | 13.5 seconds                    |
| Optimism | 2 seconds                       |
| Arbitrum | 2 seconds                       |
| Polygon  | 2 seconds                       |

For more information, see [Response Times](/concepts/network/response-times).

### Table Reads

Table _reads_ directly access the Tableland network, which is distributed infrastructure that is separate from the chain itself (but still uses the execution and consensus mechanisms of the chain). All SQL instructions (create & write transactions) are stored on-chain in cheap event logs, but this makes the data inaccessible to smart contracts. Namely, smart contracts **cannot read the logs,** and the Registry smart contract methods are designed to emit events for SQL materialization.

As such, _all reads_ must happen through an offchain interaction, such as REST API calls to the Tableland gateway or validator JSON RPC calls.

:::tip
Currently, **_it is not possible_** for a smart contract to read data from a table created in contracts. Using an oracle or some offchain logic to write data back on chain (e.g., custom inbox-outbox type of setup) is an alternative.

:::
