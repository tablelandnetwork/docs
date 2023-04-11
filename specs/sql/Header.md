## Tableland SQL Language Specification

![stable](https://img.shields.io/badge/status-stable-brightgreen.svg?style=flat-square)

Author(s): [@carsonfarmer](https://github.com/carsonfarmer), [@brunocalza](https://github.com/brunocalza), [@jsign](https://github.com/jsign)

### Synopsis

Tableland understands a small subset of the standard SQL language. It does omit many features while at the same time adding a few features of its own. This document attempts to describe precisely what parts of the SQL language Tableland does and does not support. A list of supported data types is also provided. The SQL language supported by Tableland is a [subset of the SQLite SQL language specification](https://www.sqlite.org/lang.html) (and as such, we borrow heavily from their documentation with attribution), with additional constraints specific to Tableland operations.

This general SQL specification is broken down into two core sub-documents (which are linked below). This specification is a living document, and as such, may be updated over time. Proposals for the addition of SQL language features and data types may be submitted by the Tableland community over time. These proposals will be evaluated for technical feasibility, utility to the community, and longer-term sustainability.

#### Table of Contents
