import { Button, Grid, Paper, Typography, useTheme } from "@material-ui/core";

import { Add } from "@material-ui/icons";
import MemoryVaultSettingsMenu from "../vault/MemoryVaultSettingsMenu";
import React from "react";
import { VerticalSpace } from "../../core/Spacing";
import { css } from "@emotion/css";

type Props = {
  onDelete: () => void;
};
export default function GoogleMemoryVaultLoadingState({ onDelete }: Props) {
  const theme = useTheme();
  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        md={4}
        xl={3}
        className={css({ display: "flex", minHeight: 500 })}
      >
        <Paper
          className={css({
            padding: theme.spacing(2),
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
          })}
        >
          <Typography variant="h4" color="textPrimary" gutterBottom align="center">
            Open
          </Typography>
          <VerticalSpace s2 grow />
          <Button
            fullWidth
            variant="contained"
            disabled={true}
            color="primary"
            size="medium"
            startIcon={<Add />}
          >
            Open
          </Button>
        </Paper>
      </Grid>
      <Grid item xs={12} md={8} xl={9} className={css({ display: "flex" })}>
        <Paper
          className={css({
            flex: 1,
            position: "relative",
            overflow: "hidden",
            padding: theme.spacing(3),
          })}
        >
          <div
            className={css({
              position: "absolute",
              right: theme.spacing(1),
              top: theme.spacing(1),
              zIndex: 2,
            })}
          >
            <MemoryVaultSettingsMenu onDelete={onDelete} />
          </div>
          <div
            className={css({
              backgroundColor: theme.palette.background.default,
              opacity: 0.8,
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            })}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}
