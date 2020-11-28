import React, { CSSProperties } from "react";

import { useTheme } from "@material-ui/core";

type Props = {
  style?: CSSProperties;
};
export default function BlurredBar({ style }: Props) {
  const theme = useTheme();
  return (
    <div
      style={{
        backgroundColor: theme.palette.text.primary,
        opacity: 0.1,
        filter: "blur(4px)",
        ...style,
      }}
    />
  );
}
