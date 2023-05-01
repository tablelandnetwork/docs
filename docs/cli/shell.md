## shell

Interact with tableland via an interactive shell environment.

```bash
tableland shell
```

This will open up a shell environment to make it easier to interact with the network:

```bash
tableland>
```

### Example

Once in the shell, you can create tables and make queries, such as a read statement:

```bash
tableland shell
tableland>select * from cli_demo_table_31337_2;
```

Which will print:

```json
{
  meta: { duration: 18.574082374572754 },
  success: true,
  results: [ { id: 1, name: 'Bobby Tables' } ]
}
{
  response: {
    meta: { duration: 18.574082374572754 },
    success: true,
    results: [ { id: 1, name: 'Bobby Tables' } ]
  }
}
```

## Using with ENS

:::warning
ENS support is very experimental. Long term support is not gaurunteed.
:::warning

## Using ENS

:::warning
ENS support is very experimental. Long term support is not gaurunteed.
:::warning

You must specify the `enableEnsExperiment` flag, either in your `.tablelandrc` file or your flags. You must also specify an `ensProviderUrl`, which should use a provider for an ENS compatible testnet or mainnet.

If an ENS text record has a record corresponding to a table, you can fetch it like so.

```bash
select * from [example.foo.bar.eth];
```

See `namespace` command for more details on how to add tables to ENS.
