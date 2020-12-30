import { Divider, Paper, Typography, useTheme } from "@material-ui/core";
import { HorizontalSpace, VerticalSpace } from "../shared-layout/Spacing";
import React, { ReactNode } from "react";

import { css } from "@emotion/css";

type Props = {
  icon: ReactNode;
  title: ReactNode;
  subtitle: ReactNode;
  body: ReactNode;
  button: ReactNode;
};
export default function HomePageCard({
  icon,
  title,
  subtitle,
  body,
  button,
}: Props) {
  const theme = useTheme();
  return (
    <Paper
      variant="outlined"
      className={css({
        padding: theme.spacing(3),
        display: "flex",
        flexDirection: "column",
      })}
    >
      <Typography
        variant="h4"
        className={css({ display: "flex", alignItems: "center" })}
        gutterBottom
      >
        {icon}
        <HorizontalSpace s2 />
        {title}
      </Typography>
      <VerticalSpace s1 />
      <Typography variant="body1" gutterBottom>
        {subtitle}
      </Typography>
      {body}
      <VerticalSpace s2 grow={1} />
      <Divider />
      <VerticalSpace s2 />
      {button}
    </Paper>
  );
}
