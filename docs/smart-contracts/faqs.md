---
title: Smart contract FAQs
sidebar_label: FAQs
description: Review commonly asked questions about Tableland smart contracts.
keywords:
  - faq
  - faqs
---

## What is the Tableland registry?

The registry is a smart contract that's deployed on each [supported chain](/fundamentals/supported-chains). It consists of a minting function that creates tables as ERC721 token, providing table ownership and admin controls to the receiver. It also contains methods for writing mutating SQL statement and defining table permissions.

## How do I deploy to a chain?

Depending on the framework you're using, you should be able to define a chain provider API URL. This URL will dictate which chain connection you are using and, subsequently, which chain you are interacting with.

## How do I connect to a local chain?

The easiest way to connect to a local chain is to use the [Local Tableland](/local-tableland) development environment. Starting the process spins up a local Hardhat node and Tableland validator for you and provides you with a URL to connect to at `http://127.0.0.1:8545` and `http://localhost:8080`, respectively. See the [Hardhat plugin docs](/smart-contracts/hardhat-plugin) as an example.

## I created a table. Can anyone write to it?

By default, no. You as the table's owner is the only one with full admin permissions. However, you can grant permissions to other addresses using the `GRANT`/`REVOKE` syntax in mutating SQL statement. And for row-level controls, a smart contract can be used to gate more granular access rules (e.g., check caller's address before executing onchain method).

## Can I read table data onchain?

No. Table reads are offchain operations that are materialized by the Tableland validator network. You could use an oracle setup or read offchain and write that data onchain. In the future, we do plan to add onchain inclusion proofs so that smart contracts can make requests about offchain table data.

## I created a table, but it doesn't exist. Why?

When you create a table with smart contracts, it doesn't go through any syntax checks or normalization process. The registry smart contract will still mint and "create" the table, but since the syntax was invalid, the validator never created the table offchain. Thus, it doesn't actually "exist" in the database. Make sure your SQL `CREATE TABLE` statement is valid, such as following the [Tableland SQL convention](/sql). It can be a bit challenging to concatenate strings in Solidity, so make sure you're not missing things like trailing commas, etc.

## I wrote to a table, but it wasn't materialized. Why?

When you write to a table with smart contracts, it doesn't go through any syntax checks or normalization process. The registry smart contract will still "see" the mutating SQL statement, but since the syntax was invalid, the validator never materialized the data offchain. Make sure you're not missing things like trailing commas, single quotes, type constraints, access control permissions, etc. You can also dig into why there was an issue with the REST API's [`/receipt` endpoint](/validator/api/receipt), passing it the transaction hash of the failed onchain interaction.

## I'm running into an "cannot estimate gas" error. What's going on?

There are a couple of reasons this might happen—the error you might be seeing is `cannot estimate gas; transaction may fail or may require manual gas limit`. The most common one is that you don't have permissions to write to the table, and if you further inspect the error logs, you might see `Error: VM Exception while processing transaction: reverted with reason string 'not implemented'`. This means that there is no table access control policy for the table, so the access control check is failing onchain with `not implemented` since there's no policy method. Make sure you have the correct permissions to write to the table. For example, if you create a table with a smart contract and try to write to it with your EOA/wallet, the default permissions will not allow you to write to the table.
