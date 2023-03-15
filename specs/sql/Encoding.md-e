# Encoding

As mentioned in the section on [Statement Types](#statement-types), the core Tableland SQL parser accepts a semicolon-separated list of statements, which are then parsed and evaluated according to this Tableland SQL Specification. Internally, the statements are represented using an [abstract syntax tree](https://en.wikipedia.org/wiki/Abstract_syntax_tree) (AST). The internal representation of the nodes of this AST is outside the bounds of the Tableland SQL Specification, however, further details can be found in the [Go Tableland SQL Parser](https://github.com/tablelandnetwork/go-sqlparser) reference implementation.

With the above caveat in mind, the Tableland SQL Specification does define a canonical string encoding of a set of (compliant) SQL statements that have passed through the Tableland SQL Parser (and have been represented via the Parser's AST). That is, this Specification outlines — in general terms — the string encoding produced by parsing a set of Tableland SQL Specification compliant statements and re-encoding them into a canonical (string) format.

There are some nuances and corner cases that affect the final encoded string. For example, the statement `UPDATE t SET (A, b) = (1, 2);` is ultimately encoded as `update t set A = 1, b = 2`. This is because the two statements are equivalent, and their representation within the AST is identical. As such, when producing the canonical string for such a statement, the parser outputs the most conventional form.

In general, any (set of) statement(s) processed by the parser should be encoded such that,

- All SQL language components are specified using lower case ASCII characters,
- The execution of the (set of) statement(s) after encoding is _equivalent_ to the original set of statements, and
- The encoding of a (set of) statements(s) is as close as possible to the original (set of) statement(s).

Any further guarantees are left outside the scope of this specification.
