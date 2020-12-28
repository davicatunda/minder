import MemoryVault, { VaultData } from "./MemoryVault";
import React, { Dispatch, SetStateAction } from "react";

import { CardListItem } from "../MemoryPage";
import MemoryVaultCreatingState from "./create/MemoryVaultCreatingState";

type MemoryCardProps = {
  card: CardListItem;
  setCards: Dispatch<SetStateAction<CardListItem[]>>;
};
export default function MemoryCard({ card, setCards }: MemoryCardProps) {
  const closeCard = () => {
    setCards((old) => old.filter((c) => card.id !== c.id));
  };
  const createCard = () => {
    const newCard = { ...card, isCreating: false, isReadOnly: false };
    setCards((old) => old.map((c) => (card.id === c.id ? newCard : c)));
  };
  const changeCardVaultData = (newVaultData: VaultData) => {
    setCards((old) =>
      old.map((oldCard) =>
        oldCard.id === card.id ? { ...oldCard, vaultData: newVaultData } : oldCard,
      ),
    );
  };
  if (!card.isCreating && card.vaultData.initialData === "") {
    return <span> Warming up the server just for you... </span>;
  } else if (card.isCreating) {
    return (
      <MemoryVaultCreatingState
        vaultData={card.vaultData}
        onSubmit={createCard}
        onClose={closeCard}
        onChange={changeCardVaultData}
      />
    );
  } else {
    return (
      <MemoryVault
        vaultData={card.vaultData}
        onChange={changeCardVaultData}
        isReadOnly={card.isReadOnly}
        onClose={closeCard}
      />
    );
  }
}
