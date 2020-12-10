import { AccountCircle, Brightness4 } from "@material-ui/icons";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from "@material-ui/core";
import React, { CSSProperties, useState } from "react";
import { gql, useQuery } from "@apollo/client";

import Alert from "@material-ui/lab/Alert";
import { NavLink } from "react-router-dom";
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
const listItemStyle: CSSProperties = {
  whiteSpace: "nowrap",
  marginInlineEnd: 20,
  textDecoration: "none",
  color: "inherit",
};
const active: CSSProperties = {
  fontWeight: "bold",
};

export default function NavBar() {
  const theme = useTheme();
  const { togglePalette } = useTogglePaletteContext();
  const { data, loading } = useQuery<NavBarLoggedInResponse>(QUERY);
  const [hasAlert, showAlert] = useState(false);
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          <NavLink to="/minder" exact style={listItemStyle} activeStyle={active}>
            Home
          </NavLink>
        </Typography>
        <Typography variant="h6">
          <NavLink to="/minder/offline" style={listItemStyle} activeStyle={active}>
            Offline Mode
          </NavLink>
        </Typography>
        <Typography variant="h6">
          <NavLink to="/minder/standard" style={listItemStyle} activeStyle={active}>
            Standard
          </NavLink>
        </Typography>
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
