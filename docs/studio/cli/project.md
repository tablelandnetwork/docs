---
title: Project
description: Manage and inspect information about your Studio projects.
keywords:
  - CLI
  - command line
  - studio
---

## `studio project <subcommand>`

Use these commands to interact with your Studio projects, including listing projects associated with your accounts, creating new projects, and adding members to teams that manage the project.

### `ls [identifier]`

List all of your projects tied to your Studio account, optionally, passing the team ID. Defaults to your Studio session context.

| Argument       | Type     | Default                | Description                         |
| -------------- | -------- | ---------------------- | ----------------------------------- |
| `[identifier]` | `string` | Studio session default | (Optional) the team's ID, if known. |

## Examples

### `ls`

```bash
studio project ls
```

The output will use whatever your default team context is.

```json
[
  {
    "id": "eac4b0f2-ab4d-41ec-9789-19f0a4905615",
    "name": "starter",
    "slug": "starter",
    "description": "A starter project."
  }
]
```

Or, you can pass a specific team identifier.

```bash
studio project ls 65048d24-96a8-49b4-8b84-28b636383c87
```

Output:

```json
[
  {
    "id": "5fae1e8c-1848-4d4e-b6a5-b9dd42fe682a",
    "name": "collabs_project",
    "slug": "collabs_project",
    "description": "this is a collabs project"
  }
]
```
