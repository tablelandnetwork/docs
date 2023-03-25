---
title: Use cases
description: A series of general use cases to consider.
keywords:
  - use cases
---

This page identifies some potential use cases. It is non-exhaustive but provides guidelines / considerations for where developers can use Tableland, and as always, consider the host chain as part of the use case criteria (e.g., Ethereum is more expensive to write to than an L2).

## Hybrid data model

The TL;DR is that Tableland can be used as a data storage option with on-chain data availability and off-chain data accessibility within the decentralized SQL database network. This opens the doors for endless possibilities that provide a dual pronged approach toward web3 data: on-chain actions trigger off-chain mutations that can easily be read at the application layer. It's sort of a lively cache for smart contract state / on-chain data.

:::tip
Be sure to check out the various [considerations & tradeoffs](/fundamentals/considerations-tradeoffs) before diving in.
:::

### NFTs & gaming

- Dynamic NFT metadata stored in SQL tables to allow user / owner controlled action to change NFT attributes (e.g., check ownership of a token in order to mutate).
- Cross-chain table storage for multichain NFTs where metadata is composed at the NFT smart contract.
- Global leaderboards, game state, user settings, character inventory, or anything that needs a way to store game data in a permissionless database.

### Data DAOs & token gating

- Storing large media on file storage networks (IPFS, Filecoin, etc.) where pointers and metadata exist in tables.
- Access controls are baked into the protocol to allow for token ownership or on-chain checks to dictate table mutations (e.g., mutate a row only if provisioned by the dataset's controller).
- Storing publicly shared data, like a CMS or knowledge base, related to DAO operations.

### Application data

- Lower frequency application data that doesn’t result in a _high velocity_ of table writes is ideal.
- This could include data like user settings, comments / posts, or certain session data—assuming the data can be publicly readable.

:::note
As a best practice, developers should educate their users on what they’re using and how Tableland table data is publicly available (i.e., encryption is not a native feature).
:::

## What to avoid

- **Personally identifiable data**—Tableland is an _open network_ such that _anyone_ can read from any table. Thus, personal data shouldn’t be stored in Tableland (unless encrypted).
- **High frequency, sub-second writes**—such as a high frequency trading bot.
- **Storing _every_ user interaction in an application**—it probably doesn’t make sense for this data to live in an web3 table, such as keystrokes or clicks. The write frequency would result in high costs.
- **Extremely large datasets or files**—these should be avoided and are better handled by file storage, using solutions like IPFS, Filecoin, or similar. But, _pointers to these locations_ and related metadata are a great use case for Tableland tables, actually.
