---
title: Optimism
description: An overview of using Optimism with Tableland.
keywords:
  - optimism
---

import { ChainSection } from '@site/src/components/SupportedChains'

Optimism is one of the EVM-compatible Layer 2 solutions that Tableland currently supports. Check out the overview of what this network is and relevant information when using it.

## Overview

[Optimism](https://www.optimism.io/about) is an [optimistic rollup](https://ethereum.org/en/developers/docs/scaling/optimistic-rollups/) built on top of Ethereum. It is a sidechain that inherits Ethereum’s security but operates as a separate protocol with its own set of nodes running. Rollups sequencers batch transactions onto the L1 [at various intervals](https://optimistic.etherscan.io/batches) and leverage [fraud proofs](https://ethereum.org/en/glossary/#fraud-proof) for self-enforced validation of the offchain transaction.

Offchain, the transactions happen much quicker than the batching. Note that developers must bridge assets from Ethereum to Optimism to take advantage of the faster transaction confirmation speeds and low costs.

## Setup & resources

<ChainSection chainId='420' />
<ChainSection chainId='10' />

#### Getting testnet funds

1. Request testnet Ether from a faucet noted above (e.g., [here](https://goerlifaucet.com/) or [here](https://faucet.paradigm.xyz/)).
2. Move the ETH from Ethereum to Optimism at [https://app.optimism.io/bridge](https://app.optimism.io/bridge)—i.e., select "ETH" or any other ERC20 tokens that exist on Ethereum Goerli that can be bridged.
