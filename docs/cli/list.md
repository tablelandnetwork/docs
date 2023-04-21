
## list

`tableland list [address]` _(string)_
List tables by address.

```markdown
Positionals:
address The target address [string]

Options:
--help Show help [boolean]
-k, --privateKey Private key string [string] [required]
--chain The EVM compatible chain to target
[string] [default: "maticmum"]
```

Using `list` command provides and easy way to understand which tables are owned by a certain address.

### Example

The retrieved information about those tables includes the table’s name, structure (describing the schema), and created time:

```bash
# Be sure to either use the default `maticmum` or set the `--chain`
tableland list
```

```json
[
  {
    "tableId": "2",
    "chainId": 31337
  }
]
```
