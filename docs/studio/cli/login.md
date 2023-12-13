---
title: Login
description: Start by logging into the Studio with the account you created in the Studio web app.
keywords:
  - CLI
  - command line
  - studio
---

## `studio login`

After you've [logged in & created an account](/studio/web/getting-started) in the Studio web app, you can use that account with the Studio CLI. There are three **required** flags to pass to the `login` command:

| Option          | Type     | Default | Description                                  |
| --------------- | -------- | ------- | -------------------------------------------- |
| `--chain`       | `string` | --      | The chain name to write data to.             |
| `--providerUrl` | `string` | --      | The provider RPC URL for the chain.          |
| `--privateKey`  | `string` | --      | The account's private key that's logging in. |

## Example

The following shows how you might log in. The example uses a private key from Hardhat's [default accounts](https://hardhat.org/hardhat-network/#default-accounts) with a Local Tableland + Hardhat node (chain ID `31337`) for demonstration purposes, but in Studio web app, you should be using live testnet or mainnet chains. The provider URL shown reflects this local-only setup; production chains will have different URLs, like that of Alchemy or Infura.

```bash
studio login --chain local-tableland --providerUrl http://127.0.0.1:8545 --privateKey 59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
```

Once executed, the following will be logged to confirm that account is now logged in:

```md
You are logged in with address: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
```

Locally, your home directory should have created a `.studioclisessions.json`. It will store session information and resemble the following:

```json
{
  "session-cookie": "STUDIO_SESSION=Fe26.2*1*abcdefg......",
  "apiUrl": "https://studio.tableland.xyz"
}
```
