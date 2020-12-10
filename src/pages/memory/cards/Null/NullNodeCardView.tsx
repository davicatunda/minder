import React from "react";
import { TNullNode } from "../../../../utils/normalization";
import { Typography } from "@material-ui/core";

export default function NullNodeCardView(props: { node: TNullNode }) {
  return (
    <Typography variant="body2" color="textSecondary" component="p">
      Null
    </Typography>
  );
}
