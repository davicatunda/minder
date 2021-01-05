import React, { useState } from "react";

import CreateIcon from "@material-ui/icons/Create";
import { IconButton } from "@material-ui/core";
import ObjectFieldEditDialog from "./ObjectFieldEditDialog";
import { TObjectField } from "../../../../../utils/normalization";

export default function ObjectFieldEditButton(props: TObjectField) {
  const [isEditting, setIsEditting] = useState(false);
  return (
    <>
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          setIsEditting(true);
        }}
      >
        <CreateIcon fontSize="small" />
      </IconButton>
      {isEditting && (
        <span onClick={(e) => e.stopPropagation()}>
          <ObjectFieldEditDialog
            objectFieldNode={props}
            dialogProps={{
              open: isEditting,
              onClose: () => setIsEditting(false),
            }}
            closeDialog={() => setIsEditting(false)}
          />
        </span>
      )}
    </>
  );
}
