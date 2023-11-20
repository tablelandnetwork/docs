---
title: Polling controller & aborting queries
sidebar_label: Polling controller
description: Define custom logic to control Database methods & transaction polling behavior.
keywords:
  - polling
  - abort signal
  - abort query
  - database polling
  - query polling
  - polling transactions
---

All asynchronous `Database` method calls take an optional `PollingController` object, which may be used to abort an inflight query. Note that this will only abort queries (including wait status), not the actual mutation transaction itself.

## Overview

A `PollingController` is a wrapper around an [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) with some extra behavior. The object includes:

- `signal`: An `AbortSignal` object.
- `abort`: A function that will abort the signal.
- `interval`: The polling interval in milliseconds.
- `cancel`: A function that will cancel the polling interval.
- `timeout`: The polling timeout in milliseconds.

We'll walk through how to use this with the `Database` methods, and the [polling for transactions](/sdk/validator/polling-transactions) docs show how to use it with the `Validator` API.

## Usage

The `@tableland/sdk` package includes a `helpers` export, which includes a `createPollingController` function that can be used to create a `PollingController` object. By default, this is already used in all statement methods like `all`, `run`, `first`, and `raw`, and it is also used in the `Database` methods for `batch` and `exec` as well. But, if you'd like to use this functionality to alter the default behavior, you can create one with `createPollingController` and pass your own values.

The default values are 60 seconds for the timeout and 1500 milliseconds for the interval, so you'd replace these with your own.

### Statement methods

To demonstrate how it works, the example below shows how a `controller` is created and then passed to the `all()` method. The `setTimeout` is used to abort the query after 10 milliseconds, which will cause the `all()` method to throw an error due to an early abort. These methods can take an optional `opts` object that includes the `controller`.

```typescript
import { helpers } from "@tableland/sdk";

const controller = helpers.createPollingController(60_000, 1500); // polling timeout and interval

const stmt = db.prepare("SELECT * FROM my_table");

setTimeout(() => controller.abort(), 10);
const young = await stmt.all({ controller });
/*
Error: The operation was aborted.
*/
```

This pattern works for all of the statement methods: `all`, `run`, `first`, and `raw`. Note that `first` can also take a parameter for the column name, so its usage might look like `stmt.first("id", { controller })`.

### Database methods

As noted, the statement methods use a top-level options parameter `opts`, which is where the `controller` is passed within the object. However, the `Database` methods for `batch` and `exec` **do not** take the options object `opts`, and instead, they simply take the `controller` directly as an optional parameter.

```typescript
import { helpers } from "@tableland/sdk";

const controller = helpers.createPollingController(60_000, 1500); // polling timeout and interval

// Pass to batch
await db.batch(
  [
    db.prepare("insert into my_table values (1)"),
    db.prepare("insert into my_table values (2)"),
  ],
  controller
);

// Pass to exec
await db.exec(
  "insert into test my_table (1); insert into my_table values (2)",
  controller
);
```
