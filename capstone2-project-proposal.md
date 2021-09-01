# Capstone 2 - Project Proposal

###### by: Etienne Deneault

##### IDEA #1 StoreFront/eShop

**Project Overview:** StoreFront/eCommerce application for business to deliver brand identity and to sell products to retail consumers. Built in a way that is flexible/reusable.

Coffee vendor themed. Products sold: coffee, brarista/coffee machines and accessories.

**Application Features**

- Views: Home, products, product details, shopping cart
- admin panel: add/delete/update products, assign user as admin, (strech goal: track product trends, potentially add chart visualization)
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

**Ressources**
MERN Stack Tutorial by Brad Traversy (https://www.udemy.com/course/mern-ecommerce/)
Set up Payments in React js with Stripe by Web Dev Hero (https://www.youtube.com/watch?v=lkA4rmo7W6k)
Using Cookies with JWT in Node.js (https://dev.to/franciscomendes10866/using-cookies-with-jwt-in-node-js-8fn)
