// @flow

import type { Node } from 'react';

import React from 'react';


export const buttonStyle = {
  border: 0,
  padding: "6px 16px",
  minWidth: 64,
  boxSizing: "border-box",
  boxShadow: `
    0px 3px 1px -2px rgba(0,0,0,0.2),
    0px 2px 2px 0px rgba(0,0,0,0.14),
    0px 1px 5px 0px rgba(0,0,0,0.12)
  `,
  borderRadius: 4,
  display: "inline-flex",
  alignItems: "center",
  color: "#fff",
  fontWeight: 500,
  lineHeight: 1.75,
  textTransform: "uppercase",
  fontSize: "0.875rem",
  letterSpacing: "0.02857em",
  backgroundColor: "#1976d2",
  cursor: "pointer",
};
const disableButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#e0e0e0",
  cursor: "not-allowed",
  color: "rgba(0, 0, 0, 0.4)",
}
type Props = {
  onClick?: () => void,
  children: Node,
  disabled?: boolean,
};
function Button(props: Props): Node {
  if (props.disabled === true) {
    return (
      <button style={disableButtonStyle} disabled>
        {props.children}
      </button>
    );
  }
  return (
    <button onClick={props.onClick} style={buttonStyle}>
      {props.children}
    </button>
  );
}


export default Button;


