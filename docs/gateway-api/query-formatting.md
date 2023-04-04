---
title: Query formatting
description: Transform the output of a read query into your desired format.
keywords:
  - gateway api
  - query formatting
---

The Gateway API `/query` endpoint response can be manipulated into a specific format. This allows developers to take the data from a `SELECT` statement and either extract, unwrap, or further format the data. It can be especially useful when trying to "pull" values out of an array or similar from within a response.

## Adding path parameters

To customize the query response, add the options specified below as a query path parameters. Namely, after using `/query?`, specify a parameter and its value using the syntax `{parameter}={value}` and append or prepend an ampersand `&`, depending on its position.

All of these assume a `statement` is used since this is required to fetch table data. As an example, you might have a `SELECT *` statement that is [URI encoded](/fundamentals/about/glossary#uri-encoding):

```bash
/query?statement=SELECT%20*%20FROM%20my_table
```

Without specifying any additional parameters, all of the default `format`, `extract`, and `unwrap` values will be used. Let's simplify that `SELECT` statement and define it as `{readStatement}` for demonstration purposes. If you would like to specify these, place a parameter and its value somewhere in the query string, either at the beginning or the end—each of these are equivalent:

```bash
/query?format=objects&unwrap=true&extract=true&statement={readStatement}
/query?statement={readStatement}&format=objects&unwrap=true&extract=true
```

### ERC721 compliance

A query used to compose [ERC721](/fundamentals/about/glossary#erc721) compliant metadata should use `unwrap=true` and `extract=true` along with `format=objects`. Often, these types of queries make use of SQL functions like `json_object` to [compose the metadata](/playbooks/walkthroughs/nft-metadata) according to the standard through a query that only returns a single object.

## Parameters

### `format`

Specify the output format (i.e., JSON response’s shape and style). Defaults to `objects`.

`objects` (default) <br />
A top-level array that contains objects, where each object is a key-value pair of column name to row value. Note the `objects` word is plural, not singular.

`table` <br />
A top-level object that contains the keys `columns` and `rows`:

- `columns`: An array of column objects with a single `name` key and the column name.
- `rows`: An array of individual row arrays where each row has comma-separated values corresponding to the order of the columns.

---

### `unwrap`

Specifies whether or not to unwrap the returned JSON objects from their surrounding array. Defaults to `false`.

For example, instead of retrieving `objects` within a JSON array, you can unwrap them as new line delimited [JSON Lines (JSONL)](https://jsonlines.org/examples/#easy-nested-data), thus, removing them from the array entirely.

This _only_ applies to `format=objects`.

---

### `extract`

Specifies whether or not to extract the JSON object from the single property of the surrounding JSON object. Defaults to `false`.

This _only_ applies to `format=objects`.

---

## Default usage

Unless otherwise specified, assume each example in this section is using the default parameter values noted above, and the shown parameter usage is, of course, to be appended to the `/query?` base endpoint at a base URL.

For these examples, let's assume we own `my_table` with a schema of `id int, val text`.

| id  | val          |
| --- | ------------ |
| 1   | Bobby Tables |
| 2   | Molly Tables |

Generally, the example query used is the following select statement as the value for the `statement` parameter.

```sql
SELECT * FROM my_table
```

Thus, the full URI might resemble the following—just note that `my_table` would have to exist an be in the correct table name format `{prefix}_{chainId}_{tableId}` instead of only the `prefix` portion:

```bash
/query?statement=SELECT%20*%20FROM%20my_table&format=objects&unwrap=false&extract=false
```

### `format`

The default formatting is as `objects` with key-value pairs of columns-rows.

#### `objects`

```bash
format=objects
```

Which would output:

```json
[
  {
    "id": 1,
    "val": "Bobby Tables"
  },
  {
    "id": 2,
    "val": "Molly Tables"
  }
]
```

#### `table`

With `table`, the format changes to a table-like structure.

```bash
format=table
```

Resulting in the following:

<!--prettier-ignore-->
```json
{
  "columns": [
    {
      "name": "id"
    },
    {
      "name": "val"
    }
  ],
  "rows": [
    [
      1,
      "Bobby Tables"
    ],
    [
      2,
      "Molly Tables"
    ]
  ]
}
```

### `unwrap`

You can assume `format=objects` and `extract=false` since these are the default values, and `unwrap` _will not_ work with `format=table`.

#### `false`

Here, the default `unwrap` value will behave the same as the first `format` example.

```bash
unwrap=false
```

The response is an object that wraps the response in an array.

```json
[
  {
    "id": 1,
    "val": "Bobby Tables"
  },
  {
    "id": 2,
    "val": "Molly Tables"
  }
]
```

#### `true`

Unwrapping these objects will return each entry as an individual line (i.e., without an enclosing array).

```bash
unwrap=true
```

Which returns:

```json
{"id":1,"val":"Bobby Tables"}
{"id":2,"val":"Molly Tables"}
```

### `extract`

The next set of examples implicitly assume `format=objects` and `unwrap=false`, and recall that `extract` also _will not_ work with `format=table`. Using `extract=true` is _only_ valid for **a single column** in the response and will return an error if you try and select more than one column.

#### `false`

Below, we’re _only_ selecting the `id` column from our table as part of the query itself (e.g., `SELECT id from my_table`).

```bash
extract=false
```

Note how this example response is, essentially, the same as `format=objects` and `unwrap=false` due to the default `extract` value but is different due to the `id` being selected instead of `*`.

```json
[
  {
    "id": 1
  },
  {
    "id": 2
  }
]
```

Technically, with `extract=false`, it's totally acceptable to provide _more than one_ column since that rule only applies to `extract=true`.

#### `true`

To extract values, only a single column can be selected and will pull each value out and enclose them in an array.

```bash
extract=true
```

Now, only the values themselves are extracted, dropping the object and its key.

<!--prettier-ignore-->
```json
[
  1,
  2
]
```

## Fully unwrap & extract

When using `unwrap=true` coupled with `extract=true`, the response changes such that the values are fully removed from the enclosing JSON array.

```bash
format=objects&unwrap=true&extract=true
```

The values themselves are returned as [JSONL](https://jsonlines.org/).

```json
1
2
```

This is quite powerful, especially, when coupled with various JSON SQL functions and string concatenation because you can generate a very customized API response.
