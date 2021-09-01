import React from "react";
import { Route, Switch } from "react-router-dom";
import HomeScreen from "../screens/HomeScreen";
import ProductScreen from "../screens/ProductScreen";
import ProductsScreen from "../screens/ProductsScreen";
import ProductsCategoryScreen from "../screens/ProductsCategoryScreen";
import ProductsBrandScreen from "../screens/ProductsBrandScreen";
import CartScreen from "../screens/CartScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ShippingScreen from "../screens/ShippingScreen";
import PaymentScreen from "../screens/PaymentScreen";
import PaymentScreenUpdate from "../screens/PaymentScreenUpdate";
import PlaceOrderScreen from "../screens/PlaceOrderScreen";
import OrderScreen from "../screens/OrderScreen";
import UserListScreen from "../screens/UserListScreen";
import UserEditScreen from "../screens/UserEditScreen";
import ProductsListScreen from "../screens/ProductsListScreen";
import ProductEditScreen from "../screens/ProductEditScreen";
import OrdersListScreen from "../screens/OrdersListScreen";

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
