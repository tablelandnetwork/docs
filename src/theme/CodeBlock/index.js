// Slightly modified to user the wagmi `useAccount` hook and allow code blocks
// to use a global `DOCS_ADDR` variable, which gets replaced by either the
// user's address or a default placeholder address. The `address` prop is passed
// down to child `Content/Element` components (a code block, not inline code
// string), where a regex replaces the `DOCS_ADDR` value.
//
// Basically, pass a prop to `CodeBlockComp`, which passes it down to
// `Content/String`, which then passes into `Line` where the regex occurs.

import React, { isValidElement } from "react";
import useIsBrowser from "@docusaurus/useIsBrowser";
import ElementContent from "@theme/CodeBlock/Content/Element";
import StringContent from "@theme/CodeBlock/Content/String";
// TMP: disable wagmi due to build error:
// `ReferenceError: window is not defined`
// import { useAccount } from "wagmi";
/**
 * Best attempt to make the children a plain string so it is copyable. If there
 * are react elements, we will not be able to copy the content, and it will
 * return `children` as-is; otherwise, it concatenates the string children
 * together.
 */
function maybeStringifyChildren(children) {
  if (React.Children.toArray(children).some((el) => isValidElement(el))) {
    return children;
  }
  // The children is now guaranteed to be one/more plain strings
  return Array.isArray(children) ? children.join("") : children;
}
export default function CodeBlock({ children: rawChildren, ...props }) {
  // The Prism theme on SSR is always the default theme but the site theme can
  // be in a different mode. React hydration doesn't update DOM styles that come
  // from SSR. Hence force a re-render after mounting to apply the current
  // relevant styles.
  const isBrowser = useIsBrowser();
  const children = maybeStringifyChildren(rawChildren);
  const CodeBlockComp =
    typeof children === "string" ? StringContent : ElementContent;
  // const { address, isConnected } = useAccount();
  const { address, isConnected } = { undefined, undefined };
  // If the user is connected, use their address in code snippets.
  const user = isConnected && address ? address : "0xINSERT_ADDRESS";
  props.address = user;
  // Also, pass the connected selected chain
  // Currently, this is just a hardcoded value
  const chain = "maticmum";
  props.chain = chain;
  return (
    <CodeBlockComp key={String(isBrowser)} {...props}>
      {children}
    </CodeBlockComp>
  );
}
