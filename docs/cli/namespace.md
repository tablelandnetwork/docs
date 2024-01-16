---
title: Namespace
description: Use ENS to namespace tables.
keywords:
  - CLI
  - command line
  - tableland namespace
---

## `tableland namespace <subcommand>`

With namespaces, an [ENS domain](https://ens.domains/) can map to one or more tables, allowing the ENS name to be used over the default Tableland table naming convention. You must specify the `enableEnsExperiment` flag, either in your `.tablelandrc` file or your flags. You must also specify an `ensProviderUrl`, which should use a provider for an ENS compatible testnet or mainnet. Your private key must correspond to the owner of the ENS domain or subdomain you are using.

:::warning
ENS support is very experimental; long term support is not guaranteed!
:::

### `set <domain> <subdomain>=<name>`

To set your namespaces, you specify the ENS `domain` and the table `name` that a `subdomain` should point to. Note that one or more combinations of `<subdomain>=<name>` can be specified in a single command.

| Argument      | Type     | Description                                |
| ------------- | -------- | ------------------------------------------ |
| `<domain>`    | `string` | The primary ENS domain.                    |
| `<subdomain>` | `string` | The subdomain that points to a table name. |
| `<name>`      | `string` | The table's name.                          |

### `get <namespace>`

You can also get the table associated with a specific namespace. Here, the value for the `namespace` will be the full ENS string that includes the subdomain.

| Argument      | Type     | Description                                    |
| ------------- | -------- | ---------------------------------------------- |
| `<namespace>` | `string` | The `namespace` that maps to a specific table. |

## Example

For example, perhaps you own `foo.bar.eth` and would like to add sumdomains for `example` and `secondexample`.

```bash
tableland namespace set foo.bar.eth example=my_table_31337_2 secondexample=my_other_table_31337_3
```

This will result in `example.foo.bar.eth` pointing to `my_table_31337_2` and `secondexample.foo.bar.eth` pointing to `my_other_table_31337_3`.

Then, to see a table associated with a namespace, you can you the `get` command.

```bash
tableland namespace get example.foo.bar.eth
```

Output:

```
my_table_31337_2
```

Lastly, these names can then be used in queries by wrapping them in brackets. For example:

```bash
tableland read "select * from [example.foo.bar.eth];"
```
