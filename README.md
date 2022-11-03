# Tableland Specifications

<h1 align="center">
  <img src="https://ucaa2378a630ffc982346c73f24a.previews.dropboxusercontent.com/p/thumb/ABsuf_fnuOX82jhbky25zwpYL57KGVKTNVLWplbJmBFfSpoqYLT8fBnLPlYoyN8F-mLCtm5XhaqB7UEN8Qpsl5sdRzUPuiKUosGGf-6VHoGxSSsJdFWWAobxkAvqRxA8IvQdeAF8bGDmP5gR9TIUjsf4N9CUl8PLx0h3pivFOPy8rSXr27fjzpDD5Ec_MWIAYEd-OpXrd5xFrXqirIp8tmmVNNHL8hAbZAIGQttTsvBkTUnW5h6FAJSeoJ-VcfyGqeLDvGGnOtgHEjWiS3f1hthVSJqoTMtzJ4OuBmAJO2f0udPdqT9CwY7RbyiHMbIcqo1PYSNLVhLITCq2D0-RdWa0rfvLoSMxSPGSC-4-1UUZL1L8rSjemxSVkDJEJCAaJ_E/p.png" style="width:250px;" alt="libp2p logo"/>
</h1>

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

## Background

This repository hosts the [Tableland](https://tableland.xyz/) protocol specifications. The following label system is used to help identify the current state of each spec:

- ![wip](https://img.shields.io/badge/status-wip-orange.svg?style=flat-square) → A work-in-progress. It may be used to describe an idea before actually committing to a full draft of the spec.
- ![draft](https://img.shields.io/badge/status-draft-yellow.svg?style=flat-square) → A draft that is ready to review and implementable.
- ![stable](https://img.shields.io/badge/status-stable-brightgreen.svg?style=flat-square) → A spec that has been adopted (implemented). It might be improved but should not change fundamentally.

## Index

### [SQL specification](specs/sql/)

These specs define the SQL language compliant with the Tableland protocol. It is a subset of the [SQLite SQL language specification](https://www.sqlite.org/lang.html), with additional constraints specific to Tableland operations. It does omit many features while at the same time adds a few features of its own.

## Documentation & Support

For user support, please see the official [Documentation](https://docs.tableland.xyz/) and/or join the [Tableland Discord](https://t.co/m1ItWcJTLG).

## Contributing

PRs accepted.

## License

MIT AND Apache-2.0, © 2021-2022 Tableland Network Contributors
