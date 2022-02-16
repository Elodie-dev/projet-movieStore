import React from "react";
import { Redirect } from "react-router-dom";
import Form from "./common/form";
import Joi from "joi-browser";
import auth from "../services/authService";
import { toast } from "react-toastify";

class LoginForm extends Form {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Mot de passe"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.email, data.password);

      toast.success("Login Successful");
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;

    return (
      <div>
        <h1>Connexion</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Mot de passe", "password")}
          {this.renderButton("Se connecter")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
