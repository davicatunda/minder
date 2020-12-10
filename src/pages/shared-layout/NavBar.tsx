import { AccountCircle, Brightness4 } from "@material-ui/icons";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from "@material-ui/core";
import React, { ReactNode, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useHistory, useLocation } from "react-router-dom";

import Alert from "@material-ui/lab/Alert";
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
  const [hasAlert, showAlert] = useState(false);
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
        {loading ? null : data?.user != null ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ width: theme.spacing(2) }} />
            <Button
              color="inherit"
              onClick={togglePalette}
              startIcon={<AccountCircle />}
            >
              <Typography variant="h6">{data.user.username}</Typography>
            </Button>
          </div>
        ) : (
          <>
            <Button color="inherit" onClick={() => showAlert(true)}>
              Login
            </Button>
            {hasAlert && (
              <Alert
                style={{
                  position: "absolute",
                  bottom: -64,
                  right: theme.spacing(1),
                }}
                severity="warning"
                onClose={() => showAlert(false)}
              >
                Not implemented, sorry
              </Alert>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
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
