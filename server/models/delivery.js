import { DataTypes } from "sequelize";
import { bdd } from "./bdd.js";

export const deliveryModel = bdd.define('delivery', {
    id_delivery: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.FLOAT
    }
});