---
title: General FAQs
description: Review commonly asked questions about the Tableland network and community.
keywords:
  - faq
  - faqs
---

import { SupportedChains } from '@site/src/components/SupportedChains'

## Which chains does Tableland support?

Tableland is currently live on the following chains, and note that _writes_ to a table must come from the chain a table is a deployed on, but _reads_ can come from anywhere since a read query is an off-chain interaction that leverages the Tableland gateway:

<SupportedChains />

## Is Tableland accessible mainnet and/or testnet chains?

Yes, Tableland has _smart contracts_ deployed on both mainnets and testnets chains, making it accessible from any of the chains identified above. Both of these currently use the same "version" of the Tableland network. This allows developers to use Tableland while we get ready to fully launch in 2023. More on this below.

### Mainnets vs. testnets gateway

Be sure to use `https://tableland.network` on mainnets, and `https://testnets.tableland.network` on testnets.

At the protocol level, the Tableland network is separated such that nodes process and respond to SQL queries relative to each environment. If you were to use the `testnets` gateway on a mainnet chain / contract, this would lead to issues. The `testnets` gateway only queries tables that exist on testnet chains, whereas the `tableland.network` gateway only queries tables that exist on mainnet chains.

## Is the Tableland network in open beta or full production mode?

The Tableland network is currently in _open beta_ and will move into production in 2024—see more information on what this entails and the migration plan [here](/fundemetnals/about/open-beta). Between now and then, we’ll provide the proper migration resources after we properly prepare for the launch (e.g., tokenomics, adding to the protocol, further decentralizing the network, etc.).

## As a developer, how do I get testnet currency to use Tableland?

All testnet blockchains have offer "faucets" where testnet currencies are sent to a wallet’s address (with some imposed limit). Check out the following page for more details, which includes various links to faucets and other information: [here](/fundamentals/chains).

## What is a gateway?

