import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import Category from "./adminContainer/Category/Category";
import Home from "./adminContainer/Home/Home";
import Order from "./adminContainer/Order/TableList";
import Product from "./adminContainer/Product/products";
import Brand from "./adminContainer/Brand/Brand";
import EditProductList from "./adminContainer/Product/editProductList";
import CreateProduct from "./adminContainer/Product/createProductList";
import BrandEditPage from "./adminContainer/Brand/BrandEditPage";
import ProductDetails from "./adminContainer/Product/productDetails";
import ClientProductDetails from "./clientContainer/Details/ProductDetails";
import CategoryEdit from "./adminContainer/Category/CategoryEdit";
import Header from "./clientContainer/Home/Header";
import CategoryDetails from "./adminContainer/Category/CategoryDetails";
import CategoryProducts from "./clientContainer/Home/CategoryProducts";
import BrandPage from "./clientContainer/Home/BrandPage";
import Cart from "./clientContainer/Home/Cart/cart";
import { fetchProducts } from "./redux/cart/action";
import AllCards from "./clientContainer/Home/AllCards";
import OrderDetails from "./adminContainer/Order/OrderDetails";
import LoginPage from "./Auth/LoginPage";
import PrivateRoute from "./Auth/PrivateRoute";
import Payme from "./demoPayment";

// let win = window

function App(): JSX.Element {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);


  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Home />} />
        </Route>
        <Route path="/category" element={<PrivateRoute />}>
          <Route path="/category" element={<Category />} />
        </Route>
        <Route path="/category/admin/edit-page/:id" element={<PrivateRoute />}>
          <Route
            path="/category/admin/edit-page/:id"
            element={<CategoryEdit />}
          />
        </Route>
        <Route path="/category/by-id/:id" element={<PrivateRoute />}>
          <Route path="/category/by-id/:id" element={<CategoryDetails />} />
        </Route>
        <Route path="/product" element={<PrivateRoute />}>
          <Route path="/product" element={<Product />} />
        </Route>
        <Route path="/order" element={<PrivateRoute />}>
          <Route path="/order" element={<Order />} />
        </Route>
        <Route path="/brand" element={<PrivateRoute />}>
          <Route path="/brand" element={<Brand />} />
        </Route>
        <Route path="/brand/admin/edit-page/:id" element={<PrivateRoute />}>
          <Route
            path="/brand/admin/edit-page/:id"
            element={<BrandEditPage />}
          />
        </Route>
        <Route path="/product/edit/:id" element={<PrivateRoute />}>
          <Route path="/product/edit/:id" element={<EditProductList />} />
        </Route>
        <Route path="/product/details/:id" element={<PrivateRoute />}>
          <Route path="/product/details/:id" element={<ProductDetails />} />
        </Route>
        <Route path="/product/create" element={<PrivateRoute />}>
          <Route path="/product/create" element={<CreateProduct />} />
        </Route>
        <Route path="/order-details/:buyer_id" element={<PrivateRoute />}>
          <Route path="/order-details/:buyer_id" element={<OrderDetails />} />
        </Route>
        <Route
          path="/product/client/details/:id"
          element={<ClientProductDetails />}
        />
        <Route path="/product/by-brand/:id" element={<BrandPage />} />
        <Route
          path="/product/product-by-category/:id"
          element={<CategoryProducts />}
        />
        <Route path="/" element={<Header />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/all/card/:id" element={<AllCards />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );

}
export default App;
