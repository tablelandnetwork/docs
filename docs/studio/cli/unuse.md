---
title: Unuse
description: Remove existing contexts set via the `use` command.
keywords:
  - CLI
  - command line
  - studio
---

## `studio unuse <context>`

If you've set a context with the `studio use` command, you can also remove it. The possible contexts include:

- `team`: The usage of a unique team ID.
- `project`: The usage of a unique project ID.
- `api`: The usage of a Studio API URL.

| Argument    | Type     | Default | Description                   |
| ----------- | -------- | ------- | ----------------------------- |
| `<context>` | `string` | --      | One of: team, project, or api |

## Examples

### `team`

Remove a context that was set for a unique team ID.

```bash
studio unuse team
```

This will log a confirmation message:

```bash
your team context has been removed
```

### `project <id>`

Remove a context that was set for a unique project ID.

```bash
studio unuse project
```

This will log a confirmation message:

```bash
your project context has been removed
```

### `api <apiUrl>`

Remove a context that was set for a Studio API URL.

```bash
studio unuse api
```

This will log a confirmation message:

```bash
your api context has been removed
```
