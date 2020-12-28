import { IconButton, Paper, Typography, useTheme } from "@material-ui/core";
import { useDataAsStore, useDataDecryption } from "../../../../utils/encryption";

import CardView from "../cards/CardView";
import { Close } from "@material-ui/icons";
import { DecodedDataContext } from "../../useDecodedDataContext";
import MemoryVaultInfo from "../info/MemoryVaultInfo";
import React from "react";

type CreatingPreviewVaultData = {
  title: string;
  encryptionKey: string;
  initialData: string;
  onClose: () => void;
};

export default function MemoryVaultPreview({
  title,
  encryptionKey,
  initialData,
  onClose,
}: CreatingPreviewVaultData) {
  const theme = useTheme();
  const { decryptedData, hasFailed } = useDataDecryption(initialData, encryptionKey);
  const titleWithFallback = title === "" ? "Title" : title;
  const data = useDataAsStore(decryptedData, encryptionKey, titleWithFallback);
  if (!data) {
    return null;
  }
  const { store } = data;
  return (
    <DecodedDataContext.Provider value={{ store, updateNodes: null }}>
      <Paper
        style={{
          flex: 1,
          position: "relative",
          overflow: "hidden",
          padding: theme.spacing(3),
        }}
      >
        <div
          style={{
            position: "absolute",
            right: theme.spacing(1),
            top: theme.spacing(1),
            zIndex: 2,
          }}
        >
          <IconButton aria-label="cancel creation" onClick={onClose}>
            <Close />
          </IconButton>
        </div>
        <div
          style={{
            backgroundColor: theme.palette.background.default,
            opacity: 0.8,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h3">Preview</Typography>
        </div>
        <MemoryVaultInfo />
        <div style={{ height: theme.spacing(3) }} />
        {!hasFailed ? (
          <CardView nodeKey={store.rootNode.value} />
        ) : (
          <Typography variant="body2" color="textSecondary" component="p">
            Data mismatch
          </Typography>
        )}
      </Paper>
    </DecodedDataContext.Provider>
  );
}
