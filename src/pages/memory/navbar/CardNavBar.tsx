import { Drafts, Mail } from "@material-ui/icons";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import React, { CSSProperties, Dispatch, SetStateAction } from "react";

import { CardListItem } from "../MemoryPage";

type Props = {
  cardListItems: CardListItem[];
  setCardListItems: Dispatch<SetStateAction<CardListItem[]>>;
};
export default function CardNavBar({ cardListItems, setCardListItems }: Props) {
  function toogleCardPreview(cardId: string) {
    setCardListItems((oldItems) =>
      oldItems.map((c) => (cardId === c.id ? { ...c, isOpen: !c.isOpen } : c)),
    );
  }
  if (cardListItems.length === 0) {
    return null;
  }
  const oneLineStyle: CSSProperties = {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };
  return (
    <List component="nav">
      {cardListItems.map((card) => (
        <ListItem button key={card.id} onClick={() => toogleCardPreview(card.id)}>
          <ListItemIcon>{card.isOpen ? <Drafts /> : <Mail />}</ListItemIcon>
          <ListItemText
            primary={card.cardProps.title}
            primaryTypographyProps={{ style: oneLineStyle }}
            secondary={card.cardProps.initialValues.encryptionKey}
            secondaryTypographyProps={{ style: oneLineStyle }}
          />
        </ListItem>
      ))}
    </List>
  );
}
