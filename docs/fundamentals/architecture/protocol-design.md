---
title: Protocol design
description: The Tableland protocol operates as a data scaling solution using chain-powered database mutations and a parallel adjacent network.
keywords:
  - protocol
  - protocol design
---

import { ChainsList } from '@site/src/components/SupportedChains'
import ThemedImage from "@theme/ThemedImage";

## Background

Tableland is a permissionless web3 database. It sits alongside Ethereum and Layer 2 (L2) chains but is purely focused on data storage and retrieval. Namely, Tableland helps scale smart contract storage by offloading data accessibility to a decentralized network that executes database instructions, signaled by onchain interactions and access policies. The SQL execution summary is stored a chain's transaction event logs (an inexpensive form of chain-secured storage).

This design makes it more cost effective to store data in a web3 native solution while allowing it to be queryable with SQL. Ownership is also an inherent feature due to ERC721 token-based tables. Instead of running your own siloed database, you share a network of free flowing data but _own_ your data and can fully control the table's representation. All data is openly readable to enable full composability and interoperability between your application and anyone else's data stored on Tableland.

## Hybrid state

Tableland has _registry_ contracts deployed on each chain (currently live on <ChainsList type={'mainnets'} format={'string'} />). Thus, applications can take advantage of its host chain's security and execution with contract-driven SQL and access control logic. Offchain, there is a decentralized network of database "validator" nodes running the Tableland protocol. This helps guarantee there isn't a single point of failure when storing and querying table data. At a high level, the network consists of the following:

- **Onchain**: Table creates and writes pass through the registry smart contract on each base chain (statements are written to event logs). This includes the SQL statement itself plus custom access controls defined in smart contracts such that _data is available_ onchain.
- **Offchain**: Statements for table creates and writes are materialized by Tableland validator nodes—these nodes simply watch the registry and mutate a local SQLite database with the database instructions. Here, the _data is accessible_ using SQL read queries at an HTTPS gateway.

import hybridStateLight from "@site/static/assets/hybrid-state-light-mode.png";
import hybridStateDark from "@site/static/assets/hybrid-state-dark-mode.png";

<ThemedImage
alt="Hybrid state"
sources={{
    light: hybridStateLight,
    dark: hybridStateDark,
  }}
/>

In other words, you can recreate a table's state by replaying all of the events at a chain's registry contract; this is how unstoppable networks are built on top of each other. As long as the host chain survives, the table's state can deterministically be collated. Keep in mind that table data is **not** accessible from _within_ smart contract calls—you can't query a table from a contract without using some offchain [oracle](https://ethereum.org/en/developers/docs/oracles/)-like setup. Much like how smart contracts can't read transaction data, they also cannot read table data since [data is available](https://www.alchemy.com/overviews/data-availability-layer) in event logs. Thus, data accessibility is only possible using read queries directly to any Tableland node.

### Data availability

Tableland always needs a _host_ (or _base_) chain. When you create a table, an ERC721 token is minted at the Tableland registry smart contract. The contract's design is quite simple:

- Anyone can create (mint) a table.
- Only permissioned actors can alter the table.

Both of these contract methods emit an event that describes the onchain SQL action that took place. For example, if you create a table, that table is minted to the caller's address and also emits an event that describes the `CREATE TABLE` SQL statement (account or contract address, table's token ID, etc.). So, creating a table both alters the contract's onchain storage layout (an ERC721 token is created & ownership is tracked) while telling the Tableland network what happened via an event.

When you try to alter that table, there are not any onchain storage changes that take place in the registry contract. Rather, _only_ an event is emitted, which simply describes the mutating SQL statement (table ID, address that is trying to alter the table, etc.). All of the actual materialization of the data happens within the Tableland network of validator nodes, which watch for new events and process them in their local SQLite database accordingly.

The data is _made available_ on the host chain. If you want to recreate any table's state, you simply need to go to the Tableland registry smart contract and replay all of those events. As long as that base chain lives, a table's state can be constructed by anyone.

### Data accessibility

Every time you mutate a table's state, that data is written onchain to event logs, but that doesn't mean the data is accessible onchain. Smart contracts can't access event logs, so whatever mutating SQL instructions occurred can never be pulled into a smart contract's logic and used. You can't access table data without some offchain oracle setup that reads directly from Tableland and writes values back onchain.

Namely, data is only accessible by directly making non-mutating queries to the offchain Tableland network. When you make a read query, that doesn't go through an onchain action but is entirely offchain.

The data is _made accessible_ on the Tableland network. Inherently, there are different consensus and security constraints when you look how the Tableland nodes operate. But, because the data is made available on the host chain, it provides a nice set of guarantees about the data's hardness. Overall, this adds a new dimension to web3 storage capabilities by way of a decentralized database network.

### Access control

