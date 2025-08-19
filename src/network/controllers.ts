import authController from "./auth/endpoints";
import usersController from "./users/endpoints";
import productController from "./products/endpoints";
import ordersController from "./orders/endpoints";

export const API = {
  auth: authController,
  users: usersController,
  products: productController,
  orders: ordersController
};