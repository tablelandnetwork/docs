:::warning
ENS support is very experimental. Long term support is not gaurunteed.
:::warning

You must specify the `enableEnsExperiment` flag, either in your `.tablelandrc` file or your flags. You must also specify an `ensProviderUrl`, which should use a provider for an ENS compatible testnet or mainnet.

Your private key must correspond to the owner of the ENS domain or subdomain you are using.

To set your namespaces, you can use the `tableland namespace set` command, like so:

```
tableland namespace set foo.bar.eth example=my_table_31337_1 secondexample=my_other_table_31337_2
```

This will result in `example.foo.bar.eth` pointing to `my_table_31337_1` and `secondexample.foo.bar.eth` pointing to `my_other_table_31337_2`.

To see a table associated with a namespace, you can you the `tableland namespace get` command.

```
tableland namespace get example.foo.bar.eth
// Result:
my_table_31337_1
```

To use these names tables in queries, you wrap them in brackets. For example:

```
tableland read "select * from [example.foo.bar.eth];"
```
