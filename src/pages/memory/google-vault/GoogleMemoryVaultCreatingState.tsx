import { Button, Grid, Paper, Typography, useTheme } from "@material-ui/core";

import { Add } from "@material-ui/icons";
import MemoryVaultKeyInput from "../vault/create/inputs/MemoryVaultKeyInput";
import MemoryVaultPreview from "../vault/create/MemoryVaultPreview";
import MemoryVaultTitleInput from "../vault/create/inputs/MemoryVaultTitleInput";
import React from "react";
import { VaultData } from "../vault/MemoryVault";
import { useDataDecryption } from "../../../utils/encryption";

type Props = {
  vaultData: VaultData;
  onClose: () => void;
  onChange: (vaultData: VaultData) => void;
  onSubmit: () => void;
};
export default function GoogleMemoryVaultCreatingState({
  vaultData,
  onClose,
  onChange,
  onSubmit,
}: Props) {
  const theme = useTheme();
  const { title, encryptionKey, initialData } = vaultData;
  const { hasFailed } = useDataDecryption(initialData, encryptionKey);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4} xl={3} style={{ display: "flex", minHeight: 500 }}>
        <Paper
          style={{
            padding: theme.spacing(2),
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
          }}
        >
          <Typography variant="h4" color="textPrimary" gutterBottom align="center">
            Open
          </Typography>
          <div style={{ height: theme.spacing(2) }} />
          <MemoryVaultTitleInput
            title={vaultData.title}
            setTitle={(title: string) => onChange({ ...vaultData, title })}
          />
          <MemoryVaultKeyInput
            encryptionKey={encryptionKey}
            setEncryptionKey={(encryptionKey) =>
              onChange({ ...vaultData, encryptionKey })
            }
          />

          <div style={{ flexGrow: 1, flexShrink: 0, flexBasis: theme.spacing(2) }} />
          {encryptionKey !== "" && hasFailed && (
            <Typography variant="body2" color="error" align="center">
              Key and data don't match
            </Typography>
          )}
          <Button
            fullWidth
            variant="contained"
            disabled={hasFailed || encryptionKey.length === 0}
            color="primary"
            size="medium"
            startIcon={<Add />}
            onClick={onSubmit}
          >
            Open
          </Button>
        </Paper>
      </Grid>
      <Grid item xs={12} md={8} xl={9} style={{ display: "flex" }}>
        <MemoryVaultPreview
          title={title}
          encryptionKey={encryptionKey}
          initialData={initialData}
          onClose={onClose}
        />
      </Grid>
    </Grid>
  );
}
