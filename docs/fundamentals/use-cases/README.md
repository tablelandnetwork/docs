---
title: Use cases
description: A series of general use cases to consider.
keywords:
  - use cases
---

This page identifies some potential use cases. It is non-exhaustive but provides guidelines / considerations for where developers can use Tableland, and as always, consider the host chain as part of the use case criteria (e.g., Ethereum is more expensive to write to than an L2).

## Hybrid data model

Ultimately, Tableland aims to provide a web3-native database that is competitive to that of traditional web2 database solutions. The chain in which you deploy to dictates [how expensive](/fundamentals/architecture/cost-estimator) it is to write data, so this should be a major consideration in what type of data you're storing.

The TL;DR is that Tableland can be used as a data storage option with onchain data availability and offchain data accessibility within the decentralized SQL database network. This opens the doors for endless possibilities that provide a dual pronged approach toward web3 data: onchain actions trigger offchain mutations that can easily be read at the application layer. It's sort of a lively cache for smart contract state / onchain data.

### Application data

- For _high velocity_ table writes, choose a chain like [Arbitrum Nova](/quickstarts/chains/arbitrum#arbitrum-nova) that can handle the volume and is [cheap to use](/fundamentals/architecture/cost-estimator).
- This could include ideas such as the following, and note that data is publicly readable unless you implement some form of encryption before writing the data:
  - User settings.
  - Comments / posts.
  - Session data.

### NFTs & gaming

- Dynamic NFT metadata stored in SQL tables to allow user / owner controlled action to change NFT attributes (e.g., check ownership of a token in order to mutate).
- Cross-chain table storage for multichain NFTs where metadata is composed at the NFT smart contract.
- Global leaderboards, game state, user settings, character inventory, or anything that needs a way to store game data in a permissionless database.

:::tip
Looking for more? Check out the page on [how to build an NFT](/playbooks/concepts/how-to-build-an-nft), including additional resources for defining an [optimal SQL table structure](/playbooks/concepts/nft-metadata) or [building a dynamic NFT in Solidity](/tutorials/dynamic-nft-solidity).
:::

### Data pipelines & DAOs

- Datasets that require permissionless data storage for open read access, such as AI/ML workloads.
- Storing large media on file storage networks (IPFS, Filecoin, etc.) where pointers and metadata exist in tables.
- Access controls are baked into the protocol to allow for token ownership or onchain checks to dictate table mutations (e.g., mutate a row only if provisioned by the dataset's controller).
- Storing publicly shared data, like a CMS or knowledge base, related to DAO operations.

:::note
As a best practice, developers should educate their users on what they’re using and how Tableland table data is publicly available (i.e., encryption is not a native feature).
:::

## What to avoid

- **Personally identifiable data**: Tableland is an _open network_ such that _anyone_ can read from any table. Thus, personal data shouldn’t be stored in Tableland unless encrypted.
- **High frequency, sub-second writes**: Most chains that cannot handle this volume / speed—such as a high frequency trading bot.
- **Storing _every_ user interaction in an application**: It probably doesn’t make sense for this data to live in an web3 table, such as keystrokes or clicks. The write frequency would result in high costs unless some sort of batching mechanism is used (e.g., aggregate user data over some time period and only update this data at a more cost effective frequency)
- **Extremely large datasets or files**: These should be avoided and are better handled by file storage, using solutions like IPFS, Filecoin, or similar. But, _pointers to these locations_ (like CIDs) and related metadata are a great use case for Tableland tables, actually.
