import { AccountCircle, MeetingRoom } from "@material-ui/icons";
import {
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { useContext, useRef, useState } from "react";

import NavBarButtonLayout from "./NavBarButtonLayout";
import { css } from "@emotion/css";
import { GoogleAuthContext } from "../../../google-integration/GoogleAuth";

export default function NavBarUserButton() {
  const { user, isInitializing, onSignIn, onSignOut } =
    useContext(GoogleAuthContext);
  const anchorRef = useRef(null);
  const [isShowingPopover, setIsShowingPopover] = useState(false);
  const isLoggedIn = user !== null;
  return (
    <>
      <span ref={anchorRef}>
        {isLoggedIn ? (
          <IconButton onClick={() => setIsShowingPopover(true)}>
            <AccountCircle />
          </IconButton>
        ) : (
          <NavBarButtonLayout onClick={() => setIsShowingPopover(true)}>
            Log in
          </NavBarButtonLayout>
        )}
      </span>
      <Menu
        anchorEl={anchorRef.current}
        open={isShowingPopover}
        onClose={() => setIsShowingPopover(false)}
      >
        {isLoggedIn ? (
          <MenuItem
            onClick={() => {
              setIsShowingPopover(false);
              onSignOut();
            }}
            disabled={isInitializing}
          >
            <ListItemIcon className={css({ minWidth: 36 })}>
              <MeetingRoom fontSize="small" color="action" />
            </ListItemIcon>
            <Typography>Logout</Typography>
          </MenuItem>
        ) : (
          <MenuItem
            onClick={() => {
              setIsShowingPopover(false);
              onSignIn();
            }}
            disabled={isInitializing}
          >
            <ListItemIcon className={css({ minWidth: 36 })}>
              <MeetingRoom fontSize="small" color="action" />
            </ListItemIcon>
            <Typography>Sign in with Google</Typography>
          </MenuItem>
        )}
      </Menu>
    </>
  );
}
