---
title: Why SQLite?
description: SQLite is widely accepted as one the most used databases due to it lightweight design and flexibility.
keywords:
  - sqlite
  - database
  - relational database
---

import ThemedImage from "@theme/ThemedImage";
import Link from "@docusaurus/Link";
import BenchmarkLight from "@site/static/assets/sqlite-benchmark-light-mode.png";
import BenchmarkDark from "@site/static/assets/sqlite-benchmark-dark-mode.png";
import DbTrends from "@site/static/assets/db-trends-twitter.png";

In essence, Tableland is a trustless, serverless database network and protocol. This network consists of isolated servers (nodes/validators) that serve database queries to localized databases. With SQLite, there are a few advantages to call out:

- Running a Tableland validator is a single process, so a node doesn't need to run multiple services to participate in the network.
- Extra monitoring required for the database since it’s part of the main validator process.
- SQLite requires fewer resources compared to a non-embedded database, making it cheaper and easier to run.
- There is a ton of tooling out there to help validators fine tune their setup, without complex code or SQL migration steps.

## Criteria

Ultimately, choosing a database for any application can be hard, comes with tradeoffs, and is often done "by trend." One should always start by enumerating application and/or network requirements. SQLite is _the only database_ that meets the following criteria:

1. **Portable data format**: Databases should be easy to load/unload from the network by users and the protocol itself, and to/from cold storage (Filecoin, etc.).
   1. SQLite databases are a **single file**. Note that technically, there are two in [Write-Ahead Log](https://www.sqlite.org/wal.html) ("WAL") mode (i.e., what Tableland validator nodes default to), but in the absence of connections, there is only one file per database. This makes them highly portable because they can be treated like a normal file.
   2. SQLite databases have a well-defined, cross-platform, and stable [file format](https://www.sqlite.org/fileformat2.html). Not only is this great for portability, but this file format is self-describing across platforms and even makes for a great [archive format](https://www.sqlite.org/sqlar.html).
2. **Durable**: Making backups of databases should be easy and not require complex workflows, operating systems, or format considerations.
   1. SQLite databases are easy to replicate via simple file copying (databases are self-contained files) or tooling like [Litestream](https://github.com/benbjohnson/litestream) and [LiteFS](https://fly.io/blog/introducing-litefs/) (see below for descriptions of these projects).
3. **Performant / scalable**: Client/server databases add significant latency to queries, and SQLite has no network. With correct tuning, it’s _much_ faster than Postgres—the most popular and performant open-source RDBMS.

   1. Below highlights benchmarking network latency for point query performance, comparing SQLite and various Postgres setups (using AWS). The same trends are also demonstrated when queries are ran in parallel.
   <figure>
     <ThemedImage
       alt="SQLite benchmarking"
       sources={{
           light: BenchmarkLight,
           dark: BenchmarkDark,
         }}
     />
     <figcaption> Source: <Link to="https://youtu.be/XcAYkriuQ1o?t=1754">
   GopherCon 2021: Ben Johnson - Building Production Applications Using Go & SQLite</Link></figcaption>
   </figure>
   2. Being an embedded database, SQLite sets up Tableland validators to (in the future) offer very fast compute over data without the need to touch a network. This amounts to the serverless and trustless experience for the target developers of the protocol. For reference, Cloudflare is also [onto this approach](https://blog.cloudflare.com/introducing-d1/) with SQLite and their web Workers.
   3. While SQLite supports concurrent reads to a single database, it does (currently) suffer from a single-writer problem and is, therefore, only recommended for applications that are read heavy and have write needs ≤ 100 query/s. However, in practice, these constraints are acceptable for 99% of applications. Tableland validators can be hosting hundreds or thousands of distinct databases, namespaced by application (with optionality for tenant isolation), serving writes concurrently between them. SQLite [recently shipped a limited notion of write concurrency](https://www.sqlite.org/src/doc/begin-concurrent/doc/begin_concurrent.md), but truly scalable concurrent writes to a single database is an active area of development. See [here](https://univalence.me/posts/mvsqlite) for one approach.
   4. There are a number of options for horizontal scaling individual SQLite databases:
      1. Table sharding via smart database design (parent/child tables to circumvent the 281 terabytes database size limit).
      2. Consistent hashing schemes like those used to power the [Kademlia algorithm](https://en.wikipedia.org/wiki/Kademlia).
   5. SQLite responds well to vertical scaling (adding more CPU and RAM).

4. **Full SQL spec coverage**: Contrary to popular belief, SQLite is no toy. It boasts [wide coverage](https://sqlite.org/fullsql.html) of the SQL spec.
5. **Easy to admin / maintain**: This is an especially important for a decentralized network run by many independent operators and should minimize the number of trip wires.
   1. SQLite _just works_. Very little configuration or maintenance is needed.
   2. The Tableland validator embeds SQLite and its minimal configuration. There is no RDBMS to deal with—just a single binary. There’s not extra monitoring required for the database since it’s part of the main validator process.
   3. SQLite doesn’t ship user management overhead or other bulky features that are not needed in Tableland.
   4. SQLite has no external dependencies.
   5. SQLite is some of the [most tested open-source code in the world](https://www.sqlite.org/testing.html).
   6. SQLite requires fewer resources compared to a non-embedded database, making it cheaper and easier to run.
6. **Fast and easy local app development and testing**: SQLite is a library that can be run in-memory, which allows for rapid local Tableland app development and testing before pushing to the paid network.
   1. Tableland developer tooling offers a Hardhat-like development environment that includes a local EVM and Tableland network, which wouldn't be possible without SQLite. Slow development and testing loops lead to unhappy developers.
   2. There are a number of great GUIs for SQLite that aid in local development, like [Beekeeper](https://www.beekeeperstudio.io/).
7. **Broad OS support (server, browser, mobile)**: SQLite is the worlds most deployed database. It runs everywhere: Linux-based servers, Windows, iOs, Android, [Cloudflare’s D1](https://blog.cloudflare.com/whats-new-with-d1/), and even in the browser ([it will replace Web SQL](https://twitter.com/ChromiumDev/status/1565105522092695553)).
   1. This is important, as Tableland aims to marry local application databases (which are almost always SQLite) and private hosted databases (like D1), with remote Tableland databases to create a hyper flexible data layer for web3 applications.
8. **Simple, modular and extensible**:
   1. SQLite has a simple and modular design. As Tableland grows, we need the flexibility of experimenting and quickly prototyping new language features or ideas.
   2. SQLite provides a native way of intercepting the file system API via [VFS](https://www.sqlite.org/vfs.html), which is provides flexibility as Tableland grows. [Others](https://fly.io/blog/introducing-litefs/) have explored different FUSE-based approaches.
9. **Big and growing community of open-source developers**: SQLite the most ubiquitous database in the world, used by billions of devices a day, and exciting open-source projects around SQLite pop up every day. Some highlights include:
   1. [Litestream](https://github.com/benbjohnson/litestream), streaming replication for SQLite.
   2. [LiteFS](https://fly.io/blog/introducing-litefs/), a successor to Litestream that adds replication at the level of transactions using a FUSE abstraction.
   3. [rqlite](https://github.com/rqlite/rqlite), a lightweight, distributed relational database built on SQLite.
   4. [dqlite](https://dqlite.io/), fast, embedded, persistent SQL database with Raft consensus.
   5. [mvSQLite](https://github.com/losfair/mvsqlite), MVCC SQLite that come with scalable read and write concurrency via SQLite’s OS interface, [VFS](https://www.sqlite.org/vfs.html).
   6. [BedrockDB](https://bedrockdb.com/), private blockchain-based distributed SQLite built by Expensify, used by millions of users.
   7. [AergoLite](https://github.com/aergoio/aergolite), SQLite with blockchain.
   8. [libSQL](https://libsql.org/), an [open source](https://github.com/libsql/libsql), open contribution fork of SQLite, looking at WASM user-defined functions, and other exciting features.
   9. D1 tooling ([workers-qb](https://workers-qb.massadas.com/), [d1-console](https://github.com/isaac-mcfadyen/d1-console)).
   10. Too many fun browser / WASM related projects to mention—here’s [one](https://github.com/jlongster/absurd-sql).
   11. New and improved drivers—here’s [one](https://github.com/tailscale/sqlite).
10. **Permissive license**: Tableland aims to be a user-owned “public good” layer of the internet. We need a license that permits this type of use. SQLite is _[public domain](https://www.sqlite.org/copyright.html)_.
11. **People love it**: There are more SQLite mentions on Twitter than Postgres!
    <figure>
      <img src={DbTrends} />
      <figcaption> Source: <Link to="https://twitter.com/judell/status/1559939635224096768">
      Twitter</Link></figcaption>
    </figure>

## SQLite usage & web3

Due to the points described above, there are a number of general use cases in which [developers use SQLite](https://www.sqlite.org/whentouse.html) today, including:

- Embedded devices and the IoT
- Edge computing
- Application file format (i.e., on-disk)
- Websites (with, potentially, millions of requests per day)
- Data analysis
- Cache for enterprise data
- Server-side database
- Data transfer format
- File archive and/or data container
- Replacement for ad hoc disk files
- Internal or temporary databases
- Education or training related (demos, testing, etc.)
- Experimental SQL language extensions

Note there are some scenarios in which SQLite isn't optimal. But, with Tableland's decentralized infrastructure, each node running a local instance of SQLite can provide fault tolerance and data redundancy, which can help to ensure data availability and durability. By streaming database creates/writes from a blockchain's event logs, each node can maintain a consistent and ordered copy of the database, which can help to prevent data inconsistency issues that might arise from concurrent updates. At a layer above the core database engine, other features around sharding, replication, triggers, etc. can help meet scalability needs and are actively being researched.

## Next steps

Aside from these generalized SQLite applications, check out the [use cases page](/fundamentals/use-cases/) for how developers use Tableland's web3-enabled SQLite!
