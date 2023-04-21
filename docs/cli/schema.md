
## schema

`tableland schema <name>` _(string)_
Get info about a given table schema.

```bash
Positionals:
  schema  SQL table schema                                   [string] [required]

Options:
      --help        Show help                                          [boolean]
```

### Example

```bash
tableland schema cli_demo_table_31337_2
```

```json
{
  "columns": [
    { "name": "id", "type": "int", "constraints": ["primary key"] },
    { "name": "name", "type": "text" }
  ]
}
```
