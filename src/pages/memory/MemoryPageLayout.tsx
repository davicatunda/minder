import { Grid, useTheme } from "@material-ui/core";
import React, { CSSProperties, ReactNode } from "react";

export default function MemoryPageLayout({
  leftNav,
  body,
}: {
  leftNav: ReactNode;
  body: ReactNode;
}) {
  const theme = useTheme();
  const leftNavStyle: CSSProperties = {
    borderRightColor: theme.palette.divider,
    borderRightWidth: 1,
    borderRightStyle: "solid",
  };
  const bodyStyle: CSSProperties = { padding: theme.spacing(2) };
  return (
    <Grid container style={{ flex: 1 }}>
      <Grid item xs={12} sm={4} md={3} lg={2} style={leftNavStyle}>
        {leftNav}
      </Grid>
      <Grid item xs={12} sm={8} md={9} lg={10} style={bodyStyle}>
        {body}
      </Grid>
    </Grid>
  );
}
