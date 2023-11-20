---
title: Overview
description: Make sure you're ready to start building by properly setting up your development environment.
---

All database mutating statements are on-chain actions. If you're using the SDK or CLI, much of the blockchain and smart contract specifics are abstracted away from the developer experience. If you're a web3 or smart contract developer, you're already familiar with what on-chain transactions require.

## Prerequisites

There are a few things every developer will need if they are trying to use Tableland:

- **Wallet**: You'll need to set up an account, such as [MetaMask](https://metamask.io/) for browser wallet-based connections. You'll use your EVM account to create and write to tables across any of the networks Tableland is live on.
- **Funds**: If you want to create or write to a table, it requires an on-chain transaction—you need to own currency in the native chain's denomination if you want to make database state changes.
- **Fundamentals**: Developers should be aware of [fundamental network concepts](/fundamentals/chains#chain-information) like table naming convention, limits, and supported chains.

:::tip
If you're developing on a testnet, you should get testnet currency, and the way to do this depends on the chain you're using. Check out the [chain selection documentation](/fundamentals/chains/#choosing-a-chain) for how to use testnet faucets and get fake currency.
:::

Once you're ready to go, you can start building with any of the quickstarts or dive into subsequent deeper documentation! Note that the Tableland SDK (and the CLI built on top of it) use Node 18, so if you're using an older version of node, you'll have to implement the `fetch` and `Header` polyfills—check out the [SDK docs](/sdk/reference/compatability#node-polyfills) for how to do this.

## Local development

To make it easier to get started, you should check out the [Local Tableland quickstart](/quickstarts/local-tableland) or dive deeper into the docs on how it works. It's, essentially, a sandboxed network running a local-only Tableland validator node, and a local-only Hardhat node in which Tableland registry smart contracts are deployed. So, you can develop and test your application locally without having to worry about deploying to a testnet or mainnet.
