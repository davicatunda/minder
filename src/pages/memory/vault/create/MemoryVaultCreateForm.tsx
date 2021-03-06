import { Add, Close } from "@material-ui/icons";
import { Button, IconButton, Typography, useTheme } from "@material-ui/core";

import MemoryVaultDataInput from "./inputs/MemoryVaultDataInput";
import MemoryVaultKeyInput from "./inputs/MemoryVaultKeyInput";
import MemoryVaultTitleInput from "./inputs/MemoryVaultTitleInput";
import React from "react";
import { VaultData } from "../MemoryVault";
import { VerticalSpace } from "../../../core/Spacing";
import { css } from "@emotion/css";
import { useDataDecryption } from "../../../../utils/encryption";

type Props = {
  vaultData: VaultData;
  onChange: (vaultData: VaultData) => void;
  onDelete: () => void;
};
export default function MemoryVaultCreateForm({
  vaultData,
  onChange,
  onDelete,
}: Props) {
  const theme = useTheme();
  const { hasFailed } = useDataDecryption(
    vaultData.initialData,
    vaultData.encryptionKey,
  );
  return (
    <>
      <IconButton
        onClick={onDelete}
        classes={{
          root: css({
            position: "absolute",
            right: theme.spacing(1),
            top: theme.spacing(1),
          }),
        }}
      >
        <Close />
      </IconButton>
      <Typography variant="h5" color="textPrimary" gutterBottom align="center">
        Open
      </Typography>
      <VerticalSpace s2 />
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
      <VerticalSpace s2 grow />
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
        type="submit"
      >
        Open
      </Button>
    </>
  );
}
