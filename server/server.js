import express from "express";
import mysql from "mysql";
import dotenv from "dotenv";
import cors from "cors";
import { bdd } from "./models/bdd.js";
import router from "./router/router.js";

dotenv.config();
const app = express();


app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


router(app);

bdd.sync({ alter: true }).then(() => {
  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log("server started on port:" + port);
  });
}).catch(function(err) {
    console.log('error: ', err);
});
