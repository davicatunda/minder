import { IconButton, useMediaQuery, useTheme } from "@material-ui/core";
import React, { ReactNode } from "react";
import { useHistory, useLocation } from "react-router-dom";

import NavBarButtonLayout from "./NavBarButtonLayout";
import { css } from "@emotion/css";

type Props = {
  route: string;
  startIcon?: ReactNode;
  label: string;
};
export default function NavBarRouteButton({ route, startIcon, label }: Props) {
  const theme = useTheme();
  const location = useLocation();
  const history = useHistory();
  const hasSelectedStyle = location.pathname === route && route !== "/minder";
  const tooSmall = useMediaQuery("(max-width:450px)");
  if (tooSmall) {
    return <IconButton onClick={() => history.push(route)}>{startIcon}</IconButton>;
  }
  return (
    <NavBarButtonLayout onClick={() => history.push(route)} startIcon={startIcon}>
      {hasSelectedStyle && (
        <span
          className={css({
            position: "absolute",
            left: theme.spacing(1),
            right: theme.spacing(1),
            bottom: -theme.spacing(1),
            height: 2,
            backgroundColor: theme.palette.common.white,
          })}
        />
      )}
      {label}
    </NavBarButtonLayout>
  );
}
