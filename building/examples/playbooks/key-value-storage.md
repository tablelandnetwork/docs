---
description: Did you know that tables can be used to store arbitrary key/value data?
---

# Key Value Storage

Tableland is all about tables, and relationships between tables. But did you know that relational databases make excellent key/value stores? Plus, when you store key/value data in a relational database, your keys become relational links to other content and data.

So let's say you want to store key/value pairs that map strings to JSON data. Tableland can help! This is as easy as creating a table with these two column types, and specifying that your key column (e.g., `k`) is a `varchar(255)` primary key, and you value column (e.g., `v` is `json`):

```sql
CREATE TABLE key_values (
    k varchar(255) primary key,
    v json
);
```

Now, with the queryable tablename in hand `key_values_99`, adding key/value pairs to the table is as easy as:

```sql
INSERT INTO key_values_99 VALUES ("key-uuid-or-something", '{"somelarge_json": "bla"}');
```

And this is exactly the type of repetitive query string that you can easily wrap in an app or library to make it super simple. Check out our [javascript-sdk.md](../../javascript-sdk.md "mention") docs for details on creating, updating, and querying tables from JavaScript. Once you have the table created, putting and getting values from it is as easy as the following pseudo JavasScript code:

```typescript
async function put(key: string, value: any) {
    const json = JSON.stringify(value);
    return tbl.query(`INSERT INTO key_values_99 VALUES (${key}, ${json});`)
}

async fuction get(key: string) {
    return tbl.query(`SELECT v FROM key_values_99 WHERE k = ${key}`).rows[0]
}
```

And there you have it, key/value data in relational tables. Now imagine linking arbitrary JSON data to other structured data via its key, or storing encrypted blobs of data in a `text` -> `serial` key/value-style table? The sky is the limit now that you have Tableland at your fingertips.
