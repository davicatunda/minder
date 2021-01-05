import React, { Dispatch, SetStateAction, useCallback } from "react";

import { Collapse } from "@material-ui/core";
import { GoogleCardListItem } from "../MemoryPage";
import GoogleMemoryVault from "./GoogleMemoryVault";
import GoogleMemoryVaultCreatingState from "./GoogleMemoryVaultCreatingState";
import GoogleMemoryVaultLoadingState from "./GoogleMemoryVaultLoadingState";
import { VaultData } from "../vault/MemoryVault";
import { VerticalSpace } from "../../core/Spacing";
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
  if (card.isLoading) {
    return (
      <Collapse in={card.isOpen}>
        <GoogleMemoryVaultLoadingState onDelete={deleteCard} />
        <VerticalSpace s2 />
      </Collapse>
    );
  } else if (card.isCreating) {
    return (
      <Collapse in={card.isOpen}>
        <GoogleMemoryVaultCreatingState
          vaultData={card.vaultData}
          onChange={changeCardVaultData}
          onDelete={deleteCard}
          onSubmit={createCard}
        />
        <VerticalSpace s2 />
      </Collapse>
    );
  } else {
    return (
      <Collapse in={card.isOpen}>
        <GoogleMemoryVault
          vaultData={card.vaultData}
          onDelete={deleteCard}
          resourceId={card.resourceId}
        />
        <VerticalSpace s2 />
      </Collapse>
    );
  }
}
