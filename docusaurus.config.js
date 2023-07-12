// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { lightCodeTheme, darkCodeTheme } = require("./src/theme/codeTheme");
const math = require("remark-math");
// Imports for configuring the site metadata and navbar
const metadata = require("./config/metadata");
const navbar = require("./config/navbar");
require("dotenv").config();

async function createConfig() {
  const katex = (await import("rehype-katex")).default;
  return {
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
    scripts: [
      // Fathom analytics
      {
        src: "https://cdn.usefathom.com/script.js",
        defer: true,
        "data-site": process.env.FATHOM_SITE_ID,
      },
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
        "docusaurus-plugin-typedoc",
        {
          id: "api/sdk",
          entryPoints: ["./node_modules/@tableland/sdk/src/index.ts"],
          tsconfig: "./tsconfig.json",
          out: "api/sdk",
        },
      ],
      [
        // Note: (only) during local dev, you may run into an infinite loop issue that
        // occurs when certain files get modified
        // See here for more info: https://github.com/rdilweb/docusaurus-plugin-remote-content/issues/45
        "docusaurus-plugin-remote-content",
        {
          // Fetch the `go-tableland` repo's README and place it in the
          // `docs/validator` directory, altering content prior to rendering
          name: "validator-readme",
          sourceBaseUrl:
            "https://raw.githubusercontent.com/tablelandnetwork/go-tableland/main/", // The base url for the markdown (gets prepended to all of the documents when fetching)
          outDir: "docs/validator", // The base directory to output to
          documents: ["README.md"], // The file names to download
          modifyContent(filename, content) {
            if (filename.includes("README")) {
              // Remove all content above `## Background`, which includes the
              // title and badges. Also, adjust callouts with `>` to use
              // admonition tips wrapped with `:::tip {content} :::` as well as
              // include some frontmatter / initial content for the page
              const parts = content.split("## Background");
              if (parts.length > 1) {
                let transformedContent =
                  "## Background" + parts.slice(1).join("## Background");
                let lines = transformedContent.split("\n");
                for (let i = 0; i < lines.length; i++) {
                  if (lines[i].startsWith(">")) {
                    lines[i] = `:::tip\n${lines[i].slice(1).trim()}\n:::`;
                  }
                }
                content = lines.join("\n");
              }

              return {
                content: `---
title: Validator node
description: Learn how to run you own Tableland validator node.
keywords:
  - validator
---

Tableland is a permissionless network where anyone can run and operate their own node. This page walks through how to run your own node, including hardware requirements, installation steps, and common questions.

<!-- Imported from https://github.com/tablelandnetwork/go-tableland/blob/main/README.md -->

${content}`,
              };
            }

            // Don't modify unless name contains "README" (not used here but
            // could be useful in other scenarios)
            return undefined;
          },
        },
      ],
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
            exclude: ["**/api/sdk/index.md"], // Exclude autogenerated README from `js-tableland` repo
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
        algolia: {
          appId: "4PTCXCA47T",
          // TMP: If building locally, allow an empty Algolia API key so that
          // anyone can contribute to docs without running into a build error.
          // TODO: Add local development vs. deployment workflow.
          apiKey: process.env.ALGOLIA_API_KEY || "_",
          indexName: "tableland",
          contextualSearch: true,
          custom_settings: {
            attributesForFaceting: [
              "language",
              "version",
              "type",
              "docusaurus_tag",
            ],
          },
        },
        colorMode: {
          defaultMode: "dark",
          disableSwitch: false,
          respectPrefersColorScheme: true,
        },
        // Default image used in metadata, e.g., links shared on socials
        image: "img/tableland/site-banner.png",
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
          content: `Give Tableland a ⭐️ on <a target="_blank" rel="noopener noreferrer" href="https://github.com/tablelandnetwork">GitHub</a> and follow us on <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/tableland" >Twitter</a>`,
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
}

module.exports = createConfig;
