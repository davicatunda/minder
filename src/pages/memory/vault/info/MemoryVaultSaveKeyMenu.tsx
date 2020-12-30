import { CloudDownload, MeetingRoom } from "@material-ui/icons";
import {
  ListItemIcon,
  Menu,
  MenuItem,
  MenuProps,
  Typography,
} from "@material-ui/core";

import React from "react";
import { css } from "@emotion/css";
import useDecodedDataContext from "../../useDecodedDataContext";

const listItemIconStyle = css({ minWidth: 36 });

type Props = {
  onClose: () => void;
  menuProps: MenuProps;
};
export default function MemoryVaultSaveKeyMenu({ onClose, menuProps }: Props) {
  const { encryptionKey } = useDecodedDataContext();
  if (!encryptionKey) {
    return null;
  }
  return (
    <Menu {...menuProps}>
      <MenuItem
        onClick={() => {
          onClose();
          const element = document.createElement("a");
          element.setAttribute(
            "href",
            `data:text/plain;charset=base64,${encryptionKey}`,
          );
          element.setAttribute("download", "key.ish");
          element.style.display = "none";
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
        }}
      >
        <ListItemIcon className={listItemIconStyle}>
          <CloudDownload fontSize="small" color="action" />
        </ListItemIcon>
        <Typography>Download</Typography>
      </MenuItem>
      <MenuItem
        onClick={() => {
          navigator.clipboard.writeText(encryptionKey).then(() => {
            onClose();
          });
        }}
      >
        <ListItemIcon className={listItemIconStyle}>
          <MeetingRoom fontSize="small" color="action" />
        </ListItemIcon>
        <Typography>Copy</Typography>
      </MenuItem>
    </Menu>
  );
}
