---
title: FAQs
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

### Mainnets vs. Testnets Gateway

Be sure to use `https://tableland.network` on mainnets, and `https://testnets.tableland.network` on testnets.

At the protocol level, the Tableland network is separated such that nodes process and respond to SQL queries relative to each environment. If you were to use the `testnets` gateway on a mainnet chain / contract, this would lead to issues. The `testnets` gateway only queries tables that exist on testnet chains, whereas the `tableland.network` gateway only queries tables that exist on mainnet chains.

## Is the Tableland network \*\*in open beta or full production mode?

The Tableland network is currently in _open beta_ and will move into production in 2023 — see more information on what this entails and the migration plan [here](/concepts/network/open-beta). Between now and then, we’ll provide the proper migration resources after we properly prepare for the launch (e.g., tokenomics, adding to the protocol, further decentralizing the network, etc.).

## As a developer, how do I get testnet currency to use Tableland?

All testnet blockchains have offer "faucets" where testnet currencies are sent to a wallet’s address (with some imposed limit). Check out the following page for more details, which includes various links to faucets and other information: [here](/develop/chains).

## What is a gateway?

Gateways enable users and developers to access the network without a full participating node; they’re available and used on many of the popular networks. For example, protocols like [The Graph](https://thegraph.com/docs/en/developer/querying-from-your-app/) and [Livepeer](https://livepeer.org/developers) run their own gateways to make it easy for developers to access the underlying networks; alternatively, if you’ve ever used [Infura](https://infura.io/) or [Alchemy](https://www.alchemy.com/), these are gateway services for connecting to networks like Ethereum, IPFS, Filecoin, and others. If you are interested in participating in our validator network, let us know on [Discord](https://discord.gg/dc8EBEhGbg), and we’ll keep you updated as we approach that time!

## What does _EVM compatible_ mean?

EVM stands for _Ethereum Virtual Machine_ — it’s an execution environment for running smart contracts, and many chains now have EVM support (e.g., those listed above).

To provide some additional detail, Ethereum is a blockchain that can be thought of in terms of an _execution_ and _consensus_ environment. The intricacies behind these is not essential in order to use Tableland. The main thing to note is that many blockchains support the _execution_ part of Ethereum’s design, which is the EVM. When smart contracts are compiled & deployed on the blockchain, "nodes" (machines running Ethereum) store this information. Then, when someone calls the smart contract, all nodes run the contract’s code in the EVM. _Consensus_ is the process of all of the nodes agreeing on the outputs from the _execution_ process. Validators are a component in this aspect of decentralized networks, ensuring that everything comes to an agreement on state.

## What is a validator & what do validators do in Tableland?

Validators are machines that run the [Tableland Go client](https://github.com/tablelandnetwork/go-tableland), which is what processes SQL and communicates the results to other validators across Tableland’s network. Due to the network’s design, it inherits the both _execution_ and _consensus_ properties of the corresponding chain.

Namely, Tableland validators listen to events happening on the EVM compatible chain, specifically, coming from the Tableland "registry" smart contract that keeps track of Table `id`s and ownership. These are actually [ERC721](https://eips.ethereum.org/EIPS/eip-721) tokens where every table is minted on the base chain, which emits an event with SQL instruction — and then the Tableland validators listen for these event and respond accordingly. In other words, validators watch the base chain for SQL `CREATE` and `INSERT` statements, processes the SQL as any normal relational database would, and then communicate the results across the network.

## What is a relay?

A _relay_ is the process of using an intermediary to send a transaction. On testnet chains, relaying makes it very easy for developers to use Tableland since the default option is for a Tableland _validator node_ to relay the transaction. Thus, the account / wallet sending the transaction _does not_ need to pay for the _testnet_ transaction. Note that various SDK methods, such as `write`, can have the `rpcRelay` set at the method-level, taking precedence of the option set in the top-level `connect`.

:::tip
**Mainnet transactions _are not free_** and cannot be relayed. Relays provide a free experience while testing and are a _testnet only_ _feature_ where Tableland validator nodes pay for the testnet transaction to be sent.

:::

## Do I have to pay gas fees to use the gateway?

Nope! The gateway is managed by Textile, the team that’s building Tableland. All queries made using the gateway are subsidized to ensure a gas-free experience, but note that requests are rate limited. To get around any limits, developers can choose to, instead, call the Tableland registry smart contract directly and pay the associated gas fees.

## What is SQL?

SQL stands for "Structured Query Language" — it’s been around for [multiple decades](https://en.wikipedia.org/wiki/SQL) and is used for managing data held in relational database management systems (RDBMS). Generally, you can use SQL statements to perform database tasks, such as adding new records, updating/deleting existing ones, or retrieving a specific subset of values. Tableland takes this common language and enables it in a web3-native setting, allowing anyone with prior SQL knowledge to build with it. Or, if you’re new to SQL, there are a plentiful amount of free resources to get up to speed! In fact, check out a couple of the linked resources in our docs under [databases & SQL](/concepts/related/databases).

## What is a relational database?

In a traditional context, _relational databases_ provide storage and access to structured data that are related to one another. Namely, each row in a table is a record with a unique ID called a "key"; each column of a table holds an attribute for each of these records. Using SQL, tables can be created, updated, or "joined" with other tables using common keys between them (denoted as "primary" and "foreign" keys). With Tableland, these traditional relational database capabilities are now possible using the base blockchain layer while maintaining decentralized network of validators that manage the database itself & communicate corresponding updates.

## Do I need a wallet to use Tableland?

If you are a developer who’s creating tables on Tableland _or_ if you are a user who’s trying to write to (update) a table — then yes! Tableland leverages the underlying blockchain for user management & permissions, so every _creation of_ or _mutation to_ a table must have an associated on-chain address. However, read queries can leverage the Tableland gateway, which is not on-chain operation and is served over HTTPS. Hence, a wallet connection is not required for table reads that use the gateway.

## Does Tableland support mutable or immutable data?

Both! With tableland's access control model, you get _mutable_ data (if you want) with _immutable_ on-chain access rules (if you want). It’s highly flexible do adapt to each and every use case.

## \***\*What are some of the primary use cases for Tableland?\*\***

For a detailed list of possible use cases, feel free to check out our [use cases](/concepts/network/use-cases) page. Tableland enables an endless number of possibilities, but some key areas of exploration include NFT projects, gaming, metaverse experiences, memberships, and DAOs. For example:

- **_NFT metadata_** — natively dynamic NFTs using tables hosted on Tableland, where each row holds the metadata (name, image, attributes, etc.) for that specific NFT, and these can mutate over time (i.e., smart contract updates table values upon owner’s contributions)
- **_In-game inventory/assets_** — allow users to add to a table of their character’s possessions or choose to equip specific attributes/customizations (i.e., granting users write permissions for specific table’s columns & rows)
- **_DAO shared state & access_** — use tables deployed on Tableland to act as a shared knowledge base or shared dataset across organizations, where only DAO members have permissions to update the table (e.g., non-members can only read the data, DAO members can update, and members leaving a DAO have their permissions revoked)

## Where are tables hosted?

Currently, all tables are stored on a single node behind a gateway, but they will not be in the future! Tableland will be a decentralized network of validators that host tables; note that the smart contracts and full suite of capabilities are live while this validator network is [developed & launched in parallel](https://variant.fund/writing/progressive-decentralization-a-playbook-for-building). Feel free to check out our plans & approach in our [public roadmap](/concepts/related/roadmap).

## How do I connect to Tableland?

Tableland has built some plug-and-play [SDKs](/develop/sdk) and [CLI](/develop/cli) to interface with the Tableland Network. For example, the SDK allows developers to easily set a connection with Tableland and use the database within a client-side or backend application.

## How do I create tables in Tableland?

Head over to our [develop](/develop/) section, but the process is very straightforward—call some create method after establishing a connection to the base chain and pass in the SQL statement. This can be done with clients like the SDK, CLI, or smart contract calls. Once a table is created, it can be access by directly connecting to the Tableland network.

## Is there a SQL specification that should be used when writing these queries?

Yes — Tableland understands a subset of SQL based on the [SQLite SQL language specification](https://www.sqlite.org/lang.html); check out the full Tableland [SQL Specification](/concepts/sql/sql-spec) for more details.

## Can I call your smart contracts directly?

Of course — they’re deployed on open & decentralized blockchains ;). A common pattern is to create your own smart contract that implements a custom `Policy` defined in the `ITablelandController`. When calling the `runSQL` method in Tableland’s deployed `TablelandTables` smart contract, it checks this custom `Policy` for an address and uses this to determine if the address has the proper privileges to perform the SQL statement passed to `runSQL`.

## Do you have app / smart contract logic authentication?

We currently support address-level access control, but we do plan to add contract-based access control (among other controls). Contract-based access control would allow a developer to delegate table gating to a separate contract, where it could do all sorts of things, like check ownership of a separate asset, do block-number checks, and just about any on-chain logic you can think of!

## What are Tableland Rigs (NFT)?

Rigs provide a way to embed NFT utility into the Tableland protocol itself. More information will come out about Rigs over time, but feel free to check out the Rigs intro post [here](https://mirror.xyz/tableland.eth/gY70MyXCFjhqwn5NuPRYMvcC1kJUSvfDPmor9HBTJt0), and [follow us on Twitter](https://twitter.com/tableland__) for the latest updates.

## What is a "Season" and organization-related semver?

Tableland uses [semantic versioning](https://semver.org/) for the evolution of the entire organization. When you see a Tableland org version, you can read it as {Season}.{Milestone}.{Checkpoint}. Seasons are generally 12 weeks long, Milestones are 6, and Checkpoints are 2. This versioning is used in written tutorials and engineering release summaries from Tableland’s [technical blog](https://dev.tableland.xyz/), among others, so it’s useful to at least have this context.

## Is Textile the same as Tableland? What is the relationship between the two?

Tableland is an open network/protocol that has been initiated by the Textile team. It is a SQL-driven relational table model built for web3. It is a whole new thing, on its own. Textile, the org, still exists and will continue to usher Tableland into the wild to be its own thing. Textile will also continue to be its own thing. All Textile tech (Threads, Buckets, Mailbox, Hub, etc.) will continue to thrive.

## Is the team behind Tableland still planning to maintain Textile tech, or is Tableland the new direction Textile is taking?

**TL;DR**—we encourage you to try Tableland, unless you are wanting to onboard the complexity of building a pure p2p app with Threads. We still think there's a role for Threads in the dev toolkit but believe Tableland will prove to be the right architecture for orchestrating app data.

Here's where things stand regarding our other projects:

- **_Textile's Threads_ —** this project is a p2p mongo-like db. It has no relationship to blockchain. It's open source, and used by many. The Textile team will continue to support OS development, but we are currently not dedicating internal time to building new features.
- **_Textile's Buckets_** — buckets are S3 bucket like objects for storing / sharing files built on top of Threads. The Textile team will continue to support OS development, but we are currently not dedicating internal time to building new features.
- **_Textile's Hub_** — the Hub started as an experiment to help on-board folks into Threads and Buckets. It features a web2 onboarding flow, and is gated by (very cheap) Stripe subscriptions. Unfortunately, the Hub onboarding almost worked too well — it ended up over shadowing the original goal of Threads and Buckets: to enable devs to build complex p2p apps.

We encourage you to try Tableland over Textile's Threads; in part, Tableland grew out of these learning experience. Pure p2p apps end up being significantly more complex than their web2 counterparts, requiring devs to learn new concepts. Instead of pushing them to a central "hub" that reduces complexity at the expense of decentralization, what if we could make a cloud-like db experience that married the ease of a remote "cloud" feel with the security of a user-owned decentralized network? There are other factors involved too, like a recognition that dapps can greatly benefit from using existing identities and tokens to control data access, which is not possible with Threads. And we believe SQL is fundamentally more interoperable than a document store. That's the gist of the Tableland mission.
