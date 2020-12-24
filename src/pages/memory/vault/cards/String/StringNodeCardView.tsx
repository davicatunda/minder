import React from "react";
import { TStringNode } from "../../../../../utils/normalization";
import { Typography } from "@material-ui/core";

export default function StringNodeCardView(props: { node: TStringNode }) {
  return (
    <Typography
      variant="body2"
      color="textSecondary"
      display="inline"
      onClick={(e) => e.stopPropagation()}
      style={{ userSelect: "text", minWidth: 20 }}
    >
      {props.node.value === "" ? "Ø" : props.node.value}
    </Typography>
  );
}
