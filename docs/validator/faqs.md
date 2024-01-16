---
title: Validator FAQs
sidebar_label: FAQs
description: Review commonly asked questions about the Tableland validator.
keywords:
  - faq
  - faqs
---

## What types of API calls can I make to the validator? Can I mutate state?

The validator exposes a REST HTTP API that allows you to make calls directly to a validator. There are three possible base URLs, all of which make use of the `/api/v1/` endpoint:

- Mainnets: `https://tableland.network`
- Testnets: `https://testnets.tableland.network`
- Local: `http://localhost:8080`

Only GET requests should be used because none of the API calls will mutate state. The validator API is used for querying data and metadata about tables that use the Tableland protocol as well as various methods for node information.

## How can I query tables? Can I query tables that are not mine?

Tables are fully open, so if you know the chain ID and table ID, you can query any table on any chain. Cross chain queries are also possible, but they can only be executed on the same gateway—e.g., testnet and mainnet tables cannot be mixed in a query. This is important to note because tables should only store public data or encrypted data, in case it should not be publicly readable.

## Does the API require authentication?

No. The API is fully open and does not require authentication.

## Are there any rate limits?

Yes. The API is rate limited to 10 requests per second to prevent abuse.

## Who runs the gateway?

The Gateway REST API is ran by the core Tableland team.

## Can I run my own validator node and gateway?

Yes. If you'd like to run your own node and host your own API, the source code is fully open: [here](/validator/node).
