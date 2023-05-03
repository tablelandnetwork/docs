---
title: Serve NFT metadata from smart contracts
sidebar_label: Serve NFT metadata
description: Learn how to write, format, and deploy SQL in your smart contracts to produce NFT JSON metadata.
keywords:
  - nft metadata
  - erc721 metadata
  - solidity nft
---

Now that you have data stored as tables, you’ll need to serve it as metadata JSON so that marketplaces, wallets, and platforms can all pick it up for display. In short, you want to take a URL like this one:

```markdown
https://testnets.tableland.network/query?unwrap=true&extract=true&s=SELECT json_object('id', '#' || id, 'image', image, 'image_alpha', image_alpha, 'thumb', thumb, 'thumb_alpha', thumb_alpha) FROM rigs_5_13 WHERE id=1
```

...which returns:

```json
{
  "id": "#1",
  "image": "ipfs://bafybeifptczw7v4caqptxuh2twl7fjpaf5dlcanwceum5pxotqkchzjbre/image.png",
  "image_alpha": "ipfs://bafybeifptczw7v4caqptxuh2twl7fjpaf5dlcanwceum5pxotqkchzjbre/image_alpha.png",
  "thumb": "ipfs://bafybeifptczw7v4caqptxuh2twl7fjpaf5dlcanwceum5pxotqkchzjbre/thumb.png",
  "thumb_alpha": "ipfs://bafybeifptczw7v4caqptxuh2twl7fjpaf5dlcanwceum5pxotqkchzjbre/thumb_alpha.png"
}
```

...and serve it from your smart contract so that apps trying to display your token can read each NFT metadata response one at a time. To do this, you’ll need to leverage the `tokenURI` or `uri` endpoints in your smart contracts.

:::tip
Looking for more? Check out the page on [how to build an NFT](/how-to-build-an-nft), including additional resources for defining an [optimal SQL table structure](/playbooks/walkthroughs/nft-metadata) or [building a dynamic NFT in Solidity](/tutorials/dynamic-nft-solidity).
:::

## ERC721 tokenURIs

### Response mode

The current default response mode is designed for row-based responses. To get your data as a single object that will match the expected standards, you will need to change the response mode in the URL to `unwrap=true&extract=true`. You can see that in our `_baseURIString` below.

### Adding baseURI support

OpenZepplin and other frameworks support setting up a `baseURI` in your smart contract that will become the bases for all token URIs, adding this is simple. You’ll want to add a baseURI that points to the Tableland gateway.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Example {
  // The testnet gateway URI plus query parameter
  string private _baseURIString = "https://testnets.tableland.network/query?unwrap=true&extract=true&s=";

  // The base URI used by tokenURI
  function _baseURI() internal view override returns (string memory) {
    return _baseURIString;
  }
}
```

By default, the `tokenURI()` method will take this URI and append the requested tokenId to get a final URI for the token’s metadata. So the following example shows the default implementation giving us the wrong result.

```tsx
tokenURI(1) { return _baseURIString + '/' + 1 }
// https://testnets.tableland.network/query?unwrap=true&extract=true&s=/1
```

For most uses of Tableland, we’ll want to modify this so that SQL can be used to extract the correct metadata for a specific token.

:::tip
🛠 Response modes may change before mainnet. You should create a method for easily updating your baseURI if needed.

:::

```solidity
// Ensures the contract owner can easily update the project's baseURI
function setBaseURI(string memory baseURI) onlyOwner {
	_baseURIString = baseURI;
}
```

#### Adding SQL to the tokenURI method

To get the right row for any of our sample data to the `tokenURI` call, we’ll need `tokenURI` to return back the `baseURI` plus the correct SQL statement.

```solidity
tokenURI(1) =>
// SELECT+json_object%28%27id%27%2C+id%2C+%27name%27%2C+name%2C+%27color%27%2C+color%29+FROM+tokenuri_table_1+WHERE+id%3D1
```

#### URL encoding SQL template

Before we add our SQL to our contract, we’re going to want to URL encode it. We’ll just use a simple online tool [found here](https://www.url-encode-decode.com/) to do it. You’ll take your SQL but remove your template string `{id}` so that you don’t encode that by mistake. So the example SQL becomes,

```sql
SELECT json_object('id', id, 'name', name, 'color', color) FROM tokenuri_table_1 WHERE id=
```

Encoded, it’s now

```html
SELECT+json_object%28%27id%27%2C+id%2C+%27name%27%2C+name%2C+%27color%27%2C+color%29+FROM+tokenuri_table_1+WHERE+id%3D
```

Finally, we add the templating string `{id}` back where it was

```html
SELECT+json_object%28%27id%27%2C+id%2C+%27name%27%2C+name%2C+%27color%27%2C+color%29+FROM+tokenuri_table_1+WHERE+id%3D{id}
```

## String templating and SQL in tokenURI

Additionally, the client will expect the resulting URI string to be nicely URL encoded. Tableland provides a couple of simple utiliities to make this work nicely for you. The main one we’ll want to use here is a URITemplate function that will replace the `{id}` template in a string with a supplied value for ID on the fly. With that, we can replace the `tokenURI()` default method with one that uses the templating to create a SQL read command on the fly.

Let’s look at an updated ERC-721 contract written with OpenZeppelin’s contracts.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@tableland/evm/contracts/utils/URITemplate.sol";

contract Example {
  // The testnet gateway URI plus query parameter
  string private _baseURIString = "https://testnets.tableland.network/query?unwrap=true&extract=true&s=";

  constructor() {
    string private uriTemplate = "SELECT+json_object%28%27id%27%2C+id%2C+%27name%27%2C+name%2C+%27color%27%2C+color%29+FROM+tokenuri_table_1+WHERE+id%3D{id}"
		setURITemplate(uriTemplate);
  }

  // BaseURI provider
  function _baseURI() internal view override returns (string memory) {
    return _baseURIString;
  }

  // method to set our uriTemplate
  function setURITemplate(string memory uriTemplate)
      public
      override
      onlyOwner
  {
      _setURITemplate(uriTemplate);
  }

  // public method to read the tokenURI
  function tokenURI(uint256 tokenId)
      public
      view
      override(ERC721A, IERC721A)
      returns (string memory)
  {
      if (!_exists(tokenId)) revert URIQueryForNonexistentToken();
      return _getTokenURI(_toString(tokenId));
  }
}
```

Now `tokenURI()` will provide a direct read request for the metadata stored in a single row that will return properly formed metadata json.

## ERC-1155 URIs

All of the above holds for returning URIs for your 1155 as well. Except, for many projects, it may be a bit easier. The [ERC-1155](https://eips.ethereum.org/EIPS/eip-1155#metadata) standard is to return a URI template from the read endpoint (versus ERC-721, which evaluates the template too). From the docs,

> The URI value allows for ID substitution by clients. If the string `{id}` exists in any URI, clients MUST replace this with the actual token ID in hexadecimal form. This allows for a large number of tokens to use the same on-chain string by defining a URI once, for that large number of tokens.

As a side-note, this templating rule also exists in the final JSON for the NFT, where `{id}` found anywhere in the JSON must be replaced by the client.

In an ERC-1155, you can store your template and return it! Here's how.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

contract Example {

  string private _uriTemplate = "SELECT+json_object%28%27id%27%2C+id%2C+%27name%27%2C+name%2C+%27color%27%2C+color%29+FROM+tokenuri_table_1+WHERE+id%3D{id}"

  function uri(uint256 _id) external view returns (string memory) {
		return _uriTemplate;
  }
}
```
