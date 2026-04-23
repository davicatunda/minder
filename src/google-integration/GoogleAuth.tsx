import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

// Buffer: refresh the token 60s before it actually expires
const EXPIRY_BUFFER_MS = 60_000;

interface UserProfile {
  sub: string;
  email: string;
  name: string;
  picture: string;
  email_verified: boolean;
}

interface GoogleAuthState {
  isInitializing: boolean;
  user: {
    email: UserProfile["email"];
    name: UserProfile["name"];
    picture: UserProfile["picture"];
  } | null;
  onSignIn: () => void;
  onSignOut: () => void;
  getToken: () => Promise<string>;
}

export const GoogleAuthContext = createContext<GoogleAuthState>({
  isInitializing: true,
  user: null,
  onSignIn: startSignIn,
  onSignOut: () => {},
  getToken: async () => "",
});

export function GoogleAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [workerResponse, setWorkerResponse] = useState<WorkerResponse | null>(
    null,
  );

  const user = useMemo(() => {
    if (!workerResponse?.user) return null;
    return {
      email: workerResponse.user.email,
      name: workerResponse.user.name,
      picture: workerResponse.user.picture,
    };
  }, [
    workerResponse?.user.email,
    workerResponse?.user.name,
    workerResponse?.user.picture,
  ]);

  const token = useMemo(() => {
    if (!workerResponse?.access_token || !workerResponse?.expires_in)
      return null;
    return {
      value: workerResponse.access_token,
      expiresAt: Date.now() + workerResponse.expires_in * 1000,
    };
  }, [workerResponse?.access_token, workerResponse?.expires_in]);

  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    initialWorker()
      .then(setWorkerResponse)
      .finally(() => setIsInitializing(false));
  }, []);

  const onSignOut = useCallback(async () => {
    workerSignOut().then(() => setWorkerResponse(null));
  }, []);

  const onSignIn = useCallback(async () => await startSignIn(), []);

  const getToken = useCallback(async (): Promise<string> => {
    // Return cached token if still fresh
    if (token && Date.now() < token.expiresAt - EXPIRY_BUFFER_MS) {
      return token.value;
    }

    // Fetch a new one from the Worker
    const response = await workerAuthToken();
    if (!response) throw new Error("Session expired. Please sign in again.");

    setWorkerResponse(response);
    return response.access_token;
  }, [token]);

  return (
    <GoogleAuthContext.Provider
      value={{ isInitializing, user, onSignIn, onSignOut, getToken }}
    >
      {children}
    </GoogleAuthContext.Provider>
  );
}

interface WorkerResponse {
  access_token: string;
  expires_in: number;
  user: UserProfile;
  error?: string;
}

const VERIFIER_KEY = "pkce_verifier";

async function workerFetch(
  path: string,
  options?: RequestInit,
): Promise<Response> {
  return fetch(`${import.meta.env.VITE_WORKER_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: { "Content-Type": "application/json", ...options?.headers },
  });
}

async function workerSignOut(): Promise<Response> {
  return workerFetch("/auth/signout", { method: "POST" });
}

async function workerAuthToken(): Promise<WorkerResponse | null> {
  return workerFetch("/auth/token", { method: "GET" }).then((res) =>
    res.ok ? (res.json() as Promise<WorkerResponse>) : null,
  );
}

async function workerAuthCallback(): Promise<WorkerResponse | null> {
  const code = new URLSearchParams(window.location.search).get("code");
  const verifier = sessionStorage.getItem(VERIFIER_KEY);

  if (!code || !verifier) return null;

  // Clean up immediately — codes are single-use
  sessionStorage.removeItem(VERIFIER_KEY);
  window.history.replaceState({}, "", window.location.pathname);

  return workerFetch("/auth/callback", {
    method: "POST",
    body: JSON.stringify({
      code,
      code_verifier: verifier,
      redirect_uri: window.location.origin + import.meta.env.BASE_URL,
    }),
  }).then((res) => (res.ok ? (res.json() as Promise<WorkerResponse>) : null));
}

async function initialWorker(): Promise<WorkerResponse | null> {
  const code = new URLSearchParams(window.location.search).get("code");
  const verifier = sessionStorage.getItem(VERIFIER_KEY);
  if (code != null && verifier != null) {
    // handle redirect back from Google's auth page
    return workerAuthCallback();
  } else {
    // normal page load, check if we already have a valid session
    return workerAuthToken();
  }
}

async function startSignIn(): Promise<void> {
  const verifier = generateVerifier();
  const challenge = await generateChallenge(verifier);
  sessionStorage.setItem(VERIFIER_KEY, verifier);

  const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", import.meta.env.VITE_GOOGLE_CLIENT_ID);
  url.searchParams.set(
    "redirect_uri",
    window.location.origin + import.meta.env.BASE_URL,
  );
  url.searchParams.set(
    "scope",
    "openid email profile https://www.googleapis.com/auth/drive.appdata",
  );
  url.searchParams.set("code_challenge", challenge);
  url.searchParams.set("code_challenge_method", "S256");
  url.searchParams.set("access_type", "offline");
  url.searchParams.set("prompt", "consent");

  window.location.href = url.toString();
}

function generateVerifier(): string {
  const bytes = new Uint8Array(64);
  crypto.getRandomValues(bytes);
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "")
    .slice(0, 128);
}

async function generateChallenge(verifier: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(verifier),
  );
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}
