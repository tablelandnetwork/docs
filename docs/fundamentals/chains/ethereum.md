---
title: Ethereum
description: An overview of using Ethereum with Tableland.
keywords:
  - ethereum
---

import { ChainInfo } from '@site/src/components/SupportedChains'

Ethereum and its EVM is what drives Tableland's approach for chain compatibility. With its data and network hardness, it's a great case for many projects, but not all use cases can occur here due to cost and throughput constraints.

## Overview

Ethereum is the most popular and secure smart contract blockchain. All L2 solutions are built on top of Ethereum and run its virtual machine, called the [EVM](https://ethereum.org/en/developers/docs/evm/#top). Transaction costs are much higher on Ethereum and take longer to get included in a block, so many applications use L2s, depending on the use case.

Because of its security, data can be viewed as more valuable on this chain. A highly secure, battle-tested environment translates to greater reliability, so applications may choose to pay a premium for this. Thus, deploying tables here is best used in higher value use cases and/or if on-chain access controls _specific to Ethereum_ are needed (e.g., verifying ownership of an Ethereum-based NFT).

## Setup & resources

### Ethereum (mainnet)

- Average block time: 13.5 seconds
- Chain ID: <ChainInfo chain='mainnet' info='chainId' />
- Symbol: ETH
- Status Dashboard:
  - [https://ethstats.net/](https://ethstats.net/)
- Block Explorer:
  - [https://etherscan.io/](https://etherscan.io/)
- Gas Station:
  - [https://etherscan.io/gastracker](https://etherscan.io/gastracker)
- RPC URL:
  - See [https://chainlist.org/chain/1](https://chainlist.org/chain/1)
- Tableland contract address: <ChainInfo chain='mainnet' info='contractAddress' />
- SDK network name: <ChainInfo chain='mainnet' info='chainName' /> or <ChainInfo chain='homestead' info='chainName' />
- Tableland gateway: <ChainInfo chain='mainnet' info='baseUrl' />

### Goerli (testnet)

- Average block time: 13.5 seconds
- Chain ID: <ChainInfo chain='goerli' info='chainId' />
- Symbol: ETH
- Status Dashboard:
  - [https://stats.goerli.net/](https://stats.goerli.net/)
- Block Explorer:
  - [https://goerli.etherscan.io/](https://goerli.etherscan.io/)
- Faucet:
  - [https://goerlifaucet.com/](https://goerlifaucet.com/)
  - [https://faucet.paradigm.xyz/](https://faucet.paradigm.xyz/)
- RPC URL:
  - See [https://chainlist.org/chain/5](https://chainlist.org/chain/5)
- Tableland contract address: <ChainInfo chain='goerli' info='contractAddress' />
- SDK network name: <ChainInfo chain='goerli' info='chainName' />
- Tableland gateway: <ChainInfo chain='goerli' info='baseUrl' />

#### Getting testnet funds

1. Request testnet Ether from a faucet noted above (e.g., [here](https://goerlifaucet.com/) or [here](https://faucet.paradigm.xyz/)).
2. Move the ETH from Ethereum to Optimism at [https://app.optimism.io/bridge](https://app.optimism.io/bridge)—i.e., select "ETH" or any other ERC20 tokens that exist on Ethereum Goerli that can be bridged.
