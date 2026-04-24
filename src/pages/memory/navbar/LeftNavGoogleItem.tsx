import { Dispatch, SetStateAction } from "react";

import { GoogleCardListItem } from "../MemoryPage";
import GoogleCardNavBarItem from "../google-vault/GoogleCardNavBarItem";
import { useDrive } from "../../../google-integration/useDrive";

type LeftNavGoogleItemProps = {
  card: GoogleCardListItem;
  setGoogleCards: Dispatch<SetStateAction<GoogleCardListItem[]>>;
};
export default function LeftNavGoogleItem({
  card,
  setGoogleCards,
}: LeftNavGoogleItemProps) {
  const { load } = useDrive();

  const onClick = () => {
    if (card.vaultData.initialData === "") {
      setGoogleCards((oldCards) =>
        oldCards.map((oldCard) =>
          card.resourceId === oldCard.resourceId
            ? { ...oldCard, isLoading: true, isOpen: true }
            : oldCard,
        ),
      );
      load(card.resourceId).then((data) => {
        setGoogleCards((oldCards) =>
          oldCards.map((oldCard) =>
            card.resourceId === oldCard.resourceId
              ? {
                  ...oldCard,
                  isLoading: false,
                  isCreating: true,
                  vaultData: { ...oldCard.vaultData, initialData: data },
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
