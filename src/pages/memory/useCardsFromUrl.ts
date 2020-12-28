import { Dispatch, SetStateAction, useEffect } from "react";

import { CardListItem } from "./MemoryPage";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { v4 as uuid } from "uuid";

type RouteParams = {
  title?: string;
  key?: string;
  data?: string;
  readOnly?: string;
};

/**
 * Read the url params and initialize the appropriated cards
 * @param setCards
 */
export default function useCardsFromUrl(
  setCards: Dispatch<SetStateAction<CardListItem[]>>,
): void {
  const { search } = useLocation();

  useEffect(() => {
    const params: RouteParams = queryString.parse(search);
    if (params.key == null && params.data == null) {
      return;
    }
    const isCreating = params.key == null || params.data == null;
    const cardFromUrl = {
      id: uuid(),
      isOpen: true,
      isReadOnly: isCreating ? true : params.readOnly !== "false",
      isCreating,
      vaultData: {
        title: params.title ?? "",
        encryptionKey: params.key ? params.key.split(" ").join("+") : "",
        initialData: params.data ? params.data.split(" ").join("+") : "",
      },
    };

    setCards((old) => [cardFromUrl, ...old]);
  }, [search, setCards]);
}
