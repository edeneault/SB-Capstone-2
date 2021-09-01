import React from "react";
import { Route, Switch } from "react-router-dom";
import HomeScreen from "../pages/HomePage";
import ProductScreen from "../pages/ProductPage";
import ProductsScreen from "../pages/ProductsPage";
import ProductsCategoryScreen from "../pages/ProductsCategoryPage";
import ProductsBrandScreen from "../pages/ProductsBrandPage";
import CartScreen from "../pages/CartPage";
import LoginScreen from "../pages/LoginPage";
import RegisterScreen from "../pages/RegisterPage";
import ProfileScreen from "../pages/ProfilePage";
import ShippingScreen from "../pages/ShippingPage";
import PaymentScreen from "../pages/PaymentPage";
import PaymentScreenUpdate from "../pages/PaymentPageUpdate";
import PlaceOrderScreen from "../pages/PlaceOrderPage";
import OrderScreen from "../pages/OrderPage";
import UserListScreen from "../pages/UserListPage";
import UserEditScreen from "../pages/UserEditPage";
import ProductsListScreen from "../pages/ProductsListPage";
import ProductEditScreen from "../pages/ProductEditPage";
import OrdersListScreen from "../pages/OrdersListPage";

const Routes = () => {
  return (
    <Switch>
      <Route path='/orders/:id' component={OrderScreen} />
      <Route path='/admin/orderslist' component={OrdersListScreen} />
      <Route path='/shipping' component={ShippingScreen} />
      <Route path='/payment' component={PaymentScreen} />
      <Route path='/paymentmethod' component={PaymentScreenUpdate} />
      <Route path='/placeorder' component={PlaceOrderScreen} />
      <Route path='/login' component={LoginScreen} />
      <Route path='/register' component={RegisterScreen} />
      <Route path='/profile' component={ProfileScreen} />
      <Route path='/products/:id' component={ProductScreen} />
      <Route path='/categories/:category' component={ProductsCategoryScreen} />
      <Route path='/brand/:brand' component={ProductsBrandScreen} />
      <Route path='/allproducts' component={ProductsScreen} />
      <Route path='/cart/:id?' component={CartScreen} />
      <Route path='/admin/userslist' component={UserListScreen} />
      <Route path='/admin/user/:id/edit' component={UserEditScreen} />
      <Route exact path='/admin/productslist' component={ProductsListScreen} />
      <Route
        exact
        path='/admin/productslist/:pageNumber'
        component={ProductsListScreen}
      />
      <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
      <Route exact path='/search/:keyword' component={HomeScreen} />
      <Route exact path='/page/:pageNumber' component={HomeScreen} />
      <Route
        exact
        path='/search/:keyword/page/:pageNumber'
        component={HomeScreen}
      />
      <Route exact path='/' component={HomeScreen} />
    </Switch>
  );
};

export default Routes;
