---
description: The quick and easy way to start creating tables on Tableland.
---

# Quick Start

{% hint style="warning" %}
These docs pages reflect an API and concept that is in early development. APIs and features are subject to dramatic changes without warning.
{% endhint %}

## Get Access

For now, Tableland API requests are authenticated by ETH address. Any request that doesn't include a self-signed access token that is tied to a pre-registered ETH address will return an error.

You can gain access to the Tableland MVP by joining our Discord. While you're there, don't forget to say hello in the `#👋-intros` channel! Oh, and welcome to the communit!

{% embed url="https://discord.gg/A7JpNjpk3K" %}

{% hint style="info" %}
Tableland is currently in private beta, so to join you’ll need to do a few more steps! Having trouble getting access? One of the core Tableland developer team members will be happy to help. Just ask in #general or #support!
{% endhint %}

Once you've joined the Discord server and gone through the validation steps, you can sign up for API access by letting us know if you are hacking at ETH Denver in the `#news` channel (follow the instructions in the comment and react with the :crown: emoji). This will set you up with the _Creator_ role.

You should now find two new channels that are visible to you in the `#Tableland` category. Congrats, you are now a Tableland Creator :muscle:.

Next, jump into the `#🎟-creator-whitelist` channel and posting your ETH public address.

```bash
0x4cablahblahblahblahblahblahblahblahblah2
```

That's it! Your ETH address will be added to the access control list shortly. You’ll be able to use `#🔩-creator-chat` to share your project, find collaborators, learn from others, ask any technical questions, or let us know about any issues you run into.

{% hint style="danger" %}
Only ever share you _public_ address. We will never DM you and will never ask you for your secrets, private keys, passwords, or phrases. Be diligent, and report scammers and spammers.
{% endhint %}

## Playground

The best way to interact and play with our API is to use our official playground tools.

**Coming soon!**

## Install the SDK

The best way to _build on_ our APIs is to use our official Typescript/Javascript client. You can install this via `npm` or `yarn`. You can also pull the ESM build via `cdn.skypack.dev` or other means.

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

To make your first table, call `createTable` via the SDK, or create one using our simple playground app. TODO: Add link to playground app.

{% hint style="success" %}
If you prefer to use a command line interface, we have provided RPC examples you can use with [HTTPie](https://httpie.org). You can play with these on the [remote-api.md](remote-api.md "mention") page, though you will have to create a table using the SDK or playground first.
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
```javascript
// Not available yet
```
{% endtab %}

{% tab title="curl" %}
```javascript
// Not yet available
```
{% endtab %}
{% endtabs %}

You're all set, now its time to jump into further details using the [javascript-sdk.md](javascript-sdk.md "mention") page (next), or check out [demos-and-examples.md](demos-and-examples.md "mention") for more!
