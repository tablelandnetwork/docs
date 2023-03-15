---
title: Aborting statement method calls
sidebar_label: Timeouts
description: Get up an running with the Tableland SDK.
---

The `Database` may also be run in `autoWait` mode, such that each mutating call will not resolve until it has finalized on the Tableland network. This is useful when working with D1 compatible libraries, or to avoid issues with nonce-reuse etc.

Additionally, all async method calls take an optional `AbortSignal` object, which may be used to cancel or otherwise abort an inflight query. Note that this will only abort queries (including wait status), not the actual mutation transaction itself.

```js
const controller = new AbortController();
const signal = controller.signal;
const stmt = db.prepare("SELECT name, age FROM users WHERE age < ?1");
setTimeout(() => controller.abort(), 10);
const young = await stmt.bind(20).all({ signal });
/*
Error: The operation was aborted.
*/
```
