import React, { useEffect, useState } from "react";
import {
  RefinedType,
  StoreKey,
  TObejctField,
  TObjectNode,
} from "../utils/normalization";

import BlurredBar from "../components/BlurredBar";
import Button from "@material-ui/core/Button";
import CardView from "./CardView";
import CreateIcon from "@material-ui/icons/Create";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditValueNodeInput from "./EditValueNodeInput";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import NodeTypeIcon from "./NodeTypeIcon";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { useDecodedDataState } from "./CardViewRoot";
import { useTheme } from "@material-ui/core";

// replace this generic grow to show with something better by type
// Maybe open a preview Dialog ?
// when entering a folder put a dark background on top of parent?
type Props = {
  field: {
    name: string;
    value: StoreKey;
  };
  parentNode: TObjectNode;
};
export default function ObjectFieldNodeCardView({ field, parentNode }: Props) {
  const theme = useTheme();
  const [isSelected, setIsSelected] = useState(false);
  const isSmall = useIsValueSmall(field.value);
  const fillLine = !isSmall && isSelected;
  return (
    <Grid
      item
      xs={12}
      sm={fillLine ? 12 : 6}
      md={fillLine ? 12 : 4}
      style={{ position: "relative" }}
    >
      <Paper
        style={{ padding: theme.spacing(1) }}
        onClick={(e) => {
          e.stopPropagation();
          setIsSelected((v) => !v);
        }}
        variant="outlined"
      >
        <Typography variant="body1" display="inline">
          <div style={{ display: "flex", alignItems: "center" }}>
            <NodeTypeIcon nodeKey={field.value} />
            <span style={{ width: 8 }} />
            {field.name}
          </div>
        </Typography>
        {isSelected && (
          <span
            onClick={(e) => e.stopPropagation()}
            style={{ position: "absolute", top: 16, right: 16 }}
          >
            <EditFieldDialog field={field} parentNode={parentNode} />
          </span>
        )}
        {isSelected ? (
          <div onClick={(e) => e.stopPropagation()}>
            <CardView nodeKey={field.value} />
          </div>
        ) : (
          <BlurredBar style={{ width: "80%", height: 12, marginTop: 6 }} />
        )}
      </Paper>
    </Grid>
  );
}

function useIsValueSmall(nodeKey: string): boolean {
  const { store } = useDecodedDataState();
  const node = store.nodes[nodeKey];
  switch (node.type) {
    case RefinedType.Boolean:
      return true;
    case RefinedType.Date:
      return true;
    case RefinedType.List:
      return false;
    case RefinedType.Null:
      return true;
    case RefinedType.Number:
      return node.value.toString().length < 24;
    case RefinedType.Object:
      return false;
    case RefinedType.String:
      return node.value.length < 24;
  }
}

type EditFieldDialogProps = {
  field: TObejctField;
  parentNode: TObjectNode;
};
function EditFieldDialog({ field, parentNode }: EditFieldDialogProps) {
  const theme = useTheme();
  const { store, updateNodes } = useDecodedDataState();
  const [newFieldName, setNewFieldName] = useState(field.name);
  const oldValueNode = store.nodes[field.value];
  const [valueNode, setValueNode] = useState(oldValueNode);
  const [isEditting, setIsEditting] = useState(false);

  // refresh if new values are passed.
  useEffect(() => {
    setNewFieldName(field.name);
    setValueNode(oldValueNode);
  }, [field, parentNode, oldValueNode]);
  if (updateNodes === null) {
    return null;
  }
  return (
    <>
      <IconButton onClick={(e) => setIsEditting(true)} size="small">
        <CreateIcon fontSize="small" />
      </IconButton>
      <Dialog
        open={isEditting}
        onClose={() => setIsEditting(false)}
        aria-labelledby="edit-dialog-title"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="edit-dialog-title">Edit</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            variant="outlined"
            type="string"
            autoFocus
            value={newFieldName}
            onChange={(event) => setNewFieldName(event.target.value)}
            fullWidth
          />
          <span style={{ width: theme.spacing(1) }} />
          <EditValueNodeInput node={valueNode} onChange={setValueNode} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditting(false)}>Cancel</Button>
          <Button
            onClick={() => {
              const newParentNode = {
                ...parentNode,
                fields: parentNode.fields.map((originalField) =>
                  originalField.value !== field.value
                    ? originalField
                    : { ...originalField, name: newFieldName },
                ),
              };
              updateNodes([valueNode, newParentNode]);
              setIsEditting(false);
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
