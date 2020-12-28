import { Button, ListItemIcon, Menu, MenuItem, Typography } from "@material-ui/core";
import { CloudDownload, MeetingRoom } from "@material-ui/icons";
import React, { useRef, useState } from "react";

import useDecodedDataContext from "../../useDecodedDataContext";

export default function MemoryVaultSaveKeyButton() {
  const { store } = useDecodedDataContext();
  const anchorRef = useRef(null);
  const [isShowingPopover, setIsShowingPopover] = useState(false);
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
          }}
          href={`data:text/plain;charset=base64,${store.rootNode.encryptionKey}`}
          download="key.ish"
        >
          <ListItemIcon style={{ minWidth: 36 }}>
            <CloudDownload fontSize="small" color="action" />
          </ListItemIcon>
          <Typography>Download</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigator.clipboard.writeText(store.rootNode.encryptionKey).then(() => {
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