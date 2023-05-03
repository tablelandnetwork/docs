---
title: Schema
description: Get info about a given table schema.
keywords:
  - CLI
  - command line
  - tableland schema
---

## `tableland schema <name>`

To understand a table's design, the `schema` command can be used to retrieve the columns, types, and constraints.

| Argument | Type     | Description       |
| -------- | -------- | ----------------- |
| `<name>` | `string` | The table's name. |

## Example

```bash
tableland schema cli_demo_table_31337_2
```

Output:

```json
{
  "columns": [
    {
      "name": "id",
      "type": "int",
      "constraints": ["primary key"]
    },
    {
      "name": "val",
      "type": "text"
    }
  ]
}
```
