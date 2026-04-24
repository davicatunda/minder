import MemoryVault, { VaultData } from "./MemoryVault";
import { Dispatch, SetStateAction } from "react";

import { CardListItem } from "../MemoryPage";
import { Collapse } from "@material-ui/core";
import MemoryVaultCreatingState from "./create/MemoryVaultCreatingState";
import { VerticalSpace } from "../../core/Spacing";

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

  if (card.isCreating) {
    return (
      <Collapse in={card.isOpen}>
        <MemoryVaultCreatingState
          vaultData={card.vaultData}
          onSubmit={createCard}
          onDelete={deleteCard}
          onChange={changeCardVaultData}
        />
        <VerticalSpace s2 />
      </Collapse>
    );
  } else {
    return (
      <Collapse in={card.isOpen}>
        <MemoryVault
          vaultData={card.vaultData}
          isReadOnly={card.isReadOnly}
          onDelete={deleteCard}
        />
        <VerticalSpace s2 />
      </Collapse>
    );
  }
}
