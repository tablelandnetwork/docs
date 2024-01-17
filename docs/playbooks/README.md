---
title: Overview
description: Learn how to build popular use cases or integrate with other technologies.
keywords:
  - playbooks
---

Playbooks outline various approaches to integrating Tableland into your application stack. There are a number of walkthroughs that touch on how you can use the Studio, SDK, CLI, smart contracts, and APIs, and the intent is to provide short-form content that makes it easy to get started, similar to some of the [quickstarts](/quickstarts) but across a broader set of use cases.

## Playbooks index

The following outlines each of the playbooks and what they cover.

### Concepts

Concepts are the building blocks of Tableland, and the following outlines the concepts that are available.

#### Access control

Dive into [access control basics](/playbooks/concepts/access-control) for how to use pure SQL for granting or revoking named addresses permissions on a table. Or, learn how to use smart contracts to enable finer access controls.

#### NFTs

Dynamic NFTs are a common use case for Tableland, and this section describes some of the basics for [metadata standards](/playbooks/concepts/nft-metadata) and [how to build an NFT](/playbooks/concepts/how-to-build-an-nft).

#### SQL blueprints

Blueprints are the most common use cases for Tableland. They're the most common use cases for Tableland, and the following outlines the blueprints that are available.

- [ERC721 metadata](/playbooks/blueprints/erc721-metadata): Create an ERC721 token with metadata stored in a Tableland table.
- [ERC1155 metadata](/playbooks/blueprints/erc1155-metadata): Create an ERC1155 token with metadata stored in a Tableland table.
- [Gaming](/playbooks/blueprints/gaming): Build open gaming state, leaderboards, and inventory.
- [Key-value store](/playbooks/blueprints/key-value): Build a key-value store to hold arbitrary data.
- [Web app](/playbooks/blueprints/studio-app-design): Build a web app with a Tableland backend, using the Tableland Studio as an implementation reference.

### Frameworks

Frameworks show how developers can use Tableland with existing technologies and easily integrate it into their stack.

- [Hardhat](/playbooks/frameworks/hardhat): Use Tableland with Hardhat to build a full stack web3 application.
- [React](/playbooks/frameworks/reactjs): Create web apps with React and a Tableland backend.
- [Next.js](/playbooks/frameworks/nextjs): Or, create web apps with Next.js and a Tableland backend.
- [wagmi](/playbooks/frameworks/wagmi): Easily integrate a wallet connection modal with your web app.

### Protocol integrations

As a database with onchain rules, Tableland can easily be used alongside other protocols. There are an endless number of ways protocols can work together, but here are some examples:

- [IPFS & Filecoin](/playbooks/protocols/ipfs): Store files on IPFS, persist them on Filecoin (via web3.storage), and reference the CID in a Tableland table.
