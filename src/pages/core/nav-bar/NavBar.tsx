import { AppBar, IconButton, Toolbar, useTheme } from "@material-ui/core";

import { Brightness4 } from "@material-ui/icons";
import { HorizontalSpace } from "../Spacing";
import Logo from "../Logo";
import NavBarRouteButton from "./NavBarRouteButton";
import NavBarUserButton from "./NavBarUserButton";
import React from "react";
import { useTogglePaletteContext } from "../useTogglePaletteContext";

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
        <HorizontalSpace s2 grow />
        <IconButton onClick={togglePalette}>
          <Brightness4 />
        </IconButton>
        <HorizontalSpace s2 />
        <NavBarUserButton />
      </Toolbar>
    </AppBar>
  );
}
