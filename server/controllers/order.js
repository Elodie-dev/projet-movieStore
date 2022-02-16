import { orderModel, deliveryModel } from "../models/models.js";

export const orderController = {
    create: (req, res) => {
        const { user_id } = req.decoded.id;
        orderModel.create({
            user_id
        })
        .then((order) => {
            res.status(201).json(order);
        })
        .catch((err, error) => {
            res.status(400).json(err + error)
        })
    },
    getAll: (req, res) => {
        const isAdmin = req.decoded.isAdmin;
        if( isAdmin === true){
            orderModel.findAll()
            .then((orders) => {
                res.status(200).json(orders);
            })
        }
        else{
            return res.status(404).json({
                success: false,
                message: "Vous n'avez pas les autorisations pour effectuer cette action",
            });
        }
    },
    getAllByUser: (req, res) => {
        const user_id = req.decoded.id;
        orderModel.findAll({where: {user_id: user_id}})
        .then((orders) => {
            res.status(200).json(orders);
        })
    },
    getById: (req, res) => {
        const isAdmin = req.decoded.isAdmin;
        const id = req.params;
        if( isAdmin === true){
            orderModel.findOne({where: {id: id}})
            .then((order) => {
                res.status(200).json(order);
            })
        }
        else{
            return res.status(404).json({
                success: false,
                message: "Vous n'avez pas les autorisations pour effectuer cette action",
            });
        }
    },
    update: (req, res) => {
        const { status } = req.body;
        const { id } = req.params;
        let delivery_id;
        deliveryModel.create({
            type,
            price
        })
        .then((delivery) => {
            delivery_id = delivery.id_delivery;
        })
        .catch((err, error) => {
            res.status(400).json(err + error)
        });
        orderModel.update({
            status,
            delivery_id,
            payment_token,
            package_number,
            total_price
        }, {where: {id}})
        .then((order) => {
            res.status(200).json(order);
        })
        .catch((err, error) => {
            res.status(400).json(err + error)
        })
    }

}