---
title: Query formatting
description: Transform the output of a read query into your desired format.
keywords:
  - validator api
  - query formatting
---

The Validator API `/query` endpoint response can be manipulated into a specific format. This allows developers to take the data from a `SELECT` statement and either extract, unwrap, or further format the data. It can be especially useful when trying to "pull" values out of an array or similar from within a response.

## Adding path parameters

To leverage the query response formatting, add the options specified below as a query parameter. Namely, after using `/query?`, specify a parameter and its value using the syntax `{parameter}={value}` and append or prepend an ampersand `&`.

## ERC721 compliance

For example, a query used composing ERC721 compliant metadata (e.g., leveraging usage of `json_object`) should include `unwrap=true&extract=true` somewhere in the query string, either at the beginning or the end:

- `/query?unwrap=true&extract=true&s={readStatement}`
- `/query?s={readStatement}&unwrap=true&extract=true`

## Parameters

### `output`

Specify the JSON response’s shape and style.

`objects` (default)
A top-level array that contains objects, where each object is a key-value pair of column name to row value. Note the word is plural, not singular.

---

`table`
A top-level object that contains the keys _columns_ and _rows_. The _columns_ is an array of column objects, and the _rows_ field is an array of row arrays.

---

### `unwrap`

Instead of putting `objects` in a JSON array, unwrap them and use new line delimited [JSON Lines](https://jsonlines.org/). Defaults to `false`

_Only applies to `output=objects`._

---

### `extract`

Whether or not to extract single column result values and use those as the results in the response. Defaults to `false`.

_Only applies to `output=objects`._

---

### `json_strings`

Whether or not to leave JSON strings as strings in query results or transform them to actual JSON data. Defaults to `false`.

---

## Basic examples

The following examples leverage the table `rest_api_80001_2580`. Each example, unless otherwise specified, is using the default values noted above.

### `output`

`objects`

```bash
output=objects
```

```json
[
  {
    "id": 0,
    "name": "Bobby Tables"
  }
]
```

`table`

```bash
output=table
```

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

### `unwrap`

_Only works with `output=objects`._

`false`

```bash
output=objects&unwrap=false
```

```json
[
  {
    "id": 0,
    "name": "Bobby Tables"
  }
]
```

`true`

```bash
output=objects&unwrap=false
```

```json
{
  "id": 0,
  "name": "Bobby Tables"
}
```

### `extract`

_Assuming the default,_ `unwrap=false`.

`false`

_Only works with `output=objects`, and it’s only valid for a single column response (i.e., `SELECT` a single column). Below, we’re only selecting the `id` column from our table._

```bash
output=objects&extract=false
```

```json
[
  {
    "id": 0
  }
]
```

`true`

```bash
output=objects&extract=true
```

```json
[0]
```

_When using `unwrap=true`._

`false`

```bash
output=objects&unwrap=true&extract=false
```

```json
{
  "id": 0
}
```

`true`

```bash
output=objects&unwrap=true&extract=true
```

```json
0
```
