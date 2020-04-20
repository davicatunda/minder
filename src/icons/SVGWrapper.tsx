import React, { FunctionComponent, ReactNode } from 'react';

type Props = {
  fontSize: number,
  children: ReactNode,
};
const SVGWrapper: FunctionComponent<Props> = ({ fontSize, children }) => (
  <svg
    style={{
      fill: "currentColor",
      width: "1em",
      height: "1em",
      display: "inline-block",
      transition: "fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      flexShrink: 0,
      fontSize: fontSize ?? "1.5rem",
    }}
    focusable="false"
    viewBox="0 0 24 24"
    aria-hidden="true"
    role="presentation"
  >
    {children}
  </svg>
);

export default SVGWrapper;

