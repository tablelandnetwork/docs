---
title: Use Tableland with wagmi
sidebar_label: wagmi
description: Quickly add and use wagmi with Tableland and React.
keywords:
  - wagmi
  - viem
  - react
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

One great library to use in React apps is [wagmi](https://wagmi.sh/). It offers a very straightforward way to connect a user's wallet and access account information using React hooks. Start by installing wagmi in your React app, and then create and connect to a client. The one callout is that wagmi uses [viem](https://viem.sh/), and the Tableland SDK uses [ethers v5](https://docs.ethers.org/v5/)—so wagmi needs to implement an ethers adapter to use the SDK. We'll also use RainbowKit in this setup to make wallet connection modals easier as well as [Vite](https://vitejs.dev/guide/) to spin up a starter project.

## 1. Installation

First, install wagmi, RainbowKit, Tableland, and ethers. If you need help setting up a React project, check out the [React framework quickstart](reactjs).

```bash npm2yarn
npm install --save wagmi @rainbow-me/rainbowkit @tableland/sdk ethers@^5.7.2
```

Note that RainbowKit uses WalletConnect under the hood, which requires you to sign up for an account—[see their docs](https://www.rainbowkit.com/guides/walletconnect-v2) for more details. These examples will use [Alchemy](https://www.alchemy.com/) as the RPC provider, but you can choose whatever provider you'd like.

Now, let's set up our React app with a Vite scaffold:

```bash
npm create vite@latest starter-app -- --template react
```

## 2. Connection setup

### Wagmi

We'll use a few different files to properly set everything up. Let's start with the first—create a file called `wagmi.js` to handle chain configurations. You should first create a `.env` that handles things like API keys. Our example with use Alchemy for the provider URL and also use WalletConnect's API for the connector. The file should contain:

```txt title=".env"
VITE_ALCHEMY_API_KEY=your_key
VITE_WALLET_CONNECT_PROJECT_ID=your_key
```

Note that we'll use `import.meta.env` to access these variables (below) in the `wagmi.js` file. Depending on your frontend setup, it may differ.

```js title="src/wagmi.js"
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig } from "wagmi";
import * as chain from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";

// All of the chains configured below are supported by Tableland
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    chain.mainnet,
    chain.polygon,
    chain.optimism,
    chain.arbitrum,
    chain.sepolia,
    chain.polygonMumbai,
    chain.optimismGoerli,
    chain.arbitrumSepolia,
    chain.filecoinCalibration,
    chain.hardhat,
  ],
  [
    alchemyProvider({ apiKey: VITE_ALCHEMY_API_KEY ?? "" }), // Set up an Alchemy account: https://www.alchemy.com/
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Tableland Starter",
  chains,
  projectId: process.env.WALLET_CONNECT_PROJECT_ID ?? "", // Set up a WalletConnect account: https://walletconnect.com/
});

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export { chains };
```

### Providers

Next, we'll set up providers that wrap our React component with the wagmi config. Create a file called `providers.jsx` and add the following:

```js title="src/providers.jsx"
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import * as React from "react";
import { WagmiConfig } from "wagmi";
import { chains, config } from "./wagmi";

export function Providers({ children }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains} theme={darkTheme()}>
        {mounted && children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
```

### App component

In your `main.jsx` component, replace it with the following:

```js title="src/main.jsx"
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Providers } from "./providers.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>
);
```

## 2. Ethers adapter hook

Since wagmi is not natively compatible with ethers, we'll need to create a hook that adapts the wagmi account (viem) to an ethers account. Create a directory called `hooks` and a file called `useSigner.js`. Then, add the following:

```js title="src/hooks/useEthersAccount.js"
// Convert wagmi/viem `WalletClient` to ethers `Signer`
import { useMemo } from "react";
import { useWalletClient } from "wagmi";
import { providers } from "ethers";

function walletClientToSigner(walletClient) {
  const { account, chain, transport } = walletClient;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  const provider = new providers.Web3Provider(transport, network);
  const signer = provider.getSigner(account.address);
  return signer;
}

export function useSigner({ chainId } = {}) {
  const { data: walletClient } = useWalletClient({ chainId });
  return useMemo(
    () => (walletClient ? walletClientToSigner(walletClient) : undefined),
    [walletClient]
  );
}
```

## 3. Tableland setup

Now that we have everything ready, we can use the `useSigner` hook we just created in our Tableland setup. Create a file called `Tableland.jsx` and add the following. We'll keep this example simple and just show how to create a table, which uses the `useSigner` hook that's stored as the `signer` variable in the app's state.

```js title="src/Tableland.jsx"
import { useState } from "react";
import { useSigner } from "../hooks/useSigner";
import { Database } from "@tableland/sdk";

// A component with form inputs to to create a table, write data to it, and read data from it
export function Tableland() {
  // Get the connected signer
  const signer = useSigner();

  // Create a table with hardcoded prefix and schema
  async function create() {
    try {
      const db = new Database({ signer });
      // Example table schema with an `id` and `val` column
      const schema = `id integer primary key, val text`;
      const { meta: create } = await db
        .prepare(`CREATE TABLE "${prefix}" (${schema});`)
        .run();
      await create.txn?.wait();
      const { name: tableName } = create.txn;
      setTableName(tableName);
      console.log(`Created table: ${tableName}`);
    } catch (err) {
      console.log(err.message);
    }
  }

  // Your application logic
  return <>// Logic here</>;
}
```

Your logic can handle the rest of the application's functionality, but in the `App.jsx` code, we'll show how to use the `Tableland` component and what makes the signer available via a wallet connection.

## 4. App component

In your `App.jsx`, add the following:

```js title="src/App.jsx"
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Tableland } from "./components/Tableland";

function App() {
  return (
    <>
      <nav className="sticky top-0 flex items-center justify-between flex-wrap bg-lightgreen opacity-100 shadow p-2 mb-8">
        <h1 className="text-2xl font-bold">Your App</h1>
        <div>
          <ConnectButton />
        </div>
      </nav>
      <main className="flex justify-center flex-wrap">
        <Tableland />
      </main>
    </>
  );
}

export default App;
```

This boilerplate will display a connect wallet button in the navbar. Once a user makes the connection, the signer will now be available in the Tableland logic from step 3!

:::tip
For more examples, you can [check out the templates](/quickstarts/templates) we've created, which also include a TypeScript example of what we walked through as well as Next.js examples.
:::
