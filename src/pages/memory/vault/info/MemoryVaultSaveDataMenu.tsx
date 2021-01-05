import { CloudDownload, FileCopy, HelpOutline } from "@material-ui/icons";
import {
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  MenuProps,
  Tooltip,
  Typography,
} from "@material-ui/core";

import { HorizontalSpace } from "../../../core/Spacing";
import { Icon } from "@iconify/react";
import React from "react";
import { css } from "@emotion/css";
import { denormalizeRoot } from "../../../../utils/normalization";
import { encryptData } from "../../../../utils/encryption";
import googleDrive from "@iconify-icons/mdi/google-drive";
import updateFileContent from "../../../../google-integration/updateFileContent";
import uploadFile from "../../../../google-integration/uploadFile";
import useDecodedDataContext from "../../useDecodedDataContext";
import { useGoogleAuthContext } from "../../../../google-integration/useGoogleAuthProvider";
import useGoogleCardContext from "../../google-vault/useGoogleCardContext";

const listItemIconStyle = css({ minWidth: 36 });

type Props = {
  onClose: () => void;
  menuProps: MenuProps;
};
export default function MemoryVaultSaveDataMenu({ onClose, menuProps }: Props) {
  const auth = useGoogleAuthContext();
  return (
    <Menu {...menuProps}>
      <LoggedOutActions onItemPress={onClose} />
      {auth?.currentUser.get()?.isSignedIn() === true && (
        <LoggedInActions onItemPress={onClose} />
      )}
    </Menu>
  );
}

function LoggedOutActions({ onItemPress }: { onItemPress: () => void }) {
  const { store, encryptionKey } = useDecodedDataContext();
  return (
    <>
      {encryptionKey && (
        <MenuItem
          onClick={(e) => {
            onItemPress();
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
          <ListItemIcon className={listItemIconStyle}>
            <CloudDownload fontSize="small" color="action" />
          </ListItemIcon>
          <Typography>Download</Typography>
        </MenuItem>
      )}
      <Divider />
      {encryptionKey && (
        <MenuItem
          onClick={(e) => {
            encryptData(store, encryptionKey, (data) => {
              navigator.clipboard.writeText(data).then(() => {
                onItemPress();
              });
            });
          }}
        >
          <ListItemIcon className={listItemIconStyle}>
            <FileCopy fontSize="small" color="action" />
          </ListItemIcon>
          <Typography>Copy</Typography>
        </MenuItem>
      )}
      <MenuItem
        onClick={(e) => {
          navigator.clipboard.writeText(denormalizeRoot(store)).then(() => {
            onItemPress();
          });
        }}
      >
        <ListItemIcon className={listItemIconStyle}>
          <FileCopy fontSize="small" color="action" />
        </ListItemIcon>
        <Typography>Copy as JSON</Typography>
      </MenuItem>
    </>
  );
}

function LoggedInActions({ onItemPress }: { onItemPress: () => void }) {
  const googleResourceId = useGoogleCardContext();
  const { store, encryptionKey } = useDecodedDataContext();
  return (
    <>
      <Divider />
      {encryptionKey && (
        <MenuItem
          onClick={(e) => {
            onItemPress();
            uploadFile(store, encryptionKey, { withKey: false });
          }}
        >
          <ListItemIcon className={listItemIconStyle}>
            <Icon icon={googleDrive} width={20} height={20} />
          </ListItemIcon>
          <Typography>{googleResourceId ? "Save as copy" : "Save"}</Typography>
        </MenuItem>
      )}
      {encryptionKey && (
        <MenuItem
          onClick={(e) => {
            onItemPress();
            uploadFile(store, encryptionKey, { withKey: true });
          }}
        >
          <ListItemIcon className={listItemIconStyle}>
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
          onClick={(e) => {
            onItemPress();
            updateFileContent(store, encryptionKey, googleResourceId);
          }}
        >
          <ListItemIcon className={listItemIconStyle}>
            <Icon icon={googleDrive} width={20} height={20} />
          </ListItemIcon>
          <Typography>Update</Typography>
          <HorizontalSpace s1 />
        </MenuItem>
      )}
    </>
  );
}
