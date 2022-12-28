// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const math = require("remark-math");
const katex = require("rehype-katex");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Tableland",
  tagline: "Build web3 with SQL",
  url: "http://localhost:3000", // https://docs.tableland.xyz
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "tablelandnetwork", // Usually your GitHub org/user name.
  projectName: "docs", // Usually your repo name.
  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  plugins: [
    "@docusaurus/theme-live-codeblock",
    /* TODO -- need to add redirects from old site pages to new site pages
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          // /docs/oldDoc -> /docs/newDoc
          {
            to: "/docs/newDoc",
            from: "/docs/oldDoc",
          },
          // Redirect from multiple old paths to the new path
          {
            to: "/docs/newDoc2",
            from: ["/docs/oldDocFrom2019", "/docs/legacyDocFrom2016"],
          },
        ],
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        createRedirects(existingPath) {
          if (existingPath.includes("/community")) {
            // Redirect from /docs/team/X to /community/X and /docs/support/X to /community/X
            return [
              existingPath.replace("/community", "/docs/team"),
              existingPath.replace("/community", "/docs/support"),
            ];
          }
          return undefined; // Return a falsy value: no redirect created
        },
      },
    ],
    */
  ],
  themes: [
    "@easyops-cn/docusaurus-search-local", // Used for site search
  ],
  stylesheets: [
    // Used for math / KaTeX formulas
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X",
      crossorigin: "anonymous",
    },
  ],
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/tablelandnetwork/docs/tree/main/",
          showLastUpdateTime: true,
          breadcrumbs: true,
          remarkPlugins: [
            math,
            require("@docusaurus/remark-plugin-npm2yarn"),
            { sync: true },
          ],
          rehypePlugins: [katex],
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/tablelandnetwork/docs/tree/main",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: "img/tableland/site-banner.png", // Default image used in metadata, e.g., links shared on socials
      metadata: [
        {
          name: "keywords",
          content:
            "tableland, docs, documentation, web3, crypto, SQL, relational, database",
        },
      ],
      navbar: {
        hideOnScroll: true,
        title: "",
        logo: {
          alt: "Tableland logo",
          src: "/img/tableland/logo-black.svg",
          srcDark: "/img/tableland/logo-white.svg",
          width: 200,
          target: "_self",
        },
        items: [
          {
            type: "doc",
            docId: "template",
            position: "left",
            label: "Template",
          },
          { to: "/blog", label: "Blog", position: "left" },
          {
            label: "Community",
            position: "right",
            items: [
              {
                to: "docs/contribute/guidelines/",
                label: "Contribute to Wiki",
                target: "_blank",
                rel: null,
                activeBasePath: "docs/contribute",
              },
              {
                href: "https://github.com/tablelandnetwork/docs",
                label: "Contribute",
                target: "_blank",
                rel: null,
              },
              {
                href: "https://discord.com/invite/dc8EBEhGbg",
                label: "Discord",
                target: "_blank",
                rel: null,
              },
              {
                href: "https://twitter.com/tableland__",
                label: "Twitter",
                target: "_blank",
                rel: null,
              },
              {
                href: "https://dev.tableland.xyz/showcase/",
                label: "Showcase",
                target: "_blank",
                rel: null,
              },
            ],
          },
          {
            href: "https://github.com/tablelandnetwork/",
            label: "GitHub",
            position: "right",
          },
          {
            type: "search",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Template",
                to: "/docs/template",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Discord",
                href: "https://discord.com/invite/dc8EBEhGbg",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/tableland__",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Blog",
                to: "/blog",
              },
              {
                label: "GitHub",
                href: "https://github.com/tablelandnetwork/docs",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Tableland Network.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        defaultLanguage: "javascript",
        additionalLanguages: ["solidity"],
        magicComments: [
          // Remember to extend the default highlight class name as well!
          {
            className: "theme-code-block-highlighted-line",
            line: "highlight-next-line",
            block: { start: "highlight-start", end: "highlight-end" },
          },
          // highlight-start
          {
            className: "code-block-error-line",
            line: "error",
          },
          // highlight-end
        ],
      },

      colorMode: {
        defaultMode: "light",
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      announcementBar: {
        id: "announcementBar-0", // Increment on change
        content: `Give Tableland a ⭐️ on <a target="_blank" rel="noopener noreferrer" href="https://github.com/tablelandnetwork">GitHub</a> and follow us on <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/tableland__" >Twitter</a>`,
        isCloseable: true,
      },
      docs: {
        sidebar: {
          hideable: true,
        },
      },
      liveCodeBlock: {
        /**
         * The position of the live playground, above or under the editor
         * Possible values: "top" | "bottom"
         */
        playgroundPosition: "bottom",
      },
    }),
};

module.exports = config;
