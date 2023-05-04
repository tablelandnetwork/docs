---
title: Filecoin
description: An overview of using Filecoin with Tableland.
keywords:
  - filecoin
---

import { ChainInfo } from '@site/src/components/SupportedChains';

Filecoin is a EVM-compatible Layer 1 chain that Tableland currently supports. Check out the overview of what this network is and relevant information when using it.

## Overview

The Filecoin EVM runtime (FEVM) is a fully compatible Ethereum Virtual Machine (EVM) implementation built on top of the Filecoin Virtual Machine (FVM). This compatibility enables Ethereum and Solidity developers to seamlessly deploy and run their smart contracts on the Filecoin network with minimal modifications. By supporting popular EVM development tools and offering the Ethereum JSON-RPC API, the FEVM simplifies the process of integrating existing blockchain applications into the Filecoin ecosystem, including Tableland.

## Setup & resources

<!-- ### Filecoin (mainnet)

- Average block time: 30s
- Chain ID:  314
- Symbol: FIL
- Status Dashboard:
  - [https://status.filecoin.io/](https://status.filecoin.io/)
- Block Explorer:
  - [https://filfox.info](https://filfox.info)
- RPC URL: [https://rpc.ankr.com/filecoin](https://rpc.ankr.com/filecoin)
- Tableland contract address: <ChainInfo chain='filecoin' info='contractAddress' />
- SDK network name: <ChainInfo chain='filecoin' info='chainName' />
- Tableland gateway: <ChainInfo chain='filecoin' info='baseUrl' /> -->

### Filecoin Hyperspace (testnet)

- Average block time: 30s
- Chain ID: 3141
- Symbol: xFIL
- Status Dashboard:
  - [https://status.filecoin.io/uptime/5dj924lq96rz](https://status.filecoin.io/uptime/5dj924lq96rz)
- Block Explorer:
  - [https://hyperspace.filfox.info/](https://hyperspace.filfox.info/)
- Faucet:
  - [https://hyperspace.yoga/](https://hyperspace.yoga/)
- RPC URL: [https://rpc.ankr.com/filecoin_testnet](https://rpc.ankr.com/filecoin_testnet)
- Tableland contract address: <ChainInfo chain='filecoin-hyperspace' info='contractAddress' />
- SDK network name: <ChainInfo chain='filecoin-hyperspace' info='chainName' />
- Tableland gateway: <ChainInfo chain='filecoin-hyperspace' info='baseUrl' />

#### Getting testnet funds

1. Request testnet FIL from a faucet noted above
