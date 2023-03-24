---
title: What is Tableland?
description: A brief overview of what the Tableland network is and how it works.
---

## Problem

Web3-native apps are forced to make a choice when storing application data: fit everything into the web3 mould, or use a partial web2 approach. Fitting everything into a web3-native stack often equates to costly or complex designs to store all data on-chain or use decentralized file storage as a pseudo-database. With a partial approach, apps are deployed on web3 (using smart contract backends, frontends deployed on IPFS, etc.), but traditional, centralized web2 databases (AWS, Google Cloud, etc.) are still being used for a subset of **structured data**.

Let's expand a bit. IPFS ensures data is openly accessible, but the data itself is stored in a file and makes it [_immutable_](https://docs.ipfs.io/concepts/immutability/). This leads to a limiting experience since this data itself cannot change ("mutate"), and files (and their internal data) are not easily [queryable](https://en.wikipedia.org/wiki/Information_retrieval) nor [composable](https://en.wikipedia.org/wiki/Composability). Alternatively, a centralized service provide an effective solution for highly dynamic that supports support query capabilities (needed for any application): a database. But, centralized databases are not "open" web3-native solutions; data is kept behind a permissioned wall and is not interoperable nor composable.

## Solution

Tableland offers a new approach that enables dapps to _store **relational data** in a web3-native network_, without having to make these decision tradeoffs. Traditional relational database capabilities are now possible by leveraging the blockchain layer for access control and database instructions—**it’s just web3-native relational tables** in a shared and permissionless database. In other words, data _can be_ mutated (if desired, using on-chain access controls), queried (using the familiar SQL), and is composable (with any other tables).

Tableland is the **database for fullstack decentralized applications**.

In tandem with other distributed work infrastructure, web3 now has a home for structured relational data that is openly stored in a database network. You can imagine the application stack breaking down into a few buckets:

- Users access applications using browsers and wallets—NFTs, DAOs, and dapps sit at this access or coordination layer.
- The underpinning blockchain's features provide a framework for ownership, access, and compute (e.g., any account can send transactions and own tokens).
- Alongside the host chain, you have web3 infrastructure like databases for "small" data (up to 1kb) and persisted file storage (for large media).

One key callout is that Tableland is always tied to the host chain since table creates and mutations must pass through the host. Not all decentralized infrastructure behaves this way, as some networks may primarily act as a standalone protocol and do not have the required on-chain anchoring like Tableland does.

import web3Stack from "@site/static/assets/web3-stack.png";

<img src={web3Stack} width='80%'/>

Really, any type of structured data can be stored in Tableland.

- NFT collections store pointers to large media files, along with other NFT attributes, and can have owner-driven actions mutate the metadata.
- Data DAOs can upload large datasets to persisted file storage but store its metadata in Tableland tables—and enable shared access for collaborating (with on-chain accounts / rules).
- Gaming-related data like scoreboards and leaderboards make it easy for chain-driven data to be immediately queried at the application layer, off-chain.

![Abstracted Tableland](@site/static/assets/abstracted-tableland-img.png)

This underpinning infrastructure makes the developer’s journey significantly easier and opens the door to an endless data scaling layer for web3 applications.

## How does Tableland work?

Tableland decomposes a traditional relational database into two primary components:

- On-chain registry with EVM account-based Access Control Logic (ACL).
- A network of permissionless databases running a web3-limited SQLite.

Each table in Tableland is initially minted as an [ERC721](https://docs.openzeppelin.com/contracts/3.x/api/token/erc721#ERC721) token on the base EVM-compatible layer. Thus, there’s an on-chain table owner that can set ACL privileges for a table, and the off-chain Tableland network manages the creation of and subsequent mutations to the table itself. The link between on-chain and off-chain is all handled at the Tableland [gateway](reference/gateway)—off-chain read queries allow for accessibility of SQL data while the core data availability is all on-chain.

For example, at the contract level, you might have some web3 app that mints ERC721 tokens. The contract simply points to the Tableland network (like using the [`baseURI`](https://docs.openzeppelin.com/contracts/2.x/api/token/erc721#ERC721Metadata-baseURI--) + [`tokenURI`](https://docs.openzeppelin.com/contracts/2.x/api/token/erc721#ERC721Metadata-tokenURI-uint256-)), just as many existing ERC721 tokens use IPFS gateways or centralized servers. The key difference is that the underpinning infrastructure behind the gateway is a fully decentralized database network that offers the best of both worlds.

import genericTableland from "@site/static/assets/tbl-generic-diagram.png";

<img src={genericTableland} width='80%'/>

### Access control

Only those with the proper on-chain privileges can _write_ to a specific table. Table _reads_, however, **do not have an on-chain operation** and use the Tableland gateway. Thus, read queries are open and can come from a simple frontend request or even other non-EVM blockchains. Anyone can read table data.

Now, in order to use Tableland, a table must first be created (i.e., minted on-chain as an ERC721 at the Tableland registry contract). The deploying address is initially set as the table owner, and this owner gets to set the permissions for any other users that attempt to interact with the table in a mutating capacity. For example, the owner can set rules for who can update/insert/delete values, which data they can alter, or even decide if they’d like to _transfer ownership_ of the table to another party. Plus, more complex queries can join data from multiple tables (owned or non-owned) to create an entirely dynamic and composable relational data layer.

Consider the following diagram, which generalizes a new user’s interactions with a table that’s already been deployed to Tableland by some dapp:

import networkOverview from "@site/static/assets/network-overview.png";

<img src={networkOverview} width='80%'/>

Here’s the overall flow of information:

1. A new user interacts with a dapp’s UI and tries to update some information stored in a table on Tableland.
2. The dapp calls the Tableland registry smart contract to run this SQL statement and checks custom ACLs that define this new user’s permissions (which rows, columns, and other clauses).
3. The Tableland smart contract takes the SQL statement & the permissions for this user, and it incorporates these into emitted events that describe the SQL-based actions to take.
4. The Tableland validator node listens for these events and subsequently takes one of the following actions:
   1. If the user has the correct privileges for writing to a table, the validator will run the SQL statement accordingly (e.g., insert a new row into the table or update an existing value) and broadcast confirmation data to the Tableland network.
   2. If the user _does not_ _have_ the right privileges, the validator _will not_ take any action on the table.
5. If the request is simply a read query, the corresponding data will be returned.

Tableland is an entirely open network where anyone can perform read-only queries on any table (but only permissioned writes). Namely, the dapp will be able to reflect all chain-driven updates without needing to manage any database infrastructure on their own.
