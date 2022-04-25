const Product = require("../models/product");
const dotenv = require("dotenv");
const connectDatabase = require("../config/db");

const products = require("../data/product.json");

//setting dotenv file

dotenv.config({ path: "config/config.env" });

connectDatabase();

const seederProducts = async () => {
  try {
    await Product.deleteMany();
    console.log("all products are deleted");

    await Product.insertMany(products);
    console.log("all products are added");

    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seederProducts();
