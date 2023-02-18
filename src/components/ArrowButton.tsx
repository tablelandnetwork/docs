import React from "react";
import Link from "@docusaurus/Link";

type ButtonString = {
  text: string;
  to: string;
};

export default function ArrowButton({ text, to }: ButtonString): JSX.Element {
  return (
    <>
      <div style={{ display: "flex" }}>
        <Link className="button button--primary" to={to}>
          {text}
          <span style={{ marginLeft: ".3rem" }}></span>→
        </Link>
      </div>
    </>
  );
}
