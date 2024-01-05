import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

/*
 Sidebars are organized into the following groupings—each has the main
 "grouping" that corresponds to a series of directories.  Each grouping is
 created as an array below, and some may contain sub-objects to help with
 general readability / organization. 

 Get started:
 - Fundamentals (/docs/fundamentals)
 - Quickstarts (/quickstarts)

 Guides:
 - Playbooks (/docs/playbooks)
 - SQL (/docs/sql)
 - Tutorials (/docs/tutorials)

 Develop:
 - Studio (/studio)
 - SDK (/docs/sdk)
 - Smart contracts (/docs/smart-contracts)
 - Validator API (/docs/validator-api)
 - CLI (/docs/cli)
 - Local Tableland (/docs/local-tableland)
 - Validator API & node (/docs/validator)
 - API reference (/docs/api/sdk)

Community: misc. links
 
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

/* GET STARTED */

// Fundamentals
const fundamentals = [
  ...sidepageHeader("Fundamentals"),
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
  "fundamentals/supported-chains",
  "fundamentals/limits",
  ...section("Architecture"),
  "fundamentals/architecture/protocol-design",
  "fundamentals/architecture/table-token",
  "fundamentals/architecture/gateway",
  "fundamentals/architecture/query-optimization",
  "fundamentals/architecture/cost-estimator",
  ...section("About"),
  {
    type: "category",
    label: "Use cases",
    link: {
      type: "doc",
      id: "fundamentals/use-cases/README",
    },
    items: [],
  },
  "fundamentals/about/general-faqs",
  "fundamentals/about/glossary",
  "fundamentals/about/open-beta",
  "fundamentals/about/roadmap",
];

// Quickstarts
const quickstarts = [
  ...sidepageHeader("Quickstarts"),
  {
    type: "category",
    label: "Get started",
    link: {
      type: "doc",
      id: "quickstarts/README",
    },
    collapsible: false,
    items: [
      "quickstarts/local-tableland",
      "quickstarts/studio-quickstart",
      "quickstarts/sdk-quickstart",
      "quickstarts/smart-contract-quickstart",
      "quickstarts/cli-quickstart",
      "quickstarts/api-quickstart",
    ],
  },
  ...section("Reference"),
  {
    type: "category",
    label: "Chain info & contracts",
    link: {
      type: "doc",
      id: "quickstarts/chains/README",
    },
    items: [
      "quickstarts/chains/ethereum",
      "quickstarts/chains/filecoin",
      "quickstarts/chains/arbitrum",
      "quickstarts/chains/optimism",
      "quickstarts/chains/polygon",
      "quickstarts/chains/local",
    ],
  },
  "quickstarts/templates",
  "quickstarts/repos",
  "quickstarts/faqs",
];

/* GUIDES */

// Playbooks
const playbooks = [
  ...sidepageHeader("Playbooks"),
  "playbooks/README",
  ...section("Concepts"),
  "playbooks/concepts/access-control",

  {
    type: "category",
    label: "NFTs",
    items: [
      "playbooks/concepts/nft-metadata",
      "playbooks/concepts/how-to-build-an-nft",
    ],
  },
  {
    type: "category",
    label: "SQL blueprints",
    items: [
      "playbooks/blueprints/erc721-metadata",
      "playbooks/blueprints/erc1155-metadata",
      "playbooks/blueprints/key-value",
      "playbooks/blueprints/studio-app-design",
    ],
  },
  ...section("Frameworks"),
  "playbooks/frameworks/hardhat",
  "playbooks/frameworks/reactjs",
  "playbooks/frameworks/nextjs",
  "playbooks/frameworks/wagmi",
  ...section("Protocol integrations"),
  "playbooks/integrations/ipfs",
  // ...section("Platforms"),
  // "playbooks/platforms/spheron",
];

// SQL
const sql = [
  ...sidepageHeader("SQL"),
  "sql/README",
  ...section("Basics"),
  "sql/access-control",
  "sql/create",
  "sql/read",
  "sql/write",
  "sql/composing-data",
  "sql/expressions",
  "sql/functions",
  "sql/incrementing-values",
  "sql/alter-table",
  ...section("Reference"),
  "sql/specification",
  "sql/faqs",
];

// Tutorials
const tutorials = [
  ...sidepageHeader("Tutorials"),
  "tutorials/README",
  ...section("Introductory"),
  "tutorials/getting-started-studio",
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

/* DEVELOP */

// Studio
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
  "studio/cli/use",
  "studio/cli/unuse",
  "studio/cli/project",
  "studio/cli/team",
  "studio/cli/import-data",
  "studio/cli/import-table",
  "studio/cli/deployment",
];

// Autogenerated SDK API docs
const apiSdk = [
  ...sidepageHeader("SDK API reference"),
  "api/sdk/modules",
  ...section("Namespaces"),
  {
    type: "autogenerated",
    dirName: "api/sdk/namespaces",
  },
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
];

