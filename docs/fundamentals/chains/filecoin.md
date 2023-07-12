---
title: Filecoin
description: An overview of using Filecoin with Tableland.
keywords:
  - filecoin
---

import { ChainInfo } from '@site/src/components/SupportedChains';

Filecoin is an EVM-compatible Layer 1 chain that Tableland currently supports. Check out the overview of what this network is and relevant information when using it.

## Overview

The Filecoin EVM runtime (FEVM) is a fully compatible Ethereum Virtual Machine (EVM) implementation built on top of the Filecoin Virtual Machine (FVM). This compatibility enables Ethereum and Solidity developers to seamlessly deploy and run their smart contracts on the Filecoin network with minimal modifications. By supporting popular EVM development tools and offering the Ethereum JSON-RPC API, the FEVM simplifies the process of integrating existing blockchain applications into the Filecoin ecosystem, including Tableland.

### Block & SQL finality

Filecoin block times are 30 seconds long. But, there are two components to SQL being materialized in Tableland:

- SQL _event_ being emitted so that Tableland can process it.
- Awaiting block finality to prevent against chain reorgs.

The FVM generates receipts in the tipset _following_ a transaction's submission to the mempool. Since Tableland needs the event / receipt in order to see any SQL that's written, this typically adds a **~1 minute delay** after transaction submission—thus, 1 block (30 seconds) plus waiting for the following tipset's receipt (~1 minute) (see [here](https://docs.filecoin.io/smart-contracts/developing-contracts/best-practices/#consistently-generating-transaction-receipts) for more detail). Additionally, Tableland **waits 5 blocks for finality** (~2.5 mins) until the SQL is materialized in Tableland. Finality in Filecoin is actually _900 epochs_ (~7.5 hours), but in practice, the 5 block finality is sufficient for Tableland.

From the time an on-chain SQL transaction is submitted until it is materialized in the Tableland database network, it can take up to **~4 minutes**.

## Setup & resources

### Filecoin (mainnet)

- Average block time: 30s
- Average SQL materialization time: 4 minutes
- Chain ID: 314
- Symbol: FIL
- Status Dashboard:
  - [https://status.filecoin.io/](https://status.filecoin.io/)
- Block Explorer:
  - [https://filfox.info](https://filfox.info)
- RPC URL: [https://api.node.glif.io/rpc/v0](https://api.node.glif.io/rpc/v0)
- Tableland contract address: <ChainInfo chain='filecoin' info='contractAddress' />
- SDK network name: <ChainInfo chain='filecoin' info='chainName' />
- Tableland gateway: <ChainInfo chain='filecoin' info='baseUrl' />

### Filecoin Calibration (testnet)

- Average block time: 30s
- Average SQL materialization time: 4 minutes
- Chain ID: 314159
- Symbol: TFIL
- Status Dashboard:
  - [https://stats.calibration.fildev.network/](https://stats.calibration.fildev.network/)
- Block Explorer:
  - [https://calibration.filfox.info/en](https://calibration.filfox.info/en)
- Faucet:
  - [https://faucet.calibration.fildev.network/](https://faucet.calibration.fildev.network/)
- RPC URL: [https://api.calibration.node.glif.io/rpc/v1](https://api.calibration.node.glif.io/rpc/v1)
- Tableland contract address: <ChainInfo chain='filecoin-calibration' info='contractAddress' />
- SDK network name: <ChainInfo chain='filecoin-calibration' info='chainName' />
- Tableland gateway: <ChainInfo chain='filecoin-calibration' info='baseUrl' />

:::caution
Currently, Filecoin Calibration node providers _do not_ store an archive of chain history past the most recent 2000 blocks. This _should not_ have an impact on development if you’re using the primary Tableland node, barring some unforeseen & unlikely downtime of ~17 hours. If you’re a node operator of the Tableland protocol, this _does_ have an impact but will (hopefully) be resolved soon.
:::

#### Getting testnet funds

Request testnet FIL from the faucet noted above—this should send funds directly to the identified wallet.
