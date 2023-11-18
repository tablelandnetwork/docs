---
title: ORM support
description: Simplify working with data and writing SQL statements using an Object-Relational Mapping (ORM) tool.
keywords:
  - orm
  - object relational mapping
  - drizzle
  - drizzle-orm
  - d1-orm
  - databases/sql
  - cloudflare d1
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Since Tableland supports [Cloudflare’s `D1Database` interface](https://developers.cloudflare.com/d1/platform/client-api/), this means there is also support for an ORM. Some examples include [`d1-orm`](https://docs.interactions.rest/d1-orm/), [`@databases/sql`](https://www.atdatabases.org/docs/sql), and [`drizzle-orm`](https://orm.drizzle.team/docs/quick-sqlite/d1).

## Prerequisites

Before getting started, be sure the `@tableland/sdk` package is installed:

```npm2yarn
npm install @tableland/sdk
```

It's also a best practice to use table [`aliases`](/sdk/database/aliases) to ensure compatability due to Tableland's unique table format (`{prefix}_{chainId}_{tableId}`). Aliases make it easy to reference tables by a human-readable name, while Tableland handles the underlying unique table identifier.

We'll demonstrate this with the `jsonFileAliases` helper, designed for Node.js environments.

```npm2yarn
npm install @tableland/node-helpers
```

Make sure these are both imported into your project before moving onto the ORM sections:

```js
import { Database } from "@tableland/sdk";
import { jsonFileAliases } from "@tableland/node-helpers";
```

And lastly, we'll instantiate our `Database` before passing it to the ORM, which will operate on the instance. See the [signers](/sdk/database/signers) documentation for more information on how to set that up.

```js
const signer = /* set up your ethers signer */
const db = new Database({ signer, aliases: jsonFileAliases("./tableland.aliases.json") });
```

## `d1-orm`

### Installation & setup

Install the dependency:

```npm2yarn
npm install d1-orm
```

### Usage

Here’s a quick example of creating, updating, and querying a table via a Model object:

```js
import {
  D1Orm,
  DataTypes,
  Model,
  GenerateQuery,
  QueryType,
  type Infer,
} from "d1-orm";

// The `db` instance is from the previous section
const orm = new D1Orm(db);

// Note: the `users` table name is possible due to the `aliases`
// Otherwise, it'd have to be in the `{prefix}_{chainId}_{tableId}` format
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
await create.txn?.wait();

const { meta: write } = await users.InsertOne({
  name: "Bobby Tables",
  email: "bobby-tab@gmail.com",
});
await write.txn?.wait();

const { results } = await users.All({
  where: { name: "Bobby Tables" },
  limit: 1,
  offset: 0,
  orderBy: ["id"],
});
```

## `@databases/sql`

### Installation & setup

Install the dependency:

```npm2yarn
npm install @databases/sql
```

### Usage

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

// First, we'll test out using sql identifiers to create a table
const primaryKey = sql.ident("id");
let query = sql`CREATE TABLE test_sql (${primaryKey} integer primary key, counter integer, info text);`;
const { text, values } = query.format(sqliteFormat);
const { meta: create } = await db.prepare(text).bind(values).run();
const { name: tableName } = await create.txn?.wait();
console.log(`Created table ${tableName}`);

// Insert some data
query = sql`INSERT INTO ${sql.ident(tableName)} (counter, ${sql.ident("info")})
    VALUES (${one}, 'one'), (2, 'two'), (3, ${three}), (${four}, 'four');`;
const { text, values } = query.format(sqliteFormat);
const { meta: write } = await db.prepare(text).bind(values).run();
await write.txn?.wait();

// Read some data
query = sql`SELECT * FROM ${sql.ident(
  tableName
)} WHERE counter >= ${boundValue};`;
const { text, values } = query.format(sqliteFormat);
const { results } = await db.prepare(text).bind(values).all();
console.log(`Data from table: ${results}`);
```

## `drizzle-orm`

### Installation & setup

Install the dependency:

```npm2yarn
npm install drizzle-orm
```

### Usage

```js
import { type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// See https://orm.drizzle.team/docs/quick-sqlite/d1
const user = sqliteTable("user", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
});
type User = InferSelectModel<typeof user>;
type NewUser = InferInsertModel<typeof user>;

// Set up the database connection
const database = drizzle(db, { schema: { user } });

// Create a table
const { meta: create } = await db
  .prepare(
    "CREATE TABLE user (id integer primary key, name text not null, email text not null unique);"
  )
  .run();
await create.txn?.wait();

// Insert a row
const values: NewUser = {
  id: 1,
  name: "John Doe",
  email: "john-doe@gmail.com",
};
const { meta: write } = await database.insert(user).values(values).run();
await write.txn?.wait();

// Read from the table
const results: User[] = await database.select().from(user);
```

### Drizzle migrations

Note that table migrations with `drizzle-kit` won't work without some customizations due to some slight SQL incompatibilities. This can be resolved with a custom migrations script that you implement on your own. Namely, if you use the default migration functionality, it’ll use the `INDEX` keywords which is not supported in Tableland:

```sql
CREATE TABLE `teams` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL UNIQUE,
	`slug` text NOT NULL UNIQUE,
	`personal` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `nameIdx` ON `teams` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `slugIdx` ON `teams` (`slug`);--> statement-breakpoint
```

Instead, we need the migrations file to look like the following—the `UNIQUE INDEX` constraint is removed from the end of the file:

```sql
CREATE TABLE `teams` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL UNIQUE,
	`slug` text NOT NULL UNIQUE,
	`personal` integer NOT NULL
);
```

#### Installation

First, install `drizzle-kit`:

```npm2yarn
npm install drizzle-kit
```

#### Setup

In order to do this, we’ll need a custom script that handles this logic and removes the `CREATE UNIQUE INDEX` lines. Basically, within a migrations, you need to parse out the `--> statement-breakpoint` lines that have the pattern described above, store migrations in Tableland table, and then use _this_ file as the migrations file. We'll store all of this in a folder called `drizzle` in the root of our project.

Here’s an example of how to do this—notice the `crypto` package is also used to hash the file contents to ensure the file hasn’t been tampered with. We're also assuming an asynchronous aliases file is set up, as described in the [aliases](/sdk/database/aliases#async-implementation) section.

Once the following is set up, you can run `npm run gen-migrate` to generate the migrations file, and then `npm run exec-migrate` to execute the migrations. These would exist is your `package.json` scripts as:

<Tabs groupId="sdk">
<TabItem value="js" label="JavaScript" default>

```json
{
  "scripts": {
    "gen-migrate": "drizzle-kit generate:sqlite",
    "exec-migrate": "node scripts/migrate.js"
  }
}
```

</TabItem>
<TabItem value="ts" label="TypeScript)">

```json
{
  "scripts": {
    "gen-migrate": "drizzle-kit generate:sqlite",
    "exec-migrate": "tsx scripts/migrate.ts"
  }
}
```

</TabItem>
</Tabs>

Note the [`tsx`](https://www.npmjs.com/package/tsx) command is used to run TypeScript files directly.

Here is the core logic in a `migrate.js` file within a `scripts` folder. Running this script directly will execute a migration that will create a `migrations` table and then execute all migrations in the `drizzle` folder:

<Tabs groupId="sdk">
<TabItem value="js" label="JavaScript" default>

```ts title="scripts/migrate.js"
import { Database } from "@tableland/sdk";
import { jsonFileAliases } from "@tableland/node-helpers";
import { createHash } from "crypto";
import { readFile, readdir, stat } from "fs/promises";
import path from "path";

