import { gql, useApolloClient, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";

import autoRefreshToken from "./autoRefreshToken";
import { useGoogleAuthContext } from "./useGoogleAuthProvider";

export default function useLoginLogout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const authInstance = useGoogleAuthContext();
  const logIn = useLogIn({
    onSuccess: () => setIsLoggedIn(true),
    onFailure: () => setIsLoggedIn(false),
  });
  const logOut = useLogOut({
    onSuccess: () => setIsLoggedIn(false),
  });
  return { logIn, logOut, isLoggedIn, isLoading: authInstance === null };
}

type LoginConfig = {
  onSuccess: () => void;
  onFailure: () => void;
};
function useLogIn({ onSuccess, onFailure }: LoginConfig): () => void {
  const authInstance = useGoogleAuthContext();
  const client = useApolloClient();
  const [signin] = useMutation<{ signin: boolean }>(
    gql`
      mutation Signin {
        signin
      }
    `,
  );
  function onLogin(googleUser: gapi.auth2.GoogleUser) {
    onSuccess();
    localStorage.setItem("token", googleUser.getAuthResponse().id_token);
    client.stop();
    client
      .resetStore()
      .then(() => signin())
      .then(({ data }) => {
        if (data?.signin === true) {
          autoRefreshToken(googleUser);
        } else {
          localStorage.setItem("token", "");
          client.resetStore();
        }
      });
  }

  // auto login
  useEffect(() => {
    if (authInstance && authInstance.isSignedIn.get()) {
      onLogin(authInstance.currentUser.get());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authInstance]);

  if (!authInstance) {
    return () => {};
  }

  return function login() {
    authInstance.signIn().then(onLogin, onFailure);
  };
}

type LogoutConfig = {
  onSuccess: () => void;
};
function useLogOut({ onSuccess }: LogoutConfig): () => void {
  const authInstance = useGoogleAuthContext();
  const client = useApolloClient();
  if (!authInstance) {
    return () => {};
  }

  return function logout() {
    localStorage.setItem("token", "");
    client.resetStore();

    authInstance.signOut().then(() => {
      authInstance.disconnect();
      onSuccess();
    });
  };
}
