import { Add, Delete } from "@material-ui/icons";
import { Button, IconButton, Typography, useTheme } from "@material-ui/core";

import MemoryVaultKeyInput from "../vault/create/inputs/MemoryVaultKeyInput";
import MemoryVaultTitleInput from "../vault/create/inputs/MemoryVaultTitleInput";
import React from "react";
import { VaultData } from "../vault/MemoryVault";
import { VerticalSpace } from "../../core/Spacing";
import { css } from "@emotion/css";
import { useDataDecryption } from "../../../utils/encryption";

type Props = {
  vaultData: VaultData;
  onChange: (vaultData: VaultData) => void;
  onDelete: () => void;
};
export default function GooglemMemoryVaultCreateForm({
  vaultData,
  onChange,
  onDelete,
}: Props) {
  const theme = useTheme();
  const { title, encryptionKey, initialData } = vaultData;
  const { hasFailed } = useDataDecryption(initialData, encryptionKey);
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
        <Delete />
      </IconButton>
      <Typography variant="h5" color="textPrimary" gutterBottom align="center">
        Open
      </Typography>
      <VerticalSpace s2 />
      <MemoryVaultTitleInput
        title={title}
        setTitle={(title: string) => onChange({ ...vaultData, title })}
      />
      <MemoryVaultKeyInput
        encryptionKey={encryptionKey}
        setEncryptionKey={(encryptionKey) =>
          onChange({ ...vaultData, encryptionKey })
        }
      />
      <VerticalSpace s2 grow />
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
        type="submit"
      >
        Open
      </Button>
    </>
  );
}
