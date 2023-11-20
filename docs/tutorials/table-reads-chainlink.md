---
title: Onchain reads with Chainlink + Ethereum
sidebar_label: Onchain reads with Chainlink
description: Use Chainlink’s node operator network to get table state back onchain to the Ethereum network.
keywords:
  - chainlink
  - dynamic nft
---

The following walks through how to query offchain table state and write it back onchain. It walks through how to do so using Chainlink’s [Any API](https://docs.chain.link/any-api/api-reference/). Note that this is possible with all networks in which Tableland is deployed on, but be sure to use the correct contract address! This example _hardcodes_ values with [Ethereum Sepolia](https://docs.chain.link/resources/link-token-contracts/#sepolia-testnet) for simplicity sake.

## Synopsis

We’ll be using the Chainlink [Any API](https://docs.chain.link/getting-started/advanced-tutorial/) to read data from the Tableland network and write it back onchain. It will use the "single word response" [GET method](https://docs.chain.link/any-api/get-request/examples/single-word-response/) to retrieve a single unsigned integer value from Tableland ([here](https://testnets.tableland.network/api/v1/query?unwrap=true&statement=select%20%2A%20from%20healthbot_11155111_1)) and write it back onchain.

Recall that writing data to Tableland happens with onchain actions, whereas reading _from_ the Tableland network occurs via an offchain gateway query. If a developer wants to query for data and make some onchain action based on the result, they’ll need to use an oracle to retrieve the data.

### Repo

To see the final source code, check out the following repo, which removes some of the hardcoding and makes it easier to work with: [here](https://github.com/dtbuchholz/tutorial-onchain-reads-chainlink-ethereum). An example of the deployed contract can be found: [here](https://sepolia.etherscan.io/address/0x22352F3c7765D389f2491108942de357f799Ec4F).

### Node operators

First, a brief on Chainlink node operators. A node operator is a specific node that deploys an onchain Chainlink [Operator](https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.7/Operator.sol) contract, watches for interactions with that contract, and then responds appropriately (e.g., hears a query for data, then writes data onchain). Each node can implement its own customizations, such as data transformation. Plus, each node has a _unique_ `jobId` that it runs, which tells the node which job it should perform (e.g., GET `uint256` single word).

For example, the Chainlink documentation notes an [`addInt`](https://docs.chain.link/any-api/api-reference/#addint) method (used with the single `uint256` word) in which you can pass the value `times` to indicate that an API response’s value should be multiplied ("times") by a certain value. This is useful if a response should be further changed after the query. Thus, you build a request in your contract that looks something like the following:

```solidity
// The URL to perform the GET request on
req.add("get", url);
// A comma-separated path to extract the desired data from the API response
req.add("path", path);
// Required parameter, set to `1` to denote no multiplication needed in return value
req.addInt("times", 1);
```

### Chain support

Chainlink-operated Any API nodes offers support for a number of testnets, including **Ethereum Sepolia**:

- Node operator contract address: [`0x6090149792dAAeE9D1D568c9f9a6F6B46AA29eFD`](https://docs.chain.link/any-api/testnet-oracles/#operator-contracts)
- Job ID (`GET>uint256`): `ca98366cc7314957b8c012c72f05aeeb` (others available [here](https://docs.chain.link/any-api/testnet-oracles/#job-ids))
- LINK token address: [`0x779877A7B0D9E8603169DdbD7836e478b4624789`](https://docs.chain.link/resources/link-token-contracts/#sepolia-testnet)

For a full list of Chainlink-managed contracts, see the following references in the Chainlink docs:

- Any API contracts & job IDs: [here](https://docs.chain.link/any-api/testnet-oracles/)
- LINK token addresses: [here](https://docs.chain.link/resources/link-token-contracts/)

## Setup

### Prerequisites

If you plan on deploying the contract, you’ll need the following:

1. Set up a [Hardhat](https://hardhat.org/getting-started/) project.
2. Set up an [Alchemy](https://www.alchemy.com/) and (optionally) [Etherscan](https://etherscan.io/) account
3. Fund your wallet with Sepolia LINK tokens (see below).

### Testnet LINK

First, request testnet LINK from [https://faucets.chain.link/sepolia](https://faucets.chain.link/sepolia). This should give you 20 test LINK tokens. As part of the deployment flow, we’ll be depositing LINK into the contract, which will pay for API requests fulfilled by the Chainlink node operator. The default value per request is typically `0.1 LINK`.

### Oracle & job values

In this example, the oracle ID is for the Sepolia node operator, the job ID is for retrieving `uint256` values, and the LINK token address is the ERC20 LINK token on Ethereum Sepolia:

```solidity
/**
 * @dev Initialize the LINK token and target oracle
 *
 * Ethereum Sepolia Testnet details:
 * LINK Token: 0x779877A7B0D9E8603169DdbD7836e478b4624789
 * Oracle: 0x6090149792dAAeE9D1D568c9f9a6F6B46AA29eFD (Chainlink's Ethereum Sepolia oracle)
 * _jobId: ca98366cc7314957b8c012c72f05aeeb
 *
 */
constructor() ConfirmedOwner(msg.sender) {
    setChainlinkToken(0x779877A7B0D9E8603169DdbD7836e478b4624789);
    setChainlinkOracle(0x6090149792dAAeE9D1D568c9f9a6F6B46AA29eFD);
    _jobId = "ca98366cc7314957b8c012c72f05aeeb";
    _fee = (1 * LINK_DIVISIBILITY) / 10; // This is 0.1 LINK, where `LINK_DIVISIBILITY` is 10**18
}
```

Later, we'll alter the constructor to take in these values as parameters, but for now, we'll hardcode them for simplicity sake.

### Tableland request

The following URL will be used for requesting Tableland state onchain:

- _[https://testnets.tableland.network/api/v1/query?unwrap=true&statement=select%20%2A%20from%20healthbot_11155111_1](https://testnets.tableland.network/api/v1/query?unwrap=true&statement=select%20%2A%20from%20healthbot_11155111_1)_

It is the Tableland `healthbot` table deployed on the Ethereum Sepolia testnet, which simply increments a single `counter` key by an integer value. For mainnet chains, be sure to use the `tableland.network` gateway over the `testnets.tableland.network` gateway.

The API response should look like the following:

```json
{
  "counter": 4994
}
```

Hence, the `path` referenced below is this single `"counter"` value. If there was nested JSON data, then that would simply be a longer comma separated value (e.g., `{ counter: { data: 4994 } }` would be represented with a path of `"counter,data"`).

## Smart Contract

### Variables

You’ll need to create a contract that inherits from the following Chainlink contracts: [`ChainlinkClient`](https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.6/ChainlinkClient.sol) and [`ConfirmedOwner`](https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/ConfirmedOwner.sol). You should also set up some of the basic variables needed to build the request. Hardcoding this information and the general setup is **not** necessarily the recommended way to do this but used for demonstration purposes.

A few key points, and note that the majority of these are set in an example deployment script, provided toward the end of this page:

- `data` ⇒ The offchain `data` returned by Chainlink from the Tableland network (i.e., table state get written onchain by the oracle).
- `url` ⇒ URL to make an HTTP request to (i.e,. the Tableland gateway).
- `path` ⇒ A comma separated HTTP response path that must lead to a single `uint256` (e.g., `"counter"`).
- `_jobId` ⇒ Chainlink job ID (in this case, for getting a single word as `uint256`, which is noted above).
  - Note: other Chainlink job types exist, such as other types or multi-word responses; this walkthrough is a simple 1 word `uint256` response.
- `_fee` ⇒ A hardcoded fee that is required for oracle payment (defaults to `0.1 LINK`).
- The `RequestData` is a simple event to track the request is fulfilled.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

contract TableState is ChainlinkClient, ConfirmedOwner {
    using Chainlink for Chainlink.Request;

    uint256 public data;
    string public url;
    string public path;
    bytes32 private _jobId;
    uint256 private _fee;

    event RequestData(bytes32 indexed requestId, uint256 data);

    constructor() ConfirmedOwner(msg.sender) {
        setChainlinkToken(0x779877A7B0D9E8603169DdbD7836e478b4624789);
        setChainlinkOracle(0x6090149792dAAeE9D1D568c9f9a6F6B46AA29eFD);
        _jobId = "ca98366cc7314957b8c012c72f05aeeb";
        _fee = (1 * LINK_DIVISIBILITY) / 10;
    }
}
```

### Helper methods

A number of helper methods are included for setting the request URL, path, fee, and oracle:

- `setRequestUrl` ⇒ Set the `url` to some HTTPS URL (e.g., the one noted above) for the Tableland `healthbot` table.
- `setRequestPath` ⇒ Set the `path` to a single word response that maps to a `uint256`.
- `setOracle` ⇒ Set the oracle contract address by which to make the offchain request.
- `setJobId` ⇒ Set the `_jobId` as specified by the oracle.
- `setFee` ⇒ Set the Chainlink `fee`.
- `setLinkToken` ⇒ Set the Chainlink LINK token address (can be helpful in testing scenarios but in theory, not needed after deployment).
- `withdrawLink` ⇒ Make withdrawal of LINK tokens from the contract..

```solidity
function setRequestUrl(string memory _url) external onlyOwner {
    url = _url;
}

function setRequestPath(string memory _path) external onlyOwner {
    path = _path;
}

function setOracle(address oracle) external onlyOwner {
    setChainlinkOracle(oracle);
}

function setJobId(bytes32 jobId) external onlyOwner {
    _jobId = jobId;
}

function setFee(uint256 fee) external onlyOwner {
    _fee = fee;
}

function setLinkToken(address link) external onlyOwner {
    setChainlinkToken(link);
}

function withdrawLink() public onlyOwner {
    LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
    require(
        link.transfer(msg.sender, link.balanceOf(address(this))),
        "Unable to transfer"
    );
}
```

### Chainlink request-receive

With oracles, there’s a "request-receive" pattern. Make an onchain call to request offchain data, and receive the result via the oracle. This is what will enable table state to be brought back into the contact:

- `requestData` ⇒ Create a Chainlink request to retrieve API response, which include:
  - `req.add("get", url)` ⇒ Specify the request type and the URL, where `url` is a storage variable in this example.
  - `req.add("path", path)` ⇒ Specify the path to the data in the API response (e.g., `"counter"` is the key of the example URL).
  - `req.addInt("times", 1)` ⇒ (Required) Specify how to transform the response data, which can be useful when working with non-integer response values onchain.
  - `sendChainlinkRequest` ⇒ Makes the call to the oracle contract.
- `fulfill` ⇒ Receive the API response in the form of `uint256`, which is then set to the storage variable `data`.

```solidity
function requestData() public returns (bytes32 requestId) {
  Chainlink.Request memory req = buildChainlinkRequest(
    _jobId,
    address(this),
    this.fulfill.selector
  );
  req.add("get", url);
  req.add("path", path);
  req.addInt("times", 1); // Or, a node may choose to implement "times" here, which is the Chainlink default
  // Sends the request
  requestId = sendChainlinkRequest(req, _fee);
}

function fulfill(
  bytes32 _requestId,
  uint256 _data
) public recordChainlinkFulfillment(_requestId) {
  emit RequestData(_requestId, _data);
  data = _data;
}
```

Namely, call `requestData` to make an offchain request and retrieve table state written onchain via `fulfill`, which emits the request event.

### Full contract code

Putting this all together, the following is the full contract. Note that we've adjusted the constructor to allow for the oracle, job ID, and LINK token address to be passed in as parameters during deployment.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

contract TableState is ChainlinkClient, ConfirmedOwner {
    using Chainlink for Chainlink.Request;

    // The offchain `data` returned by Chainlink from the Tableland network
    uint256 public data;
    // URL to make an HTTP request to
    string public url;
    // HTTP response path that must lead to a single `uint256`
    string public path;
    // Chainlink job ID (in this case, for getting a single word as `uint256`)
    bytes32 private _jobId;
    // Chainlink network fee
    uint256 private _fee;

    // Emit upon a new request
    event RequestData(bytes32 indexed requestId, uint256 data);

    /**
    * @dev Initialize the LINK token and target oracle
    *
    * Ethereum Sepolia Testnet details:
    * LINK Token: 0x779877A7B0D9E8603169DdbD7836e478b4624789
    * Oracle: 0x6090149792dAAeE9D1D568c9f9a6F6B46AA29eFD (Chainlink's Ethereum Sepolia oracle)
    * _jobId: ca98366cc7314957b8c012c72f05aeeb
    *
    */
    constructor(
        address link,
        address oracle,
        bytes32 jobId
    ) ConfirmedOwner(msg.sender) {
        setChainlinkToken(link);
        setChainlinkOracle(oracle);
        _jobId = jobId;
        _fee = (1 * LINK_DIVISIBILITY) / 10; // This is 0.1 LINK, where `LINK_DIVISIBILITY` is 10**18
    }

    /**
     * @dev Set the `url` to some HTTPS URL.
     */
    function setRequestUrl(string memory _url) external onlyOwner {
        url = _url;
    }

    /**
     * @dev Set the `path` to a single word response that maps to a `uint256`.
     */
    function setRequestPath(string memory _path) external onlyOwner {
        path = _path;
    }

    /**
     * @dev Set the oracle to make the offchain request.
     */
    function setOracle(address oracle) external onlyOwner {
        setChainlinkOracle(oracle);
    }

    /**
     * @dev Set the `_jobId` as specified by the oracle.
     */
    function setJobId(bytes32 jobId) external onlyOwner {
        _jobId = jobId;
    }

    /**
     * @dev Set the Chainlink `fee`.
     */
    function setFee(uint256 fee) external onlyOwner {
        _fee = fee;
    }

		/**
     * @dev Set the Chainlink LINK token address.
     */
    function setLinkToken(address link) external onlyOwner {
        setChainlinkToken(link);
    }

    /**
     * @dev Create a Chainlink request to retrieve API response.
     */
    function requestData() public returns (bytes32 requestId) {
        Chainlink.Request memory req = buildChainlinkRequest(
            _jobId,
            address(this),
            this.fulfill.selector
        );
        // Set the URL to perform the GET request on
        req.add("get", url);
        // Set the path to find the desired data in the API response
        req.add("path", path);
        // Required parameter, set to `1` to denote no multiplication needed in return value
        req.addInt("times", 1);
        // Sends the request
        requestId = sendChainlinkRequest(req, _fee);
    }

    /**
     * @dev Receive the response in the form of `uint256`.
     */
    function fulfill(
        bytes32 _requestId,
        uint256 _data
    ) public recordChainlinkFulfillment(_requestId) {
        emit RequestData(_requestId, _data);
        data = _data;
    }

    /**
     * @dev Make withdrawal of LINK tokens from the contract.
     */
    function withdrawLink() public onlyOwner {
        LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
        require(
            link.transfer(msg.sender, link.balanceOf(address(this))),
            "Unable to transfer"
        );
    }
}
```

## Hardhat deployment

To see the full deployment code, check out the [repo](https://github.com/dtbuchholz/tutorial-onchain-reads-chainlink-ethereum). Here, we’ll highlight some actions that should take place from within a deploy script, which in the repo, can be executed with `npx hardhat run scripts/deploy.ts --network sepolia`:

- Set the `url` value, using `setRequestUrl`, to the Tableland gateway at [https://testnets.tableland.network/api/v1/query?unwrap=true&statement=select%20%2A%20from%20healthbot_11155111_1](https://testnets.tableland.network/api/v1/query?unwrap=true&statement=select%20%2A%20from%20healthbot_11155111_1)
- Set the `path` value, using `setRequestPath`, to `counter`.
- Fund the contract with `LINK`.

### Environment variables

First, make sure you have a `.env` file with the following variables:

```bash
# Account private key
ETHEREUM_SEPOLIA_PRIVATE_KEY=fixme
# Alchemy API key
ETHEREUM_SEPOLIA_API_KEY=fixme
# Etherscan API key (contract verification)
ETHERSCAN_API_KEY=fixme
```

### Script

This is what our deployment script looks like:

```typescript
import "@nomiclabs/hardhat-ethers";
import { ethers, network, deployment } from "hardhat";

async function main() {
  // Get the deploying account
  const [account] = await ethers.getSigners();
  console.log("\nDeploying TableState...");
  // Deploy the `TableState` contract
  const TableState = await ethers.getContractFactory("TableState", account);
  const tableState = await TableState.deploy(
    deployment.linkTokenAddress,
    deployment.oracleAddress,
    ethers.utils.toUtf8Bytes(deployment.jobId) // Must convert the string to `bytes32`
  );
  await tableState.deployed();
  console.log(`Contract 'TableState' deployed to: ${tableState.address}`);

  // Define the table in which Chainlink should make an API request to -- e.g., the `healthbot` table
  const { chainId } = await ethers.provider.getNetwork();
  const tableName = `healthbot_${chainId}_1`; // The `healthbot` table is always the first table minted, hence, the `1` suffix

  // Define the Tableland gateway URL to make a query at: SELECT * FROM healthbot_{chainId}_1
  const url = `https://testnets.tableland.network/api/v1/query?unwrap=true&statement=select%20%2A%20from%20${tableName}`;
  // Set the request `url` and `path` variables in the contract
  let tx = await tableState.setRequestUrl(url);
  await tx.wait();
  console.log(`URL set to: '${url}'`);
  const path = "counter";
  tx = await tableState.setRequestPath(path);
  await tx.wait();
  console.log(`Path set to: '${path}'`);

  // Fund the contract with LINK
  const linkContractAddr = deployment.linkTokenAddress; // Ethereum Sepolia LINK token address
  const contractAddr = tableState.address;
  const networkId = network.name;
  console.log(`Funding contract '${contractAddr}' on network '${networkId}'`);
  const LINK_TOKEN_ABI = [
    {
      inputs: [
        { internalType: "address", name: "recipient", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "transfer",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  // Specify 3 LINK tokens for funding
  const amount = ethers.utils.parseUnits("3.0");
  // Create connection to LINK token contract and initiate the transfer
  const linkTokenContract = new ethers.Contract(
    linkContractAddr,
    LINK_TOKEN_ABI,
    account
  );
  await linkTokenContract
    .transfer(contractAddr, amount)
    .then(function (transaction: any) {
      console.log(
        `Contract ${contractAddr} funded with 3 LINK. Transaction Hash: ${transaction.hash}`
      );
    });

  console.log(
    `\nBe sure to save contract address for 'TableState' in 'hardhat.config.ts':\n'${tableState.address}'\n`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

### Hardhat config

And note our `hardhat.config.ts` file, which includes the following:

```typescript
import * as dotenv from "dotenv";
import { HardhatUserConfig, extendEnvironment } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import "./tasks/index";
dotenv.config();

export const config: HardhatUserConfig = {
  solidity: "0.8.17",
  etherscan: {
    apiKey: {
      sepolia: process.env.ETHERSCAN_API_KEY || "",
    },
  },
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${
        process.env.ETHEREUM_SEPOLIA_API_KEY ?? ""
      }`,
      accounts:
        process.env.ETHEREUM_SEPOLIA_PRIVATE_KEY !== undefined
          ? [process.env.ETHEREUM_SEPOLIA_PRIVATE_KEY]
          : [],
    },
  },
  config: {
    args: {
      contractAddress: "", // IMPORTANT: Update this with your contract deployment address
      linkTokenAddress: "0x779877A7B0D9E8603169DdbD7836e478b4624789", // Ethereum Sepolia LINK token
      oracleAddress: "0x6090149792dAAeE9D1D568c9f9a6F6B46AA29eFD", // Any API node operator address
      jobId: "ca98366cc7314957b8c012c72f05aeeb",
    },
  },
};

interface ContractConfig {
  contractAddress: string;
  linkTokenAddress: string;
  oracleAddress: string;
  jobId: string;
}

interface ContractNetworkConfig {
  args: ContractConfig;
}

declare module "hardhat/types/config" {
  // eslint-disable-next-line no-unused-vars
  interface HardhatUserConfig {
    config: ContractNetworkConfig;
  }
}

declare module "hardhat/types/runtime" {
  // eslint-disable-next-line no-unused-vars
  interface HardhatRuntimeEnvironment {
    deployment: ContractConfig;
  }
}

extendEnvironment((hre: HardhatRuntimeEnvironment) => {
  // Get configs for user-selected network
  const config = hre.userConfig.config;
  hre.deployment = config.args;
});

export default config;
```

### Log

Once you run the deployment script via `npm run deploy`, you should see the following output:

```sh
Deploying TableState...
Contract 'TableState' deployed to: 0x22352F3c7765D389f2491108942de357f799Ec4F
URL set to: 'https://testnets.tableland.network/api/v1/query?unwrap=true&statement=select%20%2A%20from%20healthbot_11155111_1'
Path set to: 'counter'
Funding contract '0x22352F3c7765D389f2491108942de357f799Ec4F' on network 'sepolia'
Contract 0x22352F3c7765D389f2491108942de357f799Ec4F funded with 3 LINK. Transaction Hash: 0xa7586c1b880c6f27746a7144aaeaa3c49131e3484e54d45a8c6c48da1809af19

Run the first two tasks to request and read table data:

---------------------------------

Request new data at the URL + path:
npx hardhat request-data --network sepolia

Read the data from the contract:
npx hardhat read-data --network sepolia

---------------------------------

Be sure to save contract address for 'TableState' in 'hardhat.config.ts':
'0x22352F3c7765D389f2491108942de357f799Ec4F'
```

## Requesting & reading data

Now that the contract is deployed, the value should be saved in the `hardhat.config.ts` file. Then, a number of tasks are also included in the repo, including:

1. Initiate a request for offchain data to be written to the contract: `npx hardhat request-data --network sepolia`

```sh
Calling contract '0x22352F3c7765D389f2491108942de357f799Ec4F' on network 'sepolia'
Contract '0x22352F3c7765D389f2491108942de357f799Ec4F' external data request successfully called at tx '0xa2c3c322b8e1ff22107937da12d343ee09ad516cc1986d6aaf657964f44e138f'.
Request ID: '0x187ef2b26de64a03e5387936474562ac3dfeaa433d1c89f699d533994248ca65'
```

2. Read the offchain data that’s been written to the contract: `npx hardhat read-data --network sepolia`

```sh
Reading data from contract '0x22352F3c7765D389f2491108942de357f799Ec4F' on network 'sepolia'
Data: 4998
```

Other helper tasks, like setting the URL, path, withdrawing LINK from the contract, etc., are also available. For example, you can, basically, take the code and deploy it without making any changes, and then set custom URLs and paths for the Any API query. To access these, simply run `npx hardhat <task> --network <network>` on the target network (set up in your `hardhat.config.ts`), along with the specified parameters, where applicable. Tasks make it easy to interact with the contract using the command line.

## Next steps

From there, the possibilities are endless! This is a _very_ simple example of a single word response, but it should provide enough context to get started with requesting table state onchain. You can see the final deployed contract: [here](https://sepolia.etherscan.io/address/0x22352F3c7765D389f2491108942de357f799Ec4F).
