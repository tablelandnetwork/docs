// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { lightCodeTheme, darkCodeTheme } = require("./src/theme/codeTheme");
const math = require("remark-math");
const katex = require("rehype-katex");
// Imports for configuring the footer, site metadata, and navbar
const metadata = require("./config/metadata");
const navbar = require("./config/navbar");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Tableland Docs",
  tagline:
    "Explore how to store & query data on Tableland—the decentralized SQL database.",
  url: "http://localhost:3000", // https://docs.tableland.xyz
  baseUrl: "/",
  onBrokenLinks: "log", // Or, could `throw`
  onBrokenMarkdownLinks: "warn",
  favicon: "img/tableland/favicon.ico",
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
  markdown: {
    mermaid: true,
  },
  themes: [
    [
      "@easyops-cn/docusaurus-search-local", // Used for site search
      {
        hashed: true,
      },
    ],
    "@docusaurus/theme-mermaid", // Used for diagrams
    "@docusaurus/theme-live-codeblock", // Used for live / editable code
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
  plugins: [
    [
      "docusaurus-plugin-dotenv",
      {
        path: "./.env", // Path to your environment variables in `.env` file
      },
    ],
    // "docusaurus-plugin-fathom",
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
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: "./config/sidebars.js",
          // docLayoutComponent: "@theme/DocPage",
          routeBasePath: "/", // Use `/` instead of `/docs` for doc pages' base URL
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
          showLastUpdateAuthor: true,
        },
        blog: {
          showReadingTime: true,
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/tablelandnetwork/docs/tree/main",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
        sitemap: {
          changefreq: "weekly",
          priority: 0.5,
          ignorePatterns: ["/tags/**"],
          filename: "sitemap.xml",
        },
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // fathomAnalytics: {
      //   siteId: "",
      //   customDomain: "", // Use a custom domain, see https://usefathom.com/support/custom-domains
      // },
      image: "img/tableland/site-banner.png", // Default image used in metadata, e.g., links shared on socials
      metadata,
      mermaid: {
        theme: {
          light: "neutral",
          dark: "dark",
        },
        options: {
          fontFamily: "Inter",
        },
      },
      docs: {
        sidebar: {
          autoCollapseCategories: true, // Collapse sidebar categories when opening a new one
          hideable: true, // Allow the sidebar to be hidden with a toggle
        },
      },
      navbar,
      // Allow markdown to use `h2` to `h4` so that up to 3 headings are shown in the table of contents
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 4,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        defaultLanguage: "javascript",
        additionalLanguages: ["solidity"],
        magicComments: [
          // Default class for syntax highlighting in a code block, e.g., `// highlight-next-line`
          {
            className: "theme-code-block-highlighted-line",
            line: "highlight-next-line",
            block: { start: "highlight-start", end: "highlight-end" },
          },
          // Custom class used to highlight errors, for code block syntax highlighting
          {
            className: "code-block-error-line",
            line: "error",
          },
        ],
      },
      colorMode: {
        defaultMode: "light",
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      // Announcement bar is upon visiting the site and removed if the user closes it out (tracked in local storage)
      announcementBar: {
        id: "announcementBar-0", // Increment on change
        content: `Give Tableland a ⭐️ on <a target="_blank" rel="noopener noreferrer" href="https://github.com/tablelandnetwork">GitHub</a> and follow us on <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/tableland__" >Twitter</a>`,
        isCloseable: true,
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
