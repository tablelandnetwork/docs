---
title: Using a local chain
sidebar_label: Local node
description: An overview of using a Hardhat node and a local Tableland instance.
keywords:
  - local tableland
  - hardhat
---

import { ChainInfo } from '@site/src/components/SupportedChains'

Developing locally should happen as a step prior to deploying to any testnet and/or mainnet. Developers can use Local Tableland to accomplish this, which spins up a Hardhat node for a local Tableland node to use.

## Overview

Local development helps streamline the engineering process through quick iteration and testing. A local node, such as one provided by [Hardhat](https://hardhat.org/), can be used with any of the Tableland clients (SDK, CLI, REST API, smart contracts).

:::tip
Check out the page about [Local Tableland](/develop/tools/local-tableland) to understand how to set up a local-only environment with both a local Hardhat and Tableland node.
:::

### Local node

- Average block time: configurable
- Chain ID: <ChainInfo chain='local-tableland' info='chainId' />
- Symbol: ETH
- RPC URL: http://localhost:8545
- Tableland contract address: <ChainInfo chain='local-tableland' info='contractAddress' />
- SDK network name: <ChainInfo chain='local-tableland' info='chainName' />
- Tableland gateway: <ChainInfo chain='local-tableland' info='baseUrl' />
