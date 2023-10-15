/*
 Sidebars are organized into the following groupings—each has the main
 "grouping" that corresponds to a series of directories.  Each grouping is
 created as an array below, and some may contain sub-objects to help with
 general readability / organization. 

 Learn:
 - Fundamentals (/docs/fundamentals)
 - Playbooks (/docs/playbooks)

 Develop:
 - Studio (/studio)
 - Quickstarts (/quickstarts)
 - SDK (/docs/sdk)
 - Smart contracts (/docs/smart-contracts)
 - Validator API (/docs/validator-api)
 - CLI (/docs/cli)
 - Tutorials (/docs/tutorials)
 - API reference (/docs/api/sdk)

 Protocol:
 - Validator node (/docs/validator)
 - SQL specification (/docs/reference/sql-specification)
 
 If you want to add a new page to the docs, you simply add the path to that doc
 as a new string in the array. For example, if this is the `tutorials` sidebar,
 it means that the `docs/tutorials/existing-tutorial` path is the first tutorial
 in the sidebar grouping:
    const tutorials = [
      "tutorials/existing-tutorial",
    ];
 If you want to create a new doc page and display it in the sidebar, you add it
 to the array where the order of each path string is the order in which
 the docs are displayed:
    const tutorials = [
      "tutorials/existing-tutorial", // Displayed first
      "tutorials/new-tutorial", // Displayed second
    ];
  That is, when you see the sidebar, it'll have this top-to-bottom order and use
  whatever frontmatter `title` is defined in the markdown file itself.
 */

/* FUNDAMENTALS */

// Introduction
const introduction = [
  {
    type: "category",
    label: "Introduction",
    link: {
      type: "doc",
      id: "fundamentals/README",
    },
    items: [
      "fundamentals/what-is-tableland",
      "fundamentals/considerations-tradeoffs",
      "fundamentals/databases",
      "fundamentals/why-sqlite",
    ],
  },
];

// Use cases
const useCases = {
  type: "category",
  label: "Use cases",
  link: {
    type: "doc",
    id: "fundamentals/use-cases/README",
  },
  items: [],
};

// Architecture
const architecture = [
  ...section("Architecture"),
  "fundamentals/architecture/protocol-design",
  {
    type: "category",
    label: "Chains",
    link: {
      type: "doc",
      id: "fundamentals/chains/README",
    },
    items: [
      "fundamentals/chains/ethereum",
      "fundamentals/chains/filecoin",
      "fundamentals/chains/arbitrum",
      "fundamentals/chains/optimism",
      "fundamentals/chains/polygon",
      "fundamentals/chains/local",
    ],
  },
  "fundamentals/architecture/table-token",
  "fundamentals/architecture/limits",
  "fundamentals/architecture/gateway",
  "fundamentals/architecture/query-optimization",
  "fundamentals/architecture/cost-estimator",
];

// Concepts
const concepts = [...section("Concepts"), "fundamentals/concepts/nft-metadata"];

// About
const about = [
  ...section("About"),
  "fundamentals/about/general-faqs",
  "fundamentals/about/glossary",
  "fundamentals/about/open-beta",
  "fundamentals/about/roadmap",
  "fundamentals/about/repos",
];

// Fundamentals wrapper, with some intro content
const fundamentals = [
  ...sidepageHeader("Fundamentals"),
  introduction,
  useCases,
  architecture,
  concepts,
  about,
];

/* PLAYBOOKS */

// Core SQL
const sql = [
  ...section("SQL basics"),
  "playbooks/sql/README",
  "playbooks/sql/create",
  "playbooks/sql/read",
  "playbooks/sql/write",
  "playbooks/sql/composing-data",
  "playbooks/sql/functions",
  "playbooks/sql/access-control",
  "playbooks/sql/incrementing-values",
  "playbooks/sql/alter-table",
  ...section("Walkthroughs"),
  "playbooks/walkthroughs/nft-metadata",
  "playbooks/walkthroughs/key-value",

  "playbooks/walkthroughs/sql-faqs",
];

// Playbooks (wraps `sql` and `related`)
const playbooks = [...sidepageHeader("SQL playbooks"), "playbooks/README", sql];

/* STUDIO */

const studio = [
  ...sidepageHeader("Studio"),
  "studio/README",
  ...section("Web app"),
  "studio/web/getting-started",
  "studio/web/create-table",
  "studio/web/import-table",
  "studio/web/collaborate",
  ...section("Studio CLI"),
  "studio/cli/README",
  "studio/cli/login",
  "studio/cli/logout",
  "studio/cli/team",
  "studio/cli/project",
  "studio/cli/use",
  "studio/cli/unuse",
  "studio/cli/import-table",
  "studio/cli/import-data",
];

