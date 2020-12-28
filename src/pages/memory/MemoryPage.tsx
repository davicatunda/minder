import React, { useState } from "react";

import GoogleMemoryCard from "./google-vault/GoogleMemoryCard";
import LeftNavAddCardItem from "./navbar/LeftNavAddCardItem";
import LeftNavCardItem from "./navbar/LeftNavCardItem";
import LeftNavGoogleItem from "./navbar/LeftNavGoogleItem";
import { List } from "@material-ui/core";
import MemoryCard from "./vault/MemoryCard";
import MemoryPageLayout from "./MemoryPageLayout";
import { VaultData } from "./vault/MemoryVault";
import useCardsFromGoogleDrive from "./useCardsFromGoogleDrive";
import useCardsFromUrl from "./useCardsFromUrl";

export type CardListItem = {
  vaultData: VaultData;
  id: string;
  isOpen: boolean;
  isCreating: boolean;
  isReadOnly: boolean;
};
export type GoogleCardListItem = {
  vaultData: VaultData;
  resourceId: string;
  isCreating: boolean;
  isOpen: boolean;
};

export default function MemoryPage() {
  const [googleCards, setGoogleCards] = useState<GoogleCardListItem[]>([]);
  useCardsFromGoogleDrive(setGoogleCards);

  const [cards, setCards] = useState<CardListItem[]>([]);
  useCardsFromUrl(setCards);

  const createdCards = cards.filter((card) => !card.isCreating);
  const LeftNavSections = [
    <LeftNavAddCardItem
      key="PreviewCardNavBar"
      addCard={(newCard) => setCards((oldCards) => [newCard, ...oldCards])}
    />,
    createdCards.length > 0 && (
      <List component="nav" key="CardNavBar">
        {createdCards.map((card) => (
          <LeftNavCardItem key={card.id} card={card} setCards={setCards} />
        ))}
      </List>
    ),
    googleCards.length > 0 && (
      <List component="nav" key="GoogleCardsNavBar">
        {googleCards.map((card) => (
          <LeftNavGoogleItem
            key={card.resourceId}
            card={card}
            setGoogleCards={setGoogleCards}
          />
        ))}
      </List>
    ),
  ];

  const BodyCards = [
    ...cards.map((card) => (
      <div style={{ display: card.isOpen ? "initial" : "none" }} key={card.id}>
        <MemoryCard card={card} setCards={setCards} />
      </div>
    )),
    ...googleCards.map((card) => (
      <div
        style={{ display: card.isOpen ? "initial" : "none" }}
        key={card.resourceId}
      >
        <GoogleMemoryCard card={card} setGoogleCards={setGoogleCards} />
      </div>
    )),
  ];

  return (
    <MemoryPageLayout leftNavSections={LeftNavSections} bodyCards={BodyCards} />
  );
}
