import { DataTypes } from "sequelize";
import { bdd } from "./bdd.js";

export const userModel = bdd.define('user', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    adresse: {
        type: DataTypes.STRING,
        allowNull: false
    },
    zipcode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});