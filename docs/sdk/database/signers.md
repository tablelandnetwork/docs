---
title: Signers
sidebar_label: Signer & network settings
description: Access the Tableland network by first connecting to the base chain.
keywords:
  - read table
  - SQL query
---

A `Database` connection requires a `Signer` from the [ethersjs](https://docs.ethers.org/v5/) package. This will provide a means for signing any table creation or mutations transactions sent to the Tableland network, and the connected provider will provide the chain information for the network you are connecting to.

## Connecting via the browser

The default behavior when creating a `Database` instance is to trigger a browser wallet connection. Instead, you can also use third party libraries to handle this. The Tableland SDK comes packed with `ethers` under the hood, so installing it is not required in order to use its functionality.

Similar to the default behavior, you can pass a custom `signer` to the `Database` by retrieving signer information from the browser.

```js
import { Database } from "@tableland/sdk";
import { providers } from "ethers";

// Connect to provider from browser and get accounts
const provider = new providers.Web3Provider(window.ethereum);
await provider.send("eth_requestAccounts", []);

// Pass the signer to the Database
const signer = provider.getSigner();
const db = new Database({ signer });
```

## Private key connections

Within a Node app, you might instantiate a `Database` using [`dotenv`](https://www.npmjs.com/package/dotenv) and a `PRIVATE_KEY` stored and read from `.env` file. The provider URL will point to the chain you are trying to connect to, which could be a testnet, mainnet, or local node (e.g., [`hardhat`](https://hardhat.org/) or [`local-tableland`](https://github.com/tablelandnetwork/local-tableland)).

```js title="index.js"
import { Database } from "@tableland/sdk";
import { Wallet, getDefaultProvider } from "ethers";
import * as dotenv from "dotenv";
dotenv.config();

// You can also pull getDefaultProvider from the SDK's 'helpers' module

const privateKey = process.env.PRIVATE_KEY;

const wallet = new Wallet(privateKey);
// To avoid connecting to the browser wallet (locally, port 8545),
// replace the URL with a provider like Alchemy, Infura, Etherscan, etc.
const provider = getDefaultProvider("http://127.0.0.1:8545"); // For example: "https://polygon-mumbai.g.alchemy.com/v2/${process.env.YOUR_ALCHEMY_KEY}"
const signer = wallet.connect(provider);
// Connect to the database
const db = new Database({ signer });
```

## Nonce manager

It might be useful to use the `NonceManager` (experimental), which will automatically manage the nonce for you so you can blast the network with as many transactions as you would like.

```bash npm2yarn
npm install --save @ethersproject/experimental"
```

Once installed, import it into your project. The main difference is that you wrap the signer in a `NonceManager` instance.

```js
// highlight-next-line
import { NonceManager } from "@ethersproject/experimental";
import { Database } from "@tableland/sdk";
import { Wallet, getDefaultProvider } from "ethers";
import * as dotenv from "dotenv";
dotenv.config();

const privateKey = process.env.PRIVATE_KEY;

const wallet = new Wallet(privateKey);
// Replace with Alchemy, Infura, or Etherscan provider URL for the respective chain
const provider = getDefaultProvider("http://127.0.0.1:8545");
// Also demonstrates the nonce manager usage
// highlight-start
const baseSigner = wallet.connect(provider);
const signer = new NonceManager(baseSigner);
// highlight-end
const db = new Database({ signer });

// No need to await individual transactions (due to nonce manager)!
```

:::tip
Aside from `ethers`, other third party libraries can also be used. For example, if you are writing Tableland interactions inside a React app, you could leverage a `signer` from [wagmi](https://wagmi.sh). Check out the [`wagmi framework quickstart`](/playbooks/frameworks/wagmi) for where to start.
:::
