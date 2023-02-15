---
title: Chains & contracts
description: Openly readable tables by your applications.
synopsis: Reading from tables is entirely open (for anyone), allowing for true composability. Write SQL qeuries—but with some limitations that are due to the nature of decentralized networks and deterministic requirements.
keywords:
  - write to table
  - mutate table
---

## Setup

import { SupportedChains, ChainsList } from '@site/src/components/SupportedChains'

The following table highlight which chains Tableland is deployed on, which is currently <ChainsList type={'mainnet'} format={'string'} />. Over time, additional EVM compatible chains will be added based on developer demand.

<SupportedChains />

:::tip
Tableland is still in open beta and will be launching the production network in 2023. But, smart contracts and apps deployed on testnet and mainnet chains can and should use the Tableland during the open beta period.

Developers should still proceed with caution due to the nature of open beta changes and ensure contracts that use Tableland are future-proof.

:::

## The TABLE Token

For each of the contracts deployed above, a globally unique TABLE ERC721 token will be minted. Anyone can create _and own_ a table. On-chain access controls can be established to make the table itself collaborative in nature, such as a shared ownership model where certain permissioned users can insert or update rows in the table itself.

At a minimum, a TABLE owner has permissions to do whatever they want with the table, such as inserting new rows, updating / deleting existing ones, or setting a table _controller_ that manages table the access controls. For example, take a table minted on Ethereum:

import tableNFT from "@site/static/assets/table-nft.png";

<figure>
  <img src={tableNFT} width='70%' alt='Table NFT'/>
  <figcaption>The TABLE ERC721 token anatomy.</figcaption>
</figure>

To view the TABLE token itself, check out the deployed contracts on various block explorers or see the following NFT marketplaces:

- Example — Mainnet Ethereum ⇒ [https://opensea.io/collection/tableland-tables](https://opensea.io/collection/tableland-tables)
- Example — Testnet Polygon Mumabi ⇒ [https://testnets.opensea.io/collection/tableland-tables-mumbai](https://testnets.opensea.io/collection/tableland-tables-mumbai)
