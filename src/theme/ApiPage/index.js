import React, { useState, useCallback } from "react";
import renderRoutes from "@docusaurus/renderRoutes";
import { matchPath } from "@docusaurus/router";
import { translate } from "@docusaurus/Translate";
import { MDXProvider } from "@mdx-js/react";
import BackToTopButton from "@theme/BackToTopButton";
import DocSidebar from "@theme/DocSidebar";
import IconArrow from "@theme/Icon/Arrow";
import Layout from "@theme/Layout";
import MDXComponents from "@theme/MDXComponents";
import NotFound from "@theme/NotFound";
import CustomFooter from "@site/src/theme/CustomFooter";
import clsx from "clsx";
import styles from "./styles.module.css";

// Manually create sidebar headers so it matches the rest of the site's style
const sidebarHeaders = [
  {
    type: "link",
    label: "Back to home",
    className: "sidepage-back-home",
    href: "/",
  },
  {
    type: "html",
    value: `<h4 class="margin-top--md margin-bottom--none sidepage-heading">Validator API Reference</h4>`,
    defaultStyle: true,
  },
  {
    type: "html",
    value: "<hr />",
    defaultStyle: true,
    className: "sidebar-hr",
  },
];

function getSidebar({ currentApiRoute, apiMetadata }) {
  const sidebarName = currentApiRoute.sidebar;
  const sidebar = sidebarName
    ? apiMetadata.apiSidebars[sidebarName]
    : undefined;
  return sidebar;
}
function getLinks(sidebar) {
  let links = [];
  for (let item of sidebar) {
    switch (item.type) {
      case "link":
        links.push(item.href);
        break;
      case "category":
        links.push(...getLinks(item.items));
        break;
    }
  }
  return links;
}
function getSidebarPaths({ currentApiRoute, apiMetadata }) {
  const sidebar = getSidebar({
    currentApiRoute,
    apiMetadata,
  });
  if (!sidebar) {
    return [];
  }
  return getLinks(sidebar);
}
function ApiPageContent({ currentApiRoute, apiMetadata, children }) {
  const sidebar = getSidebar({
    currentApiRoute,
    apiMetadata,
  });
  // Check if sidebarHeaders are already in the sidebar
  const shouldAddHeaders = sidebarHeaders.every(
    (header) => !sidebar.some((item) => item.label === header.label)
  );

  // Only unshift sidebarHeaders if they're not already present
  if (shouldAddHeaders) {
    sidebar.unshift(...sidebarHeaders);
  }
  const [hiddenSidebarContainer, setHiddenSidebarContainer] = useState(false);
  const [hiddenSidebar, setHiddenSidebar] = useState(false);
  const toggleSidebar = useCallback(() => {
    if (hiddenSidebar) {
      setHiddenSidebar(false);
    }
    setHiddenSidebarContainer((value) => !value);
  }, [hiddenSidebar]);
  return (
    <Layout wrapperClassName="api-wrapper">
      <div className={clsx(styles.apiPage, "open-api-main-page")}>
        <BackToTopButton />

        {sidebar && (
          <aside
            className={clsx(styles.apiSidebarContainer, {
              [styles.apiSidebarContainerHidden]: hiddenSidebarContainer,
            })}
            onTransitionEnd={(e) => {
              if (
                !e.currentTarget.classList.contains(styles.apiSidebarContainer)
              ) {
                return;
              }
              if (hiddenSidebarContainer) {
                setHiddenSidebar(true);
              }
            }}
          >
            <div className={clsx(styles.apiSidebarViewport)}>
              <DocSidebar
                key={
                  // Reset sidebar state on sidebar changes
                  // See https://github.com/facebook/docusaurus/issues/3414
                  currentApiRoute.sidebar
                }
                sidebar={sidebar}
                path={currentApiRoute.path}
                onCollapse={toggleSidebar}
                isHidden={hiddenSidebar}
              />

              {hiddenSidebar && (
                <div
                  className={styles.collapsedApiSidebar}
                  title={translate({
                    id: "theme.docs.sidebar.expandButtonTitle",
                    message: "Expand sidebar",
                    description:
                      "The ARIA label and title attribute for expand button of doc sidebar",
                  })}
                  aria-label={translate({
                    id: "theme.docs.sidebar.expandButtonAriaLabel",
                    message: "Expand sidebar",
                    description:
                      "The ARIA label and title attribute for expand button of doc sidebar",
                  })}
                  tabIndex={0}
                  role="button"
                  onKeyDown={toggleSidebar}
                  onClick={toggleSidebar}
                >
                  <IconArrow className={styles.expandSidebarButtonIcon} />
                </div>
              )}
            </div>
          </aside>
        )}
        <main
          className={clsx(styles.apiMainContainer, {
            [styles.apiMainContainerEnhanced]:
              hiddenSidebarContainer || !sidebar,
          })}
        >
          <div
            className={clsx("container padding-top--md padding-bottom--lg", {
              [styles.apiItemWrapperEnhanced]: hiddenSidebarContainer,
            })}
          >
            <MDXProvider components={MDXComponents}>{children}</MDXProvider>
          </div>
        </main>
      </div>
    </Layout>
  );
}
function ApiPage(props) {
  const {
    route: { routes: apiRoutes },
    apiMetadata,
    location,
  } = props;
  let currentApiRoute = apiRoutes.find((apiRoute) =>
    matchPath(location.pathname, apiRoute)
  );
  if (!currentApiRoute) {
    return <NotFound />;
  }

  // Override the current route path to the first page if it can't be found on the sidebar.
  const paths = getSidebarPaths({
    currentApiRoute,
    apiMetadata,
  });
  if (!paths.find((path) => matchPath(location.pathname, path))) {
    currentApiRoute = {
      ...currentApiRoute,
      path: paths[0],
    };
  }
  return (
    <>
      <ApiPageContent
        currentApiRoute={currentApiRoute}
        apiMetadata={apiMetadata}
      >
        {renderRoutes(apiRoutes)}
        <div>
          <CustomFooter />
        </div>
      </ApiPageContent>
    </>
  );
}
export default ApiPage;
