import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../models/models.js";

export const userController = {
  register: async (req, res) => {
    const { lastname, firstname, adresse, zipcode, city, email, password } =
      req.body;

    if (
      !lastname ||
      !firstname ||
      !adresse ||
      !zipcode ||
      !city ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "Tout les champs sont obligatoires",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    userModel
      .create({
        lastname,
        firstname,
        adresse,
        zipcode,
        city,
        email,
        password: hash,
      })
      .then((user) => {
        return res.status(201).json({
          success: true,
          message: "Utilisateur créé avec succès",
          user,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          success: false,
          message: "Une erreur est survenue",
          error: err,
        });
      });
  },
  login: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Tout les champs sont obligatoires",
      });
    }

    userModel
      .findOne({
        where: {
          email: email,
        },
      })
      .then((user) => {
        if (!user) {
          return res.status(400).json({
            success: false,
            message: "Utilisateur non trouvé",
          });
        }

        bcrypt.compare(password, user.password).then((isMatch) => {
          if (!isMatch) {
            return res.status(400).json({
              success: false,
              message: "Mot de passe incorrect",
            });
          }

          const payload = {
            id: user.user_id,
            email: user.email,
            isAdmin: user.isAdmin,
          };

          jwt.sign(
            payload,
            process.env.SECRET_JWT_KEY,
            {
              expiresIn: 3600,
            },
            (err, token) => {
              if (err) throw err;
              res.status(200).json({
                success: true,
                token: "Bearer " + token,
              });
            }
          );
        });
      })
      .catch((err) => {
        return res.status(500).json({
          success: false,
          message: "Une erreur est survenue :" + err,
          error: err,
        });
      });
  },
  getAll: (req, res) => {
    const isAdmin = req.decoded.isAdmin;
    if (isAdmin === true) {
      userModel.findAll().then((users) => {
        res.status(200).json(users);
      });
    } else {
      return res.status(401).json({
        success: false,
        message:
          "Vous n'avez pas les autorisations pour effectuer cette action",
      });
    }
  },
  getMe: async (req, res) => {
    const id = req.decoded.id;
    userModel
      .findOne({
        where: {
          user_id: id,
        },
      })
      .then((user) => {
        if (!user) {
          return res.status(400).json({
            success: false,
            message: "Utilisateur non trouvé",
          });
        }

        return res.status(200).json({
          success: true,
          user,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          success: false,
          message: "Une erreur est survenue",
          error: err,
        });
      });
  },
  getUserById: async (req, res) => {
    const id = req.params.id;
    const isAdmin = req.decoded.isAdmin;
    if (isAdmin === true) {
      userModel
        .findOne({
          where: {
            user_id: id,
          },
        })
        .then((user) => {
          if (!user) {
            return res.status(400).json({
              success: false,
              message: "Utilisateur non trouvé",
            });
          }
          return res.status(200).json({
            success: true,
            user,
          });
        })
        .catch((err) => {
          return res.status(500).json({
            success: false,
            message: "Une erreur est survenue",
            error: err,
          });
        });
    } else {
      return res.status(404).json({
        success: false,
        message:
          "Vous n'avez pas les autorisations pour effectuer cette action",
      });
    }
  },
  updateAccount: async (req, res) => {
    const id = req.decoded.id;
    const { email, adresse, zipcode, city, password } = req.body;

    if (!email || !adresse || !zipcode || !city) {
      return res.status(400).json({
        success: false,
        message: "Tout les champs sont obligatoires",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = password?await bcrypt.hash(password, salt):null;
    const payload = password
      ? {
          email: email,
          adresse: adresse,
          zipcode: zipcode,
          city: city,
          password: hash,
        }
      : { email: email, adresse: adresse, zipcode: zipcode, city: city };
    userModel
      .update(payload, {
        where: {
          user_id: id,
        },
      })
      .then((user) => {
        return res.status(200).json({
          success: true,
          message: "Utilisateur modifié avec succès",
          user,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          success: false,
          message: "Une erreur est survenue",
          error: err,
        });
      });
  },
  updateAdmin: async (req, res) => {
    const id = req.params.id;
    const isAdmin = req.body.isAdmin;
    const currentUserAdmin = req.decoded.isAdmin;
    if (currentUserAdmin === true) {
      userModel
        .update(
          {
            isAdmin: isAdmin,
          },
          {
            where: {
              user_id: id,
            },
          }
        )
        .then((response) => {
          return res.status(200).json({
            success: true,
            message: "Utilisateur modifié avec succès",
          });
        })
        .catch((err) => {
          return res.status(500).json({
            success: false,
            message: "Une erreur est survenue",
            error: err,
          });
        });
    } else {
      return res.status(404).json({
        success: false,
        message:
          "Vous n'avez pas les autorisations pour effectuer cette action",
      });
    }
  },
};
