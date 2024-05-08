# Function: createPollingController()

> **createPollingController**(`timeout`, `pollingInterval`): [`PollingController`](../type-aliases/PollingController.md)

Create a polling controller with a custom timeout & interval.

## Parameters

• **timeout**: `number`= `60_000`

The timeout period in milliseconds.

• **pollingInterval**: `number`= `1500`

## Returns

[`PollingController`](../type-aliases/PollingController.md)

A [PollingController](../type-aliases/PollingController.md) with the custom timeout & interval.

## Source

@tableland/sdk/src/helpers/await.ts:95
