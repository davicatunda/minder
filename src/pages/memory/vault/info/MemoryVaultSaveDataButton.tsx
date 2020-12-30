import {
  Button,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  useTheme,
} from "@material-ui/core";
import { CloudDownload, FileCopy, HelpOutline } from "@material-ui/icons";
import React, { useRef, useState } from "react";

import { HorizontalSpace } from "../../../core/Spacing";
import { Icon } from "@iconify/react";
import { css } from "@emotion/css";
import { denormalizeRoot } from "../../../../utils/normalization";
import { encryptData } from "../../../../utils/encryption";
import googleDrive from "@iconify-icons/mdi/google-drive";
import updateFileContent from "../../../../google-integration/updateFileContent";
import uploadFile from "../../../../google-integration/uploadFile";
import useDecodedDataContext from "../../useDecodedDataContext";
import { useGoogleAuthContext } from "../../../../google-integration/useGoogleAuthProvider";

export default function MemoryVaultSaveDataButton() {
    const { store, encryptionKey, googleResourceId } = useDecodedDataContext();
  const theme = useTheme();
  const anchorRef = useRef(null);
  const [isShowingPopover, setIsShowingPopover] = useState(false);
  const auth = useGoogleAuthContext();
  const isSignedIn = auth?.currentUser.get()?.isSignedIn() === true;
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
            <ListItemIcon className={css({ minWidth: 36 })}>
              <CloudDownload fontSize="small" color="action" />
            </ListItemIcon>
            <Typography>Download</Typography>
          </MenuItem>
        )}
        <Divider />
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
            <ListItemIcon className={css({ minWidth: 36 })}>
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
          <ListItemIcon className={css({ minWidth: 36 })}>
            <FileCopy fontSize="small" color="action" />
          </ListItemIcon>
          <Typography>Copy as JSON</Typography>
        </MenuItem>
        {isSignedIn && (
          <>
            <Divider />
            {encryptionKey && (
              <MenuItem
                onClick={() => {
                  setIsShowingPopover(false);
                  uploadFile(store, encryptionKey, { withKey: false });
                }}
              >
                <ListItemIcon className={css({ minWidth: 36 })}>
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
                <ListItemIcon className={css({ minWidth: 36 })}>
                  <Icon icon={googleDrive} width={20} height={20} />
                </ListItemIcon>
                <Typography>
                  {googleResourceId ? "Save with key as copy" : "Save with key"}
                </Typography>
                <HorizontalSpace s1 />
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
                <ListItemIcon className={css({ minWidth: 36 })}>
                  <Icon icon={googleDrive} width={20} height={20} />
                </ListItemIcon>
                <Typography>Update</Typography>
                <HorizontalSpace s1 />
              </MenuItem>
            )}
          </>
        )}
      </Menu>
    </>
  );
}
