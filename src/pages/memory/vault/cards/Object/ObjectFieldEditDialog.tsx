import Dialog, { DialogProps } from "@material-ui/core/Dialog";
import EditValueInput, { DraftNode } from "../EditValueInput";
import { HorizontalSpace, VerticalSpace } from "../../../../core/Spacing";
import React, { useState } from "react";
import { RefinedType, TObjectField } from "../../../../../utils/normalization";

import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import useDecodedDataContext from "../../../useDecodedDataContext";

type Props = {
  objectFieldNode: TObjectField;
  dialogProps: DialogProps;
  closeDialog: () => void;
};
export default function ObjectFieldEditDialog({
  objectFieldNode: { name, value, parentKey },
  dialogProps,
  closeDialog,
}: Props) {
  const { store, updateNodes } = useDecodedDataContext();
  const oldValueNode = store.nodes[value];
  const oldChildNodes =
    oldValueNode.type === RefinedType.List
      ? oldValueNode.children.map((child) => store.nodes[child])
      : undefined;
  const oldParentNode = store.nodes[parentKey];
  const [draftNode, setDraftNode] = useState<DraftNode>({
    valueNode: oldValueNode,
    childNodes: oldChildNodes,
  });
  const [newFieldName, setNewFieldName] = useState(name);
  if (updateNodes === null || oldParentNode.type !== RefinedType.Object) {
    return null;
  }
  return (
    <Dialog
      {...dialogProps}
      aria-labelledby="edit-dialog-title"
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle id="edit-dialog-title">Edit</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          variant="filled"
          type="string"
          autoFocus
          value={newFieldName}
          onChange={(event) => setNewFieldName(event.target.value)}
          fullWidth
        />
        <VerticalSpace s1 />
        <EditValueInput node={draftNode} onChange={setDraftNode} />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            const newParentNode = {
              ...oldParentNode,
              fields: oldParentNode.fields.filter(
                (originalField) => originalField.value !== value,
              ),
            };
            updateNodes([newParentNode]);
            closeDialog();
          }}
        >
          Delete
        </Button>
        <HorizontalSpace s1 grow />
        <Button onClick={closeDialog}>Cancel</Button>
        <Button
          color="primary"
          onClick={() => {
            if (draftNode.valueNode) {
              const newParentNode = {
                ...oldParentNode,
                fields: oldParentNode.fields.map((originalField) =>
                  originalField.value !== value
                    ? originalField
                    : { ...originalField, name: newFieldName },
                ),
              };
              updateNodes([
                ...(draftNode.childNodes ?? []),
                draftNode.valueNode,
                newParentNode,
              ]);
            }
            closeDialog();
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
