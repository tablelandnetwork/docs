---
title: Databases & SQL
description: Briefly look under the hood at relational databases.
synopsis: The network is akin to a bunch of databases communicating & agreeing with one another about things that happened on-chain. Although it's an oversimplification, the core premise behind it all is a relational database, which isn't flashy by any means but adds a new dimension to web3 storage.
keywords:
  - databases
  - relational database
---

## Database basics

Put simply, a database is a way to store, manipulate, and control data (with the right permissions). It needs to be efficient, organized, flexible (with constraints), and easy to use.

Generally, data comes in two buckets: structured and unstructured. Relational databases store information in tables that can relate to one another. Visually, just as a spreadsheet stores columns and rows, a SQL tables does this as well. It's a perfect example of how structured data should be stored, and a table _can_ store unstructured blobs of data, too. There are also database features that guarantee only provisioned users can access and mutate the data itself.

The Tableland protocol is predicated on the fact that the internet is lacking a way to easily store and access structured data, which is what a _relational database_ is meant for.

## What is SQL?

SQL stands for _Structured Query Language_. It's a way to access the database and tell it what to do, whether that's creating tables to store data, writing data to those tables, or accessing the data itself. All of these come with human readable syntax that makes it easy to work with. For example, to create a table, you pass a statement that looks something like `CREATE TABLE table_name (id integer, name text)`. You define the table by its name and structure, where the schema is passed such that each column in that table has some strongly typed association.

When you mutate data, it might resemble something like `INSERT INTO table_name (id, name) VALUES (1, 'Bobby Tables')`. You instruct the database how you want the data to be altered—to change the table by inserting a `1` and a `Bobby Tables`. Then, you can access this data (non-mutating) using a read query, such as `SELECT * FROM table_name`.

## Databases in web3

A common misnomer in web3 is that blockchains are databases. They are not. If you've ever tried to query on-chain data without an external indexing solution, that experience alone should paint the picture quite clear. But, since blockchains provide a global framework for ownership, identification, computation, and state, it is the perfect base layer for a database to _be built on top of_.

In other words, think of any chain as the means to define access control in a secure and trustless way, and the instructions for what to do are also only controlled by the chain itself. With this model in mind, any mutating SQL data is made available by the base chain. But, since blockchains aren't designed to be queried, there needs to exist additional, off-chain infrastructure to access that on-chain data. Rather than opting for a centralized approach, applications can leverage a hybrid model when the data is directly accessible only on the Tableland network.
