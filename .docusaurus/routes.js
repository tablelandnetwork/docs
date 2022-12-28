import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
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
    path: '/docs/tags',
    component: ComponentCreator('/docs/tags', 'e17'),
    exact: true
  },
  {
    path: '/docs/tags/contributing',
    component: ComponentCreator('/docs/tags/contributing', '4ae'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '277'),
    exact: true
  },
  {
    path: '/search',
    component: ComponentCreator('/search', 'f5a'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '458'),
    routes: [
      {
        path: '/docs/autogen-examples/intro',
        component: ComponentCreator('/docs/autogen-examples/intro', '903'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/autogen-examples/tutorial-basics/congratulations',
        component: ComponentCreator('/docs/autogen-examples/tutorial-basics/congratulations', 'e69'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/autogen-examples/tutorial-basics/create-a-blog-post',
        component: ComponentCreator('/docs/autogen-examples/tutorial-basics/create-a-blog-post', '488'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/autogen-examples/tutorial-basics/create-a-document',
        component: ComponentCreator('/docs/autogen-examples/tutorial-basics/create-a-document', 'a6f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/autogen-examples/tutorial-basics/create-a-page',
        component: ComponentCreator('/docs/autogen-examples/tutorial-basics/create-a-page', 'eb4'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/autogen-examples/tutorial-basics/deploy-your-site',
        component: ComponentCreator('/docs/autogen-examples/tutorial-basics/deploy-your-site', 'f0b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/autogen-examples/tutorial-basics/markdown-features',
        component: ComponentCreator('/docs/autogen-examples/tutorial-basics/markdown-features', 'f34'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/autogen-examples/tutorial-extras/manage-docs-versions',
        component: ComponentCreator('/docs/autogen-examples/tutorial-extras/manage-docs-versions', '54e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/autogen-examples/tutorial-extras/translate-your-site',
        component: ComponentCreator('/docs/autogen-examples/tutorial-extras/translate-your-site', '164'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/category/tutorial---basics',
        component: ComponentCreator('/docs/category/tutorial---basics', 'd44'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/category/tutorial---extras',
        component: ComponentCreator('/docs/category/tutorial---extras', 'f09'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/contribute/guidelines',
        component: ComponentCreator('/docs/contribute/guidelines', '8b8'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/contribute/maintainers',
        component: ComponentCreator('/docs/contribute/maintainers', '900'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/template',
        component: ComponentCreator('/docs/template', 'df8'),
        exact: true,
        sidebar: "tutorialSidebar"
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', 'c40'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
