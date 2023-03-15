import React from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import HomepageFeatures from "./HomepageFeatures";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./index.module.css";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <>
      <header className="landing-page margin-top--lg">
        <div className="container">
          <div className="row">
            <h1 className="hero__title">Documentation</h1>
            <p className="hero__subtitle">{siteConfig.tagline}</p>
          </div>
          <div className="row row-landing margin-top--lg">
            <div className="col col--6 padding-left--none padding-right--none">
              <h2>Supercharge your web3 data</h2>
              <p>
                Build dynamic applications on your chain of choice by adding
                Tableland to your stack, allowing developers to:
              </p>
              <ul>
                <li>
                  Stop storing data in smart contracts that doesn't belong
                  there, and offload it to a decentralized database with native
                  SQL queries & mutability.
                </li>
                <li>
                  Eliminate centralized server dependence, or complex
                  decentralized storage workflows (static JSON files) without
                  database features.
                </li>
                <li>
                  Use on-chain rules to control who or what can change certain
                  table data, such as gating with NFT ownership or an account's
                  balance.
                </li>
              </ul>{" "}
              <p></p>
              <p>
                Enhance data storage on Ethereum & EVM chains by creating,
                writing to, and reading from tables using SQL. <b> Mutable</b>{" "}
                data with <b>immutable</b> rules.
              </p>
              <Link
                className={clsx(
                  "button button--primary padding-left--sm padding-right--sm",
                  styles.getStartedBtn
                )}
                to="fundamentals"
              >
                Get started
              </Link>
            </div>
            <div
              className="col col--6"
              style={{
                display: "flex",
                justifyContent: "center",
                alignSelf: "center",
              }}
            >
              <img
                alt="Tableland code snippet"
                className={clsx(styles.landingImage)}
                src={useBaseUrl("/img/landing/landing-image.png")}
              ></img>
            </div>
          </div>
        </div>
      </header>

      <br />
      <main
        className={clsx(
          styles.containerMain,
          "margin-top--lg padding-left--none padding-right--none"
        )}
      >
        <HomepageFeatures />
      </main>
    </>
  );
}
