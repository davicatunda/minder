import {
  Autorenew,
  Build,
  CheckBox,
  CheckBoxOutlineBlank,
  Lock,
  SubdirectoryArrowRight,
} from "@material-ui/icons";
import {
  Button,
  Container,
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
import { gql, useQuery } from "@apollo/client";

import { createKey } from "../../utils/encryption";
import { useHistory } from "react-router-dom";

type HomePageResponse = {
  standardProposal: {
    data: string;
  };
};
const QUERY = gql`
  query HomePage {
    standardProposal {
      data
    }
  }
`;
export default function HomePage() {
  useGithubPagesHasNoRouting();
  const theme = useTheme();
  const history = useHistory();
  const { data } = useQuery<HomePageResponse>(QUERY);

  return (
    <div>
      <div
        style={{
          backgroundColor:
            theme.palette.type === "light"
              ? theme.palette.secondary.light
              : theme.palette.secondary.dark,
        }}
      >
        <Container maxWidth="lg">
          <div style={{ height: theme.spacing(8) }} />
          <Typography
            variant="h2"
            color="textPrimary"
            gutterBottom
            style={{ fontWeight: "bold" }}
          >
            Your long term memory vault{" "}
            <span style={{ fontSize: 48, verticalAlign: "bottom" }}>
              <Lock fontSize="inherit" />
            </span>
          </Typography>
          <div style={{ height: theme.spacing(2) }} />
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
              <div style={{ height: theme.spacing(2) }} />
              <Typography
                variant="h5"
                color="textSecondary"
                display="block"
                gutterBottom
              >
                Imagine all the things that you need to remember, for example,
                medical history, previous addresses, favorite restaurants from your
                home town. Chances are that some are long forgotten. Luckily for you
                all these things can be stored and shared on Minder with the safety
                of a fully encrypted platform.
              </Typography>
              <div style={{ height: theme.spacing(2) }} />
              <Button size="large" variant="contained" color="primary">
                Sign up
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <img
                style={{ maxWidth: "110%", position: "relative", top: -12 }}
                src={process.env.PUBLIC_URL + "/Demo.png"}
                alt="demo of the product"
              />
            </Grid>
          </Grid>
        </Container>
      </div>
      <div style={{ height: theme.spacing(16) }} />
      <Container maxWidth="md">
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
                subheader={
                  <ListSubheader style={{ padding: 0 }}>GOALS</ListSubheader>
                }
              >
                {[
                  "encryption client to client layer",
                  "initial CRUD operations",
                ].map((completedItem) => (
                  <ListItem style={{ paddingLeft: 0 }}>
                    <ListItemIcon>
                      <CheckBox />
                    </ListItemIcon>
                    <ListItemText primary={completedItem} />
                  </ListItem>
                ))}
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
                subheader={
                  <ListSubheader style={{ padding: 0 }}>STEPS</ListSubheader>
                }
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
                onClick={() => {
                  createKey().then((key) => {
                    const value =
                      data?.standardProposal?.data ??
                      '{"Personal":{},"Community":{},"Education":{},"Work":{},"Health":{}}';
                    history.push(
                      `minder/memories?title=Demo&key=${key}&data=${value}&readOnly=false`,
                    );
                  });
                }}
              >
                Try it
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
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
