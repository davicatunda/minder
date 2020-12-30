import React, { ReactNode } from "react";

import { css } from "@emotion/css";
import { Button, Typography } from "@material-ui/core";

type Props = {
  onClick(): void;
  startIcon?: ReactNode;
  children: ReactNode;
};
export default function NavBarButtonLayout({ onClick, startIcon, children }: Props) {
  return (
    <Button
      color="inherit"
      onClick={onClick}
      startIcon={startIcon}
      className={css({ textTransform: "none" })}
      disableRipple
    >
      <Typography variant="h6">{children}</Typography>
    </Button>
  );
}
