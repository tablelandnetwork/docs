/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// For text section headers / dividers, pass the name of the `section`
function hr() {
  return {
    type: "html",
    value: "<hr />",
    defaultStyle: true,
    className: "sidebar-hr",
  };
}

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
      value: `<h4 class="margin-top--md margin-bottom--sm sidepage-heading">${text}</h4>`,
      defaultStyle: true,
    },
  ];
}

// Concepts
const getStarted = [
  ...sidepageHeader("Fundamentals"),
  {
    type: "category",
    label: "Introduction",
    collapsed: true,
    link: {
      type: "doc",
      id: "fundamentals/README",
    },
    items: [
      "fundamentals/what-is-tableland",
      "fundamentals/considerations-tradeoffs",
      "fundamentals/databases",
    ],
  },
  {
    type: "category",
    label: "Quickstarts",
    link: {
      type: "doc",
      id: "fundamentals/quickstarts/README",
    },
    items: [
      "fundamentals/quickstarts/sdk-quickstart",
      "fundamentals/quickstarts/smart-contract-quickstart",
      "fundamentals/quickstarts/cli-quickstart",
      "fundamentals/quickstarts/api-quickstart",
    ],
  },
  ...section("Architecture"),
  "fundamentals/architecture/protocol-design",
  "fundamentals/architecture/table-token",
  "fundamentals/architecture/limits",
  "fundamentals/architecture/gateway",
  {
    type: "category",
    label: "Chains",
    link: {
      type: "doc",
      id: "fundamentals/chains/README",
    },
    items: [
      "fundamentals/chains/ethereum",
      "fundamentals/chains/arbitrum",
      "fundamentals/chains/optimism",
      "fundamentals/chains/polygon",
      "fundamentals/chains/local",
    ],
  },
  "fundamentals/architecture/contracts",
  ...section("About"),
  "fundamentals/about/open-beta",
  "fundamentals/about/use-cases",
  "fundamentals/about/roadmap",
  "fundamentals/about/general-faqs",
  "fundamentals/about/repos",
];

// Concepts

// const related = [
//   {
//     type: "category",
//     label: "Related topics",
//     link: {
//       type: "doc",
//       id: "concepts/related/README",
//     },
//     items: [
//       "concepts/related/databases",
//       "concepts/related/uri-encoding",
//       "concepts/related/roadmap",
//     ],
//   },
// ];

// const tools = {
//   type: "category",
//   label: "Tools",
//   link: {
//     type: "doc",
//     id: "develop/tools/README",
//   },
//   items: ["develop/tools/local-tableland"],
// };

// const sql = [
//   ...sidepageHeader("SQL"),
//   "concepts/sql/README",
//   "concepts/sql/create-a-table",
//   {
//     type: "category",
//     label: "Mutating table data",
//     link: {
//       type: "doc",
//       id: "concepts/sql/mutating-data",
//     },
//     items: [
//       "concepts/sql/insert",
//       "concepts/sql/update",
//       "concepts/sql/upsert",
//       "concepts/sql/delete",
//     ],
//   },
//   "concepts/sql/read",
//   "concepts/sql/access-control",
//   "concepts/sql/incrementing-values",
//   "concepts/sql/sql-spec",
// ];

const sdk = [
  ...sidepageHeader("SDK"),
  "sdk/README",
  {
    type: "category",
    label: "Database API",
    link: {
      type: "doc",
      id: "sdk/database/README",
    },
    items: [
      "sdk/database/signers",
      "sdk/database/prepared-statements",
      "sdk/database/query-statement-methods",
      "sdk/database/batching",
      "sdk/database/type-conversion",
      "sdk/database/timeouts",
      "sdk/database/orm",
      "sdk/database/upgrading-from-legacy",
    ],
  },
  {
    type: "category",
    label: "Validator API",
    link: {
      type: "doc",
      id: "sdk/validator/README",
    },
    items: [],
  },
  {
    type: "category",
    label: "Registry API",
    link: {
      type: "doc",
      id: "sdk/registry/README",
    },
    items: [],
  },
  "sdk/errors",
  "sdk/sdk-faqs",
  ...section("Frameworks"),
  "sdk/frameworks/reactjs",
  "sdk/frameworks/wagmi",
];

const cli = [
  ...sidepageHeader("CLI"),
  ,
  "cli/README",
  "cli/commands",
  "cli/errors",
];

const validatorApi = [
  ...sidepageHeader("Validator API"),
  "validator-api/README",
  "validator-api/endpoints",
  "validator-api/errors",
  ...section("Guides"),
];

const smartContracts = [
  ...sidepageHeader("Smart contracts"),
  "smart-contracts/README",
];

