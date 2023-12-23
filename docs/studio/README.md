---
title: Overview
description: Build projects on Tableland with the Studio web app and accompanying CLI tool.
keywords:
  - studio
---

The [Tableland Studio](https://studio.tableland.xyz/) is a web application designed to make it easier to create and manage your tables. Developers can create projects, deploy tables, and interact with them from the browser, or you can choose to use the CLI tool to perform similar actions from the comfort of your command line. Best of all...the Studio is _using_ the Tableland protocol under the hood for things like storing the app's users, project, teams, and more in Tableland tables!

## Studio web app

When you visit the [Studio](https://studio.tableland.xyz/), you'll create a username and team. From this point forward, you can do a number of things:

- Create projects that house a set of tables.
- Create/use table blueprints, which are frameworks for deploying tables to testnet or mainnet chains.
- Deploy tables to a [supported EVM chain](/quickstarts/chains).
- Import _existing_ tables (e.g., created with the SDK or smart contracts) into the Studio to manage them within your project.
- Further inspect deployment information (table name, chain, transaction hash, etc.) and underlying table data.
- Create new teams that allow you to add collaborators to underlying projects.

Check out the [Studio web app docs](/studio/web/getting-started) for more details on how to use the app itself.

## Studio CLI

The `@tableland/studio-cli` npm package let's you interact with your teams, projects, and tables. Once you've logged into the Studio web app, you can use the CLI to perform similar actions from the command line. There are also utilities for importing data into tables, such as a CSV file, to make the developer experience even more seamless.

Check out the [Studio CLI docs](/studio/cli) for more details.
