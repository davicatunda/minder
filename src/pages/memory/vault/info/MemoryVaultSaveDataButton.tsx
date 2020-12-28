import {
  Button,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  useTheme,
} from "@material-ui/core";
import { CloudDownload, FileCopy, HelpOutline } from "@material-ui/icons";
import React, { useRef, useState } from "react";
import { Store, denormalizeRoot } from "../../../../utils/normalization";

import { Icon } from "@iconify/react";
import { encryptData } from "../../../../utils/encryption";
import googleDrive from "@iconify-icons/mdi/google-drive";
import useDecodedDataContext from "../../useDecodedDataContext";

export default function MemoryVaultSaveDataButton() {
  const { store } = useDecodedDataContext();
  const theme = useTheme();
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
        Save Data
      </Button>
      <Menu
        anchorEl={anchorRef.current}
        open={isShowingPopover}
        onClose={() => setIsShowingPopover(false)}
      >
        <MenuItem
          onClick={() => {
            setIsShowingPopover(false);
            encryptData(store, (data) => {
              const element = document.createElement("a");
              element.setAttribute(
                "href",
                "data:text/plain;charset=base64," + encodeURIComponent(data),
              );
              element.setAttribute("download", "data.ish");
              element.style.display = "none";
              document.body.appendChild(element);
              element.click();
              document.body.removeChild(element);
            });
          }}
        >
          <ListItemIcon style={{ minWidth: 36 }}>
            <CloudDownload fontSize="small" color="action" />
          </ListItemIcon>
          <Typography>Download</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            setIsShowingPopover(false);
            encryptData(store, (data) => {
              navigator.clipboard.writeText(data).then(() => {
                setIsShowingPopover(false);
              });
            });
          }}
        >
          <ListItemIcon style={{ minWidth: 36 }}>
            <FileCopy fontSize="small" color="action" />
          </ListItemIcon>
          <Typography>Copy</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigator.clipboard.writeText(denormalizeRoot(store)).then(() => {
              setIsShowingPopover(false);
            });
          }}
        >
          <ListItemIcon style={{ minWidth: 36 }}>
            <FileCopy fontSize="small" color="action" />
          </ListItemIcon>
          <Typography>Copy as JSON</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            setIsShowingPopover(false);
            uploadFile(store, { withKey: false });
          }}
        >
          <ListItemIcon style={{ minWidth: 36 }}>
            <Icon icon={googleDrive} width={20} height={20} />
          </ListItemIcon>
          <Typography>Save</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            setIsShowingPopover(false);
            uploadFile(store, { withKey: true });
          }}
        >
          <ListItemIcon style={{ minWidth: 36 }}>
            <Icon icon={googleDrive} width={20} height={20} />
          </ListItemIcon>
          <Typography>Save with Key</Typography>
          <span style={{ width: theme.spacing(1) }} />
          <Tooltip
            title="This option is not recommended as it relies on your Google account not being compromised, prefer saving your key offline for extra safety"
            placement="bottom"
          >
            <HelpOutline fontSize="inherit" />
          </Tooltip>
        </MenuItem>
      </Menu>
    </>
  );
}

function uploadFile(store: Store, config: { withKey: boolean }) {
  encryptData(store, (encryptedData) => {
    const form = new FormData();
    form.append(
      "metadata",
      new Blob(
        [
          JSON.stringify({
            name: store.rootNode.key,
            mimeType: "text/plain;charset=base64",
            parents: ["appDataFolder"],
            appProperties: {
              title: store.rootNode.title,
              encryptionKey: config.withKey
                ? store.rootNode.encryptionKey
                : undefined,
            },
          }),
        ],
        { type: "application/json" },
      ),
    );
    form.append("file", new Blob([encryptedData], { type: "text/plain" }));
    const xhr = new XMLHttpRequest();
    xhr.open(
      "post",
      "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id",
    );
    xhr.setRequestHeader(
      "Authorization",
      "Bearer " + gapi.auth.getToken().access_token,
    );
    xhr.responseType = "json";
    xhr.send(form);
  });
}
