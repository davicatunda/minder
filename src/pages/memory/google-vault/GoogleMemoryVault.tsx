import { IconButton, Paper, Tooltip, useTheme } from "@material-ui/core";
import { useDataAsStore, useDataDecryption } from "../../../utils/encryption";
import useDraggableItemsProvider, {
  DraggableItemsContext,
} from "../useDraggableItemsContext";

import CardView from "../vault/cards/CardView";
import { DecodedDataContext } from "../useDecodedDataContext";
import MemoryVaultInfo from "../vault/info/MemoryVaultInfo";
import MemoryVaultSettingsMenu from "../vault/MemoryVaultSettingsMenu";
import React from "react";
import { VaultData } from "../vault/MemoryVault";

export default function GoogleMemoryVault({
  vaultData: { title, encryptionKey, initialData },
  resourceId,
  onDelete,
}: {
  vaultData: VaultData;
  resourceId: string;
  onDelete: () => void;
}) {
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
        value={{ store, updateNodes, googleResourceId: resourceId, encryptionKey }}
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
        </Paper>
      </DecodedDataContext.Provider>
    </DraggableItemsContext.Provider>
  );
}
