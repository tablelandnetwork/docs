---
title: Create an immutable table
description: Permanently freeze a table's data by sending it to the dead address.
keywords:
  - read table
  - SQL query
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Tables are ownable assets (NFTs). If the data in a table should no longer be changed, the table's owner still has the ultimate admin control and _could_ choose to adjust any access rules and mutate the data. To guarantee table data is permanently frozen, you can "burn" a table by sending it to the _dead address_, thus, transferring ownership and preventing the table's data to ever change.

## Overview

Upon transferring a [`TABLE`](/fundamentals/architecture/table-token.md) to another address, the new owner has full ownership and permissions to mutate or otherwise control the table, including the ability to set up new access control rules. As a table owner, you may feel table data no longer needs to be mutated. But, if you continue to own the table or send it to another user, it's still possible for changes to be made to it.

If you want to "lock" access to the table so that _no one_ can ever own that table again, you can "burn" the token. To burn a token is to permanently and irreversibly remove that token from circulation, and this can be done by transferring the token to `0x00...dead` (the dead address).

This is great for things like immutable NFT metadata, for table versioning (i.e., freeze at point in time), or other scenarios where you need a permanent and guaranteed immutable reference to rows and columns of data.

:::warning
The following walkthrough will send your table to the `0x00...dead` address, so DO NOT transfer any `tableId` you wish to keep. Tableland has no way of retrieving a burned table; it will be immutable and forever owned by the dead address.
:::

## Using smart contracts calls

To burn a table, you have to call the `TablelandTables` registry contract's `safeTransferFrom` or `transferFrom` methods. Both of them take the same parameters:

- `tokenId`: ID for a table that you want to make immutable.
- `from`: your address (the table's owner)
- `to`: `0x000000000000000000000000000000000000dEaD`

First, you'll have to install `@tableland/evm`.

```bash npm2yarn
npm install --save @tableland/evm
```

You can then import and set up the interface into your contract. One option is to set up an interface with the registry by importing and instantiating `ITablelandTables`, along with the [deployed contract's address](smart-contracts/deployed-contracts). Namely, you'd create a state variable like `ITablelandTables private _tableland` and set it equal to `ITablelandTables(address)`.

An easier approach is to use the `TablelandDeployments` library, which does this for you under the hood. All you must do is import it and call `TablelandDeployments.get()` to get the interface. Once the it's set up, you can then call any of the contract methods, including the transfer methods.

```solidity
import "@tableland/evm/contracts/utils/TablelandDeployments.sol";
```

Once that's ready, all you have to do is call one of the methods and transfer the table. We'll use `safeTransferFrom(address from, address to, uint256 tokenId)` with an example `tokenId` of `1`.

```solidity
TablelandDeployments.get().safeTransferFrom(0xabcdef0123456789abcdef0123456789abcd1234, 0x000000000000000000000000000000000000dEaD, 1);
```

Note the address `0xabcdef0123456789abcdef0123456789abcd1234` should be updated to your address

import writeAsProxy from "@site/static/assets/smart-contracts/immutable-table/write-as-proxy.png";
import connectToWeb3 from "@site/static/assets/smart-contracts/immutable-table/connect_to_web3.png";
import connectImg from "@site/static/assets/smart-contracts/immutable-table/connect.png";
import sepoliaWarning from "@site/static/assets/smart-contracts/immutable-table/sepolia_warning.png";
import connectedImg from "@site/static/assets/smart-contracts/immutable-table/connected.png";
import confirmTx from "@site/static/assets/smart-contracts/immutable-table/confirm_tx.png";
import viewTx from "@site/static/assets/smart-contracts/immutable-table/view_the_tx.png";

## Using Etherscan

Let’s assume you’ve created a table on Ethereum Sepolia. You can use [Etherscan](https://sepolia.etherscan.io/) to interact with the Tableland registry contract and burn your table by transferring it.

1. Navigate to the registry contract on [Etherscan Sepolia](https://sepolia.etherscan.io/address/0xc50C62498448ACc8dBdE43DA77f8D5D2E2c7597D#writeProxyContract) and click the _Write as Proxy_ tab.

  <img src={writeAsProxy} width='60%'/>

2. Click on _Connect to Web3_ to initiate the wallet connection flow.

   <img src={connectToWeb3} width='60%'/>

3. Select the desired account and click _Next_.
4. Click _Connect_ to connect your wallet to Etherscan.

   <img src={connectImg} width='40%'/>

5. Refresh the page, click _Connect_ again, select MetaMask, and then proceed after seeing the following message.

    <img src={sepoliaWarning} width='60%'/>

   - Note: Etherscan doesn’t have the _best_ user experience when it comes to the connection workflow, which is why you may have to refresh after connecting.

6. Verify you’re connected to the Sepolia network.

   <img src={connectedImg} width='60%'/>

7. Each of the accordions are methods of the Tableland registry smart contract. Scroll down to either [`safeTransferFrom`](https://sepolia.etherscan.io/address/0xc50C62498448ACc8dBdE43DA77f8D5D2E2c7597D#writeProxyContract#F8) or [`transferFrom`](https://sepolia.etherscan.io/address/0xc50C62498448ACc8dBdE43DA77f8D5D2E2c7597D#writeProxyContract#F13).
   1. The `tokenId` of a table that you want to make immutable.
   2. Your address (the table's owner) in `from`
   3. The address it should be sent `to`, which is [`0x000000000000000000000000000000000000dEaD`](https://etherscan.io/address/0x000000000000000000000000000000000000dEaD)).
8. Proceed with the wallet flow by clicking _Confirm_—this will sign the transaction and send it to the blockchain. In other words, by clicking _Confirm_, you’ve authorized the table can be burned and will send it to the `0x00...dead` address where _no one will ever be able to transfer or alter it_ thereafter. Only proceed if you wish to lose ownership forever!

   <img src={confirmTx} width='40%'/>

9. Once the transaction is successful, the table is officially immutable! Click on _View your transaction_ to see the results.

   <img src={viewTx} width='40%'/>

You can check out this example transaction, which burned the table `mytable_5_37`: [here](https://goerli.etherscan.io/tx/0x45d6b0c9d933a920d6d50d53a8bdf2f44429ad0c6f0f9df3d46b1c742efee61e)
