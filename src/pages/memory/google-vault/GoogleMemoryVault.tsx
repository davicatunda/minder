import MemoryVault, { VaultData } from "../vault/MemoryVault";

import { GoogleCardContext } from "./useGoogleCardContext";
import React from "react";

export default function GoogleMemoryVault({
  vaultData,
  resourceId,
  onDelete,
}: {
  vaultData: VaultData;
  resourceId: string;
  onDelete: () => void;
}) {
  return (
    <GoogleCardContext.Provider value={{ googleResourceId: resourceId }}>
      <MemoryVault vaultData={vaultData} onDelete={onDelete} />
    </GoogleCardContext.Provider>
  );
}
