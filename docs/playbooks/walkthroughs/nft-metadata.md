---
title: Crafting NFT metadata
sidebar_label: NFT metadata
description: Turn table data into JSON objects and array for ERC721 compliant metadata.
keywords:
  - nft metadata
  - erc721 metadata
  - json metadata
---

Tableland offers a dynamic and flexible way to store [NFT metadata](/fundamentals/concepts/nft-metadata). You can use Tableland for structuring the top-level metadata and nested attributes in tables and compose them together using a read query. In order to craft the data into ERC721 compliant metadata, developers can store NFT attributes (traits like integers or strings) and _pointers_ large media on IPFS (or similar) in table cells—with access controls to allow for data mutability.

## Table data

Ultimately, you'll need to form a JSON object with ERC721 compliance for each row in the table. Here, let's ignore some of the static top-level data and focus on dynamic attributes where `N` represents the token's `id`.

```json
{
  "name": "Token #N",
  "image": "ipfs://QmVK.../N",
  "external_url": "https://example.com/N",
  "attributes": [
    {
      "display_type": "string",
      "trait_type": "color",
      "value": "blue"
    }
  ]
}
```

For these examples, let's assume there exists `attributes` where every `id` represents an NFT and multiple rows _can_ have the same `id`. Its schema is the following:

```sql
(
  id INTEGER,
  display_type TEXT,
  trait_type TEXT,
  value TEXT,
)
```

It has data that defines its attributes, and the top-level data (`image`, `name`, and `external_url`) can be composed within the `SELECT` statement.

| id  | display_type | trait_type | value  |
| --- | ------------ | ---------- | ------ |
| 1   | string       | color      | blue   |
| 2   | string       | color      | yellow |

For example, the first row represents a token with an `id` of `1` and some metadata that defines its `color` trait as the string `blue`, the second is a token with an `id` of `2` and a `color` that's `yellow`, etc.

## JSON objects

To serve NFT metadata from a row in a table, you need to write a SQL statement that will:

