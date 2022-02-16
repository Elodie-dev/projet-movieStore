import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import {account, updateUser} from "../services/userService";


class User extends Form {
    
    schema = {
        adresse: Joi.string().required().label("Adresse"),
        zipcode: Joi.string().required().label("Code Postal"),
        city: Joi.string().required().label("Ville"),
        email: Joi.string().required().email().label("Email"),
        password: Joi.string().min(5).label("Mot de passe")
    };

    populateUser = async () => {
        try {
          const { data } = await account();
          this.setState({ data: this.mapToViewModel(data.user) });
        } catch (ex) {
          if (ex.response && ex.response.status === 404)
            return this.props.history.replace("/not-found");
        }
      }
      componentDidMount = async () => {
        const {data} = await account();
        this.setState({ getUser : data.user});
        await this.populateUser();
      }

      mapToViewModel = (user) => {
        return {
          email: user.email,
          adresse: user.adresse,
          zipcode: user.zipcode,
          city: user.city,
        };
      }

      doSubmit = async () => {
        try {
          await updateUser(this.state.data);
          toast.success("Modification enregistrée");
          window.location = "/account";
        } catch (ex) {
          if (ex.response && ex.response.status === 400) {
            const errors = { ...this.state.errors };
            errors.email = ex.response.data;
            this.setState({ errors });
          }
        }
      };

    render = () => {
        const {getUser, data} = this.state;
        return (
            <div>
                <h1>Mon Compte</h1>
                <p></p>
                <h3>Bonjour {getUser ? `${getUser.firstname} ${getUser.lastname}` : ""}</h3>
                <p></p>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("email", "Email")}
                    {this.renderInput("password", "Nouveau mot de passe", "password")}
                    {this.renderInput("adresse", "Adresse")}
                    {this.renderInput("zipcode", "Code Postal")}
                    {this.renderInput("city", "Ville")}
                    {this.renderButton("Enregistrer")}
                </form>
            </div>
        );
    }
};

export default User;
