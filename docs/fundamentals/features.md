---
title: Features
description: A non-exhaustive overview of Tableland features.
keywords:
  - features
---

## Database

### Data availability

Data is materialized offchain to save on costs. [Docs](/fundamentals/architecture/protocol-design).

### Cross chain support

Execute read-only queries across any network for multi-chain apps. [Docs](/fundamentals/supported-chains).

### Tables

Tables are created on the desired chain with global uniqueness. [Docs](/fundamentals/architecture/table-token).

### Functions

SQLite & a few custom functions can be used in queries (with some exceptions). [Docs](/sql/functions).

---

## Access control

### Row level security

Control the data each user can access with smart contracts. [Docs](/smart-contracts/controller).

### Admin controls

Write SQL statements that grant or revoke global table permissions. [Docs](/sql/access-control).

### Integrations

Leverage any external protocol that also handles access controls all onchain.

---

## Storage

### Data

Store data in tables with (some limits). [Docs](/fundamentals/limits).

### Files

Use external storage providers to store files & references in tables. [Docs](/playbooks/integrations/ipfs).

---

## Clients & APIs

### SDK

Build with JavaScript/TypeScript in Node.js or web apps. [Docs](/sdk).

### Smart contracts

Write contracts with onchain creates, writes, & access controls. [Docs](/smart-contracts).

### CLI

Create, read, and write from the command line. [Docs](/cli).

### REST API

Request read-only data from Tableland validator nodes. [Docs](/validator/api).

### Realtime database changes

Watch database changes to perform logic in external services. [Docs](/sdk/registry/subscribe).

---

## Studio

### Web app

Deploy projects in the Studio and build an app in minutes. [Docs](/studio/web).

### CLI

Manage your project from the command line. [Docs](/studio/cli).
