import { Container, useTheme } from "@material-ui/core";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import NavBar from "./shared-layout/NavBar";
import React from "react";
import loadable from "@loadable/component";

const Home = loadable(() => import("./home/HomePage"));
const Offline = loadable(() => import("./memory/MemoryPage"));
const Standard = loadable(() => import("./standard/StandardPage"));
const Proposal = loadable(() => import("./proposal/ProposalPage"));

function App() {
  const theme = useTheme();
  return (
    <Router>
      <NavBar />
      <div style={{ height: theme.spacing(2) }} />
      <Container maxWidth="md">
        <Switch>
          <Route exact path="/minder/">
            <Home />
          </Route>
          <Route exact path="/minder/offline">
            <Offline />
          </Route>
          <Route path="/minder/standard">
            <Standard />
          </Route>
          <Route path="/minder/proposal/:proposalId">
            <Proposal />
          </Route>
        </Switch>
      </Container>
      <div style={{ height: theme.spacing(4) }} />
    </Router>
  );
}

export default App;
