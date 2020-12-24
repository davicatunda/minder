import { Button, Typography, useTheme } from "@material-ui/core";

import { Add } from "@material-ui/icons";
import { CardDataProps } from "../cards/CardRoot";
import MemoryVaultDataInput from "./inputs/MemoryVaultDataInput";
import MemoryVaultKeyInput from "./inputs/MemoryVaultKeyInput";
import MemoryVaultTitleInput from "./inputs/MemoryVaultTitleInput";
import React from "react";
import { useDataDecryption } from "../../../utils/encryption";

type Props = {
  standardProposal: {
    version: string;
    data: string;
  };
  value: CardDataProps;
  setValue(card: CardDataProps): void;
  onSubmit(): void;
  onCancel(): void;
};
export default function MemoryVaultCreateFormContents({
  standardProposal,
  value,
  setValue,
  onSubmit,
  onCancel,
}: Props) {
  const theme = useTheme();

  function setEncryptionKey(newEncryptionKey: string) {
    const newCardData = {
      ...value,
      initialValues: {
        ...value.initialValues,
        encryptionKey: newEncryptionKey,
      },
    };
    setValue(newCardData);
  }

  function setInitialData(newInitialData: string) {
    const newCardData = {
      ...value,
      initialValues: {
        ...value.initialValues,
        initialData: newInitialData,
      },
    };
    setValue(newCardData);
  }

  function setTitle(newTitle: string) {
    const newCardData = { ...value, title: newTitle };
    setValue(newCardData);
  }

  const { hasFailed } = useDataDecryption(
    value.initialValues.initialData,
    value.initialValues.encryptionKey,
  );
  const { encryptionKey, initialData } = value.initialValues;
  return (
    <>
      <MemoryVaultTitleInput title={value.title ?? ""} setTitle={setTitle} />
      <MemoryVaultKeyInput
        encryptionKey={encryptionKey}
        setEncryptionKey={setEncryptionKey}
      />
      <MemoryVaultDataInput
        standardProposal={standardProposal}
        setInitialData={setInitialData}
      />
      <div style={{ height: theme.spacing(2) }} />
      {initialData !== "" && encryptionKey !== null && hasFailed && (
        <Typography variant="body2" color="error" align="center">
          Key and data don't match
        </Typography>
      )}
      <Button
        fullWidth
        variant="contained"
        disabled={hasFailed || encryptionKey.length === 0}
        color="primary"
        size="small"
        startIcon={<Add />}
        onClick={() => {
          onSubmit();
        }}
      >
        Open
      </Button>
      <Button fullWidth size="small" onClick={onCancel}>
        Cancel
      </Button>
    </>
  );
}
