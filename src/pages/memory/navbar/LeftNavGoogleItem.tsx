import React, { Dispatch, SetStateAction, useState } from "react";

import { GoogleCardListItem } from "../MemoryPage";
import GoogleCardNavBarItem from "../google-vault/GoogleCardNavBarItem";

type LeftNavGoogleItemProps = {
  card: GoogleCardListItem;
  setGoogleCards: Dispatch<SetStateAction<GoogleCardListItem[]>>;
};
export default function LeftNavGoogleItem({
  card,
  setGoogleCards,
}: LeftNavGoogleItemProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const onClick = () => {
    if (card.vaultData.initialData === "" && !isDownloading) {
      setIsDownloading(true);
      gapi.client.drive.files
        .get({ fileId: card.resourceId, alt: "media" })
        .then(({ body }: { body: string }) => {
          setIsDownloading(false);
          setGoogleCards((oldCards) =>
            oldCards.map((oldCard) =>
              card.resourceId === oldCard.resourceId
                ? {
                    ...oldCard,
                    vaultData: { ...oldCard.vaultData, initialData: body },
                  }
                : oldCard,
            ),
          );
        });
    }
    setGoogleCards((oldCards) =>
      oldCards.map((oldCard) =>
        card.resourceId === oldCard.resourceId
          ? { ...oldCard, isOpen: !oldCard.isOpen }
          : oldCard,
      ),
    );
  };
  return <GoogleCardNavBarItem card={card} onClick={onClick} />;
}
