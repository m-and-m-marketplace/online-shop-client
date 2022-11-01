import axios from "axios";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductList from "./components/ProductList";
import Navbar from "./components/Navbar";
import ProductDetails from "./components/ProductDetails";
import HomePage from "./components/HomePage";
import ProfilePage from "./components/ProfilePage";
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import CreateProduct from "./components/CreateProduct";
import EditProduct from "./components/EditProduct";
import CheckOut from "./components/CheckOut";

const API_URL = "http://localhost:5006";

function App() {
  const [products, setProducts] = useState([]);
  const [admin, setAdmin] = useState();
  const storedToken = localStorage.getItem("authToken");

  const getAllProducts = () => {
    axios
      .get(`${API_URL}/api/products`, {
        // headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  const getUser = () => {
    axios
      .get(`${API_URL}/api/account`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        if (response.data.admin === true) {
          setAdmin(true);
        } else {
          setAdmin(false);
        }
        console.log(admin);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getUser();
  });

  return (
    <div className="App">
      <Navbar admin={admin}></Navbar>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route
          path="/products/:id/edit"
          element={<EditProduct fetchProductsCB={getAllProducts} />}
        />
        <Route path="/products" element={<ProductList products={products} />} />
        <Route
          path="/products/create"
          element={<CreateProduct fetchProductsCB={getAllProducts}  />}
        />
        <Route
          path="/products/:id"
          element={<ProductDetails products={products} admin={admin}/>}
        />
        <Route path="/account" element={<ProfilePage />}/>
        <Route path="/orders/checkout" element={<CheckOut />}/>
      </Routes>
    </div>
  );
}

export default App;
