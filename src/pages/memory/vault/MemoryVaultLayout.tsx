import { Grid, Paper, Typography, useTheme } from "@material-ui/core";
import { HorizontalSpace, VerticalSpace } from "../../core/Spacing";
import React, { ReactNode } from "react";

import { css } from "@emotion/css";

type Props = {
  header: ReactNode;
  body: ReactNode;
  bodyButton: ReactNode;
  info: ReactNode;
  menuButton: ReactNode;
  cardButtons: ReactNode[];
};
export default function MemoryVaultLayout({
  header,
  body,
  bodyButton,
  info,
  menuButton,
  cardButtons,
}: Props) {
  const theme = useTheme();
  return (
    <Paper
      className={css({
        padding: `${theme.spacing(3)}px ${theme.spacing(2)}px`,
        minHeight: 300,
        display: "flex",
        flexGrow: 1,
      })}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} lg={9}>
          <div className={css({ display: "flex", alignItems: "center" })}>
            {header}
            <HorizontalSpace s1 grow />
            {bodyButton}
          </div>
          <VerticalSpace s1 />
          {body}
        </Grid>
        <Grid
          item
          xs={12}
          lg={3}
          classes={{
            root: css({ display: "flex", flexDirection: "column" }),
          }}
        >
          <Typography variant="h6" gutterBottom display="block">
            <div className={css({ display: "flex", alignItems: "center" })}>
              Details
              <HorizontalSpace s1 grow />
              {menuButton}
            </div>
          </Typography>
          {info}
          <VerticalSpace s2 grow />
          <div className={css({ display: "flex" })}>
            {cardButtons[0]}
            <HorizontalSpace s1 />
            {cardButtons[1]}
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}
