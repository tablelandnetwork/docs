---
title: Get started
description: Leverage REST APIs to interact directly with Tableland validator nodes at a gateway.
keywords:
  - rest api
  - gateway api
---

## Setup

There are no required prerequisites, but it may be helpful to become familiar with [HTTPie](https://httpie.org/) and [cURL](https://curl.se/) since the examples provided use these. Also, [jq](https://stedolan.github.io/jq/) is an optional tool to help pipe the output from the API calls to a more human readable, "pretty" format (e.g., `curl <url> | jq`).

### Base URLs

Be sure to use the correct gateway for the corresponding network environment:

- Mainnets: `https://tableland.network/api/v1`
- Testnets: `https://testnets.tableland.network/api/v1`
- Local: `http://localhost:8080/api/v1`

At the protocol level, the Tableland network is separated such that nodes process and respond to SQL queries relative to each environment. If you were to use the `testnets` gateway on a mainnet chain / contract, this would lead to issues. The `testnets` gateway only queries tables that exist on testnet chains, whereas the `tableland.network` gateway only queries tables that exist on mainnet chains.

## Endpoints

The following endpoints are available at the base gateway URLs above:

- [`/query`](/validator/api/query) ⇒ Write a SQL read query and get table data.
- [`/receipt/{chainId}/{transactionHash}`](/validator/api/receipt) ⇒ Retrieve onchain transaction information regarding a table create or write query.
- [`/tables/{chainId}/{tableId}`}](/validator/api/tables) ⇒ Get table metadata and information.
- [`/health`](/validator/api/health) ⇒ Check if the validator is up and running.
- [`/version`](/validator/api/version) ⇒ Check version information about the validator daemon.

## Definitions

import { ChainsList } from '@site/src/components/SupportedChains'

- `transactionHash` ⇒ Resultant onchain transaction hash corresponding to a table’s creation or a write query.
- `tableId` ⇒ The unique identifier assigned to the created table upon the registry contract minting the table as an ERC721 token.
- `chainId` ⇒ Chain on which the table is created or mutations were sent to, which include the following:
  <ChainsList type={'all'} format={'list'} info={'chainId'} />
