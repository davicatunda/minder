import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { TBooleanNode, TNode } from "../../../../../utils/normalization";

import React from "react";

type Props = {
  node: TBooleanNode;
  onChange(node: TNode): void;
};
export default function EditBooleanInput({ node, onChange }: Props) {
  return (
    <FormControl variant="filled" fullWidth>
      <InputLabel>Initial value</InputLabel>
      <Select
        label="Type"
        value={node.value}
        onChange={({ target: { value } }) => {
          onChange({
            ...node,
            value: value === "true" ? true : false,
          });
        }}
      >
        <MenuItem value="true">Yes</MenuItem>
        <MenuItem value="false">No</MenuItem>
      </Select>
    </FormControl>
  );
}
