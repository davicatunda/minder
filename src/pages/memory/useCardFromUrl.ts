import { CardDataProps } from "./vault/MemoryVault";
import queryString from "query-string";
import { useLocation } from "react-router-dom";

type RouteParams = {
  title?: string;
  key?: string;
  data?: string;
  readOnly?: string;
};
export default function useCardFromUrl():
  | { initialCard: CardDataProps; initialPreviewCard: null }
  | { initialCard: null; initialPreviewCard: CardDataProps } {
  const { search } = useLocation();
  const params: RouteParams = queryString.parse(search);

  const title = params.title ?? "";
  const isReadOnly = params.readOnly !== "false";
  const encryptionKey = params.key ? params.key.split(" ").join("+") : "";
  const initialData = params.data ? params.data.split(" ").join("+") : "";
  const hasIncompleteData = params.key == null || params.data == null;

  const card = {
    title,
    initialValues: { encryptionKey, initialData },
    isReadOnly,
  };
  return hasIncompleteData
    ? { initialCard: null, initialPreviewCard: card }
    : { initialCard: card, initialPreviewCard: null };
}
