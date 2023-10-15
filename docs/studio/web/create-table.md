---
title: Create a table
description: Create a blueprint & deploy your table to a supported EVM chain.
keywords:
  - studio
---

When using the [Studio](https://studio.tableland.xyz/), the first step is to connect, login, and create a team. This will allow you to create projects and deploy tables to supported EVM chains.

import projectLanding from "@site/static/assets/studio/6_project-landing.png";
import tableDef from "@site/static/assets/studio/7_table-definition.png";
import tableDefCompleted from "@site/static/assets/studio/8_table-def-completed.png";
import tableDefInfo from "@site/static/assets/studio/9_table-def-info.png";
import deployments from "@site/static/assets/studio/10_deployments.png";
import deployTable from "@site/static/assets/studio/11_deploy-table.png";
import deployPending from "@site/static/assets/studio/12_deploy-in-flight.png";
import deployed from "@site/static/assets/studio/13_deployed.png";

## Create a table blueprint

Now that you've created a project, you can create a table and deploy it to a supported EVM chain. For this example, we'll use the _starter_ project we just created and create a simple "messages" table. The first step is to create a table blueprint, which is a table definition that is _not yet_ deployed but staged to be.

1. Your project landing should now let you create a project blueprint (table definition placeholders for deployment) or import existing deployed tables—we’ll start with table definitions by clicking **New Table**.

   <img src={projectLanding} width='80%'/>

2. Now, we can define our table's name. Note that this is really an alias for the full, universally unique table name that's in the format `{prefix}_{chainId}_{tableId}`—but in the Studio, we abstract away the `_{chainId}_{tableId}` portion to make it easier to interact with the table once deployed. For this example, we'll call our table "messages" while defining its columns, constraints, and description.

  <img src={tableDef} width='100%'/>

3. Then, clicking **Submit** will bring you back to the project homepage and show the table blueprint that's ready for deployment.

  <img src={tableDefCompleted} width='60%'/>

4. The blueprint is now staged. You can further inspect the table definition by clicking on it within the project _Blueprints_ page, which will show the information you just entered.

  <img src={tableDefInfo} width='80%'/>

## Deploy a table

With your blueprint set up, you're now ready to deploy the table!

1. Navigate to the _Deployments_ tab and find the undeployed table on the left hand side. Any table with a red icon means it is only a blueprint and has not been launched to an EVM chain, yet; if the icon is black, that means it's live.

  <img src={deployments} width='80%'/>

2. Click on the "messages" table to bring up the deployment screen. This will let you enter the desired chain you want the table to exist on. Once you've selected the chain, click **Deploy**.
   <img src={deployTable} width='80%'/>

3. All table creates are onchain operations, so make sure you have enough funds in your wallet to cover the transaction fees; a confirmation action will be triggered to sign the transaction.

  <img src={deployPending} width='80%'/>

4. After the table has been deployed, you'll see the Tableland-generated full table name, the chain it's deployed to, and some other metadata.

  <img src={deployed} width='80%'/>

## Next steps

With your table deployed, you can now interact with it from the Studio web app, Studio CLI, or from your own application that uses the Tableland SDK, smart contract, or "standard" CLI tool. There are other features possible in the Studio as well, so continue onward to understand what's possible.
