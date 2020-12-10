import { IconButton, Paper, Tooltip, Typography, useTheme } from "@material-ui/core";
import useDraggableItemsProvider, {
  DraggableItemsContext,
} from "../useDraggableItemsContext";

import CardInfo from "./CardInfo";
import CardView from "./CardView";
import { Close } from "@material-ui/icons";
import { DecodedDataContext } from "../useDecodedDataContext";
import React from "react";
import { Store } from "../../../utils/normalization";
import { useDataEncryptionInSync } from "../../../utils/encryption";

export type CardDataProps = {
  children?(store: Store): void;
  title: string;
  initialValues: {
    encryptionKey: string;
    initialData: string;
  };
};
type Props = CardDataProps & {
  onClose: () => void;
};
export default function CardViewRoot({
  children,
  title,
  initialValues: { encryptionKey, initialData },
  onClose,
}: Props) {
  const theme = useTheme();
  const draggableData = useDraggableItemsProvider();
  const data = useDataEncryptionInSync(title, encryptionKey, initialData);
  if (!data) {
    return null;
  }
  const { store, updateNodes, encryptedData } = data;
  return (
    <DraggableItemsContext.Provider value={draggableData}>
      <DecodedDataContext.Provider value={{ store, updateNodes }}>
        <Paper style={{ position: "relative", padding: theme.spacing(3) }}>
          <div
            style={{
              position: "absolute",
              right: theme.spacing(1),
              top: theme.spacing(1),
            }}
          >
            <Tooltip title="Did you save? Just checking" arrow>
              <IconButton aria-label="close card" onClick={onClose}>
                <Close />
              </IconButton>
            </Tooltip>
          </div>
          <CardInfo rootNode={store.rootNode} encryptedData={encryptedData} />
          <div style={{ height: theme.spacing(3) }} />
          <Typography variant="h2">Data</Typography>
          <CardView nodeKey={store.rootNode.value} />
          {children && children(store)}
        </Paper>
      </DecodedDataContext.Provider>
    </DraggableItemsContext.Provider>
  );
}
