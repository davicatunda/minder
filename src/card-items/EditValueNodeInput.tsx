import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Switch,
  TextField,
} from "@material-ui/core";
import {
  RefinedType,
  TBooleanNode,
  TDateNode,
  TNode,
  TNumberNode,
  TStringNode,
} from "../utils/normalization";

import { KeyboardDatePicker } from "@material-ui/pickers";
import React from "react";

type Props = {
  node: TNode | null;
  onChange(node: TNode): void;
};
export default function EditValueNodeInput({ node, onChange }: Props) {
  if (node === null) {
    return null;
  }
  switch (node.type) {
    case RefinedType.List:
      return null;
    case RefinedType.Boolean:
      return <EditBooleanInput node={node} onChange={onChange} />;
    case RefinedType.Date:
      return <EditDateInput node={node} onChange={onChange} />;
    case RefinedType.Null:
      throw Error("Impossible");
    case RefinedType.Number:
      return <EditNumberInput node={node} onChange={onChange} />;
    case RefinedType.Object:
      return null;
    case RefinedType.String:
      return <EditStringInput node={node} onChange={onChange} />;
  }
}
type EditNumberInputProps = {
  node: TNumberNode;
  onChange(node: TNode): void;
};
function EditNumberInput({ node, onChange }: EditNumberInputProps) {
  return (
    <TextField
      autoFocus
      margin="dense"
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

type EditDateInputProps = {
  node: TDateNode;
  onChange(node: TNode): void;
};
function EditDateInput({ node, onChange }: EditDateInputProps) {
  return (
    <KeyboardDatePicker
      disableToolbar
      variant="inline"
      format="MM/dd/yyyy"
      margin="normal"
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
type EditBooleanInputProps = {
  node: TBooleanNode;
  onChange(node: TNode): void;
};
function EditBooleanInput({ node, onChange }: EditBooleanInputProps) {
  return (
    <FormControl>
      <FormLabel component="legend">Initial value</FormLabel>
      <FormControlLabel
        control={
          <Switch
            checked={node.value}
            onChange={(event) => {
              onChange({
                ...node,
                value: event.target.checked,
              });
            }}
          />
        }
        label={node.value ? "yes" : "no"}
      />
    </FormControl>
  );
}
type EditStringInputProps = {
  node: TStringNode;
  onChange(node: TNode): void;
};
function EditStringInput({ node, onChange }: EditStringInputProps) {
  return (
    <TextField
      autoFocus
      margin="dense"
      id="name"
      label="Initial Value"
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
