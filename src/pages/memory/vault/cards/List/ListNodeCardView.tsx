import EditValueInput, { DraftNode } from "../EditValueInput";
import { Grow, Typography } from "@material-ui/core";
import React, { useState } from "react";
import {
  RefinedType,
  TListNode,
  defaultNodeValue,
} from "../../../../../utils/normalization";

import { Add } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import CardView from "../CardView";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import { HorizontalSpace } from "../../../../core/Spacing";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import NodeTypeIcon from "../NodeTypeIcon";
import SearchIcon from "@material-ui/icons/Search";
import Select from "@material-ui/core/Select";
import { css } from "@emotion/css";
import useDecodedDataContext from "../../../useDecodedDataContext";
import { useEditingContext } from "../../EditingProvider";
import useSearchTextOnNodeRecursively from "../Object/useSearchTextOnNodeRecursively";

export default function ListNodeCardView(props: { node: TListNode }) {
  const [searchValue, setSearchValue] = useState("");
  const { isEditing } = useEditingContext();
  const searchMatches = useSearchTextOnNodeRecursively(searchValue);
  return (
    <div>
      <div onClick={(e) => e.stopPropagation()}>
        {props.node.children.length > 7 ? (
          <FormControl>
            <Input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search ..."
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </FormControl>
        ) : null}
      </div>
      <List>
        {!isEditing && props.node.children.length === 0 && (
          <Typography variant="body1">List is empty</Typography>
        )}
        {props.node.children.filter(searchMatches).map((key, position) => (
          <Grow in={true} timeout={position * 200}>
            <ListItem button>
              <ListItemIcon>
                <NodeTypeIcon nodeKey={key} />
              </ListItemIcon>
              <ListItemText primary={<CardView nodeKey={key} />} />
            </ListItem>
          </Grow>
        ))}
        {isEditing && (
          <ListItem>
            <ListItemText
              onClick={(e) => e.stopPropagation()}
              primary={<NewListItemDialogButton parentNode={props.node} />}
            />
          </ListItem>
        )}
      </List>
    </div>
  );
}

function NewListItemDialogButton(props: { parentNode: TListNode }) {
  const { store, updateNodes } = useDecodedDataContext();
  const templateNode = defaultNodeValue(
    props.parentNode.children.length > 0
      ? store.nodes[props.parentNode.children[0]].type
      : RefinedType.String,
    props.parentNode,
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [draftNode, setDraftNode] = useState<DraftNode>({
    valueNode: templateNode,
  });
  if (updateNodes == null) {
    return null;
  }
  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        size="small"
        onClick={() => setIsDialogOpen(true)}
        startIcon={<Add />}
      >
        Add
      </Button>
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        aria-labelledby="new-field-dialog-title"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="new-field-dialog-title">Add New List Item</DialogTitle>
        <DialogContent className={css({ display: "flex" })}>
          {props.parentNode.children.length === 0 && (
            <>
              <FormControl variant="filled" className={css({ minWidth: 120 })}>
                <InputLabel id="select-type-label">Type</InputLabel>
                <Select
                  labelId="select-type-label"
                  value={draftNode.valueNode?.type ?? ""}
                  onChange={(event) => {
                    const newType: RefinedType = event.target.value as RefinedType;
                    setDraftNode({
                      valueNode: defaultNodeValue(newType, props.parentNode),
                    });
                  }}
                  fullWidth
                >
                  <MenuItem value={RefinedType.String}>Text</MenuItem>
                  <MenuItem value={RefinedType.Number}>Number</MenuItem>
                  <MenuItem value={RefinedType.Date}>Date</MenuItem>
                </Select>
              </FormControl>
              <HorizontalSpace s1 />
            </>
          )}
          <EditValueInput node={draftNode} onChange={setDraftNode} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (draftNode.valueNode !== null) {
                const newParentnode = {
                  ...props.parentNode,
                  children: [...props.parentNode.children, draftNode.valueNode.key],
                };
                updateNodes([
                  ...(draftNode.childNodes ?? []),
                  draftNode.valueNode,
                  newParentnode,
                ]);
              }
              setDraftNode({ valueNode: templateNode });
              setIsDialogOpen(false);
            }}
            color="primary"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
