import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

import { TObjectField } from "../../../utils/normalization";

type TBreadcrumbsContext = {
  breadcrumbs: TObjectField[];
  setBreadcrumbs: Dispatch<SetStateAction<TObjectField[]>>;
};
export const BreadcrumbsContext = createContext<TBreadcrumbsContext | null>(null);
export function useBreadcrumbsContext() {
  const context = useContext(BreadcrumbsContext);
  if (context == null) {
    throw new Error("missing BreadcrumbsContext.Provider");
  }
  return context;
}

export default function BreadcrumbsProvider({ children }: { children: ReactNode }) {
  const [breadcrumbs, setBreadcrumbs] = useState<TObjectField[]>([]);

  return (
    <BreadcrumbsContext.Provider value={{ breadcrumbs, setBreadcrumbs }}>
      {children}
    </BreadcrumbsContext.Provider>
  );
}
