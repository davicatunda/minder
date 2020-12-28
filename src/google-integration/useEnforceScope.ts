import { useGoogleAuthContext } from "./useGoogleAuthProvider";

export default function useEnforceScope(scope: string) {
  const auth = useGoogleAuthContext();
  const user = auth?.currentUser.get();
  if (!user || !user.isSignedIn()) {
    return false;
  }
  const hasScope = user.hasGrantedScopes(scope);
  if (!hasScope) {
    user.grant({ scope });
  }
  return hasScope;
}
