---
title: Overview
description: Interact with Tableland using smart contracts.
---

Tableland is a protocol that incorporates both on-chain and off-chain components. On-chain, there are "Registry" smart contracts that allow anyone to create a table, but only provisioned users can write to it. Custom "controller" contracts define fine grained access to manage exactly how tables are created and written to.

## Registry contract

The [`TablelandTables`](/smart-contracts/registry-contract) registry contract is where you can create tables, write to them, and set the controller of the table itself. The primary methods exist for creating tables (`create`), writing SQL (`mutate`), and setting controllers for the table itself. Table _reads_, however, are not possible in smart contracts and happen entirely offchain. The registry is managed by and is part of the Tableland protocol, so there is no need for developers to deploy this on their own. You will just make calls to one of the [deployed contracts](/smart-contracts/deployed-contracts).

## Controller contract

The [`TablelandController`](/smart-contracts/controller) contract (which is an abstract implementation of the `ITablelandController`) is how you can set you own access controls for a specific table. You can implement and deploy your own controller contract and set custom permissions for your table(s).

## Utility contracts

There are two useful utilities to help set up an interface with the registry contract and also forming SQL statements: [`TablelandDeployments`](/smart-contracts/tableland-deployments) and [`SQLHelpers`](/smart-contracts/sql-helpers).

The `TablelandDeployments` contract helps set up the `TablelandTables` interface by returning `ITablelandTables` instantiated with the correct registry address, inferred by the chain being used. But, you're free to do this on your own using the `ITablelandTables` interface. Although optional, `SQLHelpers` makes it more straightforward to develop in Solidity when producing SQL statements (forming compliant statements, wrapping text in quotes, etc.).

## Templates, examples, & walkthroughs

There are [template repos](/quickstarts/templates) that provide starter frameworks for a simple smart contract that creates & mutates tables in a Hardhat project, including the [`@tableland/hardhat`](/smart-contracts/hardhat-plugin) plugin and Local Tableland setup. The [walkthroughs](/smart-contracts/walkthroughs) provide a more in-depth look at how to use Tableland in a smart contract. Lastly, there are set of [example contracts](/smart-contracts/examples) for quick copy/paste snippets for a few different use cases.
