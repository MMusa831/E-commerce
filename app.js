const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const errorMiddleware = require("./middlewares/errors");

// MIDDLEWARE
app.use(express.json());
app.use(cookieParser());
//  IMPORT ALL ROUTES

const products = require("./routes/product");
const auth = require("./routes/auth");

app.use("/api/v1", products);
app.use("/api/v1", auth);

// MIDDLEWARES TO HANDLE ERRORS
app.use(errorMiddleware);

module.exports = app;