Take a series of EVM accounts where one creates a table and others try to mutate it. Account `0x1234` creates the table (minted as an ERC721 token) and therefore owns it. This account has ultimate access control on who can mutate table data and can even delegate ACL rules to be managed by a smart contract for additional logic checks (e.g., check balance or NFT ownership for gating table writes).

Perhaps, `0x1234` would like to provision access so that `0x5678` can also mutate table data. When `0x5678` writes SQL to the registry contract, the data is subsequently materialized by a Tableland validator (success). However, when `0x90ab` attempts the same, the data **is not** mutated since this account did not have the proper permissions (fail). This is a fully permissionless setup since any EVM account can _attempt_ to alter a table, but only the provisioned accounts will be successful through trustless, onchain logic.

import accessControlLight from "@site/static/assets/access-control-light-mode.png";
import accessControlDark from "@site/static/assets/access-control-dark-mode.png";

<ThemedImage
alt="Access control"
sources={{
    light: accessControlLight,
    dark: accessControlDark,
  }}
/>

### Atomicity

Any EVM transaction execution can have two results: _success_ or _failure_. For example, if you try to send some funds from your wallet address but don’t have a high enough balance, that transaction will fail. Similarly, if you call a smart contract method and run out of gas in the middle of the execution, all the pending affected states are rolled back.

Tableland works in the same way. Tableland validators **watch for successful transaction executions** and apply those changes in the Tableland state. This explains an apparent fact: failed transactions don’t affect the state. This means there won’t be dangling changes in the Tableland network compared to the rolled back onchain state that this transaction tried to change; both _commit_ or _rollback_ decisions will be aligned. So, we have three possible results for onchain=>Tableland execution:

| Onchain execution status | Tableland execution status | Affected Tableland state?              |
| ------------------------ | -------------------------- | -------------------------------------- |
| Success                  | Success                    | <span className="circle-green"></span> |
| Success                  | Failure                    | <span className="circle-red"></span>   |
| Failure                  | Not executed               | <span className="circle-red"></span>   |

For example, in the diagram above, imagine if `0x1234` tried to run `CREATE TABLE` _and_ `INSERT` a few rows of data into that table upon first creating the table (same transaction). That wouldn't be an issue, as long as the SQL and permissions are valid! But, if `0x1234` were to—in the _same_ transaction—try to create a valid table but also insert an amount data that [exceeds the query size limit](limits), this transaction would fail; no table would be created. The write transaction was invalid. In other words, if `0x1234` had split the valid create and invalid write into separate transactions, then the table create would be successful, but the write would fail. Make sure you always account for atomic operations when designing database workflows—especially, when writing smart contracts!

## Scaling data

This demonstrates the power of Tableland. It adds a data scalability layer complete with collaboration features, predicated on the host chain's capabilities (accounts, balances, block-based throughput, etc.). You can write smart contract rules to dictate who or how something can change data, and only when the SQL is valid and rules are correct will offchain Tableland validators alter the table's representation.

If an application—or _anyone_—wants to retrieve data, they simply query the Tableland network. All table data is entirely open (unless further encrypted using other tools or protocols) and allows for multichain composable data.

### Dimensionality

Tableland's core protocol is designed to extend and enhance EVM chain storage. When you store data in smart contracts, it's expensive and also challenging to query. When you store data in event logs, it's a flat representation of that data. Logs are just a stream of onchain events associated with their transaction, and in Tableland's case, this stream is a set of SQL instructions.

import dimensionalityLight from "@site/static/assets/dimensionality-light-mode.png";
import dimensionalityDark from "@site/static/assets/dimensionality-dark-mode.png";

<ThemedImage
alt="Data dimensionality"
sources={{
    light: dimensionalityLight,
    dark: dimensionalityDark,
  }}
/>

If you were to "leave" the data in event logs, you'd still run into issues when it comes to retrieving and making use of it. There is no statefulness to the table's data since its part of an append-only log, so there's not a whole lot of functionality without additional infrastructure. To efficiently operate on event-driven data that exists in logs, you still need some purpose-built layer, which is why indexing tools like Etherscan (centralized) and The Graph (decentralized) exist.

Tableland takes a similar approach by adding dimensionality to chain-driven data. For example, the diagram above shows how some SQL events are emitted onchain, and maybe some table's `data` is updated from `1` to `2`. Every transaction submitted and included in a block provides the exact order of database and underlying table operations. Without using additional infrastructure, there wouldn't be a great way to access `data` since it'd still be in flat logs and require you determine the data's state on your own using all of the historical events.

Think of Tableland, sort of, as a queryable cache for blockchain-powered data. It's a way to access live state from what's happening onchain—or even build a full index, if designed in the correct way! Query, aggregate, and compose table data across any chain and table for truly multichain interoperable applications.
