---
title: Considerations & tradeoffs
description: Tableland offers a solution to the suboptimal standards, and choosing a chain greatly impacts user experience & costs.
synopsis: Selecting the chain to deploy tables on has a significant impact on the subsequent usage of the table. But before selecting a chain to then use Tableland’s capabilities, it may be helpful to consider the alternatives to Tableland in the first place.
---

## Web3 data & databases

### Background

The three most common places people will store data in web3 include:

1. Smart contract storage variable (i.e., on the blockchain)
2. IPFS or persisted decentralized file storage
3. Centralized server

For example, traditional NFT collections will often deploy a metadata model that uses either IPFS or centralized storage, rarely writing metadata on-chain. Each of these decisions comes with a price (literally & figuratively):

|                       | Scaling Cost    | Mutability       | Composability |
| --------------------- | --------------- | ---------------- | ------------- |
| On-chain              | Limited, costly | Costly           | High          |
| Decentralized Storage | Pretty cheap    | Costly & complex | Low           |
| Centralized Storage   | Great, cheap    | Yes, cheap       | None          |
| Tableland             | Pretty cheap    | Flexible         | High          |

### Smart Contract Storage

Smart contract storage is expensive. Writing to _storage_ is a transaction that results in altering the global chain’s state. There’s a reason why many projects will choose to store only a subset of “required” data on-chain while much of the application data exists in some off-chain setting.

Tableland takes a slightly different approach. Although all mutating queries _must go through_ a smart contract interaction, the data itself is not written to storage. Instead, it’s passed as _calldata_; the data passed in the function call. Thus,

### Decentralized Storage

Decentralized storage can include IPFS or “persistent” solutions like Filecoin or Arweave. Storing a file on IPFS is cheap...it doesn’t cost anything; but, there are risks involved. A file on IPFS must be "pinned" by an IPFS node to guarantee it won’t “disappear” (garbage collection happens for unused files), which may involve some payment for the service, depending on storage used. A final note is that persistance solutions like Filecoin and Arweave are also great solutions for storing files or very large datasets.

It’s important to note these are _immutable_ _file storage_ solutions — they’re not meant for _querying_ or _composing_ data. In fact, the files themselves are immutable, so common database operations like inserting and updating data cannot be done in the same file. For example, to achieve mutability with IPFS, one must republish files with new changes, which generates a new IPFS CID (unique identifier that represent the file contents) — and lastly, change the original CID to this new identifier.

Decentralized storage providers are essential to the web3 data equation. However, part of the missing piece in the equations is a web3-native metadata solution for the files stored on decentralized storage networks.

#### Augmentation

Tableland works great to _augment_ IPFS, but without a solution like Tableland, IPFS data is not easily queryable nor described for discoverability purposes. Plus, IPFS is a totally independent network from any EVM-based chain, so true composability is also a challenge.

For more information, [read more about persistence, permanence, and pinning](https://docs.ipfs.tech/concepts/persistence/).

### Centralized Storage

Often, projects will store application data or NFT metadata in a typical web2 database, such as with AWS or Google Cloud. Due to the points above, this is a common practice since, traditionally, web3-native solutions haven’t offered the necessary capabilities that normal databases offer — the ability to cheaply store, write, and easily query data.

But, composability is entirely lost in a centralized setting. Data is often walled off and isn’t openly readable such that anyone can make a query and compose data across tables. The value of web3 is lost for those who choose this approach.

## Data on Tableland

### Background

Tableland offers the best of all three worlds outlined above. Use Tableland to:

1. Store data in a web3 native setting
2. Do so in a low cost capacity
3. Easily query and compose across any table

But, not _every_ relational database or use case makes sense to live in web3 relational Tableland tables. The main consideration is write frequency and the chain in which the table has been deployed on, since both of these attribute to table usability and feasibility (costs). Recall that each chain will have varying block finalization times, which impacts the table create / write velocity:

| Chain    | Average Block Finalization Time |
| -------- | ------------------------------- |
| Ethereum | 13.5 seconds                    |
| Optimism | 2 seconds                       |
| Arbitrum | 5 seconds                       |
| Polygon  | 2 seconds                       |

> Consider only a use case that, at its fastest, needs to write data at the **same speed** of the **base chain's block times** — how quickly a chain includes new blocks determines the write velocity, and **transaction costs** come along with it.

For reference, Ethereum and the “rollup” scaling solutions all have a max block gas limit of 30 million gas; Polygon has a maximum of 20 million gas per block. Knowing this, along with the gas used for create / write transactions, can be helpful when designing and understanding if a use case make sense for Tableland.

:::tip
For more details on chains making a decision on which one to use, see the reference on selecting a chain.
[Chain Selection](/develop/chains/)
:::

### Use Cases

The following identify some potential use cases; this list is non-exhaustive but provides guidelines / considerations, which are still somewhat dependent on chain selection.

#### NFTs

- All NFT metadata can exist in tables.
- A best practice is to actually create _multiple_ tables to efficiently store metadata, such as a “main” and “attributes” table that are composed into ERC-721 compliant metadata for each token.
- Storing mainnet NFT metadata in tables deployed on cheaper chains is also possible for _static_ metadata that doesn’t need on-chain logic (e.g., check ownership of a token in order to mutate).
- Additional considerations include any use case for _dynamic_ NFTs where metadata should be mutable and/or governed by ownership (e.g., togglable Pfp traits or badges).

#### Gaming & metaverse

- Many of the gaming use cases work well due to the infrequency of writes, but that’s not to say more frequent interactions can’t exist in a table.
- Examples include leaderboards, game state (depending on write frequency), user settings, character inventory, or ideas mentioned for NFTs.

#### Publicly owned data & token gating

- On-chain access controls are baked into the protocol where token ownership or address checks can dictate table access (e.g., mutate a row).
- Storing publicly shared data (e.g., CMS, knowledge base, etc.) Tableland table to describe the pointers & dictate those who can write to it. Large

#### Application Data

- Lower frequency application data that doesn’t result in a _high velocity_ of table writes is ideal.
- This could include data like user settings, comments / posts, or session data — assuming the data can be publicly readable.

:::tip
As a best practice, developers should educate their users on what they’re using and how _any_ _Tableland table’s_ data is publicly available.
:::

### What to Avoid

- **Personally identifiable data** — Tableland is an _open network_ such that _anyone_ can read from any table. Thus, personal data shouldn’t be stored in Tableland.
- **High frequency, sub-second writes** — such as a high frequency trading bot.
- **Storing _every_ user interaction in an application** — it probably doesn’t make sense for this data to live in an web3 table, such as keystrokes or clicks. The write frequency would result in high costs.
- **Extremely large datasets** — these should be avoided and are better handled by file storage, using solutions like IPFS, Filecoin, or Arweave. But, _the pointers to these locations_ and related metadata are a great use case for Tableland tables, actually.
