---
title: Hardhat plugin
description: A Hardhat plugin for Local Tableland and Hardhat nodes.
keywords:
  - hardhat
  - local tableland
  - hardhat plugin
  - tableland/hardhat
---

If you are developing with [Hardhat](https://hardhat.org/), the [`@tableland/hardhat`](https://github.com/tablelandnetwork/hardhat-tableland) plugin can be used to run alongside Local Tableland. It's important to node that embedded in the Local Tableland process is two steps: spinning up a Tableland validator node and a Hardhat node. Thus, the plugin helps manage these and allows you to use familiar Hardhat commands.

## 1. Installation & setup

Create a folder and then `cd` into it to set up a Hardhat app. Follow the starter steps by choosing a project type (JavaScript, TypeScript, or empty) and other configurations.

```bash
npx hardhat
```

Then, install `@tableland/hardhat` as a dev dependency:

```bash npm2yarn
npm install --save-dev @tableland/hardhat
```

## 2. Adjust the Hardhat config & script

With `@tableland/hardhat`, you should import the plugin in your `hardhat.config.js` and adjust the config. Add the `localTableland` key with values `silent` and `verbose` to `false`—these control logging behavior.

```js title="hardhat.config.js"
require("@nomicfoundation/hardhat-toolbox");
// highlight-next-line
require("@tableland/hardhat");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  // highlight-start
  localTableland: {
    silent: false,
    verbose: false,
  },
  // highlight-end
};
```

## 3. Start a node & deploy locally

Start a Hardhat and Local Tableland node at the same time with:

```bash
npx hardhat node --network local-tableland
```

Now that nodes are running, you can deploy your contract. The deployed contracts will interact with the Hardhat node, and then the Local Tableland node will materialize emitted SQL events and allow for read queries at the HTTPS gateway at `http://localhost:8080/api/v1/`.

Run the following in another terminal window to deploy your contract:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

If, instead, you want to simply start up the nodes, deploy your contracts, and then shutdown the nodes (i.e., _don't_ keep them running), you can choose to run the deploy script with `local-tableland` as the network. This means that you should **not** run the typical `npx hardhat node` command since there will be a port clash.

```bash
npx hardhat run scripts/deploy.js --network local-tableland
```
