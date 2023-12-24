---
title: Deployed contracts
sidebar_label: Deployed contract addresses
description: A list of deployed Tableland registry contracts for each supported chain.
keywords:
  - chains
  - contract
---

import { SupportedChains } from '@site/src/components/SupportedChains'

The following page highlights which chains Tableland has smart contracts deployed on, which is currently Ethereum and a subset of its scaling solutions. Over time, additional EVM compatible chains will be added based on developer demand.

## Registry contract

The [`TablelandTables`](https://github.com/tablelandnetwork/evm-tableland/blob/main/contracts/TablelandTables.sol) registry contract exists on each of the chains below and is generally responsible for creating (minting) tables, SQL write statements, and access controls. Each chain has its associated name, environment, chain ID, and the contract address (links to a block explorer) displayed.

<SupportedChains />
<br />

:::note
Tableland is still in open beta and will be launching the production network in 2024. But, smart contracts and apps deployed on testnet and mainnet chains can and should use the Tableland during the open beta period.

Developers should still proceed with caution due to the nature of open beta changes and ensure contracts that use Tableland are future-proof.

:::
