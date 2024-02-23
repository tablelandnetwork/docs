---
title: Library methods
description: Review the various helpers that can be used in a JavaScript environment.
keywords:
  - library
  - local tableland
---

Local Tableland can be used as a standalone node process and also offers a library, which is especially useful when [running tests](/local-tableland/testing). The library exposes a number of methods that can be used to interact with the Local Tableland instance, including helpers that facilitate common patterns in the testing process. The following describes what methods are exported from the `@tableland/local` package.

## Setup

First, make sure you've installed the package:

```bash npm2yarn
npm install --save-dev @tableland/local@latest
```

And then import all of the exports from the library:

```js
import {
  LocalTableland,
  getAccounts,
  getDatabase,
  getRegistry,
  getRegistryPort,
  getValidator,
} from "@tableland/local";
```

## Local Tableland

Instantiating `LocalTableland` will start the Tableland network—a Hardhat node, plus a Tableland validator node. This includes deploying a Tableland Registry contract on the Hardhat network where the validator subsequently watches for changes.

The `LocalTableland` constructor accepts a single argument, an object with the following properties (all optional):

- `validator`: Instance of a Tableland validator. If docker flag is set, this must be the full repository.
- `validatorDir`: Path to the Tableland validator directory.
- `registry`: Instance of a Tableland registry.
- `registryDir`: Path to the Tableland registry contract repository.
- `docker`: Use Docker to run the Validator.
- `verbose`: Output verbose logs to stdout.
- `silent`: Silence all output to stdout.
- `registryPort`: Use a custom registry hardhat port, e.g., `http://127.0.0.1:8545` is the default with port `8545`, but.
- `forkUrl`: If forking a chain, the provider URL of the testnet or mainnet chain, such as an Alchemy or Infura URL.
- `forkBlockNumber`: If forking a chain, the block number to fork from, which recreates the chain state up to that block.
- `forkChainId`: If forking a chain, the chain ID of the chain.

Most uses cases only use the `verbose` or `silent` options, which control logging behavior during tests.

```js
const lt = new LocalTableland({ silent: false });
```

In more complex cases, the registry and validator options allow you to point to custom instances. A monorepo setup, for example, might want separately test things in parallel, so the registry and validator need to be unique to each environment—check out the [`tableland-js` monorepo](https://github.com/tablelandnetwork/tableland-js/tree/main/packages) for how this might look.

There's also a feature for _forking_ an existing testnet or mainnet chain, which will allow you to interact with the chain and table state in a sandboxed local environment. See the [forking chain state](/local-tableland/fork-chain) documentation for more information.

### Start

The `start` method starts the Tableland network with the Hardhat node and the Tableland validator node. This should be ran before any tests are executed.

```js
await lt.start();
```

### Is ready

The `isReady` method returns a promise that resolves when the Tableland network is ready to be used. You can use this to check if the network is ready before running tests.

```js
await lt.isReady();
```

### Shutdown

The `shutdown` method stops the Tableland network. This should be ran after all tests have been executed to kill all running processes.

```js
await lt.shutdown();
```

### Restart

The `restartValidator` method restarts the Tableland validator node. You might want to reset the state of the network between tests, such as ensuring existing tables are wiped from the validator's database so that you can more deterministically test, for example, the creation of new tables in separate tests.

```js
await lt.restartValidator();
```

This _only_ restarts the validator, but you'd have to handle the Hardhat node separately, such as reverting state with [`evm_snapshot`](https://hardhat.org/hardhat-network/docs/reference#evm_snapshot) and [`evm_revert`](https://hardhat.org/hardhat-network/docs/reference#evm_revert) calls.

## Get accounts

The `getAccounts` method returns a list of accounts that are available on the Tableland network. This returns all accounts at the Hardhat `http://127.0.0.1:8545` endpoint as an ethersjs `Wallet` instance. Optionally, you can pass an instance of `LocalTableland` as well.

```js
const [accounts] = await getAccounts();
const signer = accounts[1];
console.log(signer.address);
// 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
```

Note the second account is used above. The first account is used during the registry contract's deployment process, so it's best start with a fresh account.

## Get database

The `getDatabase` method returns a `Database` instance from the `@tableland/sdk` package. Just as the normal `Database` instantiation requires you to pass a signer, this method does the same. It also automatically sets up a validator base URL pointing to the Local Tableland network, and it defaults to auto-waiting for transactions to finalize.

```js
const db = getDatabase(signer);
```

## Get registry

The `getRegistry` method returns a `Registry` instance from the `@tableland/sdk` package. Similarly, you pass a signer upon instantiation. This lets you interact with the registry contract that's been deployed to Hardhat.

```js
const registry = getRegistry(signer);
```

## Get registry port

The `getRegistryPort` method returns the port that the registry contract is deployed to. By default, this is always port `8545`, but you can override this by passing a custom port to the `LocalTableland` constructor. Thus, this helper is useful in case you need to dynamically check which port is being used and don't want to hardcode it.

```js
const port = getRegistryPort();
console.log(port);
// 8545
```

Optionally, you can pass an instance of `LocalTableland`.

## Get validator

The `getValidator` method returns a `Validator` instance from the `@tableland/sdk` package. This lets you directly call validator APIs at the Local Tableland validator node, which defaults to the endpoint `http://localhost:8080`.

```js
const validator = getValidator();
```

If you do choose to point to a custom validator setup during `LocalTableland` instantiation, it's possible you might have an endpoint with a different port; you can, optionally, pass this endpoint to the `getValidator` method.

## Next steps

These methods all make it easy to set up your Tableland environment for testing purposes. It'd be a good idea to head over to the testing docs for more information on how to use them with libraries like mocha!
