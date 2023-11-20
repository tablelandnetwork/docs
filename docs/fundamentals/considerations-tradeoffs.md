---
title: Considerations & tradeoffs
sidebar_label: Why use Tableland?
description: Tableland offers a new solution to suboptimal web3 data storage standards.
---

Selecting the chain to deploy tables on has a significant impact on the subsequent usage of the table. But before selecting a chain to then use Tableland’s capabilities, it may be helpful to consider the alternatives to Tableland in the first place.

:::tip
Be sure to [read the introduction](what-is-tableland) on what is Tableland and how it works.
:::

## Web3 data

The three most common places people will store data in web3 include:

1. Onchain.
2. Distributed / decentralized file storage.
3. Centralized service provider.

Each of these decisions comes with a price (literally & figuratively). Onchain "everything" data is a nice idea but isn't optimal for many uses cases. If you're storing something offchain in a centralized database or decentralized file storage, there is no "linkage" to the host blockchain—that's where Tableland comes into play. Since all table creates and data writes are onchain operations, you take advantage of blockchain-native features while also offloading the data's storage and accessibility to an offchain decentralized database network. A win-win for unstoppable web3 data.

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

| Environment                | Scaling cost                                         | Mutability                                        | Composability                               | Queryability                                |
| -------------------------- | ---------------------------------------------------- | ------------------------------------------------- | ------------------------------------------- | ------------------------------------------- |
| Onchain                    | <span className="circle-red"></span> Limited, costly | <span className="circle-red"></span> Costly       | <span className="circle-green"></span> High | <span className="circle-yellow"></span> Low |
| Decentralized file storage | <span className="circle-green"></span> Pretty cheap  | <span className="circle-red"></span> Complex      | <span className="circle-yellow"></span> Low | <span className="circle-red"></span> None   |
| Centralized database       | <span className="circle-green"></span> Great, cheap  | <span className="circle-green"></span> Yes, cheap | <span className="circle-red"></span> None   | <span className="circle-green"></span> High |
| <Tbl />                    | <span className="circle-green"></span> Pretty cheap  | <span className="circle-green"></span> Flexible   | <span className="circle-green"></span> High | <span className="circle-green"></span> High |

### Smart contract storage

One pattern developers often turn to is writing _all data_ to smart contract storage (onchain maxis, rejoice!). Here, developers put all they possibly can onchain—e.g., an image could be written onchain as an SVG string, like `data:image/svg+xml;base64,PHN2...`, instead of stored as a standard image file (JPEG, PNG, or SVG) on IPFS. Or, maybe some data is part of a `struct` and `mapping` combination that can be read by other contracts.

This is quite cool! The data is interoperable by default since it's all onchain. It is fully composable to where other projects can build on of it—such as making a derivative NFT that, for example, simply toggles traits on/off after reading the onchain SVG data. Plus, the data is guaranteed to exist as long as the chain itself lives. With the IPFS or centralized storage options, there is no such guarantee. Persisted file solutions (like Filecoin and Arweave) at least provide persistence guarantees within their own network, but again, there are some clear drawbacks (lack of mutability, queryability) and no "linkage" to the chain itself. They're isolated networks.

One key consideration is **cost**; you must store all data in the contract. This _does_ allow information to be mutable, but that means you’d have to overwrite values in contract storage, which is costly (due to blockchains storing _global state_—a summary of every contract and account interaction that happens on the network). Also, you don't have a way to access that data efficiently (select data, aggregate it, join together, etc.) without indexing networks that involve entirely decoupled development workflows.

### Decentralized _file_ storage

