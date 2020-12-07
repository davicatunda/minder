import {
  Autorenew,
  Build,
  CheckBox,
  CheckBoxOutlineBlank,
  SubdirectoryArrowRight,
} from "@material-ui/icons";
import {
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Paper,
  Typography,
  useTheme,
} from "@material-ui/core";
import React, { useEffect } from "react";

import { useHistory } from "react-router-dom";

export default function Home() {
  useGithubPagesHasNoRouting();
  const theme = useTheme();
  const history = useHistory();

  return (
    <div>
      <div style={{ height: theme.spacing(4) }} />
      <div style={{ display: "flex" }}>
        <div
          style={{ maxWidth: 150, flexShrink: 0, color: theme.palette.primary.main }}
        >
          <Logo />
        </div>
        <div style={{ width: theme.spacing(4), flexShrink: 0 }} />
        <div>
          <Typography variant="h2" color="primary">
            MINDER
          </Typography>
          <Typography variant="h5" color="primary">
            Store anything you might want to remember on a simple Client to Client
            encryption platform.
          </Typography>
          <Typography variant="h5" color="primary">
            Your own long term personal knowledge vault.
          </Typography>
        </div>
      </div>
      <div style={{ height: theme.spacing(8) }} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} style={{ display: "grid" }}>
          <Paper
            variant="outlined"
            style={{
              padding: theme.spacing(3),
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h4"
              style={{ display: "flex", alignItems: "center" }}
              gutterBottom
            >
              <Autorenew fontSize="large" color="primary" />
              <span style={{ width: theme.spacing(2) }} />
              Progress
            </Typography>
            <div style={{ height: theme.spacing(1) }} />
            <Typography variant="body1" gutterBottom>
              I'm the only developer so I'm taking my time.
            </Typography>
            <List
              subheader={<ListSubheader style={{ padding: 0 }}>GOALS</ListSubheader>}
            >
              {["encryption client to client layer", "initial CRUD operations"].map(
                (completedItem) => (
                  <ListItem style={{ paddingLeft: 0 }}>
                    <ListItemIcon>
                      <CheckBox />
                    </ListItemIcon>
                    <ListItemText primary={completedItem} />
                  </ListItem>
                ),
              )}
              {[
                "build User Voted Standard for the recommend fields everyone should have",
                "create partial copies of your data into shareable units for 3rd parties to consume",
                "Based on standard create a backend backed by graphql for automatization",
              ].map((todoItem) => (
                <ListItem style={{ paddingLeft: 0 }}>
                  <ListItemIcon>
                    <CheckBoxOutlineBlank />
                  </ListItemIcon>
                  <ListItemText primary={todoItem} />
                </ListItem>
              ))}
            </List>
            <div style={{ height: theme.spacing(2), flexGrow: 1 }} />
            <Divider />
            <div style={{ height: theme.spacing(2) }} />
            <Button
              variant="outlined"
              size="large"
              href="https://github.com/davicatunda/minder"
            >
              Support
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={6} style={{ display: "grid" }}>
          <Paper
            variant="outlined"
            style={{
              padding: theme.spacing(3),
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h4"
              style={{ display: "flex", alignItems: "center" }}
              gutterBottom
            >
              <Build fontSize="large" color="primary" />
              <span style={{ width: theme.spacing(2) }} />
              Usage
            </Typography>
            <div style={{ height: theme.spacing(1) }} />
            <Typography variant="body1" gutterBottom>
              I'm the only user so there is only one way.
            </Typography>
            <List
              subheader={<ListSubheader style={{ padding: 0 }}>STEPS</ListSubheader>}
            >
              {[
                "Create or upload your encryption key and data",
                "Consult your data, add new items, reorder them",
                "Save your key and encrypted data on somewhere safe",
                "Live your life, and come back whenever your memory fails you",
              ].map((step) => (
                <ListItem style={{ paddingLeft: 0 }}>
                  <ListItemIcon style={{ paddingRight: 0 }}>
                    <SubdirectoryArrowRight />
                  </ListItemIcon>
                  <ListItemText primary={step} />
                </ListItem>
              ))}
            </List>
            <div style={{ height: theme.spacing(2), flexGrow: 1 }} />
            <Divider />
            <div style={{ height: theme.spacing(2) }} />
            <Button
              variant="outlined"
              size="large"
              onClick={() => history.push("minder/offline")}
            >
              Try it
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

function Logo() {
  return (
    <svg
      fill="currentColor"
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M 64.984 8.73 C 76.744 12.943 84.985 22.628 87.624 35.396 C 90.644 50.175 82.029 64.451 67.562 68.665 C 65.55 69.23 62.909 69.607 61.589 69.483 C 59.513 69.293 59.198 69.105 59.198 67.721 C 59.198 66.274 59.513 66.086 62.909 65.709 C 76.682 63.947 86.178 51.244 84.103 37.471 C 82.405 26.779 76.243 18.289 66.746 13.572 C 52.281 6.466 33.225 12.755 26.243 26.968 C 24.42 30.679 23.854 33.068 21.779 45.835 C 21.339 48.854 20.584 50.237 17.376 54.451 C 15.239 57.218 13.665 59.734 13.918 60.111 C 14.105 60.489 15.363 61.369 16.684 62.06 C 19.262 63.319 20.017 64.954 19.451 67.783 C 19.201 69.168 19.451 69.859 20.584 70.803 C 21.904 71.872 21.967 72.186 21.274 73.382 C 20.584 74.513 20.646 74.954 21.842 76.399 C 22.973 77.846 23.099 78.602 22.785 81.683 C 22.281 85.96 22.973 86.589 28.004 86.589 C 32.471 86.589 34.168 84.953 34.985 79.985 C 35.363 77.909 35.613 67.532 35.613 56.967 C 35.613 33.76 36.065 31.921 41.41 26.512 C 45.561 22.363 48.948 21.811 54.796 21.811 C 61.84 21.811 68.631 26.34 71.714 33.068 C 73.538 37.093 73.474 43.822 71.651 47.345 C 67.627 54.892 58.695 57.847 50.897 54.262 C 45.3 51.621 42.155 46.024 42.658 39.357 C 43.098 33.006 47.815 28.728 54.356 28.728 C 58.633 28.728 62.153 30.489 64.292 33.697 C 69.513 41.684 63.915 51.119 55.299 48.728 C 50.834 47.47 47.815 41.874 49.703 38.225 C 52.155 33.509 60.015 35.332 59.387 40.489 C 59.136 42.628 57.186 42.943 56.117 40.992 C 55.739 40.301 55.173 39.546 54.796 39.294 C 53.852 38.603 52.721 39.987 53.035 41.496 C 53.664 43.886 55.173 45.081 57.69 45.081 C 61.84 45.081 63.853 40.992 61.714 36.905 C 60.142 33.887 57.204 32.501 53.684 32.501 C 50.916 32.501 46.132 35.544 46.132 40.301 C 46.132 49.798 56.053 55.206 63.978 50.175 C 67.627 47.911 69.26 44.703 69.198 40.048 C 68.996 28.296 55.633 19.3 43.954 29.168 C 41.421 31.307 39.752 35.747 39.498 41.292 L 39.387 58.853 C 39.073 80.802 39.011 81.998 37.689 84.828 C 35.992 88.6 32.785 90.362 27.69 90.362 C 20.961 90.362 18.069 87.531 18.948 81.872 C 19.262 79.355 19.137 78.854 17.942 77.846 C 16.432 76.652 16.056 74.954 15.93 68.79 C 15.866 66.588 15.552 65.709 14.734 65.457 C 14.169 65.269 12.785 64.325 11.778 63.319 C 8.823 60.615 9.2 58.98 13.854 52.69 C 17.879 47.281 17.942 47.156 18.634 41.621 C 20.143 29.043 22.47 23.51 28.948 17.031 C 33.728 12.315 39.199 9.107 45.236 7.596 C 50.394 6.278 59.576 6.78 64.984 8.73 Z" />
    </svg>
  );
}

function useGithubPagesHasNoRouting(): void {
  const history = useHistory();
  useEffect(() => {
    const path = localStorage.getItem("path");
    if (path) {
      localStorage.removeItem("path");
      history.push(path);
    }
  });
}
