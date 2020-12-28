import { ReactNode, createContext, useContext, useState } from "react";

import { GOOGLE_CONFIG } from "./googleConfiguration";

type TGoogleAuthContext = { googleAuth: gapi.auth2.GoogleAuth | null };
const GoogleAuthContext = createContext<TGoogleAuthContext>({ googleAuth: null });

function useGoogleAuth() {
  const [authInstance, setAuthInstance] = useState<gapi.auth2.GoogleAuth | null>(
    gapi.auth2 != null ? gapi.auth2.getAuthInstance() : null,
  );

  if (gapi.auth2 == null) {
    gapi.load("client:auth2", () => {
      gapi.client.init(GOOGLE_CONFIG).then(() => {
        const authInstance = gapi.auth2.getAuthInstance();
        authInstance.isSignedIn.listen((isSignedIn) => {
          const authInstance = gapi.auth2 && gapi.auth2.getAuthInstance();
          setAuthInstance(authInstance != null ? authInstance : null);
        });
        setAuthInstance(authInstance);
      });
    });
  }
  return authInstance;
}

export function useGoogleAuthContext() {
  const context = useContext(GoogleAuthContext);
  if (context == null) {
    throw new Error("missing GoogleAuthContext.Provider");
  }
  return context.googleAuth;
}

export function GoogleAuthProvider({ children }: { children?: ReactNode }) {
  const authInstance = useGoogleAuth();
  return (
    <GoogleAuthContext.Provider value={{ googleAuth: authInstance }}>
      {children}
    </GoogleAuthContext.Provider>
  );
}
