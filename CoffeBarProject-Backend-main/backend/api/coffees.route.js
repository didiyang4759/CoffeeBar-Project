import express from 'express';
import CoffeesController from './coffees.controller.js';
import ReviewsController from './reviews.controller.js';
import OrdersController from './orders.controller.js';

const router = express.Router(); // get access to express router

router.route("/").get(CoffeesController.apigetCoffees);
router.route("/id/:id").get(CoffeesController.apigetCoffeeById);
router.route("/ratings").get(CoffeesController.apiGetRatings);

router.route("/review").post(ReviewsController.apiPostReview);
router.route("/review").put(ReviewsController.apiUpdateReview);
router.route("/review").delete(ReviewsController.apiDeleteReview);

router.route("/orders").post(OrdersController.apiPostOrder);
router.route("/orders").put(OrdersController.apiUpdateOrder);
router.route("/orders").delete(OrdersController.apiDeleteOrder);
router.route("/orders").get(OrdersController.apiGetOrders);

export default router;