1. Extract the right row given a specific `id` (which should match with the NFT's `tokenId`).
2. Convert the row into ERC721 compliant JSON metadata.

You’ll want to query `attributes` above with a `WHERE` clause on the `id` column—for example, the row where the `id` is `1`. With SQL functions, you can use the [json_object()](https://www.sqlite.org/json1.html#jobj) function to turn table data into a JSON object. Check out the [JSON functions](/playbooks/sql/functions#objects) documentation for more details.

The TL;DR is that you can define a key-value pair in the function itself but as a set of comma separated values. The first value is the key (a string), the second value is the table's column name, and so on and so forth. At the end of the query, the `<id>` value represents the value that you would pass here; in our example table, the available `id`s is either a `1` or `2`.

```sql
SELECT
  json_object(
    'display_type', display_type,
    'trait_type', trait_type,
    'value', value
  )
FROM
  attributes
WHERE
  id = <id>;
```

This will create an object for only the rows where, for example, `id = 1` since each `id` represents a single NFT, and this pattern can be repeated for each and every token / row. However, the example above only a component of composing the entire metadata object.

```json
{
  "display_type": "string",
  "trait_type": "color",
  "value": "blue"
}
```

## JSON array with objects

NFT metadata has top-level keys of `name`, `image`, and `external_url`, which often may incorporate the `id`. There is also an `attributes` key that is an array of objects which match the JSON object exemplified above. Note that other key-values are possible in NFT metadata. For simplicity sake, these are ignored for the moment but could easily be incorporated within the query itself (e.g., a top-level `description` that's the same for every NFT).

You'll need to create an object that contains these top-level definitions, and the `attributes` will need to make use of the [JSON group array](/playbooks/sql/functions#objects) function. Namely, the `json_group_array()` will allow you to take one or more table rows that meet the `WHERE` clause condition and create JSON objects from them.

Here, you're using both the JSON object and array functions along with the `||` operator to [concatenate values into strings](/playbooks/sql/functions#string-concatenation). Note that if you're _not_ using IPFS to store images (e.g., if storing on a hosted server), you should replace `'ipfs://QmVK.../'` with your base URL.

```sql
SELECT
  json_object(
    'name', 'Token #' || id,
    'image', 'ipfs://QmVK.../' || id,
    'external_url', 'https://example.com/' || id,
    'attributes',
    json_group_array(
      json_object(
        'display_type', display_type,
        'trait_type', trait_type,
        'value', value
      )
    )
  )
FROM
  attributes
WHERE id = <id>;
```

Without going into too much detail on [IPFS](https://ipfs.tech/), this assumes the `image` is being stored in some directory where the path to the image can simply be appended to the end of the URL (e.g., `ipfs://QmVK.../1` would point to an image for an NFT `id` of `1`). Hence, when someone views the underlying value mapped to the `image` key, it'll be the [location of the actual media](https://bafybeidpnfh2zc6esvou3kfhhvxmy2qrmngrqczj7adnuygjsh3ulrrfeu.ipfs.nftstorage.link/100/image_full.png). The same pattern is often used for the `external_url` to point to some website landing page for the NFT.

If you queried for the row where `id = 1` in `attributes`, the result would look resemble the following:

```json
{
  "name": "Token #1",
  "image": "ipfs://QmVK.../1",
  "external_url": "https://example.com/1",
  "attributes": [
    {
      "display_type": "string",
      "trait_type": "color",
      "value": "blue"
    }
  ]
}
```

## Additional traits

Because the JSON array function aggregates results, it will automatically include new rows that use the same `id` due to the way the query is structured. For example, assume there are now two rows for a token:

| id  | display_type | trait_type | value |
| --- | ------------ | ---------- | ----- |
| 1   | string       | color      | blue  |
| 1   | number       | power      | 10    |

If you run the same query above, it'll produce an `attributes` array with two objects instead of just one:

```json
{
  "name": "Token #1",
  "image": "ipfs://QmVK.../1",
  "external_url": "ipfs://example.com/1",
  "attributes": [
    {
      "display_type": "string",
      "trait_type": "color",
      "value": "blue"
    },
    // highlight-start
    {
      "display_type": "number",
      "trait_type": "power",
      "value": "10"
    }
    // highlight-end
  ]
}
```

## Dynamic metadata

To make the metadata change, all it takes is an `UPDATE` statement. Perhaps the owner has permission to change the `color` of their owned token. You would then execute a statement like so:

```sql
UPDATE
  attributes(color)
SET
  color = <color>
WHERE
  id = <id>;
```

For example, the owner of token ID `1` might want to set the color to `purple`—using these values in the query above would change the table's data for that row and column, thus, automatically returning the new `purple` attribute whenever that query is made.

| id  | display_type | trait_type | value      |
| --- | ------------ | ---------- | ---------- |
| 1   | string       | color      | **purple** |

In other words, once you set a read query in place, it will always pull the live table state and reflect its latest changes.

## More than one table

In the preceding examples, some "shared" metadata was composed with values defined _within_ the read query, including the (truncated) IPFS CID `QmVK...` and `external_url`. Instead, these shared values could exist in a ["lookups" table and then composed](https://dev.tableland.xyz/blog/rigs-data-storage-design-update) with SQL.

If you want to change existing metadata, all it really takes is mutating table values. Thus, rather than the read query defining hard-coded values that _could_ change (such as updating the folder that's storing images and changing the `QmVK...` CID), you can future-proof any changes by storing shared values in another table. In other words, the read query would handle composing data across multiple tables that define potentially mutable commonalities.

A new table can be created—call it `lookups`—with the following schema.

```sql
(
  cid TEXT,
  external_base_url TEXT
)
```

The table is pretty small (one total row) but could have more values included, based on your metadata needs.

| cid       | external_base_url      |
| --------- | ---------------------- |
| `QmVK...` | `https://example.com/` |

This holds data that is now part the top-level data (`image` and `external_url`) and can be composed within the `SELECT` statement. Note that if you're _not_ using IPFS to store images, you can replace the `cid` column so that it mimics the `external_base_url` setup. This would slightly alter the query portion for `image` and resemble how the `external_url` is formed.

```sql
SELECT
  json_object(
    'name', 'Token #' || id,
    // highlight-start
    'image', 'ipfs://' || cid || '/' || id,
    'external_url', external_base_url || id,
    // highlight-end
    'attributes',
    json_group_array(
      json_object(
        'display_type', display_type,
        'trait_type', trait_type,
        'value', value
      )
    )
  )
FROM
  attributes
JOIN
  lookups
WHERE id = <id> GROUP BY <id>;
```

The JSON response is the same as before but much more future-proof and ready for dynamism. You could also choose to add other columns, such as an `animation_base_url` or similar.

## Next steps

Looking for more? Check out the page on [how to build an NFT](/how-to-build-an-nft), including additional resources including [building a dynamic NFT in Solidity](/tutorials/dynamic-nft-solidity).
