---
title: ERC1155 metadata
description: Learn how to store ERC1155 metadata in a table.
keywords:
  - nft metadata
  - erc1155 metadata
  - json metadata
---

Traditional NFTs are ERC721 tokens, which are non-fungible and unique. However, there are also ERC1155 tokens, which are semi-fungible and can be minted in batches such that multiple tokens can have the same metadata. This is useful for a number of use cases, such as a game inventory of NFT traits where you want to mint multiple tokens with the same metadata but different `tokenId`s.

## Table data

Similar to ERC721 metadata, you'll need to form a JSON object with ERC1155 compliance for each row in the table. The `N` below represents the token's `id`, and you can see that the format _slightly_ differs from the [ERC721 metadata](/playbooks/blueprints/erc721-metadata) format since a `properties` key with an object is used instead of an `attributes` array.

```json
{
  "name": "Token #N",
  "image": "ipfs://QmVK.../N",
  "external_url": "https://example.com/N",
  "properties": {
    {
      "display_type": "string",
      "trait_type": "color",
      "value": "blue"
    }
  }
}
```

Thus, the table should have the following columns:

```sql
CREATE TABLE erc1155_metadata(
  id INTEGER,
  display_type TEXT,
  trait_type TEXT,
  value TEXT,
);
```

An example of the table data might look like this:

| id  | display_type | trait_type | value   |
| --- | ------------ | ---------- | ------- |
| 1   | string       | shirt      | flannel |
| 2   | string       | hat        | trucker |

## Querying data

To serve NFT metadata from a row in a table, you need to write a SQL statement that will:

1. Extract the right row given a specific `id` (which should match with the NFT's `tokenId`).
2. Convert the row into ERC1155 compliant JSON metadata.

We'll make use of nested [json_object()](/sql/functions#objects) functions and compose the data for a single token such that the `<id>` value represents the value of the ERC115 token.

```sql
SELECT
  json_object(
    'name',t.value||' #'||t.id,
    'external_url','https://example.com/'||t.id,
    'properties',
      json_object(
          'display_type','string',
          'trait_type',t.traitType,
          'value',t.value
      )
  )
FROM
  erc1155_metadata t
WHERE
  t.id = <id>
GROUP BY
  t.id;
```

## Next steps

Looking for more? Check out the page on [how to build an NFT](/playbooks/concepts/how-to-build-an-nft) for more in-depth guides that include Solidity code examples.
