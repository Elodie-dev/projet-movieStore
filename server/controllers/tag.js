import {tagModel} from "../models/models.js";

export const tagController = {
    create: async (req, res) => {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
            success: false,
            message: 'Le nom du tag est obligatoire !',
            });
        }
        tagModel.create({ name })
        .then(  response =>  res.status(201).json({
                success: true,
                   message: 'Le tag a bien ete cree',
               })
            ).catch(err => res.status(500).json({
                success: false,
                message: 'Une erreur est survenue',
                error: err
            }))
    },
    getAll: async (req,res) =>{
        tagModel.findAll().then(response => res.status(200).json({
                success: true,
                message: "Liste des tags",
                data: response,
            })).catch(err =>  res.status(500).json({
                success: false,
                message: "Une erreur est survenue",
                error: err,
            }))
    },
    getOne: async (req, res) => {
        const { id } = req.params;
        tagModel.findOne({ where: { tag_id: id } })
            .then((response) => res.status(200).json({
                success: true,
                message: "Tag",
                data: response,
            }))
            .catch(err => res.status(500).json({
                success: false,
                message: "Une erreur est survenue",
                error: err,
            }))
    }
    
    
}