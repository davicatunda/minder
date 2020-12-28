const ONE_HOUR = 60 * 60;
const FIVE_MINUTES = 5 * 60;
const FALLBACK_REFRESH_TIME = ONE_HOUR - FIVE_MINUTES;

function refreshTime(authResponse: gapi.auth2.AuthResponse) {
  return (authResponse.expires_in || FALLBACK_REFRESH_TIME) * 1000;
}

export default function autoRefreshToken(googleUser: gapi.auth2.GoogleUser): void {
  const authResponse = googleUser.getAuthResponse(true);

  const refreshToken = async () => {
    const newAuthRes = await googleUser.reloadAuthResponse();
    localStorage.setItem("token", newAuthRes.id_token);
    setTimeout(refreshToken, refreshTime(newAuthRes));
  };

  setTimeout(refreshToken, refreshTime(authResponse));
}
