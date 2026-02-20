import { Button, Container, Grid, Typography, useTheme } from "@material-ui/core";

import { Lock } from "@material-ui/icons";
import React from "react";
import { VerticalSpace } from "../core/Spacing";
import { css } from "@emotion/css";

type Props = { onTryClick: () => void };
export default function HomePageBanner({ onTryClick }: Props) {
  const theme = useTheme();
  const backgroundColor =
    theme.palette.type === "light"
      ? theme.palette.secondary.light
      : theme.palette.secondary.dark;
  return (
    <div className={css({ backgroundColor })}>
      <Container maxWidth="lg">
        <VerticalSpace s4 />
        <Typography
          variant="h2"
          color="textPrimary"
          gutterBottom
          className={css({ fontWeight: "bold" })}
        >
          Your long term memory vault{" "}
          <span className={css({ fontSize: 48, verticalAlign: "bottom" })}>
            <Lock fontSize="inherit" />
          </span>
        </Typography>
        <VerticalSpace s2 />
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={4}>
            <Typography
              variant="h5"
              color="textSecondary"
              display="block"
              gutterBottom
            >
              Store anything you might want to remember on a fully encrypted
              platform.
            </Typography>
            <VerticalSpace s2 />
            <Typography
              variant="h5"
              color="textSecondary"
              display="block"
              gutterBottom
            >
              Imagine all the things that you need to remember, for example, medical
              history, previous addresses, favorite restaurants from your home town.
              Chances are that some are long forgotten. All these things can be
              safely stored on Minder.
            </Typography>
            <VerticalSpace s2 />
            <Button
              size="large"
              variant="contained"
              color="primary"
              onClick={onTryClick}
            >
              Try it
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <img
              className={css({ width: "100%", transform: "scale(1.03)" })}
              src="/Demo.png"
              alt="demo of the product"
            />
          </Grid>
        </Grid>
      </Container>
      <VerticalSpace s2 />
    </div>
  );
}
