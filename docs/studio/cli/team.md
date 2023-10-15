---
title: Team
description: Manage and inspect information about your Studio teams.
keywords:
  - CLI
  - command line
  - studio
---

## `studio team <subcommand>`

Use these commands to interact with your Studio teams, including listing teams associated with your accounts, creating new teams, and adding members to teams.

### `ls [identifier]`

List all of your teams and underlying projects tied to your Studio account, optionally, passing the team ID.

| Argument       | Type     | Default | Description                         |
| -------------- | -------- | ------- | ----------------------------------- |
| `[identifier]` | `string` | --      | (Optional) the team's ID, if known. |

### `create <name> [personalTeamId]`

Create a new team by defining the new name.

| Argument | Type     | Description      |
| -------- | -------- | ---------------- |
| `<name>` | `string` | The team's name. |

Optionally, you can pass a personal team ID flag or invite users to the team after creation.

| Option             | Type     | Default | Description                                                     |
| ------------------ | -------- | ------- | --------------------------------------------------------------- |
| `--personalTeamId` | `string` | --      | The personal unique team ID (via the `studio team ls` command). |
| `--invites`        | `string` | --      | Comma separated list of emails to be invited to the team.       |

### `add [team] [user]`

Add a user to a specified team.

| Option   | Type     | Default | Description                                              |
| -------- | -------- | ------- | -------------------------------------------------------- |
| `--team` | `string` | --      | The unique team name (via the `studio team ls` command). |
| `--user` | `string` | --      | The user to add to the team.                             |

## Examples

### `ls`

```bash
studio team ls
```

The output might resemble the snippet below. Note the distinction between personal and non-personal teams where the `personal` field is either `1` or `0`, respectively.

```json
[
  {
    "id": "ed43dac0-70fb-4c76-873b-5d4a4582c5ee",
    "name": "tableland_user",
    "slug": "tableland_user",
    "personal": 1,
    "projects": [
      {
        "id": "eac4b0f2-ab4d-41ec-9789-19f0a4905615",
        "name": "starter",
        "slug": "starter",
        "description": "A starter project."
      }
    ]
  },
  {
    "id": "65048d24-96a8-49b4-8b84-28b636383c87",
    "name": "collabs",
    "slug": "collabs",
    "personal": 0,
    "projects": []
  }
]
```

This example shows there is a personal team with a `starter` project, and a non-personal team called `collabs` with no projects.

### `create`

```bash
studio team create new_team_name
```

This will log some additional information before the new team is available for use. If you then use the `ls` command or check back in the Studio web app, you'll now see this new team has been created.

### `add`

Within a team, you can add a user to the team for collaboration purposes—this example is adding a user to a team called "collabs":

```bash
studio team add --team collabs --user example@example.com
```

An output message will log additional context before making the user available as a collaborator on the team.
