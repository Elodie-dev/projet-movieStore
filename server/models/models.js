import {userModel} from '../models/user.js';
import {deliveryModel} from '../models/delivery.js';
import {movieModel} from '../models/movie.js';
import {orderModel} from '../models/order.js';
import {orderDetails} from '../models/order_details.js';
import {tagModel} from '../models/tag.js';



tagModel.hasMany(movieModel, { foreignKey: 'tag_id' });

deliveryModel.hasMany(orderModel, { foreignKey: 'delivery_id' });

userModel.hasMany(orderModel, { foreignKey: 'user_id' });

movieModel.hasMany(orderDetails, { foreignKey: 'movie_id' });

orderModel.hasMany(orderDetails, { foreignKey: 'order_id' });

export {userModel, movieModel, deliveryModel, orderModel, orderDetails, tagModel };
