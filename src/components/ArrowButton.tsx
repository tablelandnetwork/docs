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
        <Link className="button btn" to={to}>
          {text}
          <span style={{ marginLeft: ".3rem" }}></span>
          <svg
            aria-hidden="true"
            height="12"
            width="12"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#ffffff"
              d="M12.583 7 7.992 2.409A1 1 0 1 1 9.407.993l6.3 6.3a1 1 0 0 1 0 1.414l-6.3 6.3a1 1 0 0 1-1.415-1.416L12.583 9H1a1 1 0 1 1 0-2z"
              fillRule="evenodd"
            ></path>
          </svg>
        </Link>
      </div>
    </>
  );
}
