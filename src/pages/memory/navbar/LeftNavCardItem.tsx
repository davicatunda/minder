import React, { Dispatch, SetStateAction } from "react";

import { CardListItem } from "../MemoryPage";
import CardNavBarItem from "../vault/CardNavBarItem";

type LeftNavCardItemProps = {
  card: CardListItem;
  setCards: Dispatch<SetStateAction<CardListItem[]>>;
};
export default function LeftNavCardItem({ card, setCards }: LeftNavCardItemProps) {
  const toogleCardVisibility = (selectedCard: CardListItem) =>
    setCards((oldCards) =>
      oldCards.map((oldCard) =>
        selectedCard.id === oldCard.id
          ? { ...oldCard, isOpen: !oldCard.isOpen }
          : oldCard,
      ),
    );
  return <CardNavBarItem card={card} toogleCardVisibility={toogleCardVisibility} />;
}
