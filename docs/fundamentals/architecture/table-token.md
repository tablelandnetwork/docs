---
title: TABLE token & identification
sidebar_label: Table uniqueness
description: Tables are guaranteed unique across all chains based on a combination of developer and environment defined information.
keywords:
  - table
  - erc721
---

## Uniqueness & convention

A table’s full "name" is in the format: `{prefix}_{chainId}_{tableId}`.

Tables are ERC721 TABLE tokens minted at a Tableland registry contract deployed on each respective chain. Every table has a unique name on both the chain it was minted on _and_ across any chain that Tableland supports. The name is comprised of three parts:

- `prefix` ⇒ Optionally defined by the table creator at the time of table creation (maximum 32 bytes in length).
- `chainId` ⇒ Identifier assigned to the table under the hood, based on the chain the table was created on.
- `tableId` ⇒ Unique identifier for a table, assigned by the Tableland "registry" contract upon table creation (a table is minted as an ERC721 token).

For example, a table name might look like `healthbot_5_1`—this means the table has a prefix "healthbot" and was minted on Ethereum Goerli (chain ID of `5`) as the first table on that chain (token ID of `1`).

## The TABLE Token

For each of the contracts deployed above, a globally unique TABLE ERC721 token will be minted. Anyone can create _and own_ a table. On-chain access controls can be established to make the table itself collaborative in nature, such as a shared ownership model where certain permissioned users can insert or update rows in the table itself.

At a minimum, a TABLE owner has permissions to do whatever they want with the table, such as inserting new rows, updating / deleting existing ones, or setting a table _controller_ that manages table the access controls. For example, take a table minted on Ethereum:

import tableNFT from "@site/static/assets/table-nft.png";

<figure>
  <img src={tableNFT} width='70%' alt='Table NFT'/>
  <figcaption>The TABLE ERC721 token anatomy.</figcaption>
</figure>

## Collection links

To view the TABLE token itself, check out the deployed contracts on various block explorers or see the following NFT marketplaces. Feel free to view click into an NFT to view and query table data directly within the marketplace!

| Chain           | Environment | Collection link                                                    |
| --------------- | ----------- | ------------------------------------------------------------------ |
| Ethereum        | Mainnet     | https://opensea.io/collection/tableland-tables                     |
| Optimism        | Mainnet     | https://opensea.io/collection/tableland-tables-v2                  |
| Arbitrum One    | Mainnet     | https://opensea.io/collection/tableland-tables-v3                  |
| Arbitrum Nova   | Mainnet     | https://opensea.io/collection/tableland-tables-1                   |
| Polygon         | Mainnet     | https://opensea.io/collection/tableland-tables-polygon             |
| Ethereum Goerli | Testnet     | https://testnets.opensea.io/collection/tableland-tables-juywt5ywdt |
| Optimism Goerli | Testnet     | https://testnets.opensea.io/collection/tableland-tables-botmoq7j2q |
| Arbitrum Goerli | Testnet     | https://testnets.opensea.io/collection/tableland-tables-qegwmf9nfj |
| Polygon Mumbai  | Testnet     | https://testnets.opensea.io/collection/tableland-tables-mumbai     |
