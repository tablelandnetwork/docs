# Tableland Specifications

![image](https://user-images.githubusercontent.com/6136245/153219831-53b05f19-1ac2-4523-b564-0686e2078d4d.png)

![stable](https://img.shields.io/badge/status-stable-brightgreen.svg?style=flat-square)
<a href="http://textile.io"><img src="https://img.shields.io/badge/made%20by-Textile%20-blue.svg?style=flat-square" /></a>

Tableland is a permissionless, serverless relational database protocol. It is a multi-chain deployable, cross-chain compatible network of validator nodes that sits besides blockchains and acts as an extension thereof. Nodes materialize event-based smart contract SQL instructions in local instances of SQLite (with some constraints) and share state accordingly. A decentralized approach toward enabling mutable, queryable, and composable data via SQL.

The network is currently in open beta and can currently be used on multiple testnet and mainnet chains.

## Table of Contents

- [Background](#background)
- [Index](#index)
- [Documentation & Support](#documentation--support)
- [Contributing](#contributing)
- [License](#license)

# Background

This repository hosts the [Tableland](https://tableland.xyz/) protocol specifications. The following label system is used to help identify the current state of each spec:

- ![wip](https://img.shields.io/badge/status-wip-orange.svg?style=flat-square) → A work-in-progress. It may be used to describe an idea before actually committing to a full draft of the spec.
- ![draft](https://img.shields.io/badge/status-draft-yellow.svg?style=flat-square) → A draft that is ready to review and implementable.
- ![stable](https://img.shields.io/badge/status-stable-brightgreen.svg?style=flat-square) → A spec that has been adopted (implemented). It might be improved but should not change fundamentally.

# Index

## [SQL specification](specs/sql/)

These specs define the SQL language compliant with the Tableland protocol. It is a subset of the [SQLite SQL language specification](https://www.sqlite.org/lang.html), with additional constraints specific to Tableland operations. It does omit many features while at the same time adds a few features of its own.

### Building

The SQL specification document can be generated from its parts via:

```bash
cd specs/sql
pandoc -s --toc \
    -t gfm+tex_math_dollars\
    -f gfm+tex_math_dollars \
    -B Header.md \
    StatementTypes.md \
    DataTypes.md \
    -o README.md
```

# Documentation & Support

For user support, please see the official [Documentation](https://docs.tableland.xyz/) and/or join the [Tableland Discord](https://t.co/m1ItWcJTLG).

# Contributing

PRs accepted.

# License

MIT AND Apache-2.0, © 2021-2022 Tableland Network Contributors
