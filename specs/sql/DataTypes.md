# Data Types

Tableland supports a small set of accepted column types in user-defined tables. The currently supported types are listed below and can be used to represent most, if not all, common SQL types:

| Type      | Description                                                                                            |
| --------- | ------------------------------------------------------------------------------------------------------ |
| `INT`     | Signed integer values, stored in 0, 1, 2, 3, 4, 6, or 8 bytes depending on the magnitude of the value. |
| `INTEGER` | Same as `INT`, except it may also be used to represent an auto-incrementing `PRIMARY KEY` field.       |
| `TEXT`    | Text string, stored using the database encoding (UTF-8).                                               |
| `BLOB`    | A blob of data, stored exactly as it was input. Useful for byte slices etc.                            |

## Details

When creating tables, every column definition _must specify a data type_ for that column, and the data type must be one of the above types. No other data type names are allowed, though new types might be added in future versions of the Tableland SQL specification.

Content inserted into a column must be either a `NULL` (assuming there is no `NOT NULL` constraint on the column) or the type specified. Tableland will attempt to coerce input data into the appropriate type using the usual affinity rules, as most SQL engines all do. However, if the value cannot be losslessly converted in the specified datatype, then an error will be raised.

## Common Types

For users looking for more nuanced data types in tables, the following set of recommendations will help guide table schema design. Additionally, new types might be added in future versions of the Tableland SQL Specification, and users are able to make requests/suggestions via Tableland TIPs.

### Character

Tableland represents all character/text types using the single variable-length `TEXT` type. Although the type `TEXT` is not in any SQL standard, several other SQL database management systems have it as well. You can store any text/character-based data as `TEXT`. Additionally, more complex data types such as dates, timestamps, JSON strings, and more can be represented using `TEXT` (or in some cases `BLOB`).

### Integers

Numeric types often consist of integer and floating-point (float/real) numbers. On Tableland, two-, four-, and eight-byte integers are all represented by the `INTEGER` type, and their storage size depends on the magnitude of the value itself.

### Floats

Tableland does not have a separate data type to represent float/real types. This is because in practice **floating point values are approximate**, which may lead to non-deterministic bahavior across compute platforms. If you need an exact answer, you should not use floating-point values, in Tableland or in any other software. This is not a Tableland limitation per se, but a mathematical limitation inherent in the design of floating-point numbers.

See the [SQLite documentation](https://www.sqlite.org/floatingpoint.html) about issues with floating-point numbers, or learn more about why [floating-point math is hard](https://docs.oracle.com/cd/E19957-01/806-3568/ncg_goldberg.html).

⚠️ In addition to _not_ supporting floating point values (`REAL`) as a storage data type in create statements, the Tableland specification also does not allow `REAL` value _literals_ in read or write queries.

### Boolean

Tableland does not have a separate data type to represent boolean values. Instead, Tableland users should represent true and false values using the integers `1` (true) and `0` (false).

### Date/Time

Tableland does not have a storage class set aside for storing dates and/or times. Instead, users of Tableland can store dates and times as `TEXT` or `INTEGER` values:

- `TEXT` as [ISO-8601](http://en.wikipedia.org/wiki/ISO_8601) strings.
- `INTEGER` as Unix Time (number of seconds since (or before) 1970-01-01 00:00:00 UTC).

**Tableland does not support any of the [date nor time functions](https://sqlite.org/lang_datefunc.html)** provided by the SQLite database engine. Namely, these functions can lead to non-deterministic behavior, so they are not available.

### JSON

JSON data types are for storing JSON (JavaScript Object Notation) data, as specified in [RFC 7159](https://tools.ietf.org/html/rfc7159). In practice, Tableland stores JSON as ordinary `TEXT`. Users are able to manipulate JSON data using a number of functions that make working with JSON data much easier. For example, the `json(X)` function verifies that its argument `X` is a valid JSON string and returns a minified version of that JSON string (with all unnecessary whitespace removed). If `X` is not a well-formed JSON string, then this routine throws an error. The JSON manipulation functions supported by Tableland is derived from SQLite, which in turn is generally compatible (in terms of syntax) with PostgresQL. Tableland currently supports the [15 scalar functions and operators and two aggregate SQL functions for JSON data](https://www.sqlite.org/json1.html) provided by the SQLite database engine.

> 🚧 **Feature At Risk**: Note that these JSON scalar functions, operators, and aggregate functions have not yet been formalized into the Tableland SQL language specification. You are welcome to use them for now, but they should be considered unstable features.

## Solidity

To prevent overflows while working with Solidity numbers, it is recommended to use a `text` type in certain scenarios. Anything larger than a `uint64` / `int32` _could_ lead to an overflow in the Tableland database. Note that in many use cases, it is _unlikely_ overflows will happen due to the extremely large size of these numbers.

Alternatively, consider casting the overflow-able numbers to or simply use a `int64` in smart contracts if it makes sense for the use case. See the following tables for how each Solidity number should be defined in Tableland schemas:

| Solidity Type | SQL Type |
| ------------- | -------- |
| uint256       | text     |
| uint128       | text     |
| uint64        | text     |
| uint32        | integer  |
| uint16        | integer  |
| uint8         | integer  |
| int256        | text     |
| int128        | text     |
| int64         | integer  |
| int32         | integer  |
| int16         | integer  |
| int8          | integer  |

Other best practices have also been defined below:

| Solidity Type | SQL Type |
| ------------- | -------- |
| string        | text     |
| address       | text     |
| bytes         | blob     |
| bool          | text     |
| ~~bool~~ int8 | integer  |

> ⚠️ Tableland doesn’t support boolean values, so instead of using a Solidity `bool`, consider using a `uint8` to represent a true/false as `1` or `0`, which is then stored in Tableland as an `INTEGER`.
