import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import CreateIcon from "@material-ui/icons/Create";
import ObjectFieldEditDialog from "./ObjectFieldEditDialog";
import { TObjectField } from "../../../../../utils/normalization";
import { css } from "@emotion/css";
import { useTheme } from "@material-ui/core";

export default function ObjectFieldPopoverEditButton(props: TObjectField) {
  const theme = useTheme();
  const [isEditting, setIsEditting] = useState(false);
  return (
    <>
      <Button
        classes={{
          root: css({
            flexShrink: 0,
            display: "flex",
            borderRadius: 0,
            borderInlineStartWidth: 1,
            borderInlineStartColor: theme.palette.divider,
            borderInlineStartStyle: "solid",
          }),
        }}
        onClick={(e) => {
          e.stopPropagation();
          setIsEditting(true);
        }}
      >
        <CreateIcon fontSize="small" />
      </Button>
      {isEditting && (
        <ObjectFieldEditDialog
          objectFieldNode={props}
          dialogProps={{
            open: isEditting,
            onClose: () => setIsEditting(false),
          }}
          closeDialog={() => setIsEditting(false)}
        />
      )}
    </>
  );
}