/* DEVELOP */

const quickstarts = [
  ...sidepageHeader("Quickstarts"),
  "quickstarts/README",
  ...section("Core"),
  "quickstarts/sdk-quickstart",
  "quickstarts/smart-contract-quickstart",
  "quickstarts/cli-quickstart",
  "quickstarts/api-quickstart",
  "quickstarts/local-tableland",
  "quickstarts/templates",
  ...section("Web app frameworks"),
  "quickstarts/reactjs",
  "quickstarts/wagmi",
  ...section("Contract frameworks"),
  "quickstarts/hardhat",
  ...section("Guides"),
  "quickstarts/how-to-build-an-nft",
];

// Autogenerated SDK API docs
const apiSdk = [
  ...sidepageHeader("SDK API reference"),
  "api/sdk/modules",
  ...section("Classes"),
  {
    type: "autogenerated",
    dirName: "api/sdk/classes",
  },
  ...section("Interfaces"),
  {
    type: "autogenerated",
    dirName: "api/sdk/interfaces",
  },
  ...section("Namespaces"),
  {
    type: "autogenerated",
    dirName: "api/sdk/namespaces",
  },
];

// SDK
const sdk = [
  ...sidepageHeader("SDK"),
  "sdk/README",
  ...section("Database API"),
  "sdk/database/README",
  "sdk/database/signers",
  "sdk/database/prepared-statements",
  "sdk/database/query-statement-methods",
  "sdk/database/batching",
  "sdk/database/aliases",
  "sdk/database/timeouts-error-handling",
  ...section("Validator API"),
  "sdk/validator/README",
  ...section("Registry API"),
  "sdk/registry/README",
  "sdk/registry/subscribe",
  ...section("Walkthroughs"),
  "sdk/walkthroughs/testing",
  "sdk/walkthroughs/orm",
  ...section("Plugins"),
  "sdk/plugins/JETI",
  ...section("Reference"),
  "sdk/reference/type-conversion",
  "sdk/reference/node-polyfills",
  // "sdk/reference/sdk-faqs",
];

// Smart contracts
const smartContracts = [
  ...sidepageHeader("Smart contracts"),
  "smart-contracts/README",
  "smart-contracts/get-started",
  "smart-contracts/contract-owned-tables",
  {
    type: "category",
    label: "Configure write access",
    link: {
      type: "doc",
      id: "smart-contracts/controller/README",
    },
    items: [
      "smart-contracts/controller/contract-anatomy",
      "smart-contracts/controller/creating-controllers",
      "smart-contracts/controller/setting-controllers",
    ],
  },
  "smart-contracts/using-sql-helpers",
  ...section("Walkthroughs"),
  "smart-contracts/serving-nft-metadata",
  "smart-contracts/row-level-access",
  "smart-contracts/parsing-registry-events",
  "smart-contracts/uri-encoding",
  "smart-contracts/immutable-table",
  {
    type: "category",
    label: "Example contracts",
    link: {
      type: "doc",
      id: "smart-contracts/examples/README",
    },
    items: [
      "smart-contracts/examples/allow-all-controller",
      "smart-contracts/examples/complex-controller",
      "smart-contracts/examples/raw-controller",
      "smart-contracts/examples/gated-voting",
      "smart-contracts/examples/create-from-contract",
    ],
  },
  ...section("Reference"),
  "smart-contracts/deployed-contracts",
  "smart-contracts/error-handling",
  "smart-contracts/solidity-to-sql-types",
  "smart-contracts/using-remix",
];

// Gateway REST API
const gatewayApi = [
  ...sidepageHeader("Gateway API"),
  "gateway-api/README",
  "gateway-api/endpoints",
  "gateway-api/query-formatting",
];

// CLI
const cli = [
  ...sidepageHeader("CLI"),
  ,
  "cli/README",
  "cli/chains",
  "cli/controller",
  "cli/create",
  "cli/info",
  "cli/init",
  "cli/list",
  "cli/namespace",
  "cli/read",
  "cli/receipt",
  "cli/schema",
  "cli/shell",
  "cli/transfer",
  "cli/write",
  ...section("Reference"),
  "cli/errors",
];

// Local Tableland
const localTableland = [
  ...sidepageHeader("Local Tableland"),
  "local-tableland/README",
  "local-tableland/cli",
  "local-tableland/testing",
];

