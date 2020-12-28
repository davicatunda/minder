import { Add, Close } from "@material-ui/icons";
import {
  Button,
  Grid,
  IconButton,
  Paper,
  Typography,
  useTheme,
} from "@material-ui/core";

import React from "react";

type Props = {
  onClose: () => void;
};
export default function GoogleMemoryVaultLoadingState({ onClose }: Props) {
  const theme = useTheme();
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4} xl={3} style={{ display: "flex", minHeight: 500 }}>
        <Paper
          style={{
            padding: theme.spacing(2),
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
          }}
        >
          <Typography variant="h4" color="textPrimary" gutterBottom align="center">
            Open
          </Typography>
          <div style={{ flexGrow: 1, flexShrink: 0, flexBasis: theme.spacing(2) }} />
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
      <Grid item xs={12} md={8} xl={9} style={{ display: "flex" }}>
        <Paper
          style={{
            flex: 1,
            position: "relative",
            overflow: "hidden",
            padding: theme.spacing(3),
          }}
        >
          <div
            style={{
              position: "absolute",
              right: theme.spacing(1),
              top: theme.spacing(1),
              zIndex: 2,
            }}
          >
            <IconButton aria-label="cancel creation" onClick={onClose}>
              <Close />
            </IconButton>
          </div>
          <div
            style={{
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
            }}
          ></div>
        </Paper>
      </Grid>
    </Grid>
  );
}
