import {auth} from "../middleware/auth.js";
import {userController} from "../controllers/user.js";
import {movieController} from "../controllers/movie.js";
import {tagController} from "../controllers/tag.js";
import {orderController} from "../controllers/order.js";
import {orderDetailsController} from "../controllers/order_details.js";

export default (app) => {
    // Users
    app.post("/users/register", userController.register);
    app.post("/users/login", userController.login);
    app.get("/users", auth, userController.getAll);
    app.get("/users/account", auth, userController.getMe);
    app.get("/users/:id", auth, userController.getUserById);
    app.put("/users/udpate/account", auth, userController.updateAccount);
    app.put("/users/update/:id/admin", auth, userController.updateAdmin);
    
    // Tags
    app.post("/tag/new", tagController.create);
    app.get("/tags", tagController.getAll);

    // Orders
    app.post("/order/new", auth, orderController.create);
    app.get("/orders", auth, orderController.getAll);
    app.get("/orders/account", auth, orderController.getAllByUser);
    app.get("/order/:id", auth, orderController.getById);
    app.put("/order/update/:id", auth, orderController.update);

    // OrderDetails
    app.post("/details/new", orderDetailsController.create);
    app.get("/details/order/:id", orderDetailsController.getByOrderId);
    // app.get("/details/:id", orderDetailsController.getById);
    app.put("/details/update/:id", orderDetailsController.update);
    app.delete("/details/delete/:id", orderDetailsController.delete);

    // Movies
    app.get("/movies", movieController.getAll);
    app.get("/movies/:id", movieController.getOne);
    app.post("/movies/new", movieController.add);
    app.put("/movies/update/:id", movieController.update);
    app.delete("/movies/delete/:id", movieController.delete);
}
