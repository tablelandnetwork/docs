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
    component: ComponentCreator('/', 'd44'),
    routes: [
      {
        path: '/about/',
        component: ComponentCreator('/about/', 'e76'),
        exact: true,
        sidebar: "about"
      },
      {
        path: '/about/blockchain/what-is-blockchain',
        component: ComponentCreator('/about/blockchain/what-is-blockchain', '7e7'),
        exact: true,
        sidebar: "about"
      },
      {
        path: '/about/rigs/overview',
        component: ComponentCreator('/about/rigs/overview', 'b2d'),
        exact: true
      },
      {
        path: '/about/sql/what-is-sql',
        component: ComponentCreator('/about/sql/what-is-sql', '5ec'),
        exact: true
      },
      {
        path: '/about/tableland/what-is-tableland',
        component: ComponentCreator('/about/tableland/what-is-tableland', '658'),
        exact: true,
        sidebar: "about"
      },
      {
        path: '/build/',
        component: ComponentCreator('/build/', 'eda'),
        exact: true,
        sidebar: "build"
      },
      {
        path: '/category/blockchain-basics',
        component: ComponentCreator('/category/blockchain-basics', 'e7a'),
        exact: true,
        sidebar: "about"
      },
      {
        path: '/category/cli',
        component: ComponentCreator('/category/cli', '20d'),
        exact: true,
        sidebar: "build"
      },
      {
        path: '/category/contributing',
        component: ComponentCreator('/category/contributing', 'b2e'),
        exact: true,
        sidebar: "contributing"
      },
      {
        path: '/category/smart-contracts',
        component: ComponentCreator('/category/smart-contracts', '441'),
        exact: true,
        sidebar: "build"
      },
      {
        path: '/category/sql',
        component: ComponentCreator('/category/sql', '5bb'),
        exact: true,
        sidebar: "sql"
      },
      {
        path: '/category/tutorials',
        component: ComponentCreator('/category/tutorials', '710'),
        exact: true,
        sidebar: "tutorials"
      },
      {
        path: '/cli/connect',
        component: ComponentCreator('/cli/connect', '049'),
        exact: true,
        sidebar: "build"
      },
      {
        path: '/cli/create',
        component: ComponentCreator('/cli/create', 'e24'),
        exact: true,
        sidebar: "build"
      },
      {
        path: '/cli/getting-started',
        component: ComponentCreator('/cli/getting-started', 'ddf'),
        exact: true,
        sidebar: "build"
      },
      {
        path: '/cli/overview',
        component: ComponentCreator('/cli/overview', 'fa3'),
        exact: true
      },
      {
        path: '/cli/read',
        component: ComponentCreator('/cli/read', 'da8'),
        exact: true,
        sidebar: "build"
      },
      {
        path: '/cli/write',
        component: ComponentCreator('/cli/write', '69b'),
        exact: true,
        sidebar: "build"
      },
      {
        path: '/contribute/guidelines',
        component: ComponentCreator('/contribute/guidelines', '7cb'),
        exact: true,
        sidebar: "contributing"
      },
      {
        path: '/contribute/maintainers',
        component: ComponentCreator('/contribute/maintainers', 'ea1'),
        exact: true,
        sidebar: "contributing"
      },
      {
        path: '/contribute/style-guide',
        component: ComponentCreator('/contribute/style-guide', 'fe4'),
        exact: true,
        sidebar: "contributing"
      },
      {
        path: '/protocol/validator-spec',
        component: ComponentCreator('/protocol/validator-spec', '7ce'),
        exact: true
      },
      {
        path: '/sdk/',
        component: ComponentCreator('/sdk/', '3a9'),
        exact: true,
        sidebar: "build"
      },
      {
        path: '/sdk/connect',
        component: ComponentCreator('/sdk/connect', 'be9'),
        exact: true,
        sidebar: "build"
      },
      {
        path: '/sdk/create',
        component: ComponentCreator('/sdk/create', 'b25'),
        exact: true,
        sidebar: "build"
      },
      {
        path: '/sdk/getting-started',
        component: ComponentCreator('/sdk/getting-started', 'f34'),
        exact: true,
        sidebar: "build"
      },
      {
        path: '/sdk/read',
        component: ComponentCreator('/sdk/read', 'f5f'),
        exact: true,
        sidebar: "build"
      },
      {
        path: '/sdk/write',
        component: ComponentCreator('/sdk/write', 'd41'),
        exact: true,
        sidebar: "build"
      },
      {
        path: '/smart-contracts/connect',
        component: ComponentCreator('/smart-contracts/connect', '51c'),
        exact: true,
        sidebar: "build"
      },
      {
        path: '/smart-contracts/create',
        component: ComponentCreator('/smart-contracts/create', '724'),
        exact: true,
        sidebar: "build"
      },
      {
        path: '/smart-contracts/getting-started',
        component: ComponentCreator('/smart-contracts/getting-started', '736'),
        exact: true,
        sidebar: "build"
      },
      {
        path: '/smart-contracts/overview',
        component: ComponentCreator('/smart-contracts/overview', 'eb9'),
        exact: true
      },
      {
        path: '/smart-contracts/read',
        component: ComponentCreator('/smart-contracts/read', '502'),
        exact: true,
        sidebar: "build"
      },
      {
        path: '/smart-contracts/write',
        component: ComponentCreator('/smart-contracts/write', '8d3'),
        exact: true,
        sidebar: "build"
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
