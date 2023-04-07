import React from "react";
// Change the "collapse sidebar" icon
export default function IconArrow(props) {
  return (
    <svg
      aria-hidden="true"
      height="16"
      width="16"
      viewBox="0 0 16 16"
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g className="sidebar-collapse" transform="scale(-1 1) translate(-16,0)">
        <path d="M15 2a1 1 0 0 0-1 1v10a1 1 0 0 0 2 0V3a1 1 0 0 0-1-1zm-10.407.993-4.3 4.3a1 1 0 0 0 0 1.414l4.3 4.3a1 1 0 0 0 1.415-1.416L3.417 9H10a1 1 0 1 0 0-2H3.417l2.591-2.591a1 1 0 1 0-1.415-1.416z"></path>
      </g>
    </svg>
  );
}
