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

In particular, use the `chains` command to retrieve which chains Tableland is deployed on, which returns information about the deployment itself, including the chain name, id, and contract address:

### Example

```bash
tableland chains
```

```json
{
    "chainName": "mainnet",
    "chainId": 1,
    "contractAddress": "0x012969f7e3439a9B04025b5a049EB9BAD82A8C12",
    "baseUrl": "https://tableland.network/api/v1"
  },
  "homestead": {
    "chainName": "homestead",
    "chainId": 1,
    "contractAddress": "0x012969f7e3439a9B04025b5a049EB9BAD82A8C12",
    "baseUrl": "https://tableland.network/api/v1"
  },
  "optimism": {
    "chainName": "optimism",
    "chainId": 10,
    "contractAddress": "0xfad44BF5B843dE943a09D4f3E84949A11d3aa3e6",
    "baseUrl": "https://tableland.network/api/v1"
  },
  "arbitrum": {
    "chainName": "arbitrum",
    "chainId": 42161,
    "contractAddress": "0x9aBd75E8640871A5a20d3B4eE6330a04c962aFfd",
    "baseUrl": "https://tableland.network/api/v1"
  },
  "arbitrum-nova": {
    "chainName": "arbitrum-nova",
    "chainId": 42170,
    "contractAddress": "0x1A22854c5b1642760a827f20137a67930AE108d2",
    "baseUrl": "https://tableland.network/api/v1"
  },
  "matic": {
    "chainName": "matic",
    "chainId": 137,
    "contractAddress": "0x5c4e6A9e5C1e1BF445A062006faF19EA6c49aFeA",
    "baseUrl": "https://tableland.network/api/v1"
  },
  "filecoin": {
    "chainName": "filecoin",
    "chainId": 314,
    "contractAddress": "0x59EF8Bf2d6c102B4c42AEf9189e1a9F0ABfD652d",
    "baseUrl": "https://tableland.network/api/v1"
  },
  "sepolia": {
    "chainName": "sepolia",
    "chainId": 11155111,
    "contractAddress": "0xc50C62498448ACc8dBdE43DA77f8D5D2E2c7597D",
    "baseUrl": "https://testnets.tableland.network/api/v1"
  },
  "optimism-goerli": {
    "chainName": "optimism-goerli",
    "chainId": 420,
    "contractAddress": "0xC72E8a7Be04f2469f8C2dB3F1BdF69A7D516aBbA",
    "baseUrl": "https://testnets.tableland.network/api/v1"
  },
  "arbitrum-goerli": {
    "chainName": "arbitrum-goerli",
    "chainId": 421613,
    "contractAddress": "0x033f69e8d119205089Ab15D340F5b797732f646b",
    "baseUrl": "https://testnets.tableland.network/api/v1"
  },
  "maticmum": {
    "chainName": "maticmum",
    "chainId": 80001,
    "contractAddress": "0x4b48841d4b32C4650E4ABc117A03FE8B51f38F68",
    "baseUrl": "https://testnets.tableland.network/api/v1"
  },
  "filecoin-calibration": {
    "chainName": "filecoin-calibration",
    "chainId": 314159,
    "contractAddress": "0x030BCf3D50cad04c2e57391B12740982A9308621",
    "baseUrl": "https://testnets.tableland.network/api/v1"
  },
  "localhost": {
    "chainName": "localhost",
    "chainId": 31337,
    "contractAddress": "",
    "baseUrl": "http://localhost:8080/api/v1"
  },
  "local-tableland": {
    "chainName": "local-tableland",
    "chainId": 31337,
    "contractAddress": "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512",
    "baseUrl": "http://localhost:8080/api/v1"
  }
}
```
