import { Container, useTheme } from "@material-ui/core";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import NavBar from "./NavBar";
import React from "react";
import loadable from "@loadable/component";

const Home = loadable(() => import("./Home"));
const Offline = loadable(() => import("./Offline"));
const Standard = loadable(() => import("./Standard"));
const Proposal = loadable(() => import("./Proposal"));

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
    </Router>
  );
}

export default App;
