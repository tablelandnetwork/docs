---
title: Polygon
description: An overview of using Polygon with Tableland.
keywords:
  - polygon
---

import { ChainInfo } from '@site/src/components/SupportedChains'

Polygon is one of the EVM-compatible Layer 2 solutions that Tableland currently supports. Check out the overview of what this network is and relevant information when using it.

## Overview

[Polygon](https://polygon.technology/solutions/polygon-pos/) is a popular L2 scaling solution called a _[sidechain](https://ethereum.org/en/developers/docs/scaling/sidechains/#top)_. It has low transaction costs and high transaction speed & throughput, so many developers choose Polygon when designing cost effective applications that require a high transaction throughput or speed.

For comparison, Polygon supports 7k tx/s compared to Ethereum’s 15 tx/s and ~10000x lower costs per transaction than Ethereum. It’s important to note that sidechains do use _different_ security assumptions than the L1; it’s what allows Polygon to architect its network in a way that enables all of these benefits for developers. Nevertheless, it’s a great scaling solution.

### Polygon (mainnet)

- Average block time: ≤ 2 seconds
- Chain ID: <ChainInfo chain='matic' info='chainId' />
- Symbol: MATIC
- Status Dashboard:
  - [https://polygon.io/system](https://polygon.io/system)
- Block Explorer:
  - [https://polygonscan.com/](https://polygonscan.com/)
- Gas Station:
  - [https://polygonscan.com/gastracker](https://polygonscan.com/gastracker)
  - [https://gasstation-mainnet.matic.network/v2](https://gasstation-mainnet.matic.network/v2)
- RPC URL:
  - [https://polygon-rpc.com](https://polygon-rpc.com/)
  - See [https://chainlist.org/chain/137](https://chainlist.org/chain/137)
- Tableland contract address: <ChainInfo chain='maticmum' info='contractAddress' />
- SDK network name: <ChainInfo chain='maticmum' info='chainName' />
- Tableland gateway: <ChainInfo chain='maticmum' info='baseUrl' />

### Polygon Mumbai (testnet)

- Average block time: ≤ 2 seconds
- Chain ID: <ChainInfo chain='maticmum' info='chainId' />
- Symbol: MATIC
- Status Dashboard:
  - N/A
- Block Explorer:
  - [https://mumbai.polygonscan.com/](https://mumbai.polygonscan.com/)
- Faucet:
  - [https://mumbaifaucet.com/](https://mumbaifaucet.com/)
  - [https://faucet.polygon.technology/](https://faucet.polygon.technology/)
  - [https://faucet.paradigm.xyz/](https://faucet.paradigm.xyz/)
- Gas Station:
  - [https://gasstation-mumbai.matic.today/v2](https://gasstation-mumbai.matic.today/v2)
- RPC URL:
  - See [https://chainlist.org/chain/80001](https://chainlist.org/chain/80001)
- Tableland contract address: <ChainInfo chain='matic' info='contractAddress' />
- SDK network name: <ChainInfo chain='matic' info='chainName' />
- Tableland gateway: <ChainInfo chain='matic' info='baseUrl' />

#### Getting testnet funds

Request testnet Ether from a faucet noted above. Note that bridging is not required since MATIC is the native token, not ETH.
