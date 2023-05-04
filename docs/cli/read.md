---
title: Read
description: Run a read-only query against a remote table.
keywords:
  - CLI
  - command line
  - tableland read
---

## `tableland read <query>`

Query against one or more tables and retrieve the associated data.

| Argument  | Type     | Description              |
| --------- | -------- | ------------------------ |
| `<query>` | `string` | The SQL query statement. |

<!--prettier-ignore-->
| Option    | Type      | Default | Description                                           |
| --------- | --------- | ------- | ----------------------------------------------------- |
| --format  | `string`  | `objects` | Output format—either `pretty`, `table`, or `objects`. |
| --extract | `boolean` | `false` | Returns only the set of values of a single column, assuming the read statement also only specifies a single column. |
| --unwrap  | `boolean` | `false` | Returns the results of a single row instead of array of results, assuming the read statement also only specifies a single row. |

Note that for both `--unwrap` and `--extract`, the `--chain` must also be explicitly provided.

## Examples

```bash
tableland read "SELECT * FROM cli_demo_table_80001_1285;"
```

Output:

```json
[
  {
    "id": 0,
    "name": "Bobby Tables"
  }
]
```

If `pretty` is flagged, then the output is a "pretty" tabular view for a nice human-readable format.

```bash
tableland read "SELECT * FROM cli_demo_table_80001_1285;" --format pretty
```

Output:

```bash
┌─────────┬────┬────────────────┐
│ (index) │ id │      name      │
├─────────┼────┼────────────────┤
│    0    │  1 │ 'Bobby Tables' │
└─────────┴────┴────────────────┘
```

Lastly, if you want the data to be returned as a "table" with rows and columns, use the `table` flag:

```bash
tableland read "SELECT * FROM cli_demo_table_80001_1285;" --format table
```

Output:

```json
{
  "columns": [
    {
      "name": "id"
    },
    {
      "name": "name"
    }
  ],
  "rows": [[0, "Bobby Tables"]]
}
```

The unwrap flag will return a single row. In generaly, make sure to add `limit 1` (or properly return one result) to avoid errors. Also, note the `--chain` must be explicitly specified.

```bash
tableland read "select * from healthbot_1_1 limit 1;" --unwrap --chain mainnet
```

Output:

```json
{
  "counter": 1
}
```

The extract command will give you the results of a single column. Make sure your query is only generating a single column in its response.

```bash
tableland read "select counter from healthbot_1_1;" --extract --chain mainnet
```

Output:

```json
[1]
```

## Using ENS

:::warning
ENS support is very experimental; long term support is not guaranteed!
:::warning

You must specify the `enableEnsExperiment` flag, either in your `.tablelandrc` file or your flags. You must also specify an `ensProviderUrl`, which should use a provider for an ENS compatible testnet or mainnet.

If an ENS text record has a record corresponding to a table, you can use it within a query by wrapping the namespace in brackets and treating it as the table's name:

```bash
tableland read "select * from [example.foo.bar.eth];"
```

See the [`namespace`](/cli/namespace) command for more details on how to add tables to ENS.
