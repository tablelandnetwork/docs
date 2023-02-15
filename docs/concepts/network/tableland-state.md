---
title: Data availability & network state
sidebar_label: Hybrid state
description: Understand the basic model behind on-chain writes and off-chain reads.
synopsis: Blockchains are designed so that anyone can run some arbitrary programs and share computation; they are not designed to be databases. With a hybrid model, applications can inherit components (like security & execution) from the host chain while making the data itself dynamic & accessible on the Tableland network.
keywords:
  - Tableland
  - about
---

import { ChainsList } from '@site/src/components/SupportedChains'

## Where is the data?

There are two components to Tableland: data _availability_, and data _accessibility_. If you think about how a database works, you have some set of instructions for creating or mutating data, which directly alters the database's state. When you want to access that data, you're not altering state but only reading it (e.g., a single set of values, an aggregation, etc.).

### Data availability

Tableland always needs a _host_ (or _base_) chain; currently, this includes <ChainsList type={'mainnet'} format={'string'} />. When you create a table, an ERC721 token is minted at the Tableland registry smart contract. The contract's design is quite simple:

- Anyone can create (mint) a table.
- Only permissioned actors can alter the table.

Both of these contract methods emit an event that describes the on-chain SQL action that took place. For example, if you create a table, that table is minted to the caller's address and also emits an event that describes the `CREATE TABLE` SQL statement (account or contract address, table's token ID, etc.). So, creating a table both alters the contract's on-chain storage layout (an ERC721 token is created & ownership is tracked) while telling the Tableland network what happened via an event.

When you try to alter that table, there are not any on-chain storage changes that take place in the registry contract. Rather, _only_ an event is emitted, which simply describes the mutating SQL statement (table ID, address that is trying to alter the table, etc.). All of the actual materialization of the data happens within the Tableland network of validator nodes, which watch for new events and process them in their local SQLite database accordingly.

The data is _made available_ on the host chain. If you want to recreate any table's state, you simply need to go to the Tableland registry smart contract and replay all of those events. As long as that base chain lives, a table's state can be constructed by anyone.

### Data accessibility

Every time you mutate a table's state, that data is written on-chain to event logs, but that doesn't mean the data is accessible on-chain. Smart contracts can't access event logs, so whatever mutating SQL instructions occurred can never be pulled into a smart contract's logic and used. You can't access table data without some off-chain oracle setup that reads directly from Tableland and writes values back on-chain.

Namely, data is only accessible by directly making non-mutating queries to the off-chain Tableland network. When you make a read query, that doesn't go through an on-chain action but is entirely off-chain.

The data is _made accessible_ on the Tableland network. Inherently, there are different consensus and security constraints when you look how the Tableland nodes operate. But, because the data is made available on the host chain, it provides a nice set of guarantees about the data's hardness. Overall, this adds a new dimension to web3 storage capabilities by way of a decentralized database network.

### How does everything start?

As noted, any activity affecting the state in the Tableland network starts with sending an EVM transaction to the blockchain.

This transaction can be classified into two buckets:

- The transaction is directly sent to the _Registry smart contract_ (e.g., minting a table, sending a write-query, setting a controller for ACL, transferring a table)
- The transaction is sent to an arbitrary smart contract that might call the _Registry smart contract_ as part of some flow.

