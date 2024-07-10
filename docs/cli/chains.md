---
title: Chains
description: List information about supported chains.
keywords:
  - CLI
  - command line
  - tableland chains
---

## `tableland chains`

List information about supported chains.

In particular, use the `chains` command to retrieve which chains Tableland is deployed on, which returns information about the deployment itself, including the chain name, ID, and contract address. It also includes information about the polling timeout and interval, which is a chain-dependent configuration that dictates how the validator client polls for new blocks and create/write events.

### Example

```bash
tableland chains
```

```json
{
  "mainnet": {
    "chainName": "mainnet",
    "chainId": 1,
    "contractAddress": "0x012969f7e3439a9B04025b5a049EB9BAD82A8C12",
    "baseUrl": "https://tableland.network/api/v1",
    "pollingTimeout": 40000,
    "pollingInterval": 1500
  },
  "homestead": {
    "chainName": "homestead",
    "chainId": 1,
    "contractAddress": "0x012969f7e3439a9B04025b5a049EB9BAD82A8C12",
    "baseUrl": "https://tableland.network/api/v1",
    "pollingTimeout": 40000,
    "pollingInterval": 1500
  },
  "optimism": {
    "chainName": "optimism",
    "chainId": 10,
    "contractAddress": "0xfad44BF5B843dE943a09D4f3E84949A11d3aa3e6",
    "baseUrl": "https://tableland.network/api/v1",
    "pollingTimeout": 10000,
    "pollingInterval": 1500
  },
  "arbitrum": {
    "chainName": "arbitrum",
    "chainId": 42161,
    "contractAddress": "0x9aBd75E8640871A5a20d3B4eE6330a04c962aFfd",
    "baseUrl": "https://tableland.network/api/v1",
    "pollingTimeout": 10000,
    "pollingInterval": 1500
  },
  "arbitrum-nova": {
    "chainName": "arbitrum-nova",
    "chainId": 42170,
    "contractAddress": "0x1A22854c5b1642760a827f20137a67930AE108d2",
    "baseUrl": "https://tableland.network/api/v1",
    "pollingTimeout": 10000,
    "pollingInterval": 1500
  },
  "base": {
    "chainName": "base",
    "chainId": 8453,
    "contractAddress": "0x8268F7Aba0E152B3A853e8CB4Ab9795Ec66c2b6B",
    "baseUrl": "https://tableland.network/api/v1",
    "pollingTimeout": 10000,
    "pollingInterval": 1500
  },
  "polygon": {
    "chainName": "polygon",
    "chainId": 137,
    "contractAddress": "0x5c4e6A9e5C1e1BF445A062006faF19EA6c49aFeA",
    "baseUrl": "https://tableland.network/api/v1",
    "pollingTimeout": 15000,
    "pollingInterval": 1500
  },
  "filecoin": {
    "chainName": "filecoin",
    "chainId": 314,
    "contractAddress": "0x59EF8Bf2d6c102B4c42AEf9189e1a9F0ABfD652d",
    "baseUrl": "https://tableland.network/api/v1",
    "pollingTimeout": 210000,
    "pollingInterval": 5000
  },
  "sepolia": {
    "chainName": "sepolia",
    "chainId": 11155111,
    "contractAddress": "0xc50C62498448ACc8dBdE43DA77f8D5D2E2c7597D",
    "baseUrl": "https://testnets.tableland.network/api/v1",
    "pollingTimeout": 40000,
    "pollingInterval": 1500
  },
  "optimism-sepolia": {
    "chainName": "optimism-sepolia",
    "chainId": 11155420,
    "contractAddress": "0x68A2f4423ad3bf5139Db563CF3bC80aA09ed7079",
    "baseUrl": "https://testnets.tableland.network/api/v1",
    "pollingTimeout": 10000,
    "pollingInterval": 1500
  },
  "arbitrum-sepolia": {
    "chainName": "arbitrum-sepolia",
    "chainId": 421614,
    "contractAddress": "0x223A74B8323914afDC3ff1e5005564dC17231d6e",
    "baseUrl": "https://testnets.tableland.network/api/v1",
    "pollingTimeout": 10000,
    "pollingInterval": 1500
  },
  "base-sepolia": {
    "chainName": "base-sepolia",
    "chainId": 84532,
    "contractAddress": "0xA85aAE9f0Aec5F5638E5F13840797303Ab29c9f9",
    "baseUrl": "https://testnets.tableland.network/api/v1",
    "pollingTimeout": 10000,
    "pollingInterval": 1500
  },
  "polygon-amoy": {
    "chainName": "polygon-amoy",
    "chainId": 80002,
    "contractAddress": "0x170fb206132b693e38adFc8727dCfa303546Cec1",
    "baseUrl": "https://testnets.tableland.network/api/v1",
    "pollingTimeout": 15000,
    "pollingInterval": 1500
  },
  "filecoin-calibration": {
    "chainName": "filecoin-calibration",
    "chainId": 314159,
    "contractAddress": "0x030BCf3D50cad04c2e57391B12740982A9308621",
    "baseUrl": "https://testnets.tableland.network/api/v1",
    "pollingTimeout": 210000,
    "pollingInterval": 5000
  },
  "localhost": {
    "chainName": "localhost",
    "chainId": 31337,
    "contractAddress": "",
    "baseUrl": "http://localhost:8080/api/v1",
    "pollingTimeout": 5000,
    "pollingInterval": 1500
  },
  "local-tableland": {
    "chainName": "local-tableland",
    "chainId": 31337,
    "contractAddress": "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512",
    "baseUrl": "http://localhost:8080/api/v1",
    "pollingTimeout": 5000,
    "pollingInterval": 1500
  }
}
```