Gateways enable users and developers to access the network without a full participating node; they’re available and used on many of the popular networks. For example, protocols like [The Graph](https://thegraph.com/docs/en/developer/querying-from-your-app/) and [Livepeer](https://livepeer.org/developers) run their own gateways to make it easy for developers to access the underlying networks; alternatively, if you’ve ever used [Infura](https://infura.io/) or [Alchemy](https://www.alchemy.com/), these are gateway services for connecting to networks like Ethereum, IPFS, Filecoin, and others. If you are interested in participating in our validator network, let us know on [Discord](https://discord.gg/dc8EBEhGbg)!

## What does _EVM compatible_ mean?

EVM stands for _Ethereum Virtual Machine_—it’s an execution environment for running smart contracts, and many chains now have EVM support (e.g., those listed above).

To provide some additional detail, Ethereum is a blockchain that can be thought of in terms of an _execution_ and _consensus_ environment. The intricacies behind these is not essential in order to use Tableland. The main thing to note is that many blockchains support the _execution_ part of Ethereum’s design, which is the EVM. When smart contracts are compiled & deployed on the blockchain, "nodes" (machines running Ethereum) store this information. Then, when someone calls the smart contract, all nodes run the contract’s code in the EVM. _Consensus_ is the process of all of the nodes agreeing on the outputs from the _execution_ process. Validators are a component in this aspect of decentralized networks, ensuring that everything comes to an agreement on state.

## What is a validator & what do validators do in Tableland?

Validators are machines that run the [Tableland Go client](https://github.com/tablelandnetwork/go-tableland), which is what processes SQL and communicates the results to other validators across Tableland’s network. Due to the network’s design, it inherits the both _execution_ and _consensus_ properties of the corresponding chain.

Namely, Tableland validators listen to events happening on the EVM compatible chain, specifically, coming from the Tableland "registry" smart contract that keeps track of Table `id`s and ownership. These are actually [ERC721](https://eips.ethereum.org/EIPS/eip-721) tokens where every table is minted on the base chain, which emits an event with SQL instruction — and then the Tableland validators listen for these event and respond accordingly. In other words, validators watch the base chain for SQL `CREATE` and `INSERT` statements, processes the SQL as any normal relational database would, and then communicate the results across the network.

## Do I have to pay to use the gateway?

Nope! The gateway is managed by Textile, the team that’s building Tableland. All queries made using the gateway are read-only and do not come with a cost component. Writes can only occur using the SDK, CLI, or direct smart contract calls to the Tableland registry contract.

## What is SQL?

SQL stands for "_Structured Query Language_"—it’s been around for [decades](https://en.wikipedia.org/wiki/SQL) and is used for managing data held in relational database management systems (RDBMS). Generally, you can use SQL statements to perform database tasks, such as adding new records, updating / deleting existing ones, or retrieving a specific subset of values. Tableland takes this common language and enables it in a web3-native setting, allowing anyone with prior SQL knowledge to build with it. Or, if you’re new to SQL, there are a plentiful amount of free resources to get up to speed! In fact, check out a couple of the linked resources in our docs under [databases & SQL](/fundamentals/databases).

## What is a relational database?

In a traditional context, _relational databases_ provide storage and access to structured data that are related to one another. Namely, tables hold rows and columns of data. Using SQL, tables can be created, updated, or "joined" with other tables using common keys between them (denoted as "primary keys"—Tableland doesn't support foreign keys). With Tableland, these traditional relational database capabilities are now possible using the base blockchain layer while maintaining decentralized network of validators that manage the database itself & communicate corresponding updates. It is a shared and permissionless database.

## Do I need a blockchain wallet to use Tableland?

If you want to create tables or mutate their values—yes! Tableland leverages the underlying blockchain for data management & user write permissions, so every _creation of_ or _mutation to_ a table must have an associated on-chain interaction. However, read queries can leverage the Tableland gateway, which is not on-chain operation and is served over HTTPS. Hence, a wallet connection is not required for table reads.

## Does Tableland support mutable or immutable data?

Both! With tableland's access control model, you get _mutable_ data (if you want) with _immutable_ on-chain access rules (if you want). It’s highly flexible do adapt to each and every use case.

## What are some of the primary use cases for Tableland?

For a detailed list of possible use cases, feel free to check out our [use cases](/fundamentals/about/use-cases) page. Tableland enables an endless number of possibilities, but some key areas of exploration include data attribution, Data DAOs, NFT projects / metadata, gaming, and anything else that needs a web3-native database.

## Where are tables hosted?

Currently, all tables are stored on a single node behind the Tableland gateway, unless you're running your own Tableland node and accessing the tables on your own. But, this will not be the case in the future! Tableland will be a decentralized network of validators that host tables; this validator network is being [further developed & launched](https://variant.fund/writing/progressive-decentralization-a-playbook-for-building) while the network itself is live and functional. Additional research and validator onboarding will help provide the mechanisms needed to fully decentralized the network for a 2024 production launch. Feel free to check out our plans and approach in our [public roadmap](/fundamentals/about/roadmap).

## How do I connect to Tableland?

Tableland has built a plug-and-play clients—SDK, smart contracts, REST API, and CLI—to interface with the Tableland network. You can dive into things with the [quickstarts guides](/fundamentals/quickstarts).

## How do I create tables in Tableland?

As with standard SQL, you pass a `CREATE TABLE` statement after establishing a database connection, which comes from either the SDK, smart contract calls, or CLI. This table gets owned by the EVM-based account that created the table and provides intrinsic ownership properties (ability to do whatever you want with the table).

## Is there a SQL specification that should be used when writing these queries?

Yes — Tableland understands a subset of SQL based on the [SQLite SQL language specification](https://www.sqlite.org/lang.html). Check out the full Tableland [SQL Specification](/specs/sql-specification) for more details.

## Can I call your smart contracts directly?

Of course—they’re deployed on open & decentralized blockchains ;). A common pattern is to create your own smart contract that implements a custom `Policy` defined in the `ITablelandController`. When calling the `runSQL` method in Tableland’s deployed `TablelandTables` smart contract, it checks this custom `Policy` for an address and uses this to determine if the address has the proper privileges to perform the SQL statement passed to `runSQL`.

## Do you have app / smart contract logic authentication?

We currently support address-level access control (EOAs or smart contracts). Contract-based access control allows a developer to delegate table gating to a separate contract, where it can do all sorts of things, like check ownership of a separate asset, do block-number checks, and just about any on-chain logic you can think of!

## What is Tableland Rigs NFT?

Rigs are an NFT that demonstrates what and how to build on Tableland. It showcases the latest and greatest about the Tableland tech, and it gives owners a unique experience in the community ([The Garage](https://garage.tableland.xyz/), Flight Time, voting on the [Pilot Program](https://tableland.xyz/pilot-program/), etc.). Be sure to [check out our website](https://tableland.xyz/rigs/) and [follow us on Twitter](https://twitter.com/tableland__) for the latest updates!

## Why should I connect my wallet to this docs site?

The docs site uses your address and interpolates its value in code snippets. This makes it easier to copy/paste code and use it in various quickstarts and examples. Also, additional functionality will be added to help even executing some code snippets directly in the docs site, such as creating tables (which will send the table ERC721 to the connected address).

## Is Textile the same as Tableland? What is the relationship between the two?

Tableland is an open network/protocol that has been initiated by the Textile team. It is a SQL-driven relational table model built for web3 and is a whole new thing, on its own. Textile, the org, still exists and will continue to usher Tableland into the wild to be its own thing, and Textile will also continue to be its own thing.

## Is the team behind Tableland still planning to maintain Textile tech, or is Tableland the new direction Textile is taking?

**TL;DR**—we encourage you to try Tableland, unless you are wanting to onboard the complexity of building a pure p2p app with Threads. We still think there's a role for Threads in the dev toolkit but believe Tableland will prove to be the right architecture for orchestrating app data.

Here's where things stand regarding our other projects:

- **_Textile's Threads_ —** this project is a p2p mongo-like db. It has no relationship to blockchain. It's open source, and used by many. The Textile team will continue to support OS development, but we are currently not dedicating internal time to building new features.
- **_Textile's Buckets_** — buckets are S3 bucket like objects for storing / sharing files built on top of Threads. The Textile team will continue to support OS development, but we are currently not dedicating internal time to building new features.
- **_Textile's Hub_** — the Hub started as an experiment to help on-board folks into Threads and Buckets. It features a web2 onboarding flow, and is gated by (very cheap) Stripe subscriptions. Unfortunately, the Hub onboarding almost worked too well — it ended up over shadowing the original goal of Threads and Buckets: to enable devs to build complex p2p apps.

We encourage you to try Tableland over Textile's Threads; in part, Tableland grew out of these learning experience. Pure p2p apps end up being significantly more complex than their web2 counterparts, requiring devs to learn new concepts. Instead of pushing them to a central "hub" that reduces complexity at the expense of decentralization, what if we could make a cloud-like db experience that married the ease of a remote "cloud" feel with the security of a user-owned decentralized network? There are other factors involved too, like a recognition that dapps can greatly benefit from using existing identities and tokens to control data access, which is not possible with Threads. And we believe SQL is fundamentally more interoperable than a document store. That's the gist of the Tableland mission.
