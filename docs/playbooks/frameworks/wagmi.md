---
title: Use Tableland with wagmi and RainbowKit
sidebar_label: wagmi & RainbowKit
description: Quickly add and use wagmi with Tableland and React.
keywords:
  - wagmi
  - viem
  - react
  - rainbowkit
  - ethers wagmi
  - wagmi adapter
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

One great library to use in React apps is [wagmi](https://wagmi.sh/) alongside [RainbowKit](https://www.rainbowkit.com/). It offers a very straightforward way to connect a user's wallet and access account information using React hooks. Start by installing wagmi in your React app, and then create and connect to a client. The one callout is that wagmi uses [viem](https://viem.sh/), and the Tableland SDK uses [ethers v6](https://docs.ethers.org/v6/)—so wagmi needs to implement an ethers adapter to use the SDK. We'll also use RainbowKit in this setup to make wallet connection modals easier as well as [Vite](https://vitejs.dev/guide/) to spin up a starter project.

:::tip
For more starter kits, you can [check out the templates](/quickstarts/templates) we've created, which include both JavaScript and TypeScript implementation of the React examples we walk through below—plus, Next.js templates!
:::

## 1. Installation

First, install wagmi, RainbowKit, Tableland, and ethers. If you need help setting up a React project, check out the [React framework quickstart](reactjs). All of these examples will show how to use either wagmi v1 or v2, so you can choose which version you'd like to use.

<Tabs groupId="sdk">
<TabItem value="jsv2" label="wagmi v2" default>

```bash npm2yarn
npm install wagmi@latest @rainbow-me/rainbowkit@latest @tableland/sdk ethers @tanstack/react-query
```

</TabItem>
<TabItem value="jsv1" label="wagmi v1">

```bash npm2yarn
npm install wagmi@^1 @rainbow-me/rainbowkit@^1 @tableland/sdk ethers
```

</TabItem>
</Tabs>

Note that RainbowKit uses WalletConnect under the hood, which requires you to sign up for an account—[see their docs](https://www.rainbowkit.com/guides/walletconnect-v2) for more details.

Now, let's set up our React app with a Vite scaffold:

```bash
npm create vite@latest starter-app -- --template react
```

## 2. Connection setup

### Wagmi

We'll use a few different files to properly set everything up. Let's start with the first—create a file called `wagmi.js` to handle chain configurations. You should first create a `.env` that handles things like API keys. Our example uses a public provider URL and will also use WalletConnect's API for the connector. The file should contain:

```txt title=".env"
VITE_WALLET_CONNECT_PROJECT_ID=your_key
ENABLE_TESTNETS=true
```

Note that we'll use `import.meta.env` to access these variables (below) in the `wagmi.js` file. Depending on your frontend setup, it may differ. With Vite, you use `import.meta.env` and prefix the variable with `VITE_`. But, if you're using Next.js, you'd use `process.env` and prefix with `NEXT_PUBLIC_`.

<Tabs groupId="sdk">
<TabItem value="jsv2" label="wagmi v2" default>

```jsx title="src/wagmi.js"
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import * as chain from "wagmi/chains";
import { http } from "viem";

const chains = [
  chain.mainnet,
  chain.polygon,
  chain.optimism,
  chain.arbitrum,
  chain.arbitrumNova,
  chain.filecoin,
  ...(import.meta.ENABLE_TESTNETS === "true"
    ? [
        chain.arbitrumSepolia,
        chain.sepolia,
        chain.polygonAmoy,
        chain.optimismSepolia,
        chain.filecoinCalibration,
        chain.hardhat,
      ]
    : []),
];

const transports = Object.fromEntries(chains.map((c) => [c.id, http()]));

export const config = getDefaultConfig({
  appName: "Tableland Starter",
  chains,
  transports,
  projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID ?? "",
});
```

</TabItem>
<TabItem value="jsv1" label="wagmi v1">

```js title="src/wagmi.js"
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig } from "wagmi";
import * as chain from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { defineChain } from "viem";

// Polygon Amoy is only defined in viem v2
const polygonAmoy = defineChain({
  id: 80_002,
  name: "Polygon Amoy",
  network: "polygon-amoy",
  nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc-amoy.polygon.technology"],
    },
    public: {
      http: ["https://rpc-amoy.polygon.technology"],
    },
  },
  blockExplorers: {
    default: {
      name: "Polygonscan",
      url: "https://amoy.polygonscan.com",
    },
  },
  testnet: true,
});

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    chain.mainnet,
    chain.polygon,
    chain.optimism,
    chain.arbitrum,
    chain.arbitrumNova,
    chain.filecoin,
    ...(import.meta.ENABLE_TESTNETS === "true"
      ? [
          chain.arbitrumSepolia,
          chain.sepolia,
          polygonAmoy, // Custom chain
          chain.optimismSepolia,
          chain.filecoinCalibration,
          chain.hardhat,
        ]
      : []),
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Tableland Starter",
  chains,
  projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID ?? "",
});

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export { chains };
```

</TabItem>
</Tabs>

### Providers

Next, we'll set up providers that wrap our React component with the wagmi config. Create a file called `providers.jsx` and add the following:

<Tabs groupId="sdk">
<TabItem value="jsv2" label="wagmi v2" default>

```jsx title="src/providers.jsx"
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
import { WagmiProvider } from "wagmi";
import { config } from "./wagmi";

const queryClient = new QueryClient();

export function Providers({ children }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()}>
          {mounted && children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
```

</TabItem>
<TabItem value="jsv1" label="wagmi v1">

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

</TabItem>
</Tabs>

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

<Tabs groupId="sdk">
<TabItem value="jsv2" label="wagmi v2" default>

```js title="src/hooks/useSigner.js"
import { useMemo } from "react";
import { BrowserProvider } from "ethers";
import { useWalletClient } from "wagmi";

function walletClientToSigner(walletClient) {
  const { account, chain, transport } = walletClient;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  const provider = new BrowserProvider(transport.url, network);
  const signer = await provider.getSigner(account.address);
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

</TabItem>
<TabItem value="jsv1" label="wagmi v1">

```js title="src/hooks/useSigner.js"
// Convert wagmi/viem `WalletClient` to ethers `Signer`
import { useMemo } from "react";
import { BrowserProvider } from "ethers";
import { useWalletClient } from "wagmi";

function walletClientToSigner(walletClient) {
  const { account, chain, transport } = walletClient;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  const provider = new BrowserProvider(transport, network);
  const signer = await provider.getSigner(account.address);
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

</TabItem>
</Tabs>

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

This boilerplate will display a connect wallet button in the navbar. Once a user makes the connection, the signer will now be available in the Tableland logic!
