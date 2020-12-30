import { Card, CardActionArea, CardContent, useTheme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { RefinedType, TObjectField } from "../../../../../utils/normalization";

import Button from "@material-ui/core/Button";
import CardView from "../CardView";
import CreateIcon from "@material-ui/icons/Create";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditValueInput from "../EditValueInput";
import Grid from "@material-ui/core/Grid";
import { HorizontalSpace } from "../../../../core/Spacing";
import IconButton from "@material-ui/core/IconButton";
import NodeTypeIcon from "../NodeTypeIcon";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { css } from "@emotion/css";
import useDecodedDataContext from "../../../useDecodedDataContext";
import useDragObjectField from "./useDragObjectField";

// replace this generic grow to show with something better by type
// Maybe open a preview Dialog ?
// when entering a folder put a dark background on top of parent?
export default function ObjectFieldNodeCardView({
  name,
  value,
  parentKey,
}: TObjectField) {
  const theme = useTheme();
  const { draggableContainerProps, dropTargetProps } = useDragObjectField({
    name,
    value,
    parentKey,
  });
  const needsToExpand = useNeedsToExpand(name, value);
  const [isMinimized, setIsMinimized] = useState(true);
  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={isMinimized || !needsToExpand ? 6 : 12}
      lg={isMinimized || !needsToExpand ? 3 : 12}
      xl={isMinimized || !needsToExpand ? 2 : 12}
      {...draggableContainerProps}
    >
      <div {...dropTargetProps} />
      <Card
        onClick={(e) => {
          e.stopPropagation();
          setIsMinimized((v) => !v);
        }}
        variant="outlined"
      >
        <CardActionArea disableRipple>
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              className={css({ display: "flex", alignItems: "center" })}
            >
              <NodeTypeIcon nodeKey={value} />
              <HorizontalSpace s1 />
              <span
                className={
                  isMinimized
                    ? css({
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        flexGrow: 1,
                      })
                    : css({ flexGrow: 1 })
                }
              >
                {name}
              </span>
              {!isMinimized && (
                <span onClick={(e) => e.stopPropagation()}>
                  <EditFieldDialog name={name} value={value} parentKey={parentKey} />
                </span>
              )}
            </Typography>
            {isMinimized ? (
              <span
                className={css({
                  backgroundColor: theme.palette.text.primary,
                  opacity: 0.1,
                  filter: "blur(4px)",
                  width: "80%",
                  height: 11,
                  marginTop: theme.spacing(2),
                  display: "block",
                })}
              />
            ) : (
              <CardView nodeKey={value} />
            )}
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

function useNeedsToExpand(name: string, nodeKey: string): boolean {
  const { store } = useDecodedDataContext();
  if (name.length > 20) {
    return true;
  }
  const node = store.nodes[nodeKey];
  switch (node.type) {
    case RefinedType.Boolean:
      return false;
    case RefinedType.Date:
      return false;
    case RefinedType.List:
      return true;
    case RefinedType.Null:
      return false;
    case RefinedType.Number:
      return node.value.toString().length > 30;
    case RefinedType.Object:
      return true;
    case RefinedType.String:
      return node.value.length > 30;
  }
}

function EditFieldDialog({ name, value, parentKey }: TObjectField) {
  const theme = useTheme();
  const { store, updateNodes } = useDecodedDataContext();
  const [newFieldName, setNewFieldName] = useState(name);
  const oldValueNode = store.nodes[value];
  const oldParentNode = store.nodes[parentKey];
  const [valueNode, setValueNode] = useState(oldValueNode);
  const [isEditting, setIsEditting] = useState(false);

  // refresh if new values are passed.
  useEffect(() => {
    setNewFieldName(name);
    setValueNode(oldValueNode);
  }, [name, oldValueNode, oldParentNode]);
  if (updateNodes === null || oldParentNode.type !== RefinedType.Object) {
    return null;
  }
  return (
    <>
      <IconButton onClick={() => setIsEditting(true)} size="small">
        <CreateIcon fontSize="small" />
      </IconButton>
      {isEditting && (
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
            <HorizontalSpace s1 />
            <EditValueInput node={valueNode} onChange={setValueNode} />
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
                setIsEditting(false);
              }}
            >
              Delete
            </Button>
            <HorizontalSpace s1 grow />
            <Button onClick={() => setIsEditting(false)}>Cancel</Button>
            <Button
              color="primary"
              onClick={() => {
                const newParentNode = {
                  ...oldParentNode,
                  fields: oldParentNode.fields.map((originalField) =>
                    originalField.value !== value
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
      )}
    </>
  );
}
