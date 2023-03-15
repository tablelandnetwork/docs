---
title: Gateway & response times
sidebar_label: Gateway
description: Processing times for creates & writes are largely dependent on the base chain, but read responses follow typical HTTPS response expectation.
synopsis: Tableland is always dependent on the base chain for the speed at which transactions are finalized. For each chain, nodes listen and process emitted events. When that data is materialized in Tableland node's SQLite databases, it becomes immediately accessible and queryable with high responsiveness.
keywords:
  - response times
  - gateway
---

## Basics

A gateway is a way to interface with a node within the decentralized Tableland network. This allows standard applications to access data stored in Tableland within common developer patterns, such as writing read queries via a [REST API](/fundamentals/quickstarts/api-quickstart).

The core team that's behind the Tableland protocol currently runs and offers open access to the following gateways:

- Mainnets: `https://tableland.network`
- Testnets: `https://testnets.tableland.network`

Namely, a Tableland validator node runs separate endpoints for both mainnets and testnets. It ensures Tableland nodes can configure which chains they support and ensures a separate database runs for each environment.

## Response times

Based on current usage patterns, the gateway response latency has an **average of ≤ 100 ms** but can range from **~10 ms to ~200 ms**, depending on the geographical location.

Read query latency will vary by location and should broken into two components: a validator node, and a gateway. As noted, at the validator level, the execution time is (on average) ≤ 2 ms. Each validator will ultimately choose if and how to implement its own gateway, so these metrics correspond to the core team's managed gateways. In the future, Tableland plans on adding additional scaling support to these gateways to help with minimizing response time variance by location.

For context, the gateway uses [Cloudflare](https://www.cloudflare.com/learning/cdn/what-is-caching/) when caching requests.

## Data accessibility

Tableland tables are created or written to in three primary steps:

1. On-chain contract interaction, which creates a transaction via the contract method called. This transaction is _pending_ and not "finalized" in a block, yet.
2. Upon transaction confirmation, an event with SQL instructions is emitted.
3. Upon the event emittance, a Tableland network node listens to, processes, and then materializes the SQL instructions (validate syntax, access controls, etc.).

![Tableland contract flow](@site/static/assets/tableland-contract-flow.png)

Since the first step is a direct contract interaction, this means that a transaction must be created _and_ included in a finalized block before Tableland can process the SQL instructions accordingly. Tableland leverages the base chain’s consensus and execution and is, thus, dependent on how quickly the base chain’s speed and throughput.

Note that a smart contract interaction for write queries simply passes the statement as _calldata_ and is not stored as a state variable. _Event logs_ from the chain provide this history so that Tableland table state can be recreated by anyone by the base chain’s inherent design. Table creation involves, essentially, the same steps; the only difference is that a table create _does_ alter a state variable for tracking the table’s unique table identifier upon minting / creating the table.

Once the first step is complete, an event is emitted and processed by the Tableland network. This happens in a matter of milliseconds and is negligible as compared to the chain-dependent transaction inclusion step.

### Chain dependency

In the steps outlined above, the first one is crucial to understand. Every chain is going to process a transaction with varying speeds. As with any blockchain, usage can also affect the speed at which a transaction is included in a block. in times of high congestion, the "average" time for transaction inclusion can be much slower than at times of low congestion.

Thus, when a table is created or written to, there will be a "lag" between calling the smart contract and the time at which the data is materialized in Tableland. Once a transaction is included in a finalized block, an event is emitted, and the Tableland network of nodes process the SQL instructions in, on average, ≤ 2 ms.
