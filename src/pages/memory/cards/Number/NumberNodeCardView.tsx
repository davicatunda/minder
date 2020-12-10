import React from "react";
import { TNumberNode } from "../../../../utils/normalization";
import { Typography } from "@material-ui/core";

export default function NumberNodeCardView(props: { node: TNumberNode }) {
  return (
    <Typography variant="body2" color="textSecondary" component="p">
      {props.node.value}
    </Typography>
  );
}
