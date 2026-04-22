import { Dispatch, SetStateAction, useContext, useEffect } from "react";

import { GoogleCardListItem } from "./MemoryPage";
import { DriveFile, useDrive } from "../../google-integration/useDrive";
import { GoogleAuthContext } from "../../google-integration/GoogleAuth";

export default function useCardsFromGoogleDrive(
  setGoogleCards: Dispatch<SetStateAction<GoogleCardListItem[]>>,
): void {
  const { user } = useContext(GoogleAuthContext);
  const { listAll } = useDrive();
  const isLoggedIn = user !== null;

  useEffect(() => {
    if (!isLoggedIn) {
      setGoogleCards([]);
    } else {
      listAll().then((files) => {
        setGoogleCards(files.map(filetoListItem));
      });
    }
  }, [listAll, isLoggedIn]);
}

function filetoListItem(file: DriveFile): GoogleCardListItem {
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
