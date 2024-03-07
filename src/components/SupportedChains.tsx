import React from "react";
import Link from "@docusaurus/Link";
import { helpers } from "@tableland/sdk";
import Heading from "@theme/Heading";

/**
 * For every chain, the data is extended from the SDK's `supportedChains` object
 *
 * @param location - The environment of the chain (mainnet or testnet)
 * @param chainNameFormatted - The formatted chain name (e.g., polygon vs. matic)
 * @param chainName - The ethers name of the chain, with dashes
 * @param chainId - The chain ID
 * @param contractAddress - The Tableland contract address on the chain
 * @param blockExplorer - The block explorer link for the chain
 * @param bridge - The bridge link for the chain, if applicable
 * @param rpcUrl - The RPC URL for the chain (a link to chainlist.org)
 * @param baseUrl - The Tableland validator API URL (testnet, mainnet, or local)
 * @param symbol - The currency symbol for the chain
 * @param avgBlockTime - The average block time of the chain
 * @param blockDepth - The block depth of the chain for SQL materialization
 * @param sqlMaterializationTime - The SQL materialization time of the chain
 * @param faucet - The faucet link for the chain, if applicable
 */
export interface ChainFormatted {
  location: string;
  chainNameFormatted: string;
  chainName: string;
  chainId: number;
  contractAddress: string;
  blockExplorer: string;
  bridge: string;
  rpcUrl: string;
  baseUrl: string;
  symbol: string;
  avgBlockTime: string;
  blockDepth: string;
  sqlMaterializationTime: string;
  faucet: string;
}

// Return the block explorer link for a given chain and contract while using a
// "testnets" or "mainnets" flag to determine which explorer to use.
function getChainExplorer(chain: string, contract: string): string {
  switch (chain) {
    case "mainnet":
    case "homestead":
      return `https://etherscan.io/address/${contract}`;
    case "sepolia":
      return `https://sepolia.etherscan.io/address/${contract}`;
    case "arbitrum":
      return `https://arbiscan.io/address/${contract}`;
    case "arbitrum-nova":
      return `https://nova.arbiscan.io/address/${contract}`;
    case "arbitrum-sepolia":
      return `https://sepolia.arbiscan.io/address/${contract}`;
    case "filecoin":
      return `https://filfox.info/address/${contract}`;
    case "filecoin-calibration":
      return `https://calibration.filfox.info/en/address/${contract}`;
    case "optimism":
      return `https://optimistic.etherscan.io/address/${contract}`;
    case "optimism-sepolia":
      return `https://sepolia-optimism.etherscan.io/address/${contract}`;
    case "matic":
      return `https://polygonscan.com/address/${contract}`;
    case "maticmum":
      return `https://mumbai.polygonscan.com/address/${contract}`;
    default:
      return "";
  }
}

