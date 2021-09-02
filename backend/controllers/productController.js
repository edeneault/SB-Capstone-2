import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc  Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 12;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc  Fetch single product
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc  Delete a product
// @route DELETE /api/products/:id
// @access PrivateAdmin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed." });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc  Create a product
// @route POST /api/products
// @access PrivateAdmin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample Name",
    price: 0,
    user: req.user._id,
    image:
      "https://res.cloudinary.com/edeneault-cloudinary/image/upload/v1630563926/eShop/products/d5yomgkrkbkpouhqwd9m.jpg",
    category: "Sample category",
    brand: "Sample brand",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createProduct = await product.save();

  res.status(201).json(createProduct);
});

// @desc  Update a product
// @route PUT /api/products/:id
// @access PrivateAdmin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, brand, category, countInStock, image } =
    req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc  Create a review
// @route POST /api/products/:id/reviews
// @access Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() == req.user._id.toString(),
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(6);

  res.json(products);
});

// @desc  Get products by category
// @route GET /api/products/category/:category
// @access Public
const getProductsByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;
  console.log(category);
  const pageSize = 12;
  const page = Number(req.query.pageNumber) || 1;

  const count = await Product.countDocuments({ category: category });
  const products = await Product.find({ category: category })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc  Get products by brand
// @route GET /api/products/brand/:brand
// @access Public
const getProductsByBrand = asyncHandler(async (req, res) => {
  const { brand } = req.params;
  console.log(brand);
  const pageSize = 12;
  const page = Number(req.query.pageNumber) || 1;

  const count = await Product.countDocuments({ brand: brand });
  const products = await Product.find({ brand: brand })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  getProductsByCategory,
  getProductsByBrand,
};
