import { Dispatch, SetStateAction, useCallback } from "react";

import { GoogleCardListItem } from "./MemoryPage";
import { useGoogleFilesList } from "../../google-integration/useGoogleFilesList";

export default function useCardsFromGoogleDrive(
  setGoogleCards: Dispatch<SetStateAction<GoogleCardListItem[]>>,
): void {
  const onFetch = useCallback(
    (files: gapi.client.drive.File[]): void => {
      const listItems = files.map(filetoListItem);
      setGoogleCards(listItems);
    },
    [setGoogleCards],
  );
  useGoogleFilesList(onFetch);
}

function filetoListItem(file: gapi.client.drive.File): GoogleCardListItem {
  return {
    resourceId: file.id ?? "",
    vaultData: {
      title: file.appProperties?.title ?? "",
      encryptionKey: file.appProperties?.encryptionKey ?? "",
      initialData: "",
    },
    isLoading: false,
    isCreating: false,
    isOpen: false,
  };
}
