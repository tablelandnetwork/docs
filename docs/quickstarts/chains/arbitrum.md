---
title: Arbitrum
description: An overview of using Arbitrum with Tableland.
keywords:
  - arbitrum
---

Arbitrum is one of the leading EVM-compatible Layer 2 solutions that Tableland currently supports. Check out the overview of what this network is and relevant information when using it, including Arbitrum One vs. Arbitrum Nova.

import { ChainSection } from '@site/src/components/SupportedChains'

## Overview

### Arbitrum One

Arbitrum One is a rollup scaling solution that works by [batching transactions](https://arbiscan.io/batches) from L2 to L1 at various intervals. Offchain transactions happen much more frequently and allow for very low costs and fast transaction confirmation times. Arbitrum operates a network of EVM-compatible nodes and uses fraud proofs to validate if the offchain transaction are valid, doing so in a way that inherits Ethereum’s security.

One key difference to note between Arbitrum and Optimism is that Arbitrum uses multi-round fraud proofs and single transaction disputes. This differs from single-round fraud proofs (e.g., Optimism) that execute the _entire rollup_ on Ethereum if a challenge is made.

### Arbitrum Nova

[Arbitrum Nova](https://nova.arbitrum.io/) enables ultra-low transaction fees through a _Data Availability Committee_. With games or certain apps, high transaction volume can make things cost prohibitive and diminish the user experience—but Nova helps address these issues. It becomes more scalable to build these types of onchain experiences, especially, when coupled with a decentralized SQL database like Tableland.

Thus, you can imagine how high volume applications can take advantage of both the speed and associated costs. Nova makes it much cheaper than, say, using Ethereum mainnet or even Arbitrum One, which would be too expensive to build applications with these requirements. Common use cases include gaming and anything with high volume requirements, such as social projects or dapp application data.

## Setup & resources

<ChainSection chainName='arbitrum-sepolia' />
<ChainSection chainName='arbitrum' />
<ChainSection chainName='arbitrum-nova' />

## Getting testnet funds

If you request testnet Ether from a faucet noted above, it should go direct to the testnet. However, you can also request funds from the Ethereum Sepolia testnet and bridge it. You must move the ETH from Ethereum to Arbitrum at the URL listed above—i.e., select "ETH" (or, as in the screenshot below, other ERC20 tokens that exist on Ethereum Sepolia can be bridged).

import bridge from "@site/static/assets/arb-sepolia.png"

<img src={bridge} width="80%"/>
