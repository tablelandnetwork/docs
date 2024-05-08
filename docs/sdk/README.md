---
title: Overview
description: Use the Tableland SDK in your JavaScript / TypeScript projects, with full Cloudflare D1 client compatibility.
keywords:
  - sdk
  - javascript
  - typescript
  - web app
  - mobile app
---

The Tableland SDK provides a minimal client that implements the Cloudflare D1 Database interface on top of the Tableland network. It can be used as a drop-in replacement to work with many community-created D1 tools and libraries. It also comes with a set of helper utilities for working with Tableland.

## Synopsis

The `@tableland/sdk` comes with a few APIs: "primary" [Cloudflare D1 client compatible](https://developers.cloudflare.com/d1/platform/client-api/) API for [`Database`](/sdk/database) connections, and two additional "secondary" APIs ([`Validator`](/sdk/validator) and [`Registry`](/sdk/registry)) that are unique to Tableland operations. Generally, users will leverage the primary database API for typical SQL operations, and the secondary APIs are useful when needing to interact directly with a Tableland Validator node or directly calling Tableland’s smart contracts (onchain access control, direct contract calls, etc.). Both ESM and CommonJS are supported.

:::tip
If you're looking for the SDK API reference, you can check it out [here](/api/sdk/globals).
:::

There's also a Go SDK available [here](https://github.com/tablelandnetwork/go-tableland/tree/main/pkg/client/v1). It's still in beta, but it's a great way to get started with Tableland if you're a Go developer.

## Chain configuration

Note the chain naming convention used by the `Database` connection roughly matches that of [`ethersjs`](https://github.com/ethers-io/ethers.js/). To dictate which chain your app should connect to, you can leverage a [`Signer`](https://docs.ethers.org/v6/api/providers/#Signer) where the signer will provide information corresponding to a particular chain. This includes any of the following chains, which have their defined chain name shown as well:

import { ChainsList } from '@site/src/components/SupportedChains'

<ChainsList type={'all'} format={'list'} info={'ethersName'} />

In other words, the network name is only specified while instantiating a signer that then connects to the `Database`. It is not something that needs to explicitly be passed to the `Database` API but is inferred from the passed `Signer`.

## Signing transactions

The default behavior for database connections prompt a wallet to connect via the browser. If no additional logic is implemented, the connection will leverage whatever the browser connects to. In other words, you must restrict which chains the `Database` can connect through by creating a signer, or the app will leverage whatever the browser wallet has specified as the chain.

Third party libraries, like `ethersjs` and `wagmi`, are useful to create a signer and restrict which chains the app is using. These libraries may also be useful if passing an account private key stored locally in a `.env` file from a Node app.

See the [Signers](/sdk/database/signers) page for more details.

## Using TypeScript

The Tableland SDK supports both JavaScript and TypeScript. If you're using TypeScript, note that the `Database` API and all related classes and modules are written in TypeScript and provide a generic interface to fully typed queries and responses (if you want). Currently, if you do _not_ provide types, it will default to `unknown`. This is probably _not_ what you want, so passing in `any` is fine, but you can do a whole lot more if you provide a concrete type.

Types can be provided on the `Database` constructor, on the `Statement` constructor (`prepare`), or callers can override them on any of the query/execution APIs directly (i.e., `run`, `all`, `first`, or `raw`).

For example, start by defining the type associated with the table’s schema and use this type in the database constructor.

## Web frameworks

If you're building a frontend application, check out the [React](/playbooks/frameworks/reactjs), [Next.js](/playbooks/frameworks/nextjs), or [wagmi](/playbooks/frameworks/wagmi) for a full example of how to use the SDK there. There are also starter [template repos](/quickstarts/templates) to get you up and running even more quickly.
