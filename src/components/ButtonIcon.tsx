import React, { FunctionComponent, ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClick?(): void;
  onMouseDown?(): void;
};
const ButtonIcon: FunctionComponent<Props> = (props) => (
  <button
    {...props}
    style={{
      background: "none",
      border: 0,
      padding: 0,
      margin: 0,
      cursor: "pointer",
    }}
  />
);

export default ButtonIcon;
