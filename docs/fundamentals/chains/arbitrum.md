---
title: Arbitrum
description: An overview of using Arbitrum with Tableland.
synopsis: Arbitrum is one of the leading EVM-compatible Layer 2 solutions that Tableland currently supports. Check out the overview of what this network is and relevant information when using it.
keywords:
  - arbitrum
---

import { ChainInfo } from '@site/src/components/SupportedChains'

## Overview

Arbitrum is a rollup scaling solution that works by [batching transactions](https://arbiscan.io/batches) from L2 to L1 at various intervals. Off-chain transactions happen much more frequently and allow for very low costs and fast transaction confirmation times. Arbitrum operates a network of EVM-compatible nodes and uses fraud proofs to validate if the off-chain transaction are valid, doing so in a way that inherits Ethereum’s security.

One key difference to note between Arbitrum and Optimism is that Arbitrum uses multi-round fraud proofs and single transaction disputes. This differs from single-round fraud proofs (e.g., Optimism) that execute the _entire rollup_ on Ethereum if a challenge is made.

### Goerli Testnet

- Average block time: 2 seconds
- Chain ID: <ChainInfo chain='arbitrum-goerli' info='chainId' />
- Symbol: ETH
- Status Dashboard:
  - N/A
- Block Explorer:
  - [https://goerli-rollup-explorer.arbitrum.io/](https://goerli-rollup-explorer.arbitrum.io/)
- Faucet (use the Ethereum Goerli faucet and then bridge ETH to Arbitrum):
- [https://goerlifaucet.com/](https://goerlifaucet.com/)
- [https://faucet.paradigm.xyz/](https://faucet.paradigm.xyz/)
- Bridge:
  - [https://bridge.arbitrum.io/](https://bridge.arbitrum.io/)
- RPC URL:
  - See [https://chainlist.org/chain/421613](https://chainlist.org/chain/421613)
- Tableland contract address: <ChainInfo chain='arbitrum-goerli' info='contractAddress' />
- SDK network name: <ChainInfo chain='arbitrum-goerli' info='chainName' />
- Tableland gateway: <ChainInfo chain='arbitrum-goerli' info='baseUrl' />

### Mainnet (Arbitrum One)

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

## Getting testnet funds

1. Request testnet Ether from a faucet noted above (e.g., [here](https://goerlifaucet.com/) or [here](https://faucet.paradigm.xyz/)).
2. Move the ETH from Ethereum to Arbitrum at [https://bridge.arbitrum.io/](https://bridge.arbitrum.io/)—i.e., select "ETH" (or, as in the screenshot below, other ERC20 tokens that exist on Ethereum Goerli can be bridged).

import bridge from "@site/static/assets/tutorials/table-reads-chainlink/arb-goerli.png"

<img src={bridge} width="80%"/>
