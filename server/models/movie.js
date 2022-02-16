import { DataTypes } from "sequelize";
import { bdd } from "./bdd.js";

export const movieModel = bdd.define('movie', {
    movie_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    released_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rating: {
        type: DataTypes.FLOAT,
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    stock: {
        type:DataTypes.INTEGER
    },
    price: {
        type:DataTypes.FLOAT,
    },
});