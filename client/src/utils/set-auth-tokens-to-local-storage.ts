export default function setAuthTokensToLocalStorage(tokens: {
  refreshToken: string;
  accessToken: string;
}) {
  localStorage.setItem("refresh_token", tokens.refreshToken);
  localStorage.setItem("access_token", tokens.accessToken);
}