const migrationsFolder = "drizzle";

const aliases = /* set up your async aliases file */

const signer = /* set up your ethers signer */

const tbl = new Database({ signer, aliases });

async function migrate() {
  // Set up a reference `a` to the aliases file
  const a = await aliases.read();
  // Create the migrations table if it doesn't exist
  if (!a.migrations) {
    const res = await tbl
      .prepare(
        "create table migrations (id integer primary key, file text not null unique, hash text not null);",
      )
      .all();
    if (res.error) {
      throw new Error(res.error);
    }
    console.log("Created migrations table.");
  }
  // Get the migrations `drizzle` folder and find all table migrations, which get stored in the table
  const files = await readdir(migrationsFolder);
  const migrations = await tbl
    .prepare("select * from migrations order by id asc")
    .all();
  if (migrations.error) {
    throw new Error(migrations.error);
  }

  // Loop through the migrations files and get relevant information
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const s = await stat(path.join(migrationsFolder, file));
    if (s.isDirectory()) {
      continue;
    }
    const fileBytes = await readFile(path.join(migrationsFolder, file));
    const hash = createHash("sha256").update(fileBytes).digest("hex");
    if (i < migrations.results.length) {
      const migration = migrations.results[i];
      if (
        migration.id === i &&
        migration.file === file &&
        migration.hash === hash
      ) {
        continue;
      }
      throw new Error("Migration files inconsistent with migrations table.");
    }
    // Split the file into statements, removing the `--> statement-breakpoint` lines,
    // which resolves the `UNIQUE INDEX` issue
    const statements = fileBytes.toString().split("--> statement-breakpoint");
    if (statements.length === 0) {
      continue;
    }
    // Execute the statements
    const preparedStatements = statements.map((s) => tbl.prepare(s));
    console.log(`Executing migration ${file}...`);
    const res = await tbl.batch(preparedStatements);
    const errors = res.filter((r) => r.error).map((r) => r.error);
    if (errors.length > 0) {
      throw new Error(errors.join("\n"));
    }
    console.log(`Success!`);
    // Write these values to our migrations table
    const { error } = await tbl
      .prepare("insert into migrations (id, file, hash) values (?, ?, ?)")
      .bind(i, file, hash)
      .run();
    if (error) {
      throw new Error(error);
    }
  }
  console.log("Migrations complete.");
}

