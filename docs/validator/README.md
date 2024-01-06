---
title: Overview
description: Learn the basics of how to use the validator Gateway API or even run your own validator node.
keywords:
  - rest api
  - gateway api
  - validator api
  - validator node
  - tableland indexer
  - tableland validator
---

A validator node is responsible for validating onchain transactions and materializing table state. The Tableland network exposes an HTTP API for interacting with validator nodes, called the Gateway API. Additionally, you can run your own validator node to participate in the network and manage the indexing on your own.

## Gateway API

The Tableland Gateway API is organized around [REST](http://en.wikipedia.org/wiki/Representational_State_Transfer). You can leverage these APIs to read directly from tables, compose data across them, and make calls to learn information about the node itself. Also, feel free to test out the Gateway API yourself: [here](/api/validator)

In Tableland, Validators are the execution unit/actors of the protocol. They have the following responsibilities:

- Listen to onchain events to materialize Tableland-compliant SQL queries in a database engine (currently, SQLite by default).
- Serve read-queries (e.g: `SELECT * FROM foo_69_1`) to the external world.
- Serve state queries (e.g. list tables, get receipts, etc) to the external world.

Keep in mind that a node listens to mainnet chains and testnet chains _separately_ such that there are separate gateway URLs for each respective environment.

## Validator node

If you'd like to run your own validator node, you can do so by following the instructions [here](/validator/node). The requirements and prerequisites include:

- Hardware:
  - 4 vCPUs, 8GiB of RAM.
  - SSD disk with 10GiB of free space.
  - Reliable and fast internet connection.
  - Static IP.
- Providers: For every chain you want to index, you'll need a provider, such as [Alchemy](https://www.alchemy.com/) or [QuickNode](https://www.quicknode.com).
- Docker: The node infrastructure uses [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/).
