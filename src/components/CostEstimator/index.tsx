import React, { useState } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import styles from "./index.module.css";
import { supportedChains, ChainFormatted } from "../SupportedChains";

interface ChainCost extends ChainFormatted {
  createSize: number;
  cryptoToken: string;
  createCostCrypto: number;
  createCostCryptoPerMb: number;
  createCostUsd: number;
  createCostUsdPerMb: number;
  writeSize: number;
  writeCostCrypto: number;
  writeCostCryptoPerMb: number;
  writeCostUsd: number;
  writeCostUsdPerMb: number;
}

// Retrieve chain price costs
function getChainCosts(token: string): number {
  // Hardcoded crypto prices
  const ethPrice = 1600;
  const maticPrice = 1.1;
  const filPrice = 3.54;

  switch (token) {
    case "ETH":
      return ethPrice;
    case "MATIC":
      return maticPrice;
    case "FIL":
      return filPrice;
    default:
      return 0;
  }
}

// Retrieve chain cost approximations
function chainCostInfo(): ChainCost[] {
  let chains = supportedChains().filter(
    (chain) => chain.location === "mainnet"
  ) as ChainCost[];
  const ethPrice = getChainCosts("ETH");
  const maticPrice = getChainCosts("MATIC");
  const filPrice = getChainCosts("FIL");

  chains.forEach((chain) => {
    switch (chain.chainName) {
      case "mainnet":
        chain.createSize = 133;
        chain.cryptoToken = "ETH";
        chain.createCostCrypto = 0.001349631739;
        chain.createCostCryptoPerMb =
          chain.createCostCrypto / (chain.createSize / 1000000);
        chain.createCostUsd = chain.createCostCrypto * ethPrice;
        chain.createCostUsdPerMb = chain.createCostCryptoPerMb * ethPrice;
        chain.writeSize = 189;
        chain.writeCostCrypto = 0.00108587158;
        chain.writeCostCryptoPerMb =
          chain.writeCostCrypto / (chain.writeSize / 1000000);
        chain.writeCostUsd = chain.writeCostCrypto * ethPrice;
        chain.writeCostUsdPerMb = chain.writeCostCryptoPerMb * ethPrice;
        break;
      case "optimism":
        chain.createSize = 134;
        chain.cryptoToken = "ETH";
        chain.createCostCrypto = 0.0001608510867;
        chain.createCostCryptoPerMb =
          chain.createCostCrypto / (chain.createSize / 1000000);
        chain.createCostUsd = chain.createCostCrypto * ethPrice;
        chain.createCostUsdPerMb = chain.createCostCryptoPerMb * ethPrice;
        chain.writeSize = 190;
        chain.writeCostCrypto = 0.0001828754361;
        chain.writeCostCryptoPerMb =
          chain.writeCostCrypto / (chain.writeSize / 1000000);
        chain.writeCostUsd = chain.writeCostCrypto * ethPrice;
        chain.writeCostUsdPerMb = chain.writeCostCryptoPerMb * ethPrice;
        break;
      case "arbitrum":
        chain.createSize = 137;
        chain.cryptoToken = "ETH";
        chain.createCostCrypto = 0.0000743562;
        chain.createCostCryptoPerMb =
          chain.createCostCrypto / (chain.createSize / 1000000);
        chain.createCostUsd = chain.createCostCrypto * ethPrice;
        chain.createCostUsdPerMb = chain.createCostCryptoPerMb * ethPrice;
        chain.writeSize = 193;
        chain.writeCostCrypto = 0.0000891754;
        chain.writeCostCryptoPerMb =
          chain.writeCostCrypto / (chain.writeSize / 1000000);
        chain.writeCostUsd = chain.writeCostCrypto * ethPrice;
        chain.writeCostUsdPerMb = chain.writeCostCryptoPerMb * ethPrice;
        break;
      case "arbitrum-nova":
        chain.createSize = 137;
        chain.cryptoToken = "ETH";
        chain.createCostCrypto = 0.00000106783;
        chain.createCostCryptoPerMb =
          chain.createCostCrypto / (chain.createSize / 1000000);
        chain.createCostUsd = chain.createCostCrypto * ethPrice;
        chain.createCostUsdPerMb = chain.createCostCryptoPerMb * ethPrice;
        chain.writeSize = 192;
        chain.writeCostCrypto = 0.00000095441;
        chain.writeCostCryptoPerMb =
          chain.writeCostCrypto / (chain.writeSize / 1000000);
        chain.writeCostUsd = chain.writeCostCrypto * ethPrice;
        chain.writeCostUsdPerMb = chain.writeCostCryptoPerMb * ethPrice;
        break;
      case "matic":
        chain.createSize = 135;
        chain.cryptoToken = "MATIC";
        chain.createCostCrypto = 0.008319063873;
        chain.createCostCryptoPerMb =
          chain.createCostCrypto / (chain.createSize / 1000000);
        chain.createCostUsd = chain.createCostCrypto * maticPrice;
        chain.createCostUsdPerMb = chain.createCostCryptoPerMb * maticPrice;
        chain.writeSize = 191;
        chain.writeCostCrypto = 0.004409298024;
        chain.writeCostCryptoPerMb =
          chain.writeCostCrypto / (chain.writeSize / 1000000);
        chain.writeCostUsd = chain.writeCostCrypto * maticPrice;
        chain.writeCostUsdPerMb = chain.writeCostCryptoPerMb * maticPrice;
        break;
      case "filecoin":
        chain.createSize = 133;
        chain.cryptoToken = "FIL";
        chain.createCostCrypto = 0.040647397496115186;
        chain.createCostCryptoPerMb =
          chain.createCostCrypto / (chain.createSize / 1000000);
        chain.createCostUsd = chain.createCostCrypto * filPrice;
        chain.createCostUsdPerMb = chain.createCostCryptoPerMb * filPrice;
        chain.writeSize = 193;
        chain.writeCostCrypto = 0.037353062628881108;
        chain.writeCostCryptoPerMb =
          chain.writeCostCrypto / (chain.writeSize / 1000000);
        chain.writeCostUsd = chain.writeCostCrypto * filPrice;
        chain.writeCostUsdPerMb = chain.writeCostCryptoPerMb * filPrice;
        break;
      default:
        break;
    }
  });
  return chains;
}

