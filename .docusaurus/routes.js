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
    component: ComponentCreator('/', '7fd'),
    routes: [
      {
        path: '/category/blockchain-basics',
        component: ComponentCreator('/category/blockchain-basics', '165'),
        exact: true,
        sidebar: "blockchainBasics"
      },
      {
        path: '/category/cli',
        component: ComponentCreator('/category/cli', 'd70'),
        exact: true,
        sidebar: "cli"
      },
      {
        path: '/category/protocol',
        component: ComponentCreator('/category/protocol', '160'),
        exact: true,
        sidebar: "validator"
      },
      {
        path: '/category/sdk',
        component: ComponentCreator('/category/sdk', 'b13'),
        exact: true,
        sidebar: "sdk"
      },
      {
        path: '/category/smart-contracts',
        component: ComponentCreator('/category/smart-contracts', 'dc4'),
        exact: true,
        sidebar: "smartContracts"
      },
      {
        path: '/category/sql',
        component: ComponentCreator('/category/sql', '5bb'),
        exact: true,
        sidebar: "sql"
      },
      {
        path: '/category/sql-basics',
        component: ComponentCreator('/category/sql-basics', '143'),
        exact: true,
        sidebar: "sqlBasics"
      },
      {
        path: '/category/tableland-basics',
        component: ComponentCreator('/category/tableland-basics', 'f80'),
        exact: true,
        sidebar: "tablelandBasics"
      },
      {
        path: '/cli/connect',
        component: ComponentCreator('/cli/connect', 'c53'),
        exact: true,
        sidebar: "cli"
      },
      {
        path: '/cli/create',
        component: ComponentCreator('/cli/create', 'ff2'),
        exact: true,
        sidebar: "cli"
      },
      {
        path: '/cli/getting-started',
        component: ComponentCreator('/cli/getting-started', '889'),
        exact: true,
        sidebar: "cli"
      },
      {
        path: '/cli/overview',
        component: ComponentCreator('/cli/overview', 'fa3'),
        exact: true
      },
      {
        path: '/cli/read',
        component: ComponentCreator('/cli/read', '8ae'),
        exact: true,
        sidebar: "cli"
      },
      {
        path: '/cli/write',
        component: ComponentCreator('/cli/write', 'ac5'),
        exact: true,
        sidebar: "cli"
      },
      {
        path: '/contribute/guidelines',
        component: ComponentCreator('/contribute/guidelines', '406'),
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
        path: '/learn/blockchain/what-is-blockchain',
        component: ComponentCreator('/learn/blockchain/what-is-blockchain', '19c'),
        exact: true,
        sidebar: "blockchainBasics"
      },
      {
        path: '/learn/sql/what-is-sql',
        component: ComponentCreator('/learn/sql/what-is-sql', '54f'),
        exact: true,
        sidebar: "sqlBasics"
      },
      {
        path: '/learn/tableland/what-is-tableland',
        component: ComponentCreator('/learn/tableland/what-is-tableland', 'e1a'),
        exact: true,
        sidebar: "tablelandBasics"
      },
      {
        path: '/protocol/validator-spec',
        component: ComponentCreator('/protocol/validator-spec', '81e'),
        exact: true,
        sidebar: "validator"
      },
      {
        path: '/sdk/connect',
        component: ComponentCreator('/sdk/connect', 'de3'),
        exact: true,
        sidebar: "sdk"
      },
      {
        path: '/sdk/create',
        component: ComponentCreator('/sdk/create', '6b0'),
        exact: true,
        sidebar: "sdk"
      },
      {
        path: '/sdk/getting-started',
        component: ComponentCreator('/sdk/getting-started', 'd33'),
        exact: true,
        sidebar: "sdk"
      },
      {
        path: '/sdk/read',
        component: ComponentCreator('/sdk/read', '876'),
        exact: true,
        sidebar: "sdk"
      },
      {
        path: '/sdk/write',
        component: ComponentCreator('/sdk/write', '7ea'),
        exact: true,
        sidebar: "sdk"
      },
      {
        path: '/smart-contracts/connect',
        component: ComponentCreator('/smart-contracts/connect', '982'),
        exact: true,
        sidebar: "smartContracts"
      },
      {
        path: '/smart-contracts/create',
        component: ComponentCreator('/smart-contracts/create', 'e3b'),
        exact: true,
        sidebar: "smartContracts"
      },
      {
        path: '/smart-contracts/getting-started',
        component: ComponentCreator('/smart-contracts/getting-started', 'd70'),
        exact: true,
        sidebar: "smartContracts"
      },
      {
        path: '/smart-contracts/overview',
        component: ComponentCreator('/smart-contracts/overview', 'eb9'),
        exact: true
      },
      {
        path: '/smart-contracts/read',
        component: ComponentCreator('/smart-contracts/read', '606'),
        exact: true,
        sidebar: "smartContracts"
      },
      {
        path: '/smart-contracts/write',
        component: ComponentCreator('/smart-contracts/write', 'a6f'),
        exact: true,
        sidebar: "smartContracts"
      },
      {
        path: '/sql/sql-spec',
        component: ComponentCreator('/sql/sql-spec', '4a8'),
        exact: true,
        sidebar: "sql"
      },
      {
        path: '/template',
        component: ComponentCreator('/template', '731'),
        exact: true
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
