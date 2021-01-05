import { OutlinedInput, Typography } from "@material-ui/core";
import React, { useState } from "react";

import CardView from "../CardView";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import NewFieldDialogButton from "./NewFieldDialogButton";
import ObjectFieldNodeCardView from "./ObjectFieldNodeCardView";
import SearchIcon from "@material-ui/icons/Search";
import { TObjectNode } from "../../../../../utils/normalization";
import { VerticalSpace } from "../../../../core/Spacing";
import { css } from "@emotion/css";
import { useBreadcrumbsContext } from "../../BreadcrumbsProvider";
import { useEditingContext } from "../../EditingProvider";
import useSearchTextOnNodeRecursively from "./useSearchTextOnNodeRecursively";

type Props = {
  node: TObjectNode;
};
export default function ObjectNodeCardView({ node }: Props) {
  const { isEditing } = useEditingContext();
  const { breadcrumbs } = useBreadcrumbsContext();
  const [searchValue, setSearchValue] = useState("");
  const searchMatches = useSearchTextOnNodeRecursively(searchValue);
  const [searchHasFocus, setSearchHasFocus] = useState(false);
  const expandedField = node.fields.find(
    (field) => breadcrumbs.findIndex((f) => f.value === field.value) >= 0,
  );
  if (expandedField != null) {
    return (
      <>
        <VerticalSpace s1 />
        <div
          onClick={(event) => event.stopPropagation()}
          className={css({
            display: "flex",
            flexWrap: "wrap",
          })}
        >
          <CardView nodeKey={expandedField.value} />
        </div>
      </>
    );
  }
  return (
    <>
      <VerticalSpace s1 />
      {node.fields.length > 7 && (
        <>
          <FormControl
            size="small"
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
          <VerticalSpace s2 />
        </>
      )}
      {!isEditing && node.fields.length === 0 ? (
        <Typography variant="body1">Folder is empty</Typography>
      ) : (
        <div
          className={css({
            display: "flex",
            flexWrap: "wrap",
            margin: "-6px",
          })}
        >
          {node.fields
            .filter(
              (field) =>
                field.name
                  .toLocaleLowerCase()
                  .includes(searchValue.toLocaleLowerCase()) ||
                searchMatches(field.value),
            )
            .map((field, index) => (
              <ObjectFieldNodeCardView
                objectField={field}
                position={index}
                key={field.value}
              />
            ))}
          {isEditing && <NewFieldDialogButton parentNode={node} />}
          <span className={css({ flex: "1 0 50%", minWidth: 320 })} />
        </div>
      )}
    </>
  );
}
