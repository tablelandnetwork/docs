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
- Block depth: 1
- Average SQL materialization time: 30-40 seconds
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

### Sepolia (testnet)

- Average block time: 13.5 seconds
- Block depth: 1
- Average SQL materialization time: 30-40 seconds
- Chain ID: <ChainInfo chain='sepolia' info='chainId' />
- Symbol: ETH
- Status Dashboard:
  - N/A
- Block Explorer:
  - [https://sepolia.etherscan.io/](https://sepolia.etherscan.io/)
- Faucet:
  - [https://sepoliafaucet.com/](https://sepoliafaucet.com/)
  - [https://faucet.paradigm.xyz/](https://faucet.paradigm.xyz/)
  - [https://faucet.chainstack.com/sepolia-faucet](https://faucet.chainstack.com/sepolia-faucet)
- RPC URL:
  - See [https://chainlist.org/chain/11155111](https://chainlist.org/chain/11155111)
- Tableland contract address: <ChainInfo chain='sepolia' info='contractAddress' />
- SDK network name: <ChainInfo chain='sepolia' info='chainName' />
- Tableland gateway: <ChainInfo chain='sepolia' info='baseUrl' />

#### Getting testnet funds

1. Request testnet Ether from a faucet noted above (e.g., [here](https://sepoliafaucet.com/) or [here](https://faucet.paradigm.xyz/)).
2. Move the ETH from Ethereum to Optimism at [https://app.optimism.io/bridge](https://app.optimism.io/bridge)—i.e., select "ETH" or any other ERC20 tokens that exist on Ethereum Goerli that can be bridged.
