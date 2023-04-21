





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
