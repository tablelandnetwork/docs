## info

`tableland info <name>` _(string)_
Get info about a given table by name.

```bash
Positionals:
  name  The target table name                                 [string] [required]

Options:
      --help        Show help                                          [boolean]
      --chain       The EVM compatible chain to target
                                           [string] [default: "maticmum"]
```

### Example

The response includes table information in a standard [ERC721 metadata](https://eips.ethereum.org/EIPS/eip-721) format, including the table’s name, creation data, external URL (which points to the Tableland gateway), and attributes:

```bash
tableland info cli_demo_table_31337_2
```

```json
{
  "name": "cli_demo_table_31337_2",
  "externalUrl": "http://localhost:8080/chain/31337/tables/2",
  "animationUrl": "https://render.tableland.xyz/?chain=31337&id=2",
  "image": "https://bafkreifhuhrjhzbj4onqgbrmhpysk2mop2jimvdvfut6taiyzt2yqzt43a.ipfs.dweb.link",
  "schema": {
    "columns": [
      { "name": "id", "type": "int", "constraints": ["primary key"] },
      { "name": "name", "type": "text" }
    ]
  },
  "attributes": [
    { "displayType": "date", "traitType": "created", "value": 1677184456 }
  ]
}
```
