import { Drafts, Mail } from "@material-ui/icons";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import React, { CSSProperties } from "react";

import { GoogleCardListItem } from "../MemoryPage";
import { Icon } from "@iconify/react";
import googleDrive from "@iconify-icons/mdi/google-drive";

const oneLineStyle: CSSProperties = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

type Props = {
  card: GoogleCardListItem;
  onClick: () => void;
};

export default function GoogleCardNavBarItem({ card, onClick }: Props) {
  return (
    <ListItem button key={card.resourceId} onClick={onClick}>
      <ListItemIcon>
        {card.isOpen ? <Drafts /> : <Mail />}
        <Icon icon={googleDrive} width={12} height={12} />
      </ListItemIcon>
      <ListItemText
        primary={card.vaultData.title}
        primaryTypographyProps={{ style: oneLineStyle }}
      />
    </ListItem>
  );
}
