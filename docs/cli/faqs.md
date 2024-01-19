---
title: CLI FAQs
sidebar_label: FAQs
description: Review commonly asked questions about Tableland CLI.
keywords:
  - faq
  - faqs
---

## What is the Tableland CLI?

The CLI is a wrapper around the Tableland SDK but extends its feature set to a command line interface. Additional features such as writing to the database from files (SQL statements or CSV data) are also available, and it lets you interact with any of your tables across the network.

## How do I connect to a chain?

When you set up the CLI, the `init` command lets you specify your desired chain, provider URL, and private key. These are all required for most of the commands—i.e., if it's an onchain operation, these are needed. Or, you can choose to pass them as flags with each command as `--chain`, `--providerUrl`, and `--private-key`.

## How do I connect to a local chain?

The easiest way to connect to a local chain is to use the [Local Tableland](/local-tableland) development environment. Starting the process spins up a local Hardhat node and Tableland validator for you and provides you with a URL to connect to at `http://127.0.0.1:8545` and `http://localhost:8080`, respectively. Thus, when you pass the `--chain` flag, you can use `local-tableland` as the value, the the `--providerUrl` would be `http://127.0.0.1:8545`.

## Can I set up access controls on my table with the CLI?

Yes. The `GRANT` and `REVOKE` syntax can be used to set up admin table permissions with a mutating SQL query. However, more fine-grained access controls, like row-level security, require the use of smart contracts.

## If I create a table with other clients, can I use the CLI to interact with it?

Yes. Any table created on any chain is accessible with the CLI, so as long as you know the table's info and deployment environment, you can interact with it. This can be especially useful for testing and debugging tables created with smart contracts.

## When I create or write data, it takes a long time. What's happening?

The CLI waits for the transaction to be included in a block before returning a response—and some chains also require optimistic inclusion waiting periods. Each chain has a specific period of time that it waits before returning a response, and this can be found in the [chain documentation](/fundamentals/supported-chains).

## I'm running into errors—how can I troubleshoot them?

See the CLI [errors](/cli/errors) page for more information on what the errors mean and how to troubleshoot them.
