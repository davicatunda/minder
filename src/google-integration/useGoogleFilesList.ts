import { GOOGLE_SCOPES } from "./googleConfiguration";
import { useEffect } from "react";
import useEnforceScope from "./useEnforceScope";
import { useGoogleAuthContext } from "./useGoogleAuthProvider";

export function useGoogleFilesList(
  onFetch: (files: gapi.client.drive.File[]) => void,
) {
  const auth = useGoogleAuthContext();
  useEffect(() => {
    if (auth === null || !auth.isSignedIn.get()) {
      onFetch([]);
    }
  }, [auth, onFetch]);

  const hasScope = useEnforceScope(GOOGLE_SCOPES);
  useEffect(() => {
    if (!hasScope) {
      return;
    }
    gapi.client.drive.files
      .list({
        spaces: "appDataFolder",
        fields: "nextPageToken, files(id, appProperties)",
        pageSize: 100,
      })
      .then((response) => {
        onFetch(response.result.files ?? []);
      });
  }, [hasScope, onFetch]);
}
