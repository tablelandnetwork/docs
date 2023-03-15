import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import NewsletterForm from "@theme/CustomFooter/NewsletterForm";
import { useColorMode, useThemeConfig } from "@docusaurus/theme-common";
import ColorModeToggle from "@theme/ColorModeToggle";
import { FaTwitter, FaDiscord, FaYoutube, FaHandshake } from "react-icons/fa";
import styles from "./styles.module.css";

const links = [
  {
    html: (
      <>
        Questions?{" "}
        <Link to="https://discord.com/channels/592843512312102924/1000182412795445378">
          Join our Discord & contact us.
        </Link>
      </>
    ),
    icon: <FaDiscord size={16} />,
  },
  {
    html: (
      <>
        Watch our{" "}
        <Link to="https://www.youtube.com/playlist?list=PLAc0xDyQDZbqTNM3lejUkVdiTprS2Gjob">
          developer tutorials.
        </Link>
      </>
    ),
    icon: <FaYoutube size={16} />,
  },
  {
    html: (
      <>
        Want to help? <Link to="/contribute">Contribute.</Link>
      </>
    ),
    icon: <FaHandshake size={16} />,
  },
  {
    html: (
      <>
        Follow us on <Link to="https://twitter.com/tableland__"> Twitter.</Link>
      </>
    ),
    icon: <FaTwitter size={18} />,
  },
];

export default function CustomFooter() {
  const disabled = useThemeConfig().colorMode.disableSwitch;
  const { colorMode, setColorMode } = useColorMode();
  if (disabled) {
    return null;
  }

  return (
    <>
      <footer className="footer">
        <hr />
        <div className="container container-fluid">
          <div className="row">
            <div className="col col--6">
              <div className="row footer__links">
                <div className="col padding-left--none">
                  <div className="footer__title"></div>
                  <ul className="footer__items clean-list">
                    {links.map((item, idx) => (
                      <li
                        key={idx}
                        className={clsx("footer__item", styles.footerIconLeft)}
                      >
                        {item.icon}
                        <span>{item.html}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col col--6">
              <div className="row footer__links">
                <div className="col padding-left--none">
                  <div className="footer__title"></div>
                  <ul className="footer__items clean-list">
                    <li className="footer__item">
                      <NewsletterForm />
                    </li>
                  </ul>
                </div>
                <div className="col col--2 padding-left--none">
                  <div className="footer__title"></div>
                  <ul
                    className={clsx(
                      "footer__items clean-list",
                      styles.footerIconsRight
                    )}
                  >
                    <li className="footer__item">
                      <ColorModeToggle
                        className={styles.colorModeToggle}
                        value={colorMode}
                        onChange={setColorMode}
                      />
                    </li>
                    {/* <li className="footer__item">
                      <div>
                        <Link
                          to="https://twitter.com/tableland__"
                          className={clsx("clean-btn", styles.footerIconRight)}
                        >
                          <FaTwitter size={18} />
                        </Link>
                      </div>
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
