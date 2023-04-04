---
title: How to contribute
sidebar_label: Contributor guidelines
description: Get involved and contribute to the Tableland ecosystem.
keywords:
  - docs
  - tableland
  - contribute
  - contributor
  - contributing
tags:
  - contributing
---

Tableland welcomes new collaborators and contributions. The protocol is constantly growing and looking for help from community members, and we've open sourced all of our code, documentation, and tutorials to make this possible. Learn more about where to begin and stylistic guidelines & features about the docs site, in particular.

## Where to start

To get started with contributing, you can do the following:

- View the [open issues](https://github.com/tablelandnetwork/docs/issues) in the docs (or other) repositories and browse issues by labels (example [here](https://github.com/tablelandnetwork/js-tableland/labels)).
- Create an issue if there is a specific contribution in mind. One of the Tableland [documentation maintainers](/contribute/maintainers) will reach out and help find an area for you to contribute.
- Dive into our Discord and open a ticket ([`#contact-team`](https://discord.com/channels/592843512312102924/1000182412795445378)) if you don't want to open a GitHub issue yet but want to discuss potential contributions.

## Add to the Tableland docs

If you do end up contributing, be sure to follow the steps below.

### Step 1: Create a fork

Fork the Tableland [docs repo](https://github.com/tablelandnetwork/docs) and create a branch off of `main`.

### Step 2: Develop & commit

Writing informative commit messages helps ensure reviewers know what you've implemented. It should succinctly describe what was changed and why. Consider the following:

1. The first line should be kept to 50 characters or less. It should be clear what was committed when running `git log --oneline` and follow the format: `<type> [optional scope]: <description>`.
2. The second line should be blank.
3. If you are closing a specific issue, include the issue number that it fixes—`Fixes #N`, where `N` is the issue number.

Here's an exmaple:

```markdown
feat: add content on `how to commit`

Here is the body of the commit message. It is optional but is helpful
when describing what and why certain changes were committed. Messages
should be wrapped properly (max 72 characters) so that `git log`
presents commits nicely.

Fixes #123
```

### Step 3: Raise a PR

When you're ready, raise a pull request or a draft PR if you'd like to discuss anything further. From there, one of the [documentation maintainers](/contribute/maintainers) will review your PR and respond with any feedback or changes. For more help, read GitHub's best practices for [submitting pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests).

### Step 4: Merge

Once your PR is approved, you're ready to merge your commit! Be sure to delete your branch afterward if it isn't already auto-deleted after the merge.

## Sidebars

### Creating & ordering pages

One of the key features of this docs site is that it's pretty straightforward to create and add new docs pages. All sidebar configuration happens in the `config/sidebars.js` file. Sidebars are organized into groupings—each has the main "grouping" that corresponds to a series of directories, and each grouping is created as an array below.

If you want to add a new page to the docs, you simply add the path to that doc as a new string in the corresponding array. For example, say a `tutorials` sidebar exists and is defined as the following

```js
const tutorials = ["tutorials/existing-tutorial"];
```

This means that the `docs/tutorials/existing-tutorial` path is the first tutorial
in the sidebar grouping. The `docs` portion is not needed because all docs are assumed to be in this directory. If you want to create a new doc page and display it in the sidebar, you add it to the array where the order of each path string is the order in which the docs are displayed:

```js
const tutorials = [
  "tutorials/existing-tutorial", // Displayed first
  "tutorials/new-tutorial", // Displayed second
];
```

That is, when you see the sidebar, it'll have this top-to-bottom order and use whatever front matter `title` or `sidebar_label` has been defined in the markdown file itself.

## Collapsible items

You can also create category item groups, which create a collapsible item and helps with readability—this object should be placed in some sidebar array:

```js
{
  type: "category",
  label: "Tutorials",
  link: {
    type: "doc",
    id: "tutorials/README",
  },
  items: ["tutorials/existing-tutorial"],
}
```

Basically, instead of using a path string like `"tutorials/README"` to point to a docs page, you can have a category that defines this page and the subset of `items` under it (i.e., shown when the parent category item is expanded). You can nest all you want such that `items` can contain more categories, too.

If you _don't_ have a category page to point to (i.e., if `"tutorials/README"` didn't exist) and you wanted to just create a collapsible group, you can _remove_ the `link` object entirely (only expand/collapse on click) or use a generated index:

```js
link: {
  type: "generated-index",
  title: "Tutorials"
}
```

This would create a collapsible sidebar item where all of its `items` are autogenerated and appear on the page as clickable cards. The downside is that you don't get to provide any page context (e.g., what is the purposes of this grouping and its sub-pages)..it's just a boring page of cards. If you'd like to use the generated category cards, it's best to create a base category markdown page for some category / folder (as a best practice, you'll often title it `README.MD`) and import `DocCardList` into the markdown:

```js
import DocCardList from "@theme/DocCardList";

<DocCardList />;
```

This would allow you to write some front matter and contextual page content while giving you the choice on where and how to place the `<DocCardList />` cards section.

### Autogenerated

For what its worth, the simple way to do sidebar is with a fully autogenerated setup, which would create sidebars of markdown files within a defined directory (instead of all of this custom configuration). But, it can become hard manage with large docs sites and isn't really used in the Tableland documentations site. For example, a sidebar for the `tutorials` folder could create docs pages for all files within it:

```js
{
  type: "autogenerated",
  dirName: "tutorials",
}
```

A `sidebar_position` front matter key is useful here to provide sidebar ordering, otherwise, the pages will just show up based on their alphabetical ordering. Although autogenerated sidebars aren't commonly used, it _can_ be a bit helpful when it comes to _anything that autogenerates pages_. That is, if you have some API reference where the sidebar markdown pages are produced via some tool or script and can't be predictably defined in `config/sidebars.js`, you can just autogenerate the sidebar itself.

### Utilities

There are a couple of utility methods you can use for formatting sidebar items and sections:

- `section(text, type)` => Use this to create sidebar section with a divider and title—this is used purely for aesthetics. In the sidebar array, you then destructure this value (e.g., `...section("Tutorials")` will display a "Tutorials" label with a horizontal line below it). The `type` is optional and default to `sidebar`, and the other value that should be used it `landing`; the difference between the two is color formatting (the landing sidebar vs. a "side page" sidebar).
- `hr()` => Use this to create simple divider line. It's used by the `section` method but can also be used independently, if needed.
- `sidepageHeader(text)` => At the start of any _new_ grouping of pages, you'll notice a "<- Back to home" button and the groupings heading at the top of the sidebar. When you use and destructure `...sidepageHeader("Contribute")` in a sidebar array, it provides these sidebar items with the proper formatting. It is _only needed as the first item_ in a grouping that's defined on the landing page, so it's unlikely you'll need to use this.

## Next steps

Be sure to check out the [style guide](./style-guide) and follow the stylistic guidelines. This documentation is built using a docs site generator ([Docusaurus](https://docusaurus.io/)) that offers a number of useful features to be aware of.
