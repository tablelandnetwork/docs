---
title: Considerations & tradeoffs
sidebar_label: Why use Tableland?
description: Tableland offers a new solution to suboptimal web3 data storage standards.
synopsis: Selecting the chain to deploy tables on has a significant impact on the subsequent usage of the table. But before selecting a chain to then use Tableland’s capabilities, it may be helpful to consider the alternatives to Tableland in the first place.
---

:::tip
Be sure to [read the introduction](what-is-tableland) on what is Tableland and how it works.
:::

## Web3 data

The three most common places people will store data in web3 include:

1. Distributed / decentralized file storage.
2. Centralized service provider.
3. On-chain.

Each of these decisions comes with a price (literally & figuratively). On-chain "everything" data is a nice idea but isn't optimal for many uses cases. If you're storing something off-chain in a centralized database or decentralized file storage, there is no "linkage" to the host blockchain—that's where Tableland comes into play. Since all table creates and data writes are on-chain operations, you take advantage of blockchain-native features while also offloading the data's storage and accessibility to an off-chain decentralized database network. A win-win for unstoppable web3 data.

import ThemedImage from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";

<!--prettier-ignore-->
export const Tbl = () => {
  return (
    <ThemedImage
      alt="Tableland themed image"
      sources={{
        light: useBaseUrl("/img/tableland/logo-black.svg"),
        dark: useBaseUrl("/img/tableland/logo-white.svg"),
      }}
       width="150em"
       style={{margin: "0 auto"}}
    />
  );
};

| Environment           | Scaling cost                                         | Mutability                                            | Composability                               |
| --------------------- | ---------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------- |
| On-chain              | <span className="circle-red"></span> Limited, costly | <span className="circle-red"></span> Costly           | <span className="circle-green"></span> High |
| Decentralized storage | <span className="circle-green"></span> Pretty cheap  | <span className="circle-red"></span> Costly & complex | <span className="circle-yellow"></span> Low |
| Centralized storage   | <span className="circle-green"></span> Great, cheap  | <span className="circle-green"></span> Yes, cheap     | <span className="circle-red"></span> None   |
| <Tbl />               | <span className="circle-green"></span> Pretty cheap  | <span className="circle-green"></span> Flexible       | <span className="circle-green"></span> High |

### Smart contract storage

One pattern developers often turn to is writing _all data_ to smart contract storage (on-chain maxis, rejoice!). Here, developers put all they possibly can on-chain—e.g, an image could be written on-chain as an SVG string, like `data:image/svg+xml;base64,PHN2...`, instead of stored as a standard image file (JPEG, PNG, or SVG) on IPFS. Or, maybe some data is part of a `struct` and `mapping` combination that can be read by other contracts.

This is quite cool! The data is interoperable by default since it's all on-chain. It is fully composable to where other projects can build on of it—such as making a derivative NFT that, for example, simply toggles traits on/off after reading the on-chain SVG data. Plus, the data is guaranteed to exist as long as the chain itself lives. With the IPFS or centralized storage options, there is no such guarantee. Persisted file solutions (like Filecoin and Arweave) at least provide persistence guarantees within their own network, but again, there are some clear drawbacks (lack of mutability, queryability) and no "linkage" to the chain itself. They're isolated networks.

One key consideration here is **cost**; you must store data in the contract. This _does_ allow data to be mutable, but that means you’d have to overwrite values in contract storage, which is costly since blockchains store global state (summary of every contract and account interaction on the network). Also, you don't have a way to access that data efficiently (select data, aggregate it, join together, etc.) without indexing networks like [The Graph](https://thegraph.com/docs/en/), which is an entirely separate workflow.

### Decentralized _file_ storage

The defacto web3 solution for large data and media is IPFS. Keep in mind that IPFS is a _distributed file system_, and _decentralizing_ this storage requires a network like Filecoin or Arweave for incentivized persistance. IPFS is great for storing files using content addressing, which uniquely identifies a file and not its location (called a "CID"), but it's imperfect for _data_ storage.

Think of _data_ in this context as "small" and a _file_ as "large" media. File storage solutions are amazing and built for, well, storing files and large media. However, they **lack query features, metadata, and dynamism**. Imagine you upload a JSON file on IPFS, so you get its unique CID in return. Now, determine what the value is at some key in the JSON object—and do so without downloading the file itself and reading / parsing it. Or, programmatically take two different JSON files stored on IPFS and query / compose their metadata together, joined by matching some key. You, quite simply, can't.

