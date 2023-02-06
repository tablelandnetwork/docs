import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import { FaCode } from "react-icons/fa";
import styles from "./styles.module.css";

type ProductItem = {
  name: string;
  description: JSX.Element;
  url: string;
};

const BuildList: ProductItem[] = [
  {
    name: "SDK",
    description: (
      <>JavaScript / TypeScript SDK for frontend apps or Node.js backends</>
    ),

    url: "sdk/getting-started",
  },
  {
    name: "CLI",
    description: (
      <>CLI & shell to interact with Tableland from the command line</>
    ),

    url: "cli/getting-started",
  },
  {
    name: "Smart contracts",
    description: <>Develop and interact with Tableland using smart contracts</>,

    url: "smart-contracts/getting-started",
  },
];

const ToolsList: ProductItem[] = [
  {
    name: "Validator node",
    description: <>Run your own Tableland node (written in Go) using Docker</>,

    url: "https://github.com/tablelandnetwork/go-tableland",
  },
  {
    name: "Local Tableland",
    description: (
      <>
        Develop on Tableland locally, spinning up a Hardhat node and local
        validator node
      </>
    ),

    url: "https://github.com/tablelandnetwork/hardhat-tableland",
  },
  {
    name: "Hardhat plugin",
    description: (
      <>Use a Tableland Hardhat plugin during contract development</>
    ),

    url: "smart-contracts/getting-started",
  },
  {
    name: "Console",
    description: (
      <>
        Tableland network explorer—create, write, and read tables via a web app
      </>
    ),

    url: "https://console.tableland.xyz/",
  },
  {
    name: "Wasm parser",
    description: (
      <>Parse and normalize Tableland-compliant SQL statements client-side</>
    ),

    url: "https://github.com/tablelandnetwork/wasm-sqlparser",
  },
  {
    name: "dNFT starter",
    description: (
      <>Use a starter kit for dynamic NFTs built using smart contracts</>
    ),

    url: "https://github.com/tablelandnetwork/dnft-starter",
  },
];

const LearnList: ProductItem[] = [
  {
    name: "Tableland protocol",
    description: <>Understand what the Tableland network is and how it works</>,

    url: "about/tableland/what-is-tableland",
  },
  {
    name: "SQL",
    description: (
      <>Get to know SQL—the query language that drives the protocol</>
    ),

    url: "about/sql/what-is-sql",
  },
  {
    name: "Tableland Rigs",
    description: (
      <>
        The Rigs NFT, built by the team behind Tableland and on the protocol
        itself
      </>
    ),
    url: "about/rigs/overview",
  },
  {
    name: "Tutorials",
    description: (
      <>Take a look at examples that showcase how to build with Tableland</>
    ),

    url: "tutorials/overview",
  },
  {
    name: "Example apps",
    description: (
      <>A series of example applications that demonstrate what to build</>
    ),

    url: "https://github.com/orgs/tablelandnetwork/repositories?q=example&type=all&language=&sort=",
  },
];

type FeatureItem = {
  title: string;
  icon: JSX.Element;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Flexible clients",
    icon: <FaCode size={30} />,
    description: (
      <>
        Develop using the JavaScript SDK (with TypeScript support), CLI tool, or
        direct smart contract calls to the Tableland registry—and even choose to
        run your own Tableland validator node.
      </>
    ),
  },
  {
    title: "Use SQL everywhere",
    icon: <FaCode size={30} />,
    description: (
      <>
        Extend Ethereum and supported chains with SQL for table creates &
        writes, plus, off-chain read queries across any chain—while still
        leveraging the base chain's security and execution.
      </>
    ),
  },
  {
    title: "Powered by smart contracts",
    icon: <FaCode size={30} />,
    description: (
      <>
        All tables are minted as{" "}
        <Link to="https://opensea.io/collection/tableland-tables">
          ERC721 tokens{" "}
        </Link>
        at a Tableland registry smart contract on each chain, so table ownership
        and contract-defined mutability controllers are inherent features.
      </>
    ),
  },
];

function Feature({ title, icon, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text">
        {icon}
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

function Product({ name, url, description }: ProductItem) {
  return (
    <Link to={url}>
      <div className={styles.product}>
        <div>
          <h4>{name}</h4>
          <span>{description}</span>{" "}
        </div>
      </div>
    </Link>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <>
      <div
        className="container padding-left--none padding-right--none"
        style={{ maxWidth: "1175px" }}
      >
        <div>
          <div className="row">
            {FeatureList.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))}
          </div>
          <hr />
          <div className="padding-top--lg padding-bottom--sm">
            <h2>Explore</h2>
          </div>
          <div className="row">
            <div className={clsx("col padding-bottom--md")}>
              <span className={clsx(styles.exploreSubtitle)}>
                Build on Tableland
              </span>
            </div>
          </div>
          <div className="row">
            {BuildList.map((props, idx) => (
              <div className={clsx("col col--4 margin-bottom--lg")}>
                <Product key={idx} {...props} />
              </div>
            ))}
          </div>
          <div className="row">
            <div className={clsx("col padding-bottom--md")}>
              <span className={clsx(styles.exploreSubtitle)}>
                Tools to use while developing
              </span>
            </div>
          </div>
          <div className="row">
            {ToolsList.map((props, idx) => (
              <div className={clsx("col col--4 margin-bottom--lg")}>
                <Product key={idx} {...props} />
              </div>
            ))}
          </div>
          <div className="row">
            <div className={clsx("col padding-bottom--md")}>
              <span className={clsx(styles.exploreSubtitle)}>
                Learn all about Tableland
              </span>
            </div>
          </div>
          <div className="row">
            {LearnList.map((props, idx) => (
              <div className={clsx("col col--4 margin-bottom--lg")}>
                <Product key={idx} {...props} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
