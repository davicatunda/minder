import { Button, Paper, TextField, Typography, useTheme } from "@material-ui/core";
import React, { useState } from "react";
import { gql, useApolloClient, useMutation } from "@apollo/client";

import { useHistory } from "react-router-dom";

type LongiResponse = { login: string };
export default function LoginPage() {
  const theme = useTheme();
  const client = useApolloClient();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useMutation<LongiResponse>(
    gql`
      mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password)
      }
    `,
  );
  return (
    <div style={{ margin: "auto" }}>
      <Paper
        style={{
          padding: theme.spacing(4),
          margin: "auto",
          maxWidth: 480,
          width: "100%",
        }}
      >
        <Typography align="center" variant="h3" gutterBottom>
          Minder
        </Typography>
        <div style={{ height: theme.spacing(4) }} />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Username or email"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Password"
          type="password"
          autoComplete="current-encryption-key"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div style={{ height: theme.spacing(1) }} />
        <Button
          fullWidth
          variant="contained"
          disabled={password === ""}
          color="primary"
          size="large"
          onClick={() => {
            login({ variables: { username, password } }).then(({ data }) => {
              localStorage.setItem("token", data?.login ?? "");
              history.push("/minder/memories");
              client.resetStore();
            });
          }}
        >
          Log in
        </Button>
      </Paper>
    </div>
  );
}
