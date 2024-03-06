---
title: Ethereum
description: An overview of using Ethereum with Tableland.
keywords:
  - ethereum
---

import { ChainSection } from '@site/src/components/SupportedChains'

Ethereum and its EVM is what drives Tableland's approach for chain compatibility. With its data and network hardness, it's a great case for many projects, but not all use cases can occur here due to cost and throughput constraints.

## Overview

Ethereum is the most popular and secure smart contract blockchain. All L2 solutions are built on top of Ethereum and run its virtual machine, called the [EVM](https://ethereum.org/en/developers/docs/evm/#top). Transaction costs are much higher on Ethereum and take longer to get included in a block, so many applications use L2s, depending on the use case.

Because of its security, data can be viewed as more valuable on this chain. A highly secure, battle-tested environment translates to greater reliability, so applications may choose to pay a premium for this. Thus, deploying tables here is best used in higher value use cases and/or if onchain access controls _specific to Ethereum_ are needed (e.g., verifying ownership of an Ethereum-based NFT).

## Setup & resources

<ChainSection chainId='11155111' />
<ChainSection chainId='1' />
