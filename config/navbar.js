/**
 * Navbar config
 *
 * The `items` hold the ordered categories displayed in the navbar itself, and the other keys are customizations.
 *
 */

const navbar = {
  hideOnScroll: false,
  title: "", // Only use if you want a word next to the logo, like "DOCS"
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
    // If versioned docs are created, show the version dropdown
    // {
    //   type: "docsVersionDropdown",
    //   position: "right",
    // },
    // If language / internationalization is enabled, show the language
    // {
    //   type: "localeDropdown",
    //   position: "right",
    // },
    // This is a custom workaround detailed at:
    // https://github.com/facebook/docusaurus/issues/7227
    // It is a SIWE connect button.
    // {
    //   type: "custom-ConnectWallet",
    //   position: "right",
    // },
  ],
};

module.exports = navbar;
