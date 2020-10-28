export default function logout() {
  const loggedIn = localStorage.getItem("refresh_token");
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");

  if (loggedIn) window.location.reload();
}
