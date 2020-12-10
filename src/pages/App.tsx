import { Container, useTheme } from "@material-ui/core";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import NavBar from "./shared-layout/NavBar";
import React from "react";
import loadable from "@loadable/component";

const Home = loadable(() => import("./home/HomePage"));
const Offline = loadable(() => import("./memory/MemoryPage"));
const Standard = loadable(() => import("./standard/StandardPage"));
const Proposal = loadable(() => import("./proposal/ProposalPage"));
const Login = loadable(() => import("./login/LoginPage"));

function App() {
  const theme = useTheme();
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/minder/">
          <Home />
        </Route>
        <Container
          maxWidth="md"
          style={{ display: "flex", flexDirection: "column", flex: 1 }}
        >
          <div style={{ height: theme.spacing(2) }} />
          <Route exact path="/minder/memories">
            <Offline />
          </Route>
          <Route path="/minder/standard">
            <Standard />
          </Route>
          <Route path="/minder/proposal/:proposalId">
            <Proposal />
          </Route>
          <Route path="/minder/login">
            <Login />
          </Route>
        </Container>
      </Switch>
      <div style={{ height: theme.spacing(4) }} />
    </Router>
  );
}

export default App;
