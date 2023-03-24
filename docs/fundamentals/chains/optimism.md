---
title: Optimism
description: An overview of using Optimism with Tableland.
keywords:
  - optimism
---

import { ChainInfo } from '@site/src/components/SupportedChains'

Optimism is one of the EVM-compatible Layer 2 solutions that Tableland currently supports. Check out the overview of what this network is and relevant information when using it.

## Overview

[Optimism](https://www.optimism.io/about) is an [optimistic rollup](https://ethereum.org/en/developers/docs/scaling/optimistic-rollups/) built on top of Ethereum. It is a sidechain that inherits Ethereum’s security but operates as a separate protocol with its own set of nodes running. Rollups sequencers batch transactions onto the L1 [at various intervals](https://optimistic.etherscan.io/batches) and leverage [fraud proofs](https://ethereum.org/en/glossary/#fraud-proof) for self-enforced validation of the off-chain transaction.

Offchain, the transactions happen much quicker than the batching. Note that developers must bridge assets from Ethereum to Optimism to take advantage of the faster transaction confirmation speeds and low costs.

### Goerli Testnet

- Average block time: 2 seconds
- Chain ID: <ChainInfo chain='optimism-goerli' info='chainId' />
- Symbol: ETH
- Status Dashboard:
  - [https://status.optimism.io/](https://status.optimism.io/)
- Block Explorer:
  - [https://blockscout.com/optimism/goerli/](https://blockscout.com/optimism/goerli/)
- Faucet:
  - Use the Ethereum Goerli faucet and then bridge ETH to Optimism
- Bridge:
  - [https://app.optimism.io/bridge](https://app.optimism.io/bridge)
- RPC URL:
  - See [https://chainlist.org/chain/420](https://chainlist.org/chain/420)
- Tableland contract address: <ChainInfo chain='optimism-goerli' info='contractAddress' />
- SDK network name: <ChainInfo chain='optimism-goerli' info='chainName' />
- Tableland gateway: <ChainInfo chain='optimism-goerli' info='baseUrl' />

### Mainnet

- Average block time: 2 seconds
- Chain ID: <ChainInfo chain='optimism' info='chainId' />
- Symbol: ETH
- Status Dashboard:
  - [https://status.optimism.io/](https://status.optimism.io/)
- Block Explorer:
  - [https://optimistic.etherscan.io/](https://optimistic.etherscan.io/)
- RPC URL:
  - See [https://chainlist.org/chain/10](https://chainlist.org/chain/10)
- Tableland contract address: <ChainInfo chain='optimism' info='contractAddress' />
- SDK network name: <ChainInfo chain='optimism' info='chainName' />
- Tableland gateway: <ChainInfo chain='optimism' info='baseUrl' />
