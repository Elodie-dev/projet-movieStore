import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import * as userService from "../services/userService";
import auth from "../services/authService";
import { toast } from "react-toastify";

class RegisterForm extends Form {
  state = {
    data: {
      email: "",
      password: "",
      lastname: "",
      firstname: "",
      adresse: "",
      zipcode: "",	
      city: ""
    },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(5).label("Mot de passe"),
    lastname: Joi.string().required().label("Nom"),
    firstname: Joi.string().required().label("Prénom"),
    adresse: Joi.string().required().min(5).label("Adresse"),
    zipcode: Joi.string().required().label("Code Postal"),
    city: Joi.string().required().label("Ville"),
  };

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      toast.success("Inscription enregistrée");
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Inscription</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email", "email")}
          {this.renderInput("password", "Mot de passe", "password")}
          {this.renderInput("lastname", "Nom")}
          {this.renderInput("firstname", "Prénom")}
          {this.renderInput("adresse", "Adresse")}
          {this.renderInput("zipcode", "Code Postal")}
          {this.renderInput("city", "Ville")}
          {this.renderButton("S'inscrire")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
