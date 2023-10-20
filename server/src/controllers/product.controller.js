const catchAsyncError = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorhandler");
const Product = require("../models/product.model");
const ApiFeatures = require("../utils/apifeatures");

// Create new product -- Admin

exports.createProduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// Update product --Admin

exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 401));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    message: "Product updated",
    product,
  });
});

// Delete product --Admin

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 401));
  }

  product = await Product.findByIdAndDelete(req.params.id);

  res.status(200).json({
    message: "Product Deleted",
    success: true,
  });
});

// Get Product details

exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 401));
  }

  res.status(200).json({
    message: "Product found",
    success: true,
    product,
  });
});

// get All product
exports.getAllProducts = async (req, res, next) => {
  const resultPerPage = 5;
  const productCount = await Product.countDocuments();
  const ApiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await ApiFeature.query;

  res.status(200).json({
    message: "Data fetched",
    products,
    productCount,
  });
  // res.status(200).send({message:"All product"})
};

// Create new review and update the review

exports.createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment: comment,
  };

  const product = await Product.findById(productId);

  const isRevieved = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isRevieved) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.numOfReviews + 1;
  }

  let totalRatings = 0;

  product.reviews.forEach((review) => {
    totalRatings += review.rating;
  });

  const averageRating = totalRatings / product.reviews.length;
  product.ratings = averageRating;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get all review of a product
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id
  );

  let totalRatings = 0;

  reviews.forEach((review) => {
    totalRatings += review.rating;
  });

  let ratings = 0;
  if (!reviews.length === 0) {
    let ratings = totalRatings / reviews.length;
  }

  const numOfReviews = reviews.length;

  console.log(reviews, numOfReviews, ratings);

  console.log("ids", req.query.productId, req.query.id);

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    reviews: reviews,
  });
});
