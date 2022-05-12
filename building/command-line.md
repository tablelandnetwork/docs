---
description: >-
  Experiment with creating, editing, and query tables from the comfort of the
  command line.
---

# Command Line

The Tableland project provides an experimental command line tool that make it easy to interact with the Tableland network from the comfort of your command line. The `@tableland/cli` is simple and easy to use, and integrates nicely with tools like jq. Additionally, when interacting with Tableland's on-chain components, you can specify your own Alchemy or Infura endpoints for added control.

Simply install the package and you are ready to start creating and updating tables on Tableland.

{% hint style="warning" %}
This is an experimental command line tool built with NodeJS. It is for demonstration purposes only at this early stage.
{% endhint %}

## Setup

There are just a few setup steps required before using the command line tools. Firstly, since all Tableland API calls are "gated" by Wallet address, you'll need to request access as mentioned in Quick Start guide.

{% content-ref url="quick-start.md" %}
[quick-start.md](quick-start.md)
{% endcontent-ref %}

​ Once you have registered your address, you'll need to install the CLI tool on your machine.

### Install

You can install the CLI tools via `npm` or `yarn`.

```
npm install -g @tableland/cli
```

{% hint style="info" %}
**Note:** Soon, you'll also be able to install via your favorite OS package manager.
{% endhint %}

## Basic Usage

Most common Tableland usage patterns are possible via the command line. In general, you'll need to **connect**, **create**, **mutate**, and **query** your tables. In that order :smile:.

```bash
➜ tableland --help
tableland [command]

Commands:
  tableland create <statement>              Create a new unique table
  [alchemy] [infura] [etherscan]
  tableland info <id>                       Get info about a given table by id.
  tableland siwe                            Create a SIWE token
  tableland list [controller]               List tables by controller
  tableland query <statement>               Run a query against a remote table

Options:
      --help        Show help                                          [boolean]
      --version     Show version number                                [boolean]
  -k, --privateKey  Private key string                       [string] [required]
  -h, --host        Remote API host
                         [string] [default: "https://testnet.tableland.network"]
      --network     The EVM compatible network to target
                                                   [string] [default: "rinkeby"]
```

## Commands

There are a number of commands available for interacting with the Tableland APIs. Each one has a specific set of required and optional arguments. Read on to learn more about these different sub-commands.

### Options

For most commands, you'll need to specify the private key string (`--privateKey`) for the ETH account you would like to use to interact with Tableland.  In some cases, this will be used to sign the on-chain transactions required to interact with Tableland. Similarly, if an explicit `--token` argument is not provided (see below), a SIWE token can be created automatically using the specified private key string.
You'll also need to specify the network you want to use (`--network`), unless you have a SIWE token that has the network information built in. 

The list of global options for the Tableland CLI include:

```
Options:
      --help        Show help                                          [boolean]
      --version     Show version number                                [boolean]
  -k, --privateKey  Private key string                       [string] [required]
  -h, --host        Remote API host
                         [string] [default: "https://testnet.tableland.network"]
      --network     The EVM compatible network to target
                                                   [string] [default: "rinkeby"]
```

{% hint style="info" %}
It may be useful to create a local environment variable to avoid pasting the private key string (and SIWE token) in all CLI commands. Copy your private key string and/or SIWE token and create an env var prefixed with `TBL` to automatically use them when interacting with the CLI. For example, privateKey above becomes `TBL_PRIVATE_KEY`.
{% endhint %}

### Sign in with Ethereum

Create a SIWE token

One you have registered your Wallet address, you'll need to generate a SIWE token. This is done automatically when using the [javascript-sdk.md](javascript-sdk.md "mention") via a browser that has an integrated Wallet, e.g. [Brave](https://brave.com/) or [Metamask](https://metamask.io)). For interacting _via the command line,_ you'll need to create one "manually" and include it (`--token`) with most command line calls.

```
tableland siwe

Options:
      --help        Show help                                          [boolean]
      --version     Show version number                                [boolean]
  -k, --privateKey  Private key string                       [string] [required]
  -h, --host        Remote API host
                         [string] [default: "https://testnet.tableland.network"]
```

