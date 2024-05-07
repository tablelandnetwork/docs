---
title: Polygon
description: An overview of using Polygon with Tableland.
keywords:
  - polygon
---

import { ChainSection } from '@site/src/components/SupportedChains'

Polygon is one of the EVM-compatible Layer 2 solutions that Tableland currently supports. Check out the overview of what this network is and relevant information when using it.

## Overview

[Polygon](https://polygon.technology/solutions/polygon-pos/) is a popular L2 scaling solution called a _[sidechain](https://ethereum.org/en/developers/docs/scaling/sidechains/#top)_. It has low transaction costs and high transaction speed & throughput, so many developers choose Polygon when designing cost effective applications that require a high transaction throughput or speed.

For comparison, Polygon supports 7k tx/s compared to Ethereum’s 15 tx/s and ~10000x lower costs per transaction than Ethereum. It’s important to note that sidechains do use _different_ security assumptions than the L1; it’s what allows Polygon to architect its network in a way that enables all of these benefits for developers. Nevertheless, it’s a great scaling solution.

## Setup & resources

<ChainSection chainName='polygon-amoy' />
<ChainSection chainName='polygon' />

### Getting testnet funds

Request testnet Matic from a faucet noted above. Note that bridging is not required since MATIC is the native token, not ETH.
