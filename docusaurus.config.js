// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { lightCodeTheme, darkCodeTheme } = require("./src/theme/codeTheme");
const math = require("remark-math");
const katex = require("rehype-katex");
// Imports for configuring the site metadata and navbar
const metadata = require("./config/metadata");
const navbar = require("./config/navbar");
require("dotenv").config();

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Tableland Docs",
  tagline:
    "Explore how to store & query data on Tableland—the serverless database for web3 apps.",
  url: "https://docs.tableland.xyz",
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
    "@docusaurus/theme-mermaid", // Used for diagrams
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
    // "docusaurus-plugin-fathom", // Fathom site analytics tracking
    // If any redirects are needed, configure with `@docusaurus/plugin-client-redirects`
    // See docs here: https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-client-redirects
  ],
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: "./config/sidebars.js", // Configuration for the sidebar
          routeBasePath: "/", // Use `/` instead of `/docs` for doc pages' base URL
          editUrl: "https://github.com/tablelandnetwork/docs/tree/main/",
          showLastUpdateTime: true,
          breadcrumbs: true,
          remarkPlugins: [
            math,
            require("@docusaurus/remark-plugin-npm2yarn"),
            { converters: ["pnpm"], sync: true },
          ],
          rehypePlugins: [katex],
          showLastUpdateAuthor: true,
        },
        theme: {
          customCss: "./src/css/custom.css", // All custom CSS overrides
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
      colorMode: {
        defaultMode: "dark",
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      fathomAnalytics: {
        siteId: "QLCGWETC",
      },
      image: "img/tableland/site-banner.png", // Default image used in metadata, e.g., links shared on socials
      metadata, // Custom site metadata (imported via separate file)
      docs: {
        sidebar: {
          autoCollapseCategories: true, // Collapse sidebar categories when opening a new one
          hideable: true, // Allow the sidebar to be hidden with a toggle
        },
      },
      navbar, // Navbar config (imported via separate file)
      // Allow markdown to use `h2` to `h4` so that up to 3 headings are shown in the table of contents
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 4,
      },
      algolia: {
        appId: "4PTCXCA47T",
        apiKey: process.env.ALGOLIA_API_KEY,
        indexName: "tableland",
        contextualSearch: false,
      },
      // Prism styling for code snippets
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
      mermaid: {
        theme: {
          light: "neutral",
          dark: "dark",
        },
        options: {
          fontFamily: "Poppins",
        },
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
