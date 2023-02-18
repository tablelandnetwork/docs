import React from "react";
import Link from "@docusaurus/Link";
import NewsletterForm from "@theme/CustomFooter/NewsletterForm";

const links = [
  {
    html: (
      <span>
        Questions?{" "}
        <Link
          href="https://discord.com/channels/592843512312102924/1000182412795445378"
          target="_blank"
          rel="noopener"
        >
          Join our Discord & contact us.
        </Link>
      </span>
    ),
  },
  {
    html: (
      <span>
        Watch our{" "}
        <Link
          href="https://www.youtube.com/@tablelandxyz"
          target="_blank"
          rel="noopener"
        >
          developer tutorials.
        </Link>
      </span>
    ),
  },
  {
    html: (
      <span>
        Follow us on{" "}
        <Link
          href="https://twitter.com/tableland__"
          target="_blank"
          rel="noopener"
        >
          Twitter.
        </Link>
      </span>
    ),
  },
];

export default function CustomFooter() {
  return (
    <>
      <footer className="footer">
        <hr />
        <div className="container container-fluid">
          <div className="row">
            <div className="col col--6">
              <div className="row footer__links">
                <div className="col footer__col">
                  <div className="footer__title"></div>
                  <ul className="footer__items clean-list">
                    {links.map((item) => (
                      <li className="footer__item">{item.html}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col col--6">
              <div className="row footer__links">
                <div className="col footer__col">
                  <div className="footer__title"></div>
                  <ul className="footer__items clean-list">
                    <li className="footer__item">
                      <NewsletterForm />
                    </li>
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
