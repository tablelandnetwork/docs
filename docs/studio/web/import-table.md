---
title: Import a table
description: If you've already created a table outside of the Studio, you can still import it into your projects.
keywords:
  - studio
---

The [Studio](https://studio.tableland.xyz/) is just one component of the Tableland development stack. When you create tables with the Studio, you can then interact with those tables from other Tableland clients like the SDK or smart contracts. Similarly, if you create tables outside of the Studio, you can import them into your projects to manage them from the Studio.

import importTable from "@site/static/assets/studio/14_import.png";
import importTableInfo from "@site/static/assets/studio/15_enter-import-info.png";
import importedTables from "@site/static/assets/studio/16_imported-tables.png";

## Importing an existing table

To import an existing table, you'll need to know the table's full name in the form `{prefix}_{chainId}_{tableId}` since these are parameters required during the import. Typically, you'll also want to make sure that whatever wallet you're connected to in the Studio is _the same account_ that created the table outside of the Studio. This example will use some "users" table that we've already created; however, it _is_ possible to import a table that someone else created, even if you don't have write permissions on the table.

1. Navigate to your project homepage and click the **Import Table** button in the top right corner.

  <img src={importTable} width='80%'/>

1. Then, you'll need to enter the information from the universally unique table name—the prefix, chain ID, and table ID. E.g., if the original globally unique of the table is `users_31337_15`, then you'd enter `users` in the "name" section, `31337` for the chain ID (aka Local Tableland / Hardhat), and `15` for the table ID.

  <img src={importTableInfo} width='80%'/>

3. Once completed, you should now see the imported table in your project! You can further inspect it by clicking on the table, just as you would with one created in the Studio.

  <img src={importedTables} width='80%'/>

## Next steps

If you're collaborating with others, you can share project information with a view-only like or even create teams that are not restricted to your account alone. Or, if you'd like to take things to your terminal, you can use the [Studio CLI](/studio/cli) to perform similar actions from the command line.
