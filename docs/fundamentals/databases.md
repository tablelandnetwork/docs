---
title: Databases & SQL
description: Briefly look under the hood at relational databases.
synopsis: Although it's an oversimplification, the network is like a bunch of SQL databases communicating & agreeing with one another about things that happened on-chain. It's important to understand the very basics of what databases are and why a relational is a perfect solution for scaling structured web3 data.
keywords:
  - databases
  - relational database
---

## Background

Put simply, a database is a way to store, manipulate, and control data (with the right permissions). It needs to be efficient, organized, flexible (with constraints), and easy to use.

Generally, data comes in two buckets: structured and unstructured. Relational databases store information in tables that can relate to one another. Visually, just as a spreadsheet stores columns and rows, a SQL tables does this as well. It's a perfect example of how structured data should be stored, and a table _can_ store unstructured blobs of data, too. There are also database features that guarantee only provisioned users can access and mutate the data itself.

The Tableland protocol is predicated on the fact that the internet is lacking a way to easily store and access structured data, which is what a _relational database_ is meant for.

### Structured data

Storing _unstructured_ data isn't a limitation for relational databases—you can create a key-value store with SQL tables—but differs from what structured data is. Generally, unstructured data is a bit harder to analyze and process since it is stored in its native format. A low level operations, like some data as part of blockchain transactions, might have a [blob](https://en.wikipedia.org/wiki/Binary_large_object) of unstructured data.

_Structured_ data is stored in a predefined format. It is predictable and easy to understand—if you've ever used a spreadsheet, you already understand the very basics of how relational databases are designed and work. You can easily categorize structured data into a series of rows and columns, so finding the right data is rather straightforward.

### SQL basics

SQL stands for _Structured Query Language_. It's a way to interface with the database—whether that's creating tables to store data, writing data to those tables, or accessing the data itself. All of these come with human readable syntax that makes it easy to work with. For example, to create a table, you pass a statement that looks something like the following:

```sql
CREATE TABLE table_name (id integer, name text)
```

You define the table by its name and structure, and the schema is passed such that each column in that table has some strongly typed association.

When you mutate data, it might resemble something like this:

```sql
INSERT INTO table_name (id, name) VALUES (1, 'Bobby Tables')
```

You instruct the database how you want the data to be altered—to change the table by inserting a `1` and a `Bobby Tables`. Then, you can access this data (non-mutating) using a read query:

```sql
SELECT * FROM table_name
```

You can then compose data across tables, making web3 data storage on Tableland quite scalable (and, in Tableland's database) allows you to harness the power of web3 through multichain applications.

## Databases in web3

A common misnomer in web3 is that blockchains are databases. They are not. If you've ever tried to query on-chain data without an external indexing solution, that experience alone should paint the picture quite clear. But, since blockchains provide a global framework for ownership, identification, computation, and state, it is the perfect base layer for a database to _be built on top of_.

There are two components to Tableland: data _availability_, and data _accessibility_. If you think about how a database works, you have some set of instructions for creating or mutating data, which directly alters the database's state. When you want to access that data, you're not altering table data but only reading it (e.g., a single set of values, an aggregation, etc.).

In other words, think of any chain as the means to define access control in a secure and trustless way, and the instructions for what to do are also only controlled by the chain itself. With this model in mind, any mutating SQL data is made available by the base chain. But, since blockchains aren't designed for complex queries, there needs to exist additional, off-chain infrastructure to access that on-chain data. Rather than opting for a centralized approach, applications can leverage a [hybrid state](/fundamentals/network/protocol-design#hybrid-state) model; the data is directly accessible only on the Tableland network.
