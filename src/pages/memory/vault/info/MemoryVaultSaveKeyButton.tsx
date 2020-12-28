import { Button, ListItemIcon, Menu, MenuItem, Typography } from "@material-ui/core";
import { CloudDownload, MeetingRoom } from "@material-ui/icons";
import React, { useRef, useState } from "react";

import useDecodedDataContext from "../../useDecodedDataContext";

export default function MemoryVaultSaveKeyButton() {
  const { encryptionKey } = useDecodedDataContext();
  const anchorRef = useRef(null);
  const [isShowingPopover, setIsShowingPopover] = useState(false);
  if (!encryptionKey) {
    return null;
  }
  return (
    <>
      <Button
        size="small"
        color="primary"
        onClick={() => setIsShowingPopover(true)}
        ref={anchorRef}
      >
        Save Key
      </Button>
      <Menu
        anchorEl={anchorRef.current}
        open={isShowingPopover}
        onClose={() => setIsShowingPopover(false)}
      >
        <MenuItem
          onClick={() => {
            setIsShowingPopover(false);
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
          <ListItemIcon style={{ minWidth: 36 }}>
            <CloudDownload fontSize="small" color="action" />
          </ListItemIcon>
          <Typography>Download</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigator.clipboard.writeText(encryptionKey).then(() => {
              setIsShowingPopover(false);
            });
          }}
        >
          <ListItemIcon style={{ minWidth: 36 }}>
            <MeetingRoom fontSize="small" color="action" />
          </ListItemIcon>
          <Typography>Copy</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
