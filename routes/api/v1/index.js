const express = require("express");
const categoryController = require("../../../src/controllers/categoryController");
const productController = require("../../../src/controllers/productController");
const userController = require("../../../src/controllers/UserController");
const orderController = require("../../../src/controllers/orderController");
let router = express.Router();

router.get("/category/all", categoryController.listCategories);

router.get("/product/all", userController.isAuthenticated, productController.listProducts);
router.post("/product/add", productController.addProduct);


router.post("/user/signup", userController.signup);
router.post("/user/login", userController.login);

router.get("/order/details", orderController.getOrderDetails);

router.post("/order/add", orderController.createOrder);

router.post("/order/edit", orderController.editOrderDetails);

module.exports = router;