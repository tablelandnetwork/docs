---
title: Choosing a chain
description: Selecting a base chain is an important step in any application’s design and, especially, for tables.
keywords:
  - evm
  - chains
  - blockchains
---

Chain selection makes a significant impact on a table’s usability. Choose a chain that’s too slow or expensive, and it won’t be feasible for table writes to occur frequently. Deploy a cross-chain data model for value layering purposes, and certain on-chain access control features are lost.

Recall the following chains are currently supported and described in more detail in the subsequent pages:

import { ChainsList } from '@site/src/components/SupportedChains'

<ChainsList type={'mainnets'} format={'list'} />

:::tip

Review the [cost estimation](/fundamentals/architecture/cost-estimator) table that compares the costs of creates and writes across each chain.
:::

## Layer 1 vs. Layer 2

Ethereum (Layer 1, "L1") can be expensive. Tableland extends a base chain’s functionality so that writing data to the blockchain is cheap (stored in event logs) while the Tableland network makes this data functional. But, Ethereum will _always be_ more expensive as well as _slower_ when compared to its scaling solutions (Layer 2, "L2") — these technologies exist for a reason! There is [a ton of information on why L2s are needed](https://ethereum.org/en/layer-2/) to the point where these solutions are part of [Ethereum’s future roadmap](https://vitalik.ca/general/2021/12/06/endgame.html). Thus, choosing the right ETH L2 variant is important since Tableland is _an extension of_ the base chain and depends on the base chain’s execution, consensus, and security, which determine the speed of creating or writing to tables.

### L2 variants

The most commonly used L2 types come in two flavors: **rollups** and **sidechains**. Currently, Tableland supports rollups like Optimism & Arbitrum, which are both "optimistic" rollups. For reference, there also exists "[zero knowledge](https://ethereum.org/en/developers/docs/scaling/zk-rollups/)" ("zk") rollups. The primary difference between the two is that optimistic rollups _are_ optimistic; batches of transactions are posted on-chain and assumed valid (unless challenged via [_fraud proofs_](https://ethereum.org/en/glossary/#fraud-proof)). Zk-rollups provide the validity proof by design but are still nascent.

Both rollups and sidechains operate an off-chain network. L2 nodes are running the same execution layer as Ethereum ("EVM") and allow users to "bridge" assets to the L2 network using a bridging contract, which locks the assets up on the L1. As users are leveraging an app deployed on L2 for its scaling and associated cost benefits, the L2 data is posted back to Ethereum L1, periodically.

There is plenty of research and resources that describe considerations and differences between [optimistic rollups](https://ethereum.org/en/developers/docs/scaling/optimistic-rollups/), [zk-rollups](https://ethereum.org/en/developers/docs/scaling/zk-rollups/), and [sidechains](https://ethereum.org/en/developers/docs/scaling/sidechains/).

### Optimistic rollups

- Off-chain network of nodes running the EVM.
- On-chain smart contract bridge.
- Inherits L1 security.
- Actors periodically post batched transaction data (as _calldata_) to the L1, using the bridge contract.
- The bridge contract _self-enforces_ L2 transaction validity with [_fraud proofs_](https://ethereum.org/en/glossary/#fraud-proof) where _anyone_ can make a challenge to the data posted to L1 — if successful, the L2 re-executes the txs and updates the L2 state.

### Sidechains

- Off-chain network of nodes running the EVM.
- On-chain smart contract bridge.
- _Partially_ inherits L1 security but uses a separate consensus mechanism.
- Actors periodically post batched L2 transaction data (as _calldata_) to the L1, using the bridge contract.
- The correctness of the batched data posted to L1 is not openly challengeable nor self-enforcing but is managed by a set of trusted parties.

The main difference is whether the bridge contract can self-enforce the validity of transactions on the other network or if it must rely upon a trusted set of parties to attest that it is valid. For more information, check out the following [article](https://blog.infura.io/post/offchain-protocols-sidechains-and-rollups) (by Infura).

## EVM compatibility

Solutions that Tableland supports are all "EVM compatible." These are layers including or built on top of Ethereum that can still leverage Solidity smart contracts, wallets/addresses, and Ethereum-related libraries. For example, using a wallet on one EVM-compatible chain is possible on another, without much additional setup, besides configuring wallet settings and (likely) bridging assets from the L1 to the L2. Tableland _only_ supports EVM-compatible chains.

## Mainnets vs. testnets

In general, all chains have both a mainnet and testnet. Developers should first use a testnet to validate everything is working as expected, and once ready, move everything to production on mainnet. Testnet chains use testnet currency with no inherent value such that developers can request testnet currency for _free_ from _faucets_. Mainnets require _real_ currency to help provide the proper incentivization mechanisms and payment to nodes for computation and state management.

Be sure to use `https://tableland.network` on mainnets, and `https://testnets.tableland.network` on testnets. Learn more about why in the [gateway](gateway) docs.

## Providers

To interact with a chain, developers must run their own node or have access to one. Providers like [Infura](https://infura.io/), [Alchemy](https://www.alchemy.com/), and [Etherscan](https://etherscan.io/) operate a large pool of decentralized nodes and provide an API (centralized gateway) to them. They make it extremely easy to get started and develop web3 applications without needing to personally manage the hardware and software for a dedicated node.

Check out the following resources for each of these providers, and note that the Tableland SDK and CLI are both compatible with whatever [`ethers`](https://docs.ethers.org/v5/api/providers/) can support:

### Infura

- Status: [https://status.infura.io/](https://status.infura.io/)
- Docs: [https://docs.infura.io/infura/](https://docs.infura.io/infura/)

### Alchemy

- Status: [https://status.alchemy.com/](https://status.alchemy.com/)
- Docs: [https://docs.alchemy.com/](https://docs.alchemy.com/)

### Etherscan

- Status: [https://etherscan.freshstatus.io/](https://etherscan.freshstatus.io/)
- Docs: [https://docs.etherscan.io/](https://docs.etherscan.io/)

## Chain information

Dive into chain-specific overviews, with decision considerations and general chain information (chain ID, contracts, faucets, etc.).

import DocCardList from '@theme/DocCardList';

<DocCardList />
