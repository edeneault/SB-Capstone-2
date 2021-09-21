## Impresso Expresso - eCommerce Shop

**Website URL**: https://impresso-espresso-app.herokuapp.com/

**Project Overview:** StoreFront/eCommerce application for business to deliver brand identity and to sell products to retail consumers. Built in a way that is flexible/reusable.

Coffee vendor themed. Products sold: coffee, brarista/coffee machines and accessories.

**Application Features**

- Views: Home, products, product details, shopping cart
- admin panel: add/delete/update products, assign user as admin
- Documentation: detailed documentation/tutorials for ease of use by end-user/client (route documentation using Postman)
- Front-facing usage: user can get all the way to checkout before being required to login/signup

**Technologies:**

_MERN Stack_

- MongoDB (Atlas Cloud Database)
- Express
- React
- Node

**Libraries:**

- react-bootstrap for styling
- redux, react-redux for global state management
- jwt we tokens/bcrypt for authentification - custom middleware to protect routes
- react-helmet for SEO friendly meta data
- toast for dynamic messaging

**API**

- Paypal API for payment
- Stripe API for payment
- Cloudinary API for media management and custom transformations

**Testing**

- comprehensive testing: react-testing-library and jest (unit and integration tests)

**Deployment**

- Backend and Frontend: heroku

**User Flows**

<img src="documentation/User Flows - Cap 2-v2.png" alt="user-flow"/>

**Database**

**User Schema**

```
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);
```

**Product Schema**

```
const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);
```

**Review Schema**

```
const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);
```

**Order Schema**

```
const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);
```

**Testing**
Backend Testing with Postman:

- Install nopm packages for Node and Newman
- Navigate to folder "/backend-tests" in terminal
- Run in terminal:

```
newman run eShop.postman_collection.json -e eShop.postman_environment.json
```

Frontend Testing with Jest and React-Testing-Library:

- Navigate to "/frontend" folder in terminal
- Run in terminal:

```
npm run test
```

**Known Issues**

- cart reset after order is placed
- Stripe payment not working on mobile devices
- local storage issues on mobile devices
- pagination missing in admin orders page
- navbar categories and brand should be provided dynamically (endpoints missing to allow for mapping of categories and brand)
- delete order endpoint missing

Features to Implement in CI/CD:

- track product trends, potentially add chart visualization in admin views

**Ressources**
Set up Payments in React js with Stripe by Web Dev Hero (https://www.youtube.com/watch?v=lkA4rmo7W6k)
Using Cookies with JWT in Node.js (https://dev.to/franciscomendes10866/using-cookies-with-jwt-in-node-js-8fn)
MERN Stack Tutorial by Brad Traversy (https://www.udemy.com/course/mern-ecommerce/)
React-Testing-Library Docs: (https://testing-library.com/)
Jest: (https://jestjs.io/)
react-bootstrap (https://react-bootstrap.github.io/)
react-multi-carousel (https://www.npmjs.com/package/react-multi-carousel)
mongoDB Atlas (https://www.mongodb.com/cloud/atlas)
