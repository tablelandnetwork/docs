---
title: Controller
description: Get, set, and lock the controller contract for a given table.
keywords:
  - CLI
  - command line
  - tableland controller
---

## `tableland controller <subcommand>`

Use these commands as a helper to retrieve the controller of a table (`get`) or to set _or permanently_ lock the controller of a table (`set` or `lock`). Recall the `name` is in the format `{prefix}_{chainId}_{tableId}`. The global flags for `--privateKey`, `--chain`, and `--providerUrl` should also be included unless a config file has been created.

### `get <name>`

Get the current controller address for a given table `name`.

| Argument | Type     | Description       |
| -------- | -------- | ----------------- |
| `<name>` | `string` | The table's name. |

### `set <controller> <name>`

Set the `controller` address for a given table `name`.

| Argument       | Type     | Description                                       |
| -------------- | -------- | ------------------------------------------------- |
| `<controller>` | `string` | The hexadecimal address to set the controller to. |
| `<name>`       | `string` | The table's name.                                 |

### `lock <name>`

Lock the controller address for a table.

| Argument | Type     | Description       |
| -------- | -------- | ----------------- |
| `<name>` | `string` | The table's name. |

## Examples

### `get`

```bash
tableland controller get cli_demo_table_31337_2
```

Output:

```json
"0x0000000000000000000000000000000000000000"
```

:::note
Notice how this example table originally has its controller set to `0x0`, which is the default value.
:::

### `set`

```bash
tableland controller set 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC cli_demo_table_31337_2
```

Output:

```json
{
  type: 2,
  chainId: 31337,
  nonce: 3,
  maxPriorityFeePerGas: BigNumber { _hex: '0x59682f00', _isBigNumber: true },
  maxFeePerGas: BigNumber { _hex: '0x59682f0e', _isBigNumber: true },
  gasPrice: null,
  gasLimit: BigNumber { _hex: '0xf14a', _isBigNumber: true },
  to: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
  value: BigNumber { _hex: '0x00', _isBigNumber: true },
  data: '0x8bb0ab9700000000000000000000000070997970c51812dc3a010c7d01b50e0d17dc79c800000000000000000000000000000000000000000000000000000000000000020000000000000000000000003c44cdddb6a900fa2b585dd299e03d12fa4293bc',
  accessList: [],
  hash: '0x5f8d81e07b908e501a8ccc1257bf2691400f3c68b657af3b36fa21fec0d9b16b',
  v: 1,
  r: '0x1e0ad1b9fc72c9d909ec64dd89d888e9299f5f2f57968d06fd737389357a5634',
  s: '0x429cdb090c318e50d3197cbb7405651b7c330dda15af2c4256ba47ae80deffcb',
  from: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
  confirmations: 0,
  wait: [Function (anonymous)],
  link: ''
}
```

### `lock`

```bash
tableland controller lock cli_demo_table_31337_2
```

Output:

```json
{
  type: 2,
  chainId: 31337,
  nonce: 4,
  maxPriorityFeePerGas: BigNumber { _hex: '0x59682f00', _isBigNumber: true },
  maxFeePerGas: BigNumber { _hex: '0x59682f0e', _isBigNumber: true },
  gasPrice: null,
  gasLimit: BigNumber { _hex: '0xdefc', _isBigNumber: true },
  to: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
  value: BigNumber { _hex: '0x00', _isBigNumber: true },
  data: '0x0529568100000000000000000000000070997970c51812dc3a010c7d01b50e0d17dc79c80000000000000000000000000000000000000000000000000000000000000002',
  accessList: [],
  hash: '0xbf61cf9df3b7bc7df49bb127e23783fad2670d1b7076763d4e6c149864b8972e',
  v: 0,
  r: '0x56a4faa391111dfd54873dacc9e2b9dbfa47114914c9ca145402c12d1190a353',
  s: '0x1b773d3af98496662163600fa7ac81610a32ecf79de3a683ef7ffd606bab8e9a',
  from: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
  confirmations: 0,
  wait: [Function (anonymous)],
  link: ''
}
```
