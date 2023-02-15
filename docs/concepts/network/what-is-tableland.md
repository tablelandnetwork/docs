---
title: What is Tableland?
description: Learn about the basics of the Tableland network.
synopsis: Tableland is a web3 native SQL database that can be used on EVM chains like Ethereum and Layer 2 solutions. It helps extend data storage using SQL while offloading accessibility to a decentralized network of validator nodes that watch the host chain for updates, which is where SQL mutation data is made available.
keywords:
  - Tableland
  - about
---

## Context

The Tableland Network is a decentralized web3 protocol for structured relational data, starting with Ethereum (EVM) and EVM-compatible L2s. With Tableland, traditional web2 relational database capabilities are now possible by leveraging the blockchain layer for access control. But, Tableland isn't a new database—**it’s just web3-native relational tables**.

## Problem

Web3-native apps are forced to make a choice when storing application data: fit everything into the web3 mould, or use a hybrid web2 approach. Fitting everything into a web3-native stack often equates to costly or complex designs to store data on-chain or use decentralized file storage as a pseudo-database. With a hybrid approach, apps are deployed on web3 (using smart contracts, frontends on IPFS, etc.), but traditional, centralized web2 databases (AWS, Google Cloud, etc.) are still being used for a subset of structured data. Tableland offers a new approach that enables dapps to _store relational data in a web3-native network,_ without having to make these tradeoffs*.*

## Solution

**Tableland is a new tool for fullstack decentralized applications.** In tandem with other distributed work infrastructure, blockchains, and decentralized storage providers, there are infinite possibilities for truly web3-native experiences while using Tableland’s infrastructure for _structured relational data_.

import web3Stack from "@site/static/assets/web3-stack.png";

<img src={web3Stack} width='80%'/>

In fact, a common example is NFT projects. These often use [IPFS](https://ipfs.io/) or decentralized storage providers to host their [metadata](https://docs.opensea.io/docs/metadata-standards#metadata-structure), which ensures it is openly accessible but makes it _[immutable](https://docs.ipfs.io/concepts/immutability/)._ This leads to a limiting experience since the metadata itself cannot change ("mutate"), nor is it easily [queryable](https://en.wikipedia.org/wiki/Information_retrieval) or [composable](https://en.wikipedia.org/wiki/Composability). Alternatively, a centralized / hosted server provides a way for metadata to be dynamic as well as supports query capabilities, but it does not enable composability; hosted servers are not "open" web3-native solutions. With Tableland, metadata _can be_ mutated (if desired, using access controls), queried (using the familiar SQL), and is composable (with other tables on Tableland) — all in an entirely decentralized fashion.

![Abstracted Tableland](@site/static/assets/abstracted-tableland-img.png)

From a user’s perspective, the experience should feel the same _at the surface,_ but the underpinning Tableland infrastructure makes the developer’s journey significantly easier and opens the door to an _endless metadata playground_.

## How Does Tableland Work?

Tableland decomposes a traditional relational database into two primary components: on-chain registry with Access Control Logic (ACL), and a network of permissionless databases. Each table in Tableland is initially minted as an [ERC721](https://docs.openzeppelin.com/contracts/3.x/api/token/erc721#ERC721) token on the base EVM-compatible layer. Thus, there’s an on-chain table owner that can set ACL privileges for a table, and the off-chain Tableland Network manages the creation of and subsequent mutations to the table itself. The link between on-chain and off-chain is all handled at the contract level, which simply points to the Tableland network (using [`baseURI`](https://docs.openzeppelin.com/contracts/2.x/api/token/erc721#ERC721Metadata-baseURI--) + [`tokenURI`](https://docs.openzeppelin.com/contracts/2.x/api/token/erc721#ERC721Metadata-tokenURI-uint256-), much like many existing ERC721 tokens that use IPFS gateways or hosted servers for metadata).

import genericTableland from "@site/static/assets/tbl-generic-diagram.png";

<img src={genericTableland} width='80%'/>

Only those with the proper on-chain privileges can _write_ to a specific table. Table _reads_, however, **do not have to be an on-chain operation** and can use the Tableland gateway; thus, read queries are free and can come from a simple frontend request or even other non-EVM blockchains. Now, in order to use Tableland, a table must first be created (i.e., minted on-chain as an ERC721). The deploying address is initially set as the table owner, and this owner gets to set the permissions for any other users that attempt to interact with the table in a mutating capacity. For example, the owner can set rules for who can update/insert/delete values, which data they can alter, or even decide if they’d like to _transfer ownership_ of the table to another party. Plus, more complex queries can join data from multiple tables (owned or non-owned) to create an entirely dynamic and composable relational data layer.

Consider the following diagram, which generalizes a new user’s interactions with a table that’s already been deployed to Tableland by some dapp:

import networkOverview from "@site/static/assets/network-overview.png";

<img src={networkOverview} width='80%'/>

Here’s the overall flow of information:

1. A new user interacts with a dapp’s UI and tries to update some information stored in a table on Tableland.
2. The dapp calls the Tableland registry smart contract to run this SQL statement, and this contract checks the dapp’s smart contract, which contains custom ACLs that define this new user’s permissions. A couple of things to note:
   1. The custom ACLs in a separate smart contract for the dapp _is an entirely optional but advanced use case_; developers do not need to implement custom ACLs and can use the Tableland registry smart contract’s default policies (where only the owner has full permissions).
   2. Write queries _can also use a gateway_ instead of calling the Tableland smart contract directly. The option always exists for a dapp to directly call the Tableland smart contract, but _any query_ can be sent through the gateway, which will relay the query to the smart contract itself in a subsidized fashion.
3. The Tableland smart contract takes the SQL statement & the permissions for this user, and it incorporates these into emitted events that describe the SQL-based actions to take.
4. The Tableland Validator node listens for these events and subsequently takes one of the following actions:
   1. If the user has the correct privileges for writing to a table, a Validator will run the SQL command accordingly (e.g., insert a new row into the table or update an existing value) and broadcast confirmation data to the Tableland network.
   2. If the user _does not_ _have_ the right privileges, the Validator _will not_ take any action on the table.
   3. If the request is simply a read query, the corresponding data will be returned; Tableland is an entirely open network of relational data where anyone can perform read-only queries on any table.
5. The dapp will be able to reflect any updates that occur on the Tableland Network via the gateway.
