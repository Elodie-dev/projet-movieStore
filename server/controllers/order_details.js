import {orderDetails, movieModel} from '../models/models.js';

function getmovie(id){
    const [stock, price] = movieModel.findOne({where: {movie_id: id}})
    .then((movie) => {
        return [movie.stock, movie.price];
    })
    return [stock, price];
}

export const orderDetailsController = {

    create: (req, res) => {
        let resteMovies;
        const { movie_id, quantity, order_id } = req.body;
        let [stock, moviePrice] = getmovie(movie_id)
        resteMovies = stock - quantity;
        const price = moviePrice * quantity;
        if(stock >= quantity){
            orderDetails.create({
                movie_id, 
                quantity, 
                price,
                order_id
            })
            .then((orderDetails) => {
                let movie;
                movieModel.update({stock: resteMovies
                }, {where: {movie_id: movie_id}})
                .then((response) => {
                    movie = response;
                }).catch((err, error) => {
                    res.status(400).json(err + error)
                })
                res.status(200).json({orderDetails, movie});
            })
            .catch((err, error) => {
                res.status(400).json(err + error)
            })
            
        }
        else{
            return res.status(400).json({
                success: false,
                message: 'Pas assez de films en stock',
            });
        }
    },
    getByOrderId: (req, res) => {
        const { order_id } = req.params;
        orderDetails.findAll({where: {order_id: order_id}})
        .then((orderDetails) => {
            res.status(200).json(orderDetails);
        })
        .catch((err, error) => {
            res.status(400).json(err + error)
        })
    },
    update: (req, res) => {
        let restMovies;
        const { quantity, movie_id } = req.body;
        const { id } = req.params;
        let [stock, moviePrice] = getmovie(movie_id)
        restMovies = stock - quantity;
        const price = moviePrice * quantity;
        orderDetails.update({
            quantity,
            price
        }, {where: {order_details_id: id}})
        .then((orderDetails) => {
            res.status(200).json(orderDetails);
        })
        .catch((err, error) => {
            res.status(400).json(err + error)
        })
    },
    delete: (req, res) => {
        const { id } = req.params;
        let restMovies;
        let [stock] = getmovie(movie_id)
        restMovies = stock + quantity;
        orderDetails.destroy({where: {order_details_id: id}})
        .then((orderDetails) => {
            movieModel.update({stock: restMovies
            }, {where: {movie_id: movie_id}})
            .then((response) => {
                res.status(200).json(response);
            }).catch((err, error) => {
                res.status(400).json(err + error)
            })
        })
        .catch((err, error) => {
            res.status(400).json(err + error)
        })
    }
}