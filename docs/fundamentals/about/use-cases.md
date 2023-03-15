---
title: Use cases
sidebar_position: 4
description: A series of general use cases to consider.
synopsis: This page identifies some potential use cases. It is non-exhaustive but provides guidelines / considerations for where developers can use Tableland, and as always, consider the host chain as part of the use case criteria (e.g., Ethereum is more expensive to write to than an L2).
keywords:
  - use cases
---

## Hybrid data model

The TL;DR is that Tableland can be used as a data storage option with on-chain data availability and off-chain data accessibility within the decentralized SQL database network. This opens the doors for endless possibilities that provide a dual pronged approach toward web3 data: on-chain actions trigger off-chain mutations that can easily be read at the application layer. A sort of cache.

:::tip
Be sure to check out the various [considerations & tradeoffs](../basics/considerations-tradeoffs) before diving in.
:::

### NFTs

- All NFT metadata can exist in tables.
- A best practice is to actually create _multiple_ tables to efficiently store metadata, such as a “main” and “attributes” table that are composed into ERC-721 compliant metadata for each token.
- Storing mainnet NFT metadata in tables deployed on cheaper chains is also possible for _static_ metadata that doesn’t need on-chain logic (e.g., check ownership of a token in order to mutate).
- Additional considerations include any use case for _dynamic_ NFTs where metadata should be mutable and/or governed by ownership (e.g., togglable Pfp traits or badges).

### Gaming & metaverse

- Many of the gaming use cases work well due to the infrequency of writes, but that’s not to say more frequent interactions can’t exist in a table.
- Examples include leaderboards, game state (depending on write frequency), user settings, character inventory, or ideas mentioned for NFTs.

### Data DAOs & token gating

- On-chain access controls are baked into the protocol where token ownership or address checks can dictate table access (e.g., mutate a row).
- Storing publicly shared data (e.g., CMS, knowledge base, etc.) Tableland table to describe the pointers & dictate those who can write to it. Large

### Application data

- Lower frequency application data that doesn’t result in a _high velocity_ of table writes is ideal.
- This could include data like user settings, comments / posts, or session data — assuming the data can be publicly readable.

:::note
As a best practice, developers should educate their users on what they’re using and how Tableland table data is publicly available (i.e., encryption is not a native feature).
:::

## What to avoid

- **Personally identifiable data**—Tableland is an _open network_ such that _anyone_ can read from any table. Thus, personal data shouldn’t be stored in Tableland (unless encrypted).
- **High frequency, sub-second writes**—such as a high frequency trading bot.
- **Storing _every_ user interaction in an application** — it probably doesn’t make sense for this data to live in an web3 table, such as keystrokes or clicks. The write frequency would result in high costs.
- **Extremely large datasets or files**—these should be avoided and are better handled by file storage, using solutions like IPFS, Filecoin, or Arweave. But, _the pointers to these locations_ and related metadata are a great use case for Tableland tables, actually.
