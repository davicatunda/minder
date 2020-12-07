import { AccountCircle, Brightness4 } from "@material-ui/icons";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from "@material-ui/core";
import React, { CSSProperties } from "react";
import { gql, useQuery } from "@apollo/client";

import { NavLink } from "react-router-dom";
import { useTogglePaletteContext } from "./card-items/useTogglePaletteContext";

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
  color: "initial",
};
const active: CSSProperties = {
  fontWeight: "bold",
};

export default function NavBar() {
  const theme = useTheme();
  const { togglePalette } = useTogglePaletteContext();
  const { data, loading } = useQuery<NavBarLoggedInResponse>(QUERY);

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
        {loading ? null : data?.user != null ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={togglePalette}>
              <Brightness4 />
            </IconButton>
            <div style={{ width: theme.spacing(2) }} />
            <AccountCircle />
            <div style={{ width: theme.spacing(1) }} />
            <Typography variant="h6">{data.user.username}</Typography>
          </div>
        ) : (
          <Button>Login</Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
