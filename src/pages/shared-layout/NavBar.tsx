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
import {
  GoogleLoginResponse,
  useGoogleLogin,
  useGoogleLogout,
} from "react-google-login";
import React, { ReactNode, useRef, useState } from "react";
import { gql, useApolloClient, useMutation } from "@apollo/client";
import { useHistory, useLocation } from "react-router-dom";

import Logo from "./Logo";
import autoRefreshToken from "./autoRefreshToken";
import { useTogglePaletteContext } from "./useTogglePaletteContext";

const GOOGLE_CLIENT_ID =
  "79887996241-lkot8h9s6ehcv4cd07kl9nsugt965pr8.apps.googleusercontent.com";

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
  const client = useApolloClient();
  const [signin] = useMutation<{ signin: boolean }>(
    gql`
      mutation Signin {
        signin
      }
    `,
  );

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { signIn } = useGoogleLogin({
    clientId: GOOGLE_CLIENT_ID,
    cookiePolicy: "single_host_origin",
    isSignedIn: true,
    onSuccess: (response) => {
      setIsLoggedIn(true);
      const googleUser = response as GoogleLoginResponse;
      localStorage.setItem("token", googleUser.getAuthResponse().id_token);
      client
        .resetStore()
        .then(() => signin())
        .then(({ data }) => {
          if (data?.signin === true) {
            autoRefreshToken(googleUser);
          } else {
            localStorage.setItem("token", "");
            client.resetStore();
          }
        });
    },
    onFailure: (response) => {
      setIsLoggedIn(false);
    },
  });

  const { signOut } = useGoogleLogout({
    clientId: GOOGLE_CLIENT_ID,
    cookiePolicy: "single_host_origin",
    onLogoutSuccess: () => {
      setIsLoggedIn(false);
      localStorage.setItem("token", "");
      client.resetStore();
    },
    onFailure: () => {},
  });

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
              signOut();
            }}
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
              signIn();
            }}
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
