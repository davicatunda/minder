import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import NavBar from "./core/nav-bar/NavBar";
import React from "react";
import loadable from "@loadable/component";

const HomePage = loadable(() => import("./home/HomePage"));
const MemoryPage = loadable(() => import("./memory/MemoryPage"));
const StandardPage = loadable(() => import("./standard/StandardPage"));
const ProposalPage = loadable(() => import("./proposal/ProposalPage"));

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/minder/">
          <HomePage />
        </Route>
        <Route exact path="/minder/memories">
          <MemoryPage />
        </Route>
        <Route path="/minder/standard">
          <StandardPage />
        </Route>
        <Route path="/minder/proposal/:proposalId">
          <ProposalPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