In any of these cases, there will be one or multiple calls to the _Registry smart contract_ methods. These methods emit [EVM events](https://consensys.net/blog/developers/guide-to-events-and-logs-in-ethereum-smart-contracts/) that signal that something important has happened in the protocol.

These events have a type and data that Tableland validators watch and apply in the Tableland state. For example, for a `runSQL(...)` method call, an event of type `RunSQL` with data being the SQL write-query is emitted that validators will execute to mutate the table state.

Note that these EVM events are part of the transaction execution receipt in the underlying blockchain. For example, you can see [here](https://kovan-optimistic.etherscan.io/tx/0x8dab7833c6358afc604e75e742bf5f1060919ea6bda54f0ab5b5580325f15e54#eventlog) the events produced as a result of transaction execution.

### Transaction execution by validators

Any EVM transaction execution can have two results: _Success_ or _Failure_. For example, if you try to send some funds from your wallet address but you don’t have enough balance, that transaction will fail. Similarly, if you call a smart-contract method and run out of gas in the middle of the execution, all the pending affected states are rollbacked.

Tableland works in the same way. Tableland validators **watch for successful transaction executions** and apply those changes in the Tableland state. This explains some apparent fact: failed transactions don’t affect the state. This means there won’t be dangling changes in the Tableland network compared to the rollbacked on-chain state that this transaction tried to change; both _commit_ or _rollback_ decisions will be aligned.

Recall that in the previous section, we mentioned that we could have one or more events emitted in a single EVM transaction. The following are some examples of how this can happen:

- If you send an EVM transaction to the _`runSQL(…)`_ smart contract, this method only emits one event. This is precisely the example [shown before](https://www.notion.so/Affecting-Tableland-State-fb8cf62da96d4175a22c9a3b953d6c76).
- Suppose you created a smart contract with a method `mintTwoTables(...)` where the implementation calls twice the `createTable(...)` method of the _Registry smart contract._ In that case, this transaction receipt will have two events emitted.

A validator will take this successful EVM transaction packed with N events and **execute all of them atomically in the Tableland state**. But what does this mean?

### Atomicity and failure of EVM transactions execution

Let’s dive deeper into what _atomicity_ means, what can go wrong in executing events, and how this affects the Tableland state.

Let’s start with an imaginary successful EVM transaction _T_ with their events: _E1_, _E2_, and _E3_. These events can be anything, like create table or write-queries, but these details aren’t relevant to understanding the mechanics.

Executing these transaction _T_ events can have two results:

- Success: generating a Tableland receipt for this transaction with _success_ status.
- Failed: generating a Tableland receipt for this transaction with a _failed_ status and auxiliary information of why.

:::tip
💡 You can get the Tableland transaction receipt with the `[tableland_getReceipt](https://docs.tableland.xyz/json-rpc-api#e605cf56de154dd49c72361fcd10fd5b)` RPC call.

:::

**A Tableland transaction execution is successful if executing all the events emitted in that transaction is succeeded. On the contrary, a Tableland transaction execution has failed if any event execution fails.** You can relate this behavior exactly as SQL transactions work: the transaction is usually committed if all the queries succeed or rollbacked if any fail.

:::tip
💡 Some simple reasons why executing an event can fail:

- The write-query has invalid SQL syntax.
- You don’t have enough permissions to do the operation.

:::

Taking our transaction _T_ as an example, if the execution of _E1_ succeeds but _E2_ fails, that will immediately roll back all the changes that _E1_ or _E2_ have done in Tableland. The event _E3_ is not even executed since _E2_ failing already caused a rollback.

A Tableland transaction success or failure is directly correlated to affecting Tableland state. If it is successful, all the expected events changes will permanently affect the state and can be seen by anyone doing read-queries. If it has failed, none of the events' changes will have affected the state, just as if the transaction never existed.

Note how we have three possible results of your original EVM transaction:

| On-chain execution status | Tableland execution status | Affected Tableland state? |
| ------------------------- | -------------------------- | ------------------------- |
| Success                   | Success                    | ✅                        |
| Success                   | Failure                    | ❌                        |
| Failure                   | Not executed               | ❌                        |

Now it’s pretty clear why checking your Tableland transaction receipt is essential. Even if the EVM transaction succeeded, the tableland execution could fail to leave the state as the EVM transaction never existed. (e.g., sending an invalid syntax write-query is fine for on-chain checks but is invalid when executing it in validators).

## Let the mind fly...

With all this knowledge, it’s time to get creative and develop new ways to solve problems!

Each transaction has many events that open the door for multiple interesting use-cases and invariants you can enforce in your data; here’re some quick ideas:

- Mint more than one table in the same transaction.
- Mint a table and immediately insert data.
  - This allows having new invariants in the protocol:
    - Mint tables that can never result in an empty read.
    - Single-shot immutable tables. (CREATE+INSERT+FREEZE)
- Allow transactional data mutation in more than one table.
  - If you have permissions, you can mutate the state of multiple tables having multi-table transactions.
- Make smart contract Controllers more powerful. Every time the ACL controller authorizes a write-query, it could generate an INSERT statement to a separate table to have an independent audit log.
