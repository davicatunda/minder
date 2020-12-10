import { Store, TNode } from "../../utils/normalization";
import { createContext, useContext } from "react";

type TDecodedDataContext = {
  store: Store;
  updateNodes: ((nodes: TNode[]) => void) | null;
};
export const DecodedDataContext = createContext<TDecodedDataContext | null>(null);

export default function useDecodedDataContext() {
  const context = useContext(DecodedDataContext);
  if (context == null) {
    throw new Error("missing DecodedDataContext.Provider");
  }
  return context;
}
