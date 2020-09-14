// @flow

import React, { FunctionComponent } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import loadable from "@loadable/component";
import NavBar from "./NavBar";

const Home = loadable(() => import("./Home"));
const Offline = loadable(() => import("./Offline"));
const Standard = loadable(() => import("./Standard"));
const Proposal = loadable(() => import("./Proposal"));

const App: FunctionComponent<{}> = () => {
  return (
    <Router>
      <NavBar />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ maxWidth: 800, width: "100%" }}>
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
        </div>
      </div>
    </Router>
  );
};

export default App;
