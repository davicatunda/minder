import { Typography, useTheme } from "@material-ui/core";
import { useDataAsStore, useDataDecryption } from "../../../../utils/encryption";

import BreadcrumbPaths from "../BreadcrumbPaths";
import BreadcrumbsProvider from "../BreadcrumbsProvider";
import CardView from "../cards/CardView";
import { DecodedDataContext } from "../../useDecodedDataContext";
import MemoryVaultInfo from "../info/MemoryVaultInfo";
import MemoryVaultLayout from "../MemoryVaultLayout";
import MemoryVaultLockEditModeButton from "../MemoryVaultLockEditModeButton";
import MemoryVaultSaveDataButton from "../info/MemoryVaultSaveDataButton";
import MemoryVaultSaveKeyButton from "../info/MemoryVaultSaveKeyButton";
import MemoryVaultSettingsMenu from "../MemoryVaultSettingsMenu";
import React from "react";
import { css } from "@emotion/css";

type CreatingPreviewVaultData = {
  title: string;
  encryptionKey: string;
  initialData: string;
};

export default function MemoryVaultPreview({
  title,
  encryptionKey,
  initialData,
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
    <BreadcrumbsProvider>
      <DecodedDataContext.Provider
        value={{ store, updateNodes: null, encryptionKey }}
      >
        <div
          className={css({
            display: "flex",
            flex: 1,
            position: "relative",
          })}
        >
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
          <MemoryVaultLayout
            header={<BreadcrumbPaths />}
            body={
              !hasFailed ? (
                <CardView nodeKey={store.rootNode.value} />
              ) : (
                <Typography variant="body2" color="textSecondary" component="p">
                  Data mismatch
                </Typography>
              )
            }
            bodyButton={<MemoryVaultLockEditModeButton />}
            info={<MemoryVaultInfo />}
            menuButton={<MemoryVaultSettingsMenu onDelete={() => {}} />}
            cardButtons={[
              <MemoryVaultSaveKeyButton />,
              <MemoryVaultSaveDataButton />,
            ]}
          />
        </div>
      </DecodedDataContext.Provider>
    </BreadcrumbsProvider>
  );
}
