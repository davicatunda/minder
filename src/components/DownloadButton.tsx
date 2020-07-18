import React, { FunctionComponent, ReactNode } from "react";
import DownloadIcon from "../icons/DownloadIcon";
import Button, { buttonStyle } from "./Button";

type Props = {
  fileName: string;
  data: string | null;
  children: ReactNode;
};
const DownloadButton: FunctionComponent<Props> = (props) => {
  if (props.data == null) {
    return (
      <Button disabled={true}>
        <WithIcon>{props.children}</WithIcon>
      </Button>
    );
  } else {
    const style = {
      ...buttonStyle,
      textDecoration: "inherit",
    };
    const href = `data:text/plain;charset=base64,${props.data}`;
    return (
      <a style={style} href={href} download={props.fileName}>
        <WithIcon>{props.children}</WithIcon>
      </a>
    );
  }
};

const WithIcon: FunctionComponent<{ children: ReactNode }> = ({ children }) => (
  <>
    <span style={{ display: "flex", marginRight: 8, height: 20, width: 20 }}>
      <DownloadIcon size={20} />
    </span>
    {children}
  </>
);

export default DownloadButton;
