import { Divider, Grid, useTheme } from "@material-ui/core";
import React, { CSSProperties, ReactNode } from "react";

export default function MemoryPageLayout({
  leftNavSections,
  bodyCards,
}: {
  leftNavSections: ReactNode[];
  bodyCards: ReactNode[];
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
        {leftNavSections.map((child, index) =>
          index === leftNavSections.length - 1
            ? child
            : [child, <Divider key={`LeftNavSection-${index}`} />],
        )}
      </Grid>
      <Grid item xs={12} sm={8} md={9} lg={10} style={bodyStyle}>
        {bodyCards.map((child, index) =>
          index === bodyCards.length - 1
            ? child
            : [child, <BodyDivider key={`BodySection-${index}`} />],
        )}
      </Grid>
    </Grid>
  );
}

function BodyDivider() {
  const theme = useTheme();
  return <div style={{ height: theme.spacing(2) }} />;
}