migrate().catch(function (err) {
  console.log("migrate failed:");
  console.error(err);
  process.exit();
});

migrate();
```

</TabItem>
<TabItem value="ts" label="TypeScript">

```ts title="scripts/migrate.ts"
import { Database } from "@tableland/sdk";
import { jsonFileAliases } from "@tableland/node-helpers";
import { createHash } from "crypto";
import { readFile, readdir, stat } from "fs/promises";
import path from "path";

const migrationsFolder = "drizzle";

const aliases = /* set up your async aliases file */

const signer = /* set up your ethers signer */

const tbl = new Database({ signer, aliases });

async function migrate() {
  // Set up a reference `a` to the aliases file
  const a = (await aliases.read()) as Record<
    string,
    string | undefined
  >;
  // Create the migrations table if it doesn't exist
  if (!a.migrations) {
    const res = await tbl
      .prepare(
        "create table migrations (id integer primary key, file text not null unique, hash text not null);",
      )
      .all();
    if (res.error) {
      throw new Error(res.error);
    }
    console.log("Created migrations table.");
  }
  // Get the migrations `drizzle` folder and find all table migrations, which get stored in the table
  const files = await readdir(migrationsFolder);
  const migrations = await tbl
    .prepare("select * from migrations order by id asc")
    .all<{ id: number; file: string; hash: string }>();
  if (migrations.error) {
    throw new Error(migrations.error);
  }

  // Loop through the migrations files and get relevant information
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const s = await stat(path.join(migrationsFolder, file));
    if (s.isDirectory()) {
      continue;
    }
    const fileBytes = await readFile(path.join(migrationsFolder, file));
    const hash = createHash("sha256").update(fileBytes).digest("hex");
    if (i < migrations.results.length) {
      const migration = migrations.results[i];
      if (
        migration.id === i &&
        migration.file === file &&
        migration.hash === hash
      ) {
        continue;
      }
      throw new Error("Migration files inconsistent with migrations table.");
    }
    // Split the file into statements, removing the `--> statement-breakpoint` lines,
    // which resolves the `UNIQUE INDEX` issue
    const statements = fileBytes.toString().split("--> statement-breakpoint");
    if (statements.length === 0) {
      continue;
    }
    // Execute the statements
    const preparedStatements = statements.map((s) => tbl.prepare(s));
    console.log(`Executing migration ${file}...`);
    const res = await tbl.batch(preparedStatements);
    const errors = res.filter((r) => r.error).map((r) => r.error);
    if (errors.length > 0) {
      throw new Error(errors.join("\n"));
    }
    console.log(`Success!`);
    // Write these values to our migrations table
    const { error } = await tbl
      .prepare("insert into migrations (id, file, hash) values (?, ?, ?)")
      .bind(i, file, hash)
      .run();
    if (error) {
      throw new Error(error);
    }
  }
  console.log("Migrations complete.");
}

migrate().catch(function (err) {
  console.log("migrate failed:");
  console.error(err);
  process.exit();
});

migrate();
```

</TabItem>
</Tabs>
