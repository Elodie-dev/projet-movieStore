import jwtDecode from "jwt-decode";
import http from "./httpService";

const apiEndPoint = "/users/login";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email, password) {
  const data = await http.post(apiEndPoint, { email, password });
  const jwt = data.data.token;
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

const auth = {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};

export default auth;
