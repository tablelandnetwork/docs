---
title: Datasets & DAOs
description: Store and manage your data in a decentralized, open, and collaborative way.
keywords:
  - dataset
  - datasets
  - data dao
  - datadao
---

Collaborative data is a perfect use case for Tableland! By default, only the table's creator has full admin controls and can mutate data, but additional access controls can be provisioned to open up the table to other users. Additionally, all data stored in table is openly readable, so it's a great way to share data with the world.

## Table design

Let's consider a simple use case where we're storing a curated list of different chains and their respective chain ID. We want to be able to add new chains to the list, and we want to be able to update the chain ID if it changes. We also want to be able to add a description for each chain.

Here's an example of a table that would work for this use case:

| Chain Name   | Chain ID | Description          |
| ------------ | -------- | -------------------- |
| Ethereum     | 1        | Ethereum mainnet L1  |
| Optimism     | 10       | Optimistic rollup L2 |
| Polygon      | 137      | Polygon PoS L2       |
| Filecoin     | 314      | Filecoin FVM L1      |
| Arbitrum One | 42161    | Arbitrum rollup L2   |

When we create this table, we'll need to specify the following:

```sql
CREATE TABLE chains (
  name TEXT NOT NULL,
  id INTEGER PRIMARY KEY NOT NULL,
  description TEXT
);
```

## Permissions

Upon creating the table, the creator will have full admin access to the table. This means they can add new rows, update existing rows, and delete rows. They can also grant other users access to the table for each of these actions. The [`GRANT`](/sql/access-control) command is used to grant access to a table, and if permissions must be revoked, the `REVOKE` command can be used as well.

```sql
GRANT INSERT, UPDATE ON chains TO 0x1234567890123456789012345678901234567890;
```

The above mutating SQL statement will grant full access permissions to another collaborator such that they can both add and update existing records in the table based on their wallet address. Since table reads are fully open, anyone that wants to consume the data can do so without needing to grant any permissions.

### Fine-grained access control

The `GRANT` and `REVOKE` syntax is designed to allow for admin-level permissions on the table. However, in a DataDAO, it's likely you want to gate access to specific rows and columns, and it's also likely you want to dynamically grant access to a group of users rather than a single user. For example, you might want to let anyone who holds a DAO NFT token to be able to add new rows to the table, but only the DAO's creator can update existing rows.

Currently, the `GRANT` and `REVOKE` syntax is rather limited in this regard. To accomplish this, you'll need to use [smart contracts](/smart-contracts/controller/) to handle access controls with onchain checks before mutating the table. This is a bit more involved, but it's also more flexible and allows for more complex access control logic.

## Queries

For those wanting to contribute to the dataset, they can use the `INSERT` command to add new rows to the table. For example, if we wanted to add a new chain to the table, we could do so with the following SQL statement:

```sql
INSERT INTO chains (id, name) VALUES ('Arbitrum Nova', 42170);
```

This assumes that either the table's owner or the provisioned `0x1234567890123456789012345678901234567890` account is writing the data, but anyone can read the data. If we wanted to update the description for the Arbitrum One chain, we could do so with the following SQL statement:

```sql
UPDATE chains SET description = 'Arbitrum DA L2' WHERE chain_id = 42170;
```

And anyone can read the data with a simple `SELECT` statement:

```sql
SELECT * FROM chains;
```

## Next steps

There are endless use cases for open datasets! And since the data is fully readable, it can easily be used by external services, like data pipelines that feed into other applications. If you're interested in building a DataDAO, check out the [DataDAO tutorial](/tutorials/data-dao-polygon) for more information.
