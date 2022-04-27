const express = require("express");
const app = express();
const errorMiddleware = require('./middlewares/errors')

// MIDDLEWARE
app.use(express.json());
//  IMPORT ALL ROUTES

const products = require("./routes/product");
const user = require('./routes/user')

app.use("/api/v1", products);
app.use("/api/v1", user);

// MIDDLEWARES TO HANDLE ERRORS
app.use(errorMiddleware)

module.exports = app;
