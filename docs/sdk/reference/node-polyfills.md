---
title: Node polyfills
description: Any version prior to Node 18 will need to provide polyfills.
keywords:
  - node polyfills
  - node fetch
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

The Tableland SDK makes use of the `fetch` API as well as `Headers`. If you're using a version of Node that came before the current [LTS](https://github.com/nodejs/release#release-schedule) 18.x version, you'll need to either update to Node 18 or implement a polyfill.

## Installation

To use a polyfill, you'll first need to install [`node-fetch`](https://github.com/node-fetch/node-fetch).

```npm2yarn
npm install node-fetch
```

Starting with `node-fetch` v3, it is an ESM-only module; you are not able to import it with `require()`. If you cannot switch to ESM and need CommonJS (CJS) support, you could use v2 (`node-fetch@2`)—or choose to use an async `import()`.

## Add the polyfill

In your source file, import `fetch`, `Headers`, `Request`, and `Response` from `node-fetch`. Then, you'll patch the global object in Node ([`globalThis`](https://developer.mozilla.org/en-US/docs/Glossary/Global_object)), thus, enabling Tableland SDK compatability.

<Tabs>
<TabItem value="esm" label="ESM" default>

```js
import fetch, { Headers, Request, Response } from "node-fetch";

if (!globalThis.fetch) {
  globalThis.fetch = fetch;
  globalThis.Headers = Headers;
  globalThis.Request = Request;
  globalThis.Response = Response;
}
```

</TabItem>
<TabItem value="cjs" label="CJS">

```js
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
```

</TabItem>
</Tabs>

Note that if you're using TypeScript, you can just declare `globalThis as any` in the ESM example declarations above (i.e., add a type to all of the references to `globalThis`).
