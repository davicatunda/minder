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
import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import { useHistory, useLocation } from "react-router-dom";

import Logo from "./Logo";
import { useTogglePaletteContext } from "./useTogglePaletteContext";

const QUERY = gql`
  query NavBarLoggedIn {
    user {
      username
    }
  }
`;

type NavBarLoggedInResponse = {
  user?: {
    username: string;
  };
};

export default function NavBar() {
  const theme = useTheme();
  const { togglePalette } = useTogglePaletteContext();
  const { data, loading } = useQuery<NavBarLoggedInResponse>(QUERY);
  return (
    <AppBar
      position="static"
      color={theme.palette.type === "light" ? "primary" : "default"}
    >
      <Toolbar>
        <NavBarButton icon={<Logo size={36} />} route="/minder" label="Minder" />
        <NavBarButton route="/minder/memories" label="Memories" />
        <NavBarButton route="/minder/standard" label="Standard" />
        <div style={{ flexGrow: 1 }} />
        <IconButton onClick={togglePalette}>
          <Brightness4 />
        </IconButton>
        <div style={{ width: theme.spacing(2) }} />
        {loading ? null : data?.user != null ? (
          <LoggedInButton username={data.user.username} />
        ) : (
          <NavBarButton route="/minder/login" label="Log in" />
        )}
      </Toolbar>
    </AppBar>
  );
}

function LoggedInButton({ username }: { username: string }) {
  const history = useHistory();
  const client = useApolloClient();
  const anchorRef = useRef(null);
  const [isShowingPopover, setIsShowingPopover] = useState(false);
  const [logout] = useMutation(
    gql`
      mutation Logout {
        logout
      }
    `,
  );
  return (
    <>
      <Button
        color="inherit"
        startIcon={<AccountCircle />}
        onClick={() => setIsShowingPopover(true)}
        ref={anchorRef}
      >
        <Typography variant="h6">{username}</Typography>
      </Button>
      <Menu
        anchorEl={anchorRef.current}
        open={isShowingPopover}
        onClose={() => setIsShowingPopover(false)}
      >
        <MenuItem
          onClick={() => {
            logout().then(() => {
              setIsShowingPopover(false);
              localStorage.setItem("token", "");
              client.resetStore().then(() => {
                history.push("/minder/");
              });
            });
          }}
        >
          <ListItemIcon style={{ minWidth: 36 }}>
            <MeetingRoom fontSize="small" color="action" />
          </ListItemIcon>
          <Typography>Logout</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}

type NavBarButtonProps = {
  route: string;
  icon?: ReactNode;
  label: string;
};
function NavBarButton({ route, icon, label }: NavBarButtonProps) {
  const theme = useTheme();
  const location = useLocation();
  const history = useHistory();
  const hasSelectedStyle = location.pathname === route && route !== "/minder";
  return (
    <Button
      color="inherit"
      onClick={() => history.push(route)}
      startIcon={icon}
      style={{ textTransform: "none" }}
      disableRipple
    >
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
      <Typography variant="h6">{label}</Typography>
    </Button>
  );
}
