---
title: On-Chain reads with Chainlink + Arbitrum
sidebar_label: On-chain reads with Chainlink
description: Use Chainlink’s node operator network to get table state back on-chain to the Arbitrum network.
keywords:
  - chainlink
  - dynamic nft
---

The following walks through how to query off-chain table state and write it back on-chain. It walks through how to do so using Chainlink’s [Any API](https://docs.chain.link/any-api/api-reference/). Note that this is possible with all networks in which Tableland is deployed on, but be sure to use the correct contract address! This example _hardcodes_ values with [Arbitrum Goerli](https://docs.chain.link/resources/link-token-contracts/#arbitrum-goerli-testnet) for simplicity sake.

## Synopsis

We’ll be using the Chainlink [Any API](https://docs.chain.link/getting-started/advanced-tutorial/) to read data from the Tableland network and write it back on-chain. It will use the "single word response" [GET method](https://docs.chain.link/any-api/get-request/examples/single-word-response/) to retrieve a single unsigned integer value from Tableland ([here](https://testnets.tableland.network/query?unwrap=true&s=select%20%2A%20from%20healthbot_11155111_1)) and write it back on-chain.

Recall that writing data to Tableland happens with on-chain actions, whereas reading \***\*from\*\*** the Tableland network occurs via an off-chain gateway query. If a developer wants to query for data and make some on-chain action based on the result, they’ll need to use an oracle to retrieve the data.

### Repo

To see the final source code, check out the following repo, which removes some of the hardcoding and makes it easier to work with:

- [https://github.com/dtbuchholz/tutorial-on-chain-reads-chainlink-arbitrum](https://github.com/dtbuchholz/tutorial-on-chain-reads-chainlink-arbitrum)

### Node Operators

First, a brief on Chainlink node operators. A node operator is a specific node that deploys an on-chain Chainlink [Operator](https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.7/Operator.sol) contract, watches for interactions with that contract, and then responds appropriately (e.g., hears a query for data, then writes data on-chain). Each node can implement its own customizations, such as data transformation. Plus, each node has a _unique_ `jobId` that it runs, which tells the node which job it should perform (e.g., GET uint256 single word).

For example, the Chainlink documentation notes an [`addInt`](https://docs.chain.link/any-api/api-reference/#addint) method (used with the single uint256 word) in which you can pass the value `times` to indicate that an API response’s value should be multiplied ("times") by a certain value. This is useful if a response. Alternatively, a node operator named [Translucent](https://translucent.link/products/get-uint256/) decided to implement the keyword `multiply` instead of `times` as it provided greater clarity to what the operation meant. Point being, beware that each node operator **\***could**\*** have certain transformations that are unique. Thus, you build a request in your contract that looks something like the following:

```tsx
// The URL to perform the GET request on
req.add("get", url);
// A comma-separated path to extract the desired data from the API response
req.add("path", path);
// Required parameter, set to `1` to denote no multiplication needed in return value
req.addInt("multiply", 1); // Or, a node may choose to implement "times" here, which is the Chainlink default
```

This example uses a custom node operator, so be aware that a Chainlink-managed (or other operator) node may have different values (`times` vs. `multiply`).

### Chain support

By default, Chainlink operated Any API nodes do not offer support for the Arbitrum Goerli testnet; they only support mainnet.

Instead, we’ll be using a node operator named [Translucent](https://translucent.link/) and their "Get Uint256" job with the following information for **Arbitrum Goerli**:

- Contract address: [`0x2362A262148518Ce69600Cc5a6032aC8391233f5`](https://testnet.arbiscan.io/address/0x2362A262148518Ce69600Cc5a6032aC8391233f5)
- Job ID: `7599d3c8f31e4ce78ad2b790cbcfc673`
- LINK token address: `0xd14838A68E8AFBAdE5efb411d5871ea0011AFd28`

For a full list of Chainlink-managed contracts, see the following references in the Chainlink docs:

- Any API contracts & job IDs: [here](https://docs.chain.link/any-api/testnet-oracles/)
- LINK token addresses: [here](https://docs.chain.link/resources/link-token-contracts/#arbitrum-goerli-testnet)

Similarly, see the other options listed in the [Translucent docs](https://translucent.link/products/get-uint256/).

## Setup

### Testnet LINK

Arbtirum is a rollup and requires you to first get test LINK tokens from Ethereum Goerli and the _bridge_ them to Arbitrum Goerli:

1. Request testnet LINK from [https://faucets.chain.link/](https://faucets.chain.link/).
2. Move the LINK from Ethereum to Arbitrum at [https://bridge.arbitrum.io/](https://bridge.arbitrum.io/).

   ![Arbitrum Goerli](@site/static/assets/tutorials/table-reads-chainlink/arb-goerli.png)

   1. In this step, you’ll need to specify the LINK token address on Ethereum Goerli, which is `0x326C977E6efc84E512bB9C30f76E30c160eD06FB`, in the _Select Token_ area (click on the token name next to the _Enter amount_)

As part of the deployment flow, we’ll be depositing LINK into the contract, which will pay for API requests fulfilled by the Chainlink node operator. The default value per request is typically `0.1 LINK`.

### Oracle & job values

In this example, the oracle and job ID are for the node operator Translucent; the LINK token address is the ERC20 LINK token on Arbitrum Goerli:

```tsx
/**
 * @dev Initialize the LINK token and target oracle
 *
 * Arbitrum Goerli Testnet details:
 * LINK Token: 0xf97f4df75117a78c1A5a0DBb814Af92458539FB4
 * Oracle: 0x2362A262148518Ce69600Cc5a6032aC8391233f5 (Translucent)
 * _jobId: 7599d3c8f31e4ce78ad2b790cbcfc673 (defined by Translucent at: https://translucent.link/products/get-uint256)
 *
 */
constructor() ConfirmedOwner(msg.sender) {
    setChainlinkToken(0xf97f4df75117a78c1A5a0DBb814Af92458539FB4);
    setChainlinkOracle(0x2362A262148518Ce69600Cc5a6032aC8391233f5);
    _jobId = "7599d3c8f31e4ce78ad2b790cbcfc673";
    _fee = (1 * LINK_DIVISIBILITY) / 10; // This is 0.1 LINK, where `LINK_DIVISIBILITY` is 10**18
}
```

### Tableland request

The following URL will be used for requesting Tableland state on-chain:

- _[https://testnets.tableland.network/query?unwrap=true&s=select%20%2A%20from%20healthbot_421613_1](https://testnets.tableland.network/query?unwrap=true&s=select%20%2A%20from%20healthbot_421613_1)_

It is the Tableland `healthbot` table deployed on the Arbitrum Goerli testnet, which simply increments a single `counter` key by an integer value. For mainnet chains, be sure to use the `tableland.network` gateway over the `testnets.tableland.network` gateway.

The API response should look like the following:

```json
{
  "counter": 68935
}
```

Hence, the `path` referenced below is this single `"counter"` value. If there was nested JSON data, then that would simply be a longer comma separated value (e.g., `{ counter: { data: 68935 } }` would be represented with a path of `"counter,data"`).

## Smart Contract

### Variables

You’ll need to create a contract that inherits from the following Chainlink contracts: [`ChainlinkClient`](https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.6/ChainlinkClient.sol) and [`ConfirmedOwner`](https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/ConfirmedOwner.sol). You should also set up some of the basic variables needed to build the request. Hardcoding this information and the general setup is **not** necessarily the recommended way to do this but used for demonstration purposes.

A few key points, and note that the majority of these are set in an example deployment script, provided toward the end of this page:

- `data` ⇒ The off-chain `data` returned by Chainlink from the Tableland network (i.e., table state get written on-chain by the oracle).
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
        setChainlinkToken(0xf97f4df75117a78c1A5a0DBb814Af92458539FB4);
        setChainlinkOracle(0x2362A262148518Ce69600Cc5a6032aC8391233f5);
        _jobId = "ca98366cc7314957b8c012c72f05aeeb";
        _fee = (1 * LINK_DIVISIBILITY) / 10;
    }
}
```

### Helper methods

A number of helper methods are included for setting the request URL, path, fee, and oracle:

- `setRequestUrl` ⇒ Set the `url` to some HTTPS URL (e.g., the one noted above) for the Tableland `healthbot` table).
- setRequestPath ⇒ Set the `path` to a single word response that maps to a `uint256`.
- `setOracle` ⇒ Set the oracle contract address by which to make the off-chain request.
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

With oracles, there’s a "request-receive" pattern. Make an on-chain call to request off-chain data, and receive the result via the oracle. This is what will enable table state to be brought back into the contact:

- `requestData` ⇒ Create a Chainlink request to retrieve API response, which include:
  - `req.add("get", url)` ⇒ Specify the request type and the URL, where `url` is a storage variable in this example.
  - `req.add("path", path)` ⇒ Specify the path to the data in the API response (e.g., `"counter"` is the key of the example URL).
  - `req.addInt("multiply", 1)` ⇒ (Required) Specify how to transform the response data, which can be useful when working with non-integer response values on-chain.
    - Note: `multiply` may be replaced with `times` if using a Chainlink-managed node; `multiply` is defined by the node operator Translucent.
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
  req.addInt("multiply", 1); // Or, a node may choose to implement "times" here, which is the Chainlink default
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

Namely, call `requestData` to make an off-chain request and retrieve table state written on-chain via `fulfill`, which emits the request event.

### Full contract code

Putting this all together, the following is the full contract:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

contract TableState is ChainlinkClient, ConfirmedOwner {
    using Chainlink for Chainlink.Request;

    // The off-chain `data` returned by Chainlink from the Tableland network
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
     * @dev Initialize the LINK token and target oracle.
     *
     * Arbitrum Goerli Testnet details:
     * LINK Token: 0xf97f4df75117a78c1A5a0DBb814Af92458539FB4
     * Oracle: 0x2362A262148518Ce69600Cc5a6032aC8391233f5 (Translucent)
     * _jobId: 7599d3c8f31e4ce78ad2b790cbcfc673 (defined by Translucent at: https://translucent.link/products/get-uint256)
     */
    constructor() ConfirmedOwner(msg.sender) {
        setChainlinkToken(0xf97f4df75117a78c1A5a0DBb814Af92458539FB4);
        setChainlinkOracle(0x2362A262148518Ce69600Cc5a6032aC8391233f5);
        _jobId = "7599d3c8f31e4ce78ad2b790cbcfc673";
        _fee = (1 * LINK_DIVISIBILITY) / 10;
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
     * @dev Set the oracle to make the off-chain request.
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
        req.addInt("multiply", 1); // Or, a node may choose to implement "times" here, which is the Chainlink default
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

## Deployment

To see the full deployment code, check out the [repo](https://github.com/dtbuchholz/tutorial-on-chain-reads-chainlink-arbitrum). Here, we’ll highlight some actions that should take place from within a deploy script:

- Set the `url` value, using `setRequestUrl`, to the Tableland gateway at [https://testnets.tableland.network/query?unwrap=true&s=select%20%2A%20from%20healthbot_421613_1](https://testnets.tableland.network/query?unwrap=true&s=select%20%2A%20from%20healthbot_421613_1)
- Set the `path` value, using `setRequestPath`, to `counter`
- Fund the contract with `LINK`.

### Tasks

A number of tasks are also included in the sample repo, including:

- Initiate a request for off-chain data (`request-data`).
- Read the off-chain data that’s written to the contract (`read-data`).
- Other helper tasks, like setting the URL, path, etc.

To access these, simply run `npx hardhat <task>` on the target network, along with the specified parameters, where applicable. Tasks make it easy to interact with the contract using the command line.

## Next steps

From there, the possibilities are endless! This is a _very_ simple example of a single word response, but it should provide enough context to get started with requesting table state on-chain.
