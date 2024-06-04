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

For example, a table name might look like `healthbot_11155111_1`—this means the table has a prefix "healthbot" and was minted on Ethereum Sepolia (chain ID of `11155111`) as the first table on that chain (token ID of `1`).

## The TABLE Token

For each of the contracts deployed above, a globally unique TABLE ERC721 token will be minted. Anyone can create _and own_ a table. Onchain access controls can be established to make the table itself collaborative in nature, such as a shared ownership model where certain permissioned users can insert or update rows in the table itself.

At a minimum, a TABLE owner has permissions to do whatever they want with the table, such as inserting new rows, updating / deleting existing ones, or setting a table _controller_ that manages table the access controls. For example, take a table minted on Ethereum that [tracks user session data](https://tableland.network/api/v1/tables/1/7). The table metadata has a number of characteristics, including the table's name, description, schema, image, animation URL, and created time.

```json
{
  "name": "pilot_sessions_1_7",
  "external_url": "https://tableland.network/api/v1/tables/1/7",
  "animation_url": "https://tables.tableland.xyz/1/7.html",
  "image": "https://tables.tableland.xyz/1/7.svg",
  "attributes": [
    {
      "display_type": "date",
      "trait_type": "created",
      "value": 1674047326
    }
  ],
  "schema": {
    "columns": [
      {
        "name": "id",
        "type": "integer",
        "constraints": ["primary key autoincrement"]
      },
      {
        "name": "rig_id",
        "type": "integer",
        "constraints": ["not null"]
      },
      {
        "name": "owner",
        "type": "text",
        "constraints": ["not null"]
      },
      {
        "name": "pilot_contract",
        "type": "text"
      },
      {
        "name": "pilot_id",
        "type": "integer"
      },
      {
        "name": "start_time",
        "type": "integer",
        "constraints": ["not null"]
      },
      {
        "name": "end_time",
        "type": "integer"
      }
    ]
  }
}
```

All of this information is also rendered in an SVG representation as well as a Tableland Console panel that allows you to query the data at the animation URL.

import tableNFT from "@site/static/assets/table-nft-external-url.png";
import tableConsole from "@site/static/assets/table-nft-console.png";

<div className="row margin-bottom--lg">
<div className="col">

<figure>
  <img src={tableNFT} width='70%' alt='Table NFT'/>
  <figcaption>The TABLE ERC721 token image.</figcaption>
</figure>
</div>

<div className="col">

<figure>
  <img src={tableConsole}  alt='Table NFT'/>
  <figcaption>The TABLE ERC721 Console.</figcaption>
</figure>
</div>
</div>

## Collection links

To view the TABLE token itself, check out the deployed contracts on various block explorers or see the following NFT marketplaces. Feel free to view click into an NFT to view and query table data directly within the marketplace!

| Chain            | Environment | Collection link                                                          |
| ---------------- | ----------- | ------------------------------------------------------------------------ |
| Ethereum         | Mainnet     | https://opensea.io/collection/tableland-tables-homestead                 |
| Optimism         | Mainnet     | https://opensea.io/collection/tableland-tables-optimism                  |
| Arbitrum One     | Mainnet     | https://opensea.io/collection/tableland-tables-arbitrum                  |
| Arbitrum Nova    | Mainnet     | https://opensea.io/collection/tableland-tables-arbitrum-nova             |
| Polygon          | Mainnet     | https://opensea.io/collection/tableland-tables-polygon                   |
| Ethereum Sepolia | Testnet     | https://testnets.opensea.io/collection/tableland-tables-2                |
| Optimism Sepolia | Testnet     | No marketplace support                                                   |
| Arbitrum Sepolia | Testnet     | https://testnets.opensea.io/collection/tableland-tables-arbitrum-sepolia |
| Base Sepolia     | Testnet     | https://testnets.opensea.io/collection/tableland-tables-15               |
| Polygon Amoy     | Testnet     | https://testnets.opensea.io/collection/tableland-tables-13               |
