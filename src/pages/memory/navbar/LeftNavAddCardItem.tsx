import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

import { Add } from "@material-ui/icons";
import { CardListItem } from "../MemoryPage";
import React from "react";
import useStandardProposal from "../useStandardProposal";
import { v4 as uuid } from "uuid";

type Props = {
  addCard: (card: CardListItem) => void;
};

export default function LeftNavAddCardItem({ addCard }: Props) {
  const standardProposal = useStandardProposal();
  const card = {
    vaultData: {
      title: "",
      encryptionKey: "",
      initialData: standardProposal?.data ?? "",
    },
    id: uuid(),
    isOpen: true,
    isCreating: standardProposal?.data != null,
    isReadOnly: true,
  };

  return (
    <List component="nav">
      <ListItem button onClick={() => addCard(card)}>
        <ListItemIcon>
          <Add />
        </ListItemIcon>
        <ListItemText primary="Open" />
      </ListItem>
    </List>
  );
}
