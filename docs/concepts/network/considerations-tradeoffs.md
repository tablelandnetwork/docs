---
title: Considerations & tradeoffs
sidebar_label: Why use Tableland?
description: Tableland offers a new solution to suboptimal web3 data storage standards.
synopsis: Selecting the chain to deploy tables on has a significant impact on the subsequent usage of the table. But before selecting a chain to then use Tableland’s capabilities, it may be helpful to consider the alternatives to Tableland in the first place.
---

## Web3 data

### Background

The three most common places people will store data in web3 include:

1. Distributed / decentralized file storage
2. Hosted / centralized server
3. On-chain

For example, traditional NFT collections will often deploy a metadata model that uses either IPFS or centralized storage, rarely writing metadata on-chain. Each of these decisions comes with a price (literally & figuratively):

|                       | Scaling Cost    | Mutability       | Composability |
| --------------------- | --------------- | ---------------- | ------------- |
| On-chain              | Limited, costly | Costly           | High          |
| Decentralized Storage | Pretty cheap    | Costly & complex | Low           |
| Centralized Storage   | Great, cheap    | Yes, cheap       | None          |
| Tableland             | Pretty cheap    | Flexible         | High          |

### Decentralized _file_ storage

The defacto solution for "decentralized" metadata is IPFS. Keep in mind that IPFS is a _distributed file system_, and decentralizing the storage requires a network like Filecoin or Arweave for persistance. IPFS is great for storing files using content addressing, which uniquely identifies a file and not its location. Pin the file to the IPFS network, and you have greater guarantees of its long-term persistance. For true persistance, you need to use an actual decentralized network with built-in incentives for storing the data. This is where solutions like Filecoin and Arweave come into play.

Notice the emphasis on the word file. This is intentional. File storage solutions are amazing and built for, well, storing files. However, they lack query features. Imagine you upload a JSON metadata file to IPFS and get its CID in return. Okay—now tell me what the value is at the image key, without downloading the file itself, reading / parsing the file as JSON, and then getting the value. Or, take two different JSON metadata files of unrelated collections, and compose their metadata together.

Now, imagine another scenario: you want to mutate an NFT’s existing metadata that is stored at an immutable CID. You can’t. This forces developers to get creative using tactics like tokenURI CID switching.

#### Augmentation

Tableland works great to _augment_ IPFS. Without a solution like Tableland, data as part of the JSON file on IPFS is not easily queryable nor described for discoverability purposes. It is quite an elegant setup if your pair these solutions together, where large files (like images or websites) are stored on IPFS / similar, and pointers are stored in Tableland tables. For more information about IPFS, [read more about persistence, permanence, and pinning](https://docs.ipfs.tech/concepts/persistence/).

### Centralized Storage

With centralized solutions (AWS, GCloud, etc.), developers can easily store and mutate metadata. You can even use a combination of the example above where images are stored on IPFS or similar, and the CIDs are stored in the hosted server. It’s a hybrid approach. The primary benefit here is that by running your own database, you have full control over querying the data as well as mutating the values.

If you were to run your own SQL server, you could easily write a SQL query that changes an NFT’s metadata or makes read queries across _your database_.

**Your** database.

This obviously limits how NFTs can interact and also detracts entirely from the web3 value proposition. If you are storing data in a centralized server, how does another developer read your data? Can someone else make a read query across your collection? Can some actor outside of your core team, like the NFT’s owner, easily change a piece of data (with your permission, of course)?

Using a hosted server silos data and prevents true composability and interoperability. There are a number of projects that currently implement this approach because there isn’t a great way to dynamically change metadata in a web3 native way. What's needed is a global, _shared_ database with access controls.

### Smart contract storage

One pattern developers turn to is writing metadata to contract storage (on-chain maxis, rejoice!). Here, developers put all of the metadata on-chain, most commonly, stored as an SVG. When you make a call to the `tokenURI` method, the response is this SVG. It will return a string that looks something like `data:image/svg+xml;base64,PHN2...`.

This is quite cool! The NFT is interoperable by default. Depending on the contract’s design, the attributes can be composable to where other projects can build on top of the base NFT—such as making derivative collections that, for example, simply toggle traits on/off. Plus, if the contract is immutable (i.e., not using any upgradeability patterns), this NFT will exist as long as the chain itself lives. With the file storage or centralized storage options, there is no such guarantee. Persisted file solutions at least provide similar guarantees within their own network, but again, there are some clear drawbacks to hosting the metadata itself there.

One key consideration here is cost. Upon contract deployment, you must store these large SVG strings directly in contract storage. If you were to try and make the metadata mutable, that means you’d have to overwrite values in contract storage, with is costly...especially, if you’re on Ethereum mainnet.

## Data on Tableland

Tableland offers the best of all of these approaches.

1. Store image files on IPFS, Filecoin, or similar
2. Hosted data in a decentralized fashion—including pointers to the CID
3. Data is secured on-chain and natively composable using off-chain queries

But, not _every_ relational database or use case makes sense to live in web3 relational Tableland tables. The main consideration is write frequency and the chain in which the table has been deployed on, since both of these attribute to table usability and feasibility (costs). Recall that each chain will have varying block finalization times, which impacts the table create / write velocity:

| Chain    | Average block finalization time |
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
