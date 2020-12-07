import React, { useState } from "react";
import {
  RefinedType,
  TListNode,
  TNode,
  defaultNodeValue,
} from "../utils/normalization";

import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import CardView from "./CardView";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditValueInput from "./EditValueNodeInput";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import NodeTypeIcon from "./NodeTypeIcon";
import SearchIcon from "@material-ui/icons/Search";
import Select from "@material-ui/core/Select";
import useDecodedDataContext from "./useDecodedDataContext";
import useSearchTextOnNodeRecursively from "./useSearchTextOnNodeRecursively";

export default function ListNodeCardView(props: { node: TListNode }) {
  const [searchValue, setSearchValue] = useState("");
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
        {props.node.children.filter(searchMatches).map((key) => (
          <ListItem button>
            <ListItemIcon>
              <NodeTypeIcon nodeKey={key} />
            </ListItemIcon>
            <ListItemText primary={<CardView nodeKey={key} />} />
          </ListItem>
        ))}
        <ListItem>
          <ListItemText
            onClick={(e) => e.stopPropagation()}
            primary={<NewListItemDialogButton parentNode={props.node} />}
          />
        </ListItem>
      </List>
    </div>
  );
}

function NewListItemDialogButton(props: { parentNode: TListNode }) {
  const { store, updateNodes } = useDecodedDataContext();
  const templateNode =
    props.parentNode.children.length > 0
      ? defaultNodeValue(
          store.nodes[props.parentNode.children[0]].type,
          props.parentNode,
        )
      : null;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [valueNode, setValueNode] = useState<TNode | null>(templateNode);
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
        startIcon={<AddIcon />}
      >
        Add{" "}
      </Button>
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        aria-labelledby="new-field-dialog-title"
      >
        <DialogTitle id="new-field-dialog-title">Add New List Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            All items on a list must have the same type.
          </DialogContentText>
          {!templateNode && (
            <FormControl>
              <InputLabel id="select-type-label">Type</InputLabel>
              <Select
                labelId="select-type-label"
                value={valueNode?.type ?? ""}
                onChange={(event) => {
                  const newType: RefinedType = event.target.value as RefinedType;
                  setValueNode(defaultNodeValue(newType, props.parentNode));
                }}
                fullWidth
              >
                <MenuItem value={RefinedType.Boolean}>Boolean</MenuItem>
                <MenuItem value={RefinedType.Date}>Date</MenuItem>
                <MenuItem value={RefinedType.Number}>Number</MenuItem>
                <MenuItem value={RefinedType.Object}>Object</MenuItem>
                <MenuItem value={RefinedType.String}>String</MenuItem>
              </Select>
            </FormControl>
          )}
          <EditValueInput node={valueNode} onChange={setValueNode} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (valueNode !== null) {
                const newParentnode = {
                  ...props.parentNode,
                  children: [...props.parentNode.children, valueNode.key],
                };
                updateNodes([valueNode, newParentnode]);
              }
              setValueNode(templateNode);
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
