import { OutlinedInput, useTheme } from "@material-ui/core";
import React, { useState } from "react";

import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import NewFieldDialogButton from "./NewFieldDialogButton";
import ObjectFieldNodeCardView from "./ObjectFieldNodeCardView";
import SearchIcon from "@material-ui/icons/Search";
import { TObjectNode } from "../../../../../utils/normalization";
import useSearchTextOnNodeRecursively from "./useSearchTextOnNodeRecursively";

type Props = { node: TObjectNode };
export default function ObjectNodeCardView({ node }: Props) {
  const [searchValue, setSearchValue] = useState("");
  const searchMatches = useSearchTextOnNodeRecursively(searchValue);
  const theme = useTheme();
  const [searchHasFocus, setSearchHasFocus] = useState(false);
  return (
    <>
      {node.fields.length > 7 ? (
        <Grid item xs={12} sm={searchHasFocus ? 6 : 4} md={searchHasFocus ? 4 : 3}>
          <FormControl
            variant="outlined"
            fullWidth={searchHasFocus || searchValue !== ""}
          >
            <OutlinedInput
              onKeyDown={(event) => {
                if (event.key === " ") {
                  // You've seen nothing
                  event.preventDefault();
                  setSearchValue((v) => v + " ");
                  // I will stop remove this mess later
                }
              }}
              onFocus={() => setSearchHasFocus(true)}
              onBlur={() => setSearchHasFocus(false)}
              placeholder="Search ..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </FormControl>
          <div style={{ height: theme.spacing(2) }} />
        </Grid>
      ) : null}
      <Grid container spacing={1} onClick={(event) => event.stopPropagation()}>
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
              name={field.name}
              value={field.value}
              parentKey={node.key}
              key={field.value}
            />
          ))}
        <NewFieldDialogButton parentNode={node} />
      </Grid>
    </>
  );
}
