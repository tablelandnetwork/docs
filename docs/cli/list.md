---
title: List
description: List all tables owned by an address.
keywords:
  - CLI
  - command line
  - tableland list
---

## `tableland list [address]`

You can query for a list of all tables owned by a particular address on a specific chain.

| Argument    | Type     | Default                                 | Description                     |
| ----------- | -------- | --------------------------------------- | ------------------------------- |
| `[address]` | `string` | Address specified with the private key. | The target hexadecimal address. |

## Example

List all of the tables owned by the address set up during configuration.

```bash
tableland list
```

Output:

```json
[
  {
    "tableId": "2",
    "chainId": 31337
  }
]
```

Or, if you'd like query for a specific address, it may resemble the following:

```bash
tableland list 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
```

Output:

```json
[
  {
    "tableId": "2",
    "chainId": 31337
  }
]
```
