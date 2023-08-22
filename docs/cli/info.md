---
title: Info
description: Get info about a given table by name.
keywords:
  - CLI
  - command line
  - tableland info
---

## `tableland info <name>`

Pass the table's `name` to then retrieve table information in the standard [ERC721 metadata](https://eips.ethereum.org/EIPS/eip-721) format, including the table’s name, creation data, external URL, and attributes.

| Argument | Type     | Description       |
| -------- | -------- | ----------------- |
| `<name>` | `string` | The table's name. |

### Example

```bash
tableland info healthbot_1_1
```

Output:

```json
{
  "name": "healthbot_1_1",
  "externalUrl": "https://tableland.network/api/v1/tables/1/1",
  "animationUrl": "https://tables.tableland.xyz/1/1.html",
  "image": "https://tables.tableland.xyz/1/1.svg",
  "schema": {
    "columns": [
      {
        "name": "counter",
        "type": "integer"
      }
    ]
  },
  "attributes": [
    {
      "displayType": "date",
      "traitType": "created",
      "value": 1674047325
    }
  ]
}
```

## Using a table alias

If you create a table with a provided JSON file passed to the `--aliases` flag, a full table name (`{prefix}_{chainId}_{tableId}`) is not needed. For example, if you have a file `tableland.aliases.json` with the following:

```json title="./tableland.aliases.json"
{
  "example": "example_31337_2"
}
```

You can run the info command with the table alias.

```bash
tableland info example
```
