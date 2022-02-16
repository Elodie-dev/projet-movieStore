import sequelize from "sequelize";

export const bdd = new sequelize("movies_store", "root", "", {
  host: "localhost",
  dialect: "mysql",
});
