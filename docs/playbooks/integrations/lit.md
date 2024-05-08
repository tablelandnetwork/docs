---
title: Lit Protocol for encryption
description: Encrypt & decrypt table data with Lit Protocol.
keywords:
  - lit
  - lit protocol
  - encryption
  - encrypt
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Data in Tableland is open by default, so anyone can read table data. If you want _private_ data, you can implement your own encryption scheme, such as the [example in the JETI plugin](/sdk/plugins/encryption). But, a more robust _and_ web3-native way to achieve this is with the Lit Protocol.

## Background

[Lit Protocol](https://www.litprotocol.com/) is a key management network for decentralized signing and encryption. The premise is that instead of a single entity holding the entire private key, each node within the network holds a unique private key share. In order to obtain the final signature or decrypted content, a pre-defined threshold for the number of nodes is required for combining signatures or decryption shares. In other words, if your threshold was 2/3 of 100 nodes, you'd need to gather decryption or signature shares from at least 67 nodes.

Naturally, this is a perfect fit for encrypting and decrypting Tableland data! We'll walk through a simple example of how to use Lit to encrypt data before writing to Tableland, and then decrypting that data upon table reads. Note that Lit has its own built-in access control system that could be used in tandem with Tableland's access control, too.

## Installation

We'll first install the Tableland SDK and Lit SDK (version 3.x). This example uses NodeJS, and you'll also need the `siwe` package to generate a Lit `AuthSig`, described below.

```bash npm2yarn
npm install @tableland/sdk @lit-protocol/lit-node-client siwe
```

:::tip
Check out the Tableland templates for a starting point: [here](/quickstarts/repos)
:::

## Setup

Let's first set up all of the imports that we'll be using:

<Tabs groupId="sdk">
<TabItem value="js" label="JavaScript" default>

```js
import { Wallet, getDefaultProvider, verifyMessage } from "ethers";
import {
  LitNodeClient,
  uint8arrayFromString,
} from "@lit-protocol/lit-node-client";
import { LIT_CHAINS } from "@lit-protocol/constants";
import { SiweMessage } from "siwe";
```

</TabItem>
<TabItem value="ts" label="TypeScript">

```ts
import { Wallet, getDefaultProvider, verifyMessage } from "ethers";
import {
  LitNodeClient,
  uint8arrayFromString,
} from "@lit-protocol/lit-node-client";
import { LIT_CHAINS } from "@lit-protocol/constants";
import type { AccsDefaultParams, AuthSig } from "@lit-protocol/types";
import { SiweMessage } from "siwe";
```

</TabItem>
</Tabs>

Before we get started, we'll need to create a couple of helper methods that make it easier to work with the Lit SDK. The first one will make sure that our `chainId` maps to a Lit chain name, and the second one will create a Lit `AuthSig` for decryption.

<Tabs groupId="sdk">
<TabItem value="js" label="JavaScript" default>

```js
// Map a chainId to a Lit chain name via `LIT_CHAINS`
const chainIdToLitChainName = (chainId) => {
  for (const [name, chain] of Object.entries(LIT_CHAINS)) {
    if (chain.chainId === chainId) {
      return name;
    }
  }
  return undefined;
};
```

</TabItem>
<TabItem value="ts" label="TypeScript">

```ts
type LitChain = AccsDefaultParams["chain"];

// Map a chainId to a Lit chain name via `LIT_CHAINS`
const chainIdToLitChainName = (chainId: number): LitChain | undefined => {
  for (const [name, chain] of Object.entries(LIT_CHAINS)) {
    if (chain.chainId === chainId) {
      return name as LitChain;
    }
  }
  return undefined;
};
```

</TabItem>
</Tabs>

:::note
As of early 2024, the following Tableland testnet chains are supported by Lit, shown with their associated Lit chain name: Ethereum Sepolia (`sepolia`) and Polygon Amoy (`polygon-amoy`). Additionally, the following mainnet chains are supported: Filecoin (`filecoin`), Ethereum (`ethereum`), Optimism (`optimism`), Arbitrum One (`arbitrum`), and Polygon (`polygon`).
:::

The `AuthSig` requires a Sign In With Ethereum (SIWE) message to be signed so that it can validate the address trying to decrypt the data is the correct entity. Thus, we create a `SiweMessage` with a domain, origin, statement, and expiration time. We then sign the message with the wallet and create the `AuthSig` object.

<Tabs groupId="sdk">
<TabItem value="js" label="JavaScript" default>

```js
// Create an authentication signature for Lit
const createAuthSig = async (client, wallet) => {
  // Arbitrary domain, origin, and statement for the siwe message
  const domain = "localhost";
  const origin = "http://localhost";
  const statement = "Tableland encryption";
  const expirationTime = new Date(Date.now() + 60 * 60 * 1000).toISOString();
  const nonce = client.getLatestBlockhash();
  const chainId = await wallet.getChainId();
  const address = await wallet.getAddress();
  const siweMessage = new SiweMessage({
    domain,
    address,
    statement,
    uri: origin,
    version: "1",
    chainId,
    nonce,
    expirationTime,
  });

  // Sign the message
  const messageToSign = siweMessage.prepareMessage();
  const signature = await wallet.signMessage(messageToSign);
  const recoveredAddress = verifyMessage(messageToSign, signature);
  if (recoveredAddress !== address) {
    throw new Error("recovered address does not match wallet address");
  }

  // Create the `AuthSig` compliant object for the Lit SDK
  const authSig = {
    sig: signature,
    derivedVia: "web3.eth.personal.sign",
    signedMessage: messageToSign,
    address: recoveredAddress,
  };
  return authSig;
};
```

</TabItem>
<TabItem value="ts" label="TypeScript">

```ts
// Create an authentication signature for Lit
const createAuthSig = async (
  client: LitNodeClient,
  wallet: Wallet
): Promise<AuthSig> => {
  // Arbitrary domain, origin, and statement for the siwe message
  const domain = "localhost";
  const origin = "http://localhost";
  const statement = "Tableland encryption";
  const expirationTime = new Date(Date.now() + 60 * 60 * 1000).toISOString();
  const nonce = client.getLatestBlockhash();
  const chainId = await wallet.getChainId();
  const address = await wallet.getAddress();
  const siweMessage = new SiweMessage({
    domain,
    address,
    statement,
    uri: origin,
    version: "1",
    chainId,
    nonce,
    expirationTime,
  });
  const messageToSign = siweMessage.prepareMessage();
  const signature = await wallet.signMessage(messageToSign);
  const recoveredAddress = verifyMessage(messageToSign, signature);
  if (recoveredAddress !== address) {
    throw new Error("recovered address does not match wallet address");
  }
  const authSig = {
    sig: signature,
    derivedVia: "web3.eth.personal.sign",
    signedMessage: messageToSign,
    address: recoveredAddress,
  };
  return authSig;
};
```

</TabItem>
</Tabs>

Now, we can set up our Tableland database connection, Lit client, and create a table! The example below shows how to do this on Ethereum Sepolia with an Alchemy provider, but you can replace this with your desired chain and provider.

```js
// Set up a signer (note: replace with your own private key & API key)
const privateKey = "your_private_key";
const provider = getDefaultProvider(
  "https://eth-sepolia.g.alchemy.com/v2/<your_alchemy_api_key>"
);
const wallet = new Wallet(privateKey);
const signer = wallet.connect(provider);

// Set up database and Lit client
const db = new Database({ signer });
const client = new LitNodeClient({ debug: false });
await client.connect();

// Create a table, and note that our access control will use the `tableId` as a condition
const tablePrefix = "lit_encrypt";
const createStmt = `CREATE TABLE ${tablePrefix} (id integer primary key, msg text, hash text)`;
const { meta: create } = await db.prepare(createStmt).run();
const tableName = create.txn?.names[0] ?? "";
const tableId = create.txn?.tableIds[0] ?? "";
await create.txn?.wait();
```

## Writing encrypted data

The first thing we need to do is set up our access control conditions. Lit has a variety of ways you can do this, which includes running arbitrary code or just checking the return value of standard/custom contract methods. In this example, we'll check that the signer owns a Tableland table NFT with a table ID that matches the one created above. This uses a built-in Lit method that can calls ERC721 contracts and the `ownerOf` method. If the caller _does not_ own the table, the `AuthSig` that gets uses in decryption will not be able to properly decrypt the data and throws a `Failed to decrypt` error.

<Tabs groupId="sdk">
<TabItem value="js" label="JavaScript" default>

```js
// Write to the table, but first encrypt the value via Lit
const chainId = await signer.getChainId();
const chain = chainIdToLitChainName(chainId);
if (chain === undefined) {
  throw new Error(`unsupported Lit chain: ${chainId}`);
}
// Create an authentication signature for Lit
const authSig = await createAuthSig(client, signer);
// Now, set up access control conditions. Here, we're checking that the signer
// owns the Tableland table NFT with table ID that matches the one created above
const tablelandContract = helpers.getContractAddress(chainId);
const accessControlConditions = [
  {
    contractAddress: tablelandContract,
    chain,
    standardContractType: "ERC721",
    method: "ownerOf",
    parameters: [tableId],
    returnValueTest: {
      comparator: "=",
      value: await signer.getAddress(),
    },
  },
];
```

</TabItem>
<TabItem value="ts" label="TypeScript">

```ts
// Write to the table, but first encrypt the value via Lit
const chainId = await signer.getChainId();
const chain = chainIdToLitChainName(chainId);
if (chain === undefined) {
  throw new Error(`unsupported Lit chain: ${chainId}`);
}
// Create an authentication signature for Lit
const authSig = await createAuthSig(client, signer);
// Now, set up access control conditions. Here, we're checking that the signer
// owns the Tableland table NFT with table ID that matches the one created above
const tablelandContract = helpers.getContractAddress(chainId);
const accessControlConditions: AccsDefaultParams[] = [
  {
    contractAddress: tablelandContract,
    chain,
    standardContractType: "ERC721",
    method: "ownerOf",
    parameters: [tableId],
    returnValueTest: {
      comparator: "=",
      value: await signer.getAddress(),
    },
  },
];
```

</TabItem>
</Tabs>

Our access control condition are now set up, so we can encrypt the data before inserting it into the table. The `ciphertext` and `dataToEncryptHash` are the encrypted data and the hash of the original data, respectively.

```js
// Now, we can encrypt the data before inserting
const dataToEncryptStr = "this is a secret message";
const dataToEncrypt = uint8arrayFromString(dataToEncryptStr); // Using Lit SDK helper
const { ciphertext, dataToEncryptHash } = await client.encrypt({
  authSig,
  accessControlConditions,
  chain,
  dataToEncrypt,
});

// Write to the table
const writeStmt = `INSERT INTO ${tableName} (msg, hash) VALUES (?, ?)`;
const { meta: write } = await db
  .prepare(writeStmt)
  .bind(ciphertext, dataToEncryptHash)
  .run();
await write.txn?.wait();
```

## Decrypting data

Once our write transaction finalizes, we can read the raw data from the table and decrypt it.

<Tabs groupId="sdk">
<TabItem value="js" label="JavaScript" default>

```js
// Read from the table—this will have raw, encrypted data
const readStmt = `SELECT msg, hash FROM ${tableName}`;
const { results } = await db.prepare(readStmt).all();
```

</TabItem>
<TabItem value="ts" label="TypeScript">

```ts
// Read from the table—this will have raw, encrypted data
const readStmt = `SELECT msg, hash FROM ${tableName}`;
const { results } = await db
  .prepare(readStmt)
  .all<{ msg: string; hash: string }>();
```

</TabItem>
</Tabs>

At this point, the data looks something like this.

```json
[
  {
    "id": 1,
    "msg": "rSIFVX0rCtKT6OMkWQD1TqKazrNg4B9nigsHUC/7dYkfjfW8erAZgNOHbO697gRoIVaL5Ry8GtsTsTjMyFLDMnNy6W9rmgCzgn5ALzBIUkog0VaI/NMdkCB44lUBr6EIsMdJ/2JhU8oIyLLXNv5mk+MD",
    "hash": "3f98b95c16476f0b2fc37e8e664a11312966b635f60537f1f5ed75216fa0c060"
  }
]
```

We'll need to use the access control conditions, ciphertext, hash, and authorization signature to decrypt the data (on the specified chain).

<Tabs groupId="sdk">
<TabItem value="js" label="JavaScript" default>

```js
// Decrypt the data read from the table, using the data read from our table,
// the access control conditions, and our authentication signature
for (const row of results) {
  const { msg, hash } = row;
  const { decryptedData } = await client.decrypt({
    accessControlConditions,
    authSig,
    chain,
    ciphertext: msg,
    dataToEncryptHash: hash,
  });
  const decrypted = Buffer.from(decryptedData.buffer).toString();
  console.log(`Decrypted data: '${decrypted}'`);
}
```

</TabItem>
<TabItem value="ts" label="TypeScript">

```ts
// Decrypt the data read from the table, using the data read from our table,
// the access control conditions, and our authentication signature
for (const row of results) {
  const { msg, hash } = row;
  const { decryptedData } = await client.decrypt({
    accessControlConditions,
    authSig,
    chain,
    ciphertext: msg,
    dataToEncryptHash: hash,
  });
  const decrypted = Buffer.from(decryptedData.buffer).toString();
  console.log(`Decrypted data: '${decrypted}'`);
}
```

</TabItem>
</Tabs>

This will output the original data that was encrypted:

```md
Decrypted data: 'this is a secret message'
```

If you were to try and read the encrypted data from another wallet, all you'll be able to see is the encrypted data, and the decryption will fail with a `Failed to decrypt` error. A fun example of how the works in a dynamic fashion: use the Tableland SDK's [`Registry` class to transfer the table](/sdk/registry/#safetransferfrom) to some random wallet, and then try to read the data again. You'll see that the decryption will fail, as the new owner's address will not match the access control conditions that map to your own wallet.

## Putting it all together

Here's the full example with all of the helpers and code, wrapped in a `main` function to show how it all fits together:

<Tabs groupId="sdk">
<TabItem value="js" label="JavaScript" default>

```js
import { Database, helpers } from "@tableland/sdk";
import { Wallet, getDefaultProvider, verifyMessage } from "ethers";
import {
  LitNodeClient,
  uint8arrayFromString,
} from "@lit-protocol/lit-node-client";
import { LIT_CHAINS } from "@lit-protocol/constants";
import { SiweMessage } from "siwe";

// Map chain ID to Lit chain name
const chainIdToLitChainName = (chainId) => {
  for (const [name, chain] of Object.entries(LIT_CHAINS)) {
    if (chain.chainId === chainId) {
      return name;
    }
  }
  return undefined;
};

// Create an authentication signature for Lit
const createAuthSig = async (client, wallet) => {
  // Arbitrary domain, origin, and statement for the siwe message
  const domain = "localhost";
  const origin = "http://localhost";
  const statement = "Tableland encryption";
  const expirationTime = new Date(Date.now() + 60 * 60 * 1000).toISOString();
  const nonce = client.getLatestBlockhash();
  const chainId = await wallet.getChainId();
  const address = await wallet.getAddress();
  const siweMessage = new SiweMessage({
    domain,
    address,
    statement,
    uri: origin,
    version: "1",
    chainId,
    nonce,
    expirationTime,
  });

  // Sign the message
  const messageToSign = siweMessage.prepareMessage();
  const signature = await wallet.signMessage(messageToSign);
  const recoveredAddress = verifyMessage(messageToSign, signature);
  if (recoveredAddress !== address) {
    throw new Error("recovered address does not match wallet address");
  }

  // Create the `AuthSig` compliant object for the Lit SDK
  const authSig = {
    sig: signature,
    derivedVia: "web3.eth.personal.sign",
    signedMessage: messageToSign,
    address: recoveredAddress,
  };
  return authSig;
};

async function main() {
  // Set up a signer (note: replace with your own private key & API key)
  const privateKey = "your_private_key";
  const provider = getDefaultProvider(
    "https://eth-sepolia.g.alchemy.com/v2/<your_alchemy_api_key>"
  );
  const wallet = new Wallet(privateKey);
  const signer = wallet.connect(provider);

  // Set up database and Lit client
  const db = new Database({ signer });
  const client = new LitNodeClient({ debug: false });
  await client.connect();

  // Create a table, and note that our access control will use the `tableId` as a condition
  const tablePrefix = "lit_encrypt";
  const createStmt = `CREATE TABLE ${tablePrefix} (id integer primary key, msg text, hash text)`;
  const { meta: create } = await db.prepare(createStmt).run();
  const tableName = create.txn?.names[0] ?? "";
  const tableId = create.txn?.tableIds[0] ?? "";
  await create.txn?.wait();

  // Write to the table, but first encrypt the value via Lit
  const chainId = await signer.getChainId();
  const chain = chainIdToLitChainName(chainId);
  if (chain === undefined) {
    throw new Error(`unsupported Lit chain: ${chainId}`);
  }
  // Create an authentication signature for Lit
  const authSig = await createAuthSig(client, signer);
  // Now, set up access control conditions. Here, we're checking that the signer
  // owns the Tableland table NFT with table ID that matches the one created above
  const tablelandContract = helpers.getContractAddress(chainId);
  const accessControlConditions = [
    {
      contractAddress: tablelandContract,
      chain,
      standardContractType: "ERC721",
      method: "ownerOf",
      parameters: [tableId],
      returnValueTest: {
        comparator: "=",
        value: await signer.getAddress(),
      },
    },
  ];

  // Now, we can encrypt the data before inserting
  const dataToEncryptStr = "this is a secret message";
  const dataToEncrypt = uint8arrayFromString(dataToEncryptStr); // Using Lit SDK helper
  const { ciphertext, dataToEncryptHash } = await client.encrypt({
    authSig,
    accessControlConditions,
    chain,
    dataToEncrypt,
  });

  // Write to the table
  const writeStmt = `INSERT INTO ${tableName} (msg, hash) VALUES (?, ?)`;
  const { meta: write } = await db
    .prepare(writeStmt)
    .bind(ciphertext, dataToEncryptHash)
    .run();
  await write.txn?.wait();

  // Read from the table—this will have raw, encrypted data
  const readStmt = `SELECT msg, hash FROM ${tableName}`;
  const { results } = await db.prepare(readStmt).all();

  // Decrypt the data read from the table, using the data read from our table,
  // the access control conditions, and our authentication signature
  for (const row of results) {
    const { msg, hash } = row;
    const { decryptedData } = await client.decrypt({
      accessControlConditions,
      authSig,
      chain,
      ciphertext: msg,
      dataToEncryptHash: hash,
    });
    const decrypted = Buffer.from(decryptedData.buffer).toString();
    console.log(`Decrypted data: '${decrypted}'`);
  }

  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

</TabItem>
<TabItem value="ts" label="TypeScript">

```ts
import { Database, helpers } from "@tableland/sdk";
import { Wallet, getDefaultProvider, verifyMessage } from "ethers";
import {
  LitNodeClient,
  uint8arrayFromString,
} from "@lit-protocol/lit-node-client";
import { LIT_CHAINS } from "@lit-protocol/constants";
import type { AccsDefaultParams, AuthSig } from "@lit-protocol/types";
import { SiweMessage } from "siwe";

type LitChain = AccsDefaultParams["chain"];

// Map chain ID to Lit chain name
const chainIdToLitChainName = (chainId: number): LitChain | undefined => {
  for (const [name, chain] of Object.entries(LIT_CHAINS)) {
    if (chain.chainId === chainId) {
      return name as LitChain;
    }
  }
  return undefined;
};

// Create an authentication signature for Lit
const createAuthSig = async (
  client: LitNodeClient,
  wallet: Wallet
): Promise<AuthSig> => {
  // Arbitrary domain, origin, and statement for the siwe message
  const domain = "localhost";
  const origin = "http://localhost";
  const statement = "Tableland encryption";
  const expirationTime = new Date(Date.now() + 60 * 60 * 1000).toISOString();
  const nonce = client.getLatestBlockhash();
  const chainId = await wallet.getChainId();
  const address = await wallet.getAddress();
  const siweMessage = new SiweMessage({
    domain,
    address,
    statement,
    uri: origin,
    version: "1",
    chainId,
    nonce,
    expirationTime,
  });

  // Sign the message
  const messageToSign = siweMessage.prepareMessage();
  const signature = await wallet.signMessage(messageToSign);
  const recoveredAddress = verifyMessage(messageToSign, signature);
  if (recoveredAddress !== address) {
    throw new Error("recovered address does not match wallet address");
  }

  // Create the `AuthSig` compliant object for the Lit SDK
  const authSig = {
    sig: signature,
    derivedVia: "web3.eth.personal.sign",
    signedMessage: messageToSign,
    address: recoveredAddress,
  };
  return authSig;
};

async function main(): Promise<void> {
  // Set up a signer (note: replace with your own private key & API key)
  const privateKey = "your_private_key";
  const provider = getDefaultProvider(
    "https://eth-sepolia.g.alchemy.com/v2/<your_alchemy_api_key>"
  );
  const wallet = new Wallet(privateKey);
  const signer = wallet.connect(provider);

  // Set up database and Lit client
  const db = new Database({ signer });
  const client = new LitNodeClient({ debug: false });
  await client.connect();

  // Create a table, and note that our access control will use the `tableId` as a condition
  const tablePrefix = "lit_encrypt";
  const createStmt = `CREATE TABLE ${tablePrefix} (id integer primary key, msg text, hash text)`;
  const { meta: create } = await db.prepare(createStmt).run();
  const tableName = create.txn?.names[0] ?? "";
  const tableId = create.txn?.tableIds[0] ?? "";
  await create.txn?.wait();

  // Write to the table, but first encrypt the value via Lit
  const chainId = await signer.getChainId();
  const chain = chainIdToLitChainName(chainId);
  if (chain === undefined) {
    throw new Error(`unsupported Lit chain: ${chainId}`);
  }
  // Create an authentication signature for Lit
  const authSig = await createAuthSig(client, signer);
  // Now, set up access control conditions. Here, we're checking that the signer
  // owns the Tableland table NFT with table ID that matches the one created above
  const tablelandContract = helpers.getContractAddress(chainId);
  const accessControlConditions: AccsDefaultParams[] = [
    {
      contractAddress: tablelandContract,
      chain,
      standardContractType: "ERC721",
      method: "ownerOf",
      parameters: [tableId],
      returnValueTest: {
        comparator: "=",
        value: await signer.getAddress(),
      },
    },
  ];

  // Now, we can encrypt the data before inserting
  const dataToEncryptStr = "this is a secret message";
  const dataToEncrypt = uint8arrayFromString(dataToEncryptStr); // Using Lit SDK helper
  const { ciphertext, dataToEncryptHash } = await client.encrypt({
    authSig,
    accessControlConditions,
    chain,
    dataToEncrypt,
  });

  // Write to the table
  const writeStmt = `INSERT INTO ${tableName} (msg, hash) VALUES (?, ?)`;
  const { meta: write } = await db
    .prepare(writeStmt)
    .bind(ciphertext, dataToEncryptHash)
    .run();
  await write.txn?.wait();

  // Read from the table—this will have raw, encrypted data
  const readStmt = `SELECT msg, hash FROM ${tableName}`;
  const { results } = await db
    .prepare(readStmt)
    .all<{ msg: string; hash: string }>();

  // Decrypt the data read from the table, using the data read from our table,
  // the access control conditions, and our authentication signature
  for (const row of results) {
    const { msg, hash } = row;
    const { decryptedData } = await client.decrypt({
      accessControlConditions,
      authSig,
      chain,
      ciphertext: msg,
      dataToEncryptHash: hash,
    });
    const decrypted = Buffer.from(decryptedData.buffer).toString();
    console.log(`Decrypted data: '${decrypted}'`);
  }

  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

</TabItem>
</Tabs>
