import React, { useContext, useRef, useState } from "react";
import {
  RefinedType,
  TObjectField,
  TObjectNode,
} from "../../../../../utils/normalization";

import { DraggableItemsContext } from "../../../useDraggableItemsContext";
import useDecodedDataContext from "../../../useDecodedDataContext";
import { useTheme } from "@material-ui/core";

type useDragObjectFieldReturn = {
  draggableContainerProps: {
    draggable: boolean;
    style?: React.CSSProperties;
    onDragStart?(event: React.DragEvent<HTMLDivElement>): void;
    onDragEnd?(event: React.DragEvent<HTMLDivElement>): void;
  };
  dropTargetProps: {
    ref?: React.Ref<HTMLDivElement>;
    style: React.CSSProperties;
    onDrop?(event: React.DragEvent<HTMLDivElement>): void;
    onDragOver?(event: React.DragEvent<HTMLDivElement>): void;
    onDragLeave?(event: React.DragEvent<HTMLDivElement>): void;
  };
};

export default function useDragObjectField(
  item: TObjectField,
): useDragObjectFieldReturn {
  const ref = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const { store, updateNodes } = useDecodedDataContext();
  const [hoverStatus, setHover] = useState<"AFTER" | "BEFORE" | null>(null);
  const context = useContext(DraggableItemsContext);
  if (updateNodes === null || context === null) {
    return {
      draggableContainerProps: {
        draggable: false,
      },
      dropTargetProps: {
        style: { display: "none" },
      },
    };
  }
  const { draggedItem, setDraggedItem } = context;
  const isBeingDragged = item.value === draggedItem?.value;
  return {
    draggableContainerProps: {
      draggable: true,
      style: { position: "relative" },
      onDragStart: (event) => {
        setDraggedItem(item);
        event.stopPropagation();
      },
      onDragEnd: () => setDraggedItem(null),
    },
    dropTargetProps: {
      ref,
      style: {
        position: "absolute",
        display: draggedItem === null ? "none" : undefined,
        zIndex: 1,
        borderColor: theme.palette.primary.main,
        ...(isBeingDragged
          ? {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              borderWidth: 2,
              borderRadius: theme.shape.borderRadius,
              borderStyle: "dashed",
            }
          : {
              top: 4,
              bottom: 4,
              left: -2,
              right: -2,
              borderWidth: 4,
              borderLeftStyle: hoverStatus === "BEFORE" ? "solid" : "none",
              borderRightStyle: hoverStatus === "AFTER" ? "solid" : "none",
              borderTopStyle: "none",
              borderBottomStyle: "none",
            }),
      },
      onDrop: () => {
        if (hoverStatus === null || draggedItem === null) {
          return;
        }
        const sourceParent = store.nodes[draggedItem.parentKey];
        const targetParent = store.nodes[item.parentKey];
        if (
          sourceParent.type !== RefinedType.Object ||
          targetParent.type !== RefinedType.Object
        ) {
          // we can only drag a field into an object from an object
          return;
        }

        // remove item from source
        const newSourceParent: TObjectNode = {
          ...sourceParent,
          fields: sourceParent.fields.filter((f) => f.value !== draggedItem.value),
        };
        if (item.parentKey === draggedItem.parentKey) {
          updateNodes([
            insertIntoPlace(newSourceParent, draggedItem, item, hoverStatus),
          ]);
        } else {
          updateNodes([
            newSourceParent,
            insertIntoPlace(targetParent, draggedItem, item, hoverStatus),
          ]);
        }
        setHover(null);
        setDraggedItem(null);
      },
      onDragOver: (event) => {
        if (ref.current == null || isBeingDragged) {
          return;
        }
        const boundingBox = ref.current.getBoundingClientRect();
        const halfWidth = boundingBox.width / 2;
        const centerX = boundingBox.left + halfWidth;
        setHover(event.pageX > centerX ? "AFTER" : "BEFORE");
        event.preventDefault();
      },
      onDragLeave: () => {
        setHover(null);
      },
    },
  };
}

function insertIntoPlace(
  parentNode: TObjectNode,
  draggedItem: TObjectField,
  droppedItem: TObjectField,
  hoverStatus: "AFTER" | "BEFORE",
): TObjectNode {
  const offset = hoverStatus === "AFTER" ? 1 : 0;
  const newPosition =
    parentNode.fields.findIndex((f) => f.value === droppedItem.value) + offset;
  return {
    ...parentNode,
    fields: [
      ...parentNode.fields.slice(0, newPosition),
      draggedItem,
      ...parentNode.fields.slice(newPosition),
    ],
  };
}
