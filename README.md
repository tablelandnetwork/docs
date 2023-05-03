# Tableland Docs

[![License](https://img.shields.io/github/license/tablelandnetwork/docs.svg)](./LICENSE)
[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg)](https://github.com/RichardLitt/standard-readme)
[![](https://img.shields.io/badge/made%20by-Textile%20-blue.svg?style=flat-square)](http://textile.io)

> The official documentation for the Tableland protocol.

## Table of Contents

- [Background](#background)
- [Usage](#usage)
- [Development](#development)
  - [Build](#build)
  - [Specifications](#specifications)
  - [Caching](#caching)
- [Contributing](#contributing)
- [License](#license)

## Background

This repository hosts the official [Tableland](https://tableland.xyz/) documentation and protocol specifications. Tableland is a decentralized database built on the SQLite engine, providing developers with a web3-native, relational database that easily integrates into their stack. The Tableland docs describe fundamental network concepts, how to use the protocol across various clients (SDK, CLI, APIs), operating your validator node, tutorials, and much more.

The docs site is built with [Docusaurus 2](https://docusaurus.io/)—a React static site generator—and uses Markdown files in the `docs` directory. Protocol specs for SQL and the validator Gateway API are located in the `specs` directory:

- [SQL](specs/sql/): These specs define the SQL language compliant with the Tableland protocol. It is a subset of the [SQLite SQL language specification](https://www.sqlite.org/lang.html), with additional constraints specific to Tableland operations. It does omit many features while at the same time adds a few features of its own.
- [Gateway API](specs/validator/): These specs define the Tableland validator node's REST API for the Tableland protocol. It allows for various table queries and validator-related information to be retrieved using an HTTPS Gateway.

The following label system is used to help identify the current state of each spec:

- ![wip](https://img.shields.io/badge/status-wip-orange.svg?style=flat-square) → A work-in-progress. It may be used to describe an idea before actually committing to a full draft of the spec.
- ![draft](https://img.shields.io/badge/status-draft-yellow.svg?style=flat-square) → A draft that is ready to review and implementable.
- ![stable](https://img.shields.io/badge/status-stable-brightgreen.svg?style=flat-square) → A spec that has been adopted (implemented). It might be improved but should not change fundamentally.

## Usage

The Tableland docs site is deployed and hosted with Vercel, and it's available at [https://docs.tableland.xyz/](https://docs.tableland.xyz/), which also includes the generated specs as site content.

## Development

To develop locally, first do the following:

1. Use `npm` to install dependencies: `npm install`
2. (Optional) If you are a core contributor and have access to the official Algolia and Fathom variables defined in the `.env` file, update them. But, local-only development should not need them to be configured as these are needed for production only.

Then, start the site for local development, which should open up on `http://localhost:3000` and update upon component or `docs` directory changes:

```bash
npm run start
```

### Build

It's important to also build and serve the site locally as this may uncover static site compatability issues that should, instead, be handled by a [custom plugin](https://docusaurus.io/docs/advanced/plugins). Perform this with the following commands as a final step during development:

```bash
npm run build
npm run serve
```

A production build uses these commands as well.

### Specifications

The SQL specification is split into a few separate files. A single README document can be generated from its parts by doing the following:

```shell
cd specs/sql
pandoc -s --toc \
    -t gfm+tex_math_dollars\
    -f gfm+tex_math_dollars \
    -B Header.md \
    StatementTypes.md \
    DataTypes.md \
    Encoding.md \
    -o README.md
```

The Gateway API is defined by an OpenAPI specification document, which is also used to generate clients and services that drive the Tableland validator. The OpenAPI spec can be used to generate Markdown documentation by running the following, which first generates a `Specification.md` file and then combines it to produce a single README:

```shell
npm i -g widdershins
cd specs/validator
widdershins tableland-openapi-spec.yaml \
    --omitHeader \
    --summary \
    --language_tabs 'shell:curl:curl' \
    -o Specification.md
pandoc -s --toc --toc-dept 2 -t gfm \
    -B Header.md \
    Specification.md \
    -o README.md
```

### Caching

Deployments leverage caching to improve build times—the following will be generated locally but are ignored via the `.gitignore` file:

- `.docusaurus`: caches the site structure upon each `build` process completion.
- `build`: caches static site assets.
- `node_modules`: caches `node_modules` and updates upon changes to package dependencies.

## Contributing

PRs accepted. Please review additional details explained in the [contributing](https://docs.tableland.xyz/contribute) section of the docs site.

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

MIT AND Apache-2.0, © 2021-2022 Tableland Network Contributors
