import {movieModel} from '../models/models.js';

export const movieController = {

    getAll:  (req, res) => {
        movieModel.findAll()
        .then((movies) => {
            res.status(200).json(movies);
        })
    },

    getOne: (req, res) => {
        const { id } = req.params;
        movieModel.findOne({where : {movie_id: id}})
        .then((movie) => {
            res.status(200).json(movie);
        })
    },

    add: (req, res) => {
        const { title, released_at, description, image, rating, duration, stock, price, tag_id  } = req.body;
        movieModel.create({
            title, 
            released_at, 
            description, 
            image, 
            rating, 
            duration, 
            stock, 
            price, 
            tag_id
        })
        .then((movie) => {
            res.status(200).json(movie);
        })
        .catch((err, error) => {
            res.status(400).json(err + error)
        })
    },

    update: (req, res) => {
        const { stock  } = req.body;
        const { id } = req.params;
        movieModel.update({
            stock
        }, {where: {movie_id: id}})
        .then((movie) => {
            res.status(200).json(movie);
        })
        .catch((err, error) => {
            res.status(400).json(err + error)
        })
    },

    delete: (req, res) => {
        movieModel.destroy({where: {movie_id: req.params.id}})
        .then((movie) => {
            res.status(200).json(movie);
        })
        .catch((err, error) => {
            res.status(400).json(err + error)
        })
    }
}