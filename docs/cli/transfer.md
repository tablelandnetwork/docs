---
title: Transfer
description: Transfer a table to another address.
keywords:
  - CLI
  - command line
  - tableland transfer
---

## `tableland transfer <name> <receiver>`

You can transfer table ownership from one address to another; the command must originate from the owner of the table. The global flags for `--privateKey`, `--chain`, and `--providerUrl` should also be included unless a config file has been created.

| Argument     | Type     | Description                                       |
| ------------ | -------- | ------------------------------------------------- |
| `<name>`     | `string` | The table's name.                                 |
| `<receiver>` | `string` | The hexadecimal address to transfer the table to. |

## Example

Transfer a table from current wallet (set up during CLI configuration) to another address.

```bash
tableland transfer example_table_31337_2 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
```

Output:

```json
{
  "type": 2,
  "chainId": 31337,
  "nonce": 14,
  "maxPriorityFeePerGas": {
    "type": "BigNumber",
    "hex": "0x59682f00"
  },
  "maxFeePerGas": {
    "type": "BigNumber",
    "hex": "0x59682f0e"
  },
  "gasPrice": null,
  "gasLimit": {
    "type": "BigNumber",
    "hex": "0xd2f7"
  },
  "to": "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
  "value": {
    "type": "BigNumber",
    "hex": "0x00"
  },
  "data": "0x42842e0e00000000000000000000000070997970c51812dc3a010c7d01b50e0d17dc79c80000000000000000000000003c44cdddb6a900fa2b585dd299e03d12fa4293bc000000000000000000000000000000000000000000000000000000000000000b",
  "accessList": [],
  "hash": "0x95d264cbc172ea2ef697ee1b74031b4c4753502547afbe656f429d8a9931342d",
  "v": 1,
  "r": "0xb7ca19b0d9908e357057b667bdfb2b2e8441b9795c5d6fa54615118c5ab73476",
  "s": "0x26720dd46896ae6e18b9eb6dabddb4c4ae958435c36b89ecc3c86917665b7e99",
  "from": "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
  "confirmations": 0
}
```
