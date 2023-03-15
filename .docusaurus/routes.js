import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '411'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '77c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'e47'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', '71d'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '246'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '56d'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '619'),
    exact: true
  },
  {
    path: '/blog',
    component: ComponentCreator('/blog', 'f23'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive', '3e0'),
    exact: true
  },
  {
    path: '/blog/first-blog-post',
    component: ComponentCreator('/blog/first-blog-post', '8ca'),
    exact: true
  },
  {
    path: '/blog/long-blog-post',
    component: ComponentCreator('/blog/long-blog-post', 'e9c'),
    exact: true
  },
  {
    path: '/blog/mdx-blog-post',
    component: ComponentCreator('/blog/mdx-blog-post', '710'),
    exact: true
  },
  {
    path: '/blog/tags',
    component: ComponentCreator('/blog/tags', 'cbd'),
    exact: true
  },
  {
    path: '/blog/tags/docusaurus',
    component: ComponentCreator('/blog/tags/docusaurus', 'e21'),
    exact: true
  },
  {
    path: '/blog/tags/facebook',
    component: ComponentCreator('/blog/tags/facebook', 'aaa'),
    exact: true
  },
  {
    path: '/blog/tags/hello',
    component: ComponentCreator('/blog/tags/hello', '68f'),
    exact: true
  },
  {
    path: '/blog/tags/hola',
    component: ComponentCreator('/blog/tags/hola', '4ba'),
    exact: true
  },
  {
    path: '/blog/welcome',
    component: ComponentCreator('/blog/welcome', 'cc8'),
    exact: true
  },
  {
    path: '/search',
    component: ComponentCreator('/search', 'f5a'),
    exact: true
  },
  {
    path: '/tags',
    component: ComponentCreator('/tags', '5f1'),
    exact: true
  },
  {
    path: '/tags/contributing',
    component: ComponentCreator('/tags/contributing', '298'),
    exact: true
  },
  {
    path: '/',
    component: ComponentCreator('/', 'c17'),
    routes: [
      {
        path: '/',
        component: ComponentCreator('/', '18e'),
        exact: true,
        sidebar: "home"
      },
      {
        path: '/cli/',
        component: ComponentCreator('/cli/', '973'),
        exact: true,
        sidebar: "cli"
      },
      {
        path: '/cli/commands',
        component: ComponentCreator('/cli/commands', '879'),
        exact: true,
        sidebar: "cli"
      },
      {
        path: '/cli/errors',
        component: ComponentCreator('/cli/errors', '67a'),
        exact: true,
        sidebar: "cli"
      },
      {
        path: '/cli/getting-started',
        component: ComponentCreator('/cli/getting-started', 'b9b'),
        exact: true
      },
      {
        path: '/cli/read',
        component: ComponentCreator('/cli/read', '46b'),
        exact: true
      },
      {
        path: '/cli/write',
        component: ComponentCreator('/cli/write', '537'),
        exact: true
      },
      {
        path: '/concepts/',
        component: ComponentCreator('/concepts/', 'f21'),
        exact: true
      },
      {
        path: '/concepts/nfts/',
        component: ComponentCreator('/concepts/nfts/', 'f24'),
        exact: true
      },
      {
        path: '/concepts/related/',
        component: ComponentCreator('/concepts/related/', '5f0'),
        exact: true
      },
      {
        path: '/concepts/related/uri-encoding',
        component: ComponentCreator('/concepts/related/uri-encoding', '877'),
        exact: true
      },
      {
        path: '/concepts/sql/',
        component: ComponentCreator('/concepts/sql/', '754'),
        exact: true
      },
      {
        path: '/concepts/sql/access-control',
        component: ComponentCreator('/concepts/sql/access-control', 'ecb'),
        exact: true
      },
      {
        path: '/concepts/sql/create-a-table',
        component: ComponentCreator('/concepts/sql/create-a-table', '4b6'),
        exact: true
      },
      {
        path: '/concepts/sql/delete',
        component: ComponentCreator('/concepts/sql/delete', 'db1'),
        exact: true
      },
      {
        path: '/concepts/sql/incrementing-values',
        component: ComponentCreator('/concepts/sql/incrementing-values', '53b'),
        exact: true
      },
      {
        path: '/concepts/sql/insert',
        component: ComponentCreator('/concepts/sql/insert', '005'),
        exact: true
      },
      {
        path: '/concepts/sql/mutating-data',
        component: ComponentCreator('/concepts/sql/mutating-data', '924'),
        exact: true
      },
      {
        path: '/concepts/sql/read',
        component: ComponentCreator('/concepts/sql/read', '057'),
        exact: true
      },
      {
        path: '/concepts/sql/sql-spec',
        component: ComponentCreator('/concepts/sql/sql-spec', '049'),
        exact: true
      },
      {
        path: '/concepts/sql/update',
        component: ComponentCreator('/concepts/sql/update', '960'),
        exact: true
      },
      {
        path: '/concepts/sql/upsert',
        component: ComponentCreator('/concepts/sql/upsert', '059'),
        exact: true
      },
      {
        path: '/contribute/',
        component: ComponentCreator('/contribute/', '126'),
        exact: true,
        sidebar: "contribute"
      },
      {
        path: '/contribute/maintainers',
        component: ComponentCreator('/contribute/maintainers', 'b9e'),
        exact: true,
        sidebar: "contribute"
      },
      {
        path: '/contribute/style-guide',
        component: ComponentCreator('/contribute/style-guide', '2fc'),
        exact: true,
        sidebar: "contribute"
      },
      {
        path: '/fundamentals/',
        component: ComponentCreator('/fundamentals/', 'f07'),
        exact: true,
        sidebar: "getStarted"
      },
      {
        path: '/fundamentals/about/general-faqs',
        component: ComponentCreator('/fundamentals/about/general-faqs', '3be'),
        exact: true,
        sidebar: "getStarted"
      },
      {
        path: '/fundamentals/about/open-beta',
        component: ComponentCreator('/fundamentals/about/open-beta', 'faf'),
        exact: true,
        sidebar: "getStarted"
      },
      {
        path: '/fundamentals/about/repos',
        component: ComponentCreator('/fundamentals/about/repos', '27e'),
        exact: true,
        sidebar: "getStarted"
      },
      {
        path: '/fundamentals/about/roadmap',
        component: ComponentCreator('/fundamentals/about/roadmap', '153'),
        exact: true,
        sidebar: "getStarted"
      },
      {
        path: '/fundamentals/about/use-cases',
        component: ComponentCreator('/fundamentals/about/use-cases', 'cd7'),
        exact: true,
        sidebar: "getStarted"
      },
      {
        path: '/fundamentals/architecture/',
        component: ComponentCreator('/fundamentals/architecture/', '683'),
        exact: true
      },
      {
        path: '/fundamentals/architecture/contracts',
        component: ComponentCreator('/fundamentals/architecture/contracts', '570'),
        exact: true,
        sidebar: "getStarted"
      },
      {
        path: '/fundamentals/architecture/gateway',
        component: ComponentCreator('/fundamentals/architecture/gateway', '5c3'),
        exact: true,
        sidebar: "getStarted"
      },
      {
        path: '/fundamentals/architecture/limits',
        component: ComponentCreator('/fundamentals/architecture/limits', '53c'),
        exact: true,
        sidebar: "getStarted"
      },
      {
        path: '/fundamentals/architecture/protocol-design',
        component: ComponentCreator('/fundamentals/architecture/protocol-design', '1bd'),
        exact: true,
        sidebar: "getStarted"
      },
      {
        path: '/fundamentals/architecture/table-token',
        component: ComponentCreator('/fundamentals/architecture/table-token', '45b'),
        exact: true,
        sidebar: "getStarted"
      },
      {
        path: '/fundamentals/chains/',
        component: ComponentCreator('/fundamentals/chains/', 'fdc'),
        exact: true,
        sidebar: "getStarted"
      },
      {
        path: '/fundamentals/chains/arbitrum',
        component: ComponentCreator('/fundamentals/chains/arbitrum', '833'),
        exact: true,
        sidebar: "getStarted"
      },
      {
        path: '/fundamentals/chains/ethereum',
        component: ComponentCreator('/fundamentals/chains/ethereum', '744'),
        exact: true,
        sidebar: "getStarted"
      },
      {
        path: '/fundamentals/chains/local',
        component: ComponentCreator('/fundamentals/chains/local', '76a'),
        exact: true,
        sidebar: "getStarted"
      },
      {
        path: '/fundamentals/chains/optimism',
        component: ComponentCreator('/fundamentals/chains/optimism', '4fd'),
        exact: true,
        sidebar: "getStarted"
      },
      {
        path: '/fundamentals/chains/polygon',
        component: ComponentCreator('/fundamentals/chains/polygon', '70d'),
        exact: true,
        sidebar: "getStarted"
      },
      {
        path: '/fundamentals/considerations-tradeoffs',
        component: ComponentCreator('/fundamentals/considerations-tradeoffs', '86b'),
        exact: true,
        sidebar: "getStarted"
      },
      {
        path: '/fundamentals/databases',
        component: ComponentCreator('/fundamentals/databases', 'a28'),
        exact: true,
        sidebar: "getStarted"
      },
      {
        path: '/fundamentals/quickstarts/',
        component: ComponentCreator('/fundamentals/quickstarts/', 'a9d'),
        exact: true,
        sidebar: "getStarted"
      },
      {
        path: '/fundamentals/quickstarts/api-quickstart',
        component: ComponentCreator('/fundamentals/quickstarts/api-quickstart', '668'),
        exact: true,
        sidebar: "getStarted"
      },
      {
        path: '/fundamentals/quickstarts/cli-quickstart',
        component: ComponentCreator('/fundamentals/quickstarts/cli-quickstart', '954'),
        exact: true,
        sidebar: "getStarted"
      },
      {
        path: '/fundamentals/quickstarts/sdk-quickstart',
        component: ComponentCreator('/fundamentals/quickstarts/sdk-quickstart', '3f1'),
        exact: true,
        sidebar: "getStarted"
      },
      {
        path: '/fundamentals/quickstarts/smart-contract-quickstart',
        component: ComponentCreator('/fundamentals/quickstarts/smart-contract-quickstart', '401'),
        exact: true,
        sidebar: "getStarted"
      },
      {
        path: '/fundamentals/what-is-tableland',
        component: ComponentCreator('/fundamentals/what-is-tableland', '3b0'),
        exact: true,
        sidebar: "getStarted"
      },
      {
        path: '/products/rigs/',
        component: ComponentCreator('/products/rigs/', '1a3'),
        exact: true
      },
      {
        path: '/products/rigs/rigs-discord',
        component: ComponentCreator('/products/rigs/rigs-discord', '537'),
        exact: true
      },
      {
        path: '/products/rigs/the-garage',
        component: ComponentCreator('/products/rigs/the-garage', 'a10'),
        exact: true
      },
      {
        path: '/products/rigs/what-are-rigs',
        component: ComponentCreator('/products/rigs/what-are-rigs', '6d8'),
        exact: true
      },
      {
        path: '/reference/sql-specification',
        component: ComponentCreator('/reference/sql-specification', '1ea'),
        exact: true,
        sidebar: "sqlSpecification"
      },
      {
        path: '/reference/validator-api',
        component: ComponentCreator('/reference/validator-api', 'd1f'),
        exact: true
      },
      {
        path: '/sdk/',
        component: ComponentCreator('/sdk/', '155'),
        exact: true,
        sidebar: "sdk"
      },
      {
        path: '/sdk/database/',
        component: ComponentCreator('/sdk/database/', '341'),
        exact: true,
        sidebar: "sdk"
      },
      {
        path: '/sdk/database/batching',
        component: ComponentCreator('/sdk/database/batching', 'dbe'),
        exact: true,
        sidebar: "sdk"
      },
      {
        path: '/sdk/database/orm',
        component: ComponentCreator('/sdk/database/orm', 'b10'),
        exact: true,
        sidebar: "sdk"
      },
      {
        path: '/sdk/database/prepared-statements',
        component: ComponentCreator('/sdk/database/prepared-statements', 'c80'),
        exact: true,
        sidebar: "sdk"
      },
      {
        path: '/sdk/database/query-statement-methods',
        component: ComponentCreator('/sdk/database/query-statement-methods', '47f'),
        exact: true,
        sidebar: "sdk"
      },
      {
        path: '/sdk/database/signers',
        component: ComponentCreator('/sdk/database/signers', 'fc6'),
        exact: true,
        sidebar: "sdk"
      },
      {
        path: '/sdk/database/timeouts',
        component: ComponentCreator('/sdk/database/timeouts', 'f35'),
        exact: true,
        sidebar: "sdk"
      },
      {
        path: '/sdk/database/type-conversion',
        component: ComponentCreator('/sdk/database/type-conversion', 'c62'),
        exact: true,
        sidebar: "sdk"
      },
      {
        path: '/sdk/database/upgrading-from-legacy',
        component: ComponentCreator('/sdk/database/upgrading-from-legacy', '6f6'),
        exact: true,
        sidebar: "sdk"
      },
      {
        path: '/sdk/errors',
        component: ComponentCreator('/sdk/errors', '177'),
        exact: true,
        sidebar: "sdk"
      },
      {
        path: '/sdk/frameworks/reactjs',
        component: ComponentCreator('/sdk/frameworks/reactjs', '8f4'),
        exact: true,
        sidebar: "sdk"
      },
      {
        path: '/sdk/frameworks/wagmi',
        component: ComponentCreator('/sdk/frameworks/wagmi', '92f'),
        exact: true,
        sidebar: "sdk"
      },
      {
        path: '/sdk/polling',
        component: ComponentCreator('/sdk/polling', '2a3'),
        exact: true
      },
      {
        path: '/sdk/registry/',
        component: ComponentCreator('/sdk/registry/', 'e52'),
        exact: true,
        sidebar: "sdk"
      },
      {
        path: '/sdk/sdk-faqs',
        component: ComponentCreator('/sdk/sdk-faqs', '0e1'),
        exact: true,
        sidebar: "sdk"
      },
      {
        path: '/sdk/validator/',
        component: ComponentCreator('/sdk/validator/', 'd92'),
        exact: true,
        sidebar: "sdk"
      },
      {
        path: '/smart-contracts/',
        component: ComponentCreator('/smart-contracts/', '269'),
        exact: true,
        sidebar: "smartContracts"
      },
      {
        path: '/smart-contracts/connect',
        component: ComponentCreator('/smart-contracts/connect', '7ae'),
        exact: true
      },
      {
        path: '/smart-contracts/create',
        component: ComponentCreator('/smart-contracts/create', '06f'),
        exact: true
      },
      {
        path: '/smart-contracts/getting-started',
        component: ComponentCreator('/smart-contracts/getting-started', '90c'),
        exact: true
      },
      {
        path: '/smart-contracts/read',
        component: ComponentCreator('/smart-contracts/read', 'b30'),
        exact: true
      },
      {
        path: '/smart-contracts/write',
        component: ComponentCreator('/smart-contracts/write', '186'),
        exact: true
      },
      {
        path: '/sql/',
        component: ComponentCreator('/sql/', '71d'),
        exact: true
      },
      {
        path: '/sql/access-control',
        component: ComponentCreator('/sql/access-control', 'b16'),
        exact: true
      },
      {
        path: '/sql/creating-tables',
        component: ComponentCreator('/sql/creating-tables', 'a29'),
        exact: true
      },
      {
        path: '/sql/read-queries',
        component: ComponentCreator('/sql/read-queries', '738'),
        exact: true
      },
      {
        path: '/sql/sql-spec',
        component: ComponentCreator('/sql/sql-spec', 'b23'),
        exact: true
      },
      {
        path: '/sql/write-queries',
        component: ComponentCreator('/sql/write-queries', 'a1a'),
        exact: true
      },
      {
        path: '/tools/',
        component: ComponentCreator('/tools/', '45c'),
        exact: true
      },
      {
        path: '/tools/local-tableland',
        component: ComponentCreator('/tools/local-tableland', '221'),
        exact: true
      },
      {
        path: '/tutorials/',
        component: ComponentCreator('/tutorials/', '7a8'),
        exact: true,
        sidebar: "tutorials"
      },
      {
        path: '/tutorials/deploying-nft-polygon',
        component: ComponentCreator('/tutorials/deploying-nft-polygon', '5ba'),
        exact: true,
        sidebar: "tutorials"
      },
      {
        path: '/tutorials/dynamic-nft-chainlink',
        component: ComponentCreator('/tutorials/dynamic-nft-chainlink', '93d'),
        exact: true,
        sidebar: "tutorials"
      },
      {
        path: '/tutorials/dynamic-nft-p5js',
        component: ComponentCreator('/tutorials/dynamic-nft-p5js', '054'),
        exact: true,
        sidebar: "tutorials"
      },
      {
        path: '/tutorials/dynamic-nft-solidity',
        component: ComponentCreator('/tutorials/dynamic-nft-solidity', '466'),
        exact: true,
        sidebar: "tutorials"
      },
      {
        path: '/tutorials/table-reads-chainlink',
        component: ComponentCreator('/tutorials/table-reads-chainlink', 'a4f'),
        exact: true,
        sidebar: "tutorials"
      },
      {
        path: '/validator-api/',
        component: ComponentCreator('/validator-api/', '9df'),
        exact: true,
        sidebar: "validatorApi"
      },
      {
        path: '/validator-api/endpoints',
        component: ComponentCreator('/validator-api/endpoints', '371'),
        exact: true,
        sidebar: "validatorApi"
      },
      {
        path: '/validator-api/errors',
        component: ComponentCreator('/validator-api/errors', '114'),
        exact: true,
        sidebar: "validatorApi"
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
