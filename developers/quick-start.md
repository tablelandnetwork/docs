---
description: The quick and easy way to start creating tables on Tableland.
---

# Quick Start

{% hint style="danger" %}
These docs pages reflect an API and concept that is in early development. APIs and features are subject to dramatic changes without warning.
{% endhint %}

## Get Access

For now, Tableland API requests are authenticated by ETH address. Any request that doesn't include a self-signed access token that is tied to a pre-registered ETH address will return an error.

You can gain access to the Tableland MVP by joining our Discord.

{% embed url="https://discord.gg/A7JpNjpk3K" %}

Once you've joined the Discord server and gone through the validation steps, you can sign up for API access by letting us know if you are hacking at ETH Denver in the `#start-here` channel, and then jumping into the `#🎟-creator-whitelist` channel and posting your ETH public address.

```bash
0x4cablahblahblahblahblahblahblahblahblah2
```

That's it! Your ETH address will be added to the access control list shortly.

{% hint style="info" %}
Having trouble getting access? One of the core Tableland developer team members will be happy to help. Just ask in #general or #support!
{% endhint %}

## Playground

The best way to interact and play with our API is to use our official playground tools.

## Install the SDK

The best way to build on top of our APIs is to use our official Typescript/Javascript client. You can install this via `npm` or `yarn`. You can also pull the ESM build via `cdn.skypack.dev` or other means.

{% tabs %}
{% tab title="Node" %}
```
npm install --save @textile/tableland
```
{% endtab %}

{% tab title="Browser" %}
```
https://cdn.skypack.dev/@textile/tableland
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
**Note:** Currently only a Javascript/Typescript client is provided. Intersted in another language? Please get in touch and let us know what you'd like to see next!
{% endhint %}

## Include the SDK

Now that you have the SDK installed, it's time to integrate it into your dApp and create a simple table.

{% tabs %}
{% tab title="Node" %}
```javascript
import { connect, createTable, runQuery } from "@textile/tableland";


await connect({ host: "http://testnet.tableland.network" });
```
{% endtab %}

{% tab title="Browser" %}
```html
<script type="module">
    import { connect, createTable, runQuery } from "https://cdn.skypack.dev/@textile/tableland";
    await connect({ host: "http://testnet.tableland.network" });
</script>
```
{% endtab %}
{% endtabs %}

## Make your first table

To make your first table, call `createTable` via the SDK.&#x20;

{% hint style="danger" %}
It would be really nice to show a valid JSON-RPC flow for desktop/cli usage. The only thing missing is creating the self-signed JWT token. Maybe we could just create a utility that prints the token out in the browser to be used on the CLI afterwards?

If you prefer to use a command line interface, we have provided RPC examples you can use with [HTTPie](https://httpie.org). Please note that params take either an object or array passed as a string.
{% endhint %}

{% tabs %}
{% tab title="Javascript" %}
```javascript
import { createTable } from "@textile/tableland";
// Assumes a connection has already been established as above

const tableId = await createTable(
  "CREATE TABLE table (name text, id int, primary key (id));"
);
```
{% endtab %}

{% tab title="httpie" %}
```
# Not available yet
```
{% endtab %}
{% endtabs %}

You're all set, now its time to jump into further details using the [javascript-sdk.md](javascript-sdk.md "mention") page (next), or check out [demos-and-examples.md](demos-and-examples.md "mention") for more!
