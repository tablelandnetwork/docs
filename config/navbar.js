/**
 * Navbar config
 *
 * The `items` hold the ordered categories displayed in the navbar itself, and the other keys are customizations.
 *
 */

const navbar = {
  hideOnScroll: false,
  title: "",
  logo: {
    alt: "Tableland logo",
    src: "/img/tableland/logo-black.svg",
    srcDark: "/img/tableland/logo-white.svg",
    width: 200,
    target: "_self",
  },
  items: [
    // {
    //   type: "doc",
    //   docId: "/category/about", // Anything in `sidebars.js` with `type: "category"` has a page generated in `category`
    //   position: "left",
    //   label: "SDK",
    // },
    {
      type: "docSidebar",
      position: "left",
      sidebarId: "concepts",
      label: "Concepts",
    },
    {
      type: "docSidebar",
      position: "left",
      sidebarId: "develop",
      label: "Develop",
    },
    {
      type: "doc",
      docId: "/category/tutorials",
      position: "left",
      label: "Tutorials",
    },
    {
      label: "Community",
      position: "right",
      items: [
        {
          type: "docSidebar",
          sidebarId: "contribute",
          label: "Contribute",
        },
        {
          type: "docSidebar",
          sidebarId: "rigs",
          label: "Rigs NFT",
        },
        {
          href: "https://dev.tableland.xyz",
          label: "Tech blog",
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
          href: "https://tableland.xyz/pilot-program/",
          label: "Pilot Program",
          target: "_blank",
          rel: null,
        },
      ],
    },
    {
      href: "https://github.com/tablelandnetwork/",
      position: "right",
      className: "header-github-link",
      "aria-label": "GitHub repository",
    },
    {
      type: "search",
      position: "right",
    },
  ],
};

module.exports = navbar;
