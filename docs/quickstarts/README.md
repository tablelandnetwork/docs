---
title: Get started
description: Understand development prerequisites and how to get started with Tableland.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

All database mutating statements are onchain actions. If you're using the SDK or CLI, much of the blockchain and smart contract specifics are abstracted away from the developer experience. If you're writing smart contracts, you're already familiar with the requirements around chains, accounts, and providers.

## Prerequisites

There are a few things every developer will need if they are trying to use Tableland:

- **Wallet**: You'll need to set up an account, such as [MetaMask](https://metamask.io/) for browser wallet-based connections. You'll use your EVM account's to create and write to tables across any of the networks Tableland is live on.
- **Funds**: If you want to create or write to a table, it requires an onchain transaction—you need to own currency in the native chain's denomination if you want to make database state changes.
- **Chains & network concepts**: Developers should be aware of [fundamental network concepts](/fundamentals) like table naming convention, limits, and currently [supported EVM chains](/fundamentals/supported-chains).

:::tip
If you're developing on a testnet, you should get testnet currency, and the way to do this depends on the chain you're using. Check out the [chain selection documentation](/fundamentals/supported-chains) for how to use testnet faucets and get fake currency. Or, use Local Tableland to develop locally without having to worry about testnet currency.
:::

Once you're ready to go, you can start building with any of the quickstarts or dive into subsequent deeper documentation! Note that the Tableland SDK (and the CLI built on top of it) use Node 18, so if you're using an older version of node, you'll have to implement the `fetch` and `Header` polyfills—check out the [SDK docs](/sdk/reference/compatability#node-polyfills) for how to do this.

## Local development

To make it easier to get started, you should check out the [Local Tableland quickstart](/quickstarts/local-tableland) or dive deeper into the docs on how it works. It's, essentially, a sandboxed network running a local-only Tableland validator node, and a local-only Hardhat node in which Tableland registry smart contracts are deployed. So, you can develop and test your application locally without having to worry about deploying to a testnet or mainnet.

## 1. Installation & setup

First, set up your development environment. Within your project directory, run the following to install or use a Tableland package:

<Tabs groupId="quickstart-intro">
  <TabItem value="sdk-node" label="SDK (Node.js)" default>

    ```bash
    npm install @tableland/sdk ethers
    ```

    This will let you use the Tableland SDK in your Node.js project as well as ethers for signer behavior. Or, you can choose to install a starter template—both JavaScript and TypeScript templates are available, so you'd choose one of the following:

    ```bash
    git clone https://github.com/tablelandnetwork/js-template
    git clone https://github.com/tablelandnetwork/ts-template
    ```

  </TabItem>
    <TabItem value="sdk-web" label="SDK (Web)">

    ```bash
    npm install @tableland/sdk ethers
    ```

    This will let you use the Tableland SDK on the client-side in your web app as well as ethers for signer behavior. Or, you can choose to install a starter template—both JavaScript and TypeScript are available, so you'd choose one of the following React or Next.js templates:

    ```bash
    git clone https://github.com/tablelandnetwork/react-js-tableland-template
    git clone https://github.com/tablelandnetwork/react-ts-tableland-template
    git clone https://github.com/tablelandnetwork/next-js-tableland-template
    git clone https://github.com/tablelandnetwork/next-ts-tableland-template
    ```

  </TabItem>
  <TabItem value="solidity" label="Solidity">

    ```bash
    npm install @tableland/evm @openzeppelin/contracts
    ```

    This will let you use the Tableland Solidity library in your smart contract, and the OpenZeppelin contracts are pretty useful as well. Or, you can choose to install a starter template—both JavaScript and TypeScript templates are available, so you'd choose one of the following:

    ```bash
    git clone https://github.com/tablelandnetwork/hardhat-js-tableland-template
    git clone https://github.com/tablelandnetwork/hardhat-ts-tableland-template
    ```

  </TabItem>
  <TabItem value="cli" label="CLI">

    ```bash
    npm install -g @tableland/cli
    ```

    This will let you use the Tableland CLI in your terminal.

  </TabItem>
</Tabs>

Then, within your source code, set up Tableland; this will vary depending on the package you're using.