The defacto web3 solution for large data and media is IPFS. Keep in mind that IPFS is a _distributed file system_, and _decentralizing_ this storage requires a network like Filecoin for incentivized [persistance](https://docs.ipfs.tech/concepts/persistence/). IPFS is great for storing files using content addressing, which uniquely identifies a file and not its location (using something called a "[CID](https://docs.ipfs.tech/concepts/content-addressing/)"), but it's imperfect for _data_ storage.

Think of _data_ in this context as "small" and a _file_ as "large" media. File storage solutions are amazing and built for, well, storing _large_ files and media. However, they **lack query features, metadata, and dynamism**—all of which are, especially, essential for small data. Imagine you upload a JSON file on IPFS, so you get its unique CID in return. Now, determine what the value is at some key in the JSON object—and do so without downloading the file itself and reading / parsing it. Or, programmatically take two different JSON files stored on IPFS and query / compose their metadata together, joined by matching some key. You, quite simply, can't without additional infrastructure.

#### Augmentation

Tableland works great to _augment_ IPFS. Without a solution like Tableland, data embedded in some JSON file on IPFS is not easily queryable nor described for discoverability purposes. It is a perfect setup if you pair these solutions together, where large files (like images, website frontends, or large datasets) are stored on IPFS / Filecoin, and pointers (CIDs) are stored in Tableland tables. Another common use case is large datasets stored on these networks but without any easily queryable metadata about what is stored at the CID itself. It's another great combination where Tableland tables can describe this information and also offer access control-based mutability.

### Centralized storage

With centralized solutions (AWS, Google Cloud, etc.), developers can easily store and mutate data. You could even use a combination of the "augmentation" example above with images being stored on IPFS, and the CIDs are stored on the centralized server. It’s a partial web2-web3 approach. The primary benefit here is that by managing your own database (i.e., outsource to centralized service providers), you have full control over storing, mutating, and querying the data at a relatively low cost with high efficiency.

But, all of your data sits behind a wall that the service provider owns and controls, and each service might offer an entirely a different way to interface with that relational data. Data is not interoperable and limits how web3 data can interact with each other. It also detracts entirely from the web3 value proposition. When you are storing data in a centralized server, how does another developer openly read your database's data? If you want to collaborate on data with some external entity, how do you provision access and allow them mutate data?

That is, using a centralized database silos the data and prevents true composability and interoperability. What's needed is a global, _shared_ database. Blockchain-driven permissionless access controls offer a much simpler way of enabling collaboration, and a web3 database provides a single data layer with a unified interface.

## Data on Tableland

Tableland offers the best of all of these approaches in an optimal onchain=>offchain hybrid approach.

1. Creating and mutating data are both handled onchain (SQL instructions written to logs) with account-based access control and table ownership.
2. Store large media (images, files) on IPFS, Filecoin, or similar, and include pointers to the CIDs within tables.
3. Query the data offchain in a decentralized SQL database network and across any chain for true interoperability.

Hence, data is cheaply secured onchain and natively composable using offchain queries.

But, not _every_ relational database or use case makes sense to live in web3 relational Tableland tables. The main consideration is write frequency and the chain in which the table has been deployed on, since both of these attribute to table usability and feasibility (costs). Recall that each chain will have varying block finalization times, so the base chain greatly impacts data throughput.

:::note
Consider only a use case that, at its fastest, needs to write data at the **same speed** of the **base chain's block times**—how quickly a chain includes new blocks determines the write velocity—and can justify the chain's **transaction costs** that come along with it.
:::

For reference, Ethereum and the "rollup" scaling solutions all have a max block gas limit of 30 million gas. Polygon has a maximum of 20 million gas per block. Knowing this, along with the gas used for create / write transactions, can be helpful when designing and understanding if a use case make sense for Tableland.

## Alternative web3 options

Tableland is a great solution for decentralized data storage, but we appreciate all builders; there are others tackling this issue. You should already be familiar with web3 data choices developers have had to make around onchain storage, decentralized file solutions (IPFS / similar), and centralized service providers.

In the web3-specific database space, there are a few protocols developers are using—each with a different approach:

- [Ceramic](https://ceramic.network/): Some complex concepts and uses its own identity system (rather than EVM accounts). But, it's built on top of IPFS and has some novel capabilities.
- [Polybase](https://polybase.xyz/docs/introduction): Not intended for smart contract devs, _somewhat_ decoupled from the host chain (it's a zk-rollup). But, it comes with some nice privacy-focused features.
- [Space and Time](https://www.spaceandtime.io/): Primarily focused on being a general web3 data warehouse with on- and offchain data flowing into its indexing layer. Some SQL features but not focused on the same chain-driven type of data storage; it operates a bit differently.
- [The Graph](https://thegraph.com/docs/en/): Data indexing solution that could be used in a similar context, but it's more about pure generalized indexing. Think of The Graph as a way to query EVM data (i.e., historical event store), whereas Tableland is intended for chain-driven data liveliness—a cache-like _store only latest state_ approach. It does require a bit of overhead are subgraphs and transformations vs. Tableland's pure serverless SQL setup.

## Resources

Check out our curated list of [Awesome Decentralized Database](https://github.com/tablelandnetwork/awesome-decentralized-database) information about various solutions and general learning resources.
