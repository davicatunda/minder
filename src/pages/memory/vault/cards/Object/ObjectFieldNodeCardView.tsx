import {
  Button,
  Grow,
  Paper,
  Popover,
  PopoverProps,
  Typography,
  useTheme,
} from "@material-ui/core";
import React, { ReactNode, useRef, useState } from "react";
import { RefinedType, TObjectField } from "../../../../../utils/normalization";

import CardView from "../CardView";
import { FileCopy } from "@material-ui/icons";
import { HorizontalSpace } from "../../../../core/Spacing";
import NodeTypeIcon from "../NodeTypeIcon";
import ObjectFieldEditButton from "./ObjectFieldEditButton";
import ObjectFieldPopoverEditButton from "./ObjectFieldPopoverEditButton";
import { css } from "@emotion/css";
import textValueFromNode from "../textValueFromNode";
import { useBreadcrumbsContext } from "../../BreadcrumbsProvider";
import useDecodedDataContext from "../../../useDecodedDataContext";
import useDragObjectField from "./useDragObjectField";
import { useEditingContext } from "../../EditingProvider";

type Props = {
  objectField: TObjectField;
  position: number;
};
export default function ObjectFieldNodeCardView({ objectField, position }: Props) {
  const { isEditing } = useEditingContext();
  const theme = useTheme();
  const { setBreadcrumbs } = useBreadcrumbsContext();
  const { store } = useDecodedDataContext();
  const nodeValue = store.nodes[objectField.value];
  const { draggableContainerProps, dropTargetProps } = useDragObjectField(
    objectField,
  );
  const [isExpanded, setIsExpanded] = useState(false);
  const anchorRef = useRef(null);
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Grow in={true} timeout={position * 200} style={{ transformOrigin: "0 0 0" }}>
        <Paper
          {...draggableContainerProps}
          variant="outlined"
          onClick={(e) => {
            e.stopPropagation();
            if (
              nodeValue.type === RefinedType.Object ||
              nodeValue.type === RefinedType.List
            ) {
              if (isEditing) {
                setIsExpanded((old) => !old);
              } else {
                setBreadcrumbs((old) => [...old, objectField]);
              }
            } else {
              setOpen((isOpen) => !isOpen);
            }
          }}
          ref={anchorRef}
          classes={{
            root: css([
              {
                maxWidth: 450,
                cursor: "pointer",
                margin: theme.spacing(1),
                padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
              },
              !isEditing && { flexGrow: 1, flexBasis: 150 },
              isEditing && isExpanded && { flexBasis: "100%", maxWidth: "100%" },
            ]),
          }}
        >
          <div {...dropTargetProps} />
          <div className={css({ display: "flex", alignItems: "center" })}>
            <NodeTypeIcon nodeKey={objectField.value} />
            <HorizontalSpace s1 />
            <Typography
              variant="body2"
              classes={{
                root: css({
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }),
              }}
            >
              {objectField.name}
            </Typography>
            <HorizontalSpace s1 grow />
            {isEditing && isExpanded && <ObjectFieldEditButton {...objectField} />}
          </div>
          {isExpanded && isEditing && <CardView nodeKey={objectField.value} />}
        </Paper>
      </Grow>
      <ValuePreviewPopover
        popoverProps={{
          open,
          onClose: () => setOpen(false),
          anchorEl: anchorRef.current,
        }}
        objectField={objectField}
      >
        {isEditing && <ObjectFieldPopoverEditButton {...objectField} />}
        <CopyValueToClipboardButton
          objectField={objectField}
          onDone={() => setOpen(false)}
        />
      </ValuePreviewPopover>
    </>
  );
}

type ValuePreviewPopoverProps = {
  children?: ReactNode;
  popoverProps: PopoverProps;
  objectField: TObjectField;
};
function ValuePreviewPopover({
  children,
  popoverProps,
  objectField,
}: ValuePreviewPopoverProps) {
  const { store } = useDecodedDataContext();
  const theme = useTheme();
  return (
    <Popover
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      {...popoverProps}
      onClick={(e) => e.stopPropagation()}
    >
      <Paper
        className={css({
          maxWidth: 450,
          display: "flex",
          backgroundColor: theme.palette.background.default,
        })}
      >
        <span className={css({ margin: theme.spacing(2), minWidth: 150 })}>
          {textValueFromNode(store, objectField.value)}
        </span>
        <HorizontalSpace s1 grow />
        {children}
      </Paper>
    </Popover>
  );
}

type CopyValueToClipboardButtonProps = {
  objectField: TObjectField;
  onDone: () => void;
};
function CopyValueToClipboardButton({
  objectField,
  onDone,
}: CopyValueToClipboardButtonProps) {
  const theme = useTheme();
  const { store } = useDecodedDataContext();
  return (
    <Button
      className={css({
        flexShrink: 0,
        display: "flex",
        borderRadius: "0 4px 4px 0",
        borderInlineStartWidth: 1,
        borderInlineStartColor: theme.palette.divider,
        borderInlineStartStyle: "solid",
      })}
      onClick={(e) => {
        navigator.clipboard
          .writeText(textValueFromNode(store, objectField.value))
          .then(onDone);
      }}
    >
      <FileCopy fontSize="small" />
    </Button>
  );
}
