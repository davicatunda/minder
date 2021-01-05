import GooglemMemoryVaultCreateForm from "./GoogleMemoryVaultCreateForm";
import MemoryVaultCreatingStateLayout from "../vault/create/MemoryVaultCreatingStateLayout";
import MemoryVaultPreview from "../vault/create/MemoryVaultPreview";
import React from "react";
import { VaultData } from "../vault/MemoryVault";

type Props = {
  vaultData: VaultData;
  onDelete: () => void;
  onChange: (vaultData: VaultData) => void;
  onSubmit: () => void;
};
export default function GoogleMemoryVaultCreatingState({
  vaultData,
  onDelete,
  onChange,
  onSubmit,
}: Props) {
  return (
    <MemoryVaultCreatingStateLayout
      form={
        <GooglemMemoryVaultCreateForm
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
