import React from "react";
import { TBooleanNode } from "../../../../utils/normalization";
import { Typography } from "@material-ui/core";

export default function BooleanNodeCardView(props: { node: TBooleanNode }) {
  return (
    <Typography variant="body2" color="textSecondary" component="p">
      {props.node.value ? "Yes" : "No"}
    </Typography>
  );
}
