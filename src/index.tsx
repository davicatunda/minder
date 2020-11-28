import "fontsource-roboto";

import * as serviceWorker from "./serviceWorker";

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import React, { useMemo } from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import App from "./App";
import CssBaseline from "@material-ui/core/CssBaseline";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import ReactDOM from "react-dom";
import blue from "@material-ui/core/colors/blue";
import green from "@material-ui/core/colors/green";
import orange from "@material-ui/core/colors/orange";
import pink from "@material-ui/core/colors/pink";
import red from "@material-ui/core/colors/red";
import { setContext } from "@apollo/client/link/context";
import useMediaQuery from "@material-ui/core/useMediaQuery";

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
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
          primary: {
            main: blue[200],
          },
          secondary: {
            main: pink[200],
          },
          error: {
            main: red[500],
          },
          warning: {
            main: orange[500],
          },
          info: {
            main: blue[500],
          },
          success: {
            main: green[500],
          },
        },
        typography: {
          h1: {
            // fontSize: "3rem",
          },
          h2: {
            // fontSize: "2rem",
          },
        },
        props: {},
      }),
    [prefersDarkMode],
  );

  return (
    <ApolloProvider client={client}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </ApolloProvider>
  );
}

ReactDOM.render(<Root />, document.getElementById("root"));

serviceWorker.register({});
