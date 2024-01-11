import React from "react";
import FloatingButton from "docusaurus-theme-openapi/lib-next/theme/ApiDemoPanel/FloatingButton";
import { clearResponse } from "./slice";
import {
  useTypedDispatch,
  useTypedSelector,
} from "docusaurus-theme-openapi/lib-next/theme/ApiDemoPanel/hooks";

// TODO: We probably shouldn't attempt to format XML...
function formatXml(xml) {
  const tab = "  ";
  let formatted = "";
  let indent = "";
  xml.split(/>\s*</).forEach((node) => {
    if (node.match(/^\/\w/)) {
      // decrease indent by one 'tab'
      indent = indent.substring(tab.length);
    }
    formatted += indent + "<" + node + ">\r\n";
    if (node.match(/^<?\w[^>]*[^/]$/)) {
      // increase indent
      indent += tab;
    }
  });
  return formatted.substring(1, formatted.length - 3);
}
function Response() {
  const response = useTypedSelector((state) => state.response.value);
  const dispatch = useTypedDispatch();
  let prettyResponse;
  if (response === undefined) {
    // Hardcode a value so that the box below always shows
    // This ensures the `health` page sidebar is the full viewport height
    prettyResponse = <i>Execute a request to see the response</i>;
  } else {
    prettyResponse = response;

    try {
      prettyResponse = JSON.stringify(JSON.parse(response), null, 2);
    } catch {
      if (response.startsWith("<?xml ")) {
        prettyResponse = formatXml(response);
      }
    }
  }
  const finalResponse =
    prettyResponse === ""
      ? "Returned status 200 (note: no response body)"
      : prettyResponse;
  return (
    <FloatingButton onClick={() => dispatch(clearResponse())} label="Clear">
      <pre
        style={{
          background: "var(--openapi-card-background-color)",
          borderRadius: "var(--openapi-card-border-radius)",
          paddingRight: "60px",
        }}
      >
        <code>{finalResponse}</code>
      </pre>
    </FloatingButton>
  );
}
export default Response;
