import { Grid } from "@material-ui/core";
import MemoryVaultCreateForm from "./MemoryVaultCreateForm";
import MemoryVaultPreview from "./MemoryVaultPreview";
import React from "react";
import { VaultData } from "../MemoryVault";
import { css } from "@emotion/css";

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
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        md={4}
        xl={3}
        className={css({ display: "flex", minHeight: 500 })}
      >
        <MemoryVaultCreateForm
          vaultData={vaultData}
          onChange={onChange}
          onSubmit={onSubmit}
        />
      </Grid>
      <Grid item xs={12} md={8} xl={9} className={css({ display: "flex" })}>
        <MemoryVaultPreview {...vaultData} onDelete={onDelete} />
      </Grid>
    </Grid>
  );
}
