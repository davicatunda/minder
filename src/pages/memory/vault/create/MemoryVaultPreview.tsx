import { Paper, Typography, useTheme } from "@material-ui/core";
import { useDataAsStore, useDataDecryption } from "../../../../utils/encryption";

import CardView from "../cards/CardView";
import { DecodedDataContext } from "../../useDecodedDataContext";
import MemoryVaultInfo from "../info/MemoryVaultInfo";
import MemoryVaultSettingsMenu from "../MemoryVaultSettingsMenu";
import React from "react";
import { VerticalSpace } from "../../../core/Spacing";
import { css } from "@emotion/css";

type CreatingPreviewVaultData = {
  title: string;
  encryptionKey: string;
  initialData: string;
  onDelete: () => void;
};

export default function MemoryVaultPreview({
  title,
  encryptionKey,
  initialData,
  onDelete,
}: CreatingPreviewVaultData) {
  const theme = useTheme();
  const { decryptedData, hasFailed } = useDataDecryption(initialData, encryptionKey);
  const titleWithFallback = title === "" ? "Title" : title;
  const data = useDataAsStore(decryptedData, {
    title: titleWithFallback,
  });
  if (!data) {
    return null;
  }
  const { store } = data;
  return (
    <DecodedDataContext.Provider value={{ store, updateNodes: null, encryptionKey }}>
      <Paper
        className={css({
          flex: 1,
          position: "relative",
          overflow: "hidden",
          padding: theme.spacing(3),
        })}
      >
        <MemoryVaultSettingsMenu onDelete={onDelete} />
        <div
          className={css({
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
          })}
        >
          <Typography variant="h3">Preview</Typography>
        </div>
        <MemoryVaultInfo />
        <VerticalSpace s3 />
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
