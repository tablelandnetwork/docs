import React from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import ArrowButton from "@site/src/components/ArrowButton";
import CustomFooter from "../theme/CustomFooter";
import useBaseUrl from "@docusaurus/useBaseUrl";

import styles from "./index.module.css";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout>
      <header className={clsx("hero hero--primary")}>
        <div className="container">
          <div className="row">
            <h1 className="hero__title">Documentation</h1>
            <p className="hero__subtitle">{siteConfig.tagline}</p>
          </div>
          <div className="row row-landing margin-top--lg">
            <div className="col column--6 padding-left--none">
              <h2>A new way to store web3 data</h2>
              <p>
                Build applications on your chain of choice while using a
                decentralized relational database, allowing developers to:
                <ul>
                  <li>
                    Reduce reliance on centralized servers and associated
                    maintenance.
                  </li>{" "}
                  <li>
                    Stop resorting to expensive smart contract storage for
                    frequently changing data that doesn't belong there.
                  </li>
                  <li>
                    Replace the need for complicated "mutable" file publishing
                    workflows on distributed file systems, which shouldn't be
                    used as a database.
                  </li>
                </ul>{" "}
                Developers can leverage a natively mutable and queryable data
                storage option that <i>virtualizes</i> contract storage, along
                with on-chain access controls. Write SQL to EVM chains and query
                it off-chain on the Tableland network, where validator nodes
                process & store data in SQLite—<i>mutable</i> data with{" "}
                <i>immutable</i> rules.
              </p>
              <ArrowButton text="Get started" to="sdk/getting-started" />
            </div>
            <div
              className="col column--6"
              style={{
                display: "flex",
                justifyContent: "center",
                alignSelf: "center",
              }}
            >
              <img
                alt="Tableland code snippet"
                className={clsx(styles.landingImage)}
                src={useBaseUrl("/img/tableland/landing-image.png")}
              ></img>
            </div>
          </div>
        </div>
      </header>
      <main className="container">
        <HomepageFeatures />
      </main>
      <CustomFooter />
    </Layout>
  );
}