<Tabs groupId="quickstart-intro">
  <TabItem value="sdk-node" label="SDK (Node.js)" default>

    Here, we import and instantiate a `Database`, and in order to know the chain to connect to, we pass in a `signer` via a private key that will be used to connect to the chain.

    ```js
    import { Database } from "@tableland/sdk";
    import { Wallet, getDefaultProvider } from "ethers";

    // Connect to provider with a private key (e.g., via Hardhat)
    const privateKey = "59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"; // Your private key
    const wallet = new Wallet(privateKey);
    const provider = getDefaultProvider("http://127.0.0.1:8545"); // Replace with the chain you want to connect to

    // Pass the signer to the Database
    const signer = wallet.connect(provider); // Uses the chain at the provider
    ```

  </TabItem>
  <TabItem value="sdk-web" label="SDK (Web)">

    Here, we import and instantiate a `Database`, and in order to know the chain to connect to, we pass in a `signer` via a browser wallet connection that will be used to connect to the chain.

    ```js
    import { Database } from "@tableland/sdk";
    import { BrowserProvider } from "ethers";

    // Connect to provider from browser and get accounts
    const provider = new BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);

    // Pass the signer to the Database
    const signer = await provider.getSigner();
    ```

  </TabItem>
  <TabItem value="solidity" label="Solidity">

    ```solidity
    import {TablelandDeployments} from "@tableland/evm/contracts/utils/TablelandDeployments.sol";
    import {SQLHelpers} from "@tableland/evm/contracts/utils/SQLHelpers.sol";
    import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
    ```

  </TabItem>
  <TabItem value="cli" label="CLI">

    You'll want to run the `init` command, which prompts you for information and saves it in a `.tablelandrc.json` file and reads from it for future commands. These can always be overridden by passing a flag explicitly. You'll need to provide the following:
    - The desired chain to connect to, which is passed automatically as a flag in almost every command (e.g., `local-tableland` or `filecoin`).
    - Your private key for sending transactions (table creates and writes).
    - Your provider URL for connecting to the desired chain (e.g,. `http://localhost:8545` for local-only development).
    - The format of the config file (json or yaml).
    - Path where the file should be saved.
    - Path where an, optional, table aliases file should be saved.

    ```bash
    tableland init
    ```

    The steps below assume you've set up an aliases file during the config steps, allowing you to use "shorthand" table name of something like `my_table` instead of the universally unique table name of resembling `my_table_31337_2`.

  </TabItem>
</Tabs>

## 2. Create a table

Let's create a simple `my_table` with two columns: `id` and `val`.

<Tabs groupId="quickstart-intro">
  <TabItem value="sdk-node" label="SDK (JS)" default>

    We'll use the `run` method to execute the query and await the transaction to finalize.

    ```js
    // Existing code from above

    // Create a database connection
    const db = new Database({ signer });

    const { meta: create } = await db.prepare(`CREATE TABLE my_table (id int, val text);`).all();
    await create.txn?.wait();
    const [tableName] = create.txn?.names ?? [];
    ```

  </TabItem>
   <TabItem value="sdk-web" label="SDK (TS)" default>

    We'll use the `run` method to execute the query and await the transaction to finalize.

    ```ts
    // Existing code from above

    // Strongly type the `Database` or prepared statements
    interface TableSchema {
      id: number;
      val: string;
    }

    // Create a database connection
    const db = new Database<TableSchema>({ signer });

    const { meta: create } = await db.prepare(`CREATE TABLE my_table (id int, val text);`).all();
    await create.txn?.wait();
    const [tableName] = create.txn?.names ?? [];
    ```

  </TabItem>
  <TabItem value="solidity" label="Solidity">

    We'll use the `TablelandDeployments.get()` method to get the Tableland registry contract on whatever chain this contract is deployed to. Then, we'll use the `create` method to create a table with the given schema. The `SQLHelpers.toCreateFromSchema` method takes in a schema and a table prefix, and returns a string that can be used to create a table.

    Also, the `onERC721Received` **is required** in order for the contract to own a table, which is an ERC721 token.

    ```solidity
    // Store relevant table info
    uint256 private _tableId; // Unique table ID
    string private constant _TABLE_PREFIX = "my_table"; // Custom table prefix

    // Creates a simple table with an `id` and `val` column
    function createTable() public payable {
       /*  Under the hood, SQL helpers formulates:
        *
        *  CREATE TABLE {prefix}_{chainId} (id INTEGER PRIMARY KEY, val TEXT)
        *
        */
      _tableId = TablelandDeployments.get().create(
            address(this),
            SQLHelpers.toCreateFromSchema(
              "id integer primary key," // Notice the trailing comma
              "val text",
              _TABLE_PREFIX
            )
        );
    }

    // Required for the contract to own a table
    function onERC721Received(address, address, uint256, bytes calldata) external pure returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }
    ```

  </TabItem>
  <TabItem value="cli" label="CLI">

    You can create a table with the `create` command—there's an option for full SQL statements, shorthand statements, or an input file.

    <Tabs>
      <TabItem value="cli-full" label="Full">

      ```bash
      tableland create "CREATE TABLE my_table (id INTEGER PRIMARY KEY, val TEXT);"
      ```

      </TabItem>
      <TabItem value="cli-short" label="Shorthand">

      ```bash
      tableland create "id INTEGER PRIMARY KEY, val TEXT" --prefix my_table
      ```

      </TabItem>
      <TabItem value="cli-file" label="File">

      ```bash
      # Assumes we have a `file.sql` with a `CREATE TABLE` statement
      tableland create --file /path/to/file.sql
      ```

      </TabItem>
    </Tabs>

  </TabItem>
