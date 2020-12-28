import { AccountCircle, Brightness4, MeetingRoom } from "@material-ui/icons";
import {
  AppBar,
  Button,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from "@material-ui/core";
import React, { ReactNode, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import Logo from "./Logo";
import useLoginLogout from "../../google-integration/useLoginLogout";
import { useTogglePaletteContext } from "./useTogglePaletteContext";

export default function NavBar() {
  const theme = useTheme();
  const { togglePalette } = useTogglePaletteContext();
  return (
    <AppBar
      position="static"
      color={theme.palette.type === "light" ? "primary" : "default"}
    >
      <Toolbar>
        <NavBarRouteButton
          startIcon={<Logo size={36} />}
          route="/minder"
          label="Minder"
        />
        <NavBarRouteButton route="/minder/memories" label="Memories" />
        <NavBarRouteButton route="/minder/standard" label="Standard" />
        <div style={{ flexGrow: 1 }} />
        <IconButton onClick={togglePalette}>
          <Brightness4 />
        </IconButton>
        <div style={{ width: theme.spacing(2) }} />
        <LogInButton />
      </Toolbar>
    </AppBar>
  );
}

function LogInButton() {
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
            <ListItemIcon style={{ minWidth: 36 }}>
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
            <ListItemIcon style={{ minWidth: 36 }}>
              <MeetingRoom fontSize="small" color="action" />
            </ListItemIcon>
            <Typography>Sign in with Google</Typography>
          </MenuItem>
        )}
      </Menu>
    </>
  );
}

type NavBarRouteButtonProps = {
  route: string;
  startIcon?: ReactNode;
  label: string;
};
function NavBarRouteButton({ route, startIcon, label }: NavBarRouteButtonProps) {
  const theme = useTheme();
  const location = useLocation();
  const history = useHistory();
  const hasSelectedStyle = location.pathname === route && route !== "/minder";
  return (
    <NavBarButtonLayout onClick={() => history.push(route)} startIcon={startIcon}>
      {hasSelectedStyle && (
        <span
          style={{
            position: "absolute",
            left: theme.spacing(1),
            right: theme.spacing(1),
            bottom: -theme.spacing(1),
            height: 2,
            backgroundColor: theme.palette.common.white,
          }}
        />
      )}
      {label}
    </NavBarButtonLayout>
  );
}

type NavBarButtonLayoutProps = {
  onClick(): void;
  startIcon?: ReactNode;
  children: ReactNode;
};
function NavBarButtonLayout({
  onClick,
  startIcon,
  children,
}: NavBarButtonLayoutProps) {
  return (
    <Button
      color="inherit"
      onClick={onClick}
      startIcon={startIcon}
      style={{ textTransform: "none" }}
      disableRipple
    >
      <Typography variant="h6">{children}</Typography>
    </Button>
  );
}
