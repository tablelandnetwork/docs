---
title: Web app design
description: Understand the table design for a basic web application.
keywords:
  - web app design
  - studio design
  - users table
  - teams table
---

Web applications are a great use case for storing data in tables. In particular, the [Tableland Studio](/studio/) is a great tool for designing and managing your tables, and under the hood, it's just Tableland to store data. This guide will walk you through the basic table design for a web application and uses the Studio as a reference implementation.

## Studio architecture

To set the stage, let's first review what the Studio uses. There are a total of 11 tables, each with a specific purpose. The primary design for a web app will typically include tables like **teams**, **projects**, and **users**.

The following provides a description Studio tables & a link to the actual deployed table data, or you can inspect the data interactively via the [Studio](https://studio.tableland.xyz/tabledan/studio/deployments) itself (we imported these tables into the UI for data inspection purposes in this guide).

<details>
<summary>View the Tableland Studio deployment information & table descriptions</summary>

<!-- prettier-ignore -->
| Table name | Schema | Description | Link |
| --- | --- | --- | --- |
| users | address text primary key not null,{<br/>}team_id text unique not null,{<br/>}sealed text not null | Tracks the users that have been created. | [users_42170_17](https://tableland.network/api/v1/tables/42170/17) |
| teams | id text primary key not null,{<br/>}name text unique not null,{<br/>}slug text unique not null,{<br/>}personal integer not null | Tracks the teams that have been created. | [teams_42170_16](https://tableland.network/api/v1/tables/42170/16) |
| team_projects | team_id text not null,{<br/>}project_id text not null,{<br/>}is_owner integer not null{<br/>}{<br/>}With table constraint: unique(team_id, project_id) | Tracks the projects that have been created for a team. | [team_projects_42170_15](https://tableland.network/api/v1/tables/42170/15) |
| projects | id text primary key not null,{<br/>}name text not null,{<br/>}slug text not null,{<br/>}description text not null | Tracks the projects that have been created. | [projects_42170_11](https://tableland.network/api/v1/tables/42170/11) |
| project_tables | project_id text not null,{<br/>}table_id text not null with constraint{<br/>}{<br/>}With table constraint: unique(project_id, table_id) | Tracks the tables that have been created for a project. | [project_tables_42170_10](https://tableland.network/api/v1/tables/42170/10) |
| tables | id text primary key not null,{<br/>}slug text not null,{<br/>}name text not null,{<br/>}description text not null,{<br/>}schema text not null | Tracks the table blueprints that have been staged. | [tables_42170_12](https://tableland.network/api/v1/tables/42170/12) |
| deployments | table_id text not null,{<br/>}environment_id text not null,{<br/>}table_name text not null,{<br/>}chain_id integer not null,{<br/>}token_id text not null,{<br/>}block_number integer,{<br/>}txn_hash text,{<br/>}created_at text not null{<br/>}{<br/>}With table constraint: primary key(environment_id, table_id) | Tracks the deployments that have been run where tables are live on a chain. | [deployments_42170_8](https://tableland.network/api/v1/tables/42170/8) |
| environments | id text primary key not null,{<br/>}project_id text not null,{<br/>}name text not null,{<br/>}slug text not null{<br/>}{<br/>}With table constraint: unique(project_id, slug) | Tracks the environments that have been created. | [environments_42170_9](https://tableland.network/api/v1/tables/42170/9) |
| team_invites | id text primary key not null,{<br/>}team_id text not null,{<br/>}sealed text not null,{<br/>}inviter_team_id text not null,{<br/>}created_at text not null,{<br/>}claimed_by_team_id text not null,{<br/>}claimed_at text | Tracks the invites that have been sent to join a team. | [team_invites_42170_13](https://tableland.network/api/v1/tables/42170/13) |
| team_memberships | member_team_id text not null,{<br/>}team_id text not null,{<br/>}is_owner integer not null,{<br/>}joined_at text not null{<br/>}{<br/>}With table constraint: unique(member_team_id, team_id) | Tracks the users that have joined a team. | [team_memberships_42170_14](https://tableland.network/api/v1/tables/42170/14) |
| migrations | id integer primary key,{<br/>}file text not null unique,{<br/>}hash not null | Tracks the migrations that have been run via Drizzle table migrations. | [migrations_42170_7](https://tableland.network/api/v1/tables/42170/7) |

</details>

## Table design

Of those described above, there are a few that are generally useful for any web application. All of these tables make use of a library like [uuid](https://www.npmjs.com/package/uuid) to generate a unique identifier for each record within the application's logic. Additionally, it's quite common for a _slug_ to be used, which would also be generated in the app logic to ensure uniqueness if a specific record is associated with a URL (e.g., `https://example.com/teams/my-team/my-project`).

- `users`: Tracks the users that have been created with a unique wallet address and their corresponding team ID.
- `teams`: Tracks the teams that have been created.
- `team_projects`: Tracks the projects that have been created for a team.
- `projects`: Tracks the projects that have been created.
- `project_tables`: Tracks some underlying data associated with a project—in this case, the tables that have been created for a project, but it could be anything!

:::caution
**All data is public**, so be careful what you store in your tables! For example, the actual Studio's implementation uses the concept of a "sealed" column that obfuscates private user information before inserting it into a table.
:::

To recreate a similar setup as the Studio, we'd want to create the tables noted above:

```sql
CREATE TABLE users (
  address text primary key not null,
  team_id text unique not null
);

CREATE TABLE teams (
  id text primary key not null,
  name text unique not null,
  slug text unique not null
);

CREATE TABLE team_projects (
  team_id text not null,
  project_id text not null
  unique(team_id, project_id)
);

CREATE TABLE projects (
  id text primary key not null,
  name text not null,
  slug text not null,
  description text not null
);

CREATE TABLE project_tables (
  project_id text not null,
  table_id text not null,
  unique(project_id, table_id)
);
```

After inserting some data, the resulting tables would look like this:

**users**

| address   | team_id          |
| --------- | ---------------- |
| 0x1234... | abcd-1234-efgh-1 |

**teams**

| id               | name    | slug    |
| ---------------- | ------- | ------- |
| abcd-1234-efgh-1 | My Team | my-team |

**team_projects**

| team_id          | project_id       |
| ---------------- | ---------------- |
| abcd-1234-efgh-1 | wxyz-1234-efgh-2 |

**projects**

| id               | name       | slug       | description             |
| ---------------- | ---------- | ---------- | ----------------------- |
| wxyz-1234-efgh-2 | My Project | my-project | Description for project |

**project_tables**

| project_id       | table_id     |
| ---------------- | ------------ |
| wxyz-1234-efgh-2 | 000-111-abcd |

## Next steps

If you found this walkthrough helpful, check out the [Studio](https://studio.tableland.xyz) itself to see how it's implemented! You can choose to deploy these tables within the Studio, too, and use the SDK to then interact with the data and your own application.
