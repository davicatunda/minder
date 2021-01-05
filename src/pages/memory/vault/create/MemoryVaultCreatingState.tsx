import MemoryVaultCreateForm from "./MemoryVaultCreateForm";
import MemoryVaultCreatingStateLayout from "./MemoryVaultCreatingStateLayout";
import MemoryVaultPreview from "./MemoryVaultPreview";
import React from "react";
import { VaultData } from "../MemoryVault";

type Props = {
  vaultData: VaultData;
  onDelete: () => void;
  onSubmit: () => void;
  onChange: (vaultData: VaultData) => void;
};

export default function MemoryVaultCreatingState({
  vaultData,
  onDelete,
  onSubmit,
  onChange,
}: Props) {
  return (
    <MemoryVaultCreatingStateLayout
      form={
        <MemoryVaultCreateForm
          vaultData={vaultData}
          onChange={onChange}
          onDelete={onDelete}
        />
      }
      preview={<MemoryVaultPreview {...vaultData} />}
      onSubmit={onSubmit}
    />
  );
}
