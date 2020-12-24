import { IconButton, Paper, Tooltip, useTheme } from "@material-ui/core";
import { useDataAsStore, useDataDecryption } from "../../../utils/encryption";
import useDraggableItemsProvider, {
  DraggableItemsContext,
} from "../useDraggableItemsContext";

import CardView from "./cards/CardView";
import { Close } from "@material-ui/icons";
import { DecodedDataContext } from "../useDecodedDataContext";
import MemoryVaultInfo from "./CardInfo";
import React from "react";
import { Store } from "../../../utils/normalization";

export type CardDataProps = {
  children?(store: Store): void;
  title?: string;
  isReadOnly?: boolean;
  initialValues: {
    encryptionKey: string;
    initialData: string;
  };
};
type Props = CardDataProps & {
  onClose: () => void;
};
export default function MemoryVault({
  children,
  title,
  isReadOnly = false,
  initialValues: { encryptionKey, initialData },
  onClose,
}: Props) {
  const theme = useTheme();
  const draggableData = useDraggableItemsProvider();
  const { decryptedData } = useDataDecryption(initialData, encryptionKey);
  const data = useDataAsStore(decryptedData, encryptionKey, title);
  if (!data) {
    return null;
  }
  const { store, updateNodes } = data;
  return (
    <DraggableItemsContext.Provider value={draggableData}>
      <DecodedDataContext.Provider
        value={{ store, updateNodes: isReadOnly ? null : updateNodes }}
      >
        <Paper style={{ position: "relative", padding: theme.spacing(3) }}>
          <div
            style={{
              position: "absolute",
              right: theme.spacing(1),
              top: theme.spacing(1),
            }}
          >
            <Tooltip title="Did you save? Just checking" arrow>
              <IconButton aria-label="close card" onClick={onClose}>
                <Close />
              </IconButton>
            </Tooltip>
          </div>
          <MemoryVaultInfo />
          <div style={{ height: theme.spacing(3) }} />
          <CardView nodeKey={store.rootNode.value} />
          {children && children(store)}
        </Paper>
      </DecodedDataContext.Provider>
    </DraggableItemsContext.Provider>
  );
}
