import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import { useDispatch } from "react-redux";
import { fetchProducts } from "./redux/cart/action";
import AllCards from "./clientContainer/Home/AllCards";
import OrderDetails from "./adminContainer/Order/OrderDetails";

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route
            path="/category/admin/edit-page/:id"
            element={<CategoryEdit />}
          />
          <Route path="/category/by-id/:id" element={<CategoryDetails />} />
          <Route path="/product" element={<Product />} />
          <Route path="/order" element={<Order />} />
          <Route path="/brand" element={<Brand />} />
          <Route
            path="/brand/admin/edit-page/:id"
            element={<BrandEditPage />}
          />
          <Route path="/product/edit/:id" element={<EditProductList />} />
          <Route path="/product/details/:id" element={<ProductDetails />} />
          <Route path="/product/client/details/:id" element={<ClientProductDetails />} />
          <Route path="/product/create" element={<CreateProduct />} />
          <Route path="/product/by-brand/:id" element={<BrandPage />} />
          <Route
            path="/product/product-by-category/:id"
            element={<CategoryProducts />}
          />
          <Route path="/" element={<Header />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/all/card/:id" element={<AllCards />} />
          <Route path="/order-details/:buyer_id" element={<OrderDetails />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
