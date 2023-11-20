---
title: How to build an NFT
sidebar_label: Build an NFT
description: Store NFT metadata in tables that capture chain-driven data changes.
keywords:
  - nft metadata
  - erc721 metadata
  - how to build an nft
slug: /how-to-build-an-nft
---

Tableland closes the gap between onchain and offchain state synchronicity, which is especially useful for NFT developers. Namely, onchain can automatically drive offchain metadata changes while also offering performant query capabilities at the application layer.

## Learn

To get started, check out the following pages that provide general NFT metadata overviews and Tableland SQL usage:

- [NFT metadata standards](/fundamentals/concepts/nft-metadata): A 101 about NFT metadata and the various standards used in web3.
- [SQL table design](/playbooks/walkthroughs/nft-metadata): Learn about how you can structure data across one or more tables and compose the metadata using SQL + JSON functions.
- [NFT uses cases](/fundamentals/use-cases#nfts--gaming): Dive into basics about what you can build with NFTs, including how web3 gaming can benefit from using Tableland.

## Develop

For those looking to build, the following highlight how to use smart contracts and/or the Tableland SDK for NFT metadata:

- [Serving NFT metadata](/smart-contracts/serving-nft-metadata): Gain familiarity with how a smart contract can serve NFT metadata using SQL queries to the Tableland gateway.
- [URI encoding](/smart-contracts/uri-encoding): Use JavaScript in smart contract deploy scripts to set a token URI with the proper encoding.
- [Build a dynamic NFT in Solidity](/tutorials/dynamic-nft-solidity): Get started with the basics of a Solidity-based NFT game that uses SQL queries to create and populate a table of game state.
- [Creating a dynamic NFT with p5.js](/tutorials/dynamic-nft-p5js): Add visual components to the intro tutorial about that walks through building a dynamic NFT in Solidity.
- [JSON files to NFT metadata](/tutorials/json-files-nft-polygon): With a Hardhat project, take local JSON files, read/parse the data into tables, and then mint an NFT where Tableland powers the metadata.
