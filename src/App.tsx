// @flow

import React, { FunctionComponent } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import loadable from "@loadable/component";
import NavBar from "./NavBar";

const Profiles = loadable(() => import("./Profiles"));
const Standard = loadable(() => import("./Standard"));
const Proposal = loadable(() => import("./Proposal"));

const App: FunctionComponent<{}> = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <hr />
        <Switch>
          <Route exact path="/minder/">
            <Profiles />
          </Route>
          <Route path="/minder/standard">
            <Standard />
          </Route>
          <Route path="/minder/proposal/:proposalId">
            <Proposal />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
