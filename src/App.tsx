// @flow

import React, { FunctionComponent } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import loadable from "@loadable/component";

const Profiles = loadable(() => import("./Profiles"));
const Standard = loadable(() => import("./Standard"));
const Proposal = loadable(() => import("./Proposal"));

const App: FunctionComponent<{}> = () => {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/minder">Home</Link>
          </li>
          <li>
            <Link to="/minder/standard">Standard</Link>
          </li>
        </ul>

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
}

export default App;