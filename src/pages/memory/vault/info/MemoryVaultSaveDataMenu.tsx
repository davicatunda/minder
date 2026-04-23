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
import { css } from "@emotion/css";
import { denormalizeRoot } from "../../../../utils/normalization";
import { encryptData } from "../../../../utils/encryption";
import googleDrive from "@iconify-icons/mdi/google-drive";
import useDecodedDataContext from "../../useDecodedDataContext";
import useGoogleCardContext from "../../google-vault/useGoogleCardContext";
import { useContext } from "react";
import { GoogleAuthContext } from "../../../../google-integration/GoogleAuth";
import { useDrive } from "../../../../google-integration/useDrive";

const listItemIconStyle = css({ minWidth: 36 });

type Props = {
  onClose: () => void;
  menuProps: MenuProps;
};
export default function MemoryVaultSaveDataMenu({ onClose, menuProps }: Props) {
  const { user } = useContext(GoogleAuthContext);
  return (
    <Menu {...menuProps}>
      <LoggedOutActions onItemPress={onClose} />
      {user != null && <LoggedInActions onItemPress={onClose} />}
    </Menu>
  );
}

function LoggedOutActions({ onItemPress }: { onItemPress: () => void }) {
  const { store, encryptionKey } = useDecodedDataContext();
  return (
    <>
      {encryptionKey && (
        <MenuItem
          onClick={async () => {
            onItemPress();
            const encryptedData = await encryptData(store, encryptionKey);

            const element = document.createElement("a");
            element.setAttribute(
              "href",
              "data:text/plain;charset=base64," +
                encodeURIComponent(encryptedData),
            );
            element.setAttribute("download", "data.ish");
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
      )}
      <Divider />
      {encryptionKey && (
        <MenuItem
          onClick={async () => {
            const encryptedData = await encryptData(store, encryptionKey);
            await navigator.clipboard.writeText(encryptedData);
            onItemPress();
          }}
        >
          <ListItemIcon className={listItemIconStyle}>
            <FileCopy fontSize="small" color="action" />
          </ListItemIcon>
          <Typography>Copy</Typography>
        </MenuItem>
      )}
      <MenuItem
        onClick={async () => {
          await navigator.clipboard.writeText(denormalizeRoot(store));
          onItemPress();
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
  const { create, update } = useDrive();
  return (
    <>
      <Divider />
      {encryptionKey && (
        <MenuItem
          onClick={async () => {
            onItemPress();
            const encryptedData = await encryptData(store, encryptionKey);
            await create(store.rootNode.title, encryptedData, null);
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
          onClick={async () => {
            onItemPress();
            const encryptedData = await encryptData(store, encryptionKey);
            await create(store.rootNode.title, encryptedData, encryptionKey);
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
          onClick={async () => {
            onItemPress();
            const encryptedData = await encryptData(store, encryptionKey);
            await update(googleResourceId, encryptedData);
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
