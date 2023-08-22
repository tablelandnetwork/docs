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

## Using a table alias

If you create a table with a provided JSON file passed to the `--aliases` flag, a full table name (`{prefix}_{chainId}_{tableId}`) is not needed. For example, if you have a file `tableland.aliases.json` with the following:

```json title="./tableland.aliases.json"
{
  "example": "example_31337_2"
}
```

You can run the schema command with the table alias.

```bash
tableland schema example
```
