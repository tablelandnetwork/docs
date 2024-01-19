import React from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import HomepageFeatures from "./HomepageFeatures";
import Link from "@docusaurus/Link";
import ThemedImage from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./index.module.css";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <>
      <header className="landing-page margin-top--md">
        <div className="container">
          <div className="row">
            <h1 className="hero__title">Documentation</h1>
            <p className="hero__subtitle">{siteConfig.tagline}</p>{" "}
            {/* See `docusaurus.config.js` and `tagline` */}
          </div>
          <div className="row row-landing margin-top--sm">
            <div className="col col--6 padding-left--none padding-right--none">
              <h2>Program your web3 data</h2>
              <p>
                Tableland is a decentralized database built on the SQLite
                engine, providing developers with a web3-native, relational
                database that easily integrates into their stack. With
                Tableland, you can:
              </p>
              <ul>
                <li>
                  Utilize SQL to interact with web3 data, making the development
                  process simpler and more efficient.
                </li>
                <li>
                  Configure row-level access rules driven by wallet addresses,
                  token ownership, account balances, and any logic you choose.
                </li>
                <li>
                  Build robust data pipelines that process and distribute large
                  amounts of data for DeFi, DeSci, games, and more, all
                  decentralized and autonomous, leveraging Tableland's
                  infrastructure.
                </li>
              </ul>{" "}
              <p></p>
              <p>
                Deploy across{" "}
                <Link to="/fundamentals/supported-chains">
                  multiple blockchains
                </Link>
                , including Filecoin, Ethereum, Polygon, Arbitrum, and
                Optimism—and be a part of the growing number of projects using
                Tableland for data-driven applications.
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
              <ThemedImage
                alt="Tableland code snippet"
                className={clsx("landing-img", styles.landingImage)}
                sources={{
                  light: useBaseUrl(
                    "/img/landing/landing-image-light-mode.png"
                  ),
                  dark: useBaseUrl("/img/landing/landing-image-dark-mode.png"),
                }}
              />
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
