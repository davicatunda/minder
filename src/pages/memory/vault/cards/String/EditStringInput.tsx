import { TNode, TStringNode } from "../../../../../utils/normalization";

import React from "react";
import { TextField } from "@material-ui/core";

type Props = {
  node: TStringNode;
  onChange(node: TNode): void;
};
export default function EditStringInput({ node, onChange }: Props) {
  return (
    <TextField
      id="name"
      label="Value"
      variant="filled"
      type="string"
      value={node.value}
      onChange={(event) => {
        onChange({
          ...node,
          value: event.target.value,
        });
      }}
      fullWidth
    />
  );
}
