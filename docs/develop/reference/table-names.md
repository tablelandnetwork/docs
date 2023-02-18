---
title: Table names
description: Learn about what Tableland is.
synopsis: Structured Query Language (SQL) is a language that allows developers to interact with databases for extracting and mutating values.
keywords:
  - protocol
---

## Overview

Tables are ERC721 tokens minted by the [Tableland "registry" contract](/develop/reference/contracts) on each respective chain. Every table has a unique value on the chain (an ERC721 token ID), and every table is uniquely identifiable across **_any_** chain. Namely, a table’s full "name" is in the format:

- `{prefix}_{chainId}_{tableId}`

The `prefix` is a custom value set upon table creation. The `chainId` is unique to the chain, and the `tableId` aligns to the aforementioned ERC721 token ID. For example, a table name might look like `healthbot_5_1`—a table with prefix "healthbot" that was the first table minted on Ethereum Goerli (chain ID of 5).

## The TABLE Token

For each of the contracts deployed above, a globally unique TABLE ERC721 token will be minted. Anyone can create _and own_ a table. On-chain access controls can be established to make the table itself collaborative in nature, such as a shared ownership model where certain permissioned users can insert or update rows in the table itself.

At a minimum, a TABLE owner has permissions to do whatever they want with the table, such as inserting new rows, updating / deleting existing ones, or setting a table _controller_ that manages table the access controls. For example, take a table minted on Ethereum:

import tableNFT from "@site/static/assets/table-nft.png";

<figure>
  <img src={tableNFT} width='70%' alt='Table NFT'/>
  <figcaption>The TABLE ERC721 token anatomy.</figcaption>
</figure>

To view the TABLE token itself, check out the deployed contracts on various block explorers or see the following NFT marketplaces:

- Example — Ethereum mainnet ⇒ [https://opensea.io/collection/tableland-tables](https://opensea.io/collection/tableland-tables)
- Example — Polygon Mumbai testnet ⇒ [https://testnets.opensea.io/collection/tableland-tables-mumbai](https://testnets.opensea.io/collection/tableland-tables-mumbai)
