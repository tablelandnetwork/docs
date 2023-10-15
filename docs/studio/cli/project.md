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

### `create <name> <description>`

Create a new project by defining the project's name and description.

| Argument        | Type     | Description                |
| --------------- | -------- | -------------------------- |
| `<name>`        | `string` | The project's name.        |
| `<description>` | `string` | The project's description. |

You must also include the team ID for which the project is being created for.

| Option     | Type     | Default | Description                                            |
| ---------- | -------- | ------- | ------------------------------------------------------ |
| `--teamId` | `string` | --      | The unique team ID (via the `studio team ls` command). |

### `add [team] [user]`

Add a user to the team managing a project.

| Option   | Type     | Default | Description                                                    |
| -------- | -------- | ------- | -------------------------------------------------------------- |
| `--team` | `string` | --      | The unique project name (via the `studio project ls` command). |
| `--user` | `string` | --      | The user to add to the team.                                   |

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

### `create`

```bash
studio project create new_project "This is a new project." --teamId ed43dac0-70fb-4c76-873b-5d4a4582c5ee
```

This will log some additional information before the new project is available for use. If you then use the `ls` command or check back in the Studio web app, you'll now see this new project has been created.

### `add`

Within a project, you can add a user to the team managing the project for collaboration purposes—this example is adding a user to a team called "collabs":

```bash
studio project add --team collabs --user example@example.com
```

An output message will log additional context before making the user available as a collaborator on the team.
