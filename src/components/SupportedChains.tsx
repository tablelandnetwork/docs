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
    case "ethereum":
      return location === "testnet"
        ? `https://goerli.etherscan.io/address/${contract}`
        : `https://etherscan.io/address/${contract}`;
    case "arbitrum":
      return location === "testnet"
        ? `https://goerli.arbiscan.io/address/${contract}`
        : `https://arbiscan.io/address/${contract}`;
    case "optimism":
      return location === "testnet"
        ? `https://blockscout.com/optimism/goerli/address/${contract}`
        : `https://optimistic.etherscan.io/address/${contract}`;
    case "polygon":
      return location === "testnet"
        ? `https://mumbai.polygonscan.com/address/${contract}`
        : `https://polygonscan.com/address/${contract}`;
    default:
      return "";
  }
}

interface FormattedChains {
  location: string;
  chainNameFormatted: string;
  chainName: string;
  chainId: number;
  contractAddress: string;
  blockExplorer: string;
}

// Create an object of Tableland supported chains, along with some extra data
// for the "pretty" name and block explorer link.
export const supportedChains = (): FormattedChains[] => {
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
    if (format.chainName === "local-tableland") format.location = "local";
    if (format.chainName === "mainnet") format.chainNameFormatted = "ethereum";
    if (format.chainName === "goerli")
      format.chainNameFormatted = "ethereum goerli";
    if (format.chainName === "matic") format.chainNameFormatted = "polygon";
    if (format.chainName === "maticmum")
      format.chainNameFormatted = "polygon mumbai";
    format.blockExplorer = getChainExplorer(
      format.chainNameFormatted.split(" ")[0],
      format.location,
      format.contractAddress
    );
    return format;
  });
  return formatChains;
};

// Get info about a specific chain, passing the `FormattedChains` key.
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
  let chains: FormattedChains[];
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
