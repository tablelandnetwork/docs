---
title: Arbitrum
description: An overview of using Arbitrum with Tableland.
keywords:
  - arbitrum
---

Arbitrum is one of the leading EVM-compatible Layer 2 solutions that Tableland currently supports. Check out the overview of what this network is and relevant information when using it, including Arbitrum One vs. Arbitrum Nova.

import { ChainInfo } from '@site/src/components/SupportedChains'

## Overview

### Arbitrum One

Arbitrum One is a rollup scaling solution that works by [batching transactions](https://arbiscan.io/batches) from L2 to L1 at various intervals. Offchain transactions happen much more frequently and allow for very low costs and fast transaction confirmation times. Arbitrum operates a network of EVM-compatible nodes and uses fraud proofs to validate if the offchain transaction are valid, doing so in a way that inherits Ethereum’s security.

One key difference to note between Arbitrum and Optimism is that Arbitrum uses multi-round fraud proofs and single transaction disputes. This differs from single-round fraud proofs (e.g., Optimism) that execute the _entire rollup_ on Ethereum if a challenge is made.

### Arbitrum Nova

[Arbitrum Nova](https://nova.arbitrum.io/) enables ultra-low transaction fees through a _Data Availability Committee_. With games or certain apps, high transaction volume can make things cost prohibitive and diminish the user experience—but Nova helps address these issues. It becomes more scalable to build these types of onchain experiences, especially, when coupled with a decentralized SQL database like Tableland.

Thus, you can imagine how high volume applications can take advantage of both the speed and associated costs. Nova makes it much cheaper than, say, using Ethereum mainnet or even Arbitrum One, which would be too expensive to build applications with these requirements. Common use cases include gaming and anything with high volume requirements, such as social projects or dapp application data.

## Setup & resources

### Sepolia (testnet)

- Average block time: 2 seconds
- Block depth: 0
- Average SQL materialization time: <5 seconds
- Chain ID: <ChainInfo chain='arbitrum-sepolia' info='chainId' />
- Symbol: ETH
- Status Dashboard:
  - N/A
- Block Explorer:
  - [https://sepolia.arbitrum.io/](https://sepolia.arbitrum.io/)
- Faucet (use the Ethereum Sepolia faucet and then bridge ETH to Arbitrum):
  - [https://sepoliafaucet.com/](https://sepoliafaucet.com/)
  - [https://faucet.chainstack.com/sepolia-testnet-faucet](https://faucet.chainstack.com/sepolia-testnet-faucet)
- Bridge:
  - [https://bridge.arbitrum.io/](https://bridge.arbitrum.io/?l2ChainId=421614)
- RPC URL:
  - See [https://chainlist.org/chain/421614](https://chainlist.org/chain/421614)
- Tableland contract address: <ChainInfo chain='arbitrum-sepolia' info='contractAddress' />
- SDK network name: <ChainInfo chain='arbitrum-sepolia' info='chainName' />
- Tableland gateway: <ChainInfo chain='arbitrum-sepolia' info='baseUrl' />

### Arbitrum One (mainnet)

- Average block time: 2 seconds
- Block depth: 0
- Average SQL materialization time: <5 seconds
- Chain ID: <ChainInfo chain='arbitrum' info='chainId' />
- Symbol: ETH
- Status Dashboard:
  - N/A
- Bridge:
  - [https://bridge.arbitrum.io/](https://bridge.arbitrum.io/)
- Block Explorer:
  - [https://arbiscan.io](https://arbiscan.io)
- RPC URL:
  - See [https://chainlist.org/chain/42161](https://chainlist.org/chain/42161)
- Tableland contract address: <ChainInfo chain='arbitrum' info='contractAddress' />
- SDK network name: <ChainInfo chain='arbitrum' info='chainName' />
- Tableland gateway: <ChainInfo chain='arbitrum' info='baseUrl' />

### Arbitrum Nova (mainnet)

- Average block time: 2 seconds
- Block depth: 0
- Average SQL materialization time: <5 seconds
- Chain ID: <ChainInfo chain='arbitrum-nova' info='chainId' />
- Symbol: ETH
- Status Dashboard:
  - N/A
- Bridge:
  - [https://bridge.arbitrum.io/?l2ChainId=42170](https://bridge.arbitrum.io/?l2ChainId=42170)
- Block Explorer:
  - [https://nova.arbiscan.io/](https://nova.arbiscan.io/)
- RPC URL:
  - See [https://chainlist.org/chain/42170](https://chainlist.org/chain/42170)
- SDK network name: <ChainInfo chain='arbitrum-nova' info='chainName' />
- Tableland gateway: <ChainInfo chain='arbitrum-nova' info='baseUrl' />

## Getting testnet funds

1. Request testnet Ether from a faucet noted above (e.g., [here](https://sepoliafaucet.com/) or [here](https://faucet.chainstack.com/sepolia-testnet-faucet)).
2. Move the ETH from Ethereum to Arbitrum at [https://bridge.arbitrum.io/](https://bridge.arbitrum.io/)—i.e., select "ETH" (or, as in the screenshot below, other ERC20 tokens that exist on Ethereum Sepolia can be bridged).

import bridge from "@site/static/assets/arb-sepolia.png"

<img src={bridge} width="80%"/>
