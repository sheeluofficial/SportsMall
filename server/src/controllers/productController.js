const catchAsyncError = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const Product = require("../models/productModel");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");
// Create new product -- Admin
//  Note : update it add cloudnary 
exports.createProduct = catchAsyncError(async (req, res, next) => {
  let images = []; 

  if (req.body.images) {
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    const imagesLinks = [];

    // Split images into chunks due to cloudinary upload limits only 3 images can be uploaded at a time so we are splitting into chunks and uploading them separately eg: 9 images will be split into 3 chunks and uploaded separately
    const chunkSize = 3;
    const imageChunks = [];
    while (images.length > 0) {
      imageChunks.push(images.splice(0, chunkSize));
    }


    // Upload images in separate requests. for loop will run 3 times if there are 9 images to upload each time uploading 3 images at a time
    for (let chunk of imageChunks) {
      const uploadPromises = chunk.map((img) =>
        cloudinary.v2.uploader.upload(img, {
          folder: "Products",
        })
      );

      
      const results = await Promise.all(uploadPromises); // wait for all the promises to resolve and store the results in results array eg: [{}, {}, {}] 3 images uploaded successfully and their details are stored in results array

      for (let result of results) { 
        imagesLinks.push({
          product_id: result.public_id,
          url: result.secure_url,
        });
      }
    }

    req.body.user = req.user.id;
    req.body.images = imagesLinks;
  }

  const data = await Product.create(req.body);

  res.status(200).json({ success: true, data: data });
});

// Update product --Admin

exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].product_id);
    }

    const imagesLinks = [];
    for (let img of images) {
      const result = await cloudinary.v2.uploader.upload(img, {
        folder: "Products",
      });

      imagesLinks.push({
        product_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(201).json({
    success: true,
    product: product,
  });
});

// Delete product --Admin

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // Deleting Images From Cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].product_id);
  }

  await product.remove();

  res.status(201).json({
    success: true,
    message: "Product delete successfully",
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

  // next(new ErrorHandler("internal error",500));

  const productsCount = await Product.countDocuments();
  const ApiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
    
  const products = await ApiFeature.query;
  let filteredProductCount = products.length;

  res.status(200).json({
    message: "Data fetched",
    products,
    productsCount,
    resultPerPage,
    filteredProductCount
  });

  // res.status(200).send({message:"All product"})
};

// Create new review and update the review

exports.createProductReview = catchAsyncError(async (req, res, next) => {
  const { ratings, comment, productId, title, recommend } = req.body;
  const review = {
    userId: req.user._id,
    name: req.user.name,
    ratings: Number(ratings),
    title: title,
    comment: comment,
    recommend: recommend,
    avatar: req.user.avatar.url, // Add user avatar URL to the review object
  };

  const product = await Product.findById(productId);

  const isRevieved = product.reviews.find(
    (rev) => rev.userId.toString() === req.user._id.toString()
  );

  if (isRevieved) {
    // Update the existing review
    product.reviews.forEach((rev) => {
      if (rev.userId.toString() === req.user._id.toString()) {
        rev.ratings = ratings;
        rev.comment = comment;
        rev.recommend = recommend;
        rev.title = title;
        product.numOfReviews = product.reviews.length;
      }
    });
  } else {
    // Add a new review
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let totalRatings = 0;

  product.reviews.forEach((review) => {
    totalRatings += review.ratings;
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
    totalRatings += review.ratings;
  });

  let ratings = 0;
  if (!reviews.length === 0) {
    ratings = totalRatings / reviews.length;
  }

  const numOfReviews = reviews.length;


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
  });
});
