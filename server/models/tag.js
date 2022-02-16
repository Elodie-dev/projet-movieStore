import { DataTypes } from "sequelize";
import { bdd } from "./bdd.js";

export const tagModel = bdd.define('tag', {
    tag_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
});