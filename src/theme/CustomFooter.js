import React from "react";
import { useThemeConfig } from "@docusaurus/theme-common";
import FooterLinks from "@theme/Footer/Links";
import FooterLogo from "@theme/Footer/Logo";
import FooterCopyright from "@theme/Footer/Copyright";
import FooterLayout from "@theme/Footer/Layout";

export default function NotFound() {
  const { customFooter } = useThemeConfig();
  if (!customFooter) {
    return null;
  }
  const { copyright, links, logo, style } = customFooter;

  return (
    <>
      <hr style={{ marginBottom: 0 }} />
      <FooterLayout
        style={style}
        links={links && links.length > 0 && <FooterLinks links={links} />}
        logo={logo && <FooterLogo logo={logo} />}
        copyright={copyright && <FooterCopyright copyright={copyright} />}
      />
    </>
  );
}