// SDK
const sdk = [
  ...sidepageHeader("SDK"),
  "sdk/README",
  "sdk/database/README",
  "sdk/database/signers",
  "sdk/database/prepared-statements",
  "sdk/database/query-statement-methods",
  "sdk/database/batching",
  "sdk/database/aliases",
  "sdk/validator/README",
  "sdk/registry/README",
  {
    type: "category",
    label: "Polling & subscriptions",
    items: [
      "sdk/database/polling-queries",
      "sdk/validator/polling-transactions",
      "sdk/registry/subscribe",
    ],
  },
  ...section("Walkthroughs"),
  {
    type: "category",
    label: "Plugins",
    link: {
      type: "doc",
      id: "sdk/plugins/README",
    },
    items: [
      "sdk/plugins/pinning-to-ipfs",
      "sdk/plugins/truncate",
      "sdk/plugins/encryption",
      "sdk/plugins/custom-plugin",
    ],
  },
  "sdk/database/timeouts-error-handling",
  "sdk/walkthroughs/sql-parser",
  "sdk/walkthroughs/orm",
  "sdk/walkthroughs/testing",
  ...section("Reference"),
  "sdk/reference/type-conversion",
  "sdk/reference/compatability",
  // "sdk/reference/sdk-faqs",
];

// Smart contracts
const smartContracts = [
  ...sidepageHeader("Smart contracts"),
  "smart-contracts/README",
  "smart-contracts/get-started",
  "smart-contracts/registry",
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
  "smart-contracts/sql-helpers",
  "smart-contracts/tableland-deployments",
  "smart-contracts/deployed-contracts",
  ...section("Walkthroughs"),
  "smart-contracts/hardhat-plugin",
  "smart-contracts/row-level-access",
  "smart-contracts/serving-nft-metadata",
  "smart-contracts/parsing-registry-events",
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
      "smart-contracts/examples/gated-voting",
      "smart-contracts/examples/create-from-contract",
    ],
  },
  ...section("Reference"),
  "smart-contracts/error-handling",
  "smart-contracts/solidity-to-sql-types",
  "smart-contracts/uri-encoding",
  "smart-contracts/using-remix",
];

// CLI
const cli = [
  ...sidepageHeader("CLI"),
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

// Gateway REST API
const gatewayApi = [
  ...section("Gateway API"),
  "validator/api/README",
  {
    type: "category",
    label: "Query",
    link: {
      type: "doc",
      id: "validator/api/query",
    },
    collapsible: false,
    items: ["validator/api/query-formatting"],
  },
  "validator/api/receipt",
  "validator/api/tables",
  "validator/api/health",
  "validator/api/version",
];

// Validator node
const validator = [
  ...sidepageHeader("Gateway API & validator"),
  "validator/README",
  gatewayApi,
  ...section("Validator node"),
  "validator/node/README",
];

/* MISC */

const contribute = [
  ...sidepageHeader("Contribute"),
  "contribute/README",
  "contribute/style-guide",
  "contribute/maintainers",
];

/* You likely don't need to edit the following information, unless you're
changing the landing page's sidebar layout or adding one-off routes */

const sidebars: SidebarsConfig = {
  home: [
    {
      type: "doc",
      id: "landing", // Custom ID for the `README` page in `docs` root
      className: "sidebar-landing",
    },
    ...section("Get started", "landing"),
    {
      type: "doc",
      id: "fundamentals/README",
      label: "Fundamentals",
      className: "sidebar-landing",
    },
    {
      type: "doc",
      id: "quickstarts/README",
      label: "Quickstarts",
      className: "sidebar-landing",
    },
    ...section("Guides", "landing"),
    {
      type: "doc",
      id: "playbooks/README",
      label: "Playbooks",
      className: "sidebar-landing",
    },
    {
      type: "doc",
      id: "sql/README",
      label: "SQL",
      className: "sidebar-landing",
    },
    {
      type: "doc",
      id: "tutorials/README",
      label: "Tutorials",
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
      id: "validator/README",
      label: "Validator API & node",
      className: "sidebar-landing",
    },
    ...section("Community", "landing"),
    {
      type: "link",
      label: "Discord",
      href: "https://tableland.xyz/discord",
      className: "sidebar-landing sidebar-footer",
    },
    {
      type: "link",
      label: "Weeknotes",
      href: "https://tableland.substack.com/",
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
  // Get started
  fundamentals,
  quickstarts,
  // Guides
  playbooks,
  sql,
  tutorials,
  // Develop
  studio,
  sdk,
  smartContracts,
  cli,
  localTableland,
  gatewayApi,
  validator,
  // Miscellaneous
  contribute,
  apiSdk,
};

/* A series of helpers to formulate sidebar dividers and titles */

// A simple horizontal divider.
function hr(): object {
  return {
    type: "html",
    value: "<hr />",
    defaultStyle: true,
    className: "sidebar-hr",
  };
}

// For text section headers / dividers, pass the name of the `section`.
function section(text: string, type = "sidebar"): Array<any> {
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
function sidepageHeader(text: string): Array<any> {
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

export default sidebars;
