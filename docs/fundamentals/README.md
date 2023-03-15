---
title: Introduction
description: Figure out where to begin with Tableland, whether that's starting to build or figuring out how it all works.
synopsis: Tableland is a web3 SQL database that can be used on EVM chains like Ethereum and Layer 2 (L2) solutions. It helps extend and enhance data storage while offloading accessibility to a decentralized network of validator nodes that watch the host chain for updates, which is where SQL data is made available. Developers can use Tableland to help scale, mutate, and effectively access chain-driven data—with on-chain rules and SQL.
---

import { ChainsList } from '@site/src/components/SupportedChains'

## Get started

If you're eager to get building and use the Tableland protocol (live on <ChainsList type={'mainnets'} format={'string'} />), you can dive right in with any of these [quickstarts](quickstarts):

- **SDK**: use JavaScript or TypeScript in your web apps to create, write, and read web3 native data.
- **Smart contracts**: create and mutate tables directly with Solidity.
- **CLI**: leverage the command line to create, write, and read from the Tableland network.
- **REST API**: communicate with Tableland nodes for reading table data and retrieving node information.

Keep in mind that table creates and writes require you to interact with a blockchain, so you'll need a wallet and funds to use the clients noted above. Also, Tableland offers SQLite language compatibility but with some limitations, so be sure to check out the [SQL specification](/reference/sql-specification) for details.

If you'd like to help expand and decentralize the network itself, you can also choose to run your own [Tableland validator node](https://github.com/tablelandnetwork/go-tableland) with relatively low hardware and cost requirements.

:::note
Tableland is still in open beta and will be launching the production network in 2024. But, smart contracts and apps deployed on testnet and mainnet chains can use the protocol during this open beta period.

Developers should still proceed with caution due to the nature of an open beta, such as protocol changes, and also ensure smart contracts that use Tableland are future-proof.

:::

## Learn

Once you get up and running, it's ideal to understand the network interactions, considerations, and tradeoffs before building things out further. Check out these introductory resources to learn the very basics.

import DocCardList from '@theme/DocCardList';

<DocCardList />
