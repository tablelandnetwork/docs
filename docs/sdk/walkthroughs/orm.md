---
title: ORM support
description: Simplify working with data and writing SQL statements using an Object-Relational Mapping (ORM) tool.
keywords:
  - orm
  - object relational mapping
---

Since Tableland supports [Cloudflare’s `D1Database` interface](https://developers.cloudflare.com/d1/platform/client-api/), this means there is also support for an ORM is possible via [`d1-orm`](https://docs.interactions.rest/d1-orm/). Here’s a quick example of creating, updating, and querying a table via a Model object:

```js
import {
  D1Orm,
  DataTypes,
  Model,
  GenerateQuery,
  QueryType,
  type Infer,
} from "d1-orm";
import { Database } from "@tableland/sdk";

const db = new Database({ autoWait: true });
const orm = new D1Orm(db);

const users = new Model(
  {
    D1Orm: orm,
    tableName: "users",
    primaryKeys: "id",
    uniqueKeys: [["email"]],
  },
  {
    id: {
      type: DataTypes.INTEGER,
      notNull: true,
    },
    name: {
      type: DataTypes.STRING,
      notNull: true,
    },
    email: {
      type: DataTypes.STRING,
    },
  }
);
type User = Infer<typeof users>;

const { meta: create } = await users.CreateTable({
  strategy: "default",
});

// Slight temporary hack
(users.tableName as any) = create.txn.name;

await users.InsertOne({
  name: "Bobby Tables",
  email: "bobby-tab@gmail.com",
});

const { results } = await users.All({
  where: { name: "Bobby Tables" },
  limit: 1,
  offset: 0,
  orderBy: ["id"],
});
```

Additional integrations provide some client-side safety for injecting table names, query parameters, and more via prepared statement syntax. While you don’t need [`@databases/sql`](https://www.atdatabases.org) to leverage prepared statements with the Tableland SDK, it does provide some nice methods for working with raw SQL strings.

```js
import sql, { FormatConfig } from "@databases/sql";
import { escapeSQLiteIdentifier } from "@databases/escape-identifier";
import { Database } from "@tableland/sdk";

// See https://www.atdatabases.org/docs/sqlite
const sqliteFormat: FormatConfig = {
  escapeIdentifier: (str) => escapeSQLiteIdentifier(str),
  formatValue: (value) => ({ placeholder: "?", value }),
};

// First, we'll test out using sql identifiers
const primaryKey = sql.ident("id");
const query = sql`CREATE TABLE test_sql (${primaryKey} integer primary key, counter integer, info text);`;
const { text, values } = query.format(sqliteFormat);
const { meta } = await db.prepare(text).bind(values).run();
const { name } = await meta.txn.wait();
console.log(`Created table ${name}`);
```
