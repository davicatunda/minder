import { Grid } from "@material-ui/core";
import MemoryVaultCreateForm from "./MemoryVaultCreateForm";
import MemoryVaultPreview from "./MemoryVaultPreview";
import React from "react";
import { VaultData } from "../MemoryVault";

type Props = {
  vaultData: VaultData;
  onClose: () => void;
  onSubmit: () => void;
  onChange: (vaultData: VaultData) => void;
};

export default function MemoryVaultCreatingState({
  vaultData,
  onClose,
  onSubmit,
  onChange,
}: Props) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4} xl={3} style={{ display: "flex", minHeight: 500 }}>
        <MemoryVaultCreateForm
          vaultData={vaultData}
          onChange={onChange}
          onSubmit={onSubmit}
        />
      </Grid>
      <Grid item xs={12} md={8} xl={9} style={{ display: "flex" }}>
        <MemoryVaultPreview {...vaultData} onClose={onClose} />
      </Grid>
    </Grid>
  );
}
