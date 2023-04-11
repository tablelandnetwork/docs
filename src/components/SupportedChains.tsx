import React from "react";
import Link from "@docusaurus/Link";
import { helpers } from "@tableland/sdk";

// Return the block explorer link for a given chain and contract while using a
// "testnets" or "mainnets" flag to determine which explorer to use.
function getChainExplorer(
  chain: string,
  location: string,
  contract: string
): string {
  switch (chain) {
    case "mainnet":
    case "homestead":
      return `https://etherscan.io/address/${contract}`;
    case "goerli":
      return `https://goerli.etherscan.io/address/${contract}`;
    case "arbitrum":
      return `https://arbiscan.io/address/${contract}`;
    case "arbitrum-nova":
      return `https://nova.arbiscan.io/address/${contract}`;
    case "arbitrum-goerli":
      return `https://goerli.arbiscan.io/address/${contract}`;
    case "optimism":
      return `https://optimistic.etherscan.io/address/${contract}`;
    case "optimism-goerli":
      return `https://goerli-optimism.etherscan.io/address/${contract}`;
    case "matic":
      return `https://polygonscan.com/address/${contract}`;
    case "maticmum":
      return `https://mumbai.polygonscan.com/address/${contract}`;
    default:
      return "";
  }
}

export interface ChainFormatted {
  location: string;
  chainNameFormatted: string;
  chainName: string;
  chainId: number;
  contractAddress: string;
  blockExplorer: string;
}

// Create an object of Tableland supported chains, along with some extra data
// for the "pretty" name and block explorer link.
export const supportedChains = (): ChainFormatted[] => {
  const chains: any = helpers.supportedChains;
  // Remove chain names for `local-host`, `homestead`, `optimism-goerli-staging`
  const remove = [`localhost`, `homestead`, `optimism-goerli-staging`];
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
      baseUrl: c.baseUrl,
    };
    // Fixes for where a chain's ethers name (delimited by `-`) does not align
    // to how it should be "pretty" displayed (e.g., `matic` should be `Polygon`)
    switch (format.chainName) {
      case "local-tableland":
        format.location = "local";
        break;
      case "mainnet":
        format.chainNameFormatted = "ethereum";
        break;
      case "arbitrum":
        format.chainNameFormatted = "arbitrum one";
        break;
      case "arbitrum-nova":
        format.chainNameFormatted = "arbitrum nova";
        break;
      case "goerli":
        format.chainNameFormatted = "ethereum goerli";
        break;
      case "matic":
        format.chainNameFormatted = "polygon";
        break;
      case "maticmum":
        format.chainNameFormatted = "polygon mumbai";
        break;
      case "local-tableland":
        format.location = "local";
        break;
      default:
        break;
    }
    format.blockExplorer = getChainExplorer(
      format.chainName,
      format.location,
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
