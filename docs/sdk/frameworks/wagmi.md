---
title: Use Tableland with wagmi
sidebar_label: wagmi
description: Quickly add and use wagmi with Tableland and React.
keywords:
  - quickstart
  - quickstarts
  - react
---

One great library to use in React apps is [wagmi](https://wagmi.sh/). It offers a very straightforward way to connect a user's wallet and access account information using React hooks. Start by installing wagmi in your React app, and then create and connect to a client.

## 1. Installation & setup

First, install wagmi. If you need help setting up a React project, check out the [React framework quickstart](reactjs).

```bash npm2yarn
npm install --save wagmi
```

Import `WagmiConfig` and `createClient` as well as `getDefaultProvider` (from `ethers`). Recall that if you've installed the `@tableland/sdk`, you should already have access to `ethers` (otherwise, make sure you have `ethers` as a dependency!). You'll want to wrap your app in a `WagmiConfig` so that child components can use the various wagmi hooks—this could happen within your `App` component or (as shown below) in your app's root component.

```js title="src/index.js"
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// highlight-start
// Add wagmi imports
import { WagmiConfig, createClient } from "wagmi";
import { getDefaultProvider } from "ethers";
// highlight-end

// highlight-start
// Create a client and pass it to the `WagmiConfig`
const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
});
// highlight-end

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // highlight-start
  // Wrap your app in the `WagmiConfig` with a `client` prop
  <WagmiConfig client={client}>
    // highlight-end
    <React.StrictMode>
      <App />
    </React.StrictMode>
    // highlight-next-line
  </WagmiConfig>
);
```

## 2. Connect to a `signer`

In your `App` component, you can add functionality for connecting to a browser wallet (or do this in some other component). The `useConnect` method will prompt for a wallet connection, and `useDisconnect` can be useful for disconnecting the user. Lastly, something like `useAccount` might help when rendering an account's information, such as the address.

```js title="src/App.js"
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

function App() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  return (
    <div>
      {isConnected ? (
        <div>
          Connected to {address}
          <button onClick={() => disconnect()}>Disconnect</button>
        </div>
      ) : (
        <button onClick={() => connect()}>Connect Wallet</button>
      )}
    </div>
  );
}

export default App;
```

## 3. Connect to a `Database`

Once an signer has been established, you can use wagmi hooks like `useSigner` within various child components and also pass the signer to the Tableland `Database`—such as a component named `DatabaseConnection` that gets rendered in the `App` and does some database operations. This makes it easy to deal with the connected account as there's no need to continually pass down some `signer` prop.

If you haven't already, be sure to install Tableland.

```bash npm2yarn
npm install --save @tableland/sdk
```

Then, you can interact with the database however you'd like using the wagmi `useSigner` hook.

```js title="src/DatabaseConnection.js"
import { useSigner } from "wagmi";
import { Database } from "@tableland/sdk";

export default function DatabaseConnection() {
  // highlight-next-line
  const { data: signer } = useSigner();

  // Here, we simply pass the signer defined from `useSigner`
  // highlight-next-line
  const db = new Database({ signer });
  // Do database things like writes or reads
  return <div>{/* Some data rendered from the database connection */}</div>;
}
```
