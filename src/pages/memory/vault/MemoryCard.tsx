import MemoryVault, { VaultData } from "./MemoryVault";
import React, { Dispatch, SetStateAction } from "react";

import { CardListItem } from "../MemoryPage";
import MemoryVaultCreatingState from "./create/MemoryVaultCreatingState";
import MemoryVaultLoadingState from "./MemoryVaultLoadingState";

type MemoryCardProps = {
  card: CardListItem;
  setCards: Dispatch<SetStateAction<CardListItem[]>>;
};
export default function MemoryCard({ card, setCards }: MemoryCardProps) {
  const deleteCard = () => {
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
    return (
      <MemoryVaultLoadingState
        vaultData={card.vaultData}
        onChange={changeCardVaultData}
      />
    );
  } else if (card.isCreating) {
    return (
      <MemoryVaultCreatingState
        vaultData={card.vaultData}
        onSubmit={createCard}
        onDelete={deleteCard}
        onChange={changeCardVaultData}
      />
    );
  } else {
    return (
      <MemoryVault
        vaultData={card.vaultData}
        isReadOnly={card.isReadOnly}
        onDelete={deleteCard}
      />
    );
  }
}