// Tutorials
const tutorials = [
  ...sidepageHeader("Tutorials"),
  "tutorials/README",
  ...section("NFTs & Gaming"),
  "tutorials/dynamic-nft-solidity",
  "tutorials/dynamic-nft-p5js",
  "tutorials/building-games-on-arbitrum",
  "tutorials/dynamic-nft-chainlink",
  ...section("Data & storage"),
  "tutorials/data-dao-polygon",
  "tutorials/key-value-store-nft",
  ...section("Utility"),
  "tutorials/table-reads-chainlink",
  "tutorials/json-files-nft-polygon",
];

/* PROTOCOL */

// Validator node
const validator = [...sidepageHeader("Reference"), "validator/README"];

// SQL spec
const sqlSpecification = [...sidepageHeader("Reference"), "specs/sql/README"];

/* You likely don't need to edit the following information, unless you're
changing the landing page's sidebar layout or adding one-off routes */

// @ts-check
/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  home: [
    {
      type: "doc",
      id: "landing", // Custom ID for the `README` page in `docs` root
      className: "sidebar-landing",
    },
    ...section("Learn", "landing"),
    {
      type: "doc",
      id: "fundamentals/README",
      label: "Fundamentals",
      className: "sidebar-landing",
    },
    {
      type: "doc",
      id: "playbooks/README",
      label: "SQL playbooks",
      className: "sidebar-landing",
    },
    ...section("Develop", "landing"),
    {
      type: "doc",
      id: "studio/README",
      label: "Studio",
      className: "sidebar-landing",
    },
    {
      type: "doc",
      id: "quickstarts/README",
      label: "Quickstarts",
      className: "sidebar-landing",
    },
    {
      type: "doc",
      id: "sdk/README",
      label: "SDK",
      className: "sidebar-landing",
    },
    {
      type: "doc",
      id: "smart-contracts/README",
      label: "Smart contracts",
      className: "sidebar-landing",
    },
    {
      type: "doc",
      id: "gateway-api/README",
      label: "Gateway API",
      className: "sidebar-landing",
    },
    {
      type: "doc",
      id: "cli/README",
      label: "CLI",
      className: "sidebar-landing",
    },
    {
      type: "doc",
      id: "local-tableland/README",
      label: "Local Tableland",
      className: "sidebar-landing",
    },
    {
      type: "doc",
      id: "tutorials/README",
      label: "Tutorials",
      className: "sidebar-landing",
    },
    ...section("Infra & protocol", "landing"),
    {
      type: "doc",
      id: "validator/README",
      label: "Validator node",
      className: "sidebar-landing",
    },
    {
      type: "doc",
      id: "specs/sql/README",
      label: "SQL specification",
      className: "sidebar-landing",
    },
    ...section("Community", "landing"),
    {
      type: "link",
      label: "Main site",
      href: "https://tableland.xyz",
      className: "sidebar-landing sidebar-footer",
    },
    {
      type: "link",
      label: "Blog",
      href: "https://mirror.xyz/tableland.eth",
      className: "sidebar-landing sidebar-footer",
    },
    {
      type: "link",
      label: "Showcase",
      href: "https://dev.tableland.xyz/showcase",
      className: "sidebar-landing sidebar-footer",
    },
  ],
  // Learn
  fundamentals,
  playbooks,
  // Develop
  studio,
  quickstarts,
  sdk,
  smartContracts,
  cli,
  gatewayApi,
  localTableland,
  tutorials,
  apiSdk,
  // Infra & protocol
  validator,
  sqlSpecification,
  // Miscellaneous
  contribute: [
    ...sidepageHeader("Contribute"),
    "contribute/README",
    "contribute/style-guide",
    "contribute/maintainers",
  ],
};

/* A series of helpers to formulate sidebar dividers and titles */

// A simple horizontal divider.
function hr() {
  return {
    type: "html",
    value: "<hr />",
    defaultStyle: true,
    className: "sidebar-hr",
  };
}

// For text section headers / dividers, pass the name of the `section`.
function section(text, type = "sidebar") {
  const sidebarClass =
    type === "sidebar" ? "sidebar-section" : "landing-section";
  return [
    {
      type: "html",
      value: `<h6 class="margin-top--md margin-bottom--none ${sidebarClass}">${text.toUpperCase()}</h6>`,
      defaultStyle: true,
    },
    hr(),
  ];
}

// Only used as the "main" sidebar header—i.e., the landing page directs to a
// number of side pages, like "Get started" and "Concepts". These sidebars have a
// "Back to home" button followed by the passed name of the sidebar grouping.
function sidepageHeader(text) {
  return [
    {
      type: "link",
      label: "Back to home",
      className: "sidepage-back-home",
      href: "/",
    },
    {
      type: "html",
      value: `<h4 class="margin-top--md margin-bottom--none sidepage-heading">${text}</h4>`,
      defaultStyle: true,
    },
    hr(),
  ];
}

module.exports = sidebars;
