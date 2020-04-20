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

const App: FunctionComponent<{}> = () => {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/standard">Standard</Link>
          </li>
        </ul>

        <hr />

        <Switch>
          <Route exact path="/">
            <Profiles />
          </Route>
          <Route path="/standard">
            [WIP]
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;