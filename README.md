## Impresso Expresso - eCommerce Shop

**Website URL**
https://impresso-espresso-app.herokuapp.com/

<img src="https://res.cloudinary.com/edeneault-cloudinary/image/upload/v1632411903/myProfile-images/Screen_Shot_2021-09-22_at_2.08.09_PM_oqh8pk.png" alt="" />

**Testing Admin Login credentials:**

- email: admin@fake.com
- password: 123456

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
- react-helmet for meta data
- toast for dynamic messaging

**API**

- Paypal API for payment
- Stripe API for payment
- Cloudinary API for media management and custom transformations

**Deployment**

- Backend and Frontend: heroku

**User Flows**

<img src="documentation/User Flows - Cap 2-v2.png" alt="user-flow"/>

**Database**

A MongoDB Atlas database is used for the data layer. The database schemas are defined with 4 models: userModel, productModel, orderModel and reviewModel.

**Testing**

Backend Testing with Postman:

- Install npm packages for Node and Newman
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
- Media inquiries needed for responsive HomePageCarousel component
- SEO would be far better if App was built using Server Side Rendering (SSR) with a framework like NEXT.js.

Features to Implement in CI/CD:

- track product trends, potentially add chart visualization in admin views

**Personal Note**

- For this Capstone, I challenged myself to use a tech stack that was not fully covered by the SpringBoard course curriculum. I wanted to gain experience working with MongoDB and react/redux design patterns and to practice learning how to use at a base level technologies that are new to me. Also, I felt that it would be a great opportunity to gain experience with eCommerce. The applications general design pattern was learned in Brad Traversy's course on mern stack applications. My focus for the project was on applying react/redux design patterns and on API integration. I also learned how to use HttpOnly cookies to pass jwt tokens as a more secure alternative to localStorage. Additional time was invested on exploring react ui npm packages such as react-bootstrap and react-multi-carousel. I also paid attention to scripts in the package.json file and learning how to test a react-redux application with jest/react-testing-libarary for the frontend and postman/chai for the backend. It took a significant amount of time to build/debug/test but the experience was invaluable. I enjoyed working on the project.

**Ressources**

Set up Payments in React js with Stripe by Web Dev Hero (https://www.youtube.com/watch?v=lkA4rmo7W6k)
Using Cookies with JWT in Node.js (https://dev.to/franciscomendes10866/using-cookies-with-jwt-in-node-js-8fn)
MERN Stack Tutorial by Brad Traversy (https://www.udemy.com/course/mern-ecommerce/)
React-Testing-Library Docs: (https://testing-library.com/)
Jest: (https://jestjs.io/)
react-bootstrap (https://react-bootstrap.github.io/)
react-multi-carousel (https://www.npmjs.com/package/react-multi-carousel)
mongoDB Atlas (https://www.mongodb.com/cloud/atlas)
