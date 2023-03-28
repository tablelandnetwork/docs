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
      to: "/",
      position: "right",
      label: "Home",
      activeBaseRegex: "^/$", // Ensures the "Home" navbar item is only "active" when on `/` route
    },
    {
      label: "Learn",
      position: "right",
      items: [
        {
          type: "docSidebar",
          sidebarId: "fundamentals",
          label: "Fundamentals",
        },
        {
          type: "docSidebar",
          sidebarId: "playbooks",
          label: "Playbooks",
        },
      ],
    },
    {
      label: "Develop",
      position: "right",
      items: [
        {
          type: "docSidebar",
          sidebarId: "quickstarts",
          label: "Quickstarts",
        },
        {
          type: "docSidebar",
          sidebarId: "sdk",
          label: "SDK",
        },
        {
          type: "docSidebar",
          sidebarId: "smartContracts",
          label: "Smart contracts",
        },
        {
          type: "docSidebar",
          sidebarId: "validatorApi",
          label: "Validator API",
        },
        {
          type: "docSidebar",
          sidebarId: "cli",
          label: "CLI",
        },
        {
          type: "docSidebar",
          sidebarId: "tutorials",
          label: "Tutorials",
        },
      ],
    },
    {
      label: "Protocol",
      position: "right",
      items: [
        {
          type: "docSidebar",
          sidebarId: "validator",
          label: "Validator node",
        },
        {
          type: "docSidebar",
          sidebarId: "sqlSpecification",
          label: "SQL specification",
        },
      ],
    },
    // This is a custom workaround detailed at:
    // https://github.com/facebook/docusaurus/issues/7227
    // It is a SIWE connect button.
    {
      type: "custom-ConnectWallet",
      position: "right",
    },
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
