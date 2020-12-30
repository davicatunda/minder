import { Paper, useTheme } from "@material-ui/core";
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
import { VerticalSpace } from "../../core/Spacing";
import { css } from "@emotion/css";

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
        <Paper className={css({ position: "relative", padding: theme.spacing(3) })}>
          <div
            className={css({
              position: "absolute",
              right: theme.spacing(1),
              top: theme.spacing(1),
            })}
          >
            <MemoryVaultSettingsMenu onDelete={onDelete} />
          </div>
          <MemoryVaultInfo />
          <VerticalSpace s3 />
          <CardView nodeKey={store.rootNode.value} />
        </Paper>
      </DecodedDataContext.Provider>
    </DraggableItemsContext.Provider>
  );
}
