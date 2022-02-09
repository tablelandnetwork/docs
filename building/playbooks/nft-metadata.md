---
description: Launch your next Non-Fungible Token project with metadata stored on Tableland.
---

# NFT Metadata

Today, the primary standards for NFTs are the [Ethereum ERC-721 Non-Fungible Token Standard](https://eips.ethereum.org/EIPS/eip-721), and the more recent [Ethereum ERC-1155 Multi Token Standard](https://eips.ethereum.org/EIPS/eip-1155). Platforms such as OpenSea have adopted these NFT standards, along with [modifications of their own](https://docs.opensea.io/docs/metadata-standards), to support a wide range of NFT projects. For the purposes of this document, the most important features of these NFT standards are their treatment of token metadata, and the standards around that metadata.

{% hint style="info" %}
The following is taken liberally from this [IPFS NFT docs page](https://docs.ipfs.io/how-to/best-practices-for-nft-data/#types-of-ipfs-links-and-when-to-use-them).
{% endhint %}

Most NFTs will need some kind of structured metadata to describe the token's essential properties. Many encodings and data formats can be used, but the de-facto standard is to store metadata as a JSON object, encoded to a UTF-8 byte string. Here's an example of some JSON metadata for an NFT:

```json
{
  "description": "Friendly OpenSea Creature that enjoys long swims in the ocean.", 
  "external_url": "https://openseacreatures.io/3", 
  "image": "https://storage.googleapis.com/opensea-prod.appspot.com/puffs/3.png", 
  "name": "Dave Starbelly",
  "attributes": [ ... ], 
}
```

There are many ways to structure metadata for an NFT, and a lot of the details depend on the specific use cases for a given NFT platform. The example above uses the schema defined in the [ERC-721](https://eips.ethereum.org/EIPS/eip-721) standard mentioned previously. Generally speaking, NFT creators use well-known standards so their NFTs will be viewable using standard wallets and other tools like block explorers.

In the following sections, we outline how to leverage Tableland to create and store mutable NFT metadata!

## JSON metadata

This is the easy part. We can map the [ERC-1155 metadata standard](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1155.md#erc-1155-metadata-uri-json-schema) JSON schema into table columns. This is almost identical to the [ERC-721 metadata standard](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md) with the inclusion of decimals and properties for things like NFT traits.

<details>

<summary>JSON metadata example</summary>

```json
{
	"name": "Asset Name",
	"description": "Lorem ipsum...",
	"image": "https:\/\/s3.amazonaws.com\/your-bucket\/images\/{id}.png",
	"attributes": {
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
			"value": [1,2,3,4],
			"class": "emphasis"
		}
	}
}
```

</details>

There is also room for localization handling!

<details>

<summary>JSON metadata schema</summary>

```json
{
    "title": "Token Metadata",
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "description": "Identifies the asset to which this token represents",
        },
        "decimals": {
            "type": "integer",
            "description": "The number of decimal places that the token amount should display - e.g. 18, means to divide the token amount by 1000000000000000000 to get its user representation."
        },
        "description": {
            "type": "string",
            "description": "Describes the asset to which this token represents"
        },
        "image": {
            "type": "string",
            "description": "A URI pointing to a resource with mime type image/* representing the asset to which this token represents. Consider making any images at a width between 320 and 1080 pixels and aspect ratio between 1.91:1 and 4:5 inclusive."
        },
        "attributes": {
            "type": "object",
            "description": "Arbitrary properties. Values may be strings, numbers, object or arrays.",
        },
        "localization": {
            "type": "object",
            "required": ["uri", "default", "locales"],
            "properties": {
                "uri": {
                    "type": "string",
                    "description": "The URI pattern to fetch localized data from. This URI should contain the substring `{locale}` which will be replaced with the appropriate locale value before sending the request."
                },
                "default": {
                    "type": "string",
                    "description": "The locale of the default data within the base JSON"
                },
                "locales": {
                    "type": "array",
                    "description": "The list of locales for which data is available. These locales should conform to those defined in the Unicode Common Locale Data Repository (http://cldr.unicode.org/)."
                }
            }
        }
    }
}
```

</details>

In general, the `description` is the same for all the items in a given collection, though this need not be the case. The `name` however, _is specific_ to each item in the collection. To enable the ERC-721 specification behavior on our tables, we need to create a unique row identifier that matches the token identifier for each token we're trying to create/mint.

## Metadata on Tableland

If the source contract is ERC-721 compliant, this is the integer token ID, whereas if the source contract is ERC-1155 compliant, then the entire table should only be for _one of the assets_ in the contract. This way we can treat the table just like ERC-721, in which case the row identifier is again the integer token ID.

{% hint style="info" %}
Fungible tokens either don’t need metadata or they would only have a single row. Semi-fungible tokens (like coupons) would need a new table schema (beyond the scope of this doc).
{% endhint %}

The Tableland team has created some custom table `TYPE` to make it easier for developers to create dynamic NFT metadata. To create an ERC-721 metadata compliant table, simply create your table using the `OF` keyword (or you can specify the full column definition yourself):

```sql
CREATE TABLE myToken OF erc721_metadata (
  PRIMARY KEY (id)
);
```

This will create a table (say with the name `MyToken_0` ) with the following column specification (with `id` as the primary key). See [javascript-sdk.md](../../developers/javascript-sdk.md "mention") for details on how to create a table using the Javascript SDK from within your app.

```sql
-- This is just the table type definition for references
CREATE TYPE erc721_metadata AS (
  id int,
  name text,
  description text,
  image uri,
  external_url uri,
  attributes json
);
```

To insert new token metadata into the table is now as easy as:

```
INSERT INTO MyToken_0 (id, name, image) VALUES (0, 'Token 0', 'ipfs://QmHash');
```

To link to images, videos, and other media, NFT creators generally use some form of external URI (because on-chain data is too expensive). Increasingly, an [IPFS URI](https://docs.ipfs.io/how-to/best-practices-for-nft-data/#ipfs-uri) is used for large external assets. This is better than storing an HTTP gateway URL, since it's not tied to a specific gateway provider. The IPFS community suggests keeping things light when creating IPFS URIs, and allowing the target platforms to specify specific gateway URLs for convenience or interoperability.

{% hint style="info" %}
Tableland provides the special `uri` type for handling IPFS URIs. There is also a custom `ipfs_uri` type that will be supported in the future to ensure properly formatted IPFS URIs.
{% endhint %}

## Gateway response

With your ERC-721/1155 compliant table in place, it is just a matter of specifying a Tableland gateway URL for your token's `tokenURI` base URI. For example, using an NFT contract created using the [OpenZeppelin](https://openzeppelin.com/contracts) [Contracts Wizard](https://wizard.openzeppelin.com/#erc721), you can set the base URI to `https://testnet.tableland.network/tables/{table_id}` (which in our above example would have `{table_id}` set to `0`). This should generate the following code:

```solidity
function _baseURI() internal pure override returns (string memory) {
    return "https://testnet.tableland.network/tables/{table_id}/";
}
```

In this case, the token id will automatically be appended to the end of the URI string when calling the `tokenURI` method of the smart contract. The response from that Tableland gateway URL is a JSONified version of the corresponding row of the table, which will be ERC-721 compliant token metadata:

<details>

<summary>JSON response</summary>

```
{
  "name": "Azuki #2362",
  "image": "https://ikzttp.mypinata.cloud/ipfs/QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg/2362.png",
  "attributes": [
    {
      "trait_type": "Type",
      "value": "Human"
    },
    {
      "trait_type": "Hair",
      "value": "Blonde Swept Back"
    },
    {
      "trait_type": "Clothing",
      "value": "Kimono with Jacket"
    },
    {
      "trait_type": "Eyes",
      "value": "Closed"
    },
    {
      "trait_type": "Mouth",
      "value": "Sleep Bubble"
    },
    {
      "trait_type": "Offhand",
      "value": "Leather Katana"
    },
    {
      "trait_type": "Background",
      "value": "Off White C"
    }
  ]
}
```

</details>

And that's it! Now you have a mutable, secure source for maintaining NFT metadata!
