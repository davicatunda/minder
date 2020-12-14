import "fontsource-roboto";

import * as serviceWorker from "./serviceWorker";

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

import App from "./pages/App";
import CssBaseline from "@material-ui/core/CssBaseline";
import { CustomThemeProvider } from "./pages/shared-layout/useTogglePaletteContext";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import React from "react";
import ReactDOM from "react-dom";
import { setContext } from "@apollo/client/link/context";

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: localStorage.getItem("token") ?? "",
  },
}));

const client = new ApolloClient({
  link: authLink.concat(
    createHttpLink({
      uri: "https://thawing-wildwood-69808.herokuapp.com/graphql",
    }),
  ),
  cache: new InMemoryCache(),
});

function Root() {
  return (
    <ApolloProvider client={client}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <CustomThemeProvider>
          <CssBaseline />
          <App />
        </CustomThemeProvider>
      </MuiPickersUtilsProvider>
    </ApolloProvider>
  );
}

ReactDOM.render(<Root />, document.getElementById("root"));
