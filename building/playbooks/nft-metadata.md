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

## JSON on Tableland

This is the easy part. We can map the [ERC-1155 metadata standard](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1155.md#erc-1155-metadata-uri-json-schema) JSON schema into table columns. This is almost identical to the [ERC-721 metadata standard](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md) with the inclusion of decimals and properties for things like NFT traits.

<details>

<summary>JSON metadata example</summary>

```json
{
	"name": "Asset Name",
	"description": "Lorem ipsum...",
	"image": "https:\/\/s3.amazonaws.com\/your-bucket\/images\/{id}.png",
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



</details>





To link to images, videos, and other media, NFT creators generally use some form of external URI (because on-chain data is too expensive). Increasingly, an [IPFS URI](https://docs.ipfs.io/how-to/best-practices-for-nft-data/#ipfs-uri) is used for large external assets. This is better than storing an HTTP gateway URL, since it's not tied to a specific gateway provider. The IPFS community suggests keeping things light when creating IPFS URIs, and allowing the target platforms to specify specific gateway URLs for convenience or interoperability.
