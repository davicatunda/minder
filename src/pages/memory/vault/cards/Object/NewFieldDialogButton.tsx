import { Close, Minimize } from "@material-ui/icons";
import EditValueInput, { DraftNode } from "../EditValueInput";
import { HorizontalSpace, VerticalSpace } from "../../../../core/Spacing";
import { IconButton, useTheme } from "@material-ui/core";
import React, { useState } from "react";
import {
  RefinedType,
  TObjectNode,
  defaultNodeValue,
} from "../../../../../utils/normalization";

import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import { css } from "@emotion/css";
import useDecodedDataContext from "../../../useDecodedDataContext";

export default function NewFieldDialogButton(props: { parentNode: TObjectNode }) {
  const theme = useTheme();
  const { updateNodes } = useDecodedDataContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [draftNode, setDraftNode] = useState<DraftNode>({
    valueNode: defaultNodeValue(RefinedType.String, props.parentNode),
  });
  const [fieldName, setFieldName] = useState<string>("");
  if (updateNodes === null) {
    return null;
  }
  const closeAndClearDialog = () => {
    setIsDialogOpen(false);
    setDraftNode({
      valueNode: defaultNodeValue(RefinedType.String, props.parentNode),
    });
    setFieldName("");
  };
  return (
    <span
      className={css({ margin: theme.spacing(1), display: "flex" })}
      onClick={(event) => event.stopPropagation()}
    >
      <Button
        variant="outlined"
        color="primary"
        size="small"
        onClick={() => setIsDialogOpen(true)}
        startIcon={<AddIcon />}
      >
        Add
      </Button>
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        aria-labelledby="new-item-dialog-title"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="new-item-dialog-title">Add New Item</DialogTitle>
        <div
          className={css({
            position: "absolute",
            display: "flex",
            alignItems: "center",
            right: theme.spacing(1),
            top: theme.spacing(1),
          })}
        >
          <IconButton aria-label="minimize" onClick={() => setIsDialogOpen(false)}>
            <Minimize className={css({ transform: "translate(0px, -7px)" })} />
          </IconButton>
          <IconButton aria-label="close" onClick={closeAndClearDialog}>
            <Close />
          </IconButton>
        </div>
        <DialogContent dividers className={css({ minHeight: 180 })}>
          <div className={css({ display: "flex" })}>
            <FormControl variant="filled" className={css({ minWidth: 120 })}>
              <InputLabel>Type</InputLabel>
              <Select
                label="Type"
                value={draftNode.valueNode?.type ?? ""}
                onChange={(event) => {
                  const newType: RefinedType = event.target.value as RefinedType;
                  setDraftNode({
                    valueNode: defaultNodeValue(newType, props.parentNode),
                  });
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
            <HorizontalSpace s1 />
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
          <VerticalSpace />
          <EditValueInput node={draftNode} onChange={setDraftNode} />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              if (draftNode.valueNode) {
                const newParentNode: TObjectNode = {
                  ...props.parentNode,
                  fields: [
                    ...props.parentNode.fields,
                    {
                      name: fieldName,
                      value: draftNode.valueNode.key,
                      parentKey: draftNode.valueNode.parentKey,
                    },
                  ],
                };
                updateNodes([
                  ...(draftNode.childNodes ?? []),
                  draftNode.valueNode,
                  newParentNode,
                ]);
              }
              closeAndClearDialog();
            }}
            disabled={fieldName === ""}
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
