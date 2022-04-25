const express = require("express");
const router = express.Router();

const {
  addProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  removeProduct,
} = require("../controllers/productCotroller");

router.route("/product/new").post(addProduct);
router.route("/products").get(getProducts);
router.route("/product/:id").get(getSingleProduct);
router.route("/update/product/:id").put(updateProduct);
router.route("/delete/product/:id").delete(removeProduct);

module.exports = router;
