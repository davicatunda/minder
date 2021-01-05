import { Grid, Paper, useTheme } from "@material-ui/core";
import React, { ReactNode } from "react";

import { css } from "@emotion/css";

type Props = {
  preview: ReactNode;
  form: ReactNode;
  onSubmit: () => void;
};
export default function MemoryVaultCreatingStateLayout({
  preview,
  form,
  onSubmit,
}: Props) {
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
            position: "relative",
          })}
          component="form"
          onSubmit={() => {
            onSubmit();
            setTimeout(function () {
              const request = new XMLHttpRequest();
              request.open("POST", "/index.html", true);
              request.setRequestHeader(
                "Content-Type",
                "application/x-www-form-urlencoded; charset=UTF-8",
              );
              request.send();
            }, 1);
          }}
        >
          {form}
        </Paper>
      </Grid>
      <Grid item xs={12} md={8} xl={9} className={css({ display: "flex" })}>
        {preview}
      </Grid>
    </Grid>
  );
}
