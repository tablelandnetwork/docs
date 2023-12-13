---
title: Deployment
description: Interact with your Studio deployments.
keywords:
  - studio deployment
  - deploy blueprint
  - deploy table
---

## `studio deployment <subcommand>`

List your existing Studio deployment information for a given project, or create a new deployment from one of your existing project's table blueprints.

### `ls [projectId]`

| Argument      | Type     | Default                  | Description                                          |
| ------------- | -------- | ------------------------ | ---------------------------------------------------- |
| `[projectId]` | `string` | Context is used, if set. | The project ID that you want deployment details for. |

### `create <table>`

| Argument  | Type     | Description                       |
| --------- | -------- | --------------------------------- |
| `<table>` | `string` | The Studio UI-defined table name. |

You must also include the project ID the table is a part of as well as chain information.

| Option          | Type     | Description                                    |
| --------------- | -------- | ---------------------------------------------- |
| `--pid`         | `string` | The unique project ID.                         |
| `--chain`       | `string` | The chain name to write data to.               |
| `--providerUrl` | `string` | The provider RPC URL for the chain.            |
| `--privateKey`  | `string` | The account's private key that's writing data. |

## Examples

### `ls`

```bash
studio deployment ls eac4b0f2-ab4d-41ec-9789-19f0a4905615
```

This will log something like the following, where each entry shows table deployment information for the given project:

```json
[
  {
    "tableId": "3ecb77e3-246e-4671-8695-8823dbb7c23d",
    "environmentId": "03b21226-3ed1-44c6-8100-901b6288c565",
    "tableName": "my_table_80001_7726",
    "chainId": 31338,
    "tokenId": "2",
    "blockNumber": 41179459,
    "txnHash": "0x209195da1f735e6872ff8034d14b0fc3151a68533427a388e4adda9fa10d5ce1",
    "createdAt": "2023-10-14T01:38:57.585Z"
  }
]
```

### `create`

Let's say you've created a project that contains a blueprint called `test_table`. The blueprint is simply a table staged for deployment, but it hasn't been created yet. You can create a deployment from the blueprint by running the following command, which will deploy it to the specified network:

```bash
studio deployment create test_table --pid eac4b0f2-ab4d-41ec-9789-19f0a4905615 --chain local-tableland --providerUrl http://127.0.0.1:8545 --privateKey 59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
```

This will log something like:

```json
{
  "tableId": "3ecb77e3-246e-4671-8695-8823dbb7c23d",
  "environmentId": "03b21226-3ed1-44c6-8100-901b6288c565",
  "tableName": "my_table_80001_7726",
  "chainId": 31338,
  "tokenId": "2",
  "blockNumber": 41179459,
  "txnHash": "0x209195da1f735e6872ff8034d14b0fc3151a68533427a388e4adda9fa10d5ce1",
  "createdAt": "2023-10-14T01:38:57.585Z"
}
```
