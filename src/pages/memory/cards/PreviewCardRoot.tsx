import { Paper, Typography, useTheme } from "@material-ui/core";
import { useDataAsStore, useDataDecryption } from "../../../utils/encryption";

import CardInfo from "./CardInfo";
import CardView from "./CardView";
import { DecodedDataContext } from "../useDecodedDataContext";
import React from "react";

type Props = {
  title?: string;
  initialValues: {
    encryptionKey: string;
    initialData: string;
  };
};
export default function PreviewCardRoot({
  title,
  initialValues: { encryptionKey, initialData },
}: Props) {
  const theme = useTheme();
  const { decryptedData, hasFailed } = useDataDecryption(initialData, encryptionKey);
  const data = useDataAsStore(decryptedData, encryptionKey, title);
  if (!data) {
    return null;
  }
  const { store } = data;
  return (
    <DecodedDataContext.Provider value={{ store, updateNodes: null }}>
      <Paper
        style={{
          position: "relative",
          overflow: "hidden",
          padding: theme.spacing(3),
        }}
      >
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
        <CardInfo />
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
