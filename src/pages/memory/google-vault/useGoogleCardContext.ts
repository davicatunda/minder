import { createContext, useContext } from "react";

type TGoogleCardContext = {
  googleResourceId: string;
};

export const GoogleCardContext = createContext<TGoogleCardContext | null>(null);

export default function useGoogleCardContext() {
  const context = useContext(GoogleCardContext);
  return context?.googleResourceId;
}
