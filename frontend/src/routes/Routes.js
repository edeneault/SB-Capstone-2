import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import ProductsPage from "../pages/ProductsPage";
import ProductsCategoryPage from "../pages/ProductsCategoryPage";
import ProductsBrandPage from "../pages/ProductsBrandPage";
import CartPage from "../pages/CartPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProfilePage from "../pages/ProfilePage";
import ShippingPage from "../pages/ShippingPage";
import PaymentPage from "../pages/PaymentPage";
import PaymentPageUpdate from "../pages/PaymentPageUpdate";
import PlaceOrderPage from "../pages/PlaceOrderPage";
import OrderPage from "../pages/OrderPage";
import UsersListPage from "../pages/UserListPage";
import UserEditPage from "../pages/UserEditPage";
import ProductsListPage from "../pages/ProductsListPage";
import ProductEditPage from "../pages/ProductEditPage";
import OrdersListPage from "../pages/OrdersListPage";

const Routes = () => {
  return (
    <Switch>
      <Route path='/orders/:id' component={OrderPage} />
      <Route path='/admin/orderslist' component={OrdersListPage} />
      <Route path='/shipping' component={ShippingPage} />
      <Route path='/payment' component={PaymentPage} />
      <Route path='/paymentmethod' component={PaymentPageUpdate} />
      <Route path='/placeorder' component={PlaceOrderPage} />
      <Route path='/login' component={LoginPage} />
      <Route path='/register' component={RegisterPage} />
      <Route path='/profile' component={ProfilePage} />
      <Route path='/products/:id' component={ProductPage} />
      <Route path='/categories/:category' component={ProductsCategoryPage} />
      <Route path='/brand/:brand' component={ProductsBrandPage} />
      <Route path='/allproducts' component={ProductsPage} />
      <Route path='/cart/:id?' component={CartPage} />
      <Route path='/admin/userslist' component={UsersListPage} />
      <Route path='/admin/user/:id/edit' component={UserEditPage} />
      <Route exact path='/admin/productslist' component={ProductsListPage} />
      <Route
        exact
        path='/admin/productslist/:pageNumber'
        component={ProductsListPage}
      />
      <Route path='/admin/product/:id/edit' component={ProductEditPage} />
      <Route exact path='/search/:keyword' component={ProductsPage} />
      <Route exact path='/page/:pageNumber' component={HomePage} />
      <Route
        exact
        path='allproducts/page/:pageNumber'
        component={ProductsPage}
      />
      <Route
        exact
        path='/search/:keyword/page/:pageNumber'
        component={ProductsPage}
      />
      <Route exact path='/' component={HomePage} />
    </Switch>
  );
};

export default Routes;
