import { Close, Minimize } from "@material-ui/icons";
import { IconButton, useTheme } from "@material-ui/core";
import React, { useState } from "react";
import {
  RefinedType,
  TNode,
  TObjectNode,
  defaultNodeValue,
} from "../../../../utils/normalization";

import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditValueInput from "../EditValueInput";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import useDecodedDataContext from "../../useDecodedDataContext";

export default function NewFieldDialogButton(props: { parentNode: TObjectNode }) {
  const theme = useTheme();
  const { updateNodes } = useDecodedDataContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [valueNode, setValueNode] = useState<TNode>(
    defaultNodeValue(RefinedType.String, props.parentNode),
  );
  const [fieldName, setFieldName] = useState<string>("");
  if (updateNodes === null) {
    return null;
  }
  const closeAndClearDialog = () => {
    setIsDialogOpen(false);
    setValueNode(defaultNodeValue(RefinedType.String, props.parentNode));
    setFieldName("");
  };
  return (
    <span
      style={{ display: "flex", alignItems: "center" }}
      onClick={(event) => event.stopPropagation()}
    >
      <IconButton
        onClick={(e) => {
          setIsDialogOpen(true);
        }}
      >
        <AddIcon fontSize="large" />
      </IconButton>
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        aria-labelledby="new-item-dialog-title"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="new-item-dialog-title">Add New Item</DialogTitle>
        <div
          style={{
            position: "absolute",
            display: "flex",
            alignItems: "center",
            right: theme.spacing(1),
            top: theme.spacing(1),
          }}
        >
          <IconButton aria-label="minimize" onClick={() => setIsDialogOpen(false)}>
            <Minimize style={{ transform: "translate(0px, -7px)" }} />
          </IconButton>
          <IconButton aria-label="close" onClick={closeAndClearDialog}>
            <Close />
          </IconButton>
        </div>
        <DialogContent dividers style={{ minHeight: 180 }}>
          <div style={{ display: "flex" }}>
            <FormControl variant="filled" style={{ minWidth: 120 }}>
              <InputLabel>Type</InputLabel>
              <Select
                label="Type"
                value={valueNode.type}
                onChange={(event) => {
                  const newType: RefinedType = event.target.value as RefinedType;
                  setValueNode(defaultNodeValue(newType, props.parentNode));
                }}
              >
                <MenuItem value={RefinedType.List}>List</MenuItem>
                <MenuItem value={RefinedType.Boolean}>Question</MenuItem>
                <MenuItem value={RefinedType.Date}>Date</MenuItem>
                <MenuItem value={RefinedType.Number}>Number</MenuItem>
                <MenuItem value={RefinedType.Object}>Folder</MenuItem>
                <MenuItem value={RefinedType.String}>Text</MenuItem>
              </Select>
            </FormControl>
            <span style={{ width: theme.spacing(1) }} />
            <TextField
              label="Name"
              variant="filled"
              type="string"
              autoFocus
              value={fieldName}
              onChange={(event) => setFieldName(event.target.value)}
              fullWidth
            />
          </div>
          <div style={{ height: theme.spacing(1) }} />
          <EditValueInput node={valueNode} onChange={setValueNode} />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              if (valueNode) {
                const newParentNode: TObjectNode = {
                  ...props.parentNode,
                  fields: [
                    ...props.parentNode.fields,
                    {
                      name: fieldName,
                      value: valueNode.key,
                      parentKey: valueNode.parentKey,
                    },
                  ],
                };
                updateNodes([valueNode, newParentNode]);
              }
              closeAndClearDialog();
            }}
            fullWidth
            variant="contained"
            color="primary"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}
