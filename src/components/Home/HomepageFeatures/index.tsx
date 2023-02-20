import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import {
  FaTerminal,
  FaHardHat,
  FaConnectdevelop,
  FaFileContract,
} from "react-icons/fa";
import { DiJsBadge } from "react-icons/di";
import {
  AiOutlineConsoleSql,
  AiFillApi,
  AiOutlineBuild,
  AiOutlineAppstoreAdd,
} from "react-icons/ai";
import { HiOutlineArrowPath, HiOutlineLightBulb } from "react-icons/hi2";
import { SiSolidity, SiSqlite } from "react-icons/si";
import { GoDatabase } from "react-icons/go";
import { GiWavyChains } from "react-icons/gi";
import { MdQueryStats } from "react-icons/md";
import { VscListTree } from "react-icons/vsc";
import { ImTable } from "react-icons/im";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  icon: JSX.Element;
  description: JSX.Element;
};

type ProductItem = {
  name: string;
  icon: JSX.Element;
  description: JSX.Element;
  url: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Hybrid state & queries",
    icon: <MdQueryStats size={30} />,
    description: (
      <>
        Dynamically change table data using on-chain actions—the host chain
        provides data availability for mutating SQL statements—while table state
        is accessed with read queries made directly to Tableland (a network of
        nodes running SQLite).
      </>
    ),
  },
  {
    title: "Access control & ownership",
    icon: <FaFileContract size={30} />,
    description: (
      <>
        All tables are minted as{" "}
        <Link to="https://opensea.io/collection/tableland-tables">
          ERC721 tokens{" "}
        </Link>
        by a Tableland registry smart contract on each chain, so table ownership
        and contract-defined mutability controllers (
        <Link to="https://en.wikipedia.org/wiki/Access-control_list">ACLs</Link>
        ) enable adaptable on-chain workflows for collaborative data.
      </>
    ),
  },
  {
    title: "Flexible clients",
    icon: <FaConnectdevelop size={30} />,
    description: (
      <>
        Develop using the JavaScript / TypeScript SDK, REST API, CLI tool, or
        purely smart contracts—and even choose to run your own Tableland
        validator node (local, testnet, or mainnet) with relatively light
        hardware and setup requirements.
      </>
    ),
  },
];

const BuildList: ProductItem[] = [
  {
    name: "SDK",
    icon: <DiJsBadge size={30} />,
    description: (
      <>JavaScript / TypeScript SDK for client-side or Node.js applications</>
    ),

    url: "sdk/getting-started",
  },
  {
    name: "CLI",
    icon: <FaTerminal size={30} />,
    description: <>CLI & shell to use Tableland from the command line</>,

    url: "cli/getting-started",
  },
  {
    name: "Smart contracts",
    icon: <SiSolidity size={30} />,
    description: (
      <>Develop and interact with the registry using smart contracts</>
    ),

    url: "smart-contracts/getting-started",
  },
  {
    name: "Validator API",
    icon: <AiFillApi size={30} />,
    description: (
      <>
        Directly query a Tableland validator for network state & other node data
      </>
    ),

    url: "api/README",
  },
  {
    name: "Validator node",
    icon: <GoDatabase size={30} />,
    description: <>Run your own Tableland node (written in Go) using Docker</>,

    url: "https://github.com/tablelandnetwork/go-tableland",
  },
];

const ToolsList: ProductItem[] = [
  {
    name: "Local Tableland",
    icon: <ImTable size={30} />,
    description: (
      <>Develop locally, spinning up a local Hardhat and validator node</>
    ),

    url: "https://github.com/tablelandnetwork/hardhat-tableland",
  },
  {
    name: "Hardhat plugin",
    icon: <FaHardHat size={30} />,
    description: (
      <>Use a Tableland Hardhat plugin during contract development</>
    ),

    url: "smart-contracts/getting-started",
  },
  {
    name: "Console",
    icon: <AiOutlineConsoleSql size={30} />,
    description: (
      <>
        Tableland network explorer—create, write, and read tables via a web app
      </>
    ),

    url: "https://console.tableland.xyz/",
  },
  {
    name: "Wasm parser",
    icon: <VscListTree size={30} />,
    description: <>Parse & normalize Tableland-compliant SQL, client-side</>,

    url: "https://github.com/tablelandnetwork/wasm-sqlparser",
  },
  {
    name: "Starter kit",
    icon: <HiOutlineArrowPath size={30} />,
    description: <>Use a template for building TypeScript applications</>,

    url: "https://github.com/tablelandnetwork/js-template",
  },
];

const LearnList: ProductItem[] = [
  {
    name: "Tableland protocol",
    icon: <GiWavyChains size={30} />,
    description: <>Understand what Tableland is and how it works</>,
    url: "about/tableland/what-is-tableland",
  },
  {
    name: "SQL",
    icon: <SiSqlite size={30} />,
    description: (
      <>Get to know SQLite—the query language that drives the protocol</>
    ),
    url: "about/sql/what-is-sql",
  },
  {
    name: "Use cases",
    icon: <HiOutlineLightBulb size={30} />,
    description: (
      <>Common ways and starter ideas for when to use the protocol</>
    ),

    url: "tutorials/overview",
  },
  {
    name: "Tutorials",
    icon: <AiOutlineBuild size={30} />,
    description: <>Guides that showcase how to build with Tableland</>,

    url: "tutorials/overview",
  },
  {
    name: "Example apps",
    icon: <AiOutlineAppstoreAdd size={30} />,
    description: (
      <>A series of example applications that demonstrate what to build</>
    ),

    url: "https://github.com/orgs/tablelandnetwork/repositories?q=example&type=all&language=&sort=",
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

function Product({ name, url, icon, description }: ProductItem) {
  return (
    <Link to={url}>
      <div className={clsx("card ") + styles.product}>
        <div className={clsx("row ")}>
          <div className={clsx("col col--2")}>{icon}</div>
          <div className={clsx("col ")}>
            <h4>{name}</h4>
            <span>{description}</span>{" "}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <>
      <div
        className="container padding-left--none padding-right--none margin-top--lg"
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
          <div className={"row"}>
            <div className={clsx("col padding-bottom--md")}>
              <span className={clsx(styles.exploreSubtitle)}>
                Build using the protocol
              </span>
            </div>
          </div>
          <div className="row">
            {BuildList.map((props, idx) => (
              <div key={idx} className={clsx("col col--4 margin-bottom--lg")}>
                <Product {...props} />
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
              <div key={idx} className={clsx("col col--4 margin-bottom--lg")}>
                <Product {...props} />
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
              <div key={idx} className={clsx("col col--4 margin-bottom--lg ")}>
                <Product {...props} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
