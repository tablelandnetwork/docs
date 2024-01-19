---
title: Studio FAQs
sidebar_label: FAQs
description: Review commonly asked questions about the Tableland Studio.
keywords:
  - faq
  - faqs
---

## What is the Tableland Studio?

The Studio is a web app that lets you create projects that organize your tables, plus, enable easy collaboration with others. It's a great way to get started with Tableland since it abstracts away some of the blockchain-specific details and complexities.

## If I create tables in the Studio, can they be used in other clients?

Yes. Tables you create in the Studio are still part of the Tableland protocol, so they can be used in any client that supports the protocol. For example, the SDK, CLI, smart contracts, and REST API can all interact with tables deployed in the Studio.

## Can I access my Studio project programmatically?

Yes, with some callouts. The Studio web app and Studio CLI are fully compatible with each other, so anything you create in the web app can be seamlessly accessed in the CLI after you login with the CLI. The _tables_ you create in the Studio can still be accessed in other clients, but the _project_ context is only available in the Studio. For example, if you create a table called `my_table` in the Studio, it'll be created onchain as something like `my_table_31337_2`. If you use the Studio CLI, you can access this table as `my_table`, but something like the SDK doesn't have the project context & table alias awareness, so you'd have to use `my_table_31337_2` as the table name.

## How does the Studio CLI differ from the traditional CLI?

We launched the Studio with the goal of rapidly iterating and adding new features. Currently, we've kept the `@tableland/cli` and `@tableland/studio-cli` separate, but over time, it's likely these will merge into a single CLI tool.

## Can I add other people to my Studio project?

Yes. The Studio lets you create separate teams and projects, and each team can invite multiple collaborators. Collaborators can be given different permissions, such as read-only or read-write access (note: full collaboration & access controls features are still a work-in-progress).

## Can anyone see my Studio project?

Yes. All projects are fully open. So, if you create a project, anyone with the URL can view it. However, only collaborators with the proper permissions can make changes to the project or the underlying table data.
