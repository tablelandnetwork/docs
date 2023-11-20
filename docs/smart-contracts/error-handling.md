---
title: Error handling
description: Look at some error handling strategies when writing onchain SQL.
keywords:
  - tableland smart contracts
---

Onchain SQL is a superpower, but the process can be a bit challenging upon starting. The main reason is because writing SQL in smart contracts doesn't paint the full picture because SQL validation happens offchain within the decentralized Tableland network of nodes.

## Common hurdles

If you're running into issues, it likely has to do with three scenarios:

1. **Insufficient funds**: Your balance is too low and can't pay for the transaction's execution.
2. **Incorrect permissions**: You're trying to perform an action that cannot be executed.
3. **Invalid SQL**: You performed smart contract calls correctly but did not use the correct SQL syntax.

In the first case, it's rather straightforward; check the balance of the account that's trying to send the transaction. Sometimes, the root cause is accidentally being connected to the wrong network, so make sure that everything is configured properly.

With the second case, you might be trying to do something that cannot be executed because it breaks some onchain rules. This will often lead to an error about "cannot estimate gas" because the execution is impossible, so the gas associated is unable to be estimated. Make sure that, for example, if you're writing to a table, you have the permissions to do so.

The final scenario is a bit more nuanced. Smart contract embedded SQL doesn't go through any validation to reduce associated costs; it would get quite expensive to put a SQL parser onchain! Because Tableland is part onchain, part offchain, you can still figure out what happened when the execution of a table create or write was successful but never materialized.

## Using the CLI

The easiest way to troubleshoot table create or write issues is with the [CLI](/cli). With this tool, one command is particularly helpful:

```bash
tableland receipt <transaction_hash>
```

With the `receipt` command, you can pass the transaction hash associated with an onchain create or write. Doing so will return an error message and description, such as describing an invalid create statement or some missing quotation marks are a text value. The CLI portion of the docs also [details those common errors](/cli/errors) and what to look out for. And in a similar vein, the `read` command is useful as well because you can see what data was actually added to the table itself.
