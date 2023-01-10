import React from "react";
import Translate, { translate } from "@docusaurus/Translate";
import { PageMetadata } from "@docusaurus/theme-common";
import Layout from "@theme/Layout";
import CustomFooter from "@theme/CustomFooter";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

// This is an ejected `NotFound` component that customizes the 404 page
export default function NotFound() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <>
      <PageMetadata
        title={translate({
          id: "theme.NotFound.title",
          message: "Page Not Found",
        })}
      />
      <Layout>
        <main className="container margin-vert--xl">
          <div className="row">
            <div className="col col--6 col--offset-3">
              <h1 className="hero__title">
                <Translate
                  id="theme.NotFound.title"
                  description="The title of the 404 page"
                >
                  Page not found!
                </Translate>
              </h1>
              <h4>
                <Translate
                  id="theme.NotFound.p1"
                  description="The first paragraph of the 404 page"
                >
                  We're sorry...we could not find what you were looking for.
                </Translate>
              </h4>
              <p>
                <Translate id="theme.NotFound.p2">
                  If this is a broken site link, please
                </Translate>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://github.com/${siteConfig.organizationName}/${siteConfig.projectName}/issues`}
                >
                  <Translate> open an issue on GitHub</Translate>
                </a>{" "}
                <Translate>and let the </Translate>
                {siteConfig.title}{" "}
                <Translate>
                  team know about the error. Otherwise, reach out to the source
                  that gave you the URL and let them know the page no longer
                  exists.
                </Translate>
              </p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "2rem",
            }}
          >
            <Link className="button button--secondary button--lg" to="/">
              ← <Translate>Back to homepage</Translate>
            </Link>
          </div>
        </main>
      </Layout>
      <CustomFooter />
    </>
  );
}