// Create an object of Tableland supported chains, along with some extra data
// for the "pretty" name and block explorer link.
export const supportedChains = (): ChainFormatted[] => {
  const chains: any = helpers.supportedChains;
  // Remove chain names for `localhost` & `homestead`
  const remove = [`localhost`, `homestead`];
  const filteredChains = Object.fromEntries(
    Object.entries(chains).filter(([chain]) => !remove.includes(chain))
  );
  // Format data for render
  const formatChains = Object.keys(filteredChains).map((chain) => {
    const c: any = filteredChains[chain];
    const format = {
      location: helpers.isTestnet(c.chainName) ? "testnet" : "mainnet",
      chainNameFormatted: c.chainName.replace(/-/g, " "),
      chainName: c.chainName,
      chainId: c.chainId,
      contractAddress: c.contractAddress,
      blockExplorer: "",
      bridge: "",
      rpcUrl: `https://chainlist.org/chain/${c.chainId}`,
      baseUrl: c.baseUrl,
      symbol: "",
      avgBlockTime: "", // in seconds
      blockDepth: "",
      sqlMaterializationTime: "", // in seconds
      faucet: "",
    };
    // Custom fields per chain. Also, fixes for where a chain's ethers name
    // (delimited by `-`) does not align to how it should be "pretty" displayed
    // (e.g., `matic` should be `Polygon`)
    switch (format.chainName) {
      case "local-tableland":
        format.location = "local-only nodes";
        format.symbol = "ETH";
        format.avgBlockTime = "1-2";
        format.blockDepth = "0";
        format.sqlMaterializationTime = "2-3";
        format.rpcUrl = "http://localhost:8545";
        break;
      case "mainnet":
        format.chainNameFormatted = "ethereum";
        format.symbol = "ETH";
        format.avgBlockTime = "13.5";
        format.blockDepth = "1";
        format.sqlMaterializationTime = "30-40";
        break;
      case "arbitrum":
        format.chainNameFormatted = "arbitrum one";
        format.symbol = "ETH";
        format.avgBlockTime = "2";
        format.blockDepth = "0";
        format.sqlMaterializationTime = "<5";
        format.bridge = "https://bridge.arbitrum.io/";
        break;
      case "arbitrum-nova":
        format.chainNameFormatted = "arbitrum nova";
        format.symbol = "ETH";
        format.avgBlockTime = "2";
        format.blockDepth = "0";
        format.sqlMaterializationTime = "<5";
        format.bridge = "https://bridge.arbitrum.io/?l2ChainId=42170";
        break;
      case "arbitrum-sepolia":
        format.chainNameFormatted = "arbitrum sepolia";
        format.symbol = "ETH";
        format.avgBlockTime = "2";
        format.blockDepth = "0";
        format.sqlMaterializationTime = "<5";
        format.bridge = "https://bridge.arbitrum.io/?l2ChainId=421614";
        format.faucet = "https://www.alchemy.com/faucets/arbitrum-sepolia";
        break;
      case "sepolia":
        format.chainNameFormatted = "ethereum sepolia";
        format.symbol = "ETH";
        format.avgBlockTime = "13.5";
        format.blockDepth = "1";
        format.sqlMaterializationTime = "30-40";
        format.faucet = "https://www.alchemy.com/faucets/ethereum-sepolia";
        break;
      case "filecoin":
        format.symbol = "FIL";
        format.avgBlockTime = "30";
        format.blockDepth = "5";
        format.sqlMaterializationTime = "180-240";
        break;
      case "filecoin-calibration":
        format.chainNameFormatted = "filecoin calibration";
        format.location = "testnet";
        format.symbol = "tFIL";
        format.avgBlockTime = "30";
        format.blockDepth = "5";
        format.sqlMaterializationTime = "180-240";
        format.faucet = "https://faucet.calibnet.chainsafe-fil.io/funds.html";
        break;
      case "optimism":
        format.symbol = "ETH";
        format.avgBlockTime = "2";
        format.blockDepth = "0";
        format.sqlMaterializationTime = "2";
        format.bridge = "https://app.optimism.io/bridge";
      case "optimism-sepolia":
        format.symbol = "ETH";
        format.avgBlockTime = "2";
        format.blockDepth = "0";
        format.sqlMaterializationTime = "2";
        format.bridge = "https://app.optimism.io/bridge";
        format.faucet = "https://www.alchemy.com/faucets/optimism-sepolia";
        break;
      case "matic":
        format.chainNameFormatted = "polygon";
        format.symbol = "MATIC";
        format.avgBlockTime = "2-3";
        format.blockDepth = "1";
        format.sqlMaterializationTime = "<10";
        format.bridge = "https://portal.polygon.technology/bridge";
        break;
      case "maticmum":
        format.chainNameFormatted = "polygon mumbai";
        format.symbol = "MATIC";
        format.avgBlockTime = "2-3";
        format.blockDepth = "1";
        format.sqlMaterializationTime = "<10";
        format.faucet = "https://www.alchemy.com/faucets/polygon-mumbai";
        break;
      default:
        break;
    }
    format.blockExplorer = getChainExplorer(
      format.chainName,
      format.contractAddress
    );
    return format;
  });
  return formatChains;
};

// Get info about a specific chain, passing the `ChainFormatted` key.
export function getChainInfo(chain: string, info: any): any {
  const chains = supportedChains();
  const c: any = chains.find((x) => x.chainName === chain);
  return c ? c[info] : undefined;
}

// Get a single piece of chain related data by passing the `chainName` and the
// type of info (`name`, `chainId`, etc.).
export const ChainInfo = ({
  chain,
  info,
}: {
  chain: string;
  info: string;
}): JSX.Element => {
  const data = getChainInfo(chain, info);
  return data ? (
    <>
      <span>{data}</span>
    </>
  ) : (
    <></>
  );
};

