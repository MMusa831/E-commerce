const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");

// CREATE NEW PRODUCT
exports.addProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(200).json({
    success: true,
    product,
  });
});
// GET ALL PRODOCTS FROM DATABASE => api/v1/products?keyword=product.name
exports.getProducts = catchAsyncError(async (req, res, next) => {
  const resPerPage = 4;
  const productCount = await Product.countDocuments();

  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage);

  const products = await apiFeatures.query;
  res.status(200).json({
    succes: true,
    count: products.length,
    productCount,
    products,
  });
});
// GET SINGLE PRODUCT DETTAILS =>  api/v1/product/:id
exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product nor found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});
// UPDATE PRODUCT => api/v1/update/product/:id
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product nor found", 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    success: true,
    runValidators: true,
    useFindAmodify: false,
  });
  res.status(200).json({
    succes: true,
    product,
  });
});
// DELETE PRODUCT => api/v1/delete/product/:id
exports.removeProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product nor found", 404));
  }
  await product.remove();
  res.status(200).json({
    succes: true,
    message: "Product is deleted!.",
  });
});
