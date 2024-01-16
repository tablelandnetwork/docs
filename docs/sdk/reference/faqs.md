---
title: SDK FAQs
sidebar_label: FAQs
description: Review commonly asked questions about the Tableland SDK.
keywords:
  - faq
  - faqs
---

## What languages does the Tableland SDK support?

The SDK is a JavaScript/TypeScript SDK that works in Node.js and web app environments. There is also a Go SDK that works in Go environments, but most of the core feature development focuses on the JS/TS SDK.

## How do I connect to a chain?

Tableland uses ethers.js and its "signer" class upon database instantiation. To set up a signer, you must set up a provider, which points to the HTTP URL of a node. This URL will dictate which chain connection you are using and, subsequently, which chain you are writing to.

## How do I connect to a local chain?

The easiest way to connect to a local chain is to use the [Local Tableland](/local-tableland) development environment. Starting the process spins up a local Hardhat node and Tableland validator for you and provides you with a URL to connect to at `http://127.0.0.1:8545` and `http://localhost:8080`, respectively.

## Can I set up access controls on my table with the SDK?

Yes. The `GRANT` and `REVOKE` syntax can be used to set up admin table permissions with a mutating SQL query. However, more fine-grained access controls, like row-level security, require the use of smart contracts.

## When I create or write data, it takes a long time. What's happening?

By default, the `Database` is instantiated with `autoWait` set to `true`. The SDK waits for the transaction to be included in a block before returning a response—and some chains also require optimistic inclusion waiting periods. Each chain has a specific period of time that it waits before returning a response, and this can be found in the [chain documentation](/fundamentals/supported-chains). If you don't want to wait for transaction inclusion, you can set `autoWait` to `false`, but this can be risky because then you don't know if the transaction was successful or not.

## I don't use ethers but another package like viem. Can I still use Tableland?

Yes. See the [wagmi](/docs/playbooks/frameworks/wagmi) docs for an example of how to set up an ethers to viem adapter. The key point is that whatever package you're using needs to convert their version of a signer to an ethers-compatible signer.

## Can I interact directly with the onchain registry or Tableland validator?

Yes. Along with the `Database` API, there are also APIs for the` Registry` and `Validator`. These offer methods that are outside of the core database functionality but still part of the overall Tableland protocol.

## Can I use the SDK in mobile app development?

Yes. However, it might require some additional configuration. For example, if you are using React Native, it does not support wasm out of the box. The SDK uses a [SQL parser](/sdk/walkthroughs/sql-parser) for normalizing SQL statements that is built from wasm, so you need to handle this accordingly.

## Can I use an ORM with the SDK?

Yes. Tableland is compatible with any ORM that supports the Cloudflare D1 APIs. See the [ORM](/sdk/walkthroughs/orm) docs for more information.

## I'm writing data, but the data isn't materializing in my table. What's going on?

Generally, the SDK is well adapted at handling syntax issues since it goes through a SQL normalization process and a series of pre-processing checks. However, some common gotchas include:

- Incorrectly formatted text: Make sure you are using single quotes for strings.
- Insufficient permissions: If you don't have permission to write to a table, the SDK will throw an error.
- Insufficient funds: If you are creating or writing to a table, make sure you have enough gas to cover the transaction.
- Nonexistent table: Table names follow the convention `{prefix}_{chainId}_{tableId}`, so make sure you are using the correct table name and not just the `prefix` portion.
