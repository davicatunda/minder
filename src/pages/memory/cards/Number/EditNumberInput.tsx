import { TNode, TNumberNode } from "../../../../utils/normalization";

import React from "react";
import { TextField } from "@material-ui/core";

type Props = {
  node: TNumberNode;
  onChange(node: TNode): void;
};
export default function EditNumberInput({ node, onChange }: Props) {
  return (
    <TextField
      variant="filled"
      id="name"
      label="Initial Value"
      type="number"
      value={node.value}
      onChange={(event) => {
        onChange({
          ...node,
          value: !isNaN(Number(event.target.value))
            ? Number(event.target.value)
            : node.value,
        });
      }}
      fullWidth
    />
  );
}
