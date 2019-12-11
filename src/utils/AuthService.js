function setSession(params) {
  const expiresAt = JSON.stringify(
    params.get("expires_in") * 1000 + new Date().getTime()
  );
  localStorage.setItem("access_token", params.get("access_token"));
  localStorage.setItem("expires_at", expiresAt);
}

function getToken() {
  return localStorage.getItem("access_token");
}

function isLoggedIn() {
  let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
  return new Date().getTime() < expiresAt;
}

export default { isLoggedIn, setSession, getToken };
