---
title: Import table
description: Take an existing created table and import it into your Studio project.
keywords:
  - CLI
  - command line
  - studio
---

## `studio import-table <table> <project> <description> [name]`

Use these commands to interact with your Studio projects, including listing projects associated with your accounts, creating new projects, and adding members to teams that manage the project.

| Argument        | Type     | Default | Description                                                        |
| --------------- | -------- | ------- | ------------------------------------------------------------------ |
| `<table>`       | `string` | --      | The universally unique table name, `{prefix}_{chainId}_{tableId}`. |
| `<project>`     | `string` | --      | The unique project ID.                                             |
| `<description>` | `string` | --      | (Optional) the team's ID, if known.                                |
| `[name]`        | `string` | --      | (Optional) the team's ID, if known.                                |

You must also include the project ID for which the table is imported into (it's the same as the argument defined above).

| Option                 | Type     | Default | Description            |
| ---------------------- | -------- | ------- | ---------------------- |
| `--projectId`, `--pid` | `string` | --      | The unique project ID. |

## Example

```bash
studio import-table users_31337_2 eac4b0f2-ab4d-41ec-9789-19f0a4905615 "A users table" --pid eac4b0f2-ab4d-41ec-9789-19f0a4905615
```

You’ll then receive a confirmation message. Note the name is shown as `undefined` since no custom table name/alias was specified, but the table will inherit from the original prefix/alias—e.g., `users` will show up in Studio web app.

```json
successfully imported users_31337_2
  projectId: eac4b0f2-ab4d-41ec-9789-19f0a4905615
  name: undefined
  description: A users table
```
