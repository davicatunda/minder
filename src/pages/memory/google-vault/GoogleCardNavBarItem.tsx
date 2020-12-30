import { Drafts, Mail } from "@material-ui/icons";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

import { GoogleCardListItem } from "../MemoryPage";
import { Icon } from "@iconify/react";
import React from "react";
import { css } from "@emotion/css";
import googleDrive from "@iconify-icons/mdi/google-drive";

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
        primaryTypographyProps={{
          className: css({
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }),
        }}
      />
    </ListItem>
  );
}
