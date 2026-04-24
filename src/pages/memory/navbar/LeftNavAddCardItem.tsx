import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

import { Add } from "@material-ui/icons";
import { CardListItem } from "../MemoryPage";

import { v4 as uuid } from "uuid";
import { STANDARD_PROPOSAL } from "../../mockDB";

type Props = {
  addCard: (card: CardListItem) => void;
};

export default function LeftNavAddCardItem({ addCard }: Props) {
  const card = {
    vaultData: {
      title: "",
      encryptionKey: "",
      initialData: STANDARD_PROPOSAL.data,
    },
    id: uuid(),
    isOpen: true,
    isCreating: true,
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
