import { DataTypes } from "sequelize";
import { bdd } from "./bdd.js";

export const orderDetails = bdd.define('orderDetails', {
    details_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
})
