---
title: Grant & revoke access
sidebar_label: Access control
description: Grant or revoke access to table writes using SQL statements.
keywords:
  - grant
  - revoke
  - access control
  - access control list
  - grant
  - revoke
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Tableland allows for _some_ SQL-based access control, along with smart contracts controllers. Developers can provision access to certain addresses using the `GRANT` or `REVOKE` keywords, which defines high-level write permissions. Only _the owner_ can write this access control query.

## Usage

To grant permissions for all table mutation abilities, you can make a write query that follows the general format below. Namely, you set the rules for `INSERT`, `UPDATE`, or `DELETE` permissions on a specific table to a specific onchain address. Keep in mind the `0x` address should be treated as a `TEXT` value and **wrapped in single quotes**, and the examples below show `0xYOUR_EVM_ADDRESS` but be sure to update this accordingly with the correct EVM address.

<Tabs>
<TabItem value='grant' label="GRANT" default>

```sql
GRANT
  INSERT,
  UPDATE,
  DELETE
ON my_table
TO '0xYOUR_EVM_ADDRESS'
```

</TabItem>
<TabItem value='revoke' label="REVOKE">

```sql
REVOKE
  INSERT,
  UPDATE,
  DELETE
ON my_table
TO '0xYOUR_EVM_ADDRESS'
```

</TabItem>
</Tabs>

The primary difference between the keywords is the following:

- `GRANT`: Allows the caller to grant an address permissions on a table.
- `REVOKE`: Removes any of the privileges that were enabled for an address by way of `GRANT`.

:::note
At this time, the most robust features are only available at the smart contract level.
:::

## Example statements

To `GRANT` permissions for _all_ table mutation abilities, you can execute a query that defines all write possibilities to an address.

```sql
GRANT
  INSERT,
  UPDATE,
  DELETE
ON
  my_table
TO
  '0xYOUR_EVM_ADDRESS';
```

Perhaps at a point in the future, you decide to `REVOKE` the permission to `DELETE` rows via another access control write query:

```sql
REVOKE
  DELETE
ON
  my_table
FROM
  '0xYOUR_EVM_ADDRESS';
```

:::tip
For more information on `GRANT` and `REVOKE`, see the [SQL specification](/specs/sql/).
:::

## Precedence

At a lower level, it's possible to set a custom controller using a smart contract. Once a smart contract controller has been configured for a table, it takes precedence over any `GRANT` or `REVOKE` statements. If that smart contract controller is ever removed and set back to its initial value ("unsetting" to the `0x0` address), the `GRANT` and `REVOKE` statements go back into effect. Again, what's described here with controllers and setting/unsetting is only possible at the smart contract level and does not happen with pure SQL.
