---
title: Use Tableland with Next.js
sidebar_label: Next.js
description: Quickly set up a Next.js application with Tableland via an account and database connection.
keywords:
  - quickstart
  - quickstarts
  - nextjs
  - next.js
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

## 1. Installation & setup

Create a Next.js app and install Tableland as a dependency.

<Tabs groupId="sdk">
<TabItem value="js" label="JavaScript" default>

```bash
npx create-next-app --js my-tableland-app
```

</TabItem>
<TabItem value="ts" label="TypeScript">

```bash
npx create-next-app --ts my-tableland-app
```

</TabItem>
</Tabs>

Then, `cd` into the project and install Tableland.

```bash npm2yarn
npm install --save @tableland/sdk
```

Under `src/app`, go to the `app.js` component, and import `Database` from `@tableland/sdk`. The SDK already provides access to [`ethers v5`](https://docs.ethers.org/v5/)—for setting up an account connection, you should also import `Signer` and `providers`. Lastly, we'll import `useState` from `react` for a simple way to track the signer in your application's state.

<Tabs groupId="sdk">
<TabItem value="js" label="JavaScript" default>

```jsx title="src/app/page.js"
// highlight-start
"use client";

import { Database } from "@tableland/sdk";
import { providers } from "ethers";
import { useState } from "react";
// highlight-end

export function Home() {
  return <></>;
}
```

</TabItem>
<TabItem value="ts" label="TypeScript">

```tsx title="src/app/page.tsx"
// highlight-start
"use client";

import { Database } from "@tableland/sdk";
import { Signer, providers } from "ethers";
import { useState } from "react";

declare const window: any;
// highlight-end

export default function Home() {
  return <></>;
}
```

</TabItem>
</Tabs>

## 2. Connect to a `signer`

All database creates and writes need a `Signer`. Create a `connectSigner` method that prompts the browser for a wallet connection, but note there are others ways to create and track an account connection using purpose built web3 libraries (like [wagmi](https://wagmi.sh/)). Here, we'll set this up without additional dependencies.

<Tabs groupId="sdk">
<TabItem value="js" label="JavaScript" default>

```jsx title="src/app/page.js"
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

export default function Home() {
  // highlight-next-line
  const [signer, setSigner] = useState();
  return <div></div>;
}
```

</TabItem>
<TabItem value="ts" label="TypeScript">

```tsx title="src/app/page.tsx"
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

export default function Home() {
  // highlight-next-line
  const [signer, setSigner] = useState<Signer>();
  return <div></div>;
}
```

</TabItem>
</Tabs>

You'll want create some way of calling this connect method, such as a "connect" wallet button with some click handler.

<Tabs groupId="sdk">
<TabItem value="js" label="JavaScript" default>

```jsx title="src/app/page.js"
export function Home() {
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
      // highlight-start
      <button onClick={handleConnect}>
        {signer ? "Connected!" : "Connect"}
      </button>
      // highlight-end
    </div>
  );
}
```

</TabItem>
<TabItem value="ts" label="TypeScript">

```tsx title="src/app/page.tsx"
export default function Home() {
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
      // highlight-start
      <button onClick={handleConnect}>
        {signer ? "Connected!" : "Connect"}
      </button>
      // highlight-end
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

```jsx title="src/app/page.js"
async function handleConnect() {
  // Connect a signer
  const signer = await connectSigner();
  setSigner(signer);
}
// highlight-start
async function connectDatabase(signer) {
  // Establish a connection with the database
  const db = new Database({ signer });
  // Do create, write, and read operations
}
// highlight-end

export default function Home() {
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
      <button onClick={handleConnect}>
        {signer ? "Connected!" : "Connect"}
      </button>
    </div>
  );
}
```

</TabItem>
<TabItem value="ts" label="TypeScript">

```tsx title="src/app/page.tsx"
async function handleConnect() {
  // Connect a signer
  const signer = await connectSigner();
  setSigner(signer);
}

// highlight-start
async function connectDatabase(signer: Signer) {
  // Establish a connection with the database
  const db = new Database({ signer });
  // Do create, write, and read operations
}
// highlight-end

export default function Home() {
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
      <button onClick={handleConnect}>
        {signer ? "Connected!" : "Connect"}
      </button>
    </div>
  );
}
```

</TabItem>
</Tabs>

The example here establishes a connection but doesn't do anything else—you could imagine methods that handle table creations and writing data which could take a `signer`, create a database connection, and do some fine tuned operations.

Also, you _could_ track a database singleton using the `useState` hook, similar to how the `signer` is demonstrated.

<Tabs groupId="sdk">
<TabItem value="js" label="JavaScript" default>

```jsx title="src/app/page.js"
async function connectDatabase(signer) {
  // Establish a connection with the database
  const db = new Database({ signer });
  // Return the database instance
  // highlight-next-line
  return db;
}

export default function Home() {
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
      <button onClick={handleConnect}>
        {signer ? "Connected!" : "Connect"}
      </button>
    </div>
  );
}
```

</TabItem>
<TabItem value="ts" label="TypeScript">

```tsx title="src/app/page.tsx"
async function connectDatabase(signer: Signer): Promise<Database> {
  // Establish a connection with the database
  const db = new Database({ signer });
  // Return the database instance
  // highlight-next-line
  return db;
}

