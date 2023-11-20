---
title: Table subscriptions
description: Register a listener to receive changes to a table.
---

There are times when you'd like to listen to table interactions, whether that's table writes, table ownership transfers, or controller ACL alterations. Subscriptions allow developers to stay up-to-date on any data changes in order to perform subsequent logic or processing from the events.

## Overview

In order to use subscriptions, you must first create a `Database` instance (a `signer` param is required) and then instantiate a `Registry` instance. From there, you can start listening to the Tableland registry contract for events that are associated with a given table using a `TableEventBus`, located in the SDK's `helpers` module.

The `TableEventBus` provides an `addListener` method to start listening for a single table's events. A listener can only subscribe to one event type at a time for a table, but you can set up as many listeners as needed, based on your development environment. This includes three possibilities, passed to the `on` method of the listener:

- `change`: Any table data changes upon writing to the table.
- `set-controller`: Change of the table's access controller address.
- `transfer`: Change of ownership for a table.

There also exists an `addTableIterator` wrapper that returns an async iterable (e.g., used with a `for await ... of` pattern). Once a listener is set up, the `removeListener` or `removeAllListeners` methods allow you to stop listening for events.

## Setup

To get started, you'll need to import the `Database` and `TableEventBus`, instantiate them, and then add a listener to the event bus:

```js
import { Database } from "@tableland/sdk";
import { TableEventBus } from "@tableland/sdk/helpers";

// Configure a `signer` to then pass to the `Database` instance

const db = new Database({ signer });
const eventBus = new TableEventBus(db.config);
const listener = await eventBus.addListener(`{prefix}_{chainId}_{tableId}`); // Replace with your table name
```

## Table changes

Table writes can be subscribed to using the `change` event type. Once the listener is set up, you can perform logic based on the event data and later remove the listener when you're done.

```js
listener.on("change", (event) => {
  // Perform logic here
});
```

The data returned from the `event` is an object with the table ID, transaction hash, block number, and chain ID—such as the following:

```json
{
  "tableId": "2",
  "transactionHash": "0x8e1e840223d48834fac452660131d5fc3a31961d6d58828d1bb0a18b4f71a012",
  "blockNumber": 15,
  "chainId": 31337
}
```

## Controller changes

The `set-controller` event type allows you to subscribe to change to the table's access controller. The data returned from the `event` is what's included in a standard onchain event log, such as the block number/hash, transaction index/arguments, event name/signature, etc.

```js
listener.on("set-controller", function (event) {
  // Perform logic here
});
```

## Table transfers

With an event type of `transfer`, you can listen to table ownership changes.

```js
listener.on("transfer", function (event) {
  // Perform logic here
});
```

The data returned from the `event` also includes standard onchain event log information.

## Removing listeners

There are two ways to remove listeners:

- `removeListener`: Stop listening for events for a specific `chainId` and `tableName`
- `removeAllListeners`: Remove all listeners altogether.

The following shows how to remove a single listener:

```js
listener.on("change", (event) => {
  // Perform logic here
  // highlight-next-line
  eventBus.removeListener({ chainId: 31337, tableId: 2 }); // Remove the listener for a specific case
});
```

To remove all listeners, it might look like the following:

```js
listener.on("change", (event) => {
  // Perform logic here
  // highlight-next-line
  eventBus.removeAllListeners(); // Remove all listeners upon completion
});
```

Note that removing the listener works for all event types, not just `change`, as demonstrated above.
