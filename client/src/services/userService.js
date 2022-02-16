import http from "./httpService";
import auth from "./authService";

const apiEndPoint = "/users/register";

export function register(user) {
  return http.post(apiEndPoint, {
    lastname : user.lastname, 
    firstname : user.firstname, 
    adresse : user.adresse, 
    zipcode : user.zipcode, 
    city : user.city,
    email : user.email,
    password: user.password
  });
}

export function account(){
  return http.get(`/users/account`, {headers: { Authorization: auth.getJwt() }});
}

export function updateUser(user) {
  return http.put(`/users/udpate/account`, { 
    adresse : user.adresse, 
    zipcode : user.zipcode, 
    city : user.city,
    email : user.email,
    password: user.password
  }, {headers: { Authorization: auth.getJwt() }});
}