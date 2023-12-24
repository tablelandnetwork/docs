---
title: NFT metadata standards
description: Understand the basics of storing and querying ERC721 metadata in table.
keywords:
  - nfts
  - nft metadata
  - nft metadata standards
  - erc721 metadata
  - erc1155 metadata
  - enjin metadata
  - opensea nft metadata
  - erc721a
  - erc721aupgradeable
  - erc721
  - erc1155
  - chiru labs
  - opensea
---

Today, the primary standard for Non-Fungible Tokens (NFTs) is Ethereum's ERC-721 Non-Fungible Token Standard as well as the Ethereum ERC-1155 Multi Token Standard. Platforms such as OpenSea have adopted these NFT standards, along with modifications of their own, to support a wide range of NFT projects.

:::tip
To learn how to actually store and query NFT metadata in tables, check out the [crafting NFT metadata playbook](/sql/walkthroughs/nft-metadata).
:::

## NFT standards & metadata

The table below defines the most used standards for ERC721 or ERC1155 metadata. All of these are accepted and will render NFT metadata on marketplaces like OpenSea.

<!-- prettier-ignore -->
| Standard | Description | Link |
| -------- | ----------- | ---- |
| ERC721 | The original NFT standard—the metadata attributes are provided in a `properties` object. | [EIP-721](https://eips.ethereum.org/EIPS/eip-721) |
| ERC1155 | A newer standard that supports multiple tokens in a single contract. Similar to ERC-721, it uses a `properties` object to store attributes and allows for more rich optionality. | [EIP-1155](https://eips.ethereum.org/EIPS/eip-1155) |
| OpenSea | OpenSea's metadata reference uses an `attributes` array to store NFT traits as objects. It's a slightly different setup than those above. | [OpenSea](https://docs.opensea.io/docs/metadata-standards) |

Here are a few frameworks you can use that adhere to the ERC721 or ERC1155 token standards. This is just a sample of the more popular ones, but there are many more out there.

<!-- prettier-ignore -->
| Contract | Source/description | Description | Link |
| -------- | ------------------ | ----------- | ---- |
| `ERC721.sol` | OpenZeppelin | OpenZeppelin's ERC721 implementation is a community-vetted, open-source framework for building NFTs. | [Docs](https://docs.openzeppelin.com/contracts/5.x/erc721) |
| `ERC721Upgradeable.sol` | OpenZeppelin | An upgradeable variation of the OpenZeppelin ERC721 contract. | [Docs](https://docs.openzeppelin.com/contracts/5.x/upgradeable) |
| `ERC721A.sol` | Chiru Labs | A more gas performant ERC721 implementation. | [Docs](https://chiru-labs.github.io/ERC721A/#/) |
| `ERC721AUpgradeable.sol` | OpenZeppelin | An upgradeable variation of the Chiru Labs ERC721A contract. | [Docs](https://github.com/OpenZeppelin/openzeppelin-contracts-upgradeable/blob/master/contracts/token/ERC721/ERC721Upgradeable.sol) |
| `ERC1155.sol` | OpenZeppelin | OpenZeppelin's ERC1155 implementation. | [Docs](https://docs.openzeppelin.com/contracts/3.x/erc1155) |
| `ERC1155.sol` | OpenZeppelin | An upgradeable variation of the OpenZeppelin ERC1155 contract. | [Docs](https://github.com/OpenZeppelin/openzeppelin-contracts-upgradeable/blob/master/contracts/token/ERC1155/ERC1155Upgradeable.sol) |

:::tip
Fun fact: Tableland uses the `ERC721AUpgradeable` standard for its registry contract.
:::

## Highly structured data

NFTs use structured metadata to describe the token's essential properties, which is a perfect use case for relational databases. Many encodings and data formats can be used, but the de-facto standard is to store metadata as a JSON object, encoded to a UTF-8 byte string. Here's an example of some JSON metadata for an NFT taken from the [OpenSea metadata standards](https://docs.opensea.io/docs/metadata-standards#metadata-structure) page:

```json
{
  "description": "Friendly OpenSea Creature that enjoys long swims in the ocean.",
  "external_url": "https://openseacreatures.io/3",
  "image": "https://storage.googleapis.com/opensea-prod.appspot.com/puffs/3.png",
  "name": "Dave Starbelly",
  "attributes": [ ... ],
}
```

### ERC721

There are many ways to structure metadata for an NFT, and a lot of the details depend on the specific use cases for a given NFT platform. The example above uses the schema defined in the [ERC721](https://eips.ethereum.org/EIPS/eip-721) standard mentioned previously. Generally speaking, NFT creators use these standards so that platform have a unified way to consume the data. OpenSea’s [metadata doc](https://docs.opensea.io/docs/metadata-standards) or Enjin’s [metadata doc](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1155.md#erc-1155-metadata-uri-json-schema) are good starting places to learn more about the expected content in your metadata.

If we expand the `attributes` array, you'll notice the objects stored with keys like `display_type`, `trait_type`, and `value`. It is highly structured data.

```json
{
  "description": "Friendly OpenSea Creature that enjoys long swims in the ocean.",
  "external_url": "https://openseacreatures.io/3",
  "image": "https://storage.googleapis.com/opensea-prod.appspot.com/puffs/3.png",
  "name": "Dave Starbelly",
  "attributes": [
    {
      "display_type": "string",
      "trait_type": "Base",
      "value": "Starfish"
    },
    {
      "display_type": "number",
      "trait_type": "Level",
      "value": 5
    },
    {
      "display_type": "string",
      "trait_type": "Personality",
      "value": "Sad"
    }
  ]
}
```

### ERC1155

You can use the [ERC1155 metadata standard](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1155.md#erc-1155-metadata-uri-json-schema) JSON schema and map these values into table rows and columns. The ERC1155 metadata is _almost_ identical to the [ERC-721 metadata standard](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md), with the inclusion of more rich properties.

```json
{
  "name": "Asset Name",
  "description": "Lorem ipsum...",
  "image": "https://s3.amazonaws.com/your-bucket/images/{id}.png",
  "properties": {
    "simple_property": "example value",
    "rich_property": {
      "name": "Name",
      "value": "123",
      "display_value": "123 Example Value",
      "class": "emphasis",
      "css": {
        "color": "#ffffff",
        "font-weight": "bold",
        "text-decoration": "underline"
      }
    },
    "array_property": {
      "name": "Name",
      "value": [1, 2, 3, 4],
      "class": "emphasis"
    }
  }
}
```

## Design

In general, there are top-level keys and a nested attributes array of trait objects. There are plenty of ways to design this, but a common pattern is to set up two table to hold your metadata: `attributes`, and `lookups`. The `attributes` hold token-specific traits, and the `lookups` holds "static"-ish data that _may_ be updated in the future but is the same base value for all tokens (like an IPFS CID pointing to a directory).

Instead of storing NFT metadata as static JSON files, you can put that data into tables. A very simplified representation could look like the following:

| id  | display_type | trait_type | value  |
| --- | ------------ | ---------- | ------ |
| 1   | string       | color      | blue   |
| 2   | string       | color      | yellow |

This gives rise to dynamism and composability because:

1. You can define who or what can change the data and how.
2. You (or anyone) can query the data and transform it with SQL (e.g., turning into JSON).

If some data were to get updated, like changing a value from `blue` to `red`, that would also change the metadata itself because it is _composed with read queries_, too.

| id  | display_type | trait_type | value   |
| --- | ------------ | ---------- | ------- |
| 1   | string       | color      | **red** |
| 2   | string       | color      | yellow  |

Thus, when an NFT is rendered somewhere, the associated `value` would also change. Taking the ERC721 compliant metadata, one of those nested `attributes` can now dynamically update with a JSON response object crafted with SQL:

```json
{
  "display_type": "string",
  "trait_type": "color",
  "value": "red" // Previously, was `blue`
}
```

## Next steps

Looking for more? Check out the page on [how to build an NFT](/how-to-build-an-nft), including additional resources for defining an [optimal SQL table structure](/sql/walkthroughs/nft-metadata) or [building a dynamic NFT in Solidity](/tutorials/dynamic-nft-solidity).
