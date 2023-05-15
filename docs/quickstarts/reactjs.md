---
title: Use Tableland with React
sidebar_label: React
description: Quickly set up a React application with Tableland via an account and database connection.
keywords:
  - quickstart
  - quickstarts
  - react
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

## 1. Installation & setup

Create a React app and install Tableland as a dependency.

<Tabs groupId="sdk">
<TabItem value="js" label="JavaScript" default>

```bash
npx create-react-app my-tableland-app
```

</TabItem>
<TabItem value="ts" label="TypeScript">

```bash
npx create-react-app my-tableland-app --template typescript
```

</TabItem>
</Tabs>

Then, `cd` into the project and install Tableland.

```bash npm2yarn
npm install --save @tableland/sdk
```

Under `src`, find the `App` component, and import `Database` from `@tableland/sdk`. The SDK already provides access to [`ethers`](https://docs.ethers.org/v5/)—for setting up an account connection, you should also import `Signer` and `providers`. Lastly, import `useState` from `react` for a simple way to track the signer in your application's state.

<Tabs groupId="sdk">
<TabItem value="js" label="JavaScript" default>

```js title="src/App.js"
// highlight-start
import { Database } from "@tableland/sdk";
import { Signer, providers } from "ethers";
import { useState } from "react";
// highlight-end

function App() {
  return <div></div>;
}

export default App;
```

</TabItem>
<TabItem value="ts" label="TypeScript">

```ts title="src/App.tsx"
// highlight-start
import { Database } from "@tableland/sdk";
import { Signer, providers } from "ethers";
import { useState } from "react";
// highlight-end

// highlight-start
// Provide a global `window` variable to prevent type errors
declare const window: any;
// highlight-end

function App() {
  return <div></div>;
}

export default App;
```

</TabItem>
</Tabs>

## 2. Connect to a `signer`

All database creates and writes need a `Signer`. Create a `connectSigner` method that prompts the browser for a wallet connection, but note there are others ways to create and track an account connection using purpose built web3 libraries (like [wagmi](https://wagmi.sh/)). Here, we'll set this up without additional dependencies.

<Tabs groupId="sdk">
<TabItem value="js" label="JavaScript" default>

```js title="src/App.js"
import { Database } from "@tableland/sdk";
import { Signer, providers } from "ethers";
import { useState } from "react";

// highlight-start
async function connectSigner() {
  // Establish a connection with the browser wallet's provider.
  const provider = new providers.Web3Provider(window.ethereum);
  // Request the connected accounts, prompting a browser wallet popup to connect.
  await provider.send("eth_requestAccounts", []);
  // Create a signer from the returned provider connection.
  const signer = provider.getSigner();
  // Return the signer
  return signer;
}
// highlight-end

function App() {
  // highlight-next-line
  const [signer, setSigner] = useState();
  return <div></div>;
}

export default App;
```

</TabItem>
<TabItem value="ts" label="TypeScript">

```ts title="src/App.tsx"
import { Database } from "@tableland/sdk";
import { Signer, providers } from "ethers";
import { useState } from "react";

declare const window: any;

// highlight-start
async function connectSigner(): Promise<Signer> {
  // Establish a connection with the browser wallet's provider.
  const provider = new providers.Web3Provider(window.ethereum);
  // Request the connected accounts, prompting a browser wallet popup to connect.
  await provider.send("eth_requestAccounts", []);
  // Create a signer from the returned provider connection.
  const signer = provider.getSigner();
  // Return the signer
  return signer;
}
// highlight-end

function App() {
  // highlight-next-line
  const [signer, setSigner] = useState<Signer>();
  return <div></div>;
}

export default App;
```

</TabItem>
</Tabs>

You'll want create some way of calling this connect method, such as a "connect" wallet button with some click handler.

<Tabs groupId="sdk">
<TabItem value="js" label="JavaScript" default>

```js title="src/App.js"
function App() {
  const [signer, setSigner] = useState();

  // highlight-start
  async function handleConnect() {
    // Connect a signer
    const signer = await connectSigner();
    setSigner(signer);
  }
  // highlight-end

  return (
    <div>
      // highlight-next-line
      <button onClick={async () => handleConnect()}>Connect</button>
    </div>
  );
}
```

</TabItem>
<TabItem value="ts" label="TypeScript">

```ts title="src/App.tsx"
function App() {
  const [signer, setSigner] = useState<Signer>();

  // highlight-start
  async function handleConnect() {
    // Connect a signer
    const signer = await connectSigner();
    setSigner(signer);
  }
  // highlight-end

  return (
    <div>
      // highlight-next-line
      <button onClick={async () => handleConnect()}>Connect</button>
    </div>
  );
}
```

</TabItem>
</Tabs>

## 3. Connect to a `Database`

Setting up a connection is rather straightforward once you have a signer. Simply create a database instance and pass the `signer` as a parameter upon instantiation. Depending on your setup, you might want specific methods that take a `signer` as a parameter and pass it to a `Database` instantiation.

<Tabs groupId="sdk">
<TabItem value="js" label="JavaScript" default>

```js title="src/App.js"
// highlight-start
async function connectDatabase(signer) {
  // Establish a connection with the database
  const db = new Database({ signer });
  // Do create, write, and read operations
}
// highlight-end

function App() {
  const [signer, setSigner] = useState();

  async function handleConnect() {
    // Connect a signer
    const signer = await connectSigner();
    setSigner(signer);
    // Connect and interact with the database
    // highlight-next-line
    await connectDatabase(signer);
  }

  return (
    <div>
      <button onClick={async () => handleConnect()}>Connect</button>
    </div>
  );
}

export default App;
```

</TabItem>
<TabItem value="ts" label="TypeScript">

```ts title="src/App.tsx"
// highlight-start
async function connectDatabase(signer: Signer) {
  // Establish a connection with the database
  const db = new Database({ signer });
  // Do create, write, and read operations
}
// highlight-end

function App() {
  const [signer, setSigner] = useState<Signer>();

  async function handleConnect() {
    // Connect a signer
    const signer = await connectSigner();
    setSigner(signer);
    // Connect and interact with the database
    // highlight-next-line
    await connectDatabase(signer);
  }

  return (
    <div>
      <button onClick={async () => handleConnect()}>Connect</button>
    </div>
  );
}

export default App;
```

</TabItem>
</Tabs>

The example here establishes a connection but doesn't do anything else—you could imagine methods that handle table creations and writing data which could take a `signer`, create a database connection, and do some fine tuned operations.

Also, you _could_ track a database singleton using the `useState` hook, similar to how the `signer` is demonstrated.

<Tabs groupId="sdk">
<TabItem value="js" label="JavaScript" default>

```js title="src/App.js"
async function connectDatabase(signer) {
  // Establish a connection with the database
  const db = new Database({ signer });
  // Return the database instance
  // highlight-next-line
  return db;
}

function App() {
  const [signer, setSigner] = useState();
  // highlight-next-line
  const [database, setDatabase] = useState();

  async function handleConnect() {
    // Connect a signer
    const signer = await connectSigner();
    setSigner(signer);
    // Connect and interact with the database
    // highlight-start
    const database = await connectDatabase(signer);
    setDatabase(database);
    // highlight-end
  }

  return (
    <div>
      <button onClick={async () => handleConnect()}>Connect</button>
    </div>
  );
}

export default App;
```

</TabItem>
<TabItem value="ts" label="TypeScript">

```ts title="src/App.tsx"
async function connectDatabase(signer: Signer): Promise<Database> {
  // Establish a connection with the database
  const db = new Database({ signer });
  // Return the database instance
  // highlight-next-line
  return db;
}

function App() {
  const [signer, setSigner] = useState<Signer>();
  // highlight-next-line
  const [database, setDatabase] = useState<Database>();

  async function handleConnect() {
    // Connect a signer
    const signer = await connectSigner();
    setSigner(signer);
    // Connect and interact with the database
    // highlight-start
    const database = await connectDatabase(signer);
    setDatabase(database);
    // highlight-end
  }

  return (
    <div>
      <button onClick={async () => handleConnect()}>Connect</button>
    </div>
  );
}

export default App;
```

</TabItem>
</Tabs>

## (Optional) local private key

Alternative to a `connectSigner` method that prompts for a browser wallet connection, you can also choose to use a private key stored locally. This might be useful if some database interaction comes from your developer wallet and not the user.

Start by creating a `.env` file in your project's root and save your private key here. For React to read an environment variable, you'll need to prefix it with `REACT_APP`.

```title='.env'
REACT_APP_PRIVATE_KEY=your_private_key
```

In your component, you can then import the key with `process.env.REACT_APP_PRIVATE_KEY`. React should have `dotenv` installed (for accessing the variable with `process.env`), but if you run into any issues, try installing the package. Thus, if your `App` component needs to use a local private key, the `connectSigner` method might look a little different.

<Tabs groupId="sdk">
<TabItem value="js" label="JavaScript" default>

```js title="src/App.js"
// Keep previous imports, but adjust `ethers`
// highlight-next-line
import { Wallet, getDefaultProvider } from "ethers";

async function connectSigner() {
  // highlight-start
  // Import the private key, available in `.env. using `REACT_APP` prefix.
  const privateKey = process.env.REACT_APP_PRIVATE_KEY;
  // Define the signer and connect to the provider.
  const wallet = new Wallet(privateKey);
  // Replace with any provider URL (e.g., Alchemy, Infura, etc.).
  const provider = getDefaultProvider("http://127.0.0.1:8545");
  const signer = wallet.connect(provider);
  // highlight-end
  // Return the signer
  return signer;
}
```

</TabItem>
<TabItem value="ts" label="TypeScript">

```ts title="src/App.tsx"
// Keep previous imports, but adjust `ethers`
// highlight-next-line
import { Wallet, getDefaultProvider } from "ethers";

async function connectSigner() {
  // highlight-start
  // Import the private key, available in `.env. using `REACT_APP` prefix.
  const privateKey = process.env.REACT_APP_PRIVATE_KEY;
  // Define the signer and connect to the provider.
  const wallet = new Wallet(privateKey!);
  // Replace with any provider URL (e.g., Alchemy, Infura, etc.).
  const provider = getDefaultProvider("http://127.0.0.1:8545");
  const signer = wallet.connect(provider);
  // highlight-end
  // Return the signer
  return signer;
}
```

</TabItem>
</Tabs>