export default function Home() {
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
      <button onClick={handleConnect}>
        {signer ? "Connected!" : "Connect"}
      </button>
    </div>
  );
}
```

</TabItem>
</Tabs>

## Putting it all together

Here is the final code from above, all in one place.

<Tabs groupId="sdk">
<TabItem value="js" label="JavaScript" default>

```jsx title="src/app/page.js"
"use client";

import { Database } from "@tableland/sdk";
import { providers } from "ethers";
import { useState } from "react";

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

async function connectDatabase(signer) {
  // Establish a connection with the database
  const db = new Database({ signer });
  // Return the database instance
  return db;
}

export default function Home() {
  const [signer, setSigner] = useState();
  const [database, setDatabase] = useState();

  async function handleConnect() {
    // Connect a signer
    const signer = await connectSigner();
    setSigner(signer);
    // Connect and interact with the database
    const database = await connectDatabase(signer);
    setDatabase(database);
  }

  return (
    <div>
      <button onClick={handleConnect}>
        {signer ? "Connected!" : "Connect"}
      </button>
    </div>
  );
}
```

</TabItem>
<TabItem value="ts" label="TypeScript">

```tsx title="src/app/page.tsx"
"use client";

import { Database } from "@tableland/sdk";
import { Signer, providers } from "ethers";
import { useState } from "react";

declare const window: any;

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

async function connectDatabase(signer: Signer): Promise<Database> {
  // Establish a connection with the database
  const db = new Database({ signer });
  // Return the database instance
  return db;
}

export default function Home() {
  const [signer, setSigner] = useState<Signer>();
  const [database, setDatabase] = useState<Database>();

  async function handleConnect() {
    // Connect a signer
    const signer = await connectSigner();
    setSigner(signer);
    // Connect and interact with the database
    const database = await connectDatabase(signer);
    setDatabase(database);
  }

  return (
    <div>
      <button onClick={handleConnect}>
        {signer ? "Connected!" : "Connect"}
      </button>
    </div>
  );
}
```

</TabItem>
</Tabs>

## Dealing with local-only private keys

For private variable like wallet private keys, these should be placed in a `.env.local` file, which is only available server-side. Our component above only connects to things client-side, so you'd need to make some adjustments.

```title='.env'
PRIVATE_KEY=your_wallet_private_key
```

Public variable should exist in a `.env` file in your project's root and save your private key here. For Next to read an environment variable on the client-side, you'll need to prefix it with `NEXT_PUBLIC`.

```title='.env'
NEXT_PUBLIC_VAR=your_public_variable
```

Then, you can access these with the pattern: `process.env.NEXT_PUBLIC_VAR`.
