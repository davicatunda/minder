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
  const { store, encryptionKey, googleResourceId } = useDecodedDataContext();
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
        {encryptionKey && (
          <MenuItem
            onClick={() => {
              setIsShowingPopover(false);
              encryptData(store, encryptionKey, (data) => {
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
        )}
        {encryptionKey && (
          <MenuItem
            onClick={() => {
              setIsShowingPopover(false);
              encryptData(store, encryptionKey, (data) => {
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
        )}
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
        {encryptionKey && (
          <MenuItem
            onClick={() => {
              setIsShowingPopover(false);
              uploadFile(store, encryptionKey, { withKey: false });
            }}
          >
            <ListItemIcon style={{ minWidth: 36 }}>
              <Icon icon={googleDrive} width={20} height={20} />
            </ListItemIcon>
            <Typography>{googleResourceId ? "Save as copy" : "Save"}</Typography>
          </MenuItem>
        )}
        {encryptionKey && (
          <MenuItem
            onClick={() => {
              setIsShowingPopover(false);
              uploadFile(store, encryptionKey, { withKey: true });
            }}
          >
            <ListItemIcon style={{ minWidth: 36 }}>
              <Icon icon={googleDrive} width={20} height={20} />
            </ListItemIcon>
            <Typography>
              {googleResourceId ? "Save with key as copy" : "Save with key"}
            </Typography>
            <span style={{ width: theme.spacing(1) }} />
            <Tooltip
              title="This option is not recommended as it relies on your Google account not being compromised, prefer saving your key offline for extra safety"
              placement="bottom"
            >
              <HelpOutline fontSize="inherit" />
            </Tooltip>
          </MenuItem>
        )}
        {googleResourceId && encryptionKey && (
          <MenuItem
            onClick={() => {
              setIsShowingPopover(false);
              updateFileContent(store, encryptionKey, googleResourceId);
            }}
          >
            <ListItemIcon style={{ minWidth: 36 }}>
              <Icon icon={googleDrive} width={20} height={20} />
            </ListItemIcon>
            <Typography>Update</Typography>
            <span style={{ width: theme.spacing(1) }} />
            <Tooltip
              title="This option is not recommended as it relies on your Google account not being compromised, prefer saving your key offline for extra safety"
              placement="bottom"
            >
              <HelpOutline fontSize="inherit" />
            </Tooltip>
          </MenuItem>
        )}
      </Menu>
    </>
  );
}

function uploadFile(
  store: Store,
  encryptionKey: string,
  config: { withKey: boolean },
  onComplete?: () => void,
) {
  encryptData(store, encryptionKey, (encryptedData) => {
    const form = new FormData();
    form.append(
      "metadata",
      new Blob(
        [
          JSON.stringify({
            name: store.rootNode.title,
            mimeType: "text/plain;charset=base64",
            parents: ["appDataFolder"],
            appProperties: {
              title: store.rootNode.title,
              encryptionKey: config.withKey ? encryptionKey : undefined,
            },
          }),
        ],
        { type: "application/json" },
      ),
    );
    form.append("file", new Blob([encryptedData], { type: "text/plain" }));
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) {
        return;
      }
      onComplete && onComplete();
    };

    xhr.open(
      "POST",
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

function updateFileContent(
  store: Store,
  encryptionKey: string,
  fileId: string,
  onComplete?: () => void,
) {
  encryptData(store, encryptionKey, (encryptedData) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) {
        return;
      }
      onComplete && onComplete();
    };

    xhr.open(
      "PATCH",
      `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`,
    );
    xhr.setRequestHeader(
      "Authorization",
      "Bearer " + gapi.auth.getToken().access_token,
    );
    xhr.send(encryptedData);
  });
}
