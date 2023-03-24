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
    component: ComponentCreator('/', '389'),
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
        component: ComponentCreator('/fundamentals/', '4df'),
        exact: true,
        sidebar: "fundamentals"
      },
      {
        path: '/fundamentals/about/general-faqs',
        component: ComponentCreator('/fundamentals/about/general-faqs', '718'),
        exact: true,
        sidebar: "fundamentals"
      },
      {
        path: '/fundamentals/about/glossary',
        component: ComponentCreator('/fundamentals/about/glossary', 'a6b'),
        exact: true,
        sidebar: "fundamentals"
      },
      {
        path: '/fundamentals/about/open-beta',
        component: ComponentCreator('/fundamentals/about/open-beta', '2b2'),
        exact: true,
        sidebar: "fundamentals"
      },
      {
        path: '/fundamentals/about/repos',
        component: ComponentCreator('/fundamentals/about/repos', 'e74'),
        exact: true,
        sidebar: "fundamentals"
      },
      {
        path: '/fundamentals/about/roadmap',
        component: ComponentCreator('/fundamentals/about/roadmap', '5d4'),
        exact: true,
        sidebar: "fundamentals"
      },
      {
        path: '/fundamentals/architecture/gateway',
        component: ComponentCreator('/fundamentals/architecture/gateway', '5db'),
        exact: true,
        sidebar: "fundamentals"
      },
      {
        path: '/fundamentals/architecture/limits',
        component: ComponentCreator('/fundamentals/architecture/limits', '5bc'),
        exact: true,
        sidebar: "fundamentals"
      },
      {
        path: '/fundamentals/architecture/protocol-design',
        component: ComponentCreator('/fundamentals/architecture/protocol-design', '8ef'),
        exact: true,
        sidebar: "fundamentals"
      },
      {
        path: '/fundamentals/architecture/table-token',
        component: ComponentCreator('/fundamentals/architecture/table-token', '4c3'),
        exact: true,
        sidebar: "fundamentals"
      },
      {
        path: '/fundamentals/chains/',
        component: ComponentCreator('/fundamentals/chains/', '8a1'),
        exact: true,
        sidebar: "fundamentals"
      },
      {
        path: '/fundamentals/chains/arbitrum',
        component: ComponentCreator('/fundamentals/chains/arbitrum', 'a8e'),
        exact: true,
        sidebar: "fundamentals"
      },
      {
        path: '/fundamentals/chains/ethereum',
        component: ComponentCreator('/fundamentals/chains/ethereum', '945'),
        exact: true,
        sidebar: "fundamentals"
      },
      {
        path: '/fundamentals/chains/local',
        component: ComponentCreator('/fundamentals/chains/local', '73d'),
        exact: true,
        sidebar: "fundamentals"
      },
      {
        path: '/fundamentals/chains/optimism',
        component: ComponentCreator('/fundamentals/chains/optimism', 'cf6'),
        exact: true,
        sidebar: "fundamentals"
      },
      {
        path: '/fundamentals/chains/polygon',
        component: ComponentCreator('/fundamentals/chains/polygon', '8d6'),
        exact: true,
        sidebar: "fundamentals"
      },
      {
        path: '/fundamentals/concepts/nft-metadata',
        component: ComponentCreator('/fundamentals/concepts/nft-metadata', 'ab3'),
        exact: true,
        sidebar: "fundamentals"
      },
      {
        path: '/fundamentals/concepts/use-cases',
        component: ComponentCreator('/fundamentals/concepts/use-cases', 'da1'),
        exact: true,
        sidebar: "fundamentals"
      },
      {
        path: '/fundamentals/considerations-tradeoffs',
        component: ComponentCreator('/fundamentals/considerations-tradeoffs', 'bb2'),
        exact: true,
        sidebar: "fundamentals"
      },
      {
        path: '/fundamentals/databases',
        component: ComponentCreator('/fundamentals/databases', '690'),
        exact: true,
        sidebar: "fundamentals"
      },
      {
        path: '/fundamentals/quickstarts/',
        component: ComponentCreator('/fundamentals/quickstarts/', '401'),
        exact: true,
        sidebar: "fundamentals"
      },
      {
        path: '/fundamentals/quickstarts/api-quickstart',
        component: ComponentCreator('/fundamentals/quickstarts/api-quickstart', '008'),
        exact: true,
        sidebar: "fundamentals"
      },
      {
        path: '/fundamentals/quickstarts/cli-quickstart',
        component: ComponentCreator('/fundamentals/quickstarts/cli-quickstart', '0f1'),
        exact: true,
        sidebar: "fundamentals"
      },
      {
        path: '/fundamentals/quickstarts/sdk-quickstart',
        component: ComponentCreator('/fundamentals/quickstarts/sdk-quickstart', 'dcd'),
        exact: true,
        sidebar: "fundamentals"
      },
      {
        path: '/fundamentals/quickstarts/smart-contract-quickstart',
        component: ComponentCreator('/fundamentals/quickstarts/smart-contract-quickstart', '2b5'),
        exact: true,
        sidebar: "fundamentals"
      },
      {
        path: '/fundamentals/what-is-tableland',
        component: ComponentCreator('/fundamentals/what-is-tableland', 'ced'),
        exact: true,
        sidebar: "fundamentals"
      },
      {
        path: '/playbooks/',
        component: ComponentCreator('/playbooks/', '96b'),
        exact: true,
        sidebar: "playbooks"
      },
      {
        path: '/playbooks/sql/',
        component: ComponentCreator('/playbooks/sql/', '4ae'),
        exact: true,
        sidebar: "playbooks"
      },
      {
        path: '/playbooks/sql/access-control',
        component: ComponentCreator('/playbooks/sql/access-control', '2a7'),
        exact: true,
        sidebar: "playbooks"
      },
      {
        path: '/playbooks/sql/composing-data',
        component: ComponentCreator('/playbooks/sql/composing-data', 'd93'),
        exact: true,
        sidebar: "playbooks"
      },
      {
        path: '/playbooks/sql/create',
        component: ComponentCreator('/playbooks/sql/create', 'cb4'),
        exact: true,
        sidebar: "playbooks"
      },
      {
        path: '/playbooks/sql/functions',
        component: ComponentCreator('/playbooks/sql/functions', '924'),
        exact: true,
        sidebar: "playbooks"
      },
      {
        path: '/playbooks/sql/incrementing-values',
        component: ComponentCreator('/playbooks/sql/incrementing-values', '954'),
        exact: true,
        sidebar: "playbooks"
      },
      {
        path: '/playbooks/sql/read',
        component: ComponentCreator('/playbooks/sql/read', '942'),
        exact: true,
        sidebar: "playbooks"
      },
      {
        path: '/playbooks/sql/write',
        component: ComponentCreator('/playbooks/sql/write', '0aa'),
        exact: true,
        sidebar: "playbooks"
      },
      {
        path: '/playbooks/walkthroughs/key-value',
        component: ComponentCreator('/playbooks/walkthroughs/key-value', 'c8f'),
        exact: true,
        sidebar: "playbooks"
      },
      {
        path: '/playbooks/walkthroughs/nft-metadata',
        component: ComponentCreator('/playbooks/walkthroughs/nft-metadata', '960'),
        exact: true,
        sidebar: "playbooks"
      },
      {
        path: '/playbooks/walkthroughs/sql-faqs',
        component: ComponentCreator('/playbooks/walkthroughs/sql-faqs', 'ad2'),
        exact: true,
        sidebar: "playbooks"
      },
      {
        path: '/sdk/',
        component: ComponentCreator('/sdk/', '155'),
        exact: true,
        sidebar: "sdk"
      },
      {
        path: '/sdk/core/',
        component: ComponentCreator('/sdk/core/', 'e23'),
        exact: true,
        sidebar: "sdk"
      },
      {
        path: '/sdk/core/batching',
        component: ComponentCreator('/sdk/core/batching', 'a8a'),
        exact: true,
        sidebar: "sdk"
      },
      {
        path: '/sdk/core/prepared-statements',
        component: ComponentCreator('/sdk/core/prepared-statements', 'f95'),
        exact: true,
        sidebar: "sdk"
      },
      {
        path: '/sdk/core/query-statement-methods',
        component: ComponentCreator('/sdk/core/query-statement-methods', 'd35'),
        exact: true,
        sidebar: "sdk"
      },
      {
        path: '/sdk/core/registry-api',
        component: ComponentCreator('/sdk/core/registry-api', 'e80'),
        exact: true,
        sidebar: "sdk"
      },
      {
        path: '/sdk/core/signers',
        component: ComponentCreator('/sdk/core/signers', '4b6'),
        exact: true,
        sidebar: "sdk"
      },
      {
        path: '/sdk/core/timeouts',
        component: ComponentCreator('/sdk/core/timeouts', 'eb9'),
        exact: true,
        sidebar: "sdk"
      },
      {
        path: '/sdk/core/validator-api',
        component: ComponentCreator('/sdk/core/validator-api', '2bf'),
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
        path: '/sdk/reference/errors',
        component: ComponentCreator('/sdk/reference/errors', '683'),
        exact: true,
        sidebar: "sdk"
      },
      {
        path: '/sdk/reference/orm',
        component: ComponentCreator('/sdk/reference/orm', '92d'),
        exact: true,
        sidebar: "sdk"
      },
      {
        path: '/sdk/reference/sdk-faqs',
        component: ComponentCreator('/sdk/reference/sdk-faqs', 'a29'),
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
        path: '/smart-contracts/configuring-table-write-access',
        component: ComponentCreator('/smart-contracts/configuring-table-write-access', '4d6'),
        exact: true,
        sidebar: "smartContracts"
      },
      {
        path: '/smart-contracts/contracts',
        component: ComponentCreator('/smart-contracts/contracts', '31b'),
        exact: true,
        sidebar: "smartContracts"
      },
      {
        path: '/smart-contracts/creating-tables-from-contracts',
        component: ComponentCreator('/smart-contracts/creating-tables-from-contracts', '4c7'),
        exact: true,
        sidebar: "smartContracts"
      },
      {
        path: '/smart-contracts/getting-started',
        component: ComponentCreator('/smart-contracts/getting-started', '90c'),
        exact: true
      },
      {
        path: '/smart-contracts/immutable-table',
        component: ComponentCreator('/smart-contracts/immutable-table', '0be'),
        exact: true,
        sidebar: "smartContracts"
      },
      {
        path: '/smart-contracts/serving-nft-metadata',
        component: ComponentCreator('/smart-contracts/serving-nft-metadata', '31e'),
        exact: true,
        sidebar: "smartContracts"
      },
      {
        path: '/smart-contracts/solidity-to-sql-types',
        component: ComponentCreator('/smart-contracts/solidity-to-sql-types', '4ab'),
        exact: true,
        sidebar: "smartContracts"
      },
      {
        path: '/smart-contracts/uri-encoding',
        component: ComponentCreator('/smart-contracts/uri-encoding', 'eee'),
        exact: true,
        sidebar: "smartContracts"
      },
      {
        path: '/smart-contracts/using-remix',
        component: ComponentCreator('/smart-contracts/using-remix', 'c97'),
        exact: true,
        sidebar: "smartContracts"
      },
      {
        path: '/specs/sql/',
        component: ComponentCreator('/specs/sql/', 'f07'),
        exact: true,
        sidebar: "sqlSpecification"
      },
      {
        path: '/specs/validator-api',
        component: ComponentCreator('/specs/validator-api', '421'),
        exact: true
      },
      {
        path: '/tools/local-tableland',
        component: ComponentCreator('/tools/local-tableland', 'ce5'),
        exact: true,
        sidebar: "home"
      },
      {
        path: '/tutorials/',
        component: ComponentCreator('/tutorials/', '7a8'),
        exact: true,
        sidebar: "tutorials"
      },
      {
        path: '/tutorials/building-games-on-arbitrum',
        component: ComponentCreator('/tutorials/building-games-on-arbitrum', '695'),
        exact: true,
        sidebar: "tutorials"
      },
      {
        path: '/tutorials/data-dao-polygon',
        component: ComponentCreator('/tutorials/data-dao-polygon', 'e8e'),
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
        path: '/tutorials/json-files-nft-polygon',
        component: ComponentCreator('/tutorials/json-files-nft-polygon', 'e80'),
        exact: true,
        sidebar: "tutorials"
      },
      {
        path: '/tutorials/key-value-store-nft',
        component: ComponentCreator('/tutorials/key-value-store-nft', '2ac'),
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
        component: ComponentCreator('/validator-api/errors', '076'),
        exact: true
      },
      {
        path: '/validator-api/query-formatting',
        component: ComponentCreator('/validator-api/query-formatting', 'd39'),
        exact: true,
        sidebar: "validatorApi"
      },
      {
        path: '/validator/',
        component: ComponentCreator('/validator/', '8e2'),
        exact: true,
        sidebar: "validator"
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
