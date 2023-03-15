---
title: Open beta
sidebar_position: 5
description: Use Tableland on testnet and mainnet chains while the protocol is in development.
synopsis: The Tableland network is actively being developed and plans to launch a production (mainnet) in 2024. Prior to that launch, the protocol can still be used on supported chains, but its important to note what's in store in the future.
keywords:
  - open beta
  - production
---

import { ChainsList } from '@site/src/components/SupportedChains'

## Synopsis

Tableland is currently in _open beta._ It’s live on many mainnet chains (including <ChainsList type={'mainnets'} format={'string'} />), allowing developers to use Tableland as their permissionless relational database. Tableland is planning to move into _production_ (the _Tableland_ mainnet) **in 2024 (subject to change)**. This launch will include a data migration process and introduces a new cost component for table writes.

During the open beta phase (between now and the production release), projects deployed on both testnet _and_ mainnet chains will, essentially, use the **_same_ Tableland network** (ignoring some validator node nuances). However, _only_ projects that created tables on _mainnet_ chains during the beta period will be migrated to production. The Tableland team will provide the necessary tooling and support for developers during this process.

:::caution
**SUBJECT TO CHANGE**—As Tableland grows in its adoption, there will be plenty of new learnings that _could_ impact the future migration plan. The following information is a _current-state_ overview of what the migration will look like. Please ensure you stay up to date with the latest Tableland news and our path from an open beta to a production release by tuning in on and [joining our Discord](https://discord.com/invite/dc8EBEhGbg).

:::

## Migrating to Production

### What tables are in scope?

**_Only projects using Tableland on mainnets will be in scope_**. Namely, tables that were minted on mainnet chains will be the only ones included in the transition plan from beta to production. This _should_ happen sometime in 2024, and we will do our best to deliver on the ensuing points.

### What will Tableland be responsible for?

**TL;DR**—Coordinating & executing the data migration from the Tableland beta environment to the production environment.

- Nodes will copy in scope table data from the database used during the open beta period to a new production-only database. Other protocol-level aspects will be accounted for.
- The data migration _should_ be handled automatically—if a table was minted on a mainnet chain, we will do our best to port the data from beta to production Tableland without any developer actions required.
- The Tableland team will also provide developer support, as needed.

### As a developer, what do I need to do?

**TL;DR**—The data migration process _should_ happen automatically (with one caveat), and we will do our best to auto-redirect queries from mainnet chains to the Tableland production environment…but to be safe, ensure you’ve taken the proper precautions.

- In terms of _moving table data_ deployed during the beta phase into production tables, we will do our best to ensure developers need to do—**nothing**. However, there is one caveat: Tableland _should_ handle the data migration process automatically for anything deployed on mainnet chains, but **_there may be a cost component_** introduced that would require developers to take action*.*
  - **Please be sure to read the section below** around production data availability and costs, as there are some actions noted there around table writes.
  - Also, as the Tableland network grows during the beta period, there are always new learnings that _could_ change the migration path to production. We don’t anticipate any issues or major changes to arise and will continue to focus our R&D efforts around this topic.
- If you referenced the testnets Tableland gateway during the beta (`https://testnets.tableland.network` or legacy `https://tesnet.tableland.network`) from within a mainnet chain deployment, update this value to point to the production gateway at `https://tableland.network`
  - We will make our best effort to auto-redirect queries to the right chain, but just to be certain, please make sure `baseURI` is updatable.
  - In particular, NFT smart contracts should be able to update their `baseURI`, `tokenURI`, or any other method that references the the `testnets` gateway on a mainnet contract.
- Another option is to future-proof your smart contracts to make sure [upgradeability patterns](https://docs.openzeppelin.com/upgrades-plugins/1.x/writing-upgradeable) are possible. This is not required but a potentially useful pattern to implement.
- Note—Since this is a future endeavor, documentation on how to make these changes in your project does not exist yet but will be shared closer to the migration date. In the meantime, check out OpenZeppelin’s `[Ownable](https://docs.openzeppelin.com/contracts/2.x/api/ownership#Ownable)` (e.g., an `onlyOwner` modifier for altering a `baseURI`) and [upgradable contracts](https://github.com/OpenZeppelin/openzeppelin-contracts-upgradeable).

### Are there costs involved?

**TL;DR**—There is not a cost to migrating data to Tableland’s production environment, and this process _should_ be automatic. There is, however, a cost to keeping data available in production, and this process is _not_ automatic (it requires the developer to take action) and is _not_ free.

- In terms of physically migrating the beta period’s data to the production database—**no**. The data migration _should_ happen automatically and does not require additional payment.
- In terms of updating smart contracts—**yes**. If you have a contract that, for example, must change an NFT’s `baseURI` variable to point to a new Tableland gateway, this cost must be handled by the developer and will not be covered by Tableland.
- **New!**—a new cost component will be introduced: _additional_ payment for writes.
  - With the Tableland production launch, there will be an additional cost for writing to tables that are stored by validator nodes. Thus, every write query comes with an on-chain transaction cost _plus_ an additional fee; this additive cost is still being researched.
  - For example, a table deployed on a mainnet chain during the beta period _should_ automatically be moved to a production table. Thus, once the table has transitioned, all _new_ writes from that point onward must take into account these new additive costs and will require developers to take action.

### Will there be "downtime"?

Tableland is a decentralized network, so validator nodes will already be live and running during the Tableland beta phase. The primary action validators must take is to copy the table data (from a database dedicated to the beta period) to a production database. Validators _should_ be able to seamlessly transition tables from the beta to production.

As with any software release that requires social coordination, we will do our best to make sure there are no bumps in the road.

### What happens to the open beta version of Tableland? Can I still use Tableland on testnet chains & contracts?

Yes, you can still use Tableland on testnet chains. With the production launch, two Tableland environments will exist: one intended for production, and one intended for testing. A validator’s database that was used during the open beta phase will transition to _only_ supporting testing-related environments, whereas before, a single database supported _both_ testnets and mainnets. Meaning, the database used during the beta phase will _only_ be used to support testnet chains.
