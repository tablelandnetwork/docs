import React, { useState } from "react";
import { supportedChains, ChainFormatted } from "../SupportedChains";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import styles from "./index.module.css";

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

interface CalculatedCost {
  eth: number;
  matic: number;
  fil: number;
}

// Retrieve chain cost approximations
function chainCostInfo(costs: CalculatedCost): ChainCost[] {
  let chains = supportedChains().filter(
    (chain) => chain.location === "mainnet"
  ) as ChainCost[];
  const ethPrice = costs.eth || 0;
  const maticPrice = costs.matic || 0;
  const filPrice = costs.fil || 0;

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
      case "polygon":
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
function QueryCosts({
  type,
  costs,
}: {
  type: string;
  costs: CalculatedCost;
}): JSX.Element {
  const chains = chainCostInfo(costs);
  if (type === "create") {
    return (
      <>
        <table>
          <thead>
            <tr>
              <th>Chain</th>
              <th>Create size (B)</th>
              <th>Create cost</th>
              <th>Create cost (USD)</th>
              <th>Create cost</th>
              <th>Create cost (USD/MB)</th>
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
                  <td>
                    {c.createCostCrypto && c.createCostCrypto.toFixed(7)}{" "}
                    {c.cryptoToken}
                  </td>
                  <td>${c.createCostUsd && c.createCostUsd.toFixed(4)}</td>
                  <td>
                    {c.createCostCryptoPerMb &&
                      c.createCostCryptoPerMb.toFixed(4)}{" "}
                    {c.cryptoToken}/MB
                  </td>
                  <td>
                    ${c.createCostUsdPerMb && c.createCostUsdPerMb.toFixed(2)}
                  </td>
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
              <th>Write cost</th>
              <th>Write cost (USD)</th>
              <th>Write cost</th>
              <th>Write cost (USD/MB)</th>
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
                  <td>
                    {c.writeCostCrypto && c.writeCostCrypto.toFixed(7)}{" "}
                    {c.cryptoToken}
                  </td>
                  <td>${c.writeCostUsd && c.writeCostUsd.toFixed(4)}</td>
                  <td>
                    {c.writeCostCryptoPerMb &&
                      c.writeCostCryptoPerMb.toFixed(4)}{" "}
                    {c.cryptoToken}/MB
                  </td>
                  <td>
                    ${c.writeCostUsdPerMb && c.writeCostUsdPerMb.toFixed(2)}
                  </td>
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

export default function CostEstimator(): JSX.Element {
  const [costs, setCosts] = useState({
    eth: 3000.0,
    matic: 0.7,
    fil: 5.75,
  });

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numberValue = parseFloat(value);

    if (isNaN(numberValue)) {
      setCosts((prevCosts) => ({
        ...prevCosts,
        [name]: 0,
      }));
    } else {
      setCosts((prevCosts) => ({
        ...prevCosts,
        [name]: parseFloat(numberValue.toFixed(2)),
      }));
    }
  };

  return (
    <>
      <p>
        Every byte{" "}
        <Link to="/fundamentals/architecture/query-optimization">
          contributes to the cost
        </Link>{" "}
        associated with database mutating queries, and we're always working to
        reduce costs with the goal of being cost competitive with web2
        databases. The tables highlighted below provide <i>estimates</i> for
        creating and writing data where each shows the following:
      </p>
      <ul>
        <li>Size of the statement in bytes (B).</li>
        <li>Cost in the chain's native crypto token or USD.</li>
        <li>These costs mapped per megabyte (MB).</li>
      </ul>{" "}
      <p>
        Please be sure to perform your own tests to understand price
        implications since the live market impacts the price of any onchain
        transaction. For these estimates, the following market prices (USD) are
        used in the calculation, and you can adjust them below:
      </p>
      <table>
        <tbody>
          <tr>
            <td>
              <b>ETH price (USD)</b>:
            </td>
            <td>
              <input
                type="number"
                step="0.01"
                name="eth"
                value={costs.eth.toFixed(2)}
                onChange={handleCurrencyChange}
                className={styles.currencyInput}
                min="0"
              />
            </td>
          </tr>
          <tr>
            <td>
              <b>MATIC price (USD)</b>:
            </td>
            <td>
              <input
                type="number"
                step="0.01"
                name="matic"
                value={costs.matic.toFixed(2)}
                onChange={handleCurrencyChange}
                className={styles.currencyInput}
                min="0"
              />
            </td>
          </tr>
          <tr>
            <td>
              <b>FIL price (USD)</b>:
            </td>
            <td>
              <input
                type="number"
                step="0.01"
                name="fil"
                value={costs.fil.toFixed(2)}
                onChange={handleCurrencyChange}
                className={styles.currencyInput}
                min="0"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <p>
        Note that all chains' native token is ETH, except for Polygon (uses
        MATIC) and Filecoin (uses FIL).
      </p>
      <Heading as="h2">Create costs</Heading>
      <QueryCosts type={"create"} costs={costs} />
      <Heading as="h2">Write costs</Heading>
      <QueryCosts type={"write"} costs={costs} />
    </>
  );
}
