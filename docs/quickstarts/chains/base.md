---
title: Base
description: An overview of using Base with Tableland.
keywords:
  - optimism
---

import { ChainSection } from '@site/src/components/SupportedChains'

Base is a Layer 2 chain—and currently, **_only_** Base Sepolia is supported (i.e., no mainnet support, yet). Check out the overview of what this network is and relevant information when using it.

## Overview

[Optimism](https://www.base.org/) is an [optimistic rollup](https://ethereum.org/en/developers/docs/scaling/optimistic-rollups/) built with Optimism's OP stack. Note that developers must bridge assets from Ethereum to Base to take advantage of the faster transaction confirmation speeds and low costs.

## Setup & resources

<ChainSection chainName='base-sepolia' />

### Getting testnet funds

If you request testnet Ether from a faucet noted above, it should go direct to the testnet. However, you can also request funds from the Ethereum Sepolia testnet and bridge it. You must move the ETH from Ethereum to Base at the URL listed above—i.e., select "ETH" (or, as in the screenshot below, other ERC20 tokens that exist on Ethereum Sepolia can be bridged).
