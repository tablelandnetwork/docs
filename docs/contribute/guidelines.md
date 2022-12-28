---
title: How to contribute
sidebar_position: 1
sidebar_label: Contributor guidelines
description: Understand how to contribute
keywords:
  - docs
  - tableland
  - contribute
  - contributor
  - contributing
tags:
  - contributing
---

:::tip
Feel free to [raise an issue on our Tableland docs repository](https://github.com/tablelandnetwork/docs/issues)
:::

## Where to start

Tableland welcomes new collaborators and contributions. To get started, you can do the following:

- View the [open issues](https://github.com/tablelandnetwork/docs/issues) in the docs (or other) repositories and browse issues by labels (like `help wanted`, `good first issue`, etc.).
- Create an issue if there is a specific contribution in mind. One of the Tableland [documentation maintainers](/docs/contribute/maintainers) will reach out and help find an area for you to contribute.
- Dive into our Discord and ask in `#dev-chat` if you don't want to open an issue yet but want to discuss potential contributions.

## Add to the Tableland docs

- If you do end up contributing, be sure to create a branch off of `main` and raise a Pull Request.
- The [documentation maintainers](/docs/contribute/maintainers) will review your PR and respond with any feedback or changes.
- Repository: https://github.com/tablelandnetwork/docs
- Sample PR: https://github.com/tablelandnetwork/docs/pull/49

## Formatting & Style

The Tableland documentation uses the Docusaurus static site generator. There are a number of benefits—such as docs-specific plugins, auto-generated pages from `docs`, and MDX support—but also some formatting-related aspects you should be aware of.

### Page headings

All headings / titles should follow sentence case. Namely, do not capitalize the page like a title but as a sentence. As an example, this page's primary heading is `How to contribute` and **_not_** `How to Contribute`. Research suggests that sentence case is more readable, and [Stripe's best-in-class docs](https://stripe.com/docs/products-prices/how-products-and-prices-work) do the same.

Also, the primary h1 heading in markdown (`#`) is reserved for the page's title. You **cannot use `#` in your markdown pages**. Instead, all headings must be an h2 (`##`) or smaller (up to an h6). If a primary heaing is used, the header content will not render in the table of contents on the right-hand side. One other potentially useful customization is redefining heading anchor links — perhaps if a header is too verbose, you can customize it: `## Hello {#my-custom-id}`

### Front matter

Every markdown page should include [front matter](https://docusaurus.io/docs/next/markdown-features#front-matter) at the beginning of the document. This information is used to generate site metadata (for [SEO](https://docusaurus.io/docs/next/seo)) as well as the contents and routes. This page has the following front matter:

```md
---
title: How to contribute
sidebar_position: 1
sidebar_label: Contributor guidelines
description: Understand how to contribute
keywords:
  - docs
  - tableland
  - contribute
  - contributor
  - contributing
tags:
  - contributing
---
```

You'll notice a number of fields that are available:

- **`title`**: The page's title gets automatically displayed in the content as an h1 header (`# Your Title`) and is also used in the page's metadata.
- **`sidebar_position`**: Visual position of the page within the sidebar / sub-section.
- **`description`**: A brief about the page, kept under ~60 characters and only used in the metadata.
- **`keywords`**: Keywords help with SEO and are part of the page's metadata. Simply add a bulleted list of keywords, or provide an array of comma-separated values (e.g., `keywords: [docs, tableland]`).
- [**`tags`**](https://docusaurus.io/docs/next/create-doc#doc-tags): _(Optional)_ Similarly, tags help with categorization and search within the site. Simply add a bulleted list of tags, or provide an array of comma-separated values (e.g., `tags: [docs, tableland]`). These are displayed at the bottom of each page, and viewing a grouping is possible by clicking on the tag or visiting the `/docs/tags` URI on the site.
- **`sidebar_label`**: _(Optional)_ A page's `title` can have a different display value in the sidebar. For example, this page has a title of `How to contribute` but a `sidebar_label` of `Contributor guidelines`. Often, this field is used for long page titles that should be condensed within the sidebar section.
- [**`id`**](https://docusaurus.io/docs/next/create-doc#document-id): _(Optional)_ Each docuement has a unique ID generated based on the file path from the root `docs` directory. For example, an `example` folder within the `docs` directory that contains `test.md` with have an auto-generated `id` of `example/test`. The ID is used to refer to a document when hand-writing sidebars, or when using docs-related layout components or hooks. Thus, it is generally okay to use the auto-generated `id`.
- [**`slug`**](https://docusaurus.io/docs/next/create-doc#doc-urls): _(Optional)_ The default slug will be the file path. For example, an `example` folder within the `docs` directory that contains `test.md` with have a slug `docs/example/test`. Instead, you can set a custom slug. If you set the `slug` to `my-new-slug`, the slug will now be `docs/example/my-new-slug` (`docs/my-new-slug`) or a specific name (`docs/specific-name/my-new-slug`). Generally, you can expect to use the default behavior.
- **`image`**: _(Optional)_ A thumbnail image to be shown in social media cards. A default image is configured such that this is not required, unless desired by the page creator (e.g., a custom tutorial or a page with tailored imanges already present).

### Writing style

For most of the documentation, writers should address the user directly with (e.g., "you") but never use first person ("I" or "me"). Tutorials are an exception where first person _plural_ (e.g., "we") can be used since it is a guiding experience _with_ the audience. Some other key points:

- Get to the point. Docs are meant to quickly explain how to do something.
- The language should resemble your spoken voice and not sound robotic.
- When in doubt, don't captitalize (i.e., sentence-style capitalization).
- Use the [Oxford comma](https://en.wikipedia.org/wiki/Serial_comma).
- End all sentences with a period; headings should not end in punctuation.
- When using the em dash (—), don't put spaces around it but "connected" to the word(s) its between.

Feel free to refer [Google's style guide](https://github.com/google/styleguide/blob/gh-pages/docguide/style.md) as well as [Microsoft's'](https://docs.microsoft.com/en-us/style-guide/welcome/) for more pointers.

## Additional features

There are also Docususaurus-specific features that can be used to enhance the docs experience. These enable more creative docs writing to take place with JavaScript, usage of formatted components, tooltips, and more.

### MDX

[MDX](https://docusaurus.io/docs/markdown-features/react) is a superset of markdown that adds the ability to import and use JSX alongside common markdown. Docusaurus offers a set of components that can be imported and used within a `.mdx` file. You can also write your own components within `src/components` and then import them into the desired markdown page. A simple example:

See [here](https://docusaurus.io/docs/markdown-features/react) for more details.

### Code blocks

Annotating a code block with the file name or highlighting specific lines is possible using the built-in [code block](https://docusaurus.io/docs/markdown-features/code-blocks) feature. For example, here is a snippet from a named file (place the named `title` in the starting ` ``` ` line) that also highlights multiple lines using [magic comments](https://docusaurus.io/docs/markdown-features/code-blocks#custom-magic-comments) with `// highlight-next-line` or `// highlight-start` + `// highlight-end`.

````md
```js title="/src/components/Hello.js"
function HighlightSomeText(highlight) {
  if (highlight) {
    // highlight-next-line
    return "This text is highlighted!";
  }
  // highlight-start
  return "This is also highlighted!";
  // highlight-end
}
```
````

This will then show the file name at the top of the code block, plus, the specific highlighted lines:

```js title="/src/components/Hello.js"
function HighlightSomeText(highlight) {
  if (highlight) {
    // highlight-next-line
    return "This text is highlighted!";
  }
  // highlight-start
  return "This is also highlighted!";
  // highlight-end
}
```

Alternatively, the range syntax can be used within the meta string (e.g., `{3-4,7}` will include lines 3 to 4 and line 7). Another optional flag is `showLineNumbers` to show the code's line numbers:

````md
```js title="/src/components/Hello.js" {3-4,7} showLineNumbers
function HighlightFromMetaString(highlight) {
  if (highlight) {
    console.log("highlight me");
    return "This line is highlighted!";
  }

  return "I'm also highlighted!";
}
```
````

Renders:

```js title="/src/components/Hello.js" {3-4,7} showLineNumbers
function HighlightFromMetaString(highlight) {
  if (highlight) {
    console.log("highlight me");
    return "This line is highlighted!";
  }

  return "I'm also highlighted!";
}
```

Lastly, display an error message (highlight with red) on the subsequent line with the `// error` comment.

````md
```js
const name = null;
// error
console.log(name.toUpperCase());
// Uncaught TypeError: Cannot read properties of null (reading 'toUpperCase')
```
````

This will highlight the line where the error "occurs":

```js
const name = null;
// error
console.log(name.toUpperCase());
// Uncaught TypeError: Cannot read properties of null (reading 'toUpperCase')
```

### Admonitions

[Admonitions](https://docusaurus.io/docs/markdown-features/admonitions) are callout boxes with a keyword, symbol, and color. An example in this document is the tooltip at the top, which is generated using `:::` followed by the keyword `tip`, a custom title (optional), and later closed out by another `:::`:

```md
:::tip Your Title
This is a tip.
:::
```

Aside from `tip`, other options include `note`, `info`, `caution`, and `danger`. Each of these comes with a different color and symbol, and if no custom title is created, the callout's title will default to the captialized keyword name (`Tip`, `Note`, etc.).

Additionally, standard quotation blocks (starting a line with `>`) are displayed with a custom format. These may also be used to highlight specific information in scenarios that don't need the callout box with `:::tip`, etc. but want to highlight a block of text. Lastly, [`<details>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) may occasionally be useful for a similar purpose.

### Tabs

Many code examples have multiple languages or commands that can be used for, essentially, the same thing. Perhaps a Node.js vs. client-side import or usage of installing with `npm` vs. `yarn`. With tabs, code can easily be displayed with a side-by-side navbar-like set of tabs that are used in an `.md` or `.mdx` file.

```jsx
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

<Tabs>
  <TabItem value="bobby" label="Bobby" default>
    Bobby
  </TabItem>
  <TabItem value="tables" label="Tables">
    Tables
  </TabItem>
</Tabs>;
```

Which will then display:

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

<Tabs>
  <TabItem value="bobby" label="Bobby" default>
    Bobby
  </TabItem>
  <TabItem value="tables" label="Tables">
    Tables
  </TabItem>
</Tabs>

---

Since `npm` and `yarn` are so commonly used, the [npm2yarn](https://www.npmjs.com/package/@docusaurus/remark-plugin-npm2yarn) plugin was made to handle this without the need for using tabs while also auto-generating a `yarn` command from an `npm` command:

````md
```terminal npm2yarn
npm run build
npm install <package>
npm run start
```
````

Which renders:

```terminal npm2yarn
npm run build
npm install <package>
npm run start
```

### Assets

Content, such as images, can be displayed directly through either markdown syntax, CJS require, ES imports syntax, or the built-in `useBaseUrl` method. SVGs can also be directly imported. The following demonstrate how to do this, and note the `@site` prefix can be used to access the root `src` directory:

```jsx
import useBaseUrl from "@docusaurus/useBaseUrl";
import myImage from "@site/static/img/tableland/example-image.png";

<img src={useBaseUrl("/img/tableland/example-image.png")} />
<img src={require("@site/static/img/tableland/example-image.png").default} />
<img src={myImage} />

<!-- Or, use standard markdown -->

![Example image](@site/static/img/tableland/example-image.png)
```

All of these render the same image:

![Example image](@site/static/img/tableland/example-image.png)

And for direct SVG imports, import the image and use accordingly:

```jsx
import Logo from "@site/static/img/tableland/logo-black.svg";

<Logo />;
```

Which will directly import this SVG:

import Logo from '@site/static/img/tableland/logo-black.svg'

<Logo />

### Math

Mathametical equations are supported using [KaTeX](https://katex.org/). Simply write inline math equations by wrapping LaTeX equations between `$` or using blocks surrounded by `$$`.

```md
Let $f\colon[a,b]\to\R$ be Riemann integrable. Let $F\colon[a,b]\to\R$ be
$F(x)=\int_{a}^{x} f(t)\,dt$. Then $F$ is continuous, and at all $x$ such that
$f$ is continuous at $x$, $F$ is differentiable at $x$ with $F'(x)=f(x)$.
```

This will change the text inline:

Let $f\colon[a,b]\to\R$ be Riemann integrable. Let $F\colon[a,b]\to\R$ be
$F(x)=\int_{a}^{x} f(t)\,dt$. Then $F$ is continuous, and at all $x$ such that
$f$ is continuous at $x$, $F$ is differentiable at $x$ with $F'(x)=f(x)$.

Or, wrap a block with `$$`:

```md
$$
I = \int_0^{2\pi} \sin(x)\,dx
$$
```

Will render:

$$
I = \int_0^{2\pi} \sin(x)\,dx
$$
