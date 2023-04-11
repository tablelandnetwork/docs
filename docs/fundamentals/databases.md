---
title: Databases & SQL
description: Briefly look under the hood at relational databases.
keywords:
  - databases
  - relational database
---

Although an oversimplification, the Tableland network is sorta like a bunch of SQL databases communicating & agreeing with one another about table state directed by on-chain instructions. It's important to understand the very basics of what databases are and why a permissionless relational database is a perfect solution for scaling structured web3 data.

## Background

Put simply, a database is a way to store, manipulate, and control data with permissions. It needs to be efficient, organized, flexible (with constraints), and easy to use.

Generally, data comes in two buckets: structured and unstructured. Relational databases store information in tables that can relate to one another. Visually, just as a spreadsheet stores columns and rows, a SQL tables does this as well. It's a perfect example of how structured data should be stored, and for what it's worth, a table _can_ store unstructured blobs of data, too. There are also database features that guarantee only provisioned users can access and mutate the data itself.

The Tableland protocol is predicated on the fact that the internet is lacking a way to easily store and access structured data, which is what a _relational database_ is meant for and why a shared relational data layer can unlock a lot of value.

### Why relational databases?

The first relational database was created in the early 1970s and formed the basis of modern relational database management systems (RDBMS). These databases are incredibly flexible and can be used to store many different types of data. With SQL as a standard interface, they're easy to learn and use, and they've become the backbone of many real-world applications, from finance to healthcare to e-commerce.

One of the key benefits of relational databases is their ability to handle complex data relationships. By breaking data down into tables and defining relationships between them, relational databases can store and access massive amounts of data efficiently and accurately. They have also evolved to handle a variety of data types, from simple integers and strings to blobs of information.

This makes them incredibly versatile and useful for a wide range of applications. In recent years, relational databases have continued to evolve, with advances in cloud computing, distributed databases, and new data storage technologies. This has led to even greater performance and scalability, making relational databases more powerful than ever.

### Structured vs. unstructured data

Generally, _unstructured_ data is a bit harder to analyze and process since it is stored in its native format. Low level operations, like some data as part of blockchain transactions, might have a [blob](https://en.wikipedia.org/wiki/Binary_large_object) of unstructured data. Things like large text documents, e-mails, photos, video, logs, etc. are examples of unstructured data. Storing "small" unstructured data isn't a limitation for Tableland and its relational database—you can create a key-value store with SQL tables—but it differs from what structured data is. Keep in mind that "large" unstructured data is best served by file storage networks like Filecoin.

_Structured_ data is stored in a predefined format. It is predictable and easy to understand—if you've ever used a spreadsheet, you already know the very basics of how relational databases are designed and work. You can easily categorize structured data into a series of rows and columns with specifics types (like a number or string), so categorizing and finding the right data is rather straightforward. In fact, much of the EVM standards ([EIP](https://eips.ethereum.org/)s) showcase how people have defined structured data interfaces, like the [ERC20](https://eips.ethereum.org/EIPS/eip-20) or [ERC721](https://eips.ethereum.org/EIPS/eip-721) tokens.

However, unstructured data is perfectly acceptable for the relational database model. There are some specific use cases in distributed systems where other database types (NoSQL database, document store, etc.) might make more sense, but generally, it's quite proven that relational databases can handle these scenarios. Namely, relational databases provide strong data consistency, reliability, and durability—along with powerful querying capabilities, such as joins, filtering, sorting, and aggregating, which are not always available in NoSQL or other types of databases.

Overall, using a SQL database provides the best balance between data consistency, transactional support, and querying capabilities.

### SQL basics

SQL stands for _Structured Query Language_. It's a way to interface with the database—whether that's creating tables to store data, writing data to those tables, or accessing the data itself. All of these come with human readable syntax that makes it easy to work with. For example, to create a table, you pass a statement that looks something like the following:

```sql
CREATE TABLE my_web3_table (id integer, name text);
```

You define the table by its name and structure, and the schema is passed such that each column in that table has some strongly typed association.

When you mutate data, it might resemble something like this:

```sql
INSERT INTO my_web3_table (id, name) VALUES (1, 'Bobby Tables');
```

You instruct the database how you want the data to be altered—to change the table by inserting a `1` and a `Bobby Tables`, and each of these match with the table's defined types and/or constraints. Only the one who owns the table or has the correct permissions defined by a permissionless controller can mutate values. Then, you can access this data (non-mutating) using a read query:

```sql
SELECT id, name FROM my_web3_table;
```

You can compose data across tables, too, making web3 data storage on Tableland quite scalable and allows you to harness the power of web3 through multichain applications. For example, maybe you have data stored in `my_web3_table` and some other application stores data in their `other_web3_table`. You can actually bring the data together by selecting "matching" columns from each table and combining the data itself for truly collaborative data.

:::tip

Tableland's [SQL playbooks](/playbooks/sql/) walk through how to use SQL, blockchain-specific limitations / features, and general how-tos for designing tables and queries.

:::

## Blockchains & databases

A common misnomer in web3 is that blockchains are databases. They are not databases but a global state machine that transparently and permissionlessly shares computation through incentivized program execution and consensus. If you've ever tried to query on-chain data without an external indexing solution, that experience alone should paint the picture quite clear about how blockchains are _not_ databases (it's not easy!). But, since blockchains provide a global framework for ownership, identification, computation, and state, they act as the perfect base layer _for_ a database.

But, web3 has lacked a native relational database and SQL, making it difficult to build complex decentralized applications that require efficient data storage and retrieval—until Tableland came along!

Tableland solves this problem by providing a secure and scalable foundation for cross-organizational data liquidity and collaboration. By leveraging the power of relational databases and SQL, Tableland makes it possible to build more efficient, powerful, and innovative decentralized applications to create a more efficient and collaborative web3 ecosystem. Whether you're building a small dApp or a massive enterprise system, relational databases and SQL are essential tools for storing and accessing data. With Tableland, you can take advantage of their power and flexibility in the web3 ecosystem, unlocking new economic opportunities and driving innovation.

There are two components to Tableland: data _availability_, and data _accessibility_. If you think about how a database works, you have some set of instructions for creating or mutating data, which directly alters the database's state. When you want to access that data, you're not altering table data but only reading it (e.g., retrieve a set of values, aggregate across tables, etc.).

In other words, think of any chain as the means to define access control in a secure and trustless way, and the instructions for what to do are also only controlled by the chain's data itself. With this model in mind, any mutating SQL data is made available by the base chain. But, since blockchains aren't designed for complex queries, there needs to exist additional, off-chain infrastructure to access that on-chain data. Rather than opting for a centralized approach, applications can leverage a [hybrid state](/fundamentals/architecture/protocol-design#hybrid-state) model; the data is directly accessible only on the Tableland network.
