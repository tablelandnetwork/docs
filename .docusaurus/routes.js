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
    component: ComponentCreator('/', 'b92'),
    routes: [
      {
        path: '/',
        component: ComponentCreator('/', '18e'),
        exact: true,
        sidebar: "home"
      },
      {
        path: '/cli/',
        component: ComponentCreator('/cli/', '149'),
        exact: true,
        sidebar: "guides"
      },
      {
        path: '/cli/connect',
        component: ComponentCreator('/cli/connect', '412'),
        exact: true,
        sidebar: "guides"
      },
      {
        path: '/cli/create',
        component: ComponentCreator('/cli/create', '895'),
        exact: true,
        sidebar: "guides"
      },
      {
        path: '/cli/getting-started',
        component: ComponentCreator('/cli/getting-started', '044'),
        exact: true,
        sidebar: "guides"
      },
      {
        path: '/cli/read',
        component: ComponentCreator('/cli/read', '2dc'),
        exact: true,
        sidebar: "guides"
      },
      {
        path: '/cli/write',
        component: ComponentCreator('/cli/write', '18f'),
        exact: true,
        sidebar: "guides"
      },
      {
        path: '/concepts/',
        component: ComponentCreator('/concepts/', '725'),
        exact: true,
        sidebar: "concepts"
      },
      {
        path: '/concepts/faqs',
        component: ComponentCreator('/concepts/faqs', '7fb'),
        exact: true
      },
      {
        path: '/concepts/network/considerations-tradeoffs',
        component: ComponentCreator('/concepts/network/considerations-tradeoffs', '26b'),
        exact: true,
        sidebar: "concepts"
      },
      {
        path: '/concepts/network/open-beta',
        component: ComponentCreator('/concepts/network/open-beta', '781'),
        exact: true,
        sidebar: "concepts"
      },
      {
        path: '/concepts/network/tableland-state',
        component: ComponentCreator('/concepts/network/tableland-state', 'f8c'),
        exact: true,
        sidebar: "concepts"
      },
      {
        path: '/concepts/network/use-cases',
        component: ComponentCreator('/concepts/network/use-cases', '924'),
        exact: true,
        sidebar: "concepts"
      },
      {
        path: '/concepts/network/what-is-tableland',
        component: ComponentCreator('/concepts/network/what-is-tableland', '6f2'),
        exact: true,
        sidebar: "concepts"
      },
      {
        path: '/concepts/related/',
        component: ComponentCreator('/concepts/related/', '5f0'),
        exact: true
      },
      {
        path: '/concepts/related/databases',
        component: ComponentCreator('/concepts/related/databases', '79f'),
        exact: true
      },
      {
        path: '/concepts/related/roadmap',
        component: ComponentCreator('/concepts/related/roadmap', 'b8c'),
        exact: true
      },
      {
        path: '/concepts/related/uri-encoding',
        component: ComponentCreator('/concepts/related/uri-encoding', '877'),
        exact: true
      },
      {
        path: '/concepts/sql/',
        component: ComponentCreator('/concepts/sql/', '084'),
        exact: true,
        sidebar: "sql"
      },
      {
        path: '/concepts/sql/access-control',
        component: ComponentCreator('/concepts/sql/access-control', '6b8'),
        exact: true,
        sidebar: "sql"
      },
      {
        path: '/concepts/sql/create-a-table',
        component: ComponentCreator('/concepts/sql/create-a-table', 'a30'),
        exact: true,
        sidebar: "sql"
      },
      {
        path: '/concepts/sql/delete',
        component: ComponentCreator('/concepts/sql/delete', 'b5a'),
        exact: true,
        sidebar: "sql"
      },
      {
        path: '/concepts/sql/incrementing-values',
        component: ComponentCreator('/concepts/sql/incrementing-values', '300'),
        exact: true,
        sidebar: "sql"
      },
      {
        path: '/concepts/sql/insert',
        component: ComponentCreator('/concepts/sql/insert', '87f'),
        exact: true,
        sidebar: "sql"
      },
      {
        path: '/concepts/sql/mutating-data',
        component: ComponentCreator('/concepts/sql/mutating-data', '4ea'),
        exact: true,
        sidebar: "sql"
      },
      {
        path: '/concepts/sql/read',
        component: ComponentCreator('/concepts/sql/read', '32a'),
        exact: true,
        sidebar: "sql"
      },
      {
        path: '/concepts/sql/sql-spec',
        component: ComponentCreator('/concepts/sql/sql-spec', '99a'),
        exact: true,
        sidebar: "sql"
      },
      {
        path: '/concepts/sql/update',
        component: ComponentCreator('/concepts/sql/update', '81d'),
        exact: true,
        sidebar: "sql"
      },
      {
        path: '/concepts/sql/upsert',
        component: ComponentCreator('/concepts/sql/upsert', '05d'),
        exact: true,
        sidebar: "sql"
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
        path: '/develop/',
        component: ComponentCreator('/develop/', 'f18'),
        exact: true
      },
      {
        path: '/develop/chains/',
        component: ComponentCreator('/develop/chains/', '4f2'),
        exact: true
      },
      {
        path: '/develop/chains/arbitrum',
        component: ComponentCreator('/develop/chains/arbitrum', '206'),
        exact: true
      },
      {
        path: '/develop/chains/ethereum',
        component: ComponentCreator('/develop/chains/ethereum', '4bf'),
        exact: true
      },
      {
        path: '/develop/chains/local',
        component: ComponentCreator('/develop/chains/local', '29f'),
        exact: true
      },
      {
        path: '/develop/chains/optimism',
        component: ComponentCreator('/develop/chains/optimism', '196'),
        exact: true
      },
      {
        path: '/develop/chains/polygon',
        component: ComponentCreator('/develop/chains/polygon', '6a5'),
        exact: true
      },
      {
        path: '/develop/integrations/chainlink',
        component: ComponentCreator('/develop/integrations/chainlink', 'f1b'),
        exact: true
      },
      {
        path: '/develop/integrations/filecoin',
        component: ComponentCreator('/develop/integrations/filecoin', 'ce4'),
        exact: true
      },
      {
        path: '/develop/integrations/ipfs',
        component: ComponentCreator('/develop/integrations/ipfs', '4a7'),
        exact: true
      },
      {
        path: '/develop/integrations/lit-protocol',
        component: ComponentCreator('/develop/integrations/lit-protocol', '83e'),
        exact: true
      },
      {
        path: '/develop/integrations/nucypher',
        component: ComponentCreator('/develop/integrations/nucypher', 'dd4'),
        exact: true
      },
      {
        path: '/develop/integrations/overview',
        component: ComponentCreator('/develop/integrations/overview', '2ea'),
        exact: true
      },
      {
        path: '/develop/integrations/toucan',
        component: ComponentCreator('/develop/integrations/toucan', '405'),
        exact: true
      },
      {
        path: '/develop/tools/',
        component: ComponentCreator('/develop/tools/', '83b'),
        exact: true
      },
      {
        path: '/develop/tools/local-tableland',
        component: ComponentCreator('/develop/tools/local-tableland', '88b'),
        exact: true
      },
      {
        path: '/guides/',
        component: ComponentCreator('/guides/', '5f0'),
        exact: true,
        sidebar: "guides"
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
        path: '/protocol/validator-spec',
        component: ComponentCreator('/protocol/validator-spec', '7ce'),
        exact: true
      },
      {
        path: '/reference/',
        component: ComponentCreator('/reference/', '1b0'),
        exact: true,
        sidebar: "reference"
      },
      {
        path: '/reference/contracts',
        component: ComponentCreator('/reference/contracts', '33a'),
        exact: true,
        sidebar: "reference"
      },
      {
        path: '/reference/limits',
        component: ComponentCreator('/reference/limits', '060'),
        exact: true,
        sidebar: "reference"
      },
      {
        path: '/reference/repos',
        component: ComponentCreator('/reference/repos', '654'),
        exact: true,
        sidebar: "reference"
      },
      {
        path: '/reference/response-times',
        component: ComponentCreator('/reference/response-times', '7b6'),
        exact: true,
        sidebar: "reference"
      },
      {
        path: '/reference/table-names',
        component: ComponentCreator('/reference/table-names', 'fee'),
        exact: true,
        sidebar: "reference"
      },
      {
        path: '/sdk/',
        component: ComponentCreator('/sdk/', '68e'),
        exact: true,
        sidebar: "guides"
      },
      {
        path: '/sdk/connect',
        component: ComponentCreator('/sdk/connect', 'd65'),
        exact: true,
        sidebar: "guides"
      },
      {
        path: '/sdk/create',
        component: ComponentCreator('/sdk/create', '5b5'),
        exact: true,
        sidebar: "guides"
      },
      {
        path: '/sdk/getting-started',
        component: ComponentCreator('/sdk/getting-started', '194'),
        exact: true,
        sidebar: "guides"
      },
      {
        path: '/sdk/read',
        component: ComponentCreator('/sdk/read', 'e59'),
        exact: true,
        sidebar: "guides"
      },
      {
        path: '/sdk/write',
        component: ComponentCreator('/sdk/write', 'e38'),
        exact: true,
        sidebar: "guides"
      },
      {
        path: '/smart-contracts/',
        component: ComponentCreator('/smart-contracts/', '41f'),
        exact: true,
        sidebar: "guides"
      },
      {
        path: '/smart-contracts/connect',
        component: ComponentCreator('/smart-contracts/connect', '9a2'),
        exact: true,
        sidebar: "guides"
      },
      {
        path: '/smart-contracts/create',
        component: ComponentCreator('/smart-contracts/create', '8bb'),
        exact: true,
        sidebar: "guides"
      },
      {
        path: '/smart-contracts/getting-started',
        component: ComponentCreator('/smart-contracts/getting-started', 'af8'),
        exact: true,
        sidebar: "guides"
      },
      {
        path: '/smart-contracts/read',
        component: ComponentCreator('/smart-contracts/read', '78a'),
        exact: true,
        sidebar: "guides"
      },
      {
        path: '/smart-contracts/write',
        component: ComponentCreator('/smart-contracts/write', 'cee'),
        exact: true,
        sidebar: "guides"
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
        path: '/sql/overview',
        component: ComponentCreator('/sql/overview', 'f0f'),
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
        path: '/tutorials/',
        component: ComponentCreator('/tutorials/', '7a8'),
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
        path: '/tutorials/overview',
        component: ComponentCreator('/tutorials/overview', '6b6'),
        exact: true
      },
      {
        path: '/validator-api/',
        component: ComponentCreator('/validator-api/', '914'),
        exact: true,
        sidebar: "guides"
      },
      {
        path: '/validator-api/endpoints',
        component: ComponentCreator('/validator-api/endpoints', '583'),
        exact: true,
        sidebar: "guides"
      },
      {
        path: '/validator-api/errors',
        component: ComponentCreator('/validator-api/errors', 'b67'),
        exact: true,
        sidebar: "guides"
      },
      {
        path: '/validator-api/gateways',
        component: ComponentCreator('/validator-api/gateways', '5ca'),
        exact: true,
        sidebar: "guides"
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
