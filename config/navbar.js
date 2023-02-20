/**
 * Navbar config
 *
 * The `items` hold the ordered categories displayed in the navbar itself, and the other keys are customizations.
 *
 */

const navbar = {
  hideOnScroll: false,
  title: "DOCS",
  logo: {
    alt: "Tableland logo",
    src: "/img/tableland/logo-black.svg",
    srcDark: "/img/tableland/logo-white.svg",
    width: 180,
    target: "_self",
  },
  items: [
    {
      type: "search",
      position: "left",
    },
    {
      to: "https://console.tableland.xyz",
      position: "right",
      label: "Console",
    },
    {
      href: "https://github.com/tablelandnetwork/",
      position: "right",
      className: "header-github-link",
      "aria-label": "GitHub repository",
    },
    // This is a custom workaround detailed at:
    // https://github.com/facebook/docusaurus/issues/7227
    // It is a SIWE connect button.
    {
      type: "custom-ConnectWallet",
      position: "right",
    },
    //   {
    //     type: "docSidebar",
    //     position: "left",
    //     sidebarId: "develop",
    //     label: "Develop",
    //   },
    //   {
    //     type: "doc",
    //     docId: "/category/tutorials",
    //     position: "left",
    //     label: "Tutorials",
    //   },
    //   {
    //     label: "Community",
    //     position: "right",
    //     items: [
    //       {
    //         type: "docSidebar",
    //         sidebarId: "contribute",
    //         label: "Contribute",
    //       },
    //       {
    //         type: "docSidebar",
    //         sidebarId: "rigs",
    //         label: "Rigs NFT",
    //       },
    //       {
    //         href: "https://dev.tableland.xyz",
    //         label: "Tech blog",
    //         target: "_blank",
    //         rel: null,
    //       },
    //       {
    //         href: "https://discord.com/invite/dc8EBEhGbg",
    //         label: "Discord",
    //         target: "_blank",
    //         rel: null,
    //       },
    //       {
    //         href: "https://twitter.com/tableland__",
    //         label: "Twitter",
    //         target: "_blank",
    //         rel: null,
    //       },
    //       {
    //         href: "https://tableland.xyz/pilot-program/",
    //         label: "Pilot Program",
    //         target: "_blank",
    //         rel: null,
    //       },
    //     ],
    //   },
  ],
};

module.exports = navbar;
