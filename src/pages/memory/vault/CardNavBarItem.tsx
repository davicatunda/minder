import { Drafts, Mail } from "@material-ui/icons";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import React, { CSSProperties } from "react";

import { CardListItem } from "../MemoryPage";

const oneLineStyle: CSSProperties = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

type Props = {
  card: CardListItem;
  toogleCardVisibility: (card: CardListItem) => void;
};

export default function CardNavBarItem({ card, toogleCardVisibility }: Props) {
  return (
    <ListItem button key={card.id} onClick={() => toogleCardVisibility(card)}>
      <ListItemIcon>{card.isOpen ? <Drafts /> : <Mail />}</ListItemIcon>
      <ListItemText
        primary={card.vaultData.title}
        primaryTypographyProps={{ style: oneLineStyle }}
        secondary={card.vaultData.encryptionKey}
        secondaryTypographyProps={{ style: oneLineStyle }}
      />
    </ListItem>
  );
}
