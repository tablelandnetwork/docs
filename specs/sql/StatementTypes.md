# Statement Types

The core Tableland SQL parser accepts an SQL statement list which is a semicolon-separated list of statements. Each SQL statement in the statement list is an instance of one of the following specific statement types. All other standard SQL statement types are unavailable (at the moment). Each statement type is associated with a well-known SQL command (see following sections). In general, the entire Tableland SQL API can be summarized in seven command/statement types: `CREATE TABLE`, `INSERT`, `UPDATE`, `DELETE`, `SELECT`, `GRANT`, `REVOKE`.

> ⚠️
> The statement and data types provided here are part of the official _minimal_ Tableland SQL specification. Additional functionality may be available in practice. However, it is not recommended that developers rely on SQL features outside of this minimal specification in the long-term.

## CREATE TABLE

The `CREATE TABLE` command is used to create a new table on Tableland. A `CREATE TABLE` command specifies the following attributes of the new table:

- The [name](#table-identifiersnames) of the new table (`table_name`).
- The name of each column in the table (`column_name`).
- The [declared type](#data-types) of each column in the table (`data_type`).
- A [default value](#column-defaults) or expression for each column in the table.
- Optionally, [a `PRIMARY KEY`](#primary-key) for the table. Both single column and composite (multiple column) primary keys are supported.
- A set of SQL [constraints for the table](#column-definitions-and-constraints). Tableland supports `UNIQUE`, `NOT NULL`, `CHECK` and `PRIMARY KEY` constraints (see previous bullet).
- Optionally, a [generated column constraint](#generated-columns).

### Structure

```sql
CREATE TABLE *table_name* ( [
  { *column_name* *data_type* [ *column_constraint* [,  ... ] ]
  | table_constraint }
	[, ...]
] );
```

where `column_constraint` has structure

```sql
[ CONSTRAINT constraint_name ]
{ NOT NULL |
  CHECK ( expression ) |
  DEFAULT default_expr |
  UNIQUE index_parameters |
  PRIMARY KEY index_parameters |
}
```

and `table_constraint` has structure

```sql
[ CONSTRAINT constraint_name ]
{ CHECK ( expression ) |
  UNIQUE ( column_name [, ... ] ) |
  PRIMARY KEY ( column_name [, ... ] )
```

### Details

#### Table Identifiers/Names

Every `CREATE TABLE` statement must specify a _fully-qualified table identifier_ (id) as the name of the new table. The fully-qualified table identifier has the following structure:

$$
\mathtt{tableId} = \mathtt{prefix} + \mathtt{chainId} + \mathtt{tokenId}
$$

Where $\mathtt{prefix}$ is optional, and may include any characters from the regular expression `([A-Za-z0-9\_]+)`, but cannot start with a number. A prefix string may be up to 32 bytes in length. In practice, long names with spaces must be slug-ified with underscores. For example, `“my amazing table"` would become `"my_amazing_table"`. The last two components of the table id, _must be_ the chain id and the token id, which are numeric values separated by an underscore. For example, a valid table id without a prefix looks like `_42_0` (or `42_1`), whereas a valid table id _with_ a prefix might look like `dogs_42_0`.

> ⚠️ It is _not_ up to the caller to determine what token id to use in a `CREATE TABLE` statement. The token id is a monotonically-increasing numeric value which is provided by the smart contract that is processing the create statements. See the On-Chain API Specification for details on the smart contract calls used to generate `CREATE TABLE` statements in practice.

Table identifiers must be globally unique. The combination of chain id and monotonically increasing token id ensures this is the case in practice. As such, the addition of a user-defined prefix string is an aesthetic feature that most developers will find useful (but is not required). The maximum (slug-ified) prefix length is 32 bytes.

> ℹ️ Tableland also supports quoted identifiers (for table names, column names, etc). This allows callers to use SQL Keywords (see next section) as part of identifiers, etc. There are some limitations to this, and it does not circumvent any other naming constraints.

#### Reserved Keywords

The SQL standard specifies a large number of keywords which may not be used as the names of tables, indices, columns, databases, or any other named object. The list of keywords is often so long that few people can remember them all. For most SQL code, your safest bet is to never use any English language word as the name of a user-defined object.

If you want to use a keyword as a name, you need to quote it. There are four ways of quoting keywords in SQLite:

- `'keyword'` — A keyword in single quotes is a string literal.
- `"keyword"` — A keyword in double-quotes is an identifier.
- `[keyword]` — A keyword enclosed in square brackets is an identifier. This is not standard SQL, it is included in Tableland for compatibility.
- `keyword` — A keyword enclosed in grave accents (ASCII code 96) is an identifier. This is not standard SQL, it is included in Tableland for compatibility.

The list below shows all possible reserved keywords used by Tableland (or SQLite). Any identifier that is not on the following element list is not considered a keyword to the SQL parser in Tableland:

`TRUE`, `FALSE`, `AND`, `OR`, `NOT`, `NULL`, `NONE`, `INTEGER`, `NUMERIC`, `REAL`, `TEXT`, `CAST`, `AS`, `IS`, `ISNULL`, `NOTNULL`, `COLLATE`, `LIKE`, `IN`, `REGEXP`, `GLOB`, `MATCH`, `ESCAPE`, `BETWEEN`, `CASE`, `WHEN`, `THEN`, `ELSE`, `END`, `SELECT`, `FROM`, `WHERE`, `GROUP`, `BY`, `HAVING`, `LIMIT`, `OFFSET`, `ORDER`, `ASC`, `DESC`, `NULLS`, `FIRST`, `LAST`, `DISTINCT`, `ALL`, `JOIN`, `ON`, `USING`, `EXISTS`, `FILTER`, `BLOB`, `INT`, `ANY`, `CREATE`, `TABLE`, `PRIMARY`, `KEY`, `UNIQUE`, `CHECK`, `DEFAULT`, `GENERATED`, `ALWAYS`, `STORED`, `VIRTUAL`, `CONSTRAINT`, `INSERT`, `VALUES`, `INTO`, `DELETE`, `UPDATE`, `SET`, `GRANT`, `TO`, `REVOKE`, `CONFLICT`, `DO`, `NOTHING`

> ℹ️ You can also find the most up to date list of keywords used by Tableland in the reference parser implementation.
> [See Implementation](https://github.com/tablelandnetwork/sqlparser/blob/main/lexer.go)

> ⚠️ Table _names_ that begin with `sqlite`, `system` or `registry` are also reserved for internal use. It is an error to attempt to create a table with a name that starts with these reserved names.

#### Column Definitions and Constraints

Every `CREATE TABLE` statement includes one or more column definitions, optionally followed by a list of table constraints. Each column definition consists of the name of the column, followed by the declared type of the column (see [Data Types](#data-types)), then one or more optional column constraints. Included in the definition of column constraints for the purposes of the previous statement is the [`DEFAULT` clause](#column-defaults), even though this is not really a constraint in the sense that it does not restrict the data that the table may contain. The other constraints, `NOT NULL`, `CHECK`, `UNIQUE`, and `PRIMARY KEY` constraints, impose restrictions on the table data.

> ⚠️ The number of columns in a table is limited by the `MaxColumns` validator configuration parameters (defaults to 24). A single character fields in a table cannot store more than `MaxTextLength` bytes of data (defaults to 1024). The number of rows in a table is limited by the `MaxRowCount` validator configuration parameter (defaults to 100,000). This values are all configurable at the network-level, and may change in the future.

> ⚠️ In practice, a `CREATE TABLE` statement must be sent as a single top-level statement (i.e., it must be provided in a statement list of length one).

> 🚧 **Feature At Risk**: `FOREIGN KEY` constraints of the form `FOREIGN KEY(column_name) REFERENCES table_id(column_name)` are currently not supported across Tableland tables. Instead, dynamic `JOIN`s can be used to reference columns in remote tables. However, inclusion of `FOREIGN KEY` constraints are being considered for inclusion in the Tableland SQL specification with some specific limitations. In particular, key constraint actions would be restricted to `SET NULL` or `SET DEFAULT` (see the section called SQLite foreign key constraint actions at the link below).
> [See SQLite Foreign Key](https://www.sqlitetutorial.net/sqlite-foreign-key/)

#### Column Defaults

The `DEFAULT` clause specifies a default value to use for the column if no value is explicitly provided by the user when doing an `INSERT`. If there is no explicit `DEFAULT` clause attached to a column definition, then the default value of the column is `NULL`. An explicit `DEFAULT` clause may specify that the default value is `NULL`, a string constant, a blob constant, a signed-number, or any constant expression enclosed in parentheses. For the purposes of the `DEFAULT` clause, an expression is considered constant if it contains no sub-queries, column, or table references, or string literals enclosed in double-quotes instead of single-quotes.

Each time a row is inserted into the table by an `INSERT` statement that does not provide explicit values for all table columns the values stored in the new row are determined by their default values, as follows:

- If the default value of the column is a constant `NULL`, text, blob or signed-number value, then that value is used directly in the new row.
- If the default value of a column is an expression in parentheses, then the expression is evaluated once for each row inserted and the results used in the new row.

#### Generated Columns

A column that includes a `GENERATED ALWAYS AS` clause is a generated column:

```sql
CREATE TABLE table_id (
    ...,
    column_name data_type { GENERATED ALWAYS } AS (*expression*) { STORED | VIRTUAL }
);
```

Generated columns (also sometimes called "computed columns") are columns of a table whose values are a function of other columns in the same row. Generated columns can be read, but their values can not be directly written. The only way to change the value of a generated column is to modify the values of the other columns used to calculate the generated column.

The `GENERATED ALWAYS` keywords at the beginning of the constraint and the `VIRTUAL` or `STORED` keyword at the end are all optional. Only the `AS` keyword and the parenthesized expression are required. If the trailing `VIRTUAL` or `STORED` keyword is omitted, then `VIRTUAL` is the default.

The value of a `VIRTUAL` column is computed when read, whereas the value of a `STORED` column is computed when the row is written. `STORED` columns take up space in the database file, whereas `VIRTUAL` columns use more CPU cycles when being read.

**Features and Limitations**

- Generated columns must also have a defined data type (just like all columns in Tableland). Tableland will attempt to transform the result of the generating expression into that data type using the same affinity rules as for ordinary columns.
- Generated columns may have `NOT NULL`, `CHECK`, and `UNIQUE` constraints, just like ordinary columns.
- The expression of a generated column can refer to any of the other declared columns in the table, including other generated columns, as long as the expression does not directly or indirectly refer back to itself.
- Generated columns may not have a `DEFAULT` clause. The value of a generated column is always the value specified by the expression that follows the `AS` keyword.
- Generated columns may not be used as part of the `PRIMARY KEY`.
- The expression of a generated column may only reference constant literals and columns within the same row, and may only use scalar deterministic functions. The expression may not use subqueries, aggregate functions, etc.
- The expression of a generated column may refer to other generated columns in the same row, but no generated column can depend upon itself, either directly or indirectly.
- Every table must have at least one non-generated column.
- The data type of the generated column is determined only by the declared data type from the column definition. The datatype of the `GENERATED ALWAYS AS` expression has no affect on the data type of the column data itself.

#### Primary Key

Each table in Tableland may have _at most one_ `PRIMARY KEY`. If the keywords `PRIMARY KEY` are added to a column definition, then the primary key for the table consists of that single column. Or, if a `PRIMARY KEY` clause is specified as a separate table constraint, then the primary key of the table consists of the list of columns specified as part of the `PRIMARY KEY` clause. The `PRIMARY KEY` clause must contain only column names. An error is raised if more than one `PRIMARY KEY` clause appears in a `CREATE TABLE` statement. The `PRIMARY KEY` is optional.

Each row in a table with a primary key must have a unique combination of values in its primary key columns. If an `INSERT` or `UPDATE` statement attempts to modify the table content so that two or more rows have identical primary key values, that is a constraint violation. Related, the SQL standard is that a `PRIMARY KEY` should always be `NOT NULL`, so Tableland enforces this constraint.

> 🚧 **Feature At Risk**: It is not currently possible to `ALTER TABLE` after it has been created. As such, table structure in Tableland is considered immutable. The Tableland core development team is currently evaluating whether to allow `ALTER TABLE` only in the case of _adding new columns_.

## DELETE

The `DELETE` command removes records from the table identified by the table id.

### Structure

```sql
DELETE FROM table_id [ WHERE condition ]
```

### Details

If the [`WHERE` clause](#where-clause) is not present, all records in the table are deleted. If a `WHERE` clause is supplied, then only those rows for which the `WHERE` clause boolean expression is true are deleted. Rows for which the expression is false or `NULL` are retained.

## INSERT

The `INSERT` command creates new rows in a table identified by the table id.

### Structure

```sql
INSERT INTO table_id [ ( *column_name* [, ...] ) ] VALUES (
  { expression } [, ...]
);
```

or

```sql
INSERT INTO table_id DEFAULT VALUES;
```

### Details

An `INSERT` statement creates one or more new rows in an existing table. If the `column_name` list after `table_name` is omitted then the number of values inserted into each row must be the same as the number of columns in the table. In this case the result of evaluating the left-most expression from each term of the `VALUES` list is inserted into the left-most column of each new row, and so forth for each subsequent expression. If a `column_name` list is specified, then the number of values in each term of the `VALUE` list must match the number of specified columns. Each of the named columns of the new row is populated with the results of evaluating the corresponding `VALUES` expression. Table columns that do not appear in the column list are populated with the default column value (specified as part of the `CREATE TABLE` statement), or with `NULL` if no default value is specified.

The alternative `INSERT ... DEFAULT VALUES` statement inserts a single new row into the named table. Each column of the new row is populated with its default value, or with a `NULL` if no default value is specified as part of the column definition in the `CREATE TABLE` statement.

## UPDATE

An `UPDATE` statement is used to modify a subset of the values stored in zero or more rows of the database table identified by the table id.

### Structure

```sql
UPDATE table_name
    SET { column_name = { expression | DEFAULT } } [, ...]
    [ WHERE condition ];
```

### Details

If the `UPDATE` statement does not have a [`WHERE` clause](#where-clause), all rows in the table are modified by the `UPDATE`. Otherwise, the `UPDATE` affects only those rows for which the `WHERE` clause boolean expression is true. It is not an error if the `WHERE` clause does not evaluate to true for any row in the table; this just means that the `UPDATE` statement affects zero rows.

The modifications made to each row affected by an `UPDATE` statement are determined by the list of assignments following the `SET` keyword. Each assignment specifies a `column-name` to the left of the equals sign and a scalar expression to the right. For each affected row, the named columns are set to the values found by evaluating the corresponding scalar expressions. If a single `column-name` appears more than once in the list of assignment expressions, all but the rightmost occurrence is ignored. Columns that do not appear in the list of assignments are left unmodified. The scalar expressions may refer to columns of the row being updated. In this case all scalar expressions are evaluated before any assignments are made.

> ℹ️ An assignment in the `SET` clause can be a parenthesized list of column names on the left and a `ROW` value of the same size on the right. For example, consider the following two “styles” of `UPDATE` statements: `UPDATE table_id SET (a,b)=(b,a);` or `UPDATE table_id SET a=b, b=a;`.

## GRANT/REVOKE

The `GRANT` and `REVOKE` commands are used to define low-level access privileges for a table identified by table name and id.

### Structure

```sql
GRANT { INSERT | UPDATE | DELETE } [, ...]
    ON { [ TABLE ] table_name [, ...] }
    TO role [, ...]

REVOKE { INSERT | UPDATE | DELETE } [, ...]
    ON { [ TABLE ] table_name [, ...] }
    FROM role [, ...]
```

### Details

The `GRANT` command gives specific privileges on a table to one or more `role`. These privileges are added to those already granted, if any. By default, the creator of a table (as specified by a public ETH address) has all (valid) privileges on creation. The owner could, however, choose to revoke some of their own privileges for safety reasons.

Related, if a table is created with an access controller contract specified, or if an address with sufficient privileges updates a table’s access control rules to use a controller contract, then all command-based access control rules are ignored in favor of the controller contract access control. In other words, if a controller contract is set, `GRANT`/`REVOKE` is _disabled._ See On-Chain API Specification for further details on specifying and controlling access via a controller smart contract.

> ⚠️ Currently, the only allowable privileges for granting are `INSERT`, `UPDATE` and `DELETE`. Note that `SELECT` privileges are not required at this time, as `SELECT` statements are not access controlled (all reads are allowed). See the `SELECT` section for further details.

Roles (`role`) in Tableland are defined by an Ethereum public-key based address. Any (hex string encoded) ETH address is a valid Tableland role, and as such, privileges can be granted to any valid ETH address. In practice, ETH address strings must be specified as string literals using single quotes (e.g., `'0x181Ec6E8f49A1eEbcf8969e88189EA2EFC9108dD'`).

> ℹ️ Only a table owner has permission to `GRANT` or `REVOKE` access privileges to other roles/accounts.

Conversely to the `GRANT` command, the `REVOKE` command removes specific, previously granted access privileges on a table from one or more roles. All role definitions and allowable privileges associated with granting privileges also apply to revoking them.

## SELECT

The `SELECT` statement is used to query the database. The result of a `SELECT` is zero or more rows of data where each row has a fixed number of columns. A `SELECT` statement does not make any changes to the database.

### Structure

The `SELECT` statement is the work-house of the SQL query model, and as such, the available syntax is extremely complex. In practice, most `SELECT` statements are simple `SELECT` statements of the form:

```sql
SELECT [ ALL | DISTINCT ]
    [ * | expression [, ...] ]
    [ FROM from_clause [, ...] ]
    [ WHERE where_clause ]
    [ GROUP BY [ expression [, ...] ]
    [ ORDER BY expression [ ASC | DESC ]
    [ LIMIT { count | ALL } ]
    [ OFFSET { number } ]
```

See the standalone sections on [`WHERE`](#where-clause), [`FROM`](#from-clause), and [`JOIN`](#join-clause) clauses for further details on query structure.

### Details

Generating the results of a simple `SELECT` statement is presented as a four step process in the description below:

1. [`FROM` clause](#from-clause) processing: The input data for the simple `SELECT` is determined. The input data is either implicitly a single row with 0 columns (if there is no `FROM` clause) or is determined by the `FROM` clause.
2. [`WHERE` clause](#where-clause) processing: The input data is filtered using the `WHERE` clause expression.
3. Result set processing (`GROUP BY` and result expression processing): The set of result rows is computed by aggregating the data according to any `GROUP BY` clause and calculating the result set expressions for the rows of the filtered input dataset.
4. `DISTINCT/ALL` keyword processing: If the query is a `SELECT DISTINCT` query (see further details below), duplicate rows are removed from the set of result rows.

There are two types of simple `SELECT` statement — aggregate and non-aggregate queries. A simple `SELECT` statement is an aggregate query if it contains either a `GROUP BY` clause or one or more _aggregate functions_ in the result set. Otherwise, if a simple `SELECT` contains no aggregate functions or a `GROUP BY` clause, it is a non-aggregate query.

Once the input data from the `FROM` clause has been filtered by the `WHERE` clause expression (if any), the set of result rows for the simple `SELECT` are calculated. Exactly [how this is done](https://sqlite.org/lang_select.html#resultset) depends on whether the simple `SELECT` is an aggregate or non-aggregate query, and whether or not a `GROUP BY` clause was specified.

One of the `ALL` or `DISTINCT` keywords may follow the `SELECT` keyword in a simple `SELECT` statement. If the simple `SELECT` is a `SELECT ALL`, then the entire set of result rows are returned by the `SELECT`. If neither `ALL` or `DISTINCT` are present, then the behavior is as if `ALL` were specified. If the simple `SELECT` is a `SELECT DISTINCT`, then duplicate rows are removed from the set of result rows before it is returned. For the purposes of detecting duplicate rows, two `NULL` values are considered to be equal.

## `WHERE` clause

### Structure

```sql
WHERE condition
```

### Details

The SQL `WHERE` clause is an optional clause of the `SELECT`, `DELETE`, and/or `UPDATE` statements. It appears after the primary clauses of the corresponding statement. For example in a `SELECT` statement, the `WHERE` clause can be added _after_ the `FROM` clause to filter rows returned by the query. Only rows for which the `WHERE` clause expression evaluates to true are included from the dataset before continuing. Rows are excluded from the result if the `WHERE` clause evaluates to either false or `NULL`.

When evaluating a `SELECT` statement with a `WHERE` clause, Tableland uses the following steps:

1. Determine the table(s) in the `FROM` clause,
2. Evaluate the conditions in the `WHERE` clause to determine the rows that meet the given condition,
3. Generate the final result set based on the rows in the previous step, with columns subset to match the `SELECT` statement.

> ℹ️ The search condition in the `WHERE` clause is made up of any number of comparisons (=, <, >, LIKE, IN, etc), combined using a range of logical operators (e.g., OR, AND, ALL, ANY, etc).

## `FROM` clause

### Structure

```sql
FROM { table_name [ * ] [ [ AS ] alias ] | ( sub_select ) [ AS ] alias }
```

### Details

The input data used by a simple `SELECT` query is a set of *N* rows each *M* columns wide. If the `FROM` clause is omitted from a simple `SELECT` statement, then the input data is implicitly a single row zero columns wide (i.e. *N*=1 and *M*=0).

If a `FROM` clause is specified, the data on which a simple `SELECT` query operates comes from the one or more tables or subqueries (`SELECT` statements in parentheses) specified following the `FROM` keyword. A subquery specified in the table or subquery clause following the `FROM` clause in a simple `SELECT` statement is handled as if it was a table containing the data returned by executing the subquery statement.

If there is only a single table or subquery in the `FROM` clause (a common case), then the input data used by the `SELECT` statement is the contents of the named table. If there is more than one table or subquery in `FROM` clause, then the contents of all tables and/or subqueries are joined into a single dataset for the simple `SELECT` statement to operate on. Exactly how the data is combined depends on the specific [`JOIN` clause](#join-clause) (i.e., the combination of `JOIN` operator and `JOIN` constraint) used to connect the tables or subqueries together.

> ℹ️ When more than two tables are joined together as part of a `FROM` clause, the `JOIN` operations are processed in order from left to right. In other words, the `FROM` clause (A _join-op-1_ B _join-op-2_ C) is computed as ((A _join-op-1_ B) _join-op-2_ C).

## `JOIN` clause

### Structure

```sql
JOIN from_clause [ ON on_expression | USING ( column_name [, ...] ) ]
```

### Details

Only simple `JOIN` clauses are supported in Tableland. This means that all joins in Tableland are based on the cartesian product of the left and right-hand datasets. The columns of the cartesian product dataset are, in order, all the columns of the left-hand dataset followed by all the columns of the right-hand dataset. There is a row in the cartesian product dataset formed by combining each unique combination of a row from the left-hand and right-hand datasets. In other words, if the left-hand dataset consists of $N_l$ rows of $M_l$ columns, and the right-hand dataset of $N_r$ rows of $M_r$ columns, then the cartesian product is a dataset of $N_l \times N_r$ rows, each containing $N_l + N_r$ columns.

If the `JOIN` operator does not include an `ON` or `USING` clause, then the result of the `JOIN` is simply the cartesian product of the left and right-hand datasets. If the `JOIN` operator does have `ON` or `USING` clauses, those are handled according to the following rules:

- If there is an `ON` clause then the `ON` expression is evaluated for each row of the cartesian product as a [boolean expression](https://sqlite.org/lang_expr.html#booleanexpr). Only rows for which the expression evaluates to true are included from the dataset.
- If there is a `USING` clause then each of the column names specified must exist in the datasets to both the left and right of the `JOIN` operator. For each pair of named columns, the expression "lhs.X = rhs.X" is evaluated for each row of the cartesian product as a boolean expression. Only rows for which all such expressions evaluates to true are included from the result set. The column from the dataset on the left-hand side of the `JOIN` operator is considered to be on the left-hand side of the comparison operator (=) for the purposes of comparison.
  For each pair of columns identified by a `USING` clause, the column from the right-hand dataset is omitted from the joined dataset. This is the only difference between a `USING` clause and its equivalent `ON` constraint.
