import { Paper, useTheme } from "@material-ui/core";
import { useDataAsStore, useDataDecryption } from "../../../utils/encryption";
import useDraggableItemsProvider, {
  DraggableItemsContext,
} from "../useDraggableItemsContext";

import CardView from "./cards/CardView";
import { DecodedDataContext } from "../useDecodedDataContext";
import MemoryVaultInfo from "./info/MemoryVaultInfo";
import MemoryVaultSettingsMenu from "./MemoryVaultSettingsMenu";
import React from "react";
import { Store } from "../../../utils/normalization";

export type VaultData = {
  title: string;
  encryptionKey: string;
  initialData: string;
};

type Props = {
  vaultData: VaultData;
  children?(store: Store): void;
  isReadOnly?: boolean;
  onDelete: () => void;
};

export default function MemoryVault({
  vaultData: { title, encryptionKey, initialData },
  children,
  isReadOnly = false,
  onDelete,
}: Props) {
  const theme = useTheme();
  const draggableData = useDraggableItemsProvider();
  const { decryptedData } = useDataDecryption(initialData, encryptionKey);
  const data = useDataAsStore(decryptedData, { title });
  if (!data) {
    return null;
  }
  const { store, updateNodes } = data;
  return (
    <DraggableItemsContext.Provider value={draggableData}>
      <DecodedDataContext.Provider
        value={{
          store,
          encryptionKey,
          updateNodes: isReadOnly ? null : updateNodes,
        }}
      >
        <Paper style={{ position: "relative", padding: theme.spacing(3) }}>
          <div
            style={{
              position: "absolute",
              right: theme.spacing(1),
              top: theme.spacing(1),
            }}
          >
            <MemoryVaultSettingsMenu onDelete={onDelete} />
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
