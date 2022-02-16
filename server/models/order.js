import { DataTypes } from "sequelize";
import { bdd } from "./bdd.js";

export const orderModel = bdd.define('order', {
    id_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    status: {
        type: DataTypes.ENUM('En attente', 'Payée', 'Expédiée', 'Livrée'),
        allowNull: false,
        defaultValue: 'En attente'
    },
    payment_token: {
        type: DataTypes.STRING
    },
    package_number: {
        type: DataTypes.STRING
    },
    total_price: {
        type: DataTypes.FLOAT
    }
});