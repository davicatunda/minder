import { TDateNode, TNode } from "../../../../../utils/normalization";

import { KeyboardDatePicker } from "@material-ui/pickers";
import React from "react";

type Props = {
  node: TDateNode;
  onChange(node: TNode): void;
};
export default function EditDateInput({ node, onChange }: Props) {
  return (
    <KeyboardDatePicker
      disableToolbar
      variant="inline"
      inputVariant="filled"
      fullWidth
      format="MM/dd/yyyy"
      label="Initial Date"
      value={node.date}
      onChange={(date: Date | null) => {
        onChange({
          ...node,
          date: date ?? new Date(),
        });
      }}
      KeyboardButtonProps={{
        "aria-label": "change date",
      }}
    />
  );
}
