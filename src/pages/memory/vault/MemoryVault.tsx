import { useDataAsStore, useDataDecryption } from "../../../utils/encryption";
import useDraggableItemsProvider, {
  DraggableItemsContext,
} from "../useDraggableItemsContext";

import BreadcrumbPaths from "./BreadcrumbPaths";
import BreadcrumbsProvider from "./BreadcrumbsProvider";
import CardView from "./cards/CardView";
import { DecodedDataContext } from "../useDecodedDataContext";
import EditingProvider from "./EditingProvider";
import MemoryVaultInfo from "./info/MemoryVaultInfo";
import MemoryVaultLayout from "./MemoryVaultLayout";
import MemoryVaultLockEditModeButton from "./MemoryVaultLockEditModeButton";
import MemoryVaultSaveDataButton from "./info/MemoryVaultSaveDataButton";
import MemoryVaultSaveKeyButton from "./info/MemoryVaultSaveKeyButton";
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
  const draggableData = useDraggableItemsProvider();
  const { decryptedData } = useDataDecryption(initialData, encryptionKey);
  const data = useDataAsStore(decryptedData, { title });
  if (!data) {
    return null;
  }
  const { store, updateNodes } = data;
  return (
    <EditingProvider>
      <BreadcrumbsProvider>
        <DraggableItemsContext.Provider value={draggableData}>
          <DecodedDataContext.Provider
            value={{
              store,
              encryptionKey,
              updateNodes: isReadOnly ? null : updateNodes,
            }}
          >
            <MemoryVaultLayout
              header={<BreadcrumbPaths />}
              body={<CardView nodeKey={store.rootNode.value} />}
              bodyButton={<MemoryVaultLockEditModeButton />}
              info={<MemoryVaultInfo />}
              menuButton={<MemoryVaultSettingsMenu onDelete={onDelete} />}
              cardButtons={[
                <MemoryVaultSaveKeyButton />,
                <MemoryVaultSaveDataButton />,
              ]}
            />
            {children && children(store)}
          </DecodedDataContext.Provider>
        </DraggableItemsContext.Provider>
      </BreadcrumbsProvider>
    </EditingProvider>
  );
}
