---
title: Get started
description: Leverage REST APIs to interact directly with Tableland validator nodes at a gateway.
keywords:
  - rest api
  - gateway api
---

The Tableland Gateway API is organized around [REST](http://en.wikipedia.org/wiki/Representational_State_Transfer). You can leverage these APIs to read directly from tables and compose data across them, and make calls to learn information about the node itself. Keep in mind that a node listens to mainnet chains and testnet chains _separately_ such that there are separate Base URLs for each respective environment.

## Setup

There are no required prerequisites, but it may be helpful to become familiar with [HTTPie](https://httpie.org/) and [cURL](https://curl.se/) since the examples provided use these. Also, [jq](https://stedolan.github.io/jq/) is an optional tool to help pipe the output from the API calls to a more human readable, "pretty" format (e.g., `curl <url> | jq`).

### Base URLs

Be sure to use the correct gateway for the corresonding network environment:

- Mainnets: [https://tableland.network/api/v1](https://tableland.network/api/v1)
- Testnets: [https://testnets.tableland.network/api/v1](https://testnets.tableland.network/api/v1)
- Local: [http://localhost:8080/api/v1](http://localhost:8080/api/v1)

At the protocol level, the Tableland network is separated such that nodes process and respond to SQL queries relative to each environment. If you were to use the `testnets` gateway on a mainnet chain / contract, this would lead to issues. The `testnets` gateway only queries tables that exist on testnet chains, whereas the `tableland.network` gateway only queries tables that exist on mainnet chains.

## Endpoints

The following endpoints are available at the Base URL gateways above:

- [`/query`](endpoints#query) ⇒ Write a SQL read query and get table data.
- [`/receipt/{chainId}/{transactionHash}`](endpoints#receipt) ⇒ Retrieve on-chain transaction information regarding a table create or write query.
- [`/tables/{chainId}/{tableId`}](endpoints#tables) ⇒ Get table metadata and information.
- [`/health`](endpoints#health) ⇒ Check if the validator is up and running.
- [`/version`](endpoints#version) ⇒ Check version information about the validator daemon.

## Definitions

import { ChainsList } from '@site/src/components/SupportedChains'

- `transactionHash` ⇒ Resultant on-chain transaction hash corresponding to a table’s creation or a write query.
- `tableId` ⇒ The unique identifier assigned to the created table upon the registry contract minting the table as an ERC721 token.
- `chainId` ⇒ Blockchain or L2 solution on which transactions are being sent; available _chainId_ include the following:
  <ChainsList type={'all'} format={'list'} info={'chainId'} />
