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
    component: ComponentCreator('/', 'c40'),
    exact: true
  },
  {
    path: '/',
    component: ComponentCreator('/', '3fb'),
    routes: [
      {
        path: '/about/',
        component: ComponentCreator('/about/', 'c95'),
        exact: true
      },
      {
        path: '/about/blockchain/what-is-blockchain',
        component: ComponentCreator('/about/blockchain/what-is-blockchain', 'fd0'),
        exact: true
      },
      {
        path: '/about/faqs/community-faqs',
        component: ComponentCreator('/about/faqs/community-faqs', '53e'),
        exact: true
      },
      {
        path: '/about/faqs/protocol-faqs',
        component: ComponentCreator('/about/faqs/protocol-faqs', '707'),
        exact: true
      },
      {
        path: '/about/faqs/rigs-faqs',
        component: ComponentCreator('/about/faqs/rigs-faqs', '453'),
        exact: true
      },
      {
        path: '/about/rigs/overview',
        component: ComponentCreator('/about/rigs/overview', 'b2d'),
        exact: true
      },
      {
        path: '/about/rigs/rigs-discord',
        component: ComponentCreator('/about/rigs/rigs-discord', '6e9'),
        exact: true
      },
      {
        path: '/about/rigs/the-garage',
        component: ComponentCreator('/about/rigs/the-garage', '847'),
        exact: true
      },
      {
        path: '/about/rigs/what-are-rigs',
        component: ComponentCreator('/about/rigs/what-are-rigs', '732'),
        exact: true
      },
      {
        path: '/about/sql/what-is-sql',
        component: ComponentCreator('/about/sql/what-is-sql', '5ec'),
        exact: true
      },
      {
        path: '/about/tableland/how-does-tableland-work',
        component: ComponentCreator('/about/tableland/how-does-tableland-work', '775'),
        exact: true
      },
      {
        path: '/about/tableland/open-beta',
        component: ComponentCreator('/about/tableland/open-beta', 'd2f'),
        exact: true
      },
      {
        path: '/about/tableland/overview',
        component: ComponentCreator('/about/tableland/overview', '8a6'),
        exact: true
      },
      {
        path: '/about/tableland/vision-roadmap',
        component: ComponentCreator('/about/tableland/vision-roadmap', '691'),
        exact: true
      },
      {
        path: '/about/tableland/what-is-tableland',
        component: ComponentCreator('/about/tableland/what-is-tableland', 'd88'),
        exact: true
      },
      {
        path: '/api/',
        component: ComponentCreator('/api/', 'fac'),
        exact: true,
        sidebar: "develop"
      },
      {
        path: '/api/endpoints',
        component: ComponentCreator('/api/endpoints', '137'),
        exact: true,
        sidebar: "develop"
      },
      {
        path: '/api/errors',
        component: ComponentCreator('/api/errors', '0c9'),
        exact: true,
        sidebar: "develop"
      },
      {
        path: '/api/gateways',
        component: ComponentCreator('/api/gateways', '489'),
        exact: true,
        sidebar: "develop"
      },
      {
        path: '/category/tutorials',
        component: ComponentCreator('/category/tutorials', '710'),
        exact: true,
        sidebar: "tutorials"
      },
      {
        path: '/cli/',
        component: ComponentCreator('/cli/', '41a'),
        exact: true,
        sidebar: "develop"
      },
      {
        path: '/cli/connect',
        component: ComponentCreator('/cli/connect', '3cc'),
        exact: true,
        sidebar: "develop"
      },
      {
        path: '/cli/create',
        component: ComponentCreator('/cli/create', '145'),
        exact: true,
        sidebar: "develop"
      },
      {
        path: '/cli/getting-started',
        component: ComponentCreator('/cli/getting-started', '6c2'),
        exact: true,
        sidebar: "develop"
      },
      {
        path: '/cli/read',
        component: ComponentCreator('/cli/read', '3a3'),
        exact: true,
        sidebar: "develop"
      },
      {
        path: '/cli/write',
        component: ComponentCreator('/cli/write', '5c0'),
        exact: true,
        sidebar: "develop"
      },
      {
        path: '/concepts/',
        component: ComponentCreator('/concepts/', '725'),
        exact: true,
        sidebar: "concepts"
      },
      {
        path: '/concepts/network/considerations-tradeoffs',
        component: ComponentCreator('/concepts/network/considerations-tradeoffs', '26b'),
        exact: true,
        sidebar: "concepts"
      },
      {
        path: '/concepts/network/databases',
        component: ComponentCreator('/concepts/network/databases', '236'),
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
        path: '/concepts/network/roadmap',
        component: ComponentCreator('/concepts/network/roadmap', '902'),
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
        path: '/concepts/network/what-is-tableland',
        component: ComponentCreator('/concepts/network/what-is-tableland', '6f2'),
        exact: true,
        sidebar: "concepts"
      },
      {
        path: '/concepts/sql/',
        component: ComponentCreator('/concepts/sql/', 'ca2'),
        exact: true,
        sidebar: "concepts"
      },
      {
        path: '/concepts/sql/access-control',
        component: ComponentCreator('/concepts/sql/access-control', '69f'),
        exact: true,
        sidebar: "concepts"
      },
      {
        path: '/concepts/sql/create-a-table',
        component: ComponentCreator('/concepts/sql/create-a-table', 'b2e'),
        exact: true,
        sidebar: "concepts"
      },
      {
        path: '/concepts/sql/delete',
        component: ComponentCreator('/concepts/sql/delete', 'a1b'),
        exact: true,
        sidebar: "concepts"
      },
      {
        path: '/concepts/sql/insert',
        component: ComponentCreator('/concepts/sql/insert', '6ea'),
        exact: true,
        sidebar: "concepts"
      },
      {
        path: '/concepts/sql/mutating-data',
        component: ComponentCreator('/concepts/sql/mutating-data', 'ebe'),
        exact: true,
        sidebar: "concepts"
      },
      {
        path: '/concepts/sql/read',
        component: ComponentCreator('/concepts/sql/read', 'fa5'),
        exact: true,
        sidebar: "concepts"
      },
      {
        path: '/concepts/sql/sql-spec',
        component: ComponentCreator('/concepts/sql/sql-spec', '94f'),
        exact: true,
        sidebar: "concepts"
      },
      {
        path: '/concepts/sql/update',
        component: ComponentCreator('/concepts/sql/update', '768'),
        exact: true,
        sidebar: "concepts"
      },
      {
        path: '/concepts/sql/upsert',
        component: ComponentCreator('/concepts/sql/upsert', 'b95'),
        exact: true,
        sidebar: "concepts"
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
        component: ComponentCreator('/develop/', 'b14'),
        exact: true,
        sidebar: "develop"
      },
      {
        path: '/develop/chains/',
        component: ComponentCreator('/develop/chains/', 'b58'),
        exact: true,
        sidebar: "develop"
      },
      {
        path: '/develop/chains/arbitrum',
        component: ComponentCreator('/develop/chains/arbitrum', '9b2'),
        exact: true,
        sidebar: "develop"
      },
      {
        path: '/develop/chains/ethereum',
        component: ComponentCreator('/develop/chains/ethereum', '13a'),
        exact: true,
        sidebar: "develop"
      },
      {
        path: '/develop/chains/optimism',
        component: ComponentCreator('/develop/chains/optimism', 'd2e'),
        exact: true,
        sidebar: "develop"
      },
      {
        path: '/develop/chains/polygon',
        component: ComponentCreator('/develop/chains/polygon', '65e'),
        exact: true,
        sidebar: "develop"
      },
      {
        path: '/develop/integrations/chainlink',
        component: ComponentCreator('/develop/integrations/chainlink', '82f'),
        exact: true,
        sidebar: "develop"
      },
      {
        path: '/develop/integrations/filecoin',
        component: ComponentCreator('/develop/integrations/filecoin', 'cd6'),
        exact: true,
        sidebar: "develop"
      },
      {
        path: '/develop/integrations/ipfs',
        component: ComponentCreator('/develop/integrations/ipfs', '69f'),
        exact: true,
        sidebar: "develop"
      },
      {
        path: '/develop/integrations/lit-protocol',
        component: ComponentCreator('/develop/integrations/lit-protocol', 'da8'),
        exact: true,
        sidebar: "develop"
      },
      {
        path: '/develop/integrations/nucypher',
        component: ComponentCreator('/develop/integrations/nucypher', '540'),
        exact: true,
        sidebar: "develop"
      },
      {
        path: '/develop/integrations/overview',
        component: ComponentCreator('/develop/integrations/overview', '2ea'),
        exact: true
      },
      {
        path: '/develop/integrations/toucan',
        component: ComponentCreator('/develop/integrations/toucan', 'c3b'),
        exact: true,
        sidebar: "develop"
      },
      {
        path: '/develop/reference/',
        component: ComponentCreator('/develop/reference/', 'b57'),
        exact: true,
        sidebar: "develop"
      },
      {
        path: '/develop/reference/chains-contracts',
        component: ComponentCreator('/develop/reference/chains-contracts', '978'),
        exact: true,
        sidebar: "develop"
      },
      {
        path: '/develop/reference/limits',
        component: ComponentCreator('/develop/reference/limits', '4d7'),
        exact: true,
        sidebar: "develop"
      },
      {
        path: '/develop/reference/open-beta',
        component: ComponentCreator('/develop/reference/open-beta', '82e'),
        exact: true
      },
      {
        path: '/develop/reference/repos',
        component: ComponentCreator('/develop/reference/repos', '9fb'),
        exact: true,
        sidebar: "develop"
      },
      {
        path: '/develop/reference/response-times',
        component: ComponentCreator('/develop/reference/response-times', '183'),
        exact: true,
        sidebar: "develop"
      },
      {
        path: '/develop/reference/table-names',
        component: ComponentCreator('/develop/reference/table-names', '27c'),
        exact: true
      },
      {
        path: '/products/rigs/',
        component: ComponentCreator('/products/rigs/', '518'),
        exact: true,
        sidebar: "rigs"
      },
      {
        path: '/products/rigs/rigs-discord',
        component: ComponentCreator('/products/rigs/rigs-discord', '08a'),
        exact: true,
        sidebar: "rigs"
      },
      {
        path: '/products/rigs/the-garage',
        component: ComponentCreator('/products/rigs/the-garage', 'b27'),
        exact: true,
        sidebar: "rigs"
      },
      {
        path: '/products/rigs/what-are-rigs',
        component: ComponentCreator('/products/rigs/what-are-rigs', 'e4b'),
        exact: true,
        sidebar: "rigs"
      },
      {
        path: '/protocol/validator-spec',
        component: ComponentCreator('/protocol/validator-spec', '7ce'),
        exact: true
      },
      {
        path: '/sdk/',
        component: ComponentCreator('/sdk/', '54d'),
        exact: true,
        sidebar: "develop"
      },
      {
        path: '/sdk/connect',
        component: ComponentCreator('/sdk/connect', '59e'),
        exact: true,
        sidebar: "develop"
      },
      {
        path: '/sdk/create',
        component: ComponentCreator('/sdk/create', '8b4'),
        exact: true,
        sidebar: "develop"
      },
      {
        path: '/sdk/getting-started',
        component: ComponentCreator('/sdk/getting-started', 'a82'),
        exact: true,
        sidebar: "develop"
      },
      {
        path: '/sdk/read',
        component: ComponentCreator('/sdk/read', 'fc0'),
        exact: true,
        sidebar: "develop"
      },
      {
        path: '/sdk/write',
        component: ComponentCreator('/sdk/write', '731'),
        exact: true,
        sidebar: "develop"
      },
      {
        path: '/smart-contracts/',
        component: ComponentCreator('/smart-contracts/', 'a04'),
        exact: true,
        sidebar: "develop"
      },
      {
        path: '/smart-contracts/connect',
        component: ComponentCreator('/smart-contracts/connect', '3dd'),
        exact: true,
        sidebar: "develop"
      },
      {
        path: '/smart-contracts/create',
        component: ComponentCreator('/smart-contracts/create', 'a7b'),
        exact: true,
        sidebar: "develop"
      },
      {
        path: '/smart-contracts/getting-started',
        component: ComponentCreator('/smart-contracts/getting-started', 'c96'),
        exact: true,
        sidebar: "develop"
      },
      {
        path: '/smart-contracts/read',
        component: ComponentCreator('/smart-contracts/read', '568'),
        exact: true,
        sidebar: "develop"
      },
      {
        path: '/smart-contracts/write',
        component: ComponentCreator('/smart-contracts/write', 'b6c'),
        exact: true,
        sidebar: "develop"
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
        path: '/template',
        component: ComponentCreator('/template', '731'),
        exact: true
      },
      {
        path: '/tutorials/',
        component: ComponentCreator('/tutorials/', 'eec'),
        exact: true
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
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