</Tabs>

## 4. Write to a table

Now, we can write to the table created in the previous step.

<Tabs groupId="quickstart-intro">
  <TabItem value="sdk-node" label="SDK (JS)" default>

    We can insert a row into the table by calling the same `prepare` method and awaiting it to finish with the onchain transaction.

    ```js
    const { meta: write } = await db.prepare(`INSERT INTO my_table (id, val) VALUES (1, 'Bobby Tables');`).all();
    await write.txn?.wait();
    ```

  </TabItem>
  <TabItem value="sdk-web" label="SDK (TS)">

    We can insert a row into the table by calling the same `prepare` method and awaiting it to finish with the onchain transaction.

    ```ts
    const { meta: write } = await db.prepare(`INSERT INTO my_table (id, val) VALUES (1, 'Bobby Tables');`).all();
    await write.txn?.wait();
    ```

  </TabItem>
  <TabItem value="solidity" label="Solidity">

    The `TablelandDeployments.get()` method chained with the `mutate` method plus the `SQLHelpers.toInsert` (or [other helper methods](/smart-contracts/sql-helpers)) will let you mutate a table.

    ```solidity
    function insertIntoTable(uint256 id, string memory val) external {
       /*  Under the hood, SQL helpers formulates:
        *
        *  INSERT INTO {prefix}_{chainId}_{tableId} (id,val) VALUES(
        *    <id>,
        *    <val
        *  );
        */
        TablelandDeployments.get().mutate(
            address(this), // Table owner, i.e., this contract
            _tableId,
            SQLHelpers.toInsert(
                _TABLE_PREFIX,
                _tableId,
                "id,val",
                string.concat(
                    Strings.toString(id), // Convert to a string
                    ",",
                    SQLHelpers.quote(val) // Wrap strings in single quotes with the `quote` method
                )
            )
        );
    }
    ```

  </TabItem>
  <TabItem value="cli" label="CLI">

    The `write` command lets you write data to the table with either a SQL string or file:

    <Tabs>
      <TabItem value="cli-full" label="Full">

      ```bash
      tableland write "INSERT INTO my_table (1, 'Bobby Tables');"
      ```

      </TabItem>
      <TabItem value="cli-file" label="File">

      ```bash
      # Assumes we have a `file.sql` with a `CREATE TABLE` statement
      tableland write --file /path/to/file.sql
      ```

      </TabItem>
    </Tabs>

  </TabItem>
</Tabs>

## 4. Read from a table

Lastly, we can read the materialized data from the table.

<Tabs groupId="quickstart-intro">
  <TabItem value="sdk-node" label="SDK (JS)" default>

    The results returned from the `all` method will be an array of objects where each object represents a table row.

    ```js
    const { results } = await db.prepare(`SELECT * FROM my_table;`).all();
    ```

  </TabItem>
  <TabItem value="sdk-web" label="SDK (TS)">

    The results returned from the `all` method will be an array of objects where each object represents a table row.

    ```ts
    // The results are an array of objects with the same shape as the `TableSchema` we created above
    const { results } = await db.prepare(`SELECT * FROM my_table;`).all<TableSchema>();
    ```

  </TabItem>
  <TabItem value="solidity" label="Solidity">

    You **cannot** read table data from Solidity. Table state is materialized offchain, so it can only be read with the SDK, CLI, or [Gateway API](/validator/api) and then written back onchain as needed. For example, an [oracle setup](/tutorials/table-reads-chainlink) could be used to periodically read data from a table and write it back onchain.

  </TabItem>
  <TabItem value="cli" label="CLI">

    The `read` command lets you read data to the table with either a SQL string or file:

    <Tabs>
      <TabItem value="cli-full" label="Full">

      ```bash
      tableland read "SELECT * FROM my_table;"
      ```

      </TabItem>
      <TabItem value="cli-file" label="File">

      ```bash
      # Assumes we have a `file.sql` with a `CREATE TABLE` statement
      tableland read --file /path/to/file.sql
      ```

      </TabItem>
    </Tabs>

  </TabItem>
</Tabs>

## Next steps

All of the subsequent pages go through each of these in more detail, so check them out if this initial walkthrough wasn't deep enough!
