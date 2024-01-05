---
title: URI encoding
description: SQL queries written at the query endpoint must have the proper encoding.
keywords:
  - uri encoding
---

Developers can write SQL read statement using the Gateway REST API where the response object can have fully custom keys that are hydrated with query values. It is useful, especially, for NFT metadata where SQL read query is written at the Tableland gateway URL. This URL must be URI encoded within the smart contract itself.

## Overview

The most powerful REST API endpoint is `/query`, which allows developers to write raw SQL queries and format the output in a desired format. This is most commonly used in smart contracts while setting a `tokenURI` or when rendering some information in a frontend, using JavaScript. But a key component is being able to write SQL _in the URI itself_, so it must conform to URI encoding standards.

For more information on this endpoint, see the [query formatting documentation](/validator/api/query-formatting).

### Background on URI encoding

URLs can only be sent over the internet using [ASCII characters](https://www.w3schools.com/charsets/ref_html_ascii.asp). [URL encoding](https://en.wikipedia.org/wiki/Percent-encoding) ensures characters that are part of some URL are properly encoded as ASCII to comply with the broader [URI encoding specification](https://datatracker.ietf.org/doc/html/rfc3986) (URL is a subset of URI). Note that many browsers will often automatically perform the encoding if you were to paste some string in the address bar. But while programming, you should always correctly encode some URI to avoid any issues with malformed strings.

A simple example: a URI cannot include a space (` `), so the space must be encoded as `%20` (or `+`) instead. That is, the space is replaced by the indicator (`%`) for percent-encoded _octets_ (two hex digits), which includes a corresponding escape code (`20`). The percent encoding algorithm behind URI encoding boils down to the following:

- Take the ASCII number representation for some character—for a space (` `), this ASCII decimal value is `32`.
- Convert this number to hex—a `32` is equivalent to a hex value of `20`, which is the _escape character._
- Prepend this value with the `%` indicator—which forms the encoding `%20`.

### Reserved Characters

There is also a set of _reserved characters_—delimiters that are distinguishable from other data within the URI. The following characters are in this [reserved set and protected](https://datatracker.ietf.org/doc/html/rfc3986#page-13) from normalization:

:::note Reserved characters in URI encoding
`! \* ' ( ) ; : @ & = + $ , / ? # [ ]`
:::

This is an important realization because if SQL is used in the `/query` endpoint, it’s possible the SQL statement will include one of these reserved characters. If this occurs, you must encode these characters—but many URL encoding libraries assume the reserved characters should not be encoded.

### Encoding Table

For context, the table below defines each of these reserved characters and their corresponding percent encoding (UTF-8), plus some other common ones. This is non-exhaustive.

| Character | Encoding | Description                                          |
| --------- | -------- | ---------------------------------------------------- |
| &nbsp;    | `%20`    | A space (i.e., like this space: <code>&nbsp;</code>) |
| `!`       | `%21`    | Exclamation point / bang symbol                      |
| `"`       | `%22`    | Double quote                                         |
| `#`       | `%23`    | Hash / number sign                                   |
| `%`       | `%25`    | Percentage sign                                      |
| `&`       | `%26`    | Ampersand                                            |
| `'`       | `%27`    | Single quote (e.g., used to wrap text in SQL)        |
| `(`       | `%28`    | Left parenthesis (e.g., when specifying values)      |
| `)`       | `%29`    | Right parenthesis                                    |
| `\*`      | `%2A`    | Asterisk (e.g, in a `SELECT * FROM` statement)       |
| `+`       | `%2B`    | The "plus" sign                                      |
| `,`       | `%2C`    | Comma (e.g., separating values in an INSERT)         |
| `/`       | `%2F`    | Forward slash                                        |
| `:`       | `%3A`    | A colon                                              |
| `;`       | `%3B`    | A semicolon (e.g., placed at the end of a statement) |
| `<`       | `%3C`    | Less than                                            |
| `=`       | `%3D`    | An equals sign (e.g., in `WHERE` clauses)            |
| `>`       | `%3E`    | Greater than                                         |
| `?`       | `%3F`    | Question mark                                        |
| `@`       | `%40`    | The "at" symbol                                      |
| `[`       | `%5B`    | Left bracket                                         |
| `]`       | `%5D`    | Right bracket                                        |
| `\|`      | `%7C`    | Pipe                                                 |

For a full list of encoded characters, see the list [here](https://www.w3schools.com/tags/ref_urlencode.ASP), and note that up until `%7F`, both UTF-8 and Windows encoding have full parity.

## Encoding with JavaScript

There is a built-in JavaScript method called `encodeURIComponent`. One thing to note—in Tableland’s "SQL in the URL" world, this _won’t_ encode the _reserved characters._ They will maintain their original definition and treated as delimiters—particularly, the `*`. This is typically okay, but some developers may choose to further encode this as well.

One option is to manually implement this sanitization step on the query string. For example, you could create logic that replaces an asterisk `*` with a `%2A` _after_ passing the whole query to `encodeURIComponent`:

```jsx
const query = `SELECT * FROM my_uri_encoding_table`;
const encoded = encodeURIComponent(query);
// The `*` isn't escaped properly
// SELECT%20*%20FROM%20uri_encoding_80001_2752

const encodeAsterisk = encoded.replace(/\*/g, "%2A");
// SELECT%20%2A%20FROM%20uri_encoding_80001_2752
```

By using a regex, you can search for each one of these characters and replace them with the corresponding percent encoding. You could also leverage existing libraries—one example to check out is something like [`url-encode-decode`](https://github.com/tiaanduplessis/url-encode-decode).

## Encoding in Solidity

Currently, there aren’t any great libraries for Solidity URI encoding. Instead, it’s easiest to perform the encoding using some other language or leverage an online URL encoding tool, like [https://www.urlencoder.org](https://www.urlencoder.org/). For example, a deploy script written in JavaScript that sets the URI within the contract at deploy time will be much easier than writing that in pure Solidity.

If you opt to create the URI and write it with Solidity, one helpful library for this is the Strings library, by OpenZeppelin. It’s also important to note that, prior to Solidity `0.8.12`, there was an issue with strings and concatenating them together—a common pattern in the Tableland SQL-in-Solidity world. Take a simple example of a query that using string templating:

```solidity
function tokenURI(string memory _tableName) public view returns (string memory) {
	string memory base = _baseURI();
	// Here, the baseURI is:
	// https://testnets.tableland.network/api/v1/query?unwrap=true&extract=true&statement=
  return string.concat(
    base,
    "SELECT%20%2A%20FROM%20",
    _tableName
  );
	// Thus, the full string is:
	// https://testnets.tableland.network/api/v1/query?unwrap=true&extract=true&statement=SELECT%20%2A%20FROM%20<table_name_param>
}
```

The main callout—this `tokenURI` method produced the percent encoded URI (`"SELECT%20%2A%20FROM%20"`) outside of Solidity.

## Next steps

Looking for more? Check out the page on [how to build an NFT](/playbooks/concepts/how-to-build-an-nft), including additional resources for defining an [optimal SQL table structure](/playbooks/concepts/nft-metadata) or [building a dynamic NFT in Solidity](/tutorials/dynamic-nft-solidity).