const tutorials = [
  ...sidepageHeader("Tutorials"),
  "tutorials/README",
  ...section("NFTs"),
  "tutorials/dynamic-nft-solidity",
  "tutorials/dynamic-nft-p5js",
  "tutorials/deploying-nft-polygon",
  "tutorials/dynamic-nft-chainlink",
  ...section("Utility"),
  "tutorials/table-reads-chainlink",
];

const sqlSpecification = [
  ...sidepageHeader("Reference"),
  "reference/sql-specification",
];

// @ts-check
/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  home: [
    {
      type: "doc",
      id: "landing", // Custom ID for the `README` page in `docs` root
      className: "sidebar-landing",
    },
    {
      type: "doc",
      id: "fundamentals/README",
      label: "Fundamentals",
      className: "sidebar-landing",
    },
    ...section("Build", "landing"),
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
      id: "validator-api/README",
      label: "Validator API",
      className: "sidebar-landing",
    },
    {
      type: "doc",
      id: "cli/README",
      label: "CLI",
      className: "sidebar-landing",
    },
    ...section("Walkthroughs", "landing"),
    {
      type: "doc",
      id: "tutorials/README",
      label: "Tutorials",
      className: "sidebar-landing",
    },
    ...section("Reference", "landing"),
    {
      type: "doc",
      id: "reference/sql-specification",
      label: "SQL specification",
      className: "sidebar-landing",
    },
    // {
    //   type: "doc",
    //   id: "reference/validator-api",
    //   label: "Validator API",
    //   className: "sidebar-landing",
    // },
  ],
  getStarted: getStarted,
  sdk: sdk,
  smartContracts: smartContracts,
  cli: cli,
  validatorApi: validatorApi,
  tutorials: tutorials,
  sqlSpecification: sqlSpecification,
  // // By default, Docusaurus generates a sidebar from the docs folder structure
  // // tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],
  // a: [
  //   "README",
  //   "concepts/faqs",
  //   {
  //     type: "html",
  //     value: ...section("Basics"),
  //     defaultStyle: true,
  //   },
  //   network,
  //   sql,
  //   related,
  //   "concepts/faqs",
  // ],
  // concepts: [
  //   "concepts/README",
  //   {
  //     type: "link",
  //     label: "← Home",
  //     href: "/",
  //   },
  //   {
  //     type: "html",
  //     value: ...section("Basics"),
  //     defaultStyle: true,
  //   },
  //   network,
  //   sql,
  //   related,
  //   "concepts/faqs",
  // ],
  // develop: [
  //   "develop/README",
  //   {
  //     type: "html",
  //     value: ...section(""),
  //     defaultStyle: true,
  //   },
  //   reference,
  //   {
  //     type: "html",
  //     value: ...section("Build"),
  //     defaultStyle: true,
  //   },
  //   sdk,
  //   cli,
  //   api,
  //   cli,
  //   api,
  //   cli,
  //   api,
  //   contracts,
  //   {
  //     type: "html",
  //     value: ...section("Integrations"),
  //     defaultStyle: true,
  //   },
  //   {
  //     type: "category",
  //     label: "Chains",
  //     link: {
  //       type: "doc",
  //       id: "develop/chains/README",
  //     },
  //     items: [
  //       "develop/chains/ethereum",
  //       "develop/chains/arbitrum",
  //       "develop/chains/optimism",
  //       "develop/chains/polygon",
  //       "develop/chains/local",
  //     ],
  //   },
  //   {
  //     type: "category",
  //     label: "Protocols",
  //     link: {
  //       type: "doc",
  //       id: "develop/integrations/ipfs",
  //     },
  //     items: [
  //       "develop/integrations/filecoin",
  //       "develop/integrations/chainlink",
  //       "develop/integrations/lit-protocol",
  //       "develop/integrations/nucypher",
  //       "develop/integrations/toucan",
  //     ],
  //   },
  //   {
  //     type: "html",
  //     value: ...section("Tools"),
  //     defaultStyle: true,
  //   },
  //   tools,
  // ],
  // tutorials: [
  //   {
  //     type: "category",
  //     label: "Tutorials",
  //     link: {
  //       type: "generated-index",
  //     },
  //     items: [
  //       "tutorials/dynamic-nft-solidity",
  //       "tutorials/dynamic-nft-p5js",
  //       "tutorials/dynamic-nft-chainlink",
  //     ],
  //   },
  // ],
  contribute: [
    ...sidepageHeader("Contribute"),
    "contribute/README",
    "contribute/style-guide",
    "contribute/maintainers",
  ],
  // rigs: [
  //   {
  //     type: "category",
  //     label: "Tableland Rigs NFT",
  //     link: {
  //       type: "doc",
  //       id: "products/rigs/README",
  //     },
  //     items: [
  //       "products/rigs/what-are-rigs",
  //       "products/rigs/the-garage",
  //       "products/rigs/rigs-discord",
  //     ],
  //   },
  // ],
};

module.exports = sidebars;
