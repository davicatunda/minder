import { Button, Paper, Typography, useTheme } from "@material-ui/core";

import { Add } from "@material-ui/icons";
import MemoryVaultDataInput from "./inputs/MemoryVaultDataInput";
import MemoryVaultKeyInput from "./inputs/MemoryVaultKeyInput";
import MemoryVaultTitleInput from "./inputs/MemoryVaultTitleInput";
import React from "react";
import { VaultData } from "../MemoryVault";
import { useDataDecryption } from "../../../../utils/encryption";

type Props = {
  vaultData: VaultData;
  onChange: (vaultData: VaultData) => void;
  onSubmit: () => void;
};

export default function MemoryVaultCreateForm({
  vaultData,
  onChange,
  onSubmit,
}: Props) {
  const theme = useTheme();
  const { hasFailed } = useDataDecryption(
    vaultData.initialData,
    vaultData.encryptionKey,
  );
  return (
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
        setTitle={(title) => onChange({ ...vaultData, title })}
      />
      <MemoryVaultKeyInput
        encryptionKey={vaultData.encryptionKey}
        setEncryptionKey={(encryptionKey) =>
          onChange({ ...vaultData, encryptionKey })
        }
      />
      <MemoryVaultDataInput
        setInitialData={(initialData) => onChange({ ...vaultData, initialData })}
      />
      <div style={{ flexGrow: 1, flexShrink: 0, flexBasis: theme.spacing(2) }} />
      {vaultData.initialData !== "" && vaultData.encryptionKey !== "" && hasFailed && (
        <Typography variant="body2" color="error" align="center">
          Key and data don't match
        </Typography>
      )}
      <Button
        fullWidth
        variant="contained"
        disabled={hasFailed || vaultData.encryptionKey.length === 0}
        color="primary"
        size="medium"
        startIcon={<Add />}
        onClick={() => {
          onSubmit();
        }}
      >
        Open
      </Button>
    </Paper>
  );
}
