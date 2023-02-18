---
title: Build a dynamic NFT in Solidity
description: Create an on-chain game that uses SQL queries to create and populate a table of game state.
synopsis: Tableland enables ownership & on-chain rules to dictate table state mutation. For every mutation, the data is accessible with off-chain queries that can be displayed in an interface, such as an NFT-based game board. This tutorial walks through the basics of Solidity ERC721s and an app with shared state.
keywords:
  - tutorial
  - solidity
  - dynamic NFT
  - p5.js
---

import Link from "@docusaurus/Link";

## Overview

Let's create a small on-chain game. In the game, we’ll allow the owner of an NFT to update only specific properties of their NFT dynamically (and for those updates to appear on all marketplaces, platforms, and wallets that display the NFT).

Suppose in this game that you are a pixel moving around a 512x512 canvas. The game would consist of users, the pixels they own, and the coordinates of those pixels. An interface may include a 512x512 canvas that renders your and others' locations.

import GameBoard from "@site/static/assets/tutorials/dynamic-nft-solidity/game-board.png"

<img src={GameBoard} width='80%'/>

When you build the game, you want users to own their pixels as an NFT. So, we can think of the game's architecture in two parts. The first part is an ERC-721 smart contract where users can mint pixels and then update the coordinates of pixels they own. The second part is a web app that displays the live locations of all the minted pixels and provides an interface for each owner to move their pixel. Today, we'll cover just the first part.

The data's simplicity would make it great fun to build fully on-chain, but we'll use it to illustrate the basics of creating a smart contract that owns and populates relational data tables. Let's go!

### The NFT design

import AppFlow from "@site/static/assets/tutorials/dynamic-nft-solidity/app-flow.png"

<figure>
<img src={AppFlow} />
<figcaption>CanvasGame is an ERC721 smart contract where anyone can mint a new pixel in the game. NFT HTML App is the NFT as a simple web app to pull and render current game state. All top level contract metadata and per-token metadata are stored in two dynamic tables on Tableland.</figcaption>
</figure>

1. By owning a pixel, the user controls a token with an X,Y coordinate in the game. They control their pixel through an interface built right on the NFT and a call to the CanvasGame smart contract.
2. A custom function in CanvasGame will check the permissions of the calling user and then update the pixel metadata in the Token Metadata table.
3. All NFTs will be able to query the latest state from that table to display the updated move.

## Setup

We’ll be using Hardhat with OpenZeppelin contracts and the Tableland contracts.

```bash
npm install @openzeppelin/contracts @tableland/evm
```

### Repo

Note: if you want to follow the code itself, check out the repo: [https://github.com/tablelandnetwork/example-canvas-game](https://github.com/tablelandnetwork/example-canvas-game)

### Smart contract scaffolding

Let’s work from a basic smart contract outline and then build out each necessary section.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@tableland/evm/contracts/ITablelandTables.sol";
import "@tableland/evm/contracts/utils/SQLHelpers.sol";

contract CanvasGame is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // Our will be pulled from the network
    string private _baseURIString =
        "https://testnets.tableland.network/query?s=";

    // Called only when the smart contract is created
    constructor() ERC721("Pixel", "ITM") {
        // Setup steps in our smart contract
    }

    /*
     * @dev safeMint allows anyone to mint a token in this project.
     * Any time a token is minted, a new row of metadata will be
     * dynamically inserted into the metadata table.
     */
    function safeMint(address to) public returns (uint256) {
        uint256 newItemId = _tokenIds.current();

        /* Any table updates will go here */

        _safeMint(to, newItemId, "");
        _tokenIds.increment();
        return newItemId;
    }

    /*
     * @dev makeMove is an example of how to encode gameplay into both the
     * smart contract and the metadata. Whenever a token owner calls
     * make move, they can supply a new x,y coordinate and update
     * their token metadata.
     */
    function makeMove(
        uint256 tokenId,
        uint256 x,
        uint256 y
    ) public {
        // Check token ownership
        require(this.ownerOf(tokenId) == msg.sender, "Invalid owner");
        // Simple on-chain gameplay enforcement
        require(x < 512 && 0 <= x, "Out of bounds");
        require(y < 512 && 0 <= y, "Out of bounds");

        /* Any table updates will go here */
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseURIString;
    }

    /*
     * @dev tokenURI is an example of how to turn a row in your table back into
     * erc721 compliant metadata JSON. Here, we do a simple SELECT statement
     * with function that converts the result into json.
     */
    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721URIStorage: URI query for nonexistent token"
        );
        string memory base = _baseURI();

        /* We will give token viewers a way to get at our table metadata */
        return;
    }
}

