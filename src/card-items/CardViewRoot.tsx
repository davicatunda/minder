import { IconButton, Paper, Tooltip, Typography } from "@material-ui/core";
import {
  Store,
  TNode,
  denormalizeRoot,
  normalizeRoot,
} from "../utils/normalization";

import CardInfo from "./CardInfo";
import CardView from "./CardView";
import { Close } from "@material-ui/icons";
import React from "react";
import { useDataEncryptionInSync } from "../utils/encryption";

type TDecodedDataContext = {
  store: Store;
  updateNodes: ((nodes: TNode[]) => void) | null;
};
export const DecodedDataContext = React.createContext<TDecodedDataContext | null>(
  null,
);
export function useDecodedDataState() {
  const context = React.useContext(DecodedDataContext);
  if (context == null) {
    throw new Error("missing DecodedDataContext.Provider");
  }
  return context;
}

export type CardDataProps = {
  title: string;
  initialValues: {
    encryptionKey: string;
    initialData: string;
  };
};
type Props = CardDataProps & {
  onClose: () => void;
};
function CardViewRoot({
  title,
  initialValues: { encryptionKey, initialData },
  onClose,
}: Props) {
  const { decodedData, setDecodedData, encryptedData } = useDataEncryptionInSync(
    encryptionKey,
    initialData,
  );
  if (!decodedData) {
    return null;
  }
  const store = normalizeRoot(decodedData, { title, encryptionKey });
  const updateNodes = (nodes: TNode[]) => {
    const newNodes = { ...store.nodes };
    nodes.forEach((node) => (newNodes[node.key] = node));
    const newStore = {
      rootNode: {
        ...store.rootNode,
        updated: new Date(),
      },
      nodes: newNodes,
    };
    setDecodedData(denormalizeRoot(newStore));
  };
  return (
    <DecodedDataContext.Provider value={{ store, updateNodes }}>
      <Paper style={{ position: "relative", padding: 24 }}>
        <div style={{ position: "absolute", right: 8, top: 8 }}>
          <Tooltip title="Did you save? Just checking" arrow>
            <IconButton aria-label="close card" onClick={onClose}>
              <Close />
            </IconButton>
          </Tooltip>
        </div>
        <CardInfo rootNode={store.rootNode} encryptedData={encryptedData} />
        <div style={{ height: 24 }} />
        <Typography variant="h2">Data</Typography>
        <CardView nodeKey={store.rootNode.value} />
      </Paper>
    </DecodedDataContext.Provider>
  );
}

export default CardViewRoot;
