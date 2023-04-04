---
title: Overview
description: Get started with playbooks that outline how to use Tableland SQL and other common concepts.
keywords:
  - playbooks
---

Tableland supports [SQLite](https://www.sqlite.org/fullsql.html) language compatibility with some unique limitations and enhancements. Any imposed language constraint is due to blockchain-related qualities and the requirement for deterministic state across any machine running the protocol. On the flip side, a couple of "magic" SQL functions can be used to insert chain-related data like block numbers and transaction hashes. Additional walkthroughs for concepts like NFT metadata and key-value store tables are also detailed.

## Using SQL

Whether or not you're new to SQL, you should still review some of the introductory docs. Namely, not all SQL is the same, so if you're coming from SQL _that's not_ SQLite, there are likely some some small differences here and there—although generally, the core concepts are the same. Once you have the basics down, you can then dive into the more tailored content that is more use case specific.

The intent of the [Core SQL](sql) section is to provide a general overview of how to do something with SQL. It is not a comprehensive as the specification itself provides the most up-to-date and detailed information. From there, additional docs outline how to use SQL from a design perspective (structuring tables and query formation).

:::tip
Be sure to review the [SQL specification](/specs/sql) once you understand the basics.
:::

## Related concepts

There are some key themes that pop up once you start developing. Scattered across the documentation, there may be more implementation-focused guides that demonstrate how to do this with actual code that's specific to the playbook itself.