// Get chain costs for a `type` of `create` or `write` statements
export function QueryCosts({ type }: { type: string }): JSX.Element {
  const chains = chainCostInfo();
  if (type === "create") {
    return (
      <>
        <table>
          <thead>
            <tr>
              <th>Chain</th>
              <th>Create size (B)</th>
              <th>Create cost (ETH)</th>
              <th>Create cost (USD)</th>
              <th>Create cost (ETH/MB)</th>
              <th>Create cost ($/MB)</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(chains).map((chain: any, i) => {
              const c = chains[chain];
              return (
                <tr key={i}>
                  <td style={{ textTransform: "capitalize" }}>
                    {c.chainNameFormatted}
                  </td>
                  <td>{c.createSize}</td>
                  <td>{c.createCostCrypto.toFixed(7)}</td>
                  <td>${c.createCostUsd.toFixed(4)}</td>
                  <td>{c.createCostCryptoPerMb.toFixed(4)}</td>
                  <td>${c.createCostUsdPerMb.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  } else if (type === "write") {
    return (
      <>
        <table>
          <thead>
            <tr>
              <th>Chain</th>
              <th>Write size (B)</th>
              <th>Write cost (ETH)</th>
              <th>Write cost (USD)</th>
              <th>Write cost (ETH/MB)</th>
              <th>Write cost ($/MB)</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(chains).map((chain: any, i) => {
              const c = chains[chain];
              return (
                <tr key={i}>
                  <td style={{ textTransform: "capitalize" }}>
                    {c.chainNameFormatted}
                  </td>
                  <td>{c.writeSize}</td>
                  <td>{c.writeCostCrypto.toFixed(7)}</td>
                  <td>${c.writeCostUsd.toFixed(4)}</td>
                  <td>{c.writeCostCryptoPerMb.toFixed(4)}</td>
                  <td>${c.writeCostUsdPerMb.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  } else {
    return <>Error calculating chain prices.</>;
  }
}

// Get chain costs for a `type` of `create` or `write` statements
export function TokenCost({ token }: { token: string }): JSX.Element {
  return <>${getChainCosts(token).toFixed(2)}</>;
}
