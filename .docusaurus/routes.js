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
    component: ComponentCreator('/', '230'),
    routes: [
      {
        path: '/',
        component: ComponentCreator('/', '18e'),
        exact: true,
        sidebar: "home"
      },
      {
        path: '/api/',
        component: ComponentCreator('/api/', '289'),
        exact: true
      },
      {
        path: '/api/endpoints',
        component: ComponentCreator('/api/endpoints', '9a0'),
        exact: true
      },
      {
        path: '/api/errors',
        component: ComponentCreator('/api/errors', 'ec4'),
        exact: true
      },
      {
        path: '/api/gateways',
        component: ComponentCreator('/api/gateways', 'c85'),
        exact: true
      },
      {
        path: '/cli/',
        component: ComponentCreator('/cli/', '743'),
        exact: true
      },
      {
        path: '/cli/connect',
        component: ComponentCreator('/cli/connect', 'd61'),
        exact: true
      },
      {
        path: '/cli/create',
        component: ComponentCreator('/cli/create', '523'),
        exact: true
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
        path: '/concepts/faqs',
        component: ComponentCreator('/concepts/faqs', '7fb'),
        exact: true
      },
      {
        path: '/concepts/network/considerations-tradeoffs',
        component: ComponentCreator('/concepts/network/considerations-tradeoffs', 'a6a'),
        exact: true
      },
      {
        path: '/concepts/network/open-beta',
        component: ComponentCreator('/concepts/network/open-beta', '763'),
        exact: true
      },
      {
        path: '/concepts/network/tableland-state',
        component: ComponentCreator('/concepts/network/tableland-state', '020'),
        exact: true
      },
      {
        path: '/concepts/network/use-cases',
        component: ComponentCreator('/concepts/network/use-cases', '9fa'),
        exact: true
      },
      {
        path: '/concepts/network/what-is-tableland',
        component: ComponentCreator('/concepts/network/what-is-tableland', '3ea'),
        exact: true
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
        component: ComponentCreator('/contribute/', '5d4'),
        exact: true
      },
      {
        path: '/contribute/maintainers',
        component: ComponentCreator('/contribute/maintainers', '595'),
        exact: true
      },
      {
        path: '/contribute/style-guide',
        component: ComponentCreator('/contribute/style-guide', 'dbc'),
        exact: true
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
        path: '/develop/reference/',
        component: ComponentCreator('/develop/reference/', '786'),
        exact: true
      },
      {
        path: '/develop/reference/contracts',
        component: ComponentCreator('/develop/reference/contracts', '5e2'),
        exact: true
      },
      {
        path: '/develop/reference/limits',
        component: ComponentCreator('/develop/reference/limits', '6f7'),
        exact: true
      },
      {
        path: '/develop/reference/repos',
        component: ComponentCreator('/develop/reference/repos', '2ed'),
        exact: true
      },
      {
        path: '/develop/reference/response-times',
        component: ComponentCreator('/develop/reference/response-times', '1d5'),
        exact: true
      },
      {
        path: '/develop/reference/table-names',
        component: ComponentCreator('/develop/reference/table-names', '27c'),
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
        path: '/sdk/',
        component: ComponentCreator('/sdk/', '783'),
        exact: true
      },
      {
        path: '/sdk/connect',
        component: ComponentCreator('/sdk/connect', '2d1'),
        exact: true
      },
      {
        path: '/sdk/create',
        component: ComponentCreator('/sdk/create', '783'),
        exact: true
      },
      {
        path: '/sdk/getting-started',
        component: ComponentCreator('/sdk/getting-started', '4e5'),
        exact: true
      },
      {
        path: '/sdk/read',
        component: ComponentCreator('/sdk/read', 'd06'),
        exact: true
      },
      {
        path: '/sdk/write',
        component: ComponentCreator('/sdk/write', '946'),
        exact: true
      },
      {
        path: '/smart-contracts/',
        component: ComponentCreator('/smart-contracts/', 'b28'),
        exact: true
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
        component: ComponentCreator('/tutorials/', 'eec'),
        exact: true
      },
      {
        path: '/tutorials/dynamic-nft-chainlink',
        component: ComponentCreator('/tutorials/dynamic-nft-chainlink', 'f0f'),
        exact: true
      },
      {
        path: '/tutorials/dynamic-nft-p5js',
        component: ComponentCreator('/tutorials/dynamic-nft-p5js', 'afd'),
        exact: true
      },
      {
        path: '/tutorials/dynamic-nft-solidity',
        component: ComponentCreator('/tutorials/dynamic-nft-solidity', '48b'),
        exact: true
      },
      {
        path: '/tutorials/overview',
        component: ComponentCreator('/tutorials/overview', '6b6'),
        exact: true
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
