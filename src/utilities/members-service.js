export async function signUp(memberData) {
  // Delegate the network request code to the members-api.js API module which will ultimately return a JSON Web Token (JWT)
  const token = await membersAPI.signUp(memberData);
  localStorage.setItem("token", token);
  return getMember();
}

export async function login(memberData) {
  const token = await membersAPI.login(memberData);
  localStorage.setItem("token", token);
  return getMember();
}

export function logout() {
  localStorage.removeItem("token");
}

export function getToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  // Obtain the payload of the token
  const payload = JSON.parse(window.atob(token.split(".")[1]));
  // A JWT's exp is expressed in seconds, not milliseconds, so convert
  if (payload.exp < Date.now() / 1000) {
  // Token has expired - remove it from localStorage
    localStorage.removeItem("token");
    return null;
  }
  return token;
}

export function getMember() {
  const token = getToken();
  // If there's a token, return the member in the payload, otherwise return null
  return token ? JSON.parse(window.atob(token.split(".")[1])).member : null;
}
