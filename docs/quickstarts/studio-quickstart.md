---
title: Studio quickstart
sidebar_label: Studio
description: Get started with an accelerated introduction to the Tableland Studio.
---

The Tableland Studio is a web application and accompanying CLI that allows you to create teams, projects, and tables. It is a great way to get started with Tableland and is fully compatible with the other Tableland libraries, such as the SDK and smart contracts.

For more detailed information on the Studio, see the [Studio docs](/studio).

## Web app quickstart

### 1. Create an account & team

Start by going to [https://studio.tableland.xyz](https://studio.tableland.xyz), signing in, creating an account, and creating a team. By default, personal team is created that doesn't have external use collaboration options. However, if you want to add collaborators, you can create another team with external users enabled.

### 2. Create a project

Once you have a team, you can create a project by clicking the "New project" button on the homepage. A project is a collection of tables across one or more chains.

### 3. Create a blueprint

Once you have a project, you can create a blueprint by clicking the "New table" button on the project page. A blueprint is a template for a table that can later be deployed to a live network. It defines the table's name, description, types, and constraints. For example, you might input the following into the blueprint creation form:

- Table name: `my_table`
- Columns:
  - A column named `id` with type `INTEGER` and constraint `PRIMARY KEY`.
  - A column named `val` with type `TEXT` and no constraints.
- Description: "This is my starter table.""

### 4. Deploy a table

After a blueprint is set up, you can navigate to the "Deployments" tab and click the table you wish to deploy to and its corresponding network. This will bring you through a browser wallet flow since all table creates are an onchain operation and incur transaction fees.

## Studio CLI quickstart

### 1. Install the Studio CLI

First, make sure the Studio CLI is installed globally:

```bash npm2yarn
npm install -g @tableland/studio-cli
```

### 2. Initialize & log in

You must first create an account in the web app, and then this can be used to log in and create a local session key. It's best to use the `init` command to configure your desired default chain, private key, and provider URL. This creates a `tablelandrc.json` file that stores these values locally.

```bash
studio init
```

After you walk through the prompts, you can log in and automatically use these values. The login command is based on the wallet's private key used when you created your account, the desired chain, and the provider URL.

```bash
studio login
```

Note: if you want to override default value from the `init` command, you can pass in the `--chain`, `--privateKey`, and `--providerUrl` flags.

### 3. View your teams & projects

Once you have logged in, you can view your teams:

```bash
studio team ls
```

Or, you can view the projects across teams:

```bash
studio project ls
```

### 4. Set the context

Based on the outputs from the step above, you can set the context to a specific team or project:

```bash
studio use team <team-id>
studio use project <project-id>
```

This makes it easier to use future commands since you don't have to specify the team or project each time. You can also choose to change the default chain or provider URL in case they change from what is set in the `init` command.

### 5. Import data

Let's say we have a CSV file called `data.csv` that looks like this:

```csv title="data.csv"
id,name
1,'Bobby'
2,'Tables'
```

Assuming we created a table called `my_table` with a schema that matches the columns/types of the CSV file, you could them import data into the table:

```bash
studio import-data my_table data.csv --pid <your-project-id>
```

## Next steps

There are plenty of other actions you can take with the Studio CLI—the full [Studio CLI docs](/studio/cli) outline them in detail. In this example, we'll import data from a CSV file into a table.
