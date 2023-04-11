// Slightly modified to take a user's `address` and `chain` props.
import React from "react";
import clsx from "clsx";
import { getChainInfo } from "@site/src/components/SupportedChains";
import styles from "./styles.module.css";
export default function CodeBlockLine({
  line,
  classNames,
  showLineNumbers,
  getLineProps,
  getTokenProps,
  address,
  chain,
}) {
  if (line.length === 1 && line[0].content === "\n") {
    line[0].content = "";
  }
  const lineProps = getLineProps({
    line,
    className: clsx(classNames, showLineNumbers && styles.codeLine),
  });
  const lineTokens = line.map((token, key) => {
    // Use a regex to replace `DOCS_` prefixed strings, including the connected
    // wallet's address or the selected chain.
    const regexAddr = /DOCS_ADDR/g;
    const regexChainName = /DOCS_CHAIN_NAME/g;
    const regexChainId = /DOCS_CHAIN_ID/g;
    if (token.content.match(regexAddr))
      token.content = token.content.replace(regexAddr, address);
    if (token.content.match(regexChainName))
      token.content = token.content.replace(regexChainName, chain);
    if (token.content.match(regexChainId)) {
      const chainId = getChainInfo(chain, "chainId");
      token.content = token.content.replace(regexChainId, chainId);
    }
    return <span key={key} {...getTokenProps({ token, key })} />;
  });
  return (
    <span {...lineProps}>
      {showLineNumbers ? (
        <>
          <span className={styles.codeLineNumber} />
          <span className={styles.codeLineContent}>{lineTokens}</span>
        </>
      ) : (
        lineTokens
      )}
      <br />
    </span>
  );
}
