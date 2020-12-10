import React from "react";
import { TStringNode } from "../../../../utils/normalization";
import { Typography } from "@material-ui/core";

export default function StringNodeCardView(props: { node: TStringNode }) {
  return (
    <Typography variant="body2" color="textSecondary" component="p">
      {props.node.value}
    </Typography>
  );
}
