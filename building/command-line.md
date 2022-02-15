---
description: >-
  Experiment with creating, editing, and query tables from the comfort of the
  command line.
---

# Command Line

The Tableland project provides an experimental command line tool  that make it easy to interact with the Tableland network from the comfort of your command line. The `@textile/tableland-cli` is simple and easy to use, and integrates nicely with tools like jq. Additionally, when interacting with Tableland's on-chain components, you can specify your own Alchemy or Infura endpoints for added control.

Simply install the package and you are ready to start creating and updating tables on Tableland.

{% hint style="warning" %}
This is an experimental command line tool built with NodeJS. It is for demonstration purposes only at this early stage.
{% endhint %}

## Setup

There are just a few setup steps required before using the command line tools. Firstly, since all Tableland API calls are "gated" by Ethereum address, you'll need to request access as mentioned in Quick Start guide.

{% content-ref url="quick-start.md" %}
[quick-start.md](quick-start.md)
{% endcontent-ref %}

​ One you have registered your ETH address, you'll need to install the CLI tool on your desktop machine.

### Install

You can install the CLI tools via `npm` or `yarn`.

```
npm install -g @textile/tableland-cli
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
  tableland create <statement>              Run a query against a remote table
  [description] [alchemy] [infura]
  tableland info <id>                       Get info about a given table by id.
  tableland jwt                             Create a signed JWT token
  tableland list [controller]               List tables by controller
  tableland query <statement>               Run a query against a remote table
  [description]

Options:
      --help        Show help                                          [boolean]
      --version     Show version number                                [boolean]
  -k, --privateKey  Private key string                       [string] [required]
  -h, --host        Remote API host
                         [string] [default: "https://testnet.tableland.network"]
```

## Commands

There are a number of commands available for interacting with the Tableland APIs. Each one has a specific set of required and optional arguments. Read on to learn more about these different sub-commands.

### Options

For most commands, you'll need to specify the private key string (`--privateKey`) for the ETH account you would like to use to interact with Tableland. In some cases, this will be used to sign the on-chain transactions required to interact with Tableland. Similarly, if an explicit `--token` argument is not provided (see below), a JWT can be created automatically using the specified private key string.

The list of global options for the Tableland CLI include:

```
Options:
      --help        Show help                                          [boolean]
      --version     Show version number                                [boolean]
  -k, --privateKey  Private key string                       [string] [required]
  -h, --host        Remote API host
                         [string] [default: "https://testnet.tableland.network"]
```

{% hint style="info" %}
It may be useful to create a local environment variable to avoid pasting the private key string (and JWT token) in all CLI commands. Copy your private key string and/or self-generated JWT token and create an env var prefixed with `TBL` to automatically use them when interacting with the CLI. For example, privateKey above becomes `TBL_PRIVATE_KEY`.
{% endhint %}

### jwt

Create a signed JWT token

One you have registered your ETH address, you'll need to generate a self-signed [JWT token](https://jwt.io). This is done automatically when using the [javascript-sdk.md](javascript-sdk.md "mention") via a browser app (thanks to [Metamask](https://metamask.io)). For interacting _via the command line,_ you'll need to create one "manually" and include it (`--token`) with most command line calls.

```
tableland jwt

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
```

### create

Create a new unique table.

Like most relational database systems, Tableland requires the user to create tables for storing, querying, and relating data. See [#creating-tables](javascript-sdk.md#creating-tables "mention") in the [javascript-sdk.md](javascript-sdk.md "mention") docs for details on `CREATE` requirements. The response from a `create` statement includes the created table name, which the caller can use to make subsequent queries and updates.

Since creating a table on Tableland currently mints a `TABLE` using the [Tableland Tables Registry](https://rinkeby.etherscan.io/token/0x30867AD98A520287CCc28Cde70fCF63E3Cdb9c3C), it is necessary to provide an API key to a remote ETH provider API when using the `create` command. Currently, we support [Alchemy](https://alchemyapi.io), [Infura](https://infura.io), and [Etherscan](https://etherscan.io). Simply specify your desired API provider key (or provide all three), and create a table.

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
      --description  Table description                                  [string]
      --alchemy      Alchemy provider API key                           [string]
      --infura       Infura provider API key                            [string]
      --etherscan    Etherscan provider API key                         [string]
  -t, --token        Signed JWT token (see `jwt --help`)                [string]
```

### query

Run a query against a remote table

```
Positionals:
  statement  SQL statement                                   [string] [required]

Options:
      --help        Show help                                          [boolean]
      --version     Show version number                                [boolean]
  -k, --privateKey  Private key string                       [string] [required]
  -h, --host        Remote API host
                         [string] [default: "https://testnet.tableland.network"]
  -t, --token       Signed JWT token (see `jwt --help`)                 [string]
```

## Example

The following is a simple **connect**, **create**, **mutate**, and **query** workflow to demonstrate interacting with Tableland from the command line.

Start with the install:

```
npm i -g @textiletableland-cli
```

Next, we'll create some env vars to use when interacting with the CLI:

```
export TBL_ALCHEMY=fblahblah-Osoethingd0MeXJ
export TBL_PRIVATE_KEY=myhexstringprivatekeystringthatissecret
```

Creating a table is generally the first thing we'll do, so let's start with something simple:

```
tableland create "create table demo ( id int, name text, primary key (id));" --description="tableland rocks!"
```

Now that we've done that, let's list our tables, and then we'll grab some information about the above table:

```
tableland list
```

Make note of the table id of the previously created table from the create or list statements. We'll use that id in the next command:

```
tableland info xx
```

Ok, now we're going to create a JWT to use for querying and mutating the table on Tableland. Recall that we specified our privateKey argument previously, which is what will be used to signed the JWT now:

```
tableland jwt
```

We only need to hang on to the `token` value itself from the above command. We can use `jq` to extract that part, and export it for future ease of use:

```
tableland jwt | jq '.token'
export TBL_TOKEN=<theverylong.tokenstring.thatwecreated>
```

Finally, we can start querying and mutating our table using the `query` command. We'll start with a basic `insert` and then `select` to showcase that it really is working:

```
tableland query "insert into demo_xx values (0, 'Bobby Tables');"
```

Ok, let's see if little Bobby Tables made it into our table on Tableland:

```
tableland query "select * from demo_xx;"
```

Wooo hoo! You should now see some pretty JSON output with your column and row data. It is often nice to just pull out the bits you need using `jq`:

```
tableland query "select * from demo_xx;" | jq '.rows'
```

And there we have it, you are now ready to interact with your tables from the command line. Why not get going on that NFT project you've been meaning to start, backed by mutable NFT metadata on Tableland!

{% content-ref url="examples/playbooks/nft-metadata.md" %}
[nft-metadata.md](examples/playbooks/nft-metadata.md)
{% endcontent-ref %}
