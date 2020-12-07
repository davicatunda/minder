import { createContext, useContext, useState } from "react";

import { TObjectField } from "../utils/normalization";

type TDraggableItemsContext = {
  draggedItem: TObjectField | null;
  setDraggedItem(item: TObjectField | null): void;
};
export const DraggableItemsContext = createContext<TDraggableItemsContext | null>(
  null,
);
export function useDraggableItemsContext() {
  const context = useContext(DraggableItemsContext);
  if (context == null) {
    throw new Error("missing DraggableItemsContext.Provider");
  }
  return context;
}

export default function useDraggableItemsProvider() {
  const [draggedItem, setDraggedItem] = useState<TObjectField | null>(null);
  return {
    draggedItem,
    setDraggedItem,
  };
}
