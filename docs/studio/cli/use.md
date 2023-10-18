---
title: Use
description: Define a team, project, or API context to use for subsequent commands.
keywords:
  - CLI
  - command line
  - studio
---

## `studio use <context> <identifier>`

To make it easier to execute Studio commands, you can provide a context. There are three possible options (the first two are most common): team, project, or API. The following describes these contexts and their associated identifier in more detail:

- `team <id>`: The unique team ID, available using the `studio team ls` command.
- `project <id>`: The unique project ID, available using the `studio project ls` command.
- `api <apiUrl>`: The Studio API URL; defaults to `https://studio.tableland.xyz`.

| Argument       | Type     | Default | Description                   |
| -------------- | -------- | ------- | ----------------------------- |
| `<context>`    | `string` | --      | One of: team, project, or api |
| `<identifier>` | `string` | --      | The context's unique ID..     |

## Examples

### `team <id>`

Create a context with the unique team ID returned from the `team ls` command.

```bash
studio use team ed43dac0-70fb-4c76-873b-5d4a4582c5ee
```

This will log a confirmation message:

```bash
your team context has been set to team_id of: ed43dac0-70fb-4c76-873b-5d4a4582c5ee
```

### `project <id>`

Create a context with the unique project ID returned from the `project ls` command.

```bash
studio use project eac4b0f2-ab4d-41ec-9789-19f0a4905615
```

This will log a confirmation message:

```bash
your project context has been set to project_id of: eac4b0f2-ab4d-41ec-9789-19f0a4905615
```

### `api <apiUrl>`

Create a context with the `apiUrl`—defaults to the Studio web app public HTTPS URL. If you're developing locally with the Tableland Studio—e.g., cloning the public repo on your machine—you might have a local host URL like `http://localhost:3000`.

```bash
studio use api https://studio.tableland.xyz
```

This will log a confirmation message:

```bash
your api context has been set to api_id of: https://studio.tableland.xyz
```
