---
title: How to contribute
sidebar_label: Contributor guidelines
description: Get involved and contribute to the Tableland ecosystem.
synopsis: Tableland welcomes new collaborators and contributions. The protocol is constantly growing and looking for help from community members, and we've open sourced all of our code, documentation, and tutorials to make this possible. Learn more about where to begin and stylistic guidelines & features about the docs site, in particular.
keywords:
  - docs
  - tableland
  - contribute
  - contributor
  - contributing
tags:
  - contributing
---

## Where to start

To get started with contributing, you can do the following:

- View the [open issues](https://github.com/tablelandnetwork/docs/issues) in the docs (or other) repositories and browse issues by labels (example [here](https://github.com/tablelandnetwork/js-tableland/labels)).
- Create an issue if there is a specific contribution in mind. One of the Tableland [documentation maintainers](/docs/contribute/maintainers) will reach out and help find an area for you to contribute.
- Dive into our Discord and ask in open a ticket in [`#contact-team`](https://discord.com/channels/592843512312102924/1000182412795445378) if you don't want to open a GitHub issue yet but want to discuss potential contributions.

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

When you're ready, raise a pull request or a draft PR if you'd like to discuss anything further. From there, one of the [documentation maintainers](/docs/contribute/maintainers) will review your PR and respond with any feedback or changes. For more help, read GitHub's best practices for [submitting pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests).

### Step 4: Merge

Once your PR is approved, you're ready to merge your commit! Be sure to delete your branch afterward if it isn't already auto-deleted after the merge.

## Next steps

Be sure to check out the [style guide](./style-guide) and follow the stylistic guidelines. This documentation is built using a docs site generator ([Docusaurus](https://docusaurus.io/)) that offers a number of useful features to be aware of.
