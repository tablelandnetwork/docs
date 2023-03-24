---
title: Crafting NFT metadata
sidebar_label: NFT metadata
description: Turn table data into JSON objects and array for ERC721 compliant metadata.
keywords:
  - nft metadata
  - erc721 metadata
  - json metadata
---

Tableland offers a dynamic and flexible way to store [NFT metadata](https://docs.opensea.io/docs/metadata-standards#metadata-structure). You can store the top-level metadata and nested attributes in tables and compose them together using a read query. In order to craft the data into ERC721 compliant metadata, developers can store NFT attributes (traits like integers or strings) and _pointers_ large media on IPFS (or similar) in table cells—with access controls to allow for data mutability.

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

It has data that defines its attributes, and the top-level data (`image` and `name`) can be composed within the `SELECT` statement.

| id  | display_type | trait_type | value  |
| --- | ------------ | ---------- | ------ |
| 1   | string       | color      | blue   |
| 2   | string       | color      | yellow |

For example, the first represents a token with an `id` of `1` and some metadata that defines its `color` trait as the string `blue`.

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

NFT metadata has top-level keys of `name` and `image`, which often may incorporate the `id`. There is also an `attributes` key that is an array of objects that match the JSON object exemplified above. Note that other key-values are common in NFT metadata; for simplicity sake, these are ignored for the moment but could easily be incorporated (e.g., `description` or `external_url`).

You'll need to create an object that contains these top-level definitions, and the `attributes` will need to make use of the [JSON group array](/playbooks/sql/functions#objects) function. Namely, the `json_group_array()` will allow you to take one or more table rows that meet the `WHERE` clause condition and create JSON objects from them.

Here, you're using both the JSON object and array functions along with the `||` operator to [concatenate values into strings](/playbooks/sql/functions#string-concatenation).

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
        'value', color
      )
    )
  )
FROM
  attributes
WHERE id = <id>;
```

Without going into too much detail on [IPFS](https://ipfs.tech/), the `image` is being stored in some directory where the path to the image can simply be appended to the end of the URL (e.g., `ipfs://QmVK.../1` would point to an image for an NFT `id` of `1`). Hence, when someone views the underlying value mapped to the `image` key, it'll be the [location of the actual media](https://bafybeidpnfh2zc6esvou3kfhhvxmy2qrmngrqczj7adnuygjsh3ulrrfeu.ipfs.nftstorage.link/100/image_full.png). The same pattern is often used for the `external_url` to point to some website landing page for the NFT.

If you queried for the row where `id = 1`in `attributes`, the result would look resemble the following:

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

## More than one table

In the preceding examples, some "static" metadata was composed with values defined _within_ the read query, including the (truncated) IPFS CID `QmVK...`. Instead, these static values could exist in a ["lookups" table and then composed](https://dev.tableland.xyz/blog/rigs-data-storage-design-update) with SQL.

If you want to change existing metadata, all it really takes is mutating table values. Thus, instead of the read query defining hard-coded values that _could_ change (such as updating what `QmVK...` CID is storing images), you can future-proof any changes by storing "static"-ish values in another table. In other words, the read query would handle composing data across multiple tables.

A new table can be created—call it `lookups`—with the following schema:

```sql
(
  cid TEXT,
  external_base_url TEXT
)
```

Thus, the table is pretty small (one total row):

| cid       | external_base_url      |
| --------- | ---------------------- |
| `QmVK...` | `https://example.com/` |

It has data that defines its attributes, and the top-level data (`image` and `name`) can be composed within the `SELECT` statement.

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
        'value', color
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
