import React, { Dispatch, SetStateAction, useCallback } from "react";

import { GoogleCardListItem } from "../MemoryPage";
import GoogleMemoryVault from "./GoogleMemoryVault";
import GoogleMemoryVaultCreatingState from "./GoogleMemoryVaultCreatingState";
import GoogleMemoryVaultLoadingState from "./GoogleMemoryVaultLoadingState";
import { VaultData } from "../vault/MemoryVault";
import deleteFile from "../../../google-integration/deleteFile";

type GoogleMemoryCardProps = {
  card: GoogleCardListItem;
  setGoogleCards: Dispatch<SetStateAction<GoogleCardListItem[]>>;
};
export default function GoogleMemoryCard({
  card,
  setGoogleCards,
}: GoogleMemoryCardProps) {
  const deleteCard = () => {
    deleteFile(card.resourceId).then(() => {
      setGoogleCards((old) => old.filter((c) => card.resourceId !== c.resourceId));
    });
  };
  const createCard = () => {
    const newCard = { ...card, isCreating: false, isReadOnly: false };
    setGoogleCards((old) =>
      old.map((c) => (card.resourceId === c.resourceId ? newCard : c)),
    );
  };
  const changeCardVaultData = useCallback(
    (newVaultData: VaultData) => {
      setGoogleCards((old) =>
        old.map((oldCard) =>
          oldCard.resourceId === card.resourceId
            ? { ...oldCard, vaultData: newVaultData }
            : oldCard,
        ),
      );
    },
    [card.resourceId, setGoogleCards],
  );
  if (card.vaultData.initialData === "") {
    return card.isOpen ? (
      <GoogleMemoryVaultLoadingState onDelete={deleteCard} />
    ) : null;
  } else if (card.isCreating) {
    return (
      <GoogleMemoryVaultCreatingState
        vaultData={card.vaultData}
        onChange={changeCardVaultData}
        onDelete={deleteCard}
        onSubmit={createCard}
      />
    );
  } else {
    return (
      <GoogleMemoryVault
        vaultData={card.vaultData}
        onDelete={deleteCard}
        resourceId={card.resourceId}
      />
    );
  }
}
