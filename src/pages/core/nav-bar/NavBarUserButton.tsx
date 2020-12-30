import { AccountCircle, MeetingRoom } from "@material-ui/icons";
import {
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import React, { useRef, useState } from "react";

import NavBarButtonLayout from "./NavBarButtonLayout";
import { css } from "@emotion/css";
import useLoginLogout from "../../../google-integration/useLoginLogout";

export default function NavBarUserButton() {
  const { logIn, logOut, isLoggedIn, isLoading } = useLoginLogout();
  const anchorRef = useRef(null);
  const [isShowingPopover, setIsShowingPopover] = useState(false);
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
              logOut();
            }}
            disabled={isLoading}
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
              logIn();
            }}
            disabled={isLoading}
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
