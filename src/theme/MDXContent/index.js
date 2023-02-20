import React from "react";
import { MDXProvider } from "@mdx-js/react";
import MDXComponents from "@theme/MDXComponents";
import { getWalletAddress } from "@site/src/components/Wallet";
// Customize docs pages such that front matter `description` and `synopsis` are shown at the top, with a divider below
export default function MDXContent({ children }) {
  const address = getWalletAddress();
  return (
    <MDXProvider components={MDXComponents} address={address}>
      {children.type.frontMatter.description && (
        <p className="page-description">
          {children.type.frontMatter.description}
        </p>
      )}
      {children.type.frontMatter.synopsis && (
        <p>{children.type.frontMatter.synopsis}</p>
      )}
      {children.type.frontMatter.description && <hr />}
      {children}
    </MDXProvider>
  );
}