### list

List tables by controller

```
tableland list [controller]

Positionals:
  controller  The target controller address                             [string]

Options:
      --help        Show help                                          [boolean]
      --version     Show version number                                [boolean]
  -k, --privateKey  Private key string                       [string] [required]
  -h, --host        Remote API host
                         [string] [default: "https://testnet.tableland.network"]
      --network     The EVM compatible network to target
                                                   [string] [default: "rinkeby"]
```

### info

Get info about a given table by id.

```
tableland info <id>

Positionals:
  id  The target table id                                    [string] [required]

Options:
      --help        Show help                                          [boolean]
      --version     Show version number                                [boolean]
  -k, --privateKey  Private key string                       [string] [required]
  -h, --host        Remote API host
                         [string] [default: "https://testnet.tableland.network"]
      --network     The EVM compatible network to target
                                                   [string] [default: "rinkeby"]
```

### create

Create a new unique table.

Like most relational database systems, Tableland requires the user to create tables for storing, querying, and relating data. See [#creating-tables](javascript-sdk.md#creating-tables "mention") in the [javascript-sdk.md](javascript-sdk.md "mention") docs for details on `CREATE` requirements. The response from a `create` statement includes the created table name, which the caller can use to make subsequent queries and updates.

Since creating a table on Tableland currently mints a `TABLE` using the [Tableland Tables Registry](https://rinkeby.etherscan.io/token/0x30867AD98A520287CCc28Cde70fCF63E3Cdb9c3C), it is necessary to provide an API key to a remote provider API when using the `create` command. Currently, we support [Alchemy](https://alchemyapi.io), [Infura](https://infura.io), and [Etherscan](https://etherscan.io). Simply specify your desired API provider key (or provide all three), and create a table.

```
tableland create <statement> [description] [alchemy] [infura] [etherscan]

Positionals:
  statement  SQL CREATE statement                            [string] [required]

Options:
      --help         Show help                                         [boolean]
      --version      Show version number                               [boolean]
  -k, --privateKey   Private key string                      [string] [required]
  -h, --host         Remote API host
                         [string] [default: "https://testnet.tableland.network"]
      --network     The EVM compatible network to target
                                                   [string] [default: "rinkeby"]
      --description  Table description                                  [string]
      --alchemy      Alchemy provider API key                           [string]
      --infura       Infura provider API key                            [string]
      --etherscan    Etherscan provider API key                         [string]
  -t, --token        SIWE token (see `siwe --help`)                [string]
```

### query

Run a query against a remote table

Now that we have a table to work with, it is easy to use vanilla SQL statements to insert new rows, update existing rows, delete old rows, and even query the whole thing! See [#mutating-tables](javascript-sdk.md#mutating-tables "mention") and [#querying-tables](javascript-sdk.md#querying-tables "mention") from the [javascript-sdk.md](javascript-sdk.md "mention") docs for further details. The key thing to keep in mind when working with tables is that you must specify the table name that you get back from the `create` command.

```
Positionals:
  statement  SQL statement                                   [string] [required]

Options:
      --help        Show help                                          [boolean]
      --version     Show version number                                [boolean]
  -k, --privateKey  Private key string                       [string] [required]
  -h, --host        Remote API host
                         [string] [default: "https://testnet.tableland.network"]
  -t, --token       SIWE token (see `siwe --help`)                 [string]
      --network     The EVM compatible network to target, if not using --token
                                                   [string] [default: "rinkeby"]
```

## Example

The following is a simple **connect**, **create**, **mutate**, and **query** workflow to demonstrate interacting with Tableland from the command line.

Start with the install:

```
npm i -g @tableland/cli
```

Next, we'll create some env vars to use when interacting with the CLI:

```
export TBL_ALCHEMY=fblahblah-Osoethingd0MeXJ
export TBL_PRIVATE_KEY=myhexstringprivatekeystringthatissecret
```

Creating a table is generally the first thing we'll do, so let's start with something simple (note that this is an on-chain event, and so can take a while to complete):

{% tabs %}
{% tab title="Input" %}
```
tableland create "create table demo ( id int, name text, primary key (id));"
```
{% endtab %}

{% tab title="Output" %}
```json
{
  "name": "demo_55"
}
```
{% endtab %}
{% endtabs %}

Now that we've done that, let's list our tables, and then we'll grab some information about the above table.

{% hint style="warning" %}
You might need to `unset` your previous `TBL_ALCHEMY` env var.
{% endhint %}

{% tabs %}
{% tab title="Input" %}
```
tableland list
```
{% endtab %}

{% tab title="Output" %}
```json
[
  {
    "controller": "0xbAb12215Ed94713A290e0c618fa8177fAb5eFd2D",
    "name": "demo_55",
    "description": "tableland rocks",
    "structure": "40eef2d5ae0737569bf8fec3227e7c851637b0dd3d4b1c6b807e55d00cd02399",
    "created_at": "2022-02-15T07:21:08.008025Z"
  }
]
```
{% endtab %}
{% endtabs %}

Make note of the table id of the previously created table (here we had 55) from the create or list statements. We'll use that id in the next command:

{% tabs %}
{% tab title="Input" %}
```
tableland info 55
```
{% endtab %}

{% tab title="Output" %}
```json
{
  "name": "demo_55",
  "description": "tablelnd rocks",
  "external_url": "https://testnet.tableland.network/tables/55",
  "image": "https://bafkreifhuhrjhzbj4onqgbrmhpysk2mop2jimvdvfut6taiyzt2yqzt43a.ipfs.dweb.link",
  "attributes": [
    {
      "display_type": "date",
      "trait_type": "created",
      "value": 1644909668
    }
  ]
}
```
{% endtab %}
{% endtabs %}

Ok, now we're going to create a SIWE token to use for querying and mutating the table on Tableland. Recall that we specified our `privateKey` argument previously, which is what will be used to sign the SIWE now:

{% tabs %}
{% tab title="Input" %}
```
tableland siwe
```
{% endtab %}

{% tab title="Output" %}
```json
{
  "token": "theverylong.tokenstring.thatwecreated"
}
```
{% endtab %}
{% endtabs %}

We only need to hang on to the `token` value itself from the above command. We can use `jq` to extract that part, and export it for future ease of use:

```
tableland siwe | jq '.token'
export TBL_TOKEN=<theverylong.tokenstring.thatwecreated>
```

Finally, we can start querying and mutating our table using the `query` command. We'll start with a basic `insert` and then `select` to showcase that it really is working:

{% tabs %}
{% tab title="Input" %}
```
tableland query "insert into demo_55 values (0, 'Bobby Tables');"
```
{% endtab %}

{% tab title="Output" %}
```json
{
  "data": null
}
```
{% endtab %}
{% endtabs %}

Ok, let's see if little Bobby Tables made it into our table on Tableland:

{% tabs %}
{% tab title="Input" %}
```
tableland query "select * from demo_55;"
```
{% endtab %}

{% tab title="Output" %}
```json
{
  "data": {
    "columns": [
      {
        "name": "id"
      },
      {
        "name": "name"
      }
    ],
    "rows": [
      [
        0,
        "Bobby Tables"
      ]
    ]
  }
}
```
{% endtab %}
{% endtabs %}

Wooo hoo! You should now see some pretty JSON output with your `columns` and `rows` data. It is often nice to just pull out the bits you need using `jq`:

{% tabs %}
{% tab title="Input" %}
```
tableland query "select * from demo_55;" | jq '.data.rows'
```
{% endtab %}

{% tab title="Output" %}
```json
[
  [
    0,
    "Bobby Tables"
  ]
]
```
{% endtab %}
{% endtabs %}

And there we have it, you are now ready to interact with your tables from the command line. Why not get going on that NFT project you've been meaning to start, backed by mutable NFT metadata on Tableland!

{% content-ref url="examples/playbooks/nft-metadata.md" %}
[nft-metadata.md](examples/playbooks/nft-metadata.md)
{% endcontent-ref %}
