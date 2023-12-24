import { NavbarItem } from "@docusaurus/theme-common";
/**
 * Navbar config
 *
 * The `items` hold the ordered categories displayed in the navbar itself, and the other keys are customizations.
 *
 */

const items: NavbarItem[] = [
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
    label: "Get started",
    position: "right",
    items: [
      {
        type: "docSidebar",
        sidebarId: "quickstarts",
        label: "Quickstarts",
      },
      {
        type: "docSidebar",
        sidebarId: "fundamentals",
        label: "Fundamentals",
      },
    ],
  },
  {
    label: "Develop",
    position: "right",
    items: [
      {
        type: "docSidebar",
        sidebarId: "studio",
        label: "Studio",
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
        sidebarId: "gatewayApi",
        label: "Gateway API",
      },
      {
        type: "docSidebar",
        sidebarId: "cli",
        label: "CLI",
      },
      {
        type: "docSidebar",
        sidebarId: "localTableland",
        label: "Local Tableland",
      },
      {
        type: "docSidebar",
        sidebarId: "validator",
        label: "Validator node",
      },
    ],
  },
  {
    label: "Guides",
    position: "right",
    items: [
      {
        type: "docSidebar",
        sidebarId: "sql",
        label: "SQL",
      },
      {
        type: "docSidebar",
        sidebarId: "playbooks",
        label: "Playbooks",
      },
      {
        type: "docSidebar",
        sidebarId: "tutorials",
        label: "Tutorials",
      },
    ],
  },
  {
    label: "API",
    position: "right",
    items: [
      {
        type: "docSidebar",
        sidebarId: "apiSdk",
        label: "SDK",
      },
    ],
  },
  {
    href: "https://studio.tableland.xyz",
    label: "Studio",
    target: "_blank",
    className: "navbar__external",
    rel: "noopener noreferrer",
    position: "right",
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
  // }
];

export default {
  hideOnScroll: false,
  title: "", // Only use if you want a word next to the logo, like "DOCS"
  logo: {
    alt: "Tableland logo",
    src: "/img/tableland/logo-black.svg",
    srcDark: "/img/tableland/logo-white.svg",
    width: 180,
    target: "_self",
  },
  items,
};
