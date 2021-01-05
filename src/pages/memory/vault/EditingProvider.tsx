import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type TEditingContext = {
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
};
export const EditingContext = createContext<TEditingContext | null>(null);
export function useEditingContext() {
  const context = useContext(EditingContext);
  return context ?? { isEditing: false, setIsEditing: () => {} };
}

export default function EditingProvider({ children }: { children: ReactNode }) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <EditingContext.Provider value={{ isEditing, setIsEditing }}>
      {children}
    </EditingContext.Provider>
  );
}
