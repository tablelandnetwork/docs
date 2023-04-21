## read

`tableland read <query>` _(string)_
Run a read-only query against a remote table.

```bash
Positionals:
  query  SQL query statement                                 [string] [required]

Options:
      --help        Show help                                          [boolean]
  -c, --chain       The EVM chain to target [string] [default: "maticmum"]
      --format      Output format. One of 'pretty', 'table', or 'objects'.
                                                     [string] [default: "table"]
      --extract              Returns only the set of values of a single column.
                             Read statement must be require only a single column
                             .                        [boolean] [default: false]
      --unwrap               Returns the results of a single row instead of arra
                             y of results. Read statement must result in a singl
                             e row response.          [boolean] [default: false]
```

It is also easy to use vanilla SQL `SELECT` statements to query the whole table! See the [JavaScript SDK](https://www.notion.so/JavaScript-SDK-Legacy-9acf7b81bec5444aa4f9230445972658) docs for further details. As with the `write` command, you must specify the table name returned from the `create` command.

### Examples for Formatting Outputs

There are three possible `--format` options:

- `table` (default) ⇒ Data returned as an object that represents a table, with two keys called _columns_ and _rows_; each has column (array of objects) and row (array of arrays) information.
- `pretty` ⇒ A tabular view of the data, in a “pretty” table-like view.
- `objects` ⇒ The data is returned as an array of objects, where the _columns_ _and row data_ are included in each object; an object represents a row.

```bash
tableland read "SELECT * FROM cli_demo_table_80001_1285;" --format <table_objects_or_pretty>
```

```json
{
  "meta": { "duration": 33.1743745803833 },
  "success": true,
  "results": [{ "id": 1, "name": "Bobby Tables" }]
}
```

If `pretty` is flagged, then the output is a “pretty” tabular view for a nice human-readable format:

```json
> tableland read "SELECT * FROM cli_demo_table_80001_1285;" --format pretty
┌─────────┬────┬────────────────┐
│ (index) │ id │      name      │
├─────────┼────┼────────────────┤
│    0    │  1 │ 'Bobby Tables' │
└─────────┴────┴────────────────┘
```

Lastly, if you want the data to be returned as objects, use the `objects` flag:

```json
> tableland read "SELECT * FROM cli_demo_table_80001_1285;" --format objects
{
  meta: { duration: 29.877541542053223 },
  success: true,
  results: [ { id: 1, name: 'Bobby Tables' } ]
}
```

The unwrap flag will return a single row. Make sure to add `limit 1;` to your query to avoid errors.

```bash
tableland read "select * from healthbot_31337_1 limit 1;" --unwrap --chain "local-tableland"
// Result: {"counter":1}
```

The extract command will give you the results of a single column. Make sure your query is only generating a single column in it's response.

```bash
tableland read "select counter from healthbot 31337_1;" --extract --chain "local-tableland"
// Result: [1]
```
