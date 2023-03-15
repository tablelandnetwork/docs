---
title: Overview
description: Use the Tableland SDK in your JavaScript / TypeScript projects, with full Cloudflare D1 client compatibility.
synopsis: The Tableland SDK provides a minimal client that implements the Cloudflare D1 Database interface on top of the Tableland network. It can be used as a drop-in replacement to work with many community-created D1 tools and libraries. It also comes with a set of helper utilities for working with Tableland.
keywords:
  - sdk
  - javascript
  - typescript
  - web app
  - mobile app
---

The `@tableland/sdk` comes with a few APIs: a "primary" [Cloudflare D1 client compatible](https://developers.cloudflare.com/d1/platform/client-api/) API for [`Database`](database) connections, and two additional "secondary" APIs ([`Validator`](validator) and [`Registry`](registry)) that are unique to Tableland operations. Generally, users will leverage the primary database API for typical SQL operations, and the secondary APIs are useful when needing to interact directly with a Tableland Validator node or directly calling Tableland’s smart contracts (on-chain access control, direct contract calls, etc.).

## Chains

Note the chain naming convention used by the `Database` connection matches that of [`ethersjs`](https://github.com/ethers-io/ethers.js/). To dictate which chain your app should connect to, you can leverage a [`Signer`](https://docs.ethers.org/v5/api/signer/) where the signer will provide information corresponding to a particular chain. This includes any of the following chains, which have their `ethers`-defined name shown as well:

import { ChainsList } from '@site/src/components/SupportedChains'

<ChainsList type={'all'} format={'list'} info={'ethersName'} />

In other words, the network name is only specified while instantiating a signer that then connects to the `Database`. It is not something that needs to be passed to the `Database` API.

## Signing transactions

The default behavior for database connections prompt a wallet to connect via the browser. If no additional logic is implemented, the connection will leverage whatever the browser connects to. In other words, you must restrict which chains the `Database` can connect through by creating a signer, or the app will leverage whatever the browser wallet has specified as the chain.

Third party libraries, like `ethersjs` and `wagmi`, are useful to create a signer and restrict which chains the app is using. These libraries may also be useful if passing an account private key stored locally in a `.env` file from a Node app.

See the [Signers](database/signers) page for more details.

## Using TypeScript

The Tableland SDK supports both JavaScript and TypeScript. If you're using TypeScript, note that the `Database` API and all related classes and modules are written in TypeScript and provide a generic interface to fully typed queries and responses (if you want). Currently, if you do _not_ provide types, it will default to `unknown`. This is probably _not_ what you want, so passing in `any` is fine, but you can do a whole lot more if you provide a concrete type.

Types can be provided on the `Database` constructor, on the `Statement` constructor (`prepare`), or callers can override them on any of the query/execution APIs directly (i.e., `run`, `all`, `first`, or `raw`).

For example, start by defining the type associated with the table’s schema and use this type in the database constructor.

:::caution
If you’re upgrading from the legacy (v3) SDK to the latest (v4), please review the instructions on how to [upgrade from v3 to v4](upgrading=from-v3-to-v4). The SDK docs only focus on the most recent version.
:::
