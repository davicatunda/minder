import { Container, useTheme } from "@material-ui/core";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import NavBar from "./shared-layout/NavBar";
import React from "react";
import loadable from "@loadable/component";

const HomePage = loadable(() => import("./home/HomePage"));
const MemoryPage = loadable(() => import("./memory/MemoryPage"));
const StandardPage = loadable(() => import("./standard/StandardPage"));
const ProposalPage = loadable(() => import("./proposal/ProposalPage"));
const LoginPage = loadable(() => import("./login/LoginPage"));

function App() {
  const theme = useTheme();
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/minder/">
          <HomePage />
          <div style={{ height: theme.spacing(8) }} />
        </Route>
        <Route exact path="/minder/memories">
          <MemoryPage />
        </Route>
        <Container
          maxWidth="md"
          style={{ display: "flex", flexDirection: "column", flex: 1 }}
        >
          <div style={{ height: theme.spacing(2) }} />
          <Route path="/minder/standard">
            <StandardPage />
          </Route>
          <Route path="/minder/proposal/:proposalId">
            <ProposalPage />
          </Route>
          <Route path="/minder/login">
            <LoginPage />
          </Route>
        </Container>
      </Switch>
    </Router>
  );
}

export default App;
