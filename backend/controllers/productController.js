import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// Desc:   Fetch all products  //
// Route: GET /api/products    //
// Auth: Public                //
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

// Desc:   Fetch single product   //
// Route: GET /api/products/:id   //
// Auth: Public                   //
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// Desc:   Delete a product         //
// Route: DELETE /api/products/:id  //
// Auth: ensureAdmin                //
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

// Desc:   Create a product   //
// Route: POST /api/products  //
// Auth: ensureAdmin          //
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

// Desc:   Update a product       //
// Route:  PUT /api/products/:id  //
// Auth: ensureAdmin              //
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

// Desc:   Create a review                //
// Route:  POST /api/products/:id/reviews //
// Auth: ensureLoggedIn                   //
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

// Desc:   Get top rated products   //
// Route:  GET /api/products/top    //
// Auth: Public                     //
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(6);

  res.json(products);
});

// Desc:   Get products by category                //
// Route:  GET /api/products/category/:category    //
// Auth: Public                                    //
const getProductsByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;
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