#### Augmentation

Tableland works great to _augment_ IPFS. Without a solution like Tableland, data embedded in some JSON file on IPFS is not easily queryable nor described for discoverability purposes. It is a perfect setup if you pair these solutions together, where large files (like images, website frontends, or large datasets) are stored on IPFS / Filecoin, and pointers (CIDs) are stored in Tableland tables. Another common use case is large datasets stored on these networks but without any easily queryable metadata about what is stored at the CID itself—another great combination where Tableland tables can describe this information.

Note that with "pinning" a file to the IPFS network, you have greater guarantees of its long-term persistance. For _true_ persistance, you need to use an actual decentralized network with built-in incentives for storing the data. This is where solutions like Filecoin come into play. For more information about IPFS, [read more about persistence, permanence, and pinning](https://docs.ipfs.tech/concepts/persistence/).

### Centralized storage

With centralized solutions (AWS, Google Cloud, etc.), developers can easily store and mutate data. You could even use a combination of the "augmentation" example above with images being stored on IPFS or similar, and the CIDs are stored on the centralized server. It’s a partial web2-web3 approach. The primary benefit here is that by managing your own database (i.e., outsource to centralized service providers), you have full control over storing, mutating, and querying the data at a relatively low cost with high efficiency.

But, all of your data sits behind a wall that the service provider owns and controls, and each service might offer an entirely a different way to interface with that relational data. Data is not interoperable and, obviously, limits how web3 data can interact with each other. It also detracts entirely from the web3 value proposition. When you are storing data in a centralized server, how does another developer openly read your database's data? If you want to collaborate on data with some external entity, how do you provision access and allow them mutate data?

That is, using a centralized database silos the data and prevents true composability and interoperability. What's needed is a global, _shared_ database. Permissionless access controls offer a much simpler way of enabling collaboration, and a web3 database provides a single data layer with a unified interface.

## Data on Tableland

Tableland offers the best of all of these approaches in an optimal on-chain=>off-chain hybrid approach.

1. Creating and mutating data are handled on-chain (SQL instructions written to logs) with account-based access control and ownership.
2. Store large media (images, files) on IPFS, Filecoin, or similar, and include pointers to the CIDs within tables.
3. Query the data off-chain in a decentralized SQL database network and across any chain for true interoperability.

Hence, data is cheaply secured on-chain and natively composable using off-chain queries.

But, not _every_ relational database or use case makes sense to live in web3 relational Tableland tables. The main consideration is write frequency and the chain in which the table has been deployed on, since both of these attribute to table usability and feasibility (costs). Recall that each chain will have varying block finalization times, so the base chain greatly impacts data throughput.

:::note
Consider only a use case that, at its fastest, needs to write data at the **same speed** of the **base chain's block times**—how quickly a chain includes new blocks determines the write velocity—and can justify the chain's **transaction costs** that come along with it.
:::

For reference, Ethereum and the "rollup" scaling solutions all have a max block gas limit of 30 million gas. Polygon has a maximum of 20 million gas per block. Knowing this, along with the gas used for create / write transactions, can be helpful when designing and understanding if a use case make sense for Tableland.

## Competitive solutions

Tableland isn't the only option developers use for web3 storage. You should already be familiar with web3 data problems developers have had to make around on-chain storage, centralized providers, and decentralized file solutions (IPFS / similar). These aren't really _competitive_ solutions, per se, but alternatives developers have had to use due to lack of web3-native options.

In the web3-specific database space, there are a few protocols developers are using—each with different approaches:

- [Ceramic](https://ceramic.network/): Rather complex concepts, acts as a standalone network (no interaction with any host chains), and uses its own identity design (rather than EVM accounts).
- [Polybase](https://polybase.xyz/docs/introduction): Not intended for smart contract devs, _somewhat_ decoupled from the host chain (zk-rollup). You lose ability for an on-chain actions and access controls to drive table changes, which has different security / data availability tradeoffs and complicates application development.
- [Space and Time](https://www.spaceandtime.io/): More so focused on being a general web3 data warehouse with on- and off-chain data indexing (i.e., "Snowflake for web3").
- [The Graph](https://thegraph.com/docs/en/): Not _really_ a competitor (Tableland isn't focused on indexing). Think of The Graph as a way to query full history EVM data (i.e., "Google for web3"), whereas Tableland is intended for chain-driven data liveliness. (It works better in tandem _with_ Tableland, such as subgraphs for table history.)
