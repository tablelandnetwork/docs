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
            <p className="hero__subtitle">{siteConfig.tagline}</p>{" "}
            {/* See `docusaurus.config.js` and `tagline` */}
          </div>
          <div className="row row-landing margin-top--lg">
            <div className="col col--6 padding-left--none padding-right--none">
              <h2>Program your web3 data</h2>
              <p>
                Build permissionless & dynamic applications on your blockchain
                of choice by adding Tableland to your stack, allowing developers
                to:
              </p>
              <ul>
                <li>
                  Use a decentralized relational database with SQL queries and
                  mutability, powered by chain-driven data and web3 identity.
                </li>
                <li>
                  Configure custom rules to control who or what can change
                  certain data, such as gating with account addresses, token
                  ownership, balances, or whatever on-chain logic you'd like.
                </li>
                <li>
                  Reduce smart contract storage, simplify complex distributed
                  file system workflows—both of which lack robust database
                  features—and stop relying on centralized service providers.
                </li>
              </ul>{" "}
              <p></p>
              <p>
                Scale data storage on Ethereum + EVM chains by creating,
                writing, and reading data using SQL. <b> Mutable</b> data with{" "}
                <b>immutable</b> rules.
              </p>
              <Link
                className={clsx("button button--primary", styles.getStartedBtn)}
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