```

## Creating contract owned tables

Any contract can call the Tableland network to create new tables. When a contract does so, it is automatically made the owner of the table and has full write and update abilities on the data. This is a handy feature that allows you to dynamically create metadata tables from your smart contract and then mutate them through custom functions.

:::tip
You cannot use **constructor** if you are using proxy contracts like those made available by OpenZeppelin. Instead, in proxy contracts, you’ll need to wrap these functions in a **`postDeploy() onlyOwner`** style function you call after the contract is deployed.
:::

Let’s update the `constructor` method to create a table when we deploy the contract.

```solidity
ITablelandTables private _tableland;
string private _metadataTable;
uint256 private _metadataTableId;
string private _tablePrefix = "canvas";

constructor(address registry) ERC721("Pixel", "ITM") {
  /*
   * The Tableland address on your current chain
   */
  _tableland = ITablelandTables(registry);

  /*
   * Stores the unique ID for the newly created table.
   */
  _metadataTableId = _tableland.createTable(
    address(this),
    SQLHelpers.toCreateFromSchema(
        "id int, external_link text, x int, y int",
        _tablePrefix
    )
  );
}
```

We handled a few steps here.

1. We created global variables in our contract to track the `tableId` and final name. Table names are assigned on create time, so you’ll need to do a bit of string concatenation to get your final name.
2. We added an `address` input to our `constructor` method. This is the address of the Tableland protocol on our current chain. You can fine those here: <Link to="/develop/reference/chain-contracts">currently supported chains</Link>
3. Next, we connected to Tableland using the address provided above.
4. We called the `createTable` method and gave it a table prefix ("_canvas_") and a schema, just like any CREATE table command in SQL: `id int, external_link text, x int, y int`. Schemas match our SQL spec.

Our final table will look like this (and have some actual data in the table itself):

| id INT | external_link TEXT | x INT | y INT |
| ------ | ------------------ | ----- | ----- |
| -      | -                  | -     | -     |

We’ll use this data to store a row per token minted. Each `tokenId` will be stored in the `id` column and can be used later to query for the single row response.

When we deploy the smart contract, it will create a table on Tableland that only can be updated by the smart contract itself!

:::tip
We’ll handle creating the Contract Metadata table in a later playbook.
:::

## Storing data from your smart contract

In our simple game, we want to allow anyone to mint a pixel, that pixel will exist as an NFT. NFT metadata is often stored on centralized servers or as static files on IPFS. Neither of those options are easily updated right from a smart contract, so we’re going to store our metadata in our dynamic table owned by the smart contract. To do so, we’ll add an INSERT statement that will update our metadata table every time a new token is minted.

```solidity
function safeMint(address to) public returns (uint256) {
    uint256 newItemId = _tokenIds.current();
    _tableland.runSQL(
      address(this),
			_metadataTableId,
			SQLHelpers.toInsert(
				_tablePrefix, // prefix
				_metadataTableId, // table id
			  // column names
				"id, external_link, x, y",
			  // values
				string.concat(
					Strings.toString(newItemId),
					", 'not.implemented.xyz', 0, 0"
				)
      )
    );
    _safeMint(to, newItemId, "");
    _tokenIds.increment();
    return newItemId;
}
```

We only added one new command, but let’s walk through the whole function now.

1. Anyone can call `safeMint` (gas only!)
2. There is a global variable in the contract tracking the `tokenId`s minted. The first one will be `0` and go up every time `safeMint` is successfully called.
3. Next, we call the `runSQL` method on Tableland and INSERT a row into our metadata table. The SQL called loos like, `INSERT INTO metadataTable (id, external_link, x, y) VALUES (tokenId, 'placeholder', 0, 0)`. That’s the new default 0,0 starting point for every new NFT owner.
4. Finally, we call the `safeMint` to transfer ownership to the caller and increment our token IDs.

:::tip
We’ll leave the external_link as a placeholder until a later walkthrough were we create the NFT app to view the game.

:::

## View the contract’s metadata table

Since the metadata table is created at deploy time, you’ll need to create a read method on your smart contract to get the final table name in order to query it. Let’s just add a read method to get back a gateway request for the table!

```solidity
function metadataURI() public view returns (string memory) {
  string memory base = _baseURI();
  return string.concat(
    base,
    "SELECT%20*%20FROM%20",
    _metadataTable
  );
}
```

After your contract is deployed, you can call this method so you can view the metadata table directly!

## Allow the user to move their pixel

Since the metadata table is owned by the smart contract, nobody can change the coordinates of their x, y pixel directly. There are a few ways to achieve the per-user ACL on Tableland, but here we’ll use the fully smart-contract controlled approach.

Let’s update the function called, `makeMove` so that it can be called by any token owner to update their x,y position.

```solidity
function makeMove(uint256 tokenId, uint256 x, uint256 y) public {
  // Check token ownership
  require(this.ownerOf(tokenId) == msg.sender, "Invalid owner");
  // Simple on-chain gameplay enforcement
  require(x < 512 && 0 <= x, "Out of bounds");
  require(y < 512 && 0 <= y, "Out of bounds");
  // Update the row in tableland
  _tableland.runSQL(
    address(this),
		_metadataTableId,
		SQLHelpers.toUpdate(
			_tablePrefix, //prefix
			_metadataTableId, //table id
      // setters
			string.concat(
	      "x = ",
	      Strings.toString(x),
	      ", y = ",
	      Strings.toString(y),
			),
			// where conditions
			string.concat(
	      "id = ",
	      Strings.toString(tokenId)
			)
    )
  );
}
```

Now this function does a few really neat things.

1. It enforces that only a token owner can call `makeMove` on a token they own.
2. It enforces a basic set of rules where token owners can only move on a 512 x 512 pixel grid.
3. If both of those pass, it will update the metadata table on Tableland. It does so by running the `runSQL` command again, but this time doing a simple `UPDATE` command, changing the `x` and `y` fields in the row that matches the tokenId.

TADA! You now have mutable data with immutable rules! A simple game with dynamic data built directly into an NFT.

## Live on Etherscan

You can play with the functions described above, `safeMint()` and `makeMove()` deployed demo contract. Find it over on the [Polygon Mumbai Polygonscan](https://mumbai.polygonscan.com/address/0xCa9e8fE4a2962203D87d51c0F75CABd1e6688c47#code). If you go to the `Contract` tab and `Write Contract`, you can connect your wallet and both mint an NFT from this contract, and then using that NFT, run `makeMove()`. Here’s how.

### Connect to Web3

import EtherscanConnect from "@site/static/assets/tutorials/dynamic-nft-solidity/etherscan-connect.png"

<img src={EtherscanConnect} />

1. You’ll need a wallet connected to Goerli.
2. You’ll need some Goerli tokens from one of the available faucets.
3. You’ll need to click the `Connect to Web3` button in Etherscan shown above.

### Run safeMint()

import SafeMint from "@site/static/assets/tutorials/dynamic-nft-solidity/safemint.png"

<img src={SafeMint} />

1. Click the **safeMint** dropdown in Etherscan.
2. Paste your public key in the **to (address)** field.
3. Click **Write**.
4. Next, you’ll want to grab the transaction from your wallet. Once confirmed, it will tell you the **Token ID** you just minted.

#### Pending transaction in wallet

import WalletTx from "@site/static/assets/tutorials/dynamic-nft-solidity/wallet-tx.png"

<img src={WalletTx} />

Click the **Transaction hash** or similar in your wallet to see the transaction on Etherscan. The transaction will likely be pending for about a minute (maybe longer depending on Goerli usage).

#### Locate Token ID in completed transaction

import ConfirmTx from "@site/static/assets/tutorials/dynamic-nft-solidity/etherscan-confirm.png"

<img src={ConfirmTx} />

Now, you can grab the Token ID from the **Tokens Transferred** section. In the transaction above, the token minted has and ID of **5.**

### Run makeMove()

Now that you own a token, you will be able to move it on the canvas. Note that we haven’t built the display side of this token yet, so you’ll need to use your imagination.

You can find your current pixel location by querying the Tableland gateway. The URL would be as follows,

```markdown
https://testnets.tableland.network/query?s=SELECT%20%27id%27,id,%27external_link%27,external_link,%27x%27,x,%27y%27,y%20FROM%20canvas_5_4%20WHERE%20id%3D{YOUR ID HERE}
```

So, for my token **5**, my URL will be [https://testnets.tableland.network/query?s=SELECT 'id',id,'external_link',external_link,'x',x,'y',y FROM canvas_5_4 WHERE id%3D5](https://testnets.tableland.network/query?s=SELECT%20%27id%27,id,%27external_link%27,external_link,%27x%27,x,%27y%27,y%20FROM%20canvas_5_4%20WHERE%20id%3D5).

#### Default position

You may have noted above that every new token has a default position of 0,0. You should see that reflected in the response above.

#### Calling makeMove()

import MakeMove from "@site/static/assets/tutorials/dynamic-nft-solidity/make-move.png"

<img src={MakeMove} />

Now, you can head back to the Etherscan contract and go to the **makeMove** drop down. Enter your tokenId and the new position you want for your pixel. Remember in the `makeMove()` function above, we only allow `0 <= x <= 512` and `0<= y <= 512`.

Once you’ve entered your new coordinates, hit **Write** and confirm the transaction in your wallet. Once the transaction is completed, you can query your token with the Tableland gateway (same URL as above) to confirm the move took place!

## Enhancements

Here are a few of the next things we can do and we will in future playbooks.

1. Deploy the contract to any of our supported Testnets and verify the code on Etherscan or Polygonscan to mint tokens and move x,y.
2. Add a `tokenURI` method to start displaying tokens in marketplaces and on platforms.
3. Create a NFT app that reads the metadata table and displays an owner’s pixel position dynamically.
4. Create dynamic contract metadata for display in marketplaces and platforms.
5. Enable proxy contracts by granting table permissions to newly deployed contract versions.
