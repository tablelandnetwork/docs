---
title: Import data
description: Take a local CSV file and write the data to a table.
keywords:
  - CLI
  - command line
  - studio
  - import data
  - csv
---

## `studio import-data <table> <file>`

| Argument  | Type     | Default | Description                    |
| --------- | -------- | ------- | ------------------------------ |
| `<table>` | `string` | --      | The Studio-defined table name. |
| `<file>`  | `string` | --      | Path to the CSV file.          |

You must also include the project ID the table is a part of.

| Option          | Type     | Default | Description                                    |
| --------------- | -------- | ------- | ---------------------------------------------- |
| `--pid`         | `string` | --      | The unique project ID.                         |
| `--chain`       | `string` | --      | The chain name to write data to.               |
| `--providerUrl` | `string` | --      | The provider RPC URL for the chain.            |
| `--privateKey`  | `string` | --      | The account's private key that's writing data. |

## Example

```bash
studio import-data users ./data.csv --pid eac4b0f2-ab4d-41ec-9789-19f0a4905615 --chain local-tableland --providerUrl http://127.0.0.1:8545 --privateKey 59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
```

This assumes we have some file locally called `data.csv` in our current working directory, and the CSV should have raw data for the table that aligns to the columns. For example, let’s say our `users` table is a simple two column table an `id INTEGER` and `val TEXT` column. The CSV might look something like this, including the header row:

```csv title="data.csv"
id,val
1,'user_1'
2,'user_2'
```

This will populate the table accordingly and make it viewable in the Studio web app while inspecting the table deployment section.
