import React, { Dispatch, SetStateAction } from "react";

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
  const onClick = () => {
    if (card.vaultData.initialData === "" && !card.isLoading) {
      setGoogleCards((oldCards) =>
        oldCards.map((oldCard) =>
          card.resourceId === oldCard.resourceId
            ? { ...oldCard, isLoading: true, isOpen: true }
            : oldCard,
        ),
      );
      gapi.client.drive.files
        .get({ fileId: card.resourceId, alt: "media" })
        .then(({ body }: { body: string }) => {
          setGoogleCards((oldCards) =>
            oldCards.map((oldCard) =>
              card.resourceId === oldCard.resourceId
                ? {
                    ...oldCard,
                    isLoading: false,
                    isCreating: true,
                    vaultData: { ...oldCard.vaultData, initialData: body },
                  }
                : oldCard,
            ),
          );
        });
    } else {
      setGoogleCards((oldCards) =>
        oldCards.map((oldCard) =>
          card.resourceId === oldCard.resourceId
            ? { ...oldCard, isOpen: !oldCard.isOpen }
            : oldCard,
        ),
      );
    }
  };
  return <GoogleCardNavBarItem card={card} onClick={onClick} />;
}