// A simple unordered list of mainnet chains by "pretty" name.
export function ChainsList({
  type,
  format,
  info,
}: {
  type: string;
  format: string;
  info: string;
}): JSX.Element {
  let chains: ChainFormatted[];
  // Return either testnet only, mainnet only, or both mainnet & testnet chains.
  if (type === "testnets") {
    chains = supportedChains().filter((chain) => chain.location === "testnet");
  } else if (type === "mainnets") {
    chains = supportedChains().filter((chain) => chain.location === "mainnet");
  } else if (type === "all") {
    chains = supportedChains();
  } else {
    chains = supportedChains().filter(
      (chain) => chain.location === "mainnet" || chain.location === "testnet"
    );
  }
  // Return either a bulleted list or a string (formatted grammatically
  // correct, with Oxford commas & the word "and").
  return format === "list" ? (
    <>
      <ul>
        {Object.keys(chains).map((chain: any, i) => {
          if (info === "ethersName") {
            return (
              <li key={i}>
                <span style={{ textTransform: "capitalize" }}>
                  {chains[chain].chainNameFormatted}{" "}
                </span>
                {`=>`} <code>{chains[chain].chainName}</code>
              </li>
            );
          } else if (info === "chainId") {
            return (
              <li key={i}>
                <span style={{ textTransform: "capitalize" }}>
                  {chains[chain].chainNameFormatted}{" "}
                </span>
                {`=>`} <code>{chains[chain].chainId}</code>
              </li>
            );
          } else
            return (
              <li key={i} style={{ textTransform: "capitalize" }}>
                {chains[chain].chainNameFormatted}
              </li>
            );
        })}
      </ul>
    </>
  ) : (
    <>
      {chains
        .map((chain) =>
          chain.chainNameFormatted
            .toLowerCase()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
        )
        .join(", ")
        .replace(/, ([^,]*)$/, ", and $1")}
    </>
  );
}

export function SupportedChains(): JSX.Element {
  const chains = supportedChains();
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Chain</th>
            <th>Environment</th>
            <th>Chain ID</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(chains).map((chain: any, i) => (
            <tr key={i}>
              <td style={{ textTransform: "capitalize" }}>
                {chains[chain].chainNameFormatted}
              </td>
              <td style={{ textTransform: "capitalize" }}>
                {chains[chain].location}
              </td>
              <td>{chains[chain].chainId}</td>
              <td style={{ fontWeight: "var(--ifm-font-weight-semibold)" }}>
                {chains[chain].location === "local" ? (
                  <code>{chains[chain].contractAddress}</code>
                ) : (
                  <code>
                    <Link to={chains[chain].blockExplorer}>
                      {chains[chain].contractAddress}
                    </Link>
                  </code>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export function SupportedChainIds(): JSX.Element {
  const chains = supportedChains();
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Chain</th>
            <th>Environment</th>
            <th>Chain ID</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(chains).map((chain: any, i) => (
            <tr key={i}>
              <td style={{ textTransform: "capitalize" }}>
                {chains[chain].chainNameFormatted}
              </td>
              <td style={{ textTransform: "capitalize" }}>
                {chains[chain].location}
              </td>
              <td>{chains[chain].chainId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export function ChainSection({
  chainName,
}: {
  chainName: string;
}): JSX.Element {
  const chain = supportedChains().filter((c) => c.chainName === chainName)[0];
  return (
    <>
      <>
        <Heading as="h3" title={chain.chainName} id={chain.chainName}>
          <span style={{ textTransform: "capitalize" }}>
            {chain.chainNameFormatted}
          </span>{" "}
          ({chain.location})
        </Heading>
        <ul key={chain.chainId}>
          <li>
            <b>Chain ID:</b> <code>{chain.chainId}</code>
          </li>
          <li>
            <b>Contract address:</b>{" "}
            {chain.chainId !== 31337 ? (
              <Link to={chain.blockExplorer}>
                <code>{chain.contractAddress}</code>
              </Link>
            ) : (
              <code>{chain.contractAddress}</code>
            )}
          </li>
          <li>
            <b>Network name:</b> <code>{chain.chainName}</code> (used for
            Hardhat or ethersjs)
          </li>
          <li>
            <b>Tableland validator API:</b> <code>{chain.baseUrl}</code>
          </li>
          <li>
            <b>RPC URLs:</b>{" "}
            {chain.chainId !== 31337 ? (
              <Link to={chain.rpcUrl}>{chain.rpcUrl}</Link>
            ) : (
              <code>{chain.rpcUrl}</code>
            )}
          </li>
          <li>
            <b>Block time:</b> {chain.avgBlockTime} seconds
          </li>
          <li>
            <b>Block depth:</b> {chain.blockDepth}
          </li>
          <li>
            <b>SQL materialization time:</b> {chain.sqlMaterializationTime}{" "}
            seconds
          </li>
          <li>
            <b>Symbol:</b> {chain.symbol}
          </li>
          {chain.bridge !== "" && (
            <li>
              <b>Bridge:</b> <Link to={chain.bridge}>{chain.bridge}</Link>
            </li>
          )}
          {chain.faucet !== "" && (
            <li>
              <b>Faucet:</b> <Link to={chain.faucet}>{chain.faucet}</Link>
            </li>
          )}
        </ul>
      </>
    </>
  );
}
