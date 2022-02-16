import http from "./httpService";
import auth from "./authService";

export function getCustomers() {
  return http.get("/users", {headers: { Authorization: auth.getJwt() }});
}

export function getCustomer(id) {
  return http.get(`/users/${id}`, {headers: { Authorization: auth.getJwt() }});
}

export function updateCustomer(id, isAdmin) {
  return http.put(`/users/update/${id}/admin`, { 
    isAdmin, 
  }, {headers: { Authorization: auth.getJwt() }});
}
