import React, { useState } from "react";
import {
  RefinedType,
  TNode,
  TObjectNode,
  defaultNodeValue,
} from "../utils/normalization";

import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditValueNodeInput from "./EditValueNodeInput";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import ObjectFieldNodeCardView from "./ObjectFieldNodeCardView";
import SearchIcon from "@material-ui/icons/Search";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import { useDecodedDataState } from "./CardViewRoot";
import useSearchTextOnNodeRecursively from "./useSearchTextOnNodeRecursively";
import { useTheme } from "@material-ui/core";

type Props = { node: TObjectNode };
export default function ObjectNodeCardView({ node }: Props) {
  const [searchValue, setSearchValue] = useState("");
  const searchMatches = useSearchTextOnNodeRecursively(searchValue);
  const theme = useTheme();

  return (
    <div>
      <div onClick={(e) => e.stopPropagation()}>
        {node.fields.length > 7 ? (
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
      <div style={{ height: theme.spacing(2) }} />
      <Grid container spacing={1}>
        {node.fields
          .filter(
            (field) =>
              field.name
                .toLocaleLowerCase()
                .includes(searchValue.toLocaleLowerCase()) ||
              searchMatches(field.value),
          )
          .map((field) => (
            <ObjectFieldNodeCardView
              field={field}
              parentNode={node}
              key={field.value}
            />
          ))}
        <Grid item xs={12} sm={6} md={4} style={{ display: "flex" }}>
          <NewFieldDialogButton parentNode={node} />
        </Grid>
      </Grid>
    </div>
  );
}

function NewFieldDialogButton(props: { parentNode: TObjectNode }) {
  const theme = useTheme();
  const { updateNodes } = useDecodedDataState();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [valueNode, setValueNode] = useState<TNode | null>(null);
  const [fieldName, setFieldName] = useState<string>("");
  if (updateNodes === null) {
    return null;
  }
  return (
    <span onClick={(e) => e.stopPropagation()} style={{ display: "flex", flex: 1 }}>
      <Button
        variant="outlined"
        color="primary"
        size="large"
        fullWidth
        onClick={(e) => {
          setIsDialogOpen(true);
        }}
        startIcon={<AddIcon />}
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
        <DialogTitle id="new-field-dialog-title">Add New Field</DialogTitle>
        <DialogContent>
          <div style={{ display: "flex" }}>
            <TextField
              label="Name"
              variant="outlined"
              type="string"
              autoFocus
              value={fieldName}
              onChange={(event) => setFieldName(event.target.value)}
              fullWidth
            />
            <span style={{ width: theme.spacing(1) }} />
            <FormControl variant="outlined" style={{ minWidth: 120 }}>
              <InputLabel>Type</InputLabel>
              <Select
                label="Type"
                value={valueNode?.type ?? ""}
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
          </div>
          <div style={{ height: theme.spacing(1) }} />
          <EditValueNodeInput node={valueNode} onChange={setValueNode} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (valueNode) {
                const newParentNode: TObjectNode = {
                  ...props.parentNode,
                  fields: [
                    ...props.parentNode.fields,
                    { name: fieldName, value: valueNode.key },
                  ],
                };
                updateNodes([valueNode, newParentNode]);
              }
              setIsDialogOpen(false);
              setValueNode(null);
              setFieldName("");
            }}
            color="primary"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}